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
}

export function isFourTypeEventName(value: string): value is FourTypeEventName {
  return (FOURTYPE_EVENT_NAMES as readonly string[]).includes(value)
}

export function trackFourTypeEvent(payload: FourTypeEventPayload) {
  if (typeof navigator === 'undefined') return

  const body = JSON.stringify({
    ...payload,
    path: typeof window === 'undefined' ? '' : `${window.location.pathname}${window.location.search}`,
  })

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
