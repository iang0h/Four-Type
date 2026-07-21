import { NextResponse } from 'next/server'
import { appendLeadToGoogleSheet, isLeadCaptureConfigured, type LeadCapturePayload } from '@/lib/google-sheets-leads'
import { sendProfileEmail } from '@/lib/email-delivery-server'

export const runtime = 'nodejs'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const validScoreKeys = ['Yellow', 'Red', 'Blue', 'Green'] as const

function cleanText(value: unknown, maxLength = 240) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function cleanScores(value: unknown): LeadCapturePayload['scores'] {
  if (!value || typeof value !== 'object') return {}

  return validScoreKeys.reduce<LeadCapturePayload['scores']>((acc, key) => {
    const score = (value as Record<string, unknown>)[key]
    if (typeof score === 'number' && Number.isFinite(score)) {
      acc[key] = Math.max(0, Math.min(100, score))
    }
    return acc
  }, {})
}

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  if (cleanText(body.website)) {
    return NextResponse.json({ ok: true })
  }

  const email = cleanText(body.email, 320).toLowerCase()

  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 })
  }

  if (!isLeadCaptureConfigured()) {
    return NextResponse.json({ ok: false, error: 'Lead capture is not configured.' }, { status: 503 })
  }

  const payload: LeadCapturePayload = {
    email,
    heroName: cleanText(body.heroName, 120),
    locale: cleanText(body.locale, 24),
    blendKey: cleanText(body.blendKey, 80),
    resultName: cleanText(body.resultName, 120),
    resultBlend: cleanText(body.resultBlend, 120),
    scores: cleanScores(body.scores),
    shareUrl: cleanText(body.shareUrl, 500),
    source: cleanText(body.source, 120) || 'quiz-result',
    consentText: cleanText(body.consentText, 500),
    userAgent: cleanText(request.headers.get('user-agent'), 500),
  }

  try {
    await appendLeadToGoogleSheet(payload)
    let emailSent = false

    try {
      const emailResult = await sendProfileEmail(payload)
      emailSent = emailResult.sent
    } catch {}

    return NextResponse.json({ ok: true, emailSent })
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not save lead.' }, { status: 500 })
  }
}
