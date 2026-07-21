import { createCheckoutPostHandler } from '@/lib/field-guide/checkout-route'
import { createFieldGuideCheckout } from '@/lib/field-guide/stripe'

export const POST = createCheckoutPostHandler({
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  createCheckout: createFieldGuideCheckout,
})
