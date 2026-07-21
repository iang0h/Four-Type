import Link from 'next/link'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import CancelledTracker from '@/components/field-guide/CancelledTracker'
import '../field-guide.css'

export default function FieldGuideCancelledPage() {
  return (
    <div className="field-guide-page">
      <Navigation />
      <main id="main-content" className="field-guide-campaign field-guide-access-page">
        <CancelledTracker />
        <div className="field-guide-shell field-guide-access-shell">
          <p className="field-guide-eyebrow">Checkout paused</p>
          <h1>No payment was completed.</h1>
          <p className="field-guide-lede">Your supporter selection was not changed. You are welcome to look through the options or return to the preview.</p>
          <div className="field-guide-actions">
            <Link className="field-guide-button field-guide-button-primary" href="/field-guide#supporter-levels">View supporter levels</Link>
            <Link className="field-guide-button field-guide-button-secondary" href="/field-guide#inside-the-guide">Preview the Field Guide</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
