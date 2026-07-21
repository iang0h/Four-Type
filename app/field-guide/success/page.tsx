import Link from 'next/link'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import SupporterDownloads from '@/components/field-guide/SupporterDownloads'
import { resolveVerifiedSuccessAccess } from '@/lib/field-guide/access'
import { createProductionSupporterDownloads, getProductionFieldGuideEntitlement } from '@/lib/field-guide/access-server'
import { fulfillProductionFieldGuideCheckout } from '@/lib/field-guide/fulfillment-server'
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

  return (
    <div className="field-guide-page">
      <Navigation />
      <main id="main-content" className="field-guide-campaign field-guide-access-page">
        <div className="field-guide-shell field-guide-access-shell">
          {entitlement && downloads.length > 0 ? (
            <>
              <p className="field-guide-eyebrow">Support confirmed</p>
              <h1>Thank you for supporting FourType.</h1>
              <p className="field-guide-lede">Your payment was verified and your private rewards are ready.</p>
              <SupporterDownloads tier={entitlement.tier} currency={entitlement.currency} downloads={downloads} />
            </>
          ) : (
            <>
              <p className="field-guide-eyebrow">Supporter access</p>
              <h1>We could not confirm that payment yet.</h1>
              <p className="field-guide-lede">You can return to the supporter levels or try your secure checkout link again in a moment.</p>
              <Link className="field-guide-button field-guide-button-primary" href="/field-guide#supporter-levels">View supporter levels</Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
