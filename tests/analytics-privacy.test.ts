import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { buildAnalyticsEventBody } from '../lib/analytics'
import { createEventsPostHandler } from '../app/api/events/route'

test('client analytics body strips supporter query credentials and fragments', () => {
  const body = JSON.parse(buildAnalyticsEventBody(
    { event: 'field-guide-access-request' },
    { pathname: '/field-guide/access', search: '?token=access-secret', hash: '#private' },
  ))

  assert.equal(body.path, '/field-guide/access')
  assert.doesNotMatch(JSON.stringify(body), /access-secret|token=/)
})

test('events route persists only pathname and drops sensitive query-like fields', async () => {
  const appended: unknown[] = []
  const handler = createEventsPostHandler({
    isConfigured: () => true,
    append: async (payload) => { appended.push(payload) },
  })

  const response = await handler(new Request('https://www.fourtype.com/api/events', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      event: 'field-guide-download',
      tier: 'founding',
      currency: 'usd',
      asset: 'worksheets',
      path: 'https://www.fourtype.com/field-guide/success?session_id=cs_secret#private',
      source: 'token=access-secret',
      resultName: 'Receipt for supporter@example.com',
      email: 'supporter@example.com',
      token: 'access-secret',
      session_id: 'cs_secret',
    }),
  }))

  assert.equal(response.status, 200)
  assert.deepEqual(appended, [{
    event: 'field-guide-download',
    locale: '',
    blendKey: '',
    inviterBlendKey: '',
    resultName: '',
    shareId: '',
    compareWith: '',
    source: '',
    chapter: undefined,
    question: undefined,
    path: '/field-guide/success',
    userAgent: '',
  }])
  assert.doesNotMatch(JSON.stringify(appended), /access-secret|cs_secret|supporter@example\.com|token=|session_id=/)
})

test('customer-facing API routes do not log caught request or delivery errors', () => {
  for (const route of ['app/api/events/route.ts', 'app/api/leads/route.ts']) {
    assert.doesNotMatch(readFileSync(join(process.cwd(), route), 'utf8'), /console\.(error|warn|log)/)
  }
})
