import type { Metadata } from 'next'
import FieldGuideCampaign from './FieldGuideCampaign'
import './field-guide.css'
import { getSupporterOffer } from '@/lib/field-guide/catalog'

const canonicalUrl = 'https://www.fourtype.com/field-guide'

export const metadata: Metadata = {
  title: 'Support FourType · Receive The FourType Field Guide',
  description:
    'Support FourType and receive the complete 144-page illustrated Field Guide in PDF and EPUB, with practical tools for work, relationships, tension and repair.',
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: 'website',
    url: canonicalUrl,
    title: 'Help more people read the room · FourType',
    description: 'Support the next chapter of FourType and receive the complete illustrated Field Guide.',
    images: [
      {
        url: '/images/field-guide/field-guide-social.jpg',
        width: 1200,
        height: 630,
        alt: 'The FourType Field Guide supporter campaign',
      },
    ],
  },
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'The FourType Field Guide',
  description:
    'A complete illustrated digital Field Guide with practical tools for work, relationships, tension and repair.',
  url: canonicalUrl,
  image: 'https://www.fourtype.com/images/field-guide/field-guide-social.jpg',
  brand: {
    '@type': 'Brand',
    name: 'FourType',
  },
  category: 'Digital book',
  offers: [
    {
      '@type': 'Offer',
      name: 'Field Guide Supporter (USD)',
      price: getSupporterOffer('field-guide', 'usd').amount / 100,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
    {
      '@type': 'Offer',
      name: 'Field Guide Supporter (MYR)',
      price: getSupporterOffer('field-guide', 'myr').amount / 100,
      priceCurrency: 'MYR',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
    {
      '@type': 'Offer',
      name: 'Founding Supporter (USD)',
      price: getSupporterOffer('founding', 'usd').amount / 100,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
    {
      '@type': 'Offer',
      name: 'Founding Supporter (MYR)',
      price: getSupporterOffer('founding', 'myr').amount / 100,
      priceCurrency: 'MYR',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
  ],
}

export default function FieldGuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <FieldGuideCampaign />
    </>
  )
}
