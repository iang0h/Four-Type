import assert from 'node:assert/strict'
import test from 'node:test'
import { fulfillFieldGuideCheckout, type FieldGuideFulfillmentDependencies } from '../lib/field-guide/fulfillment'
import { createSupporterAccessEmail } from '../lib/field-guide/email'
import { FIELD_GUIDE_RELEASE } from '../lib/field-guide/release'
import { FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS } from '../lib/field-guide/tokens'
import {
  claimEmailDelivery,
  completeEmailDelivery,
  EMAIL_DELIVERY_RETRY_SEND_MIN_REMAINING_MS,
  EMAIL_DELIVERY_REUSE_MIN_REMAINING_MS,
  recordEmailDeliveryProviderAttempt,
  releaseEmailDeliveryClaim,
} from '../lib/field-guide/delivery'
import {
  findEntitlementsByEmail,
  readEntitlement,
  writeEntitlement,
  type FieldGuideEntitlement,
} from '../lib/field-guide/entitlements'
import type { PrivateBlobStore } from '../lib/field-guide/blob'

const configuredPriceIds = {
  'field-guide:usd': 'price_test_field_guide_usd',
  'field-guide:myr': 'price_test_field_guide_myr',
  'founding:usd': 'price_test_founding_usd',
  'founding:myr': 'price_test_founding_myr',
} as const

type SessionOverrides = Partial<{
  id: string
  payment_status: 'paid' | 'unpaid'
  metadata: Record<string, string> | null
  currency: string
  customer_email: string | null
  customer_details: { email: string | null } | null
  payment_intent: string | null
  line_items: { data: Array<{ price: { id: string } | null; quantity: number | null }> }
}>

class MemoryDeliveryStore implements PrivateBlobStore {
  private readonly records = new Map<string, { body: string; etag: string }>()
  private sequence = 0

  async get(pathname: string) {
    return this.records.get(pathname) ?? null
  }

  async put(pathname: string, body: string, options: Parameters<PrivateBlobStore['put']>[2]) {
    if (!options.allowOverwrite && this.records.has(pathname)) {
      throw Object.assign(new Error('Blob already exists'), { code: 'already-exists' })
    }
    if (options.ifMatch && this.records.get(pathname)?.etag !== options.ifMatch) {
      throw Object.assign(new Error('Blob precondition failed'), { code: 'precondition-failed' })
    }
    const etag = `etag-${++this.sequence}`
    this.records.set(pathname, { body, etag })
    return { etag }
  }
}

function fakeDependencies(overrides: SessionOverrides = {}) {
  const now = 1_784_673_600_000
  const entitlements = new Map<string, FieldGuideEntitlement>()
  const emailCalls: Array<{ entitlement: FieldGuideEntitlement; accessUrl: string }> = []
  const writeCalls: FieldGuideEntitlement[] = []
  let deliveryState: 'pending' | 'sending' | 'sent' = 'pending'
  const session = {
    id: 'cs_test_paid',
    payment_status: 'paid' as const,
    metadata: {
      product: 'fourtype-field-guide',
      tier: 'founding',
      currency: 'usd',
      releaseId: FIELD_GUIDE_RELEASE.id,
    },
    currency: 'usd',
    customer_email: 'supporter@example.com',
    customer_details: { email: 'supporter@example.com' },
    payment_intent: 'pi_test_paid',
    created: 1_784_673_600,
    line_items: { data: [{ price: { id: configuredPriceIds['founding:usd'] }, quantity: 1 }] },
    ...overrides,
  }

  const dependencies: FieldGuideFulfillmentDependencies = {
    retrieveSession: async () => session,
    getConfiguredPriceId: (tier, currency) => configuredPriceIds[`${tier}:${currency}`],
    readEntitlement: async (sessionId) => entitlements.get(sessionId) ?? null,
    writeEntitlement: async (entitlement) => {
      writeCalls.push(entitlement)
      if (entitlements.has(entitlement.sessionId)) return 'already-fulfilled'
      entitlements.set(entitlement.sessionId, entitlement)
      return 'fulfilled'
    },
    signAccessToken: ({ sessionId, expiresAt }) => {
      const remainingLifetime = expiresAt - now
      if (
        remainingLifetime < EMAIL_DELIVERY_REUSE_MIN_REMAINING_MS
        || remainingLifetime > FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS
      ) {
        throw new Error('Token expiry is invalid')
      }
      return `access-${sessionId}-${expiresAt}`
    },
    createAccessUrl: (token) => `https://www.fourtype.com/field-guide/access?token=${encodeURIComponent(token)}`,
    claimEmailDelivery: async () => {
      if (deliveryState === 'sent') return { status: 'sent' as const }
      if (deliveryState === 'sending') return { status: 'in-progress' as const }
      deliveryState = 'sending'
      return {
        status: 'claimed' as const,
        claimId: 'claim-1',
        idempotencyKey: 'field-guide/cs-hash',
        accessTokenExpiresAt: now + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS,
      }
    },
    recordEmailDeliveryProviderAttempt: async () => 'recorded',
    releaseEmailDeliveryClaim: async () => {
      deliveryState = 'pending'
    },
    completeEmailDelivery: async () => {
      deliveryState = 'sent'
    },
    prepareSupporterAccessEmail: (entitlement, accessUrl) => ({
      payloadDigest: 'a'.repeat(64),
      send: async () => {
        emailCalls.push({ entitlement, accessUrl })
        return { sent: true, skipped: false, providerMessageId: 'email_test_123' }
      },
    }),
    now: () => now,
  }

  return { dependencies, emailCalls, writeCalls, session, entitlements, now }
}

