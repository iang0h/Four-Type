import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Flame, Wind, Mountain, Droplets, BookOpen, Brain, Heart, Users, Sparkles, CheckCircle2 } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import RuneBackground from '@/components/RuneBackground'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'

export const metadata: Metadata = {
  title: 'What Is a Temperament Test? | Free 4 Temperament Personality Quiz',
  description: 'Discover what a temperament test is and how the 4 temperament types (Choleric, Sanguine, Melancholic, Phlegmatic) reveal your personality. Take our free 40-question temperament personality test.',
  keywords: [
    'temperament test', 'temperament personality test', 'four temperament types', '4 temperament test',
    'choleric sanguine melancholic phlegmatic', 'free personality test', 'personality quiz',
    'what is my temperament', 'temperament quiz', 'four humors test', 'hippocrates temperament',
    'personality type test', 'temperament assessment', 'free temperament test online',
  ],
  alternates: {
    canonical: 'https://www.fourtype.com/what-is-temperament-test',
  },
  openGraph: {
    title: 'What Is a Temperament Test? | Free Temperament Personality Quiz',
    description: 'Learn about the 4 temperament types and take our free 40-question quiz to discover if you are Choleric, Sanguine, Melancholic, or Phlegmatic.',
    url: 'https://www.fourtype.com/what-is-temperament-test',
    type: 'article',
    images: [
      {
        url: 'https://www.fourtype.com/og-image.png',
        width: 1672,
        height: 941,
        alt: 'FourType Temperament Test - Discover Your True Nature',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is a Temperament Test? | Free Quiz',
    description: 'Discover the 4 temperament types and take our free personality quiz.',
    images: ['https://www.fourtype.com/og-image.png'],
  },
}

const temperamentTypes = [
  {
    name: 'Choleric',
    title: 'The Commander',
    element: 'Fire',
    color: '#E63946',
    icon: Flame,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-vXB8vIN16kna1cGrklqseOHC3gASWk.png',
    traits: ['Natural leader', 'Decisive', 'Goal-oriented', 'Confident', 'Direct'],
    description: 'Cholerics are born leaders who thrive on challenge and achievement. They are decisive, ambitious, and results-driven, with a natural ability to take charge of situations.',
    link: '/temperament/choleric',
  },
  {
    name: 'Sanguine',
    title: 'The Bard',
    element: 'Air',
    color: '#FFD700',
    icon: Wind,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-euLHMUxeRi6LvSmqlycXvdRStXiMmI.png',
    traits: ['Enthusiastic', 'Optimistic', 'Social', 'Creative', 'Spontaneous'],
    description: 'Sanguines are the life of the party - outgoing, optimistic, and full of energy. They thrive on social interaction and bring enthusiasm to everything they do.',
    link: '/temperament/sanguine',
  },
  {
    name: 'Melancholic',
    title: 'The Strategist',
    element: 'Earth',
    color: '#4CC9F0',
    icon: Mountain,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-41w0Pxn7bABu8gSFUNO21vLrx42NVP.png',
    traits: ['Analytical', 'Detail-oriented', 'Thoughtful', 'Organized', 'Perfectionist'],
    description: 'Melancholics are deep thinkers who value accuracy and quality. They are analytical, organized, and bring depth and precision to their work.',
    link: '/temperament/melancholic',
  },
  {
    name: 'Phlegmatic',
    title: 'The Guardian',
    element: 'Water',
    color: '#52B788',
    icon: Droplets,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-zhzjVLCvu9ZK1JKMFkSwdcY4YCabE5.png',
    traits: ['Calm', 'Reliable', 'Patient', 'Diplomatic', 'Supportive'],
    description: 'Phlegmatics are the peacemakers - calm, steady, and dependable. They excel at maintaining harmony and providing consistent support to those around them.',
    link: '/temperament/phlegmatic',
  },
]

const benefits = [
  {
    icon: Brain,
    title: 'Self-Awareness',
    description: 'Understand why you think, feel, and act the way you do.',
  },
  {
    icon: Users,
    title: 'Better Relationships',
    description: 'Learn how to communicate and connect with different personality types.',
  },
  {
    icon: Heart,
    title: 'Personal Growth',
    description: 'Identify your strengths to leverage and weaknesses to develop.',
  },
  {
    icon: Sparkles,
    title: 'Career Clarity',
    description: 'Discover roles and environments where you naturally thrive.',
  },
]

export default function WhatIsTemperamentTestPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <RuneBackground />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Personality Science</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              What Is a{' '}
              <span className="bg-gradient-to-r from-[#FFD700] via-[#E63946] to-[#4CC9F0] bg-clip-text text-transparent">
                Temperament Test
              </span>
              ?
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed text-pretty">
              A temperament test is a personality assessment that identifies your core behavioral patterns based on the ancient 
              Four Temperaments model. Dating back to Hippocrates in 400 BC, this framework reveals whether you are primarily 
              Choleric, Sanguine, Melancholic, or Phlegmatic.
            </p>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
              Take the Free Test
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* What is Temperament Section */}
        <section className="relative py-20 lg:py-28 bg-card/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-invert prose-lg max-w-none">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Understanding the 4 Temperament Personality Test
              </h2>
              
              <p className="text-muted-foreground leading-relaxed">
                Unlike modern personality tests like the Myers-Briggs (MBTI) or Big Five, the temperament test focuses on your 
                <strong className="text-foreground"> innate behavioral tendencies</strong> - the patterns you were born with rather than 
                traits you&apos;ve developed over time. Your temperament influences how you respond to stress, interact with others, 
                make decisions, and pursue goals.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                The Four Temperaments model divides personalities into four distinct types, each associated with an element, 
                season, and set of core characteristics. Most people have a <strong className="text-foreground">primary temperament</strong> and 
                a <strong className="text-foreground">secondary temperament</strong>, creating 12 unique subtypes that provide even more 
                nuanced insights into your personality.
              </p>

              <h3 className="font-serif text-2xl font-bold text-foreground mt-12 mb-4">
                How Does a Temperament Test Work?
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                A temperament personality test presents you with a series of questions or scenarios designed to reveal your natural 
                preferences and tendencies. Our test uses 40 carefully crafted questions that measure your responses across four 
                dimensions, calculating your scores for each temperament type. The result is a detailed profile showing your 
                primary and secondary temperaments, along with your specific subtype.
              </p>
            </article>
          </div>
        </section>

        {/* The 4 Temperament Types */}
        <section className="relative py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                The 4 Temperament Types Explained
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Each temperament represents a unique pattern of thinking, feeling, and behaving. Discover the characteristics 
                of each type below.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {temperamentTypes.map((temp) => (
                <article
                  key={temp.name}
                  className="relative overflow-hidden rounded-2xl bg-card border border-border p-8 hover:border-primary/30 transition-colors"
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
                    style={{ backgroundColor: temp.color }}
                  />

                  <div className="relative flex gap-6">
                    {/* Character Image */}
                    <div className="shrink-0">
                      <div className="relative w-24 h-32">
                        <div 
                          className="absolute inset-0 rounded-full blur-2xl opacity-40"
                          style={{ backgroundColor: temp.color }}
                        />
                        <Image
                          src={temp.image}
                          alt={`${temp.name} temperament - ${temp.title}`}
                          fill
                          className="object-contain drop-shadow-xl"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <temp.icon className="w-5 h-5" style={{ color: temp.color }} />
                        <span 
                          className="text-sm font-semibold"
                          style={{ color: temp.color }}
                        >
                          {temp.element}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
                        {temp.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{temp.title}</p>

                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {temp.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {temp.traits.map((trait) => (
                          <span
                            key={trait}
                            className="px-2 py-1 text-xs rounded-full bg-secondary/50 text-foreground"
                          >
                            {trait}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={temp.link}
                        className="inline-flex items-center gap-1 text-sm font-medium hover:gap-2 transition-all"
                        style={{ color: temp.color }}
                      >
                        Learn more about {temp.name}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Take a Temperament Test */}
        <section className="relative py-20 lg:py-28 bg-card/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Why Study Temperaments?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Understanding your temperament unlocks powerful insights that can transform your life.
              </p>
            </div>

            {/* Video Section */}
            <div className="mb-16 w-full">
              <YouTubeEmbed videoId="MFi57x7BBXE" title="Why Study Temperaments - FourType" />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex gap-4 p-6 rounded-xl bg-card border border-border"
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-[#E63946]/10 to-[#4CC9F0]/10 border border-primary/20">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4 text-center">
                What Makes FourType Different?
              </h3>
              <ul className="space-y-3 max-w-2xl mx-auto">
                {[
                  '40 carefully crafted questions based on 2,500 years of temperament science',
                  'Identifies both your primary and secondary temperament for nuanced results',
                  'Reveals your unique subtype among 15 possible combinations',
                  'Completely free - no email required, no hidden paywalls',
                  'Beautiful, shareable results with personalized character illustrations',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 lg:py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Discover Your Temperament?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Take our free 40-question temperament test and uncover your true nature. No email required. 
              Results in under 10 minutes.
            </p>

            <Link
              href="/quiz"
              className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/30"
            >
              Start the Free Temperament Test
              <ArrowRight className="w-6 h-6" />
            </Link>

            <p className="text-sm text-muted-foreground mt-6">
              Join thousands who have discovered their temperament type
            </p>
          </div>
        </section>

        {/* FAQ Schema Section */}
        <section className="relative py-16 lg:py-20 bg-card/50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <details className="group p-6 rounded-xl bg-card border border-border">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  What is the difference between temperament and personality?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Temperament refers to your innate, biological tendencies - the patterns you were born with. Personality is broader 
                  and includes both temperament and learned behaviors shaped by your environment and experiences. Your temperament 
                  is the foundation upon which your personality is built.
                </p>
              </details>

              <details className="group p-6 rounded-xl bg-card border border-border">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  How accurate is a temperament test?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Temperament tests are highly accurate when answered honestly. The Four Temperaments model has been validated 
                  over 2,500 years of observation and correlates strongly with modern personality research. Our test uses 40 
                  questions to ensure reliable results.
                </p>
              </details>

              <details className="group p-6 rounded-xl bg-card border border-border">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  Can your temperament change over time?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground">
                  Your core temperament remains relatively stable throughout life, as it is rooted in your biological makeup. 
                  However, you can develop skills and behaviors that balance your natural tendencies. Understanding your temperament 
                  helps you work with your nature rather than against it.
                </p>
              </details>

              <details className="group p-6 rounded-xl bg-card border border-border">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex items-center justify-between">
                  What are the 12 temperament subtypes?
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </span>
                </summary>
                <p className="mt-4 text-muted-foreground">
                  The 12 subtypes are combinations of primary and secondary temperaments: Choleric-Sanguine, Choleric-Melancholic, 
                  Choleric-Phlegmatic, Sanguine-Choleric, Sanguine-Melancholic, Sanguine-Phlegmatic, Melancholic-Choleric, 
                  Melancholic-Sanguine, Melancholic-Phlegmatic, Phlegmatic-Choleric, Phlegmatic-Sanguine, and Phlegmatic-Melancholic. 
                  Plus three rare &quot;pure&quot; types with no secondary temperament.
                </p>
              </details>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'What Is a Temperament Test? Understanding the 4 Temperament Types',
            description: 'A comprehensive guide to temperament tests and the four temperament types: Choleric, Sanguine, Melancholic, and Phlegmatic.',
            image: 'https://www.fourtype.com/og-image.png',
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
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.fourtype.com/what-is-temperament-test',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the difference between temperament and personality?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Temperament refers to your innate, biological tendencies - the patterns you were born with. Personality is broader and includes both temperament and learned behaviors shaped by your environment and experiences. Your temperament is the foundation upon which your personality is built.',
                },
              },
              {
                '@type': 'Question',
                name: 'How accurate is a temperament test?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Temperament tests are highly accurate when answered honestly. The Four Temperaments model has been validated over 2,500 years of observation and correlates strongly with modern personality research.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can your temperament change over time?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your core temperament remains relatively stable throughout life, as it is rooted in your biological makeup. However, you can develop skills and behaviors that balance your natural tendencies.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are the 12 temperament subtypes?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The 12 subtypes are combinations of primary and secondary temperaments: Choleric-Sanguine, Choleric-Melancholic, Choleric-Phlegmatic, Sanguine-Choleric, Sanguine-Melancholic, Sanguine-Phlegmatic, Melancholic-Choleric, Melancholic-Sanguine, Melancholic-Phlegmatic, Phlegmatic-Choleric, Phlegmatic-Sanguine, and Phlegmatic-Melancholic.',
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
