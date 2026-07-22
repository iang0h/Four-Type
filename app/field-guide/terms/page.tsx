import type { Metadata } from 'next'
import FieldGuidePolicyPage from '@/components/field-guide/FieldGuidePolicyPage'
import '../field-guide.css'

export const metadata: Metadata = {
  title: 'Field Guide Terms and Licence · FourType',
  description: 'Purchase, access and personal-use licence terms for the FourType Field Guide.',
}

export default function FieldGuideTermsPage() {
  return (
    <FieldGuidePolicyPage eyebrow="Field Guide policies" title="Terms and personal-use licence">
      <p>By purchasing and downloading the FourType Field Guide, you agree to these terms.</p>

      <h2>Your edition</h2>
      <p>Digital Edition includes the complete PDF and reflowable EPUB. Founding Supporter also includes the listed worksheet pack and revisions released within Edition 1. It does not include a future edition, every future FourType publication or a physical book.</p>

      <h2>Personal-use licence</h2>
      <p>You may read the files on your own devices and print reasonable copies for your own use. You may not repost, redistribute, resell, upload to a shared library, remove ownership notices or package the files into another product. Organisations, workshops and commercial programmes need separate written permission.</p>

      <h2>Access and delivery</h2>
      <p>Downloads are provided after Stripe confirms payment. Secure links can expire. You may request fresh access using the checkout email address. Keep that address available because it is how the purchase is matched to you.</p>

      <h2>Responsible use</h2>
      <p>FourType is a framework for reflection and conversation. It is not a clinical assessment, diagnosis, employment-screening tool or reason to rank, hire, exclude or permanently label a person. You remain responsible for how you use the ideas and exercises.</p>

      <h2>Copyright and changes</h2>
      <p>The text, illustrations, character designs, layout and FourType names are protected work belonging to FourType or its licensors. We may correct errors and improve Edition 1 while preserving the purchased edition&apos;s core content and access.</p>

      <h2>Problems and refunds</h2>
      <p>The refund and digital-products policy forms part of these terms. Contact FourType before starting a payment dispute so we have a fair opportunity to restore delivery or correct the problem.</p>
    </FieldGuidePolicyPage>
  )
}
