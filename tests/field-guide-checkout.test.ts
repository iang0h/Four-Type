import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import {
  assertTestStripeKey,
  createFieldGuideCheckout,
  getConfiguredPriceId,
} from '../lib/field-guide/stripe'

const configuredPriceIds = {
  STRIPE_FIELD_GUIDE_USD_PRICE_ID: 'price_test_field_guide_usd',
  STRIPE_FIELD_GUIDE_MYR_PRICE_ID: 'price_test_field_guide_myr',
  STRIPE_FOUNDING_SUPPORTER_USD_PRICE_ID: 'price_test_founding_usd',
  STRIPE_FOUNDING_SUPPORTER_MYR_PRICE_ID: 'price_test_founding_myr',
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

test('maps every approved selection to its configured Price ID', async () => {
  await withConfiguredPrices(() => {
    assert.equal(getConfiguredPriceId('field-guide', 'usd'), 'price_test_field_guide_usd')
    assert.equal(getConfiguredPriceId('field-guide', 'myr'), 'price_test_field_guide_myr')
    assert.equal(getConfiguredPriceId('founding', 'usd'), 'price_test_founding_usd')
    assert.equal(getConfiguredPriceId('founding', 'myr'), 'price_test_founding_myr')
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
      { tier: 'founding', currency: 'myr' },
      'http://localhost:3000',
      stripe,
    )

    assert.deepEqual(result, { url: 'https://checkout.stripe.test/session' })
    assert.deepEqual(created, [{
      mode: 'payment',
      customer_creation: 'always',
      line_items: [{ price: 'price_test_founding_myr', quantity: 1 }],
      metadata: {
        product: 'fourtype-field-guide',
        tier: 'founding',
        currency: 'myr',
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

test('keeps the catalog script from accepting a live Stripe key', () => {
  const script = readFileSync('scripts/field-guide/create_stripe_test_catalog.mjs', 'utf8')

  assert.match(script, /startsWith\('sk_test_'\)/)
  assert.doesNotMatch(script, /sk_live_/)
})
