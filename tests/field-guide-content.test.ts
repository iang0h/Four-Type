import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const page = readFileSync('app/field-guide/page.tsx', 'utf8')
const campaign = readFileSync('app/field-guide/FieldGuideCampaign.tsx', 'utf8')
const supporterTiers = 'components/field-guide/SupporterTiers.tsx'

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
  assert.doesNotMatch(page, /InStock/)
})

test('renders active supporter controls with explicit session-persisted currency selection', () => {
  assert.match(campaign, /<SupporterTiers \/>/)

  const component = readFileSync(supporterTiers, 'utf8')
  assert.match(component, /sessionStorage/)
  assert.match(component, /USD/)
  assert.match(component, /MYR/)
  assert.match(component, /role="group"/)
  assert.match(component, /aria-label="Choose checkout currency"/)
  assert.match(component, /Support and receive the guide/)
  assert.match(component, /Become a Founding Supporter/)
  assert.doesNotMatch(component, /disabled aria-disabled="true"/)
})
