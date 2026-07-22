import type { Metadata } from 'next'
import FieldGuidePolicyPage from '@/components/field-guide/FieldGuidePolicyPage'
import '../field-guide.css'

export const metadata: Metadata = {
  title: 'Field Guide Support · FourType',
  description: 'Contact FourType for Field Guide payment, download and access support.',
}

export default function FieldGuideContactPage() {
  return (
    <FieldGuidePolicyPage eyebrow="Field Guide support" title="Contact FourType">
      <p>For a payment, download or re-access problem, email <a href="mailto:support@fourtype.com">support@fourtype.com</a>.</p>

      <h2>What to include</h2>
      <ul>
        <li>The email address used at Stripe Checkout.</li>
        <li>The approximate purchase date.</li>
        <li>That you purchased Complete Digital Edition.</li>
        <li>A short description of what happened.</li>
      </ul>
      <p>Do not send a card number, security code, password or private Stripe credential. FourType does not need those details to find a purchase.</p>

      <h2>Secure re-access</h2>
      <p>If you only need a fresh download link, use the secure re-access form on the Field Guide access page. It matches your purchase using the checkout email address.</p>
    </FieldGuidePolicyPage>
  )
}
