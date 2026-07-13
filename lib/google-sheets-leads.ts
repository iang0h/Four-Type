import { createSign } from 'crypto'

type LeadScores = Partial<Record<'Yellow' | 'Red' | 'Blue' | 'Green', number>>

export interface LeadCapturePayload {
  email: string
  heroName: string
  locale: string
  blendKey: string
  resultName: string
  resultBlend: string
  scores: LeadScores
  shareUrl: string
  source: string
  consentText: string
  userAgent?: string
}

export interface AnalyticsEventPayload {
  event: string
  locale: string
  blendKey: string
  inviterBlendKey: string
  resultName: string
  shareId: string
  compareWith: string
  source: string
  chapter?: number
  question?: number
  path: string
  userAgent?: string
}

type AccessToken = {
  token: string
  expiresAt: number
}

let cachedToken: AccessToken | null = null

function getSheetsConfig() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const spreadsheetId = process.env.GOOGLE_SHEETS_LEADS_SPREADSHEET_ID
  const sheetName = process.env.GOOGLE_SHEETS_LEADS_SHEET_NAME || 'Leads'

  if (!clientEmail || !privateKey || !spreadsheetId) {
    return null
  }

  return { clientEmail, privateKey, spreadsheetId, sheetName }
}

function toBase64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

async function getGoogleSheetsAccessToken() {
  const now = Math.floor(Date.now() / 1000)

  if (cachedToken && cachedToken.expiresAt - 60 > now) {
    return cachedToken.token
  }

  const config = getSheetsConfig()

  if (!config) {
    throw new Error('Google Sheets lead capture is not configured.')
  }

  const header = { alg: 'RS256', typ: 'JWT' }
  const claim = {
    iss: config.clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }
  const unsignedJwt = `${toBase64Url(JSON.stringify(header))}.${toBase64Url(JSON.stringify(claim))}`
  const signature = createSign('RSA-SHA256').update(unsignedJwt).sign(config.privateKey)
  const assertion = `${unsignedJwt}.${toBase64Url(signature)}`

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Google OAuth token request failed: ${message}`)
  }

  const data = (await response.json()) as { access_token?: string; expires_in?: number }

  if (!data.access_token) {
    throw new Error('Google OAuth token response did not include an access token.')
  }

  cachedToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in || 3600),
  }

  return cachedToken.token
}

export function isLeadCaptureConfigured() {
  return getSheetsConfig() !== null
}

export async function appendLeadToGoogleSheet(payload: LeadCapturePayload) {
  const config = getSheetsConfig()

  if (!config) {
    throw new Error('Google Sheets lead capture is not configured.')
  }

  const token = await getGoogleSheetsAccessToken()
  const range = encodeURIComponent(`${config.sheetName}!A:L`)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const row = [
    new Date().toISOString(),
    payload.email,
    payload.heroName,
    payload.locale,
    payload.blendKey,
    payload.resultName,
    payload.resultBlend,
    JSON.stringify(payload.scores),
    payload.shareUrl,
    payload.source,
    payload.consentText,
    payload.userAgent || '',
  ]

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [row] }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Google Sheets append failed: ${message}`)
  }
}

export async function appendEventToGoogleSheet(payload: AnalyticsEventPayload) {
  const config = getSheetsConfig()

  if (!config) {
    throw new Error('Google Sheets lead capture is not configured.')
  }

  const token = await getGoogleSheetsAccessToken()
  const sheetName = process.env.GOOGLE_SHEETS_EVENTS_SHEET_NAME || 'Events'
  const range = encodeURIComponent(`${sheetName}!A:M`)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const row = [
    new Date().toISOString(),
    payload.event,
    payload.locale,
    payload.blendKey,
    payload.inviterBlendKey,
    payload.resultName,
    payload.shareId,
    payload.compareWith,
    payload.source,
    payload.chapter ?? '',
    payload.question ?? '',
    payload.path,
    payload.userAgent || '',
  ]

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [row] }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Google Sheets event append failed: ${message}`)
  }
}
