# FourType Field Guide EPUB Release Design

## Goal

Produce a valid, readable reflowable EPUB release from the approved 144-page Field Guide without changing the approved PDF, manuscript meaning, visual identity, images, metadata intent, or download entitlement.

## Root Cause

The current EPUB’s inline SVG diagrams on printed pages 10, 18, and 22 have no SVG XML namespace. Their XHTML files are not declared as SVG-bearing resources in `package.opf`, causing EPUBCheck 5.3 validation errors.

## Scope

### Packaging repair

- Add `xmlns="http://www.w3.org/2000/svg"` to the three inline SVG elements.
- Add `properties="svg"` to their three manifest entries in `package.opf`.
- Rebuild the archive with `mimetype` first and uncompressed.
- Validate the exact final delivery file with EPUBCheck, ZIP integrity, XML parsing, manifest/resource checks, and SHA-256.

### Reflowable reading edition

- Replace the 144-page XHTML spine with semantic chapters that retain the approved order and content:
  - Opening
  - Map and Method
  - Commander / Choleric
  - Bard / Sanguine
  - Strategist / Melancholic
  - Guardian / Phlegmatic
  - Directional Blends
  - FourType in Real Life
  - Field Practice
  - Sources and Closing
- Use reader-facing nested navigation. Do not expose print-page filenames or duplicate a category destination as its first child.
- Use the packaged `cover.png` as the internal cover rather than reconstructing cover typography through positioned CSS.
- Hide print folios in the EPUB reading view.
- Preserve meaningful image alt text and existing internal/external links.

### Responsive content rules

- Convert comparison tables with three or more columns into accessible stacked card/list layouts at narrow reader widths.
- Keep desktop-capable table rendering where width permits it.
- Present decorative worksheet lines as reflection prompts, then link readers to the included printable worksheet PDF. Do not pretend they are editable form controls.

### Delivery

- Use the final filename `FourType Field Guide Temperament Quest.epub`.
- Keep the existing PDF untouched.
- Place the validated EPUB in the project’s private release location and create a separately named delivery copy in Downloads for review.

## Verification

- EPUBCheck: zero errors and zero warnings.
- ZIP test passes; central directory and EOCD exist; mimetype is first and stored.
- All XML/XHTML documents parse; every manifest resource and local link resolves; no duplicate IDs; every image has meaningful alt text.
- Semantic EPUB spine and nested navigation replace the 144 flat print-page navigation entries.
- Test the exact copied delivery file in two independent EPUB readers where available.
- Confirm the PDF checksum is unchanged.

## Out of Scope

- PDF redesign or PDF regeneration.
- Manuscript rewrite.
- New illustrations or visual identity changes.
- Changes to website checkout, pricing, payment, fulfilment, or public published files.
