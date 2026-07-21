import { createHash, randomUUID } from 'node:crypto'
import type { PrivateBlobStore } from './blob'

const CLAIM_TTL_MS = 5 * 60 * 1_000
const MAX_WRITE_ATTEMPTS = 3

type DeliveryRecord = {
  version: 1
  state: 'pending' | 'sending' | 'sent'
  idempotencyKey: string
  claimId?: string
  claimedAt?: number
  sentAt?: number
  providerMessageId?: string
}

export type EmailDeliveryClaim =
  | { status: 'claimed'; claimId: string; idempotencyKey: string }
  | { status: 'in-progress' }
  | { status: 'sent' }

function deliveryPath(sessionId: string) {
  return `field-guide/entitlements/email-delivery/${createHash('sha256').update(sessionId).digest('hex')}.json`
}

function deliveryIdempotencyKey(sessionId: string) {
  return `field-guide-access/${createHash('sha256').update(sessionId).digest('hex')}`
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
    && (value.claimId === undefined || typeof value.claimId === 'string')
    && (value.claimedAt === undefined || Number.isSafeInteger(value.claimedAt))
    && (value.sentAt === undefined || Number.isSafeInteger(value.sentAt))
    && (value.providerMessageId === undefined || typeof value.providerMessageId === 'string')
}

async function readRecord(sessionId: string, store: PrivateBlobStore) {
  const record = await store.get(deliveryPath(sessionId), { access: 'private', useCache: false })
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
  etag?: string,
) {
  return store.put(deliveryPath(sessionId), JSON.stringify(value), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: Boolean(etag),
    contentType: 'application/json',
    ...(etag ? { ifMatch: etag } : {}),
  })
}

export async function claimEmailDelivery(
  sessionId: string,
  store: PrivateBlobStore,
  now = Date.now(),
): Promise<EmailDeliveryClaim> {
  if (!Number.isSafeInteger(now)) throw new Error('Email delivery time is invalid')

  for (let attempt = 0; attempt < MAX_WRITE_ATTEMPTS; attempt += 1) {
    const current = await readRecord(sessionId, store)
    if (current?.value.state === 'sent') return { status: 'sent' }
    if (
      current?.value.state === 'sending'
      && typeof current.value.claimedAt === 'number'
      && now - current.value.claimedAt < CLAIM_TTL_MS
    ) {
      return { status: 'in-progress' }
    }

    const claimId = randomUUID()
    const idempotencyKey = current?.value.idempotencyKey ?? deliveryIdempotencyKey(sessionId)
    try {
      await writeRecord(sessionId, store, {
        version: 1,
        state: 'sending',
        idempotencyKey,
        claimId,
        claimedAt: now,
      }, current?.etag)
      return { status: 'claimed', claimId, idempotencyKey }
    } catch (error) {
      if (!isConcurrentWrite(error)) throw error
    }
  }

  throw new Error('Email delivery claim could not be acquired')
}

export async function releaseEmailDeliveryClaim(
  sessionId: string,
  claimId: string,
  store: PrivateBlobStore,
) {
  const current = await readRecord(sessionId, store)
  if (!current || current.value.state !== 'sending' || current.value.claimId !== claimId) return
  await writeRecord(sessionId, store, {
    version: 1,
    state: 'pending',
    idempotencyKey: current.value.idempotencyKey,
  }, current.etag)
}

export async function completeEmailDelivery(
  sessionId: string,
  claimId: string,
  providerMessageId: string,
  store: PrivateBlobStore,
  now = Date.now(),
) {
  if (!providerMessageId || !Number.isSafeInteger(now)) throw new Error('Email delivery receipt is invalid')
  const current = await readRecord(sessionId, store)
  if (current?.value.state === 'sent') return
  if (!current || current.value.state !== 'sending' || current.value.claimId !== claimId) {
    throw new Error('Email delivery claim is no longer active')
  }

  await writeRecord(sessionId, store, {
    version: 1,
    state: 'sent',
    idempotencyKey: current.value.idempotencyKey,
    sentAt: now,
    providerMessageId,
  }, current.etag)
}
