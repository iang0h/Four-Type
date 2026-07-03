import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'The 16 FourTypes You Never Knew Existed | FourType',
  description: 'Go beyond the 4 temperaments and discover the 16 FourTypes that make each person unique. Learn your blend\'s traits, strengths, risks, and growth path.',
  keywords: ['temperament blends', 'temperament subtypes', 'sanguine choleric blend', 'melancholic phlegmatic', 'personality combinations', '16 temperament patterns'],
  openGraph: {
    title: '16 FourTypes | FourType',
    description: 'Discover the 16 temperament patterns that make each person unique.',
    type: 'article',
  },
  alternates: { canonical: '/blog/subtypes' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'The 16 FourTypes You Never Knew Existed',
  description: 'Go beyond the 4 temperaments and discover the 16 FourTypes that make each person unique.',
  image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/make_better_202603241223-1XkEeb3BizSaXrANQ3lL5DNCWuTuNB.jpeg',
  author: { '@type': 'Organization', name: 'FourType', url: 'https://www.fourtype.com' },
  publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: 'https://www.fourtype.com/fourtype-logo.png' } },
  datePublished: '2024-03-24',
  dateModified: '2024-03-24',
  mainEntityOfPage: 'https://www.fourtype.com/blog/subtypes',
}

const subtypes = {
  sanguine: [
    { code: 'San-Chol', name: 'The Energizer', slug: 'sanguine-choleric', traits: 'Super-extroverted, explosive but brief emotions, speaks before thinking', strengths: 'Charming, decisive, creative, natural salesperson', risks: 'Can be obnoxious when threatened, hurtful without realizing' },
    { code: 'San-Mel', name: 'The Performer', slug: 'sanguine-melancholic', traits: 'Highly emotional, rapid mood swings, outgoing yet introspective', strengths: 'Creative depth with ability to communicate it', risks: 'Critical nature surfaces easily, prone to getting down' },
    { code: 'San-Phleg', name: 'The Charmer', slug: 'sanguine-phlegmatic', traits: 'Outgoing nature tempered by grace, warm and easygoing', strengths: 'Universally likeable, approachable, steady warmth', risks: 'May lack drive, avoids difficult conversations' },
  ],
  choleric: [
    { code: 'Chol-San', name: 'The Captain', slug: 'choleric-sanguine', traits: 'Driven by results with social charm, practical, forceful yet personable', strengths: 'Motivating leader, action-oriented, persuasive', risks: 'Impatient, win/lose mindset, can bulldoze relationships' },
    { code: 'Chol-Mel', name: 'The Strategist', slug: 'choleric-melancholic', traits: 'Analytical and decisive, visionary with attention to detail', strengths: 'Goal-oriented, creative, organized, high standards', risks: 'Perfectionistic, prone to overthinking, demanding' },
    { code: 'Chol-Phleg', name: 'The Diplomat', slug: 'choleric-phlegmatic', traits: 'Decisive yet calm, diplomatic, goal-driven but measured', strengths: 'Balanced leader, adaptable, empathetic yet effective', risks: 'May avoid confrontation despite strong opinions' },
  ],
  melancholic: [
    { code: 'Mel-San', name: 'The Artist', slug: 'melancholic-sanguine', traits: 'Emotional depth with outward expressiveness, idealistic yet sociable', strengths: 'Artistic vision with ability to share it', risks: 'Mood swings, torn between social needs and solitude' },
    { code: 'Mel-Chol', name: 'The Perfectionist-Driver', slug: 'melancholic-choleric', traits: 'Detail-oriented with drive, analytical and determined', strengths: 'Thorough, ambitious, disciplined, high-quality results', risks: 'Harsh self-critic, can be rigid, demands perfection' },
    { code: 'Mel-Phleg', name: 'The Philosopher', slug: 'melancholic-phlegmatic', traits: 'Most introverted blend, deeply appreciates art/literature/music', strengths: 'Deep self-understanding, thoughtful, perceptive', risks: 'Insecurity, struggles to connect, sees the negative' },
  ],
  phlegmatic: [
    { code: 'Phleg-San', name: 'The Buddy', slug: 'phlegmatic-sanguine', traits: 'Easy-going with social warmth, relaxed and friendly, quietly humorous', strengths: 'Likeable, cooperative, brings calm energy', risks: 'Can be too passive, avoids responsibility, lacks urgency' },
    { code: 'Phleg-Chol', name: 'The Quiet Commander', slug: 'phlegmatic-choleric', traits: 'Steady with hidden determination, diplomatic but firm when needed', strengths: 'Reliable under pressure, balanced judgment', risks: 'Stubbornness disguised as patience, slow to act' },
    { code: 'Phleg-Mel', name: 'The Gentle Soul', slug: 'phlegmatic-melancholic', traits: 'Quiet and thoughtful, gentle, people-focused introvert', strengths: 'Harmonious, careful, cooperative, deeply loyal', risks: 'Difficulty expressing opinions, paralyzed by perfectionism' },
  ],
}

const pureTypes = [
  { code: 'Pure Sanguine', slug: 'pure-sanguine', strengths: 'Magnetic personality, infectious enthusiasm, ultimate connector', risks: 'Extremely scattered, no balancing depth or drive, profoundly unreliable', color: '#FFD700' },
  { code: 'Pure Choleric', slug: 'pure-choleric', strengths: 'Unstoppable executor, fearless leader, peak productivity', risks: 'Ruthless, alienating, zero tolerance for weakness, burnout-prone', color: '#E63946' },
  { code: 'Pure Melancholic', slug: 'pure-melancholic', strengths: 'Genius-level insight, unmatched attention to detail, profound creativity', risks: 'Crippling perfectionism, social isolation, chronic dissatisfaction', color: '#4CC9F0' },
  { code: 'Pure Phlegmatic', slug: 'pure-phlegmatic', strengths: 'Ultimate peacemaker, unshakable calm, deeply reliable', risks: 'May lack initiative, avoids necessary conflict, too passive', color: '#52B788' },
]

