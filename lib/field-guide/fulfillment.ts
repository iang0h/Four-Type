import { getConfiguredPriceId } from './checkout'
import { parseSupporterSelection, type CurrencyKey, type SupporterTierKey } from './catalog'
import type { FieldGuideEntitlement } from './entitlements'
import { FIELD_GUIDE_RELEASE } from './release'

const ACCESS_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1_000
const MAX_SESSION_ID_LENGTH = 256

export type FieldGuideCheckoutSession = {
  id: string
  payment_status: string | null
  metadata: Record<string, string> | null
  currency: string | null
  customer_email: string | null
  customer_details: { email: string | null } | null
  payment_intent: string | { id: string } | null
  created: number
  line_items: {
    data: Array<{ price: { id: string } | null; quantity: number | null }>
  }
}

export type FieldGuideFulfillmentDependencies = {
  retrieveSession: (sessionId: string) => Promise<FieldGuideCheckoutSession>
  getConfiguredPriceId: (tier: SupporterTierKey, currency: CurrencyKey) => string
  readEntitlement: (sessionId: string) => Promise<FieldGuideEntitlement | null>
  writeEntitlement: (entitlement: FieldGuideEntitlement) => Promise<'fulfilled' | 'already-fulfilled'>
  claimEmailDelivery: (sessionId: string) => Promise<
    | { status: 'claimed'; claimId: string; idempotencyKey: string }
    | { status: 'in-progress' }
    | { status: 'sent' }
  >
  releaseEmailDeliveryClaim: (sessionId: string, claimId: string) => Promise<void>
  completeEmailDelivery: (sessionId: string, claimId: string, providerMessageId: string) => Promise<void>
  signAccessToken: (input: { sessionId: string; expiresAt: number }) => string
  createAccessUrl: (token: string) => string
  sendSupporterAccessEmail: (
    entitlement: FieldGuideEntitlement,
    accessUrl: string,
    idempotencyKey: string,
  ) => Promise<{ sent: boolean; skipped: boolean; providerMessageId?: string }>
  now?: () => number
}

export type FieldGuideFulfillmentResult = { status: 'fulfilled' | 'already-fulfilled' }

function isBoundedSessionId(value: string) {
  return value.length > 0
    && value.length <= MAX_SESSION_ID_LENGTH
    && /^[A-Za-z0-9_:-]+$/.test(value)
}

function getPaymentIntentId(paymentIntent: FieldGuideCheckoutSession['payment_intent']) {
  if (typeof paymentIntent === 'string') return paymentIntent
  if (paymentIntent && typeof paymentIntent.id === 'string') return paymentIntent.id
  return undefined
}

function getCustomerEmail(session: FieldGuideCheckoutSession) {
  const customerDetailsEmail = session.customer_details?.email
  const customerEmail = customerDetailsEmail ?? session.customer_email

  if (typeof customerEmail !== 'string' || customerEmail.length === 0) {
    throw new Error('Checkout Session customer email is missing')
  }

  if (
    customerDetailsEmail
    && session.customer_email
    && customerDetailsEmail.trim().toLowerCase() !== session.customer_email.trim().toLowerCase()
  ) {
    throw new Error('Checkout Session customer email does not match')
  }

  return customerEmail
}

function getApprovedSelection(session: FieldGuideCheckoutSession, dependencies: FieldGuideFulfillmentDependencies) {
  const metadata = session.metadata
  const selection = parseSupporterSelection(metadata)

  if (
    !metadata
    || metadata.product !== 'fourtype-field-guide'
    || metadata.releaseId !== FIELD_GUIDE_RELEASE.id
    || !selection
    || session.currency !== selection.currency
  ) {
    throw new Error('Checkout Session does not match the configured offer')
  }

  const expectedPriceId = dependencies.getConfiguredPriceId(selection.tier, selection.currency)
  const lineItems = session.line_items.data

  if (
    lineItems.length !== 1
    || lineItems[0]?.quantity !== 1
    || lineItems[0]?.price?.id !== expectedPriceId
  ) {
    throw new Error('Checkout Session does not match the configured offer')
  }

  return selection
}

