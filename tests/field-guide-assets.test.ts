import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import release from '../data/field-guide-release.json'

test('public contains previews but no complete reward files', () => {
  const files = readdirSync(join(process.cwd(), 'public'), { recursive: true }).map(String)

  assert(files.some((name) => name.endsWith('preview-109.webp')))
  assert.equal(files.some((name) => /FourType-Field-Guide\.(pdf|epub)$/i.test(name)), false)
  assert.equal(files.some((name) => /Worksheets\.pdf$/i.test(name)), false)
})

test('locks the deterministic worksheet artifact checksum', () => {
  assert.equal(release.assets.worksheets.bytes, 55439)
  assert.equal(release.assets.worksheets.sha256, '153a9683e15687ba53c97ba59e2c5446d5e7a18dfe2666f94c382db64e1b3d6f')
})
