import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getSupporterOffer,
  parseSupporterSelection,
} from '../lib/field-guide/catalog'

test('maps each approved tier to its USD display amount', () => {
  assert.equal(getSupporterOffer('field-guide', 'usd').amount, 1200)
  assert.equal(getSupporterOffer('founding', 'usd').amount, 2500)
})

test('rejects client-controlled prices and unsupported keys', () => {
  assert.deepEqual(parseSupporterSelection({ tier: 'founding', currency: 'usd' }), {
    tier: 'founding',
    currency: 'usd',
  })
  assert.equal(parseSupporterSelection({ tier: 'founding', currency: 'myr' }), null)
  assert.equal(parseSupporterSelection({ tier: 'founding', currency: 'eur', amount: 1 }), null)
})
