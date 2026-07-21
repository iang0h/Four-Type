import { createHash, randomUUID } from 'node:crypto'
import type { PrivateBlobStore } from './blob'
import { FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS } from './tokens'

const CLAIM_TTL_MS = 5 * 60 * 1_000
const MAX_WRITE_ATTEMPTS = 3
export const EMAIL_DELIVERY_REUSE_MIN_REMAINING_MS = 29 * 24 * 60 * 60 * 1_000
export const EMAIL_DELIVERY_PROVIDER_IDEMPOTENCY_WINDOW_MS = 24 * 60 * 60 * 1_000
export const EMAIL_DELIVERY_RETRY_SEND_MIN_REMAINING_MS = 24 * 60 * 60 * 1_000

type DeliveryRecord = {
  version: 1
  state: 'pending' | 'sending' | 'sent'
  idempotencyKey: string
  attempt?: number
  accessTokenExpiresAt?: number
  firstProviderAttemptAt?: number
  firstProviderPayloadDigest?: string
  claimId?: string
  claimedAt?: number
  sentAt?: number
  providerMessageId?: string
}

export type EmailDeliveryClaim =
  | { status: 'claimed'; claimId: string; idempotencyKey: string; accessTokenExpiresAt: number }
  | { status: 'in-progress' }
  | { status: 'sent' }

export type EmailDeliveryPurpose = 'fulfillment' | 'reaccess'

function assertDeliveryPurpose(purpose: unknown): asserts purpose is EmailDeliveryPurpose {
  if (purpose !== 'fulfillment' && purpose !== 'reaccess') {
    throw new Error('Email delivery purpose is invalid')
  }
}

function deliveryDigest(sessionId: string) {
  return createHash('sha256').update(sessionId).digest('hex')
}

function deliveryPath(sessionId: string, purpose: EmailDeliveryPurpose) {
  const namespace = purpose === 'reaccess' ? 'reaccess-delivery' : 'email-delivery'
  return `field-guide/entitlements/${namespace}/${deliveryDigest(sessionId)}.json`
}

function deliveryIdempotencyKey(sessionId: string, attempt: number, purpose: EmailDeliveryPurpose) {
  const prefix = purpose === 'reaccess' ? 'field-guide-reaccess' : 'field-guide-access'
  return `${prefix}/${deliveryDigest(sessionId)}/${attempt}`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isDeliveryRecord(value: unknown): value is DeliveryRecord {
  return isRecord(value)
    && value.version === 1
    && (value.state === 'pending' || value.state === 'sending' || value.state === 'sent')
    && typeof value.idempotencyKey === 'string'
    && value.idempotencyKey.length > 0
    && value.idempotencyKey.length <= 256
    && (value.attempt === undefined || (typeof value.attempt === 'number' && Number.isSafeInteger(value.attempt) && value.attempt > 0))
    && (value.accessTokenExpiresAt === undefined
      || (typeof value.accessTokenExpiresAt === 'number' && Number.isSafeInteger(value.accessTokenExpiresAt)))
    && (value.firstProviderAttemptAt === undefined
      || (typeof value.firstProviderAttemptAt === 'number' && Number.isSafeInteger(value.firstProviderAttemptAt)))
    && (value.firstProviderPayloadDigest === undefined
      || (typeof value.firstProviderPayloadDigest === 'string' && /^[a-f0-9]{64}$/.test(value.firstProviderPayloadDigest)))
    && (value.claimId === undefined || typeof value.claimId === 'string')
    && (value.claimedAt === undefined || Number.isSafeInteger(value.claimedAt))
    && (value.sentAt === undefined || Number.isSafeInteger(value.sentAt))
    && (value.providerMessageId === undefined || typeof value.providerMessageId === 'string')
}

async function readRecord(sessionId: string, store: PrivateBlobStore, purpose: EmailDeliveryPurpose) {
  const record = await store.get(deliveryPath(sessionId, purpose), { access: 'private', useCache: false })
  if (!record) return null
  let parsed: unknown
  try {
    parsed = JSON.parse(record.body)
  } catch {
    throw new Error('Email delivery state is invalid')
  }
  if (!isDeliveryRecord(parsed)) throw new Error('Email delivery state is invalid')
  return { ...record, value: parsed }
}

function isConcurrentWrite(error: unknown) {
  return isRecord(error) && (error.code === 'already-exists' || error.code === 'precondition-failed')
}

async function writeRecord(
  sessionId: string,
  store: PrivateBlobStore,
  value: DeliveryRecord,
  etag: string | undefined,
  purpose: EmailDeliveryPurpose,
) {
  return store.put(deliveryPath(sessionId, purpose), JSON.stringify(value), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: Boolean(etag),
    contentType: 'application/json',
    ...(etag ? { ifMatch: etag } : {}),
  })
}

