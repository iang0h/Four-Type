'use client'

import Image from 'next/image'
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
        <div className="field-guide-bundle-visual" aria-hidden="true">
          <div className="field-guide-bundle-worksheet">
            <Image src="/images/field-guide/preview-76.webp" alt="" width={640} height={914} />
            <span>Field practice</span>
          </div>
          <Image
            className="field-guide-bundle-book"
            src="/images/field-guide/cover.webp"
            alt=""
            width={980}
            height={1400}
          />
        </div>
        <div className="field-guide-tier-details">
          <p className="field-guide-tier-kicker">Complete Digital Edition</p>
          <p className="field-guide-tier-price">{foundingPrice}</p>
          <p className="field-guide-tier-intro">The full 144-page Field Guide, reflowable EPUB and printable worksheet pack.</p>
          <ul>
            <li>Designed PDF for reading and printing</li>
            <li>Reflowable EPUB for compatible reading apps</li>
            <li>Printable worksheet pack for field practice</li>
          </ul>
          <CheckoutButton
            tier="founding"
            currency="usd"
            className="field-guide-button field-guide-button-primary"
            onBeforeCheckoutStart={() => trackTierSelection('founding')}
          >
            Get instant access · US$12
          </CheckoutButton>
        </div>
      </article>
    </div>
  )
}
