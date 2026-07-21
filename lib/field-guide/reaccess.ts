import type { FieldGuideEntitlement } from './entitlements'

export type ReaccessDeliveryDependencies = {
  claimDelivery: () => Promise<
    | { status: 'claimed'; claimId: string; idempotencyKey: string; accessTokenExpiresAt: number }
    | { status: 'in-progress' }
    | { status: 'sent' }
  >
  recordProviderAttempt: (claimId: string, payloadDigest: string) => Promise<'recorded' | 'matches' | 'payload-mismatch'>
  releaseDelivery: (claimId: string) => Promise<void>
  completeDelivery: (claimId: string, providerMessageId: string) => Promise<void>
  signAccessToken: (input: { sessionId: string; expiresAt: number }) => string
  createAccessUrl: (token: string) => string
  prepareEmail: (
    entitlement: FieldGuideEntitlement,
    accessUrl: string,
    idempotencyKey: string,
  ) => { payloadDigest: string; send: () => Promise<{ sent: boolean; skipped: boolean; providerMessageId?: string }> } | null
}

export async function deliverReaccessEntitlement(
  entitlement: FieldGuideEntitlement,
  dependencies: ReaccessDeliveryDependencies,
): Promise<'sent' | 'already-sent' | 'in-progress'> {
  const claim = await dependencies.claimDelivery()
  if (claim.status === 'sent') return 'already-sent'
  if (claim.status === 'in-progress') return 'in-progress'

  try {
    const accessUrl = dependencies.createAccessUrl(dependencies.signAccessToken({
      sessionId: entitlement.sessionId,
      expiresAt: claim.accessTokenExpiresAt,
    }))
    const prepared = dependencies.prepareEmail(entitlement, accessUrl, claim.idempotencyKey)
    if (!prepared) throw new Error('Field Guide access email delivery is unavailable')
    const providerAttempt = await dependencies.recordProviderAttempt(claim.claimId, prepared.payloadDigest)
    if (providerAttempt === 'payload-mismatch') {
      throw new Error('Field Guide access email delivery is awaiting provider idempotency')
    }
    const delivery = await prepared.send()
    if (!delivery.sent || delivery.skipped || !delivery.providerMessageId) {
      throw new Error('Field Guide access email delivery is unavailable')
    }
    await dependencies.completeDelivery(claim.claimId, delivery.providerMessageId)
    return 'sent'
  } catch (error) {
    try {
      await dependencies.releaseDelivery(claim.claimId)
    } catch {
      // The namespace-specific claim remains recoverable after its bounded TTL.
    }
    throw error
  }
}
