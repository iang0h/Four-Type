import type { Metadata } from 'next'
import FieldGuidePolicyPage from '@/components/field-guide/FieldGuidePolicyPage'
import '../field-guide.css'

export const metadata: Metadata = {
  title: 'Field Guide Privacy · FourType',
  description: 'How FourType handles information connected with Field Guide purchases and access.',
}

export default function FieldGuidePrivacyPage() {
  return (
    <FieldGuidePolicyPage eyebrow="Field Guide policies" title="Privacy">
      <p>This notice explains how FourType handles information connected with the Field Guide sales page, checkout, delivery and re-access.</p>

      <h2>Information we receive</h2>
      <ul>
        <li>Your name and email address from Stripe Checkout.</li>
        <li>Purchase details such as edition, currency, payment status and Stripe session reference.</li>
        <li>Access and delivery records needed to provide secure downloads and fresh access links.</li>
        <li>Limited site analytics, such as page, preview and checkout events, used to understand whether the experience works.</li>
      </ul>
      <p>FourType does not receive or store your full card number. Stripe processes payment information.</p>

      <h2>Why we use it</h2>
      <p>We use this information to complete your purchase, deliver the files, prevent abuse, restore access, answer support requests, keep records required for accounting and improve the Field Guide experience.</p>

      <h2>Services involved</h2>
      <p>FourType uses service providers including Stripe for payments, Vercel for hosting and private file delivery, and configured email, analytics or record-keeping services where needed to complete delivery and support. Each provider handles information under its own terms and privacy obligations.</p>

      <h2>Retention and your choices</h2>
      <p>Purchase and entitlement records are kept for as long as needed to provide access, prevent fraud and meet legal or accounting duties. You may ask for access, correction or deletion of personal information through the contact page. Some transaction records may need to be retained where the law requires it.</p>
    </FieldGuidePolicyPage>
  )
}
