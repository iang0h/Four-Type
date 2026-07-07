import { NextResponse } from 'next/server'
import { appendEventToGoogleSheet, isLeadCaptureConfigured, type AnalyticsEventPayload } from '@/lib/google-sheets-leads'

export const runtime = 'nodejs'

const allowedEvents = new Set(['quiz-result', 'share-click', 'copy-link', 'compare-result'])

function cleanText(value: unknown, maxLength = 240) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

export async function POST(request: Request) {
  let body: Record<string, unknown>

  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 })
  }

  const event = cleanText(body.event, 80)

  if (!allowedEvents.has(event)) {
    return NextResponse.json({ ok: false, error: 'Unsupported event.' }, { status: 400 })
  }

  if (!isLeadCaptureConfigured()) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const payload: AnalyticsEventPayload = {
    event,
    locale: cleanText(body.locale, 24),
    blendKey: cleanText(body.blendKey, 80),
    resultName: cleanText(body.resultName, 120),
    shareId: cleanText(body.shareId, 500),
    compareWith: cleanText(body.compareWith, 500),
    source: cleanText(body.source, 120),
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
