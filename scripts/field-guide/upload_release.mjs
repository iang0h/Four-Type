import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('../..', import.meta.url)))
const dryRun = process.argv.slice(2).includes('--dry-run')

if (process.argv.slice(2).some((argument) => argument !== '--dry-run')) {
  throw new Error('Usage: node scripts/field-guide/upload_release.mjs [--dry-run]')
}

function digest(bytes) {
  return createHash('sha256').update(bytes).digest('hex')
}

const release = JSON.parse(await readFile(resolve(root, 'data/field-guide-release.json'), 'utf8'))
const releaseAssets = Object.entries(release.assets).map(([key, asset]) => ({
  key,
  ...asset,
  localPath: resolve(root, 'private', asset.pathname),
}))

if (releaseAssets.length !== 3) throw new Error('Release must contain exactly three private assets')

const verifiedAssets = []
for (const asset of releaseAssets) {
  const bytes = await readFile(asset.localPath)
  if (digest(bytes) !== asset.sha256) throw new Error(`Hash mismatch: ${asset.key}`)
  verifiedAssets.push({ asset, bytes })
}

if (dryRun) {
  for (const { asset } of verifiedAssets) {
    console.log(`DRY RUN ${asset.key} ${asset.pathname} ${asset.sha256}`)
  }
  process.exit(0)
}

if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is required')

const { put } = await import('@vercel/blob')
for (const { asset, bytes } of verifiedAssets) {
  await put(asset.pathname, bytes, {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: false,
    contentType: asset.mimeType,
  })
  console.log(`UPLOADED ${asset.key} ${asset.pathname}`)
}
