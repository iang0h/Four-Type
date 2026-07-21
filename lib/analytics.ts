export const FOURTYPE_EVENT_NAMES = [
  'quiz-start',
  'chapter-complete',
  'quiz-complete',
  'quiz-result',
  'invite-share',
  'invite-copy',
  'invite-open',
  'referred-quiz-start',
  'referred-quiz-complete',
  'compare-result',
  'pair-share',
  'pair-copy',
  'invalid-share-id',
  'share-click',
  'copy-link',
  'field-guide-hero-cta',
  'field-guide-preview-open',
  'field-guide-preview-navigate',
  'field-guide-tier-select',
  'field-guide-currency-select',
  'field-guide-checkout-start',
  'field-guide-checkout-cancel',
  'field-guide-purchase-complete',
  'field-guide-download',
  'field-guide-access-request',
] as const

export type FourTypeEventName = (typeof FOURTYPE_EVENT_NAMES)[number]

export type FourTypeEventPayload = {
  event: FourTypeEventName
  locale?: string
  blendKey?: string
  inviterBlendKey?: string
  resultName?: string
  shareId?: string
  compareWith?: string
  source?: string
  chapter?: number
  question?: number
  tier?: 'field-guide' | 'founding'
  currency?: 'usd' | 'myr'
  asset?: 'pdf' | 'epub' | 'worksheets'
  previewPage?: number
}

export function isFourTypeEventName(value: string): value is FourTypeEventName {
  return (FOURTYPE_EVENT_NAMES as readonly string[]).includes(value)
}

type AnalyticsLocation = Pick<Location, 'pathname' | 'search' | 'hash'>

export function buildAnalyticsEventBody(payload: FourTypeEventPayload, location: AnalyticsLocation) {
  return JSON.stringify({
    ...payload,
    path: location.pathname,
  })
}

export function trackFourTypeEvent(payload: FourTypeEventPayload) {
  if (typeof navigator === 'undefined') return

  const body = buildAnalyticsEventBody(payload, window.location)

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon('/api/events', blob)
    return
  }

  fetch('/api/events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {})
}
