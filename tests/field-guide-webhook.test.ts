import assert from 'node:assert/strict'
import test from 'node:test'
import { createConfiguredWebhookPostHandler, createWebhookPostHandler, handleVerifiedEvent } from '../lib/field-guide/webhook'

test('rejects a missing or invalid Stripe signature without reading parsed JSON', async () => {
  const handler = createWebhookPostHandler({
    webhookSecret: 'whsec_test',
    constructEvent: () => {
      throw new Error('bad signature')
    },
    fulfill: async () => ({ status: 'fulfilled' as const }),
  })

  const missing = await handler(new Request('http://localhost/api/field-guide/webhook', { method: 'POST', body: '{}' }))
  const invalid = await handler(new Request('http://localhost/api/field-guide/webhook', {
    method: 'POST',
    headers: { 'stripe-signature': 'invalid' },
    body: '{not json}',
  }))

  assert.equal(missing.status, 400)
  assert.equal(await missing.text(), '')
  assert.equal(invalid.status, 400)
  assert.equal(await invalid.text(), '')
})

test('accepts completed and asynchronous paid events after verification', async () => {
  const fulfilledSessionIds: string[] = []

  for (const type of ['checkout.session.completed', 'checkout.session.async_payment_succeeded']) {
    const result = await handleVerifiedEvent(
      { type, data: { object: { id: 'cs_test_paid' } } },
      async (sessionId) => {
        fulfilledSessionIds.push(sessionId)
        return { status: 'fulfilled' }
      },
    )
    assert.deepEqual(result, { handled: true })
  }

  assert.deepEqual(fulfilledSessionIds, ['cs_test_paid', 'cs_test_paid'])
})

test('returns success for unrelated verified events', async () => {
  let fulfilled = false
  const result = await handleVerifiedEvent(
    { type: 'customer.created', data: { object: { id: 'cus_test' } } },
    async () => {
      fulfilled = true
      return { status: 'fulfilled' }
    },
  )

  assert.deepEqual(result, { handled: false })
  assert.equal(fulfilled, false)
})

test('returns a retryable 500 when entitlement storage fails', async () => {
  const handler = createWebhookPostHandler({
    webhookSecret: 'whsec_test',
    constructEvent: (rawBody, signature, secret) => {
      assert.equal(rawBody, '{"id":"evt_test"}')
      assert.equal(signature, 'valid')
      assert.equal(secret, 'whsec_test')
      return { type: 'checkout.session.completed', data: { object: { id: 'cs_test_paid' } } }
    },
    fulfill: async () => {
      throw new Error('storage unavailable')
    },
  })

  const response = await handler(new Request('http://localhost/api/field-guide/webhook', {
    method: 'POST',
    headers: { 'stripe-signature': 'valid' },
    body: '{"id":"evt_test"}',
  }))

  assert.equal(response.status, 500)
  assert.equal(await response.text(), '')
})

test('returns 500 for missing or invalid webhook server configuration before signature verification', async () => {
  const handler = createConfiguredWebhookPostHandler(() => {
    throw new Error('Stripe configuration is unavailable')
  })

  const response = await handler(new Request('http://localhost/api/field-guide/webhook', {
    method: 'POST',
    headers: { 'stripe-signature': 'invalid' },
    body: '{}',
  }))

  assert.equal(response.status, 500)
  assert.equal(await response.text(), '')
})