class FailOnceEmailIndexStore implements PrivateBlobStore {
  private readonly records = new Map<string, { body: string; etag: string }>()
  private sequence = 0
  failNextEmailIndexWrite = true

  async get(pathname: string) {
    return this.records.get(pathname) ?? null
  }

  async put(pathname: string, body: string, options: Parameters<PrivateBlobStore['put']>[2]) {
    if (pathname.includes('/by-email/') && this.failNextEmailIndexWrite) {
      this.failNextEmailIndexWrite = false
      throw new Error('Email index unavailable')
    }
    if (!options.allowOverwrite && this.records.has(pathname)) {
      throw Object.assign(new Error('Blob already exists'), { code: 'already-exists' })
    }
    if (options.ifMatch && this.records.get(pathname)?.etag !== options.ifMatch) {
      throw Object.assign(new Error('Blob precondition failed'), { code: 'precondition-failed' })
    }

    const etag = `etag-${++this.sequence}`
    this.records.set(pathname, { body, etag })
    return { etag }
  }
}

test('fulfills one paid supported Session idempotently and sends one access email', async () => {
  const fake = fakeDependencies()

  const first = await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies)
  const second = await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies)

  assert.deepEqual(first, { status: 'fulfilled' })
  assert.deepEqual(second, { status: 'already-fulfilled' })
  assert.equal(fake.writeCalls.length, 2)
  assert.equal(fake.emailCalls.length, 1)
  assert.equal(fake.emailCalls[0].entitlement.tier, 'founding')
  assert.match(fake.emailCalls[0].accessUrl, /^https:\/\/www\.fourtype\.com\/field-guide\/access\?token=/)
})

test('never fulfills an unpaid Session', async () => {
  const fake = fakeDependencies({ payment_status: 'unpaid' })

  await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), /not paid/)
  assert.equal(fake.writeCalls.length, 0)
  assert.equal(fake.emailCalls.length, 0)
})

test('retries a failed access email with the same provider idempotency key', async () => {
  const fake = fakeDependencies()
  const idempotencyKeys: string[] = []
  const accessUrls: string[] = []
  let attempts = 0
  fake.dependencies.prepareSupporterAccessEmail = (_entitlement, accessUrl, idempotencyKey) => ({
    payloadDigest: 'a'.repeat(64),
    send: async () => {
      idempotencyKeys.push(idempotencyKey)
      accessUrls.push(accessUrl)
      attempts += 1
      if (attempts === 1) throw new Error('Email transport unavailable')
      return { sent: true, skipped: false, providerMessageId: 'email_test_123' }
    },
  })

  await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), /transport unavailable/)
  assert.deepEqual(await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), { status: 'already-fulfilled' })
  assert.equal(attempts, 2)
  assert.equal(idempotencyKeys[0], idempotencyKeys[1])
  assert.equal(accessUrls[0], accessUrls[1])
})

test('records a provider attempt before sending the access email', async () => {
  const fake = fakeDependencies()
  const calls: string[] = []
  fake.dependencies.recordEmailDeliveryProviderAttempt = async () => {
    calls.push('record')
    return 'recorded'
  }
  fake.dependencies.prepareSupporterAccessEmail = () => ({
    payloadDigest: 'a'.repeat(64),
    send: async () => {
      calls.push('send')
      return { sent: true, skipped: false, providerMessageId: 'email_test_123' }
    },
  })

  await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies)
  assert.deepEqual(calls, ['record', 'send'])
})

