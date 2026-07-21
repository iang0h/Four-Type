import Link from 'next/link'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import SupporterAccessRequest from '@/components/field-guide/SupporterAccessRequest'
import SupporterDownloads from '@/components/field-guide/SupporterDownloads'
import { createProductionSupporterDownloads, resolveProductionSupporterAccess } from '@/lib/field-guide/access-server'
import '../field-guide.css'

export const dynamic = 'force-dynamic'

export default async function FieldGuideAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  let entitlement = null

  if (typeof token === 'string' && token.length > 0 && token.length <= 4_096) {
    try {
      entitlement = await resolveProductionSupporterAccess(token)
    } catch {
      entitlement = null
    }
  }

  const downloads = entitlement ? createProductionSupporterDownloads(entitlement) : []

  return (
    <div className="field-guide-page">
      <Navigation />
      <main id="main-content" className="field-guide-campaign field-guide-access-page">
        <div className="field-guide-shell field-guide-access-shell">
          {entitlement && downloads.length > 0 ? (
            <>
              <p className="field-guide-eyebrow">Private supporter access</p>
              <h1>Your Field Guide rewards are ready.</h1>
              <p className="field-guide-lede">This access page shows the files included with your supporter level.</p>
              <SupporterDownloads tier={entitlement.tier} currency={entitlement.currency} downloads={downloads} />
            </>
          ) : (
            <>
              <p className="field-guide-eyebrow">Supporter access</p>
              <h1>This access link is no longer available.</h1>
              <p className="field-guide-lede">Request a fresh link with the email used for your supporter purchase.</p>
              <SupporterAccessRequest />
              <Link className="field-guide-text-link" href="/field-guide#inside-the-guide">Return to the Field Guide preview</Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
