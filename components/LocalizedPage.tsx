import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { localizedLocales, localizedPages, localizedPath, type LocaleCode, type LocalizedPageKey } from '@/lib/localized-content'

type Props = {
  locale: LocaleCode
  pageKey: LocalizedPageKey
}

const pageAlternates: Record<LocalizedPageKey, string> = {
  home: '/',
  'temperament-test': '/temperament-test',
  'four-temperaments-test': '/four-temperaments-test',
  quiz: '/quiz',
}

export function localizedMetadata(locale: LocaleCode, pageKey: LocalizedPageKey) {
  const page = localizedPages[locale][pageKey]
  const canonical = `https://www.fourtype.com${localizedPath(locale, pageKey)}`

  return {
    title: `${page.title} | FourType`,
    description: page.description,
    other: {
      'content-language': locale,
    },
    alternates: {
      canonical,
      languages: {
        en: `https://www.fourtype.com${pageAlternates[pageKey]}`,
        'zh-CN': `https://www.fourtype.com${localizedPath('zh-CN', pageKey)}`,
        es: `https://www.fourtype.com${localizedPath('es', pageKey)}`,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      type: 'website',
      locale: locale === 'zh-CN' ? 'zh_CN' : 'es_ES',
      images: [{ url: 'https://www.fourtype.com/og-image.jpg', width: 1280, height: 960, alt: page.title }],
    },
  }
}

export function LocalizedPage({ locale, pageKey }: Props) {
  const page = localizedPages[locale][pageKey]
  const localeInfo = localizedLocales[locale]
  const canonicalPath = localizedPath(locale, pageKey)
  const ctaHref = page.ctaHref === '/quiz' ? localizedPath(locale, 'quiz') : page.ctaHref
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `https://www.fourtype.com${canonicalPath}`,
    inLanguage: locale,
    isPartOf: { '@id': 'https://www.fourtype.com/#website' },
    publisher: { '@id': 'https://www.fourtype.com/#organization' },
    mainEntity: {
      '@type': 'WebApplication',
      '@id': 'https://www.fourtype.com/quiz#app',
    },
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale,
    mainEntity: page.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Navigation />
      <main className="min-h-screen bg-background pt-24">
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              {page.eyebrow}
            </p>
            <h1 className="mb-5 font-serif text-4xl font-bold text-foreground md:text-5xl">
              {page.title}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
              {page.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={ctaHref} className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                {page.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={pageAlternates[pageKey]} className="inline-flex items-center rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:border-primary/50">
                English
              </Link>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/30 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            {page.cards.map((card) => (
              <div key={card.title} className="rounded-lg border border-border bg-background/70 p-5">
                <h2 className="mb-2 font-serif text-xl font-bold text-foreground">{card.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-12">
            {page.sections.map((section) => (
              <section key={section.title} className="border-l-4 border-primary pl-6">
                <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">{section.title}</h2>
                <div className="space-y-4 text-muted-foreground">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="rounded-xl border border-border bg-secondary/30 p-6">
              <h2 className="mb-4 font-serif text-2xl font-bold text-foreground">
                {locale === 'zh-CN' ? '常见问题' : 'Preguntas frecuentes'}
              </h2>
              <div className="space-y-5">
                {page.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="mb-2 font-serif text-lg font-bold text-foreground">{item.question}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="rounded-xl border border-primary/30 bg-primary/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                {localeInfo.nativeLabel}
              </p>
              <p className="mt-2 text-muted-foreground">
                {locale === 'zh-CN'
                  ? '这是 FourType 多语言体验的第一阶段：中文入口、说明页面和搜索发现信号已经上线。'
                  : 'Esta es la primera fase de la experiencia multilingue de FourType: entrada, paginas explicativas y senales de descubrimiento en espanol.'}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
