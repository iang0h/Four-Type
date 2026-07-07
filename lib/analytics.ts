type AnalyticsEvent = {
  event: 'quiz-result' | 'share-click' | 'copy-link' | 'compare-result'
  locale?: string
  blendKey?: string
  resultName?: string
  shareId?: string
  compareWith?: string
  source?: string
}

export function trackFourTypeEvent(payload: AnalyticsEvent) {
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
