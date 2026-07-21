import 'server-only'

import {
  createDownloadGetHandler,
  createRequestAccessPostHandler,
  resolveSupporterAccess,
  type RequestAccessDependencies,
} from './access'
import { createVercelPrivateAssetUrl, vercelPrivateBlobStore } from './blob-server'
import { resolveCanonicalCheckoutOrigin } from './checkout-route'
import { findEntitlementsByEmail, readEntitlement, type FieldGuideEntitlement } from './entitlements'
import { prepareSupporterAccessEmail } from './email-server'
import {
  claimEmailDelivery,
  completeEmailDelivery,
  recordEmailDeliveryProviderAttempt,
  releaseEmailDeliveryClaim,
} from './delivery'
import { deliverReaccessEntitlement } from './reaccess'
import { claimReaccessCooldown } from './reaccess-cooldown'
import { assetsForTier, FIELD_GUIDE_RELEASE, type FieldGuideAssetKey } from './release'
import {
  signAccessToken,
  signDownloadToken,
  verifyAccessToken,
  verifyDownloadToken,
} from './tokens'

const DOWNLOAD_TOKEN_TTL_MS = 15 * 60 * 1_000

function getAccessTokenSecret(environment: NodeJS.ProcessEnv = process.env) {
  const secret = environment.FOURTYPE_ACCESS_TOKEN_SECRET
  if (!secret) throw new Error('Field Guide access tokens are not configured')
  return secret
}

function createAccessUrl(token: string, siteUrl = process.env.NEXT_PUBLIC_SITE_URL) {
  const origin = resolveCanonicalCheckoutOrigin(siteUrl)
  if (!origin) throw new Error('Field Guide site URL is not configured')
  const url = new URL('/field-guide/access', origin)
  url.searchParams.set('token', token)
  return url.toString()
}

export async function getProductionFieldGuideEntitlement(sessionId: string) {
  return readEntitlement(sessionId, vercelPrivateBlobStore)
}

export async function resolveProductionSupporterAccess(token: string) {
  const secret = getAccessTokenSecret()
  return resolveSupporterAccess(token, {
    verifyAccessToken: (value) => verifyAccessToken(value, secret),
    readEntitlement: (sessionId) => readEntitlement(sessionId, vercelPrivateBlobStore),
  })
}

export type SupporterDownload = {
  asset: FieldGuideAssetKey
  label: string
  href: string
}

const assetLabels: Record<FieldGuideAssetKey, string> = {
  pdf: 'Download the PDF',
  epub: 'Download the EPUB',
  worksheets: 'Download the worksheet pack',
}

export function createProductionSupporterDownloads(
  entitlement: FieldGuideEntitlement,
  now = Date.now(),
): SupporterDownload[] {
  if (entitlement.releaseId !== FIELD_GUIDE_RELEASE.id) return []
  const secret = getAccessTokenSecret()
  const expiresAt = now + DOWNLOAD_TOKEN_TTL_MS

  return assetsForTier(entitlement.tier).map((asset) => {
    const token = signDownloadToken({ sessionId: entitlement.sessionId, asset, expiresAt }, secret, now)
    const url = new URL(`/api/field-guide/download/${asset}`, 'https://fourtype.invalid')
    url.searchParams.set('token', token)
    return { asset, label: assetLabels[asset], href: `${url.pathname}${url.search}` }
  })
}

export const GET = createDownloadGetHandler({
  verifyDownloadToken: (token) => verifyDownloadToken(token, getAccessTokenSecret()),
  readEntitlement: (sessionId) => readEntitlement(sessionId, vercelPrivateBlobStore),
  createPrivateAssetUrl: (pathname) => createVercelPrivateAssetUrl(pathname),
  trackDownload: () => {
    // Client-side analytics records only the authorized tier, currency, and asset.
  },
})

async function sendFreshProductionAccessEmail(entitlement: FieldGuideEntitlement) {
  const secret = getAccessTokenSecret()
  await deliverReaccessEntitlement(entitlement, {
    claimDelivery: () => claimEmailDelivery(entitlement.sessionId, vercelPrivateBlobStore, 'reaccess', Date.now(), true),
    recordProviderAttempt: (claimId, payloadDigest) => (
      recordEmailDeliveryProviderAttempt(entitlement.sessionId, claimId, payloadDigest, vercelPrivateBlobStore, 'reaccess', Date.now())
    ),
    releaseDelivery: (claimId) => releaseEmailDeliveryClaim(entitlement.sessionId, claimId, vercelPrivateBlobStore, 'reaccess'),
    completeDelivery: (claimId, providerMessageId) => (
      completeEmailDelivery(entitlement.sessionId, claimId, providerMessageId, vercelPrivateBlobStore, 'reaccess', Date.now())
    ),
    signAccessToken: (input) => signAccessToken(input, secret),
    createAccessUrl,
    prepareEmail: prepareSupporterAccessEmail,
  })
}

export function createProductionRequestAccessPostHandler(
  schedule: RequestAccessDependencies['schedule'],
) {
  return createRequestAccessPostHandler({
    findEntitlementsByEmail: (email) => findEntitlementsByEmail(email, vercelPrivateBlobStore, getAccessTokenSecret()),
    sendFreshAccessEmail: sendFreshProductionAccessEmail,
    claimCooldown: (email) => claimReaccessCooldown(email, vercelPrivateBlobStore, getAccessTokenSecret()),
    canonicalOrigin: resolveCanonicalCheckoutOrigin(process.env.NEXT_PUBLIC_SITE_URL) ?? undefined,
    schedule,
  })
}
