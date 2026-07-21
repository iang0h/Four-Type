import { NextResponse } from 'next/server'
import { appendEventToGoogleSheet, isLeadCaptureConfigured, type AnalyticsEventPayload } from '@/lib/google-sheets-leads'
import { isFourTypeEventName } from '@/lib/analytics'

export const runtime = 'nodejs'

type EventHandlerDependencies = {
  isConfigured: () => boolean
  append: (payload: AnalyticsEventPayload) => Promise<void>
}

function cleanText(value: unknown, maxLength = 240) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function containsSensitiveValue(value: string) {
  return /(?:^|[?&#\s])(token|session_id|email)=/i.test(value)
    || /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value)
}

function cleanAnalyticsText(value: unknown, maxLength = 240) {
  const text = cleanText(value, maxLength)
  return containsSensitiveValue(text) ? '' : text
}

function cleanPath(value: unknown) {
  const text = cleanText(value, 500)
  if (!text) return ''

  try {
    const pathname = new URL(text, 'https://analytics.invalid').pathname
    return pathname.startsWith('/') ? pathname.slice(0, 500) : ''
  } catch {
    return ''
  }
}

function cleanNumber(value: unknown, min: number, max: number) {
  if (typeof value !== 'number' || !Number.isInteger(value)) return undefined
  if (value < min || value > max) return undefined
  return value
}

export function createEventsPostHandler({ isConfigured, append }: EventHandlerDependencies) {
  return async function POST(request: Request) {
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

  if (!isConfigured()) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const payload: AnalyticsEventPayload = {
    event,
    locale: cleanAnalyticsText(body.locale, 24),
    blendKey: cleanAnalyticsText(body.blendKey, 80),
    inviterBlendKey: cleanAnalyticsText(body.inviterBlendKey, 80),
    resultName: cleanAnalyticsText(body.resultName, 120),
    shareId: cleanAnalyticsText(body.shareId, 500),
    compareWith: cleanAnalyticsText(body.compareWith, 500),
    source: cleanAnalyticsText(body.source, 120),
    chapter: cleanNumber(body.chapter, 1, 4),
    question: cleanNumber(body.question, 1, 40),
    path: cleanPath(body.path),
    userAgent: cleanAnalyticsText(request.headers.get('user-agent'), 500),
  }

  try {
    await append(payload)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true, skipped: true })
  }
}
}

export const POST = createEventsPostHandler({
  isConfigured: isLeadCaptureConfigured,
  append: appendEventToGoogleSheet,
})
