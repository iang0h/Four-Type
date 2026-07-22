import { createHash, randomUUID } from 'node:crypto'
import type { PrivateBlobStore } from './blob'

const MAX_WRITE_ATTEMPTS = 3
const MIN_SAFE_RATE_LIMIT_WINDOW_SECONDS = 1
const MAX_SAFE_RATE_LIMIT_WINDOW_SECONDS = 24 * 60 * 60
const MAX_SAFE_RATE_LIMIT_CAPACITY = 10_000
const MAX_SAFE_RATE_LIMIT_IDENTIFIER_BYTES = 64

type RateLimitResult = 'allowed' | 'rate-limited'

type RateLimitRecord = {
  version: 1
  windowStartMs: number
  count: number
  request: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isConcurrentWrite(error: unknown) {
  return isRecord(error)
    && (error.code === 'already-exists' || error.code === 'precondition-failed')
}

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function isRateLimitRecord(value: unknown): value is RateLimitRecord {
  if (!isRecord(value)) return false

  const { version, windowStartMs, count, request } = value
  if (version !== 1) return false
  if (!Number.isSafeInteger(windowStartMs) || typeof windowStartMs !== 'number') return false
  if (!Number.isSafeInteger(count) || typeof count !== 'number') return false
  if (!Number.isSafeInteger(count) || count < 0 || count > MAX_SAFE_RATE_LIMIT_CAPACITY) return false
  return typeof request === 'string' && request.length <= MAX_SAFE_RATE_LIMIT_IDENTIFIER_BYTES
}

function isBoundedWindow(windowMs: number) {
  return Number.isSafeInteger(windowMs)
    && windowMs >= MIN_SAFE_RATE_LIMIT_WINDOW_SECONDS * 1_000
    && windowMs <= MAX_SAFE_RATE_LIMIT_WINDOW_SECONDS * 1_000
}

export function buildRateLimitNamespace(action: string, identifier?: string) {
  const normalizedAction = action.trim().toLowerCase()
  if (!/^[a-z0-9-]+$/.test(normalizedAction)) {
    throw new Error('Rate-limit action is invalid')
  }
  if (!identifier) return `field-guide/rate-limit/${normalizedAction}.json`
  const identifierHash = createHash('sha256').update(identifier).digest('hex')
  return `field-guide/rate-limit/${normalizedAction}/${identifierHash}.json`
}

export function getRateLimitIdentifier(request: Request) {
  const forwardedFor = request.headers.get('x-vercel-forwarded-for')
    ?? request.headers.get('x-forwarded-for')
    ?? request.headers.get('x-real-ip')
  const identifier = forwardedFor?.split(',', 1)[0]?.trim()

  if (identifier && identifier.length <= MAX_SAFE_RATE_LIMIT_IDENTIFIER_BYTES && /^[0-9a-f.:]+$/i.test(identifier)) {
    return identifier
  }

  return 'local'
}

export type RateLimitOptions = {
  store: PrivateBlobStore
  action: string
  now?: number
  capacity?: number
  windowMs?: number
}

export function createRateLimiter({
  store,
  action,
  now,
  capacity = 60,
  windowMs = 60_000,
}: RateLimitOptions) {
  if (!Number.isSafeInteger(capacity) || capacity <= 0 || capacity > MAX_SAFE_RATE_LIMIT_CAPACITY) {
    throw new Error('Rate-limit capacity is invalid')
  }
  if (!isBoundedWindow(windowMs)) throw new Error('Rate-limit window is invalid')

  const request = randomUUID()

  return async function consumeRateLimit(identifier: string, nowAtRequest = now ?? Date.now()): Promise<RateLimitResult> {
    if (!identifier || identifier.length > MAX_SAFE_RATE_LIMIT_IDENTIFIER_BYTES) throw new Error('Rate-limit identifier is invalid')
    if (!Number.isSafeInteger(nowAtRequest)) throw new Error('Rate-limit time is invalid')

    const pathname = buildRateLimitNamespace(action, identifier)
    const windowStart = Math.floor(nowAtRequest / windowMs) * windowMs

    for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
      const current = await store.get(pathname, { access: 'private', useCache: false })
      let currentRecord: RateLimitRecord | null = null

      if (current) {
        const parsed = parseJson(current.body)
        if (!isRateLimitRecord(parsed)) throw new Error('Rate-limit state is invalid')
        currentRecord = parsed
      }

      const isCurrentWindow = currentRecord !== null && currentRecord.windowStartMs === windowStart
      const currentCount = isCurrentWindow && currentRecord ? currentRecord.count : 0

      if (currentCount >= capacity) return 'rate-limited'

      const record: RateLimitRecord = {
        version: 1,
        windowStartMs: windowStart,
        count: isCurrentWindow ? currentCount + 1 : 1,
        request,
      }

      try {
        await store.put(pathname, JSON.stringify(record), {
          access: 'private',
          addRandomSuffix: false,
          allowOverwrite: Boolean(current),
          contentType: 'application/json',
          ...(current ? { ifMatch: current.etag } : {}),
        })
        return 'allowed'
      } catch (error) {
        if (!isConcurrentWrite(error)) throw error
      }
    }

    throw new Error('Rate limit record could not be updated')
  }
}
