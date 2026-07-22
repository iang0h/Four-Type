import { createCheckoutPostHandler } from '@/lib/field-guide/checkout-route'
import { createRateLimiter, getRateLimitIdentifier } from '@/lib/field-guide/rate-limit'
import { vercelPrivateBlobStore } from '@/lib/field-guide/blob-server'
import { createFieldGuideCheckout } from '@/lib/field-guide/stripe'

const consumeCheckoutRateLimit = createRateLimiter({
  store: vercelPrivateBlobStore,
  action: 'checkout',
  capacity: 10,
  windowMs: 60_000,
})

export const POST = createCheckoutPostHandler({
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  createCheckout: createFieldGuideCheckout,
  rateLimit: (request) => consumeCheckoutRateLimit(getRateLimitIdentifier(request)),
})
