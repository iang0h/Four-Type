import 'server-only'

import { env } from 'node:process'
import Stripe from 'stripe'
import { type CurrencyKey, type SupporterTierKey } from './catalog'
import {
  assertServerStripeKey,
  createFieldGuideCheckout as createCheckoutSession,
  type StripeCheckoutClient,
} from './checkout'

export { assertServerStripeKey, assertTestStripeKey, getConfiguredPriceId, type StripeCheckoutClient } from './checkout'

export function getStripe(): StripeCheckoutClient {
  const key = env.STRIPE_SECRET_KEY

  if (!key) {
    throw new Error('Stripe Checkout is not configured')
  }

  assertServerStripeKey(key)
  return new Stripe(key) as unknown as StripeCheckoutClient
}

export function createFieldGuideCheckout(
  selection: { tier: SupporterTierKey; currency: CurrencyKey },
  origin: string,
) {
  return createCheckoutSession(selection, origin, getStripe())
}
