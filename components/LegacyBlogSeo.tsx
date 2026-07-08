import { breadcrumbJsonLd, quizActionJsonLd } from '@/lib/seo-content'

type LegacyBlogSeoProps = {
  title: string
  description: string
  path: string
  published: string
  image?: string
}

export function LegacyBlogSeo({ title, description, path, published, image = 'https://www.fourtype.com/og-image.png' }: LegacyBlogSeoProps) {
  const canonicalUrl = `https://www.fourtype.com${path}`
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image,
    datePublished: published,
    dateModified: published,
    author: {
      '@type': 'Organization',
      name: 'FourType',
      url: 'https://www.fourtype.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FourType',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.fourtype.com/fourtype-logo.png',
      },
    },
    mainEntityOfPage: canonicalUrl,
  }
  const breadcrumbSchema = breadcrumbJsonLd([
    { href: '/', title: 'FourType', description: 'FourType home' },
    { href: '/blog', title: 'Blog', description: 'FourType temperament articles' },
    { href: path, title, description },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizActionJsonLd) }} />
    </>
  )
}
