import assert from 'node:assert/strict'
import test from 'node:test'
import { FIELD_GUIDE_RELEASE, assetsForTier } from '../lib/field-guide/release'

test('locks the approved source hashes and private pathnames', () => {
  assert.equal(FIELD_GUIDE_RELEASE.id, 'field-guide-edition-1-20260721')
  assert.equal(FIELD_GUIDE_RELEASE.assets.pdf.sha256, '18aa32b98edd6c2e53d510d3aa660811177f0a63b62a0d7c370340649e974617')
  assert.equal(FIELD_GUIDE_RELEASE.assets.epub.sha256, '0e6de6d2e22876daec0b1b7fb0bbbaabc59a4058a63b595ab3e336c35a9c5b32')
  assert.equal(FIELD_GUIDE_RELEASE.assets.epub.bytes, 12392695)
  assert.equal(
    FIELD_GUIDE_RELEASE.assets.epub.pathname,
    'field-guide/edition-1-epubcheck-20260723/FourType-Field-Guide.epub',
  )
  assert.match(FIELD_GUIDE_RELEASE.assets.pdf.pathname, /^field-guide\/edition-1\//)
})

test('limits worksheets to Founding Supporters', () => {
  assert.deepEqual(assetsForTier('field-guide'), ['pdf', 'epub'])
  assert.deepEqual(assetsForTier('founding'), ['pdf', 'epub', 'worksheets'])
})
