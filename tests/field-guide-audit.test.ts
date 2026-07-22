import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

function runAudit(root: string, final = false) {
  try {
    execFileSync(process.execPath, ['scripts/field-guide/audit_public_assets.mjs'], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        FIELD_GUIDE_AUDIT_ROOT: root,
        FIELD_GUIDE_AUDIT_MODE: final ? 'final' : 'fixture',
      },
      encoding: 'utf8',
      stdio: 'pipe',
    })
    return { status: 0, output: '' }
  } catch (error) {
    const result = error as { status: number | null; stderr?: Buffer; stdout?: Buffer }
    return {
      status: result.status,
      output: `${result.stdout?.toString() ?? ''}${result.stderr?.toString() ?? ''}`,
    }
  }
}

type ReleaseAsset = {
  bytes: number
  pathname: string
  sha256: string
}

function readApprovedReleaseAsset(key: 'pdf' | 'worksheets') {
  const release = JSON.parse(readFileSync(join(process.cwd(), 'data', 'field-guide-release.json'), 'utf8')) as {
    assets: Record<string, ReleaseAsset>
  }
  const asset = release.assets[key]
  const pathname = join(process.cwd(), 'private', asset.pathname)

  if (!existsSync(pathname)) {
    return { asset, bytes: Buffer.alloc(asset.bytes) }
  }

  const bytes = readFileSync(pathname)
  assert.equal(bytes.length, asset.bytes)
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256)
  return { asset, bytes }
}

function writeReleaseManifest(root: string, assets: Record<string, Pick<ReleaseAsset, 'bytes' | 'sha256'>>) {
  mkdirSync(join(root, 'data'), { recursive: true })
  writeFileSync(join(root, 'data', 'field-guide-release.json'), JSON.stringify({ assets }))
}