test('does not send changed copy inside the provider ambiguity window and rotates after it', async () => {
  const fake = fakeDependencies()
  const store = new MemoryDeliveryStore()
  const createdAt = 1_000
  const initialClaim = await claimEmailDelivery('cs_test_paid', store, 'fulfillment', createdAt)
  if (initialClaim.status !== 'claimed') throw new Error('Expected an initial email delivery claim')
  await releaseEmailDeliveryClaim('cs_test_paid', initialClaim.claimId, store, 'fulfillment')

  let deliveryNow = createdAt + 23 * 60 * 60 * 1_000
  let payloadDigest = 'a'.repeat(64)
  const preparedKeys: string[] = []
  const providerCalls: string[] = []
  fake.dependencies.claimEmailDelivery = (sessionId) => claimEmailDelivery(sessionId, store, 'fulfillment', deliveryNow)
  fake.dependencies.recordEmailDeliveryProviderAttempt = (sessionId, claimId, digest) => (
    recordEmailDeliveryProviderAttempt(sessionId, claimId, digest, store, 'fulfillment', deliveryNow)
  )
  fake.dependencies.releaseEmailDeliveryClaim = (sessionId, claimId) => (
    releaseEmailDeliveryClaim(sessionId, claimId, store, 'fulfillment')
  )
  fake.dependencies.completeEmailDelivery = (sessionId, claimId, providerMessageId) => (
    completeEmailDelivery(sessionId, claimId, providerMessageId, store, 'fulfillment', deliveryNow)
  )
  fake.dependencies.signAccessToken = ({ sessionId, expiresAt }) => {
    const remainingLifetime = expiresAt - deliveryNow
    if (
      remainingLifetime < EMAIL_DELIVERY_RETRY_SEND_MIN_REMAINING_MS
      || remainingLifetime > FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS
    ) {
      throw new Error('Token expiry is invalid')
    }
    return `access-${sessionId}-${expiresAt}`
  }
  fake.dependencies.prepareSupporterAccessEmail = (_entitlement, _accessUrl, idempotencyKey) => {
    preparedKeys.push(idempotencyKey)
    return {
      payloadDigest,
      send: async () => {
        providerCalls.push(idempotencyKey)
        if (providerCalls.length === 1) throw new Error('Email transport unavailable')
        return { sent: true, skipped: false, providerMessageId: 'email_test_123' }
      },
    }
  }

  await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), /transport unavailable/)

  deliveryNow = createdAt + 25 * 60 * 60 * 1_000
  payloadDigest = 'b'.repeat(64)
  await assert.rejects(
    () => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies),
    /awaiting provider idempotency/,
  )
  assert.deepEqual(providerCalls, [initialClaim.idempotencyKey])
  assert.equal(preparedKeys[1], initialClaim.idempotencyKey)

  deliveryNow = createdAt + 47 * 60 * 60 * 1_000 + 1
  assert.deepEqual(await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), { status: 'already-fulfilled' })
  assert.equal(providerCalls.length, 2)
  assert.notEqual(preparedKeys[2], initialClaim.idempotencyKey)
})

test('sends an entitlement older than 30 days a fresh valid access token', async () => {
  const fake = fakeDependencies()
  const oldDate = new Date(fake.now - 31 * 24 * 60 * 60 * 1_000).toISOString()
  fake.entitlements.set('cs_test_paid', {
    version: 1,
    sessionId: 'cs_test_paid',
    tier: 'founding',
    currency: 'usd',
    releaseId: FIELD_GUIDE_RELEASE.id,
    customerEmail: 'supporter@example.com',
    paidAt: oldDate,
    fulfilledAt: oldDate,
  })

  assert.deepEqual(await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), { status: 'already-fulfilled' })
  assert.match(
    fake.emailCalls[0].accessUrl,
    new RegExp(`access-cs_test_paid-${fake.now + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS}`),
  )
})

test('releases the delivery claim when token signing or access URL construction fails', async () => {
  for (const failure of ['sign', 'url'] as const) {
    const fake = fakeDependencies()
    if (failure === 'sign') {
      fake.dependencies.signAccessToken = () => {
        throw new Error('Token signing failed')
      }
    } else {
      fake.dependencies.createAccessUrl = () => {
        throw new Error('Access URL failed')
      }
    }

    await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), /failed/)
    fake.dependencies.signAccessToken = ({ sessionId, expiresAt }) => `access-${sessionId}-${expiresAt}`
    fake.dependencies.createAccessUrl = (token) => `https://www.fourtype.com/field-guide/access?token=${token}`
    assert.deepEqual(await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), { status: 'already-fulfilled' })
    assert.equal(fake.emailCalls.length, 1)
  }
})

