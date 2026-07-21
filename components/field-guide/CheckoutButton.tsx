'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { trackFieldGuideEvent } from './CampaignAnalytics'
import type { CurrencyKey, SupporterTierKey } from '@/lib/field-guide/catalog'

type CheckoutButtonProps = {
  tier: SupporterTierKey
  currency: CurrencyKey
  className: string
  children: React.ReactNode
}

export default function CheckoutButton({ tier, currency, className, children }: CheckoutButtonProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(false)

  async function startCheckout() {
    setIsSubmitting(true)
    setError(false)
    trackFieldGuideEvent({ event: 'field-guide-checkout-start', tier, currency })

    try {
      const response = await fetch('/api/field-guide/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, currency }),
      })

      if (!response.ok) throw new Error('Checkout is unavailable')

      const payload: unknown = await response.json()
      if (!payload || typeof payload !== 'object' || typeof (payload as { url?: unknown }).url !== 'string') {
        throw new Error('Checkout is unavailable')
      }

      window.location.assign((payload as { url: string }).url)
    } catch {
      setError(true)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="field-guide-checkout-action">
      <button type="button" className={className} disabled={isSubmitting} onClick={startCheckout}>
        {isSubmitting ? 'Opening secure checkout...' : children} <ArrowRight aria-hidden="true" size={17} />
      </button>
      {error && <p className="field-guide-checkout-error" role="alert">Checkout is unavailable right now. Please try again.</p>}
    </div>
  )
}