test('public asset audit rejects complete rewards and token-shaped bundle content', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))

  try {
    mkdirSync(join(root, 'public', 'rewards'), { recursive: true })
    mkdirSync(join(root, '.next', 'static'), { recursive: true })
    writeFileSync(join(root, 'public', 'rewards', 'FourType-Field-Guide.pdf'), 'not a real reward')
    writeFileSync(join(root, '.next', 'static', 'chunk.js'), ['sk', 'test', 'auditvalue'].join('_'))

    const result = runAudit(root)

    assert.equal(result.status, 1)
    assert.match(result.output, /complete Field Guide PDF filename or content/)
    assert.match(result.output, /Stripe server key-shaped content/)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit fails closed when a final build root is missing or empty', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))

  try {
    mkdirSync(join(root, 'public'), { recursive: true })
    writeFileSync(join(root, 'public', 'index.txt'), 'public asset')

    const missingBuild = runAudit(root, true)
    assert.equal(missingBuild.status, 1)
    assert.match(missingBuild.output, /required build output is missing/i)

    mkdirSync(join(root, '.next'), { recursive: true })
    const emptyBuild = runAudit(root, true)
    assert.equal(emptyBuild.status, 1)
    assert.match(emptyBuild.output, /required build output is empty/i)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit allows a server source map to name an environment variable without a value', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))

  try {
    mkdirSync(join(root, 'public', 'images', 'field-guide'), { recursive: true })
    mkdirSync(join(root, '.next', 'server'), { recursive: true })
    writeFileSync(join(root, 'public', 'images', 'field-guide', 'preview-01.webp'), 'preview')
    writeFileSync(join(root, '.next', 'server', 'route.js.map'), JSON.stringify({
      sourcesContent: ['const configured = process.env.BLOB_READ_WRITE_TOKEN'],
    }))

    const result = runAudit(root)

    assert.equal(result.status, 0, result.output)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit rejects complete reward or token-shaped campaign source content', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))

  try {
    mkdirSync(join(root, 'app', 'field-guide'), { recursive: true })
    writeFileSync(join(root, 'app', 'field-guide', 'Campaign.tsx'), [
      "const reward = 'FourType-Field-Guide.pdf'",
      "const secret = 'whsec_auditvalue'",
    ].join('\n'))

    const result = runAudit(root)

    assert.equal(result.status, 1)
    assert.match(result.output, /complete Field Guide PDF filename or content/)
    assert.match(result.output, /Stripe webhook secret-shaped content/)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit detects renamed approved artifacts by release hash', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))
  const artifact = Buffer.from('%PDF-audit-fixture')
  const sha256 = createHash('sha256').update(artifact).digest('hex')

  try {
    mkdirSync(join(root, 'data'), { recursive: true })
    mkdirSync(join(root, 'public', 'images'), { recursive: true })
    writeFileSync(join(root, 'public', 'images', 'cover.bin'), artifact)
    writeFileSync(join(root, 'data', 'field-guide-release.json'), JSON.stringify({
      assets: {
        pdf: { bytes: artifact.length, sha256 },
      },
    }))

    const result = runAudit(root)

    assert.equal(result.status, 1)
    assert.match(result.output, /approved release asset hash/i)
    assert.doesNotMatch(result.output, /cover\.bin/)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit detects encoded, split, and flexible secret assignments without echoing values', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))
  const encoded = Buffer.from(['sk', 'live', 'auditvalue'].join('_')).toString('base64')

  try {
    mkdirSync(join(root, 'client'), { recursive: true })
    writeFileSync(join(root, 'client', 'client.ts'), [
      `const encoded = '${encoded}'`,
      "const split = ['sk', 'test', 'auditvalue'].join('_')",
      "const concatenated = 'whsec' + '_' + 'auditvalue'",
      "const templated = `sk_${'live'}_${'auditvalue'}`",
      'const blob = BLOB_READ_WRITE_TOKEN : "configured"',
    ].join('\n'))

    const result = runAudit(root)

    assert.equal(result.status, 1)
    assert.match(result.output, /encoded credential-shaped content/i)
    assert.match(result.output, /reconstructed credential-shaped content/i)
    assert.match(result.output, /Blob token assignment/i)
    assert.doesNotMatch(result.output, /auditvalue|BLOB_READ_WRITE_TOKEN\s*:/)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit detects credential fragments reconstructed across public and client build files', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))

  try {
    mkdirSync(join(root, 'public'), { recursive: true })
    mkdirSync(join(root, '.next', 'static'), { recursive: true })
    writeFileSync(join(root, 'public', 'first.js'), "const prefix = 'sk_'")
    writeFileSync(join(root, '.next', 'static', 'second.js'), "const suffix = 'live_auditvalue'")

    const result = runAudit(root)

    assert.equal(result.status, 1)
    assert.match(result.output, /aggregate credential-shaped content/i)
    assert.doesNotMatch(result.output, /auditvalue|first\.js|second\.js/)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit hashes approved release bytes decoded from Base64 and data URIs', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))
  const pdf = readApprovedReleaseAsset('pdf')
  const worksheets = readApprovedReleaseAsset('worksheets')

  try {
    mkdirSync(join(root, '.next', 'static'), { recursive: true })
    writeReleaseManifest(root, {
      pdf: pdf.asset,
      worksheets: worksheets.asset,
    })
    writeFileSync(
      join(root, '.next', 'static', 'embedded-release.js'),
      `const pdf = 'data:application/pdf;base64,${pdf.bytes.toString('base64')}'`,
    )
    writeFileSync(join(root, '.next', 'static', 'embedded-worksheets.js'), worksheets.bytes.toString('base64'))

    const result = runAudit(root)

    assert.equal(result.status, 1)
    assert.match(result.output, /encoded approved release asset hash/i)
    assert.doesNotMatch(result.output, /embedded-release|embedded-worksheets|data:application\/pdf/i)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})

test('public asset audit redacts filenames that contain credential-shaped text', () => {
  const root = mkdtempSync(join(tmpdir(), 'field-guide-audit-'))

  try {
    mkdirSync(join(root, 'public'), { recursive: true })
    writeFileSync(join(root, 'public', 'sk_live_auditvalue.js'), 'safe')
    writeFileSync(join(root, 'public', 'rk_live_auditvalue.js'), 'safe')
    writeFileSync(join(root, 'public', 'BLOB_READ_WRITE_TOKEN_auditvalue.js'), 'safe')

    const result = runAudit(root)

    assert.equal(result.status, 1)
    assert.match(result.output, /public\/\[redacted-filename\]: Stripe server key-shaped filename/i)
    assert.match(result.output, /public\/\[redacted-filename\]: Blob token-shaped filename/i)
    assert.doesNotMatch(result.output, /sk_live_auditvalue|rk_live_auditvalue|BLOB_READ_WRITE_TOKEN_auditvalue/)
  } finally {
    rmSync(root, { force: true, recursive: true })
  }
})