test('does not silently fulfill when email delivery is skipped', async () => {
  const fake = fakeDependencies()
  fake.dependencies.prepareSupporterAccessEmail = () => ({
    payloadDigest: 'a'.repeat(64),
    send: async () => ({ sent: false, skipped: true }),
  })

  await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), /unavailable/)
})

test('allows one concurrent access-email delivery claim', async () => {
  const fake = fakeDependencies()
  let releaseEmail: (() => void) | undefined
  const emailStarted = new Promise<void>((resolve) => {
    releaseEmail = resolve
  })
  let sendCalls = 0
  fake.dependencies.prepareSupporterAccessEmail = () => ({
    payloadDigest: 'a'.repeat(64),
    send: async () => {
      sendCalls += 1
      await emailStarted
      return { sent: true, skipped: false, providerMessageId: 'email_test_123' }
    },
  })

  const first = fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies)
  await new Promise((resolve) => setImmediate(resolve))
  const second = fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies)

  await assert.rejects(second, /in progress/)
  releaseEmail?.()
  await first
  assert.equal(sendCalls, 1)
})

test('repairs a partial email index before retrying access delivery', async () => {
  const store = new FailOnceEmailIndexStore()
  const fake = fakeDependencies()
  fake.dependencies.readEntitlement = (sessionId) => readEntitlement(sessionId, store)
  fake.dependencies.writeEntitlement = (entitlement) => writeEntitlement(entitlement, store, 'email-index-secret')

  await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), /Email index unavailable/)
  assert.deepEqual(await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), { status: 'already-fulfilled' })
  assert.equal(fake.emailCalls.length, 1)
  assert.deepEqual(
    (await findEntitlementsByEmail('supporter@example.com', store, 'email-index-secret')).map((entitlement) => entitlement.sessionId),
    ['cs_test_paid'],
  )
})

test('rejects a Session whose metadata, currency, release, or Price does not exactly match the configured offer', async () => {
  const invalidSessions: SessionOverrides[] = [
    { metadata: { product: 'other-product', tier: 'founding', currency: 'usd', releaseId: FIELD_GUIDE_RELEASE.id } },
    { metadata: { product: 'fourtype-field-guide', tier: 'field-guide', currency: 'usd', releaseId: FIELD_GUIDE_RELEASE.id } },
    { metadata: { product: 'fourtype-field-guide', tier: 'founding', currency: 'myr', releaseId: FIELD_GUIDE_RELEASE.id } },
    { metadata: { product: 'fourtype-field-guide', tier: 'founding', currency: 'usd', releaseId: 'other-release' } },
    { currency: 'myr' },
    { line_items: { data: [{ price: { id: 'price_test_other' }, quantity: 1 }] } },
  ]

  for (const overrides of invalidSessions) {
    const fake = fakeDependencies(overrides)
    await assert.rejects(() => fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies), /does not match/)
    assert.equal(fake.writeCalls.length, 0)
    assert.equal(fake.emailCalls.length, 0)
  }
})

test('returns no customer or payment data to the caller', async () => {
  const fake = fakeDependencies()

  const result = await fulfillFieldGuideCheckout('cs_test_paid', fake.dependencies)

  assert.deepEqual(Object.keys(result), ['status'])
  assert.doesNotMatch(JSON.stringify(result), /supporter@example\.com|pi_test_paid|price_test/)
})

test('builds a supporter email with tier rewards and only the private access route', () => {
  const entitlement: FieldGuideEntitlement = {
    version: 1,
    sessionId: 'cs_test_paid',
    tier: 'founding',
    currency: 'usd',
    releaseId: FIELD_GUIDE_RELEASE.id,
    customerEmail: 'supporter@example.com',
    paidAt: '2026-07-21T10:00:00.000Z',
    fulfilledAt: '2026-07-21T10:01:00.000Z',
  }
  const email = createSupporterAccessEmail(
    entitlement,
    'https://www.fourtype.com/field-guide/access?token=signed-access-token',
  )

  assert.match(email.text, /Founding Supporter/)
  assert.match(email.text, /worksheet pack/i)
  assert.match(email.text, /personal use/i)
  assert.match(email.html, /\/field-guide\/access\?token=/)
  assert.doesNotMatch(`${email.text}\n${email.html}`, /blob\.vercel-storage\.com|presignedUrl|field-guide\/edition-1\//i)
})