function hasUsefulAccessTokenLifetime(expiresAt: number | undefined, now: number) {
  const remainingLifetime = typeof expiresAt === 'number' ? expiresAt - now : undefined
  return typeof remainingLifetime === 'number'
    && remainingLifetime >= EMAIL_DELIVERY_RETRY_SEND_MIN_REMAINING_MS
    && remainingLifetime <= FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS
}

export async function claimEmailDelivery(
  sessionId: string,
  store: PrivateBlobStore,
  purpose: EmailDeliveryPurpose,
  now = Date.now(),
  renewSent = false,
): Promise<EmailDeliveryClaim> {
  assertDeliveryPurpose(purpose)
  if (!Number.isSafeInteger(now)) throw new Error('Email delivery time is invalid')
  if (!Number.isSafeInteger(now + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS)) throw new Error('Email delivery time is invalid')

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const current = await readRecord(sessionId, store, purpose)
    if (current?.value.state === 'sent') {
      if (!renewSent) return { status: 'sent' }
      const deliveryAttempt = (current.value.attempt ?? 0) + 1
      try {
        await writeRecord(sessionId, store, {
          version: 1,
          state: 'pending',
          idempotencyKey: deliveryIdempotencyKey(sessionId, deliveryAttempt, purpose),
          attempt: deliveryAttempt,
          accessTokenExpiresAt: now + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS,
        }, current.etag, purpose)
      } catch (error) {
        if (!isConcurrentWrite(error)) throw error
      }
      continue
    }
    if (
      current?.value.state === 'sending'
      && typeof current.value.claimedAt === 'number'
      && now - current.value.claimedAt < CLAIM_TTL_MS
    ) {
      return { status: 'in-progress' }
    }

    const existingAttempt = current?.value.attempt
    const existingExpiry = current?.value.accessTokenExpiresAt
    const remainingLifetime = typeof existingExpiry === 'number' ? existingExpiry - now : undefined
    const reuseForFreshness = typeof existingAttempt === 'number'
      && typeof remainingLifetime === 'number'
      && remainingLifetime >= EMAIL_DELIVERY_REUSE_MIN_REMAINING_MS
      && remainingLifetime <= FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS
    const firstProviderAttemptAt = current?.value.firstProviderAttemptAt
    const firstProviderPayloadDigest = current?.value.firstProviderPayloadDigest
    const reuseForProviderAmbiguity = typeof existingAttempt === 'number'
      && typeof firstProviderAttemptAt === 'number'
      && Number.isSafeInteger(firstProviderAttemptAt + EMAIL_DELIVERY_PROVIDER_IDEMPOTENCY_WINDOW_MS)
      && now <= firstProviderAttemptAt + EMAIL_DELIVERY_PROVIDER_IDEMPOTENCY_WINDOW_MS
      && hasUsefulAccessTokenLifetime(existingExpiry, now)
    const reuseAttempt = reuseForFreshness || reuseForProviderAmbiguity
    const deliveryAttempt = reuseAttempt ? existingAttempt : (existingAttempt ?? 0) + 1
    const accessTokenExpiresAt = reuseAttempt ? existingExpiry! : now + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS
    const claimId = randomUUID()
    const idempotencyKey = reuseAttempt
      ? current!.value.idempotencyKey
      : deliveryIdempotencyKey(sessionId, deliveryAttempt, purpose)
    try {
      await writeRecord(sessionId, store, {
        version: 1,
        state: 'sending',
        idempotencyKey,
        attempt: deliveryAttempt,
        accessTokenExpiresAt,
        ...(reuseAttempt && firstProviderAttemptAt !== undefined
          ? { firstProviderAttemptAt }
          : {}),
        ...(reuseAttempt && firstProviderPayloadDigest !== undefined
          ? { firstProviderPayloadDigest }
          : {}),
        claimId,
        claimedAt: now,
      }, current?.etag, purpose)
      return { status: 'claimed', claimId, idempotencyKey, accessTokenExpiresAt }
    } catch (error) {
      if (!isConcurrentWrite(error)) throw error
    }
  }

  throw new Error('Email delivery claim could not be acquired')
}

