import type { Metadata } from 'next'
import FieldGuideCampaign from './FieldGuideCampaign'
import './field-guide.css'
import { getSupporterOffer } from '@/lib/field-guide/catalog'

const canonicalUrl = 'https://www.fourtype.com/field-guide'

export const metadata: Metadata = {
  title: 'FourType Field Guide · Illustrated Digital Book',
  description:
    'Get the complete 144-page FourType Field Guide in PDF and EPUB, with practical tools for work, relationships, tension and repair.',
  alternates: { canonical: canonicalUrl },
  openGraph: {
    type: 'website',
    url: canonicalUrl,
    title: 'Read the room. Widen your range. · FourType',
    description: 'A practical illustrated field guide for work, relationships, tension and repair.',
    images: [
      {
        url: '/images/field-guide/field-guide-social.jpg',
        width: 1200,
        height: 630,
        alt: 'The FourType Field Guide illustrated digital book',
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
      name: 'Digital Edition',
      price: getSupporterOffer('field-guide', 'usd').amount / 100,
      priceCurrency: 'USD',
      url: canonicalUrl,
    },
    {
      '@type': 'Offer',
      name: 'Founding Supporter',
      price: getSupporterOffer('founding', 'usd').amount / 100,
      priceCurrency: 'USD',
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
