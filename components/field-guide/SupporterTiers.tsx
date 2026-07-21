'use client'

import { useEffect, useState } from 'react'
import CheckoutButton from './CheckoutButton'
import { trackFieldGuideEvent } from './CampaignAnalytics'
import { getSupporterOffer, type CurrencyKey } from '@/lib/field-guide/catalog'

const currencyStorageKey = 'fourtype-field-guide-currency'

export default function SupporterTiers() {
  const [currency, setCurrency] = useState<CurrencyKey>('usd')

  useEffect(() => {
    const savedCurrency = window.sessionStorage.getItem(currencyStorageKey)

    if (savedCurrency === 'usd' || savedCurrency === 'myr') {
      setCurrency(savedCurrency)
    }
  }, [])

  function selectCurrency(nextCurrency: CurrencyKey) {
    setCurrency(nextCurrency)
    window.sessionStorage.setItem(currencyStorageKey, nextCurrency)
    trackFieldGuideEvent({ event: 'field-guide-currency-select', currency: nextCurrency })
  }

  const fieldGuidePrice = getSupporterOffer('field-guide', currency).label
  const foundingPrice = getSupporterOffer('founding', currency).label

  return (
    <>
      <div className="field-guide-currency-selector" aria-label="Choose checkout currency">
        <span>Currency</span>
        <button type="button" aria-pressed={currency === 'usd'} onClick={() => selectCurrency('usd')}>USD</button>
        <button type="button" aria-pressed={currency === 'myr'} onClick={() => selectCurrency('myr')}>MYR</button>
      </div>

      <div className="field-guide-tier-grid">
        <article className="field-guide-tier field-guide-tier-primary">
          <p className="field-guide-tier-kicker">Field Guide Supporter</p>
          <p className="field-guide-tier-price">{fieldGuidePrice}</p>
          <p className="field-guide-tier-intro">The complete illustrated guide for your own reading and practice.</p>
          <ul>
            <li>Complete 144-page PDF</li>
            <li>Reflowable EPUB</li>
            <li>Immediate secure access after verified payment</li>
            <li>Personal-use license</li>
          </ul>
          <CheckoutButton tier="field-guide" currency={currency} className="field-guide-button field-guide-button-primary">
            Support and receive the guide
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
          <CheckoutButton tier="founding" currency={currency} className="field-guide-button field-guide-button-secondary">
            Become a Founding Supporter
          </CheckoutButton>
          <p className="field-guide-tier-fine">Edition 1 revisions are revised files within this edition, not every future book or a future edition.</p>
        </article>
      </div>
    </>
  )
}