function getPaidAt(session: FieldGuideCheckoutSession) {
  if (!Number.isSafeInteger(session.created) || session.created < 0) {
    throw new Error('Checkout Session payment time is invalid')
  }

  return new Date(session.created * 1_000).toISOString()
}

function createEntitlement(
  sessionId: string,
  session: FieldGuideCheckoutSession,
  selection: { tier: SupporterTierKey; currency: CurrencyKey },
  now: number,
): FieldGuideEntitlement {
  const paymentIntentId = getPaymentIntentId(session.payment_intent)
  return {
    version: 1,
    sessionId,
    ...(paymentIntentId ? { paymentIntentId } : {}),
    tier: selection.tier,
    currency: selection.currency,
    releaseId: FIELD_GUIDE_RELEASE.id,
    customerEmail: getCustomerEmail(session),
    paidAt: getPaidAt(session),
    fulfilledAt: new Date(now).toISOString(),
  }
}

function accessTokenExpiry(entitlement: FieldGuideEntitlement) {
  const fulfilledAt = Date.parse(entitlement.fulfilledAt)
  if (!Number.isSafeInteger(fulfilledAt)) throw new Error('Entitlement fulfillment time is invalid')
  return fulfilledAt + ACCESS_TOKEN_TTL_MS
}

export async function fulfillFieldGuideCheckout(
  sessionId: string,
  dependencies: FieldGuideFulfillmentDependencies,
): Promise<FieldGuideFulfillmentResult> {
  if (!isBoundedSessionId(sessionId)) throw new Error('Checkout Session ID is invalid')

  const session = await dependencies.retrieveSession(sessionId)

  if (session.id !== sessionId) throw new Error('Checkout Session ID does not match')
  if (session.payment_status !== 'paid') throw new Error('Checkout Session is not paid')

  const selection = getApprovedSelection(session, dependencies)
  const now = dependencies.now?.() ?? Date.now()
  if (!Number.isSafeInteger(now)) throw new Error('Fulfillment time is invalid')

  const existingEntitlement = await dependencies.readEntitlement(sessionId)
  let entitlement = existingEntitlement ?? createEntitlement(sessionId, session, selection, now)

  const writeResult = await dependencies.writeEntitlement(entitlement)
  if (writeResult === 'already-fulfilled' && !existingEntitlement) {
    const winningEntitlement = await dependencies.readEntitlement(sessionId)
    if (!winningEntitlement) throw new Error('Existing entitlement is invalid')
    entitlement = winningEntitlement
  }

  const deliveryClaim = await dependencies.claimEmailDelivery(sessionId)
  if (deliveryClaim.status === 'sent') {
    return { status: writeResult === 'fulfilled' ? 'fulfilled' : 'already-fulfilled' }
  }
  if (deliveryClaim.status === 'in-progress') {
    throw new Error('Field Guide access email delivery is in progress')
  }

  const accessToken = dependencies.signAccessToken({
    sessionId,
    expiresAt: accessTokenExpiry(entitlement),
  })
  try {
    const delivery = await dependencies.sendSupporterAccessEmail(
      entitlement,
      dependencies.createAccessUrl(accessToken),
      deliveryClaim.idempotencyKey,
    )
    if (!delivery.sent || delivery.skipped || !delivery.providerMessageId) {
      throw new Error('Field Guide access email delivery is unavailable')
    }
    await dependencies.completeEmailDelivery(sessionId, deliveryClaim.claimId, delivery.providerMessageId)
  } catch (error) {
    try {
      await dependencies.releaseEmailDeliveryClaim(sessionId, deliveryClaim.claimId)
    } catch {
      // A failed release becomes recoverable once the bounded claim expires.
    }
    throw error
  }

  return { status: writeResult === 'fulfilled' ? 'fulfilled' : 'already-fulfilled' }
}

export { getConfiguredPriceId }
