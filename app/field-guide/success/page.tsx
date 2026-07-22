import Link from 'next/link'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import FieldGuidePolicyLinks from '@/components/field-guide/PolicyLinks'
import SupporterDownloads from '@/components/field-guide/SupporterDownloads'
import FieldGuidePurchaseCompleteTracker from '@/components/field-guide/FieldGuidePurchaseCompleteTracker'
import { resolveVerifiedSuccessAccess } from '@/lib/field-guide/access'
import { createProductionSupporterDownloads, getProductionFieldGuideEntitlement } from '@/lib/field-guide/access-server'
import { fulfillProductionFieldGuideCheckout } from '@/lib/field-guide/fulfillment-server'
import { getFieldGuidePolicies } from '@/lib/field-guide/policies'
import '../field-guide.css'

function boundedSessionId(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0 && value.length <= 256 && /^[A-Za-z0-9_:-]+$/.test(value)
}

export const dynamic = 'force-dynamic'

export default async function FieldGuideSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id: sessionId } = await searchParams
  let entitlement = null

  if (boundedSessionId(sessionId)) {
    entitlement = await resolveVerifiedSuccessAccess(sessionId, {
      fulfill: fulfillProductionFieldGuideCheckout,
      readEntitlement: getProductionFieldGuideEntitlement,
    })
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
              <p className="field-guide-eyebrow">Support confirmed</p>
              <h1>Thank you for supporting FourType.</h1>
              <p className="field-guide-lede">Your payment is verified and your private rewards are now ready to use.</p>
              <FieldGuidePurchaseCompleteTracker tier={entitlement.tier} currency={entitlement.currency} />
              <SupporterDownloads tier={entitlement.tier} currency={entitlement.currency} downloads={downloads} />
              <div className="field-guide-actions field-guide-access-actions">
                <Link className="field-guide-button field-guide-button-secondary" href="/field-guide#inside-the-guide">
                  View book preview pages
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="field-guide-eyebrow">Supporter access</p>
              <h1>We could not confirm that payment yet.</h1>
              <p className="field-guide-lede">The payment status is still confirming. You can return to supporter levels or try your secure checkout link again.</p>
              <Link className="field-guide-button field-guide-button-primary" href="/field-guide#supporter-levels">View supporter levels</Link>
            </>
          )}
          <FieldGuidePolicyLinks policies={policy} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
