import 'server-only'

import { readEntitlement, writeEntitlement } from './entitlements'
import { claimEmailDelivery, completeEmailDelivery, releaseEmailDeliveryClaim } from './delivery'
import { sendSupporterAccessEmail } from './email-server'
import {
  fulfillFieldGuideCheckout,
  type FieldGuideCheckoutSession,
  type FieldGuideFulfillmentDependencies,
} from './fulfillment'
import { vercelPrivateBlobStore } from './blob-server'
import { getConfiguredPriceId } from './checkout'
import { resolveCanonicalCheckoutOrigin } from './checkout-route'
import { getStripe } from './stripe'
import { signAccessToken } from './tokens'

type StripeSessionClient = {
  checkout: {
    sessions: {
      retrieve: (sessionId: string, options: { expand: ['line_items'] }) => Promise<FieldGuideCheckoutSession>
    }
  }
}

function getAccessTokenSecret(environment: NodeJS.ProcessEnv) {
  const secret = environment.FOURTYPE_ACCESS_TOKEN_SECRET
  if (!secret) throw new Error('Field Guide access tokens are not configured')
  return secret
}

function getEmailIndexSecret(environment: NodeJS.ProcessEnv) {
  return getAccessTokenSecret(environment)
}

function getAccessUrl(token: string, siteUrl: string | undefined) {
  const origin = resolveCanonicalCheckoutOrigin(siteUrl)
  if (!origin) throw new Error('Field Guide site URL is not configured')
  const url = new URL('/field-guide/access', origin)
  url.searchParams.set('token', token)
  return url.toString()
}

export function createFieldGuideFulfillmentDependencies(
  environment: NodeJS.ProcessEnv = process.env,
): FieldGuideFulfillmentDependencies {
  const accessTokenSecret = getAccessTokenSecret(environment)
  const emailIndexSecret = getEmailIndexSecret(environment)
  const stripe = getStripe() as unknown as StripeSessionClient

  return {
    retrieveSession: (sessionId) => stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] }),
    getConfiguredPriceId: (tier, currency) => getConfiguredPriceId(tier, currency, environment),
    readEntitlement: (sessionId) => readEntitlement(sessionId, vercelPrivateBlobStore),
    writeEntitlement: (entitlement) => writeEntitlement(entitlement, vercelPrivateBlobStore, emailIndexSecret),
    claimEmailDelivery: (sessionId) => claimEmailDelivery(sessionId, vercelPrivateBlobStore),
    releaseEmailDeliveryClaim: (sessionId, claimId) => releaseEmailDeliveryClaim(sessionId, claimId, vercelPrivateBlobStore),
    completeEmailDelivery: (sessionId, claimId, providerMessageId) => (
      completeEmailDelivery(sessionId, claimId, providerMessageId, vercelPrivateBlobStore)
    ),
    signAccessToken: (input) => signAccessToken(input, accessTokenSecret),
    createAccessUrl: (token) => getAccessUrl(token, environment.NEXT_PUBLIC_SITE_URL),
    sendSupporterAccessEmail,
  }
}

export function fulfillProductionFieldGuideCheckout(sessionId: string) {
  return fulfillFieldGuideCheckout(sessionId, createFieldGuideFulfillmentDependencies())
}
