import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ContentBlocks } from '@/components/ContentBlocks'
import { accentStyles, blogArticles, getBlogArticle } from '@/lib/seo-content'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getBlogArticle(slug)
  if (!article) return {}

  return {
    title: `${article.title} | FourType`,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `https://www.fourtype.com/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://www.fourtype.com/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.published,
      images: [{ url: `https://www.fourtype.com${article.image}`, width: 1672, height: 941, alt: article.imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [`https://www.fourtype.com${article.image}`],
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getBlogArticle(slug)
  if (!article) notFound()

  const Icon = article.icon
  const accent = accentStyles[article.accent]
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: `https://www.fourtype.com${article.image}`,
    datePublished: article.published,
    dateModified: article.published,
    author: { '@type': 'Organization', name: 'FourType', url: 'https://www.fourtype.com' },
    publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: 'https://www.fourtype.com/fourtype-logo.png' } },
    mainEntityOfPage: `https://www.fourtype.com/blog/${article.slug}`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <main className="min-h-screen bg-background">
        <article className="max-w-4xl mx-auto px-4 py-24 md:py-28">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Icon className={`w-6 h-6 ${accent.text}`} />
              <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">{article.category}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">{article.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">{article.description}</p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
              <span>{article.readTime} read</span>
              <span>Updated July 2, 2026</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-border mb-14">
            <Image
              src={article.image}
              alt={article.imageAlt}
              width={1672}
              height={941}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          <ContentBlocks blocks={article.blocks} />

          <div className="bg-secondary/30 border border-border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-serif font-bold mb-3">Know Your Type Before You Compare</h2>
            <p className="text-muted-foreground mb-6">
              The article is easier to apply once you know your own temperament pattern.
            </p>
            <Link href="/quiz" className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${accent.button}`}>
              Take the Free Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-xl font-serif font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {article.related.map((item) => (
                <Link key={item.href} href={item.href} className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <p className="font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
