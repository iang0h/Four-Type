import assert from 'node:assert/strict'
import test from 'node:test'
import {
  authorizeAsset,
  createDownloadGetHandler,
  createRequestAccessPostHandler,
  resolveDownload,
  resolveVerifiedSuccessAccess,
  padAccessResponse,
} from '../lib/field-guide/access'
import { FIELD_GUIDE_RELEASE } from '../lib/field-guide/release'
import type { FieldGuideEntitlement } from '../lib/field-guide/entitlements'

const fieldGuideEntitlement: FieldGuideEntitlement = {
  version: 1,
  sessionId: 'cs_test_field_guide',
  tier: 'field-guide',
  currency: 'usd',
  releaseId: FIELD_GUIDE_RELEASE.id,
  customerEmail: 'supporter@example.com',
  paidAt: '2026-07-21T00:00:00.000Z',
  fulfilledAt: '2026-07-21T00:00:00.000Z',
}

const foundingEntitlement: FieldGuideEntitlement = {
  ...fieldGuideEntitlement,
  sessionId: 'cs_test_founding',
  tier: 'founding',
}

function downloadDependencies(overrides: Partial<Parameters<typeof resolveDownload>[2]> = {}) {
  return {
    verifyDownloadToken: (token: string) => token === 'valid-pdf'
      ? { sessionId: 'cs_test_field_guide', asset: 'pdf' as const, expiresAt: 2_000 }
      : null,
    readEntitlement: async (sessionId: string) => sessionId === fieldGuideEntitlement.sessionId ? fieldGuideEntitlement : null,
    createPrivateAssetUrl: async (pathname: string) => `https://private.example/${pathname}`,
    ...overrides,
  }
}

test('allows included assets and blocks the wrong tier', () => {
  assert.equal(authorizeAsset(fieldGuideEntitlement, 'pdf').allowed, true)
  assert.equal(authorizeAsset(fieldGuideEntitlement, 'worksheets').allowed, false)
  assert.equal(authorizeAsset(foundingEntitlement, 'worksheets').allowed, true)
})

test('resolves only a token bound to the requested included asset', async () => {
  const resolved = await resolveDownload('valid-pdf', 'pdf', downloadDependencies())

  assert.deepEqual(resolved, {
    asset: 'pdf',
    currency: 'usd',
    tier: 'field-guide',
    url: `https://private.example/${FIELD_GUIDE_RELEASE.assets.pdf.pathname}`,
  })
  assert.equal(await resolveDownload('valid-pdf', 'epub', downloadDependencies()), null)
})

test('rejects expired, tampered and mismatched release tokens', async () => {
  assert.equal(await resolveDownload('expired', 'pdf', downloadDependencies()), null)
  assert.equal(await resolveDownload('tampered', 'pdf', downloadDependencies()), null)
  assert.equal(await resolveDownload('old-release', 'pdf', downloadDependencies({
    verifyDownloadToken: () => ({ sessionId: 'cs_test_field_guide', asset: 'pdf', expiresAt: 2_000 }),
    readEntitlement: async () => ({ ...fieldGuideEntitlement, releaseId: 'field-guide-edition-0' }),
  })), null)
})

test('never mints a private URL for an unknown asset or missing entitlement', async () => {
  let signCalls = 0
  const dependencies = downloadDependencies({
    createPrivateAssetUrl: async () => {
      signCalls += 1
      return 'https://private.example/file'
    },
  })

  assert.equal(await resolveDownload('valid-pdf', 'archive', dependencies), null)
  assert.equal(await resolveDownload('valid-pdf', 'pdf', downloadDependencies({ readEntitlement: async () => null })), null)
  assert.equal(signCalls, 0)
})

test('caps anonymous access-response timing padding', async () => {
  const waits: number[] = []
  await padAccessResponse(1_000, 1_005, (milliseconds) => {
    waits.push(milliseconds)
    return Promise.resolve()
  })
  await padAccessResponse(1_000, 1_200, (milliseconds) => {
    waits.push(milliseconds)
    return Promise.resolve()
  })

  assert.deepEqual(waits, [15])
})

