import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const page = readFileSync('app/field-guide/page.tsx', 'utf8')
const campaign = readFileSync('app/field-guide/FieldGuideCampaign.tsx', 'utf8')

test('uses supporter framing and responsible-use language', () => {
  assert.match(campaign, /Help more people read the room/)
  assert.match(campaign, /reflective framework/i)
  assert.match(campaign, /diagnose, rank, hire, exclude/i)
  assert.doesNotMatch(campaign, /donat(e|ion)|tax-deductible contribution/i)
})

test('publishes truthful metadata without ratings', () => {
  assert.match(page, /https:\/\/www\.fourtype\.com\/field-guide/)
  assert.match(page, /Product/)
  assert.doesNotMatch(page, /aggregateRating|reviewRating/)
})
