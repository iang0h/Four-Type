import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ContentBlocks } from '@/components/ContentBlocks'
import { FaqSection } from '@/components/FaqSection'
import { InternalLinkHub } from '@/components/InternalLinkHub'
import { accentStyles, breadcrumbJsonLd, faqJsonLd, getSeoPage, guideLinksForSeoPage, quizActionJsonLd, seoPages } from '@/lib/seo-content'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = getSeoPage(slug)
  if (!page) return {}

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `https://www.fourtype.com/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `https://www.fourtype.com/${page.slug}`,
      type: 'article',
      images: [{ url: 'https://www.fourtype.com/og-image.jpg', width: 1280, height: 960, alt: page.shortTitle }],
    },
  }
}

export default async function SeoLandingPage({ params }: Props) {
  const { slug } = await params
  const page = getSeoPage(slug)
  if (!page) notFound()

  const Icon = page.icon
  const accent = accentStyles[page.accent]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.description,
    url: `https://www.fourtype.com/${page.slug}`,
    author: { '@type': 'Organization', name: 'FourType', url: 'https://www.fourtype.com' },
    publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: 'https://www.fourtype.com/fourtype-logo.png' } },
    mainEntityOfPage: `https://www.fourtype.com/${page.slug}`,
  }
  const faqSchema = faqJsonLd(page.faq)
  const breadcrumbSchema = breadcrumbJsonLd([
    { href: '/', title: 'FourType', description: 'FourType home' },
    { href: '/temperament-test', title: 'Temperament Test', description: 'Main temperament test guide' },
    { href: `/${page.slug}`, title: page.shortTitle, description: page.description },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizActionJsonLd) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-24 md:py-28">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Icon className={`w-6 h-6 ${accent.text}`} />
              <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">{page.eyebrow}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">{page.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{page.description}</p>
            <Link
              href="/quiz"
              className={`mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${accent.button}`}
            >
              {page.ctaLabel ?? 'Take the Free Quiz'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ContentBlocks blocks={page.blocks} />
          <InternalLinkHub title="Keep Exploring Temperament Tests" links={guideLinksForSeoPage(page.slug)} />
          <FaqSection faq={page.faq} />

          <div className="bg-secondary/30 border border-border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-serif font-bold mb-3">Find Your FourType Pattern</h2>
            <p className="text-muted-foreground mb-6">
              Take the free 40-question temperament quiz, then compare your result with the guides above.
            </p>
            <Link href="/quiz" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Begin the Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