const temperamentColors: Record<string, string> = {
  sanguine: '#FFD700',
  choleric: '#E63946',
  melancholic: '#4CC9F0',
  phlegmatic: '#52B788',
}

export default function SubtypesBlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
              Deep Dive
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              10 min read
            </span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            The 16 FourTypes You Never Knew Existed
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Most people who learn about the four temperaments have a moment of recognition: "That is me!" But then 
            comes a second thought: "Wait — I am not entirely that. There is something else mixed in."
          </p>
        </header>

        {/* Character Display */}
        <div className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-card to-[#52B788]/10 p-8">
          <div className="flex justify-center gap-6">
            {[
              { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png', color: '#FFD700' },
              { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png', color: '#E63946' },
              { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png', color: '#4CC9F0' },
              { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png', color: '#52B788' },
            ].map((char, i) => (
              <div key={i} className="relative w-20 h-28 sm:w-28 sm:h-40">
                <div 
                  className="absolute inset-0 rounded-full blur-2xl opacity-40"
                  style={{ backgroundColor: char.color }}
                />
                <Image
                  src={char.src}
                  alt=""
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <p>
            That is because you are almost certainly not a pure type. Most people are a <strong>blend of two 
            temperaments</strong> — a primary that dominates and a secondary that adds flavor, nuance, and sometimes 
            contradiction. These blends are called <strong>subtypes</strong>, and there are 15 of them.
          </p>

          <h2 className="font-serif">How Subtypes Work</h2>
          
          <p>
            Every person has all four temperaments to some degree, but two dominate:
          </p>

          <ul>
            <li><strong>Primary temperament:</strong> Your strongest, most visible set of traits. This is your default mode.</li>
            <li><strong>Secondary temperament:</strong> Modifies and colors your primary. Adds depth, tension, and complexity.</li>
          </ul>

          <div className="not-prose my-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-foreground">
              <strong className="text-primary">Key principle:</strong> Your primary temperament determines what drives you. 
              Your secondary temperament determines how that drive expresses.
            </p>
          </div>
        </div>

        {/* Subtypes by Category */}
        {Object.entries(subtypes).map(([category, items]) => (
          <div key={category} className="my-12">
            <h2 
              className="font-serif text-2xl font-bold mb-6 capitalize"
              style={{ color: temperamentColors[category] }}
            >
              The {category.charAt(0).toUpperCase() + category.slice(1)} Blends
            </h2>
            
            <div className="space-y-4">
              {items.map((subtype) => (
                <div 
                  key={subtype.code}
                  className="p-6 rounded-xl bg-card border border-border hover:border-opacity-50 transition-colors"
                  style={{ borderLeftColor: temperamentColors[category], borderLeftWidth: '4px' }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="text-xs font-semibold px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${temperamentColors[category]}20`, color: temperamentColors[category] }}
                        >
                          {subtype.code}
                        </span>
                        <span className="font-serif font-semibold text-foreground">{subtype.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{subtype.traits}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <span className="text-xs font-semibold text-green-400">Strengths</span>
                          <p className="text-sm text-muted-foreground">{subtype.strengths}</p>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-red-400">Risks</span>
                          <p className="text-sm text-muted-foreground">{subtype.risks}</p>
                        </div>
                      </div>
                      <Link
                        href={`/subtype/${subtype.slug}`}
                        className="inline-flex items-center gap-1 mt-4 text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: temperamentColors[category] }}
                      >
                        Learn more about {subtype.name}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Pure Types */}
        <div className="my-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">The Pure Types</h2>
          
          <div className="prose prose-invert prose-lg max-w-none mb-6">
            <p>
              Pure types occur when one temperament dominates with no strong secondary influence. They are less 
              common and represent the most concentrated expression of each temperament:
            </p>
          </div>
          
          <div className="space-y-4">
            {pureTypes.map((type) => (
              <div 
                key={type.code}
                className="p-6 rounded-xl bg-card border border-border"
                style={{ borderLeftColor: type.color, borderLeftWidth: '4px' }}
              >
                <h3 className="font-serif font-semibold text-foreground mb-3" style={{ color: type.color }}>
                  {type.code}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-xs font-semibold text-green-400">Strengths</span>
                    <p className="text-sm text-muted-foreground">{type.strengths}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-red-400">Risks</span>
                    <p className="text-sm text-muted-foreground">{type.risks}</p>
                  </div>
                </div>
                <Link
                  href={`/subtype/${type.slug}`}
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: type.color }}
                >
                  Learn more about {type.code}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="font-serif">How to Find Your Subtype</h2>
          
          <ol>
            <li><strong>Identify your primary:</strong> Which of the four temperaments describes your default behavior — how you act when relaxed and not performing?</li>
            <li><strong>Identify your secondary:</strong> Which temperament describes the second strongest pattern in your behavior?</li>
            <li><strong>Check the blend:</strong> Read the subtype description and see if it resonates. If not, you may have your primary and secondary reversed.</li>
          </ol>

          <div className="not-prose my-8 p-6 rounded-xl bg-card border border-border">
            <p className="text-foreground">
              <strong className="text-primary">Tip:</strong> Ask someone who knows you well. We often overidentify 
              with the temperament we wish we were rather than the one we actually live.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-[#52B788]/10 border border-border text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
            Want to pinpoint your exact blend?
          </h3>
          <p className="text-muted-foreground mb-6">
            Take our quiz and discover your subtype.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            Take the Quiz
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </main>
    <Footer />
    </>
  )
}
