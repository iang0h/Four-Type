import assert from 'node:assert/strict'
import test from 'node:test'
import { getFieldGuidePolicies } from '../lib/field-guide/policies'

test('never invents a refund promise when policy is missing', () => {
  const policy = getFieldGuidePolicies({})

  assert.equal(policy.refund.href, null)
  assert.match(policy.refund.copy, /policy is being finalized/i)
  assert.match(policy.refund.copy, /does not make a refund promise/i)
  assert(policy.missing.includes('refund'))
})

test('uses complete first-party policy routes by default', () => {
  const policy = getFieldGuidePolicies()

  assert.equal(policy.refund.href, '/field-guide/refunds')
  assert.equal(policy.privacy.href, '/field-guide/privacy')
  assert.equal(policy.terms.href, '/field-guide/terms')
  assert.equal(policy.contact.href, '/field-guide/contact')
  assert.deepEqual(policy.missing, [])
})

test('accepts root-relative and first-party HTTPS policy URLs', () => {
  const policy = getFieldGuidePolicies({
    FOURTYPE_REFUND_POLICY_URL: '/refunds',
    FOURTYPE_PRIVACY_URL: 'https://www.fourtype.com/privacy',
    FOURTYPE_TERMS_URL: '/legal/privacy-policy',
    FOURTYPE_CONTACT_URL: 'https://www.fourtype.com/legal/privacy_policy/',
  })

  assert.equal(policy.refund.href, '/refunds')
  assert.equal(policy.privacy.href, 'https://www.fourtype.com/privacy')
  assert.equal(policy.terms.href, '/legal/privacy-policy')
  assert.equal(policy.contact.href, 'https://www.fourtype.com/legal/privacy_policy/')
  assert.deepEqual(policy.missing, [])
})

test('accepts only the approved absolute host and HTTPS default port', () => {
  const policy = getFieldGuidePolicies({
    FOURTYPE_REFUND_POLICY_URL: 'https://www.fourtype.com:443/refunds',
    FOURTYPE_PRIVACY_URL: 'https://fourtype.com/privacy',
    FOURTYPE_TERMS_URL: 'https://www.fourtype.com:8443/terms',
  })

  assert.equal(policy.refund.href, 'https://www.fourtype.com:443/refunds')
  assert.equal(policy.privacy.href, null)
  assert.equal(policy.terms.href, null)
})

test('rejects unsafe or non-first-party policy URL values', () => {
  const invalidUrls = [
    '//evil.example/refunds',
    'http://www.fourtype.com/refunds',
    'https://evil.example/refunds',
    'https://www.fourtype.com.evil.example/refunds',
    'https://www.fourtype.com@evil.example/refunds',
    'https://www.fourtype.com:8443/refunds',
    '/refunds\\next',
    '/refunds\u0000',
    '/refunds?next=%5c',
    '/refunds?next=%0A',
    '/refunds#section',
    '/refunds%5cnext',
    '/refunds%255cnext',
    '/refunds%2525250A',
    '/legal/privacy.policy',
    '/legal/privacy policy',
    '/legal//privacy-policy',
    'https://www.fourtype.com/refunds?next=%255c',
    'https://www.fourtype.com/refunds#section',
  ]

  for (const value of invalidUrls) {
    const policy = getFieldGuidePolicies({ FOURTYPE_REFUND_POLICY_URL: value })
    assert.equal(policy.refund.href, null, value)
    assert(policy.missing.includes('refund'), value)
  }
})

test('reports every missing or rejected policy decision', () => {
  const policy = getFieldGuidePolicies({
    FOURTYPE_REFUND_POLICY_URL: 'https://outside.example/refunds',
    FOURTYPE_PRIVACY_URL: '/privacy',
  })

  assert.deepEqual(policy.missing, ['refund', 'terms', 'contact'])
  assert.match(policy.terms.copy, /terms.*being finalized/i)
  assert.match(policy.contact.copy, /contact.*being finalized/i)
})