test('renews access without disclosing whether a normalized email has records', async () => {
  const lookups: string[] = []
  const sent: string[] = []
  const pads: number[] = []
  const handler = createRequestAccessPostHandler({
    findEntitlementsByEmail: async (email) => {
      lookups.push(email)
      return email === 'supporter@example.com' ? [fieldGuideEntitlement] : []
    },
    sendFreshAccessEmail: async (entitlement) => { sent.push(entitlement.sessionId) },
    padResponse: async () => { pads.push(1) },
  })

  const known = await handler(new Request('http://localhost/api/field-guide/request-access', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: ' Supporter@Example.com ' }),
  }))
  const unknown = await handler(new Request('http://localhost/api/field-guide/request-access', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'nobody@example.com' }),
  }))

  assert.equal(known.status, 200)
  assert.equal(unknown.status, 200)
  assert.equal(await known.text(), await unknown.text())
  assert.deepEqual(lookups, ['supporter@example.com', 'nobody@example.com'])
  assert.deepEqual(sent, ['cs_test_field_guide'])
  assert.deepEqual(pads, [1, 1])
})

test('returns the same renewal response without lookup for malformed input', async () => {
  let lookups = 0
  const handler = createRequestAccessPostHandler({
    findEntitlementsByEmail: async () => {
      lookups += 1
      return []
    },
    sendFreshAccessEmail: async () => {},
    padResponse: async () => {},
  })

  const malformed = await handler(new Request('http://localhost/api/field-guide/request-access', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'not-an-email' }),
  }))
  const oversized = await handler(new Request('http://localhost/api/field-guide/request-access', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: `${'a'.repeat(310)}@example.com` }),
  }))

  assert.equal(malformed.status, 200)
  assert.equal(await malformed.text(), await oversized.text())
  assert.equal(lookups, 0)
})

test('schedules valid renewal lookup after the fixed response path', async () => {
  let lookups = 0
  let scheduled: (() => Promise<void>) | undefined
  const handler = createRequestAccessPostHandler({
    findEntitlementsByEmail: async () => {
      lookups += 1
      return []
    },
    sendFreshAccessEmail: async () => {},
    padResponse: async () => {},
    schedule: (work) => { scheduled = work },
  })

  const response = await handler(new Request('http://localhost/api/field-guide/request-access', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'supporter@example.com' }),
  }))

  assert.equal(response.status, 200)
  assert.equal(lookups, 0)
  await scheduled?.()
  assert.equal(lookups, 1)
})

test('redirects an authorized download and tracks no sensitive values', async () => {
  const analytics: unknown[] = []
  const handler = createDownloadGetHandler({
    ...downloadDependencies(),
    trackDownload: (payload) => { analytics.push(payload) },
  })

  const response = await handler(
    new Request('http://localhost/api/field-guide/download/pdf?token=valid-pdf'),
    { params: Promise.resolve({ asset: 'pdf' }) },
  )

  assert.equal(response.status, 303)
  assert.equal(response.headers.get('location'), `https://private.example/${FIELD_GUIDE_RELEASE.assets.pdf.pathname}`)
  assert.deepEqual(analytics, [{ tier: 'field-guide', currency: 'usd', asset: 'pdf' }])
})

test('denies invalid download requests without a redirect or analytics event', async () => {
  let tracked = false
  const handler = createDownloadGetHandler({
    ...downloadDependencies(),
    trackDownload: () => { tracked = true },
  })

  const response = await handler(
    new Request('http://localhost/api/field-guide/download/worksheets?token=valid-pdf'),
    { params: Promise.resolve({ asset: 'worksheets' }) },
  )

  assert.equal(response.status, 404)
  assert.equal(response.headers.get('location'), null)
  assert.equal(tracked, false)
})

test('keeps immediate success access when post-payment email delivery is unavailable', async () => {
  const entitlement = await resolveVerifiedSuccessAccess('cs_test_field_guide', {
    fulfill: async () => { throw new Error('Field Guide access email delivery is unavailable') },
    readEntitlement: async () => fieldGuideEntitlement,
  })

  assert.equal(entitlement?.sessionId, fieldGuideEntitlement.sessionId)
})

test('does not expose success access without a persisted paid entitlement', async () => {
  const entitlement = await resolveVerifiedSuccessAccess('cs_test_unpaid', {
    fulfill: async () => { throw new Error('Checkout Session is not paid') },
    readEntitlement: async () => null,
  })

  assert.equal(entitlement, null)
})
