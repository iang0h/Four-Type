import assert from 'node:assert/strict'
import test from 'node:test'
import { deliverEmail } from '../lib/email-transport'

test("sends Resend's supported stable idempotency header and returns a provider receipt", async () => {
  const calls: RequestInit[] = []
  const result = await deliverEmail(
    {
      to: 'supporter@example.com',
      subject: 'Your FourType access',
      text: 'Open your access page.',
      html: '<p>Open your access page.</p>',
    },
    { apiKey: 're_test', from: 'FourType <hello@example.com>' },
    'field-guide-access/4f9d8c2a',
    async (_input, init) => {
      calls.push(init ?? {})
      return new Response(JSON.stringify({ id: 'email_test_123' }), { status: 200 })
    },
  )

  assert.deepEqual(result, { sent: true, skipped: false, providerMessageId: 'email_test_123' })
  assert.equal((calls[0].headers as Record<string, string>)['Idempotency-Key'], 'field-guide-access/4f9d8c2a')
})

test('preserves legacy profile delivery success without requiring a provider receipt', async () => {
  const result = await deliverEmail(
    { to: 'profile@example.com', subject: 'Your profile', text: 'Profile', html: '<p>Profile</p>' },
    { apiKey: 're_test', from: 'FourType <hello@example.com>' },
    undefined,
    async () => new Response('', { status: 200 }),
  )

  assert.deepEqual(result, { sent: true, skipped: false })
})
