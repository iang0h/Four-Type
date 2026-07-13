import assert from 'node:assert/strict'
import test from 'node:test'
import { localizedLocales, localizedPages, localizedPath } from '../lib/localized-content'
import { getHomeCopy } from '../lib/home-i18n'
import { getQuizCopy, getQuizQuestions, getLocalizedBlendSummary } from '../lib/quiz-i18n'
import { BLENDS } from '../lib/blends'
import { getLocalizedComparisonInsight } from '../lib/comparison-i18n'
import { getShareMetadata, getShareText } from '../lib/share-copy'

test('Bahasa Indonesia covers every core locale surface', () => {
  assert.equal(localizedLocales.id.nativeLabel, 'Bahasa Indonesia')
  assert.equal(localizedPath('id', 'quiz'), '/id/quiz')
  assert.equal(localizedPages.id['temperament-test'].faq.length >= 4, true)
  assert.equal(getHomeCopy('id').heroCta.length > 0, true)
  assert.equal(getQuizQuestions('id').length, 40)
  assert.equal(
    Object.keys(BLENDS).every((key) => getLocalizedBlendSummary('id', key as keyof typeof BLENDS)),
    true
  )
  assert.equal(getQuizCopy('id').results.compareButton.length > 0, true)
})

test('Bahasa Indonesia localizes referral and pair sharing', () => {
  const pair = getLocalizedComparisonInsight('id', BLENDS.Commander, BLENDS.Guardian)
  assert.match(pair.sharedQuality, /arah|ketenangan|keputusan|kepercayaan/i)
  assert.equal(/[A-Z][a-z]+\s+(brings|protects|may)/.test(pair.complement), false)

  const shareText = getShareText(BLENDS.Commander, undefined, 'id')
  assert.match(shareText, /sangat mengenal saya/i)

  const metadata = getShareMetadata('Rani', BLENDS.Commander, 'id')
  assert.match(metadata.title, /Rani/)
  assert.match(metadata.cta, /Anda tipe yang mana/i)
})
