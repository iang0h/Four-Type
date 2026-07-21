import { fulfillProductionFieldGuideCheckout } from '@/lib/field-guide/fulfillment-server'
import { getStripe } from '@/lib/field-guide/stripe'
import { createConfiguredWebhookPostHandler } from '@/lib/field-guide/webhook'

export const runtime = 'nodejs'

type StripeWebhookClient = {
  webhooks: {
    constructEvent: (payload: string, signature: string, secret: string) => {
      type: string
      data: { object: unknown }
    }
  }
}

export const POST = createConfiguredWebhookPostHandler(() => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) throw new Error('Stripe webhook is not configured')
  const stripe = getStripe() as unknown as StripeWebhookClient

  return {
    webhookSecret,
    constructEvent: (rawBody, signature, secret) => stripe.webhooks.constructEvent(rawBody, signature, secret),
    fulfill: fulfillProductionFieldGuideCheckout,
  }
})
