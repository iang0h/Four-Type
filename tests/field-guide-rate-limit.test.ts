import assert from 'node:assert/strict'
import test from 'node:test'
import type { PrivateBlobStore } from '../lib/field-guide/blob'
import { createRateLimiter, getRateLimitIdentifier } from '../lib/field-guide/rate-limit'

type PutCall = {
  pathname: string
  body: string
  options: {
    access: 'private'
    addRandomSuffix: false
    allowOverwrite: boolean
    contentType: 'application/json'
    ifMatch?: string
  }
}

class MemoryBlobStore implements PrivateBlobStore {
  private readonly records = new Map<string, { body: string; etag: string }>()
  private etag = 0
  private preconditionFailures = 0

  preconditionConflictCalls = 0
  readonly putCalls: PutCall[] = []

  async get(pathname: string, options: { access: 'private'; useCache: false }) {
    assert.deepEqual(options, { access: 'private', useCache: false })
    const record = this.records.get(pathname)
    if (!record) return null
    return { ...record }
  }

  async put(pathname: string, body: string, options: PutCall['options']) {
    this.putCalls.push({ pathname, body, options })

    if (options.ifMatch && this.preconditionFailures > 0) {
      this.preconditionFailures -= 1
      this.preconditionConflictCalls += 1
      throw Object.assign(new Error('Blob precondition failed'), { code: 'precondition-failed' })
    }

    if (options.ifMatch && this.records.get(pathname)?.etag !== options.ifMatch) {
      this.preconditionConflictCalls += 1
      throw Object.assign(new Error('Blob precondition failed'), { code: 'precondition-failed' })
    }

    const etag = `etag-${++this.etag}`
    this.records.set(pathname, { body, etag })
    return { etag }
  }

  addPreconditionFailures(count: number) {
    this.preconditionFailures = count
  }
}

test('allows requests up to capacity and rejects the next request', async () => {
  const store = new MemoryBlobStore()
  const limiter = createRateLimiter({ store, action: 'request-test', capacity: 2, windowMs: 60_000 })

  assert.equal(await limiter('203.0.113.8', 1), 'allowed')
  assert.equal(await limiter('203.0.113.8', 1), 'allowed')
  assert.equal(await limiter('203.0.113.8', 1), 'rate-limited')
  assert.equal(store.putCalls.length, 2)
})

test('advances count into a later fixed window', async () => {
  const store = new MemoryBlobStore()
  const limiter = createRateLimiter({ store, action: 'request-test', capacity: 1, windowMs: 60_000 })

  assert.equal(await limiter('203.0.113.8', 0), 'allowed')
  assert.equal(await limiter('203.0.113.8', 60_000), 'allowed')
  assert.equal(store.putCalls.length, 2)
  assert.equal(JSON.parse(store.putCalls[0].body).windowStartMs, 0)
  assert.equal(JSON.parse(store.putCalls[1].body).windowStartMs, 60_000)
})

test('retries on precondition failures without corrupting rate accounting', async () => {
  const store = new MemoryBlobStore()
  const limiter = createRateLimiter({ store, action: 'request-test', capacity: 5, windowMs: 60_000 })

  assert.equal(await limiter('203.0.113.8', 0), 'allowed')
  store.addPreconditionFailures(2)
  assert.equal(await limiter('203.0.113.8', 0), 'allowed')

  assert.equal(store.preconditionConflictCalls >= 2, true)
})

test('isolates visitors and never stores raw client IP addresses', async () => {
  const store = new MemoryBlobStore()
  const limiter = createRateLimiter({ store, action: 'checkout', capacity: 1, windowMs: 60_000 })

  assert.equal(await limiter('203.0.113.8', 0), 'allowed')
  assert.equal(await limiter('203.0.113.9', 0), 'allowed')
  assert.equal(await limiter('203.0.113.8', 0), 'rate-limited')
  assert.equal(store.putCalls.length, 2)
  assert(store.putCalls.every((call) => !call.pathname.includes('203.0.113')))
  assert.notEqual(store.putCalls[0].pathname, store.putCalls[1].pathname)
})

test('uses Vercel client IP headers and a bounded local fallback', () => {
  assert.equal(getRateLimitIdentifier(new Request('https://www.fourtype.com', {
    headers: { 'x-vercel-forwarded-for': '203.0.113.8' },
  })), '203.0.113.8')
  assert.equal(getRateLimitIdentifier(new Request('http://localhost:3000')), 'local')
})
