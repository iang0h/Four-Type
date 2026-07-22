'use client'

import CheckoutButton from './CheckoutButton'
import { trackFieldGuideEvent } from './CampaignAnalytics'
import { getSupporterOffer } from '@/lib/field-guide/catalog'

export default function SupporterTiers() {
  function trackTierSelection(tier: 'founding') {
    trackFieldGuideEvent({ event: 'field-guide-tier-select', tier, currency: 'usd' })
  }

  const foundingPrice = getSupporterOffer('founding', 'usd').label

  return (
    <div className="field-guide-tier-grid">
        <article className="field-guide-tier field-guide-tier-primary">
          <p className="field-guide-tier-kicker">Founding Digital Supporter</p>
          <p className="field-guide-tier-price">{foundingPrice}</p>
          <p className="field-guide-tier-intro">The complete illustrated Field Guide, plus a printable worksheet pack for using it in real life.</p>
          <ul>
            <li>Complete 144-page PDF</li>
            <li>Reflowable EPUB</li>
            <li>Separate printable worksheet pack</li>
            <li>Immediate secure access after verified payment</li>
            <li>Personal-use licence</li>
          </ul>
          <CheckoutButton
            tier="founding"
            currency="usd"
            className="field-guide-button field-guide-button-secondary"
            onBeforeCheckoutStart={() => trackTierSelection('founding')}
          >
            Get the Field Guide
          </CheckoutButton>
        </article>
    </div>
  )
}
