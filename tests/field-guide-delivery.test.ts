import assert from 'node:assert/strict'
import test from 'node:test'
import {
  claimEmailDelivery,
  completeEmailDelivery,
  releaseEmailDeliveryClaim,
} from '../lib/field-guide/delivery'
import type { PrivateBlobStore } from '../lib/field-guide/blob'

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
}

test('durably claims, retries, and records one supporter email receipt', async () => {
  const store = new MemoryBlobStore()
  const first = await claimEmailDelivery('cs_test_paid', store, 1_000)
  assert.equal(first.status, 'claimed')
  if (first.status !== 'claimed') throw new Error('Expected an email delivery claim')

  const concurrent = await claimEmailDelivery('cs_test_paid', store, 1_001)
  assert.deepEqual(concurrent, { status: 'in-progress' })

  await releaseEmailDeliveryClaim('cs_test_paid', first.claimId, store)
  const retry = await claimEmailDelivery('cs_test_paid', store, 1_002)
  assert.equal(retry.status, 'claimed')
  if (retry.status !== 'claimed') throw new Error('Expected a retry claim')
  assert.equal(retry.idempotencyKey, first.idempotencyKey)

  await completeEmailDelivery('cs_test_paid', retry.claimId, 'email_test_123', store, 1_003)
  assert.deepEqual(await claimEmailDelivery('cs_test_paid', store, 1_004), { status: 'sent' })
})

test('reclaims a stale in-progress delivery without changing its idempotency key', async () => {
  const store = new MemoryBlobStore()
  const first = await claimEmailDelivery('cs_test_paid', store, 1_000)
  if (first.status !== 'claimed') throw new Error('Expected an email delivery claim')

  const retry = await claimEmailDelivery('cs_test_paid', store, 301_000)
  assert.equal(retry.status, 'claimed')
  if (retry.status !== 'claimed') throw new Error('Expected a stale-claim retry')
  assert.equal(retry.idempotencyKey, first.idempotencyKey)
})
