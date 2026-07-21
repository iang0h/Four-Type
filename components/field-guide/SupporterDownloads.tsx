'use client'

import { Download } from 'lucide-react'
import { trackFieldGuideEvent } from './CampaignAnalytics'
import type { SupporterDownload } from '@/lib/field-guide/access-server'
import type { CurrencyKey, SupporterTierKey } from '@/lib/field-guide/catalog'

type SupporterDownloadsProps = {
  tier: SupporterTierKey
  currency: CurrencyKey
  downloads: SupporterDownload[]
}

export default function SupporterDownloads({ tier, currency, downloads }: SupporterDownloadsProps) {
  return (
    <section className="field-guide-downloads" aria-labelledby="supporter-downloads-title">
      <h2 id="supporter-downloads-title">Your included files</h2>
      <ul>
        {downloads.map((download) => (
          <li key={download.asset}>
            <a
              className="field-guide-button field-guide-button-primary"
              href={download.href}
              onClick={() => trackFieldGuideEvent({
                event: 'field-guide-download',
                tier,
                currency,
                asset: download.asset,
              })}
            >
              <Download aria-hidden="true" size={17} /> {download.label}
            </a>
          </li>
        ))}
      </ul>
      <p>Download links expire shortly for your privacy. Return to this page or request a fresh access link whenever you need one.</p>
      <p>These files are for your personal use. Please do not share, resell, or distribute them.</p>
    </section>
  )
}
