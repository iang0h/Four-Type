import { NextResponse } from 'next/server'
import { appendEventToGoogleSheet, isLeadCaptureConfigured, type AnalyticsEventPayload } from '@/lib/google-sheets-leads'
import { isFourTypeEventName } from '@/lib/analytics'

export const runtime = 'nodejs'

function cleanText(value: unknown, maxLength = 240) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function cleanNumber(value: unknown, min: number, max: number) {
  if (typeof value !== 'number' || !Number.isInteger(value)) return undefined
  if (value < min || value > max) return undefined
  return value
}

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  const event = cleanText(body.event, 80)

  if (!isFourTypeEventName(event)) {
    return NextResponse.json({ ok: false, error: 'Unsupported event.' }, { status: 400 })
  }

  if (!isLeadCaptureConfigured()) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const payload: AnalyticsEventPayload = {
    event,
    locale: cleanText(body.locale, 24),
    blendKey: cleanText(body.blendKey, 80),
    inviterBlendKey: cleanText(body.inviterBlendKey, 80),
    resultName: cleanText(body.resultName, 120),
    shareId: cleanText(body.shareId, 500),
    compareWith: cleanText(body.compareWith, 500),
    source: cleanText(body.source, 120),
    chapter: cleanNumber(body.chapter, 1, 4),
    question: cleanNumber(body.question, 1, 40),
    path: cleanText(body.path, 500),
    userAgent: cleanText(request.headers.get('user-agent'), 500),
  }

  try {
    await appendEventToGoogleSheet(payload)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ ok: true, skipped: true })
  }
}
