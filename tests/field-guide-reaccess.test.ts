import assert from 'node:assert/strict'
import test from 'node:test'
import { claimReaccessCooldown, REACCESS_COOLDOWN_MS } from '../lib/field-guide/reaccess-cooldown'
import { deliverReaccessEntitlement } from '../lib/field-guide/reaccess'
import {
  claimEmailDelivery,
  completeEmailDelivery,
  recordEmailDeliveryProviderAttempt,
} from '../lib/field-guide/delivery'
import type { PrivateBlobStore } from '../lib/field-guide/blob'
import type { FieldGuideEntitlement } from '../lib/field-guide/entitlements'

class MemoryBlobStore implements PrivateBlobStore {
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

  serialized() {
    return [...this.records.entries()]
  }
}

const entitlement: FieldGuideEntitlement = {
  version: 1,
  sessionId: 'cs_test_reaccess',
  tier: 'field-guide',
  currency: 'usd',
  releaseId: 'field-guide-edition-1-20260721',
  customerEmail: 'supporter@example.com',
  paidAt: '2026-07-21T00:00:00.000Z',
  fulfilledAt: '2026-07-21T00:00:00.000Z',
}

test('claims one HMAC-keyed re-access cooldown without persisting the email', async () => {
  const store = new MemoryBlobStore()
  const claims = await Promise.all(Array.from({ length: 4 }, () => (
    claimReaccessCooldown(' Supporter@Example.com ', store, 'email-index-secret', 1_000)
  )))

  assert.equal(claims.filter((claim) => claim === 'claimed').length, 1)
  assert.equal(claims.filter((claim) => claim === 'cooldown').length, 3)
  assert.equal(await claimReaccessCooldown('supporter@example.com', store, 'email-index-secret', 1_000 + REACCESS_COOLDOWN_MS), 'claimed')
  const persisted = store.serialized().map(([pathname, body]) => `${pathname}\n${body}`).join('\n')
  assert.doesNotMatch(persisted, /supporter@example\.com/i)
  assert.match(persisted, /field-guide\/reaccess\/by-email\/[a-f0-9]{64}\.json/)
})

test('uses a namespaced durable delivery claim with a stable provider key and payload digest', async () => {
  const calls: string[] = []
  const state = { released: false, sent: false }
  const dependencies = {
    claimDelivery: async () => state.sent
      ? { status: 'sent' as const }
      : { status: 'claimed' as const, claimId: 'claim-1', idempotencyKey: 'reaccess-key-1', accessTokenExpiresAt: 2_000 },
    recordProviderAttempt: async (_claimId: string, digest: string) => {
      calls.push(`digest:${digest}`)
      return 'recorded' as const
    },
    releaseDelivery: async () => { state.released = true },
    completeDelivery: async (_claimId: string, providerMessageId: string) => {
      calls.push(`complete:${providerMessageId}`)
      state.sent = true
    },
    signAccessToken: () => 'signed-access-token',
    createAccessUrl: () => 'https://www.fourtype.com/field-guide/access?token=signed-access-token',
    prepareEmail: (_entitlement: FieldGuideEntitlement, _url: string, idempotencyKey: string) => ({
      payloadDigest: 'a'.repeat(64),
      send: async () => {
        calls.push(`send:${idempotencyKey}`)
        return { sent: true, skipped: false, providerMessageId: 'email-reaccess-1' }
      },
    }),
  }

  assert.equal(await deliverReaccessEntitlement(entitlement, dependencies), 'sent')
  assert.equal(await deliverReaccessEntitlement(entitlement, dependencies), 'already-sent')
  assert.deepEqual(calls, [
    `digest:${'a'.repeat(64)}`,
    'send:reaccess-key-1',
    'complete:email-reaccess-1',
  ])
  assert.equal(state.released, false)
})

test('persists a real re-access provider attempt and receipt in its own namespace', async () => {
  const store = new MemoryBlobStore()
  const claim = await claimEmailDelivery('cs_test_reaccess', store, 'reaccess', 1_000)
  if (claim.status !== 'claimed') throw new Error('Expected a re-access delivery claim')

  assert.equal(
    await recordEmailDeliveryProviderAttempt(
      'cs_test_reaccess',
      claim.claimId,
      'a'.repeat(64),
      store,
      'reaccess',
      1_000,
    ),
    'recorded',
  )
  await completeEmailDelivery('cs_test_reaccess', claim.claimId, 'email-reaccess-1', store, 'reaccess', 1_001)

  assert.deepEqual(await claimEmailDelivery('cs_test_reaccess', store, 'reaccess', 1_002), { status: 'sent' })
  assert.equal(store.serialized().filter(([pathname]) => pathname.includes('/reaccess-delivery/')).length, 1)
  assert.equal(store.serialized().filter(([pathname]) => pathname.includes('/email-delivery/')).length, 0)
})

test('releases a re-access delivery claim after transport failure without exposing its payload', async () => {
  let released = false
  await assert.rejects(() => deliverReaccessEntitlement(entitlement, {
    claimDelivery: async () => ({ status: 'claimed' as const, claimId: 'claim-1', idempotencyKey: 'reaccess-key-1', accessTokenExpiresAt: 2_000 }),
    recordProviderAttempt: async () => 'recorded' as const,
    releaseDelivery: async () => { released = true },
    completeDelivery: async () => {},
    signAccessToken: () => 'signed-access-token',
    createAccessUrl: () => 'https://www.fourtype.com/field-guide/access?token=signed-access-token',
    prepareEmail: () => ({ payloadDigest: 'a'.repeat(64), send: async () => { throw new Error('transport unavailable') } }),
  }), /transport unavailable/)
  assert.equal(released, true)
})
