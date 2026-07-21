import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import test from 'node:test'
import {
  signAccessToken,
  signDownloadToken,
  verifyAccessToken,
  verifyDownloadToken,
} from '../lib/field-guide/tokens'

const secret = 'test-token-secret'
const BASE64URL_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
const DAY_MS = 24 * 60 * 60 * 1_000

function signedToken(payload: unknown, signingSecret = secret) {
  const payloadPart = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', signingSecret).update(payloadPart).digest('base64url')
  return `${payloadPart}.${signature}`
}

function nonCanonicalBase64urlSegment(segment: string) {
  const remainder = segment.length % 4
  assert.ok(remainder === 2 || remainder === 3)

  const lastValue = BASE64URL_ALPHABET.indexOf(segment.at(-1) ?? '')
  assert.ok(lastValue >= 0)
  const ignoredBitMask = remainder === 2 ? 0b1111 : 0b11
  const nonCanonicalValue = (lastValue & ~ignoredBitMask) | 1
  return `${segment.slice(0, -1)}${BASE64URL_ALPHABET[nonCanonicalValue]}`
}

test('round-trips an access token and rejects tampering at the expiry boundary', () => {
  const token = signAccessToken({ sessionId: 'cs_test_123', expiresAt: 2_000 }, secret, 1_000)

  assert.equal(verifyAccessToken(token, secret, 1_500)?.sessionId, 'cs_test_123')
  assert.equal(verifyAccessToken(`${token}x`, secret, 1_500), null)
  assert.equal(verifyAccessToken(token, secret, 2_000), null)
})

test('deterministically signs a persisted access attempt input', () => {
  const input = { sessionId: 'cs_test_123', expiresAt: 2_000 }

  assert.equal(signAccessToken(input, secret, 1_000), signAccessToken(input, secret, 1_000))
})

test('scopes a download token to one exact approved asset', () => {
  const token = signDownloadToken({ sessionId: 'cs_test_123', asset: 'pdf', expiresAt: 2_000 }, secret, 1_000)

  assert.deepEqual(verifyDownloadToken(token, secret, 1_500), {
    sessionId: 'cs_test_123',
    asset: 'pdf',
    expiresAt: 2_000,
  })
})

test('rejects a token of the wrong kind', () => {
  const token = signAccessToken({ sessionId: 'cs_test_123', expiresAt: 2_000 }, secret, 1_000)

  assert.equal(verifyDownloadToken(token, secret, 1_500), null)
})

test('rejects malformed base64url and JSON payloads', () => {
  assert.equal(verifyAccessToken('%%%.' + 'a'.repeat(43), secret, 1_500), null)

  const payloadPart = Buffer.from('{').toString('base64url')
  const signature = createHmac('sha256', secret).update(payloadPart).digest('base64url')
  assert.equal(verifyAccessToken(`${payloadPart}.${signature}`, secret, 1_500), null)
})

test('rejects unequal signature lengths without attempting comparison', () => {
  const token = signAccessToken({ sessionId: 'cs_test_123', expiresAt: 2_000 }, secret, 1_000)
  const [payload] = token.split('.')

  assert.equal(verifyAccessToken(`${payload}.a`, secret, 1_500), null)
})

test('rejects unsupported assets even when the payload has a valid HMAC', () => {
  const token = signedToken({
    version: 1,
    kind: 'field-guide-download',
    sessionId: 'cs_test_123',
    asset: 'archive',
    expiresAt: 2_000,
  })

  assert.equal(verifyDownloadToken(token, secret, 1_500), null)
  assert.throws(
    () => signDownloadToken({ sessionId: 'cs_test_123', asset: 'archive' as never, expiresAt: 2_000 }, secret, 1_000),
    /asset/,
  )
})

test('rejects claims outside their bounded session and expiry limits', () => {
  assert.throws(
    () => signAccessToken({ sessionId: 'a'.repeat(257), expiresAt: 2_000 }, secret, 1_000),
    /session/i,
  )
  assert.throws(
    () => signAccessToken({ sessionId: 'cs_test_123', expiresAt: 31 * 24 * 60 * 60 * 1_000 }, secret, 1_000),
    /expiry/i,
  )
})

test('rejects correctly signed tokens with an overlong remaining lifetime', () => {
  const now = 1_000
  const accessToken = signedToken({
    version: 1,
    kind: 'field-guide-access',
    sessionId: 'cs_test_123',
    expiresAt: now + 30 * DAY_MS + 1,
  })
  const downloadToken = signedToken({
    version: 1,
    kind: 'field-guide-download',
    sessionId: 'cs_test_123',
    asset: 'pdf',
    expiresAt: now + 15 * 60 * 1_000 + 1,
  })

  assert.equal(verifyAccessToken(accessToken, secret, now), null)
  assert.equal(verifyDownloadToken(downloadToken, secret, now), null)
})

test('rejects noncanonical base64url payload and signature segments', () => {
  const payload = {
    version: 1,
    kind: 'field-guide-access',
    sessionId: 'cs_test_123_a',
    expiresAt: 2_000,
  }
  const canonicalToken = signedToken(payload)
  const [payloadPart, signaturePart] = canonicalToken.split('.')
  const nonCanonicalPayload = nonCanonicalBase64urlSegment(payloadPart)
  const payloadSignature = createHmac('sha256', secret).update(nonCanonicalPayload).digest('base64url')

  assert.equal(verifyAccessToken(`${nonCanonicalPayload}.${payloadSignature}`, secret, 1_500), null)
  assert.equal(
    verifyAccessToken(`${payloadPart}.${nonCanonicalBase64urlSegment(signaturePart)}`, secret, 1_500),
    null,
  )
})

test('fails closed when the verification secret is missing', () => {
  const token = signedToken({
    version: 1,
    kind: 'field-guide-access',
    sessionId: 'cs_test_123',
    expiresAt: 2_000,
  }, '')

  assert.equal(verifyAccessToken(token, '', 1_500), null)
})
