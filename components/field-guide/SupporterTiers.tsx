'use client'

import CheckoutButton from './CheckoutButton'
import { trackFieldGuideEvent } from './CampaignAnalytics'
import { getSupporterOffer } from '@/lib/field-guide/catalog'

export default function SupporterTiers() {
  function trackTierSelection(tier: 'field-guide' | 'founding') {
    trackFieldGuideEvent({ event: 'field-guide-tier-select', tier, currency: 'usd' })
  }

  const fieldGuidePrice = getSupporterOffer('field-guide', 'usd').label
  const foundingPrice = getSupporterOffer('founding', 'usd').label

  return (
    <div className="field-guide-tier-grid">
        <article className="field-guide-tier field-guide-tier-primary">
          <p className="field-guide-tier-kicker">Digital Edition</p>
          <p className="field-guide-tier-price">{fieldGuidePrice}</p>
          <p className="field-guide-tier-intro">The complete illustrated book for reading, reflection and everyday practice.</p>
          <ul>
            <li>Complete 144-page PDF</li>
            <li>Reflowable EPUB</li>
            <li>Immediate secure access after verified payment</li>
            <li>Personal-use license</li>
          </ul>
          <CheckoutButton
            tier="field-guide"
            currency="usd"
            className="field-guide-button field-guide-button-primary"
            onBeforeCheckoutStart={() => trackTierSelection('field-guide')}
          >
            Get the Field Guide
          </CheckoutButton>
        </article>
        <article className="field-guide-tier">
          <p className="field-guide-tier-kicker">Founding Supporter</p>
          <p className="field-guide-tier-price">{foundingPrice}</p>
          <p className="field-guide-tier-intro">A voluntary extra level for people who want the printable practice material and Edition 1 revisions.</p>
          <ul>
            <li>Complete 144-page PDF</li>
            <li>Reflowable EPUB</li>
            <li>Separate printable worksheet pack</li>
            <li>Future revisions of Edition 1</li>
            <li>Personal-use license</li>
          </ul>
          <CheckoutButton
            tier="founding"
            currency="usd"
            className="field-guide-button field-guide-button-secondary"
            onBeforeCheckoutStart={() => trackTierSelection('founding')}
          >
            Become a Founding Supporter
          </CheckoutButton>
          <p className="field-guide-tier-fine">Edition 1 revisions are revised files within this edition, not every future book or a future edition.</p>
        </article>
    </div>
  )
}
