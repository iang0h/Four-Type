'use client'

import { useEffect } from 'react'
import { trackFieldGuideEvent } from './CampaignAnalytics'

export default function CancelledTracker() {
  useEffect(() => {
    trackFieldGuideEvent({ event: 'field-guide-checkout-cancel' })
  }, [])

  return null
}
