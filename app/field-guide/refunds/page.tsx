import type { Metadata } from 'next'
import FieldGuidePolicyPage from '@/components/field-guide/FieldGuidePolicyPage'
import '../field-guide.css'

export const metadata: Metadata = {
  title: 'Field Guide Refund Policy · FourType',
  description: 'Refund and delivery terms for the FourType Field Guide digital editions.',
}

export default function FieldGuideRefundPolicyPage() {
  return (
    <FieldGuidePolicyPage eyebrow="Field Guide policies" title="Refund and digital-products policy">
      <p>The FourType Field Guide is a digital product delivered immediately after Stripe confirms payment. No physical item is shipped.</p>

      <h2>When we will help</h2>
      <p>Contact us within 14 days of purchase if you were charged twice, received a damaged or incomplete file, cannot reach the private download page, or received the wrong edition. We will first try to restore access or replace the file. If we cannot resolve the problem, we will review the purchase for a refund.</p>

      <h2>Change-of-mind purchases</h2>
      <p>Because the PDF and EPUB become available immediately, completed downloads are generally final. Please use the sample spreads and edition details before checkout. This does not limit any refund or cancellation right that cannot legally be excluded where you live.</p>

      <h2>How to request help</h2>
      <p>Use the FourType contact page and include the email address used at checkout, the approximate purchase date and a short description of the problem. Do not send card details. Stripe handles payment information directly.</p>
    </FieldGuidePolicyPage>
  )
}
