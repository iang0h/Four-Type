#!/usr/bin/env python3
import argparse
import hashlib
import json
import shutil
import subprocess
import tempfile
import xml.etree.ElementTree as element_tree
import zipfile
from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter

PREVIEW_PAGES = [1, 9, 10, 25, 77, 109, 131, 142]
WORKSHEET_PAGES = list(range(131, 141))
EXPECTED_PDF_SHA256 = "18aa32b98edd6c2e53d510d3aa660811177f0a63b62a0d7c370340649e974617"
EXPECTED_EPUB_SHA256 = "f1b3ecdf1ba442f02c6ba37018de4748205584ec3d3659cc60dcf534d924b850"
EXPECTED_WORKSHEET_SHA256 = "153a9683e15687ba53c97ba59e2c5446d5e7a18dfe2666f94c382db64e1b3d6f"
EXPECTED_WORKSHEET_BYTES = 55439
PDF_PAGE_COUNT = 144
PDF_PAGE_SIZE = (504, 720)
WORKSHEET_METADATA = {
    "/Title": "FourType Field Guide Worksheets",
    "/Author": "FourType",
    "/Subject": "Printable field practice worksheets from FourType: The Field Guide",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def require_hash(path: Path, expected: str) -> None:
    actual = sha256(path)
    if actual != expected:
        raise ValueError(f"SHA-256 mismatch for {path}: expected {expected}, got {actual}")


def load_release(root: Path) -> tuple[Path, dict]:
    path = root / "data" / "field-guide-release.json"
    release = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(release.get("assets"), dict):
        raise ValueError("Field Guide release manifest has no assets")
    if set(release["assets"]) != {"pdf", "epub", "worksheets"}:
        raise ValueError("Field Guide release manifest has unexpected assets")
    return path, release


def local_asset_path(root: Path, asset: dict) -> Path:
    filename = asset.get("customerFilename")
    if not isinstance(filename, str) or Path(filename).name != filename:
        raise ValueError("Field Guide asset has an unsafe customer filename")
    pathname = asset.get("pathname")
    if not isinstance(pathname, str) or pathname != f"field-guide/edition-1/{filename}":
        raise ValueError("Field Guide asset pathname does not match its customer filename")
    return root / "private" / pathname


def validate_pdf(path: Path) -> PdfReader:
    reader = PdfReader(path)
    if len(reader.pages) != PDF_PAGE_COUNT:
        raise ValueError(f"Expected {PDF_PAGE_COUNT} PDF pages, got {len(reader.pages)}")
    for page_number, page in enumerate(reader.pages, start=1):
        size = (float(page.mediabox.width), float(page.mediabox.height))
        if size != PDF_PAGE_SIZE:
            raise ValueError(f"PDF page {page_number} is {size}, expected {PDF_PAGE_SIZE}")
    return reader


def validate_epub(path: Path) -> int:
    subprocess.run(["unzip", "-t", str(path)], check=True, stdout=subprocess.DEVNULL)
    with zipfile.ZipFile(path) as archive:
        xml_names = sorted(
            entry.filename
            for entry in archive.infolist()
            if not entry.is_dir() and Path(entry.filename).suffix.lower() in {".xml", ".xhtml", ".opf"}
        )
        if not xml_names:
            raise ValueError("EPUB contains no XML files")
        for name in xml_names:
            element_tree.fromstring(archive.read(name))
    return len(xml_names)


def write_worksheets(reader: PdfReader, destination: Path) -> None:
    writer = PdfWriter()
    for page_number in WORKSHEET_PAGES:
        writer.add_page(reader.pages[page_number - 1])
    writer.add_metadata(WORKSHEET_METADATA)
    with destination.open("wb") as output:
        writer.write(output)


def write_webp(source: Path, destination: Path) -> None:
    with Image.open(source) as image:
        image = image.convert("RGB")
        image.thumbnail((1400, 1400), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=92, method=6)


def render_previews(pdf: Path, public_directory: Path, temporary_directory: Path) -> dict[int, Path]:
    previews: dict[int, Path] = {}
    for page_number in PREVIEW_PAGES:
        prefix = temporary_directory / f"field-guide-page-{page_number:03d}"
        subprocess.run(
            [
                "pdftoppm",
                "-f",
                str(page_number),
                "-l",
                str(page_number),
                "-singlefile",
                "-scale-to",
                "1400",
                "-png",
                str(pdf),
                str(prefix),
            ],
            check=True,
        )
        preview = public_directory / f"preview-{page_number:02d}.webp"
        write_webp(prefix.with_suffix(".png"), preview)
        previews[page_number] = preview
    return previews


def write_social_image(cover: Path, destination: Path) -> None:
    with Image.open(cover) as source:
        cover_image = source.convert("RGB")
        cover_image.thumbnail((1200, 630), Image.Resampling.LANCZOS)
        social = Image.new("RGB", (1200, 630), "white")
        offset = ((1200 - cover_image.width) // 2, (630 - cover_image.height) // 2)
        social.paste(cover_image, offset)
        social.save(destination, "JPEG", quality=92, optimize=True, progressive=False)


def describe_asset(root: Path, path: Path, key: str, visibility: str) -> dict:
    return {
        "key": key,
        "path": str(path.relative_to(root)),
        "visibility": visibility,
        "bytes": path.stat().st_size,
        "sha256": sha256(path),
    }


def write_json(path: Path, value: dict) -> None:
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def prepare(pdf: Path, epub: Path, root: Path) -> dict:
    release_path, release = load_release(root)
    require_hash(pdf, EXPECTED_PDF_SHA256)
    require_hash(epub, EXPECTED_EPUB_SHA256)

    if release["assets"]["pdf"].get("sha256") != EXPECTED_PDF_SHA256:
        raise ValueError("Release manifest PDF hash does not match the approved source")
    if release["assets"]["epub"].get("sha256") != EXPECTED_EPUB_SHA256:
        raise ValueError("Release manifest EPUB hash does not match the approved source")

    reader = validate_pdf(pdf)
    epub_xml_entries = validate_epub(epub)
    staging_paths = {key: local_asset_path(root, asset) for key, asset in release["assets"].items()}
    public_directory = root / "public" / "images" / "field-guide"
    public_directory.mkdir(parents=True, exist_ok=True)
    for path in staging_paths.values():
        path.parent.mkdir(parents=True, exist_ok=True)

    shutil.copyfile(pdf, staging_paths["pdf"])
    shutil.copyfile(epub, staging_paths["epub"])
    write_worksheets(reader, staging_paths["worksheets"])
    if staging_paths["worksheets"].stat().st_size != EXPECTED_WORKSHEET_BYTES:
        raise ValueError("Worksheet pack size does not match the locked release artifact")
    require_hash(staging_paths["worksheets"], EXPECTED_WORKSHEET_SHA256)

    temporary_root = root / "tmp" / "pdfs"
    temporary_root.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=temporary_root) as temp:
        previews = render_previews(pdf, public_directory, Path(temp))
    cover = public_directory / "cover.webp"
    shutil.copyfile(previews[1], cover)
    social = public_directory / "field-guide-social.jpg"
    write_social_image(cover, social)

    for key, asset in release["assets"].items():
        staged = staging_paths[key]
        asset["sha256"] = sha256(staged)
        asset["bytes"] = staged.stat().st_size
    write_json(release_path, release)

    private_assets = [describe_asset(root, staging_paths[key], key, "private") for key in release["assets"]]
    public_assets = [
        describe_asset(root, cover, "cover", "public"),
        *[describe_asset(root, previews[page], f"preview-{page:02d}", "public") for page in PREVIEW_PAGES],
        describe_asset(root, social, "social", "public"),
    ]
    report = {
        "releaseId": release["id"],
        "source": {
            "pdf": {"bytes": pdf.stat().st_size, "sha256": sha256(pdf)},
            "epub": {"bytes": epub.stat().st_size, "sha256": sha256(epub)},
        },
        "validation": {
            "pdfPageCount": len(reader.pages),
            "pdfPageSizePoints": list(PDF_PAGE_SIZE),
            "epubXmlEntriesParsed": epub_xml_entries,
        },
        "privateAssets": private_assets,
        "publicAssets": public_assets,
        "failures": [],
    }
    write_json(root / "data" / "field-guide-asset-report.json", report)
    return report


def main() -> None:
    parser = argparse.ArgumentParser(description="Prepare verified FourType Field Guide release assets")
    parser.add_argument("--pdf", required=True, type=Path)
    parser.add_argument("--epub", required=True, type=Path)
    parser.add_argument("--project-root", required=True, type=Path)
    args = parser.parse_args()

    report = prepare(args.pdf.resolve(), args.epub.resolve(), args.project_root.resolve())
    print(json.dumps({"privateAssets": len(report["privateAssets"]), "publicAssets": len(report["publicAssets"])}))


if __name__ == "__main__":
    main()
