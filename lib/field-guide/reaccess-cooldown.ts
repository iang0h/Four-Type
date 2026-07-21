import { createHmac, randomUUID } from 'node:crypto'
import type { PrivateBlobStore } from './blob'

export const REACCESS_COOLDOWN_MS = 15 * 60 * 1_000
const MAX_WRITE_ATTEMPTS = 3

type CooldownRecord = {
  version: 1
  cooldownUntil: number
  claimId: string
}

function cooldownPath(email: string, secret: string) {
  if (!secret) throw new Error('Email index secret is required')
  const digest = createHmac('sha256', secret).update(email).digest('hex')
  return `field-guide/reaccess/by-email/${digest}.json`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function parseRecord(body: string): CooldownRecord | null {
  try {
    const value: unknown = JSON.parse(body)
    if (
      !isRecord(value)
      || value.version !== 1
      || !Number.isSafeInteger(value.cooldownUntil)
      || typeof value.claimId !== 'string'
      || value.claimId.length === 0
    ) return null
    return value as CooldownRecord
  } catch {
    return null
  }
}

function isConcurrentWrite(error: unknown) {
  return isRecord(error) && (error.code === 'already-exists' || error.code === 'precondition-failed')
}

export async function claimReaccessCooldown(
  normalizedEmail: string,
  store: PrivateBlobStore,
  secret: string,
  now = Date.now(),
): Promise<'claimed' | 'cooldown'> {
  if (!Number.isSafeInteger(now) || !Number.isSafeInteger(now + REACCESS_COOLDOWN_MS)) {
    throw new Error('Re-access cooldown time is invalid')
  }
  const pathname = cooldownPath(normalizedEmail, secret)

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const current = await store.get(pathname, { access: 'private', useCache: false })
    const record = current ? parseRecord(current.body) : null
    if (current && !record) throw new Error('Re-access cooldown state is invalid')
    if (record && record.cooldownUntil > now) return 'cooldown'

    try {
      await store.put(pathname, JSON.stringify({
        version: 1,
        cooldownUntil: now + REACCESS_COOLDOWN_MS,
        claimId: randomUUID(),
      }), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: Boolean(current),
        contentType: 'application/json',
        ...(current ? { ifMatch: current.etag } : {}),
      })
      return 'claimed'
    } catch (error) {
      if (!isConcurrentWrite(error)) throw error
    }
  }

  return 'cooldown'
}
