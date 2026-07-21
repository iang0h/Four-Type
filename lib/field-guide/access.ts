import type { FieldGuideEntitlement } from './entitlements'
import { FIELD_GUIDE_ASSET_KEYS, FIELD_GUIDE_RELEASE, type FieldGuideAssetKey } from './release'

const ACCESS_RESPONSE_MIN_DURATION_MS = 20
const MAX_ACCESS_REQUEST_BYTES = 1_024
const MAX_EMAIL_LENGTH = 320
const ACCESS_REQUEST_MESSAGE = 'If that email has a FourType supporter record, a fresh access link is on its way.'

export type DownloadResolution = {
  asset: FieldGuideAssetKey
  tier: FieldGuideEntitlement['tier']
  currency: FieldGuideEntitlement['currency']
  url: string
}

export type DownloadDependencies = {
  verifyDownloadToken: (token: string) => { sessionId: string; asset: FieldGuideAssetKey; expiresAt: number } | null
  readEntitlement: (sessionId: string) => Promise<FieldGuideEntitlement | null>
  createPrivateAssetUrl: (pathname: string) => Promise<string>
}

export type DownloadRouteDependencies = DownloadDependencies & {
  trackDownload: (payload: Pick<DownloadResolution, 'tier' | 'currency' | 'asset'>) => void
}

export type SupporterAccessDependencies = {
  verifyAccessToken: (token: string) => { sessionId: string; expiresAt: number } | null
  readEntitlement: (sessionId: string) => Promise<FieldGuideEntitlement | null>
}

export type SuccessAccessDependencies = {
  fulfill: (sessionId: string) => Promise<unknown>
  readEntitlement: (sessionId: string) => Promise<FieldGuideEntitlement | null>
}

export type RequestAccessDependencies = {
  findEntitlementsByEmail: (email: string) => Promise<FieldGuideEntitlement[]>
  sendFreshAccessEmail: (entitlement: FieldGuideEntitlement) => Promise<void>
  claimCooldown?: (email: string) => Promise<'claimed' | 'cooldown'>
  canonicalOrigin?: string
  padResponse?: () => Promise<void>
  schedule?: (work: () => Promise<void>) => void
}

function isAssetKey(value: string): value is FieldGuideAssetKey {
  return FIELD_GUIDE_ASSET_KEYS.includes(value as FieldGuideAssetKey)
}

export function authorizeAsset(entitlement: FieldGuideEntitlement, asset: string): { allowed: boolean; asset?: FieldGuideAssetKey } {
  if (
    !isAssetKey(asset)
    || entitlement.releaseId !== FIELD_GUIDE_RELEASE.id
    || !FIELD_GUIDE_RELEASE.assets[asset].tiers.includes(entitlement.tier)
  ) {
    return { allowed: false }
  }

  return { allowed: true, asset }
}

export async function resolveSupporterAccess(
  token: string,
  dependencies: SupporterAccessDependencies,
): Promise<FieldGuideEntitlement | null> {
  const verified = dependencies.verifyAccessToken(token)
  if (!verified) return null

  const entitlement = await dependencies.readEntitlement(verified.sessionId)
  if (!entitlement || entitlement.sessionId !== verified.sessionId || entitlement.releaseId !== FIELD_GUIDE_RELEASE.id) {
    return null
  }

  return entitlement
}

export async function resolveVerifiedSuccessAccess(
  sessionId: string,
  dependencies: SuccessAccessDependencies,
): Promise<FieldGuideEntitlement | null> {
  try {
    await dependencies.fulfill(sessionId)
  } catch {
    // A paid entitlement may already be durable when only access-email delivery failed.
  }

  const entitlement = await dependencies.readEntitlement(sessionId).catch(() => null)
  if (!entitlement || entitlement.sessionId !== sessionId || entitlement.releaseId !== FIELD_GUIDE_RELEASE.id) return null
  return entitlement
}

