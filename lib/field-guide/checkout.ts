import { getSupporterOffer, parseSupporterSelection, type CurrencyKey, type SupporterTierKey } from './catalog'
import { FIELD_GUIDE_RELEASE } from './release'

type CheckoutSessionInput = {
  mode: 'payment'
  customer_creation: 'always'
  line_items: Array<{ price: string; quantity: 1 }>
  metadata: {
    product: 'fourtype-field-guide'
    tier: SupporterTierKey
    currency: CurrencyKey
    releaseId: string
  }
  success_url: string
  cancel_url: string
}

type PriceEnvironment = Record<string, string | undefined>

export type StripeCheckoutClient = {
  checkout: {
    sessions: {
      create: (input: CheckoutSessionInput) => Promise<{ url: string | null }>
    }
  }
}

export function assertTestStripeKey(key: string) {
  if (!key.startsWith('sk_test_')) {
    throw new Error('Only a Stripe test-mode secret is allowed')
  }
}

export function getConfiguredPriceId(
  tier: SupporterTierKey,
  currency: CurrencyKey,
  environment: PriceEnvironment = process.env,
) {
  const priceId = environment[getSupporterOffer(tier, currency).priceEnv]

  if (!priceId) {
    throw new Error('Stripe Checkout is not configured')
  }

  return priceId
}

export async function createFieldGuideCheckout(
  selection: { tier: SupporterTierKey; currency: CurrencyKey },
  origin: string,
  stripe: StripeCheckoutClient,
  environment: PriceEnvironment = process.env,
) {
  const approvedSelection = parseSupporterSelection(selection)

  if (!approvedSelection) {
    throw new Error('Unsupported supporter selection')
  }

  const checkoutOrigin = new URL(origin).origin
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_creation: 'always',
    line_items: [{
      price: getConfiguredPriceId(approvedSelection.tier, approvedSelection.currency, environment),
      quantity: 1,
    }],
    metadata: {
      product: 'fourtype-field-guide',
      tier: approvedSelection.tier,
      currency: approvedSelection.currency,
      releaseId: FIELD_GUIDE_RELEASE.id,
    },
    success_url: `${checkoutOrigin}/field-guide/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${checkoutOrigin}/field-guide/cancelled`,
  })

  if (!session.url) {
    throw new Error('Stripe Checkout did not return a URL')
  }

  return { url: session.url }
}
