import Link from 'next/link'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import FieldGuidePolicyLinks from '@/components/field-guide/PolicyLinks'
import SupporterAccessRequest from '@/components/field-guide/SupporterAccessRequest'
import SupporterDownloads from '@/components/field-guide/SupporterDownloads'
import { createProductionSupporterDownloads, resolveProductionSupporterAccess } from '@/lib/field-guide/access-server'
import { getFieldGuidePolicies } from '@/lib/field-guide/policies'
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
  const policy = getFieldGuidePolicies()

  return (
    <div className="field-guide-page">
      <Navigation />
      <main id="main-content" className="field-guide-campaign field-guide-access-page">
        <div className="field-guide-shell field-guide-access-shell">
          {entitlement && downloads.length > 0 ? (
            <>
              <p className="field-guide-eyebrow">Private supporter access</p>
              <h1>Your FourType Field Guide rewards are ready.</h1>
              <p className="field-guide-lede">This secure page is ready with the files for your supporter level.</p>
              <SupporterDownloads tier={entitlement.tier} currency={entitlement.currency} downloads={downloads} />
            </>
          ) : (
            <>
              <p className="field-guide-eyebrow">Supporter access</p>
              <h1>This access link is no longer available.</h1>
              <p className="field-guide-lede">Request a fresh access link with the email used at checkout.</p>
              <SupporterAccessRequest />
              <Link className="field-guide-text-link" href="/field-guide">Return to the Field Guide</Link>
            </>
          )}
          <FieldGuidePolicyLinks policies={policy} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
