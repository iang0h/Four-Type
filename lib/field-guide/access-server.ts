import 'server-only'

import { randomUUID } from 'node:crypto'
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
import { assetsForTier, FIELD_GUIDE_RELEASE, type FieldGuideAssetKey } from './release'
import {
  FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS,
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
  const now = Date.now()
  const secret = getAccessTokenSecret()
  const accessToken = signAccessToken({
    sessionId: entitlement.sessionId,
    expiresAt: now + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS,
  }, secret, now)
  const prepared = prepareSupporterAccessEmail(entitlement, createAccessUrl(accessToken), randomUUID())
  if (!prepared) throw new Error('Field Guide access email delivery is unavailable')

  const delivery = await prepared.send()
  if (!delivery.sent || delivery.skipped || !delivery.providerMessageId) {
    throw new Error('Field Guide access email delivery is unavailable')
  }
}

export function createProductionRequestAccessPostHandler(
  schedule: RequestAccessDependencies['schedule'],
) {
  return createRequestAccessPostHandler({
    findEntitlementsByEmail: (email) => findEntitlementsByEmail(email, vercelPrivateBlobStore, getAccessTokenSecret()),
    sendFreshAccessEmail: sendFreshProductionAccessEmail,
    schedule,
  })
}
