import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { EditorialNote } from '@/components/EditorialNote'
import { TrustProof } from '@/components/TrustProof'
import { breadcrumbJsonLd, fourTypeAuthorRef, fourTypeOrganizationRef, fourTypeWebsiteRef } from '@/lib/seo-content'

export const metadata: Metadata = {
  title: 'About FourType: Creator, Methodology, and Responsible Use',
  description: 'Learn who created FourType, how the temperament test should be used, and why FourType separates ancient temperament language from clinical or hiring claims.',
  keywords: ['about FourType', 'FourType creator', 'temperament test methodology', 'responsible temperament test', 'Ian Goh FourType'],
  alternates: { canonical: 'https://www.fourtype.com/about' },
  openGraph: {
    title: 'About FourType: Creator, Methodology, and Responsible Use',
    description: 'FourType is a free temperament test and self-reflection project created by Ian Goh.',
    url: 'https://www.fourtype.com/about',
    type: 'article',
    images: [{ url: 'https://www.fourtype.com/og-image.png', width: 1672, height: 941, alt: 'FourType temperament test' }],
  },
}

const principles = [
  {
    title: 'Free result first',
    body: 'The core temperament result is available without forcing a signup, payment, or account before people know whether the quiz is useful.',
    icon: CheckCircle2,
  },
  {
    title: 'Practical self-reflection',
    body: 'FourType focuses on stress response, communication, work rhythm, relationships, blind spots, and growth moves people can actually use.',
    icon: Sparkles,
  },
  {
    title: 'Responsible limits',
    body: 'The test is educational. It is not a medical, psychiatric, clinical, hiring, or employment-screening assessment.',
    icon: ShieldCheck,
  },
  {
    title: 'Clear learning path',
    body: 'The site connects the quiz to subtype profiles, compatibility guides, methodology notes, comparison pages, and multilingual result pages.',
    icon: BookOpen,
  },
]

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.fourtype.com/about#page',
        url: 'https://www.fourtype.com/about',
        name: 'About FourType',
        description: metadata.description,
        isPartOf: fourTypeWebsiteRef,
        publisher: fourTypeOrganizationRef,
        author: fourTypeAuthorRef,
        about: [
          { '@type': 'Thing', name: 'Temperament test' },
          { '@type': 'Thing', name: 'Four temperaments' },
          { '@type': 'Thing', name: 'Self-reflection' },
        ],
      },
      breadcrumbJsonLd([
        { href: '/', title: 'FourType', description: 'FourType home' },
        { href: '/about', title: 'About FourType', description: 'Creator, methodology, and responsible use' },
      ]),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-4xl px-4 py-24 md:py-28">
          <div className="mb-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">About FourType</p>
            <h1 className="font-serif text-4xl font-bold text-balance md:text-5xl">
              A temperament test built for useful self-knowledge, not overclaiming.
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-muted-foreground">
              FourType is a personality media and self-reflection project created by Ian Goh. It reworks the classic
              Choleric, Sanguine, Melancholic, and Phlegmatic model into a free quiz, subtype profiles, shareable result
              cards, compatibility guides, and practical learning pages.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/quiz" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                Take the free quiz
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/methodology" className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 font-semibold transition-colors hover:border-primary/50 hover:text-primary">
                Read methodology
              </Link>
            </div>
          </div>

          <div className="mb-14 grid gap-4 md:grid-cols-2">
            {principles.map((item) => {
              const Icon = item.icon
              return (
                <section key={item.title} className="rounded-xl border border-border bg-secondary/20 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <h2 className="font-serif text-xl font-bold">{item.title}</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </section>
              )
            })}
          </div>

          <section className="mb-14 border-l-4 border-yellow-400 py-4 pl-6">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">Who created FourType?</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                FourType is created and maintained by Ian Goh, an independent builder focused on turning ideas into
                useful web products. The project grew from a simple temperament quiz into a larger learning platform
                because people wanted more than a label after finishing the test.
              </p>
              <p className="leading-relaxed">
                The site does not claim clinical authority. Its job is to give people clearer language for repeated
                behavior: how they move under pressure, what drains them, how they communicate, where relationships
                create friction, and what growth move may help next.
              </p>
            </div>
          </section>

          <section className="mb-14 border-l-4 border-blue-400 py-4 pl-6">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">How the content is written</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                FourType uses the four temperaments as practical pattern language. The content intentionally separates
                the ancient humor theory from modern personality science, and it avoids using temperament as a diagnosis
                or as a reason to make high-stakes decisions about other people.
              </p>
              <p className="leading-relaxed">
                Articles are written to answer the questions real users search for: which temperament test to take, how
                to read a score spread, how two types relate, how temperament affects work, and why a result can feel
                accurate without becoming a permanent identity box.
              </p>
            </div>
          </section>

          <div className="mb-14 space-y-6">
            <TrustProof variant="full" />
            <EditorialNote />
          </div>

          <section className="rounded-xl border border-border bg-secondary/30 p-8 text-center">
            <h2 className="font-serif text-2xl font-bold">Start with your own score spread</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              The guides make more sense once you can compare your Choleric, Sanguine, Melancholic, and Phlegmatic scores.
            </p>
            <Link href="/quiz" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Begin the quiz
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </section>
      </main>
      <Footer />
    </>
  )
}
