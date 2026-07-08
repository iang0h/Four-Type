import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { breadcrumbJsonLd, fourTypeOrganizationRef, fourTypeQuizAppRef, fourTypeWebsiteRef, quizActionJsonLd, temperamentTopicJsonLd } from '@/lib/seo-content'
import { getSubtype, getAllSubtypes } from '@/lib/subtypes'
import SubtypePageClient from './SubtypePageClient'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const subtype = getSubtype(slug)
  
  if (!subtype) {
    return {
      title: 'Temperament Not Found',
      description: 'This temperament type could not be found.',
    }
  }
  
  return {
    title: `${subtype.name} - ${subtype.title} | FourType`,
    description: subtype.tagline,
    keywords: [
      'temperament subtype',
      'temperament test result',
      `${subtype.name.toLowerCase()} temperament`,
      subtype.name.toLowerCase(),
      subtype.title.toLowerCase(),
      subtype.primary,
      'four temperaments',
    ],
    alternates: {
      canonical: `https://www.fourtype.com/subtype/${subtype.slug}`,
    },
    openGraph: {
      title: `${subtype.name} - ${subtype.title} | FourType`,
      description: subtype.tagline,
      type: 'article',
      url: `https://www.fourtype.com/subtype/${subtype.slug}`,
      siteName: 'FourType',
      images: [
        {
          url: 'https://www.fourtype.com/og-image.png',
          width: 1672,
          height: 941,
          alt: `${subtype.name} temperament subtype result`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${subtype.name} - ${subtype.title}`,
      description: subtype.tagline,
    },
  }
}

export async function generateStaticParams() {
  return getAllSubtypes().map(subtype => ({
    slug: subtype.slug,
  }))
}

export default async function SubtypePage({ params }: PageProps) {
  const { slug } = await params
  const subtype = getSubtype(slug)
  
  if (!subtype) {
    notFound()
  }
  
  const canonicalUrl = `https://www.fourtype.com/subtype/${subtype.slug}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `${subtype.name} Temperament Subtype`,
    headline: `${subtype.name}: ${subtype.title}`,
    description: subtype.tagline,
    url: canonicalUrl,
    isPartOf: fourTypeWebsiteRef,
    mainEntity: {
      '@type': 'DefinedTerm',
      name: subtype.name,
      description: subtype.overview,
      termCode: subtype.slug,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'FourType Temperament Subtypes',
        url: 'https://www.fourtype.com/subtypes',
      },
    },
    about: [
      ...temperamentTopicJsonLd,
      { '@type': 'DefinedTerm', name: `${subtype.primary} temperament`, url: `https://www.fourtype.com/${subtype.primary}-test` },
      subtype.secondary === 'pure' ? null : { '@type': 'DefinedTerm', name: `${subtype.secondary} temperament`, url: `https://www.fourtype.com/${subtype.secondary}-test` },
      { '@type': 'DefinedTerm', name: 'Temperament subtype', url: 'https://www.fourtype.com/subtypes' },
    ].filter(Boolean),
    publisher: fourTypeOrganizationRef,
    mainEntityOfPage: canonicalUrl,
    potentialAction: {
      '@type': 'TakeAction',
      target: 'https://www.fourtype.com/quiz',
      name: 'Take the free temperament test',
      object: fourTypeQuizAppRef,
    },
  }
  const breadcrumbSchema = breadcrumbJsonLd([
    { href: '/', title: 'FourType', description: 'FourType home' },
    { href: '/subtypes', title: 'Temperament Subtypes', description: 'Explore blended temperament patterns' },
    { href: `/subtype/${subtype.slug}`, title: subtype.name, description: subtype.tagline },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizActionJsonLd) }} />
      <SubtypePageClient subtype={subtype} />
    </>
  )
}
