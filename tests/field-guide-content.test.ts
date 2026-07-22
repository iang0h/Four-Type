import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const page = readFileSync('app/field-guide/page.tsx', 'utf8')
const campaign = readFileSync('app/field-guide/FieldGuideCampaign.tsx', 'utf8')
const supporterTiers = 'components/field-guide/SupporterTiers.tsx'
const footer = readFileSync('components/Footer.tsx', 'utf8')

test('sells the finished book while preserving responsible-use language', () => {
  assert.match(campaign, /Read the room\. Widen your range\./)
  assert.match(campaign, /A practical, illustrated field guide for work, relationships, tension and repair\./)
  assert.match(campaign, /reflective framework/i)
  assert.match(campaign, /diagnose, rank, hire, exclude/i)
  assert.doesNotMatch(campaign, /back this campaign|early access|help publish|stretch goals|72 \/ 100|2 of 3/i)
})

test('uses exact honest digital product and access wording', () => {
  assert.match(campaign, /This is a digital product\. Nothing is shipped\./)
  assert.match(campaign, /PDF preserves the designed 7 x 10 page experience/i)
  assert.match(campaign, /EPUB reflows for adjustable text and compatible reading apps/i)
  assert.match(campaign, /personal use does not permit reposting or redistributing the files/i)
  assert.match(campaign, /revisions released within Edition 1/i)
  assert.match(campaign, /does not include every future publication/i)
  assert.match(campaign, /secure access links can expire/i)
  assert.match(campaign, /request fresh access/i)
})

test('renders configured policy links without inventing unavailable routes', () => {
  assert.match(campaign, /getFieldGuidePolicies/)
  assert.match(campaign, /FieldGuidePolicyLinks/)
})

test('exposes policy and contact routes on supporter status pages', () => {
  for (const page of [
    readFileSync('app/field-guide/success/page.tsx', 'utf8'),
    readFileSync('app/field-guide/access/page.tsx', 'utf8'),
  ]) {
    assert.match(page, /getFieldGuidePolicies/)
    assert.match(page, /FieldGuidePolicyLinks/)
    assert.doesNotMatch(page, /campaign preview|campaign page/i)
  }
})

test('publishes truthful metadata without ratings', () => {
  assert.match(page, /https:\/\/www\.fourtype\.com\/field-guide/)
  assert.match(page, /Product/)
  assert.doesNotMatch(page, /aggregateRating|reviewRating/)
  assert.doesNotMatch(page, /InStock/)
})

test('renders USD-only finished-product purchase controls', () => {
  assert.match(campaign, /<SupporterTiers \/>/)

  const component = readFileSync(supporterTiers, 'utf8')
  assert.match(component, /Digital Edition/)
  assert.match(component, /getSupporterOffer\('field-guide', 'usd'\)/)
  assert.match(component, /getSupporterOffer\('founding', 'usd'\)/)
  assert.doesNotMatch(component, /MYR|RM39|RM79|sessionStorage|Choose checkout currency/)
  assert.match(component, /Get the Field Guide/)
  assert.match(component, /Become a Founding Supporter/)
  assert.doesNotMatch(component, /disabled aria-disabled="true"/)
})

test('places pricing after the preview and links to complete policy pages', () => {
  const previewIndex = campaign.indexOf('<BookPreview />')
  const pricingIndex = campaign.indexOf('<SupporterTiers />')

  assert(previewIndex >= 0)
  assert(pricingIndex > previewIndex)
  assert.match(campaign, /Every purchase supports the free FourType quiz and future lessons\./)
  assert.doesNotMatch(campaign, /when finalized|being prepared|being finalized/i)
})

test('keeps the shared FourType promise consistent with the book', () => {
  assert.doesNotMatch(footer, /discover your true nature|know your true nature/i)
  assert.match(footer, /Notice your patterns\. Widen your choices\./)
})