export async function resolveDownload(
  token: string,
  requestedAsset: string,
  dependencies: DownloadDependencies,
): Promise<DownloadResolution | null> {
  if (!isAssetKey(requestedAsset)) return null

  const verified = dependencies.verifyDownloadToken(token)
  if (!verified || verified.asset !== requestedAsset) return null

  const entitlement = await dependencies.readEntitlement(verified.sessionId)
  if (!entitlement || entitlement.sessionId !== verified.sessionId) return null

  const authorization = authorizeAsset(entitlement, requestedAsset)
  if (!authorization.allowed || !authorization.asset) return null

  return {
    asset: authorization.asset,
    tier: entitlement.tier,
    currency: entitlement.currency,
    url: await dependencies.createPrivateAssetUrl(FIELD_GUIDE_RELEASE.assets[authorization.asset].pathname),
  }
}

export function createDownloadGetHandler(dependencies: DownloadRouteDependencies) {
  return async function GET(
    request: Request,
    context: { params: Promise<{ asset?: string }> },
  ) {
    const { asset } = await context.params
    const token = new URL(request.url).searchParams.get('token') ?? ''
    const resolved = await resolveDownload(token, asset ?? '', dependencies).catch(() => null)
    if (!resolved) return new Response(null, { status: 404 })

    dependencies.trackDownload({
      tier: resolved.tier,
      currency: resolved.currency,
      asset: resolved.asset,
    })
    return Response.redirect(resolved.url, 303)
  }
}

export async function padAccessResponse(
  startedAt: number,
  finishedAt = Date.now(),
  sleep: (milliseconds: number) => Promise<void> = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds)),
) {
  const elapsed = Math.max(0, finishedAt - startedAt)
  const remaining = ACCESS_RESPONSE_MIN_DURATION_MS - elapsed
  if (remaining > 0) await sleep(remaining)
}

function normalizeAccessEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const normalized = value.trim().toLowerCase()
  if (
    normalized.length === 0
    || normalized.length > MAX_EMAIL_LENGTH
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
  ) {
    return null
  }

  return normalized
}

async function requestEmail(request: Request): Promise<string | null> {
  const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase()
  if (contentType !== 'application/json') return null
  const contentLength = request.headers.get('content-length')
  if (contentLength && (!/^\d+$/.test(contentLength) || Number(contentLength) > MAX_ACCESS_REQUEST_BYTES)) return null

  let body: unknown
  try {
    const text = await request.text()
    if (text.length > MAX_ACCESS_REQUEST_BYTES) return null
    body = JSON.parse(text)
  } catch {
    return null
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) return null
  return normalizeAccessEmail((body as { email?: unknown }).email)
}

function isTrustedRequestOrigin(request: Request, canonicalOrigin: string | undefined) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  return Boolean(canonicalOrigin && origin === canonicalOrigin)
}

function accessRequestResponse() {
  return Response.json({ message: ACCESS_REQUEST_MESSAGE })
}

export function createRequestAccessPostHandler(dependencies: RequestAccessDependencies) {
  return async function POST(request: Request) {
    const startedAt = Date.now()
    const email = isTrustedRequestOrigin(request, dependencies.canonicalOrigin) ? await requestEmail(request) : null

    if (email) {
      const cooldown = await dependencies.claimCooldown?.(email).catch(() => 'cooldown') ?? 'claimed'
      if (cooldown === 'claimed') {
        const work = async () => {
          const entitlements = await dependencies.findEntitlementsByEmail(email).catch(() => [])
          await Promise.all(entitlements.map(async (entitlement) => {
            try {
              await dependencies.sendFreshAccessEmail(entitlement)
            } catch {
              // The response remains non-disclosing if a private delivery attempt fails.
            }
          }))
        }

        if (dependencies.schedule) dependencies.schedule(work)
        else await work()
      }
    }

    if (dependencies.padResponse) await dependencies.padResponse()
    else await padAccessResponse(startedAt)
    return accessRequestResponse()
  }
}
