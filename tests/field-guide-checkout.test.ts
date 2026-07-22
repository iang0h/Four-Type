import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import {
  assertServerStripeKey,
  assertTestStripeKey,
  createFieldGuideCheckout,
  getConfiguredPriceId,
} from '../lib/field-guide/checkout'
import { createCheckoutPostHandler } from '../lib/field-guide/checkout-route'

const configuredPriceIds = {
  STRIPE_FIELD_GUIDE_USD_PRICE_ID: 'price_test_field_guide_usd',
  STRIPE_FOUNDING_SUPPORTER_USD_PRICE_ID: 'price_test_founding_usd',
}

async function withConfiguredPrices<T>(run: () => T | Promise<T>): Promise<T> {
  const previous = Object.fromEntries(
    Object.keys(configuredPriceIds).map((key) => [key, process.env[key]]),
  )

  Object.assign(process.env, configuredPriceIds)

  try {
    return await run()
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]
      else process.env[key] = value
    }
  }
}

test('maps every approved USD selection to its configured Price ID', async () => {
  await withConfiguredPrices(() => {
    assert.equal(getConfiguredPriceId('field-guide', 'usd'), 'price_test_field_guide_usd')
    assert.equal(getConfiguredPriceId('founding', 'usd'), 'price_test_founding_usd')
  })
})

test('creates an exact server-owned Checkout Session for an approved selection', async () => {
  await withConfiguredPrices(async () => {
    const created: unknown[] = []
    const stripe = {
      checkout: {
        sessions: {
          create: async (input: unknown) => {
            created.push(input)
            return { url: 'https://checkout.stripe.test/session' }
          },
        },
      },
    }

    const result = await createFieldGuideCheckout(
      { tier: 'founding', currency: 'usd' },
      'http://localhost:3000',
      stripe,
    )

    assert.deepEqual(result, { url: 'https://checkout.stripe.test/session' })
    assert.deepEqual(created, [{
      mode: 'payment',
      customer_creation: 'always',
      line_items: [{ price: 'price_test_founding_usd', quantity: 1 }],
      metadata: {
        product: 'fourtype-field-guide',
        tier: 'founding',
        currency: 'usd',
        releaseId: 'field-guide-edition-1-20260721',
      },
      success_url: 'http://localhost:3000/field-guide/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/field-guide/cancelled',
    }])
  })
})

test('rejects a live Stripe secret in this test-only implementation', () => {
  assert.throws(() => assertTestStripeKey('sk_live_secret'), /test-mode/)
})

test('accepts secret and restricted server keys while rejecting publishable keys', () => {
  assert.doesNotThrow(() => assertServerStripeKey('sk_test_secret'))
  assert.doesNotThrow(() => assertServerStripeKey('sk_live_secret'))
  assert.doesNotThrow(() => assertServerStripeKey('rk_live_restricted'))
  assert.throws(() => assertServerStripeKey('pk_live_publishable'), /server-side/)
})

test('keeps the catalog script from accepting a live Stripe key', () => {
  const script = readFileSync('scripts/field-guide/create_stripe_test_catalog.mjs', 'utf8')

  assert.match(script, /startsWith\('sk_test_'\)/)
  assert.doesNotMatch(script, /sk_live_/)
})

test('marks the Stripe client module as server-only', () => {
  const stripeModule = readFileSync('lib/field-guide/stripe.ts', 'utf8')

  assert.match(stripeModule, /import 'server-only'/)
})

test('resolves each catalog product once before sequential price processing', () => {
  const script = readFileSync('scripts/field-guide/create_stripe_test_catalog.mjs', 'utf8')

  assert.match(script, /const productsByTier = new Map\(\)/)
  assert.match(script, /await getOrCreateProduct\(tier\)/)
  assert.doesNotMatch(script, /Promise\.all\(prices\.map/)
})

function createRequest(body: string) {
  return new Request('https://attacker.example/api/field-guide/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
  })
}

function createTestHandler(siteUrl: string | undefined, origins: string[] = []) {
  return createCheckoutPostHandler({
    siteUrl,
    createCheckout: async (_selection, origin) => {
      origins.push(origin)
      return { url: 'https://checkout.stripe.test/session' }
    },
  })
}

test('returns 429 when checkout request-rate limit denies', async () => {
  const response = await createCheckoutPostHandler({
    siteUrl: 'https://www.fourtype.com',
    createCheckout: () => Promise.resolve({ url: 'https://checkout.stripe.test/session' }),
    rateLimit: async (request) => {
      assert.equal(request.headers.get('x-forwarded-for'), '203.0.113.8')
      return 'rate-limited'
    },
  })(new Request('https://www.fourtype.com/api/field-guide/checkout', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '203.0.113.8' },
    body: JSON.stringify({ tier: 'field-guide', currency: 'usd' }),
  }))

  assert.equal(response.status, 429)
})

test('returns a bodyless 400 for malformed JSON', async () => {
  const response = await createTestHandler('https://www.fourtype.com')(createRequest('{'))

  assert.equal(response.status, 400)
  assert.equal(await response.text(), '')
})

test('returns a bodyless 400 for unsupported selections', async () => {
  const response = await createTestHandler('https://www.fourtype.com')(
    createRequest(JSON.stringify({ tier: 'field-guide', currency: 'eur', amount: 1 })),
  )

  assert.equal(response.status, 400)
  assert.equal(await response.text(), '')
})

test('returns a bodyless 503 when the canonical site URL is missing or invalid', async () => {
  for (const siteUrl of [undefined, 'http://www.fourtype.com', 'https://www.fourtype.com/path']) {
    const response = await createTestHandler(siteUrl)(
      createRequest(JSON.stringify({ tier: 'field-guide', currency: 'usd' })),
    )

    assert.equal(response.status, 503)
    assert.equal(await response.text(), '')
  }
})

test('uses the configured HTTPS canonical origin instead of an attacker-controlled request URL', async () => {
  const origins: string[] = []
  const response = await createTestHandler('https://www.fourtype.com/', origins)(
    createRequest(JSON.stringify({ tier: 'founding', currency: 'usd' })),
  )

  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { url: 'https://checkout.stripe.test/session' })
  assert.deepEqual(origins, ['https://www.fourtype.com'])
})

test('allows an explicitly configured localhost canonical origin in test', async () => {
  for (const [siteUrl, expectedOrigin] of [
    ['http://localhost:3000', 'http://localhost:3000'],
    ['http://127.0.0.1:3000', 'http://127.0.0.1:3000'],
  ]) {
    const origins: string[] = []
    const response = await createTestHandler(siteUrl, origins)(
      createRequest(JSON.stringify({ tier: 'field-guide', currency: 'usd' })),
    )

    assert.equal(response.status, 200)
    assert.deepEqual(origins, [expectedOrigin])
  }
})