export async function recordEmailDeliveryProviderAttempt(
  sessionId: string,
  claimId: string,
  payloadDigest: string,
  store: PrivateBlobStore,
  purpose: EmailDeliveryPurpose,
  now = Date.now(),
) {
  assertDeliveryPurpose(purpose)
  if (!Number.isSafeInteger(now) || !/^[a-f0-9]{64}$/.test(payloadDigest)) {
    throw new Error('Email delivery provider payload is invalid')
  }

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const current = await readRecord(sessionId, store, purpose)
    if (!current || current.value.state !== 'sending' || current.value.claimId !== claimId) {
      throw new Error('Email delivery claim is no longer active')
    }
    if (current.value.firstProviderAttemptAt !== undefined) {
      if (!hasUsefulAccessTokenLifetime(current.value.accessTokenExpiresAt, now)) {
        throw new Error('Email delivery access token does not have a useful lifetime')
      }
      return current.value.firstProviderPayloadDigest === payloadDigest
        ? 'matches'
        : 'payload-mismatch'
    }
    if (!hasUsefulAccessTokenLifetime(current.value.accessTokenExpiresAt, now)
      || current.value.accessTokenExpiresAt! - now < EMAIL_DELIVERY_REUSE_MIN_REMAINING_MS) {
      if (!Number.isSafeInteger(now + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS)) {
        throw new Error('Email delivery time is invalid')
      }
      const deliveryAttempt = (current.value.attempt ?? 0) + 1
      try {
        await writeRecord(sessionId, store, {
          version: 1,
          state: 'pending',
          idempotencyKey: deliveryIdempotencyKey(sessionId, deliveryAttempt, purpose),
          attempt: deliveryAttempt,
          accessTokenExpiresAt: now + FIELD_GUIDE_ACCESS_TOKEN_MAX_AGE_MS,
        }, current.etag, purpose)
      } catch (error) {
        if (isConcurrentWrite(error)) continue
        throw error
      }
      throw new Error('Email delivery access token does not have a full attempt lifetime')
    }

    try {
      await writeRecord(sessionId, store, {
        ...current.value,
        firstProviderAttemptAt: now,
        firstProviderPayloadDigest: payloadDigest,
      }, current.etag, purpose)
      return 'recorded'
    } catch (error) {
      if (!isConcurrentWrite(error)) throw error
    }
  }

  throw new Error('Email delivery provider attempt could not be recorded')
}

export async function releaseEmailDeliveryClaim(
  sessionId: string,
  claimId: string,
  store: PrivateBlobStore,
  purpose: EmailDeliveryPurpose,
) {
  assertDeliveryPurpose(purpose)
  const current = await readRecord(sessionId, store, purpose)
  if (!current || current.value.state !== 'sending' || current.value.claimId !== claimId) return
  await writeRecord(sessionId, store, {
    version: 1,
    state: 'pending',
    idempotencyKey: current.value.idempotencyKey,
    ...(current.value.attempt === undefined ? {} : { attempt: current.value.attempt }),
    ...(current.value.accessTokenExpiresAt === undefined
      ? {}
      : { accessTokenExpiresAt: current.value.accessTokenExpiresAt }),
    ...(current.value.firstProviderAttemptAt === undefined
      ? {}
      : { firstProviderAttemptAt: current.value.firstProviderAttemptAt }),
    ...(current.value.firstProviderPayloadDigest === undefined
      ? {}
      : { firstProviderPayloadDigest: current.value.firstProviderPayloadDigest }),
  }, current.etag, purpose)
}

export async function completeEmailDelivery(
  sessionId: string,
  claimId: string,
  providerMessageId: string,
  store: PrivateBlobStore,
  purpose: EmailDeliveryPurpose,
  now = Date.now(),
) {
  assertDeliveryPurpose(purpose)
  if (!providerMessageId || !Number.isSafeInteger(now)) throw new Error('Email delivery receipt is invalid')
  const current = await readRecord(sessionId, store, purpose)
  if (current?.value.state === 'sent') return
  if (!current || current.value.state !== 'sending' || current.value.claimId !== claimId) {
    throw new Error('Email delivery claim is no longer active')
  }

  await writeRecord(sessionId, store, {
    version: 1,
    state: 'sent',
    idempotencyKey: current.value.idempotencyKey,
    ...(current.value.attempt === undefined ? {} : { attempt: current.value.attempt }),
    ...(current.value.accessTokenExpiresAt === undefined
      ? {}
      : { accessTokenExpiresAt: current.value.accessTokenExpiresAt }),
    ...(current.value.firstProviderAttemptAt === undefined
      ? {}
      : { firstProviderAttemptAt: current.value.firstProviderAttemptAt }),
    ...(current.value.firstProviderPayloadDigest === undefined
      ? {}
      : { firstProviderPayloadDigest: current.value.firstProviderPayloadDigest }),
    sentAt: now,
    providerMessageId,
  }, current.etag, purpose)
}
