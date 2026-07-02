import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, ChevronRight, Users, Target, Heart, Shield } from 'lucide-react'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Use Temperament for Better Leadership | FourType',
  description: 'Discover how each of the 4 temperaments approaches leadership. Learn your natural leadership style, your blind spots, and how to build a balanced team.',
  keywords: ['leadership styles', 'temperament leadership', 'team building', 'leadership personality', 'four temperaments management'],
  openGraph: {
    title: 'Temperament and Leadership | FourType',
    description: 'Discover how each temperament leads differently and build a balanced team.',
    type: 'article',
    images: [{ url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog%20images-YOx5j8T93i2oKsjJGl1c4WSMhtlLA5.jpg', width: 1200, height: 630, alt: 'Leadership and Temperament' }],
  },
  alternates: { canonical: '/blog/leadership-and-temperament' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'How to Use Temperament for Better Leadership',
  description: 'Discover how each of the 4 temperaments approaches leadership and build a balanced team.',
  image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog%20images-YOx5j8T93i2oKsjJGl1c4WSMhtlLA5.jpg',
  author: { '@type': 'Organization', name: 'FourType', url: 'https://www.fourtype.com' },
  publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: 'https://www.fourtype.com/fourtype-logo.png' } },
  datePublished: '2024-03-22',
  dateModified: '2024-03-22',
  mainEntityOfPage: 'https://www.fourtype.com/blog/leadership-and-temperament',
}

const leadershipStyles = [
  {
    temperament: 'Sanguine',
    title: 'The Inspirer',
    style: 'Inspirational',
    superpower: 'Motivating and energizing others',
    blindSpot: 'Follow-through and structure',
    color: '#FFD700',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png',
    icon: Heart,
    strengths: [
      'Rally teams with infectious optimism',
      'Build rapport quickly with anyone',
      'Generate ideas and see possibilities',
      'Create fun, high-energy work environments',
    ],
    blindSpots: [
      'Struggle to enforce accountability',
      'Start more initiatives than they finish',
      'May avoid hard conversations to keep things positive',
    ],
    growthTips: [
      'Pair with a detail-oriented second-in-command',
      'Build systems for follow-through',
      'Practice giving critical feedback',
    ],
  },
  {
    temperament: 'Choleric',
    title: 'The Commander',
    style: 'Commanding',
    superpower: 'Vision, decisiveness, and execution',
    blindSpot: 'Empathy and listening',
    color: '#E63946',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png',
    icon: Target,
    strengths: [
      'Set clear direction and hold the line',
      'Make decisions quickly, even in ambiguity',
      'Drive productivity and accountability',
      'Thrive under pressure',
    ],
    blindSpots: [
      'Dominate conversations and dismiss input',
      'Struggle to delegate and trust others',
      'Deliver feedback with unnecessary harshness',
    ],
    growthTips: [
      'Practice asking before telling',
      'Invest in listening skills',
      'Measure team health, not just output',
    ],
  },
  {
    temperament: 'Melancholic',
    title: 'The Architect',
    style: 'Systematic',
    superpower: 'Quality, planning, and precision',
    blindSpot: 'Decisive action under ambiguity',
    color: '#4CC9F0',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png',
    icon: Users,
    strengths: [
      'Build robust processes and systems',
      'Catch problems before they become crises',
      'Set and maintain high quality standards',
      'Lead by expertise and example',
    ],
    blindSpots: [
      'Struggle to make decisions when data is incomplete',
      'May micromanage to ensure quality',
      'Avoid taking visible leadership',
    ],
    growthTips: [
      'Set decision deadlines to prevent analysis paralysis',
      'Define "good enough" for each project',
      'Practice public leadership',
    ],
  },
  {
    temperament: 'Phlegmatic',
    title: 'The Steward',
    style: 'Servant',
    superpower: 'Team cohesion and mediation',
    blindSpot: 'Bold direction-setting',
    color: '#52B788',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png',
    icon: Shield,
    strengths: [
      'Build deep trust and team loyalty',
      'Mediate conflicts and find compromises',
      'Create stable, low-drama environments',
      'Support and develop people over time',
    ],
    blindSpots: [
      'Avoid making tough calls',
      'May be perceived as lacking ambition',
      'Slow to respond when urgency is required',
    ],
    growthTips: [
      'Practice stating your vision',
      'Set one bold goal per quarter',
      'Learn to have uncomfortable conversations early',
    ],
  },
]

export default function LeadershipBlogPage() {
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
              Leadership
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              6 min read
            </span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            How to Use Temperament for Better Leadership
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every leader has a default mode. Some charge in and take command. Others inspire through enthusiasm. 
            Some lead by building flawless systems. And some hold the team together so quietly that nobody notices 
            until they are gone.
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <p>
            These are not random differences — they are temperament at work. The four temperaments do not just shape 
            your personality — they shape your <strong>leadership style</strong>, your <strong>blind spots</strong>, 
            how you <strong>motivate others</strong>, and how you <strong>handle pressure</strong>.
          </p>

          <p>
            Understanding your temperament as a leader is not just nice to know — it is the difference between 
            leading naturally and leading effectively.
          </p>
        </div>

        {/* Leadership Styles Grid */}
        <div className="my-12 space-y-8">
          <h2 className="font-serif text-2xl font-bold text-foreground">The Four Leadership Styles</h2>
          
          {leadershipStyles.map((style) => (
            <div 
              key={style.temperament}
              className="relative overflow-hidden rounded-2xl bg-card border border-border"
              style={{ borderLeftColor: style.color, borderLeftWidth: '4px' }}
            >
              <div className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Character & Title */}
                  <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="relative w-24 h-32 mb-4">
                      <div 
                        className="absolute inset-0 rounded-full blur-2xl opacity-30"
                        style={{ backgroundColor: style.color }}
                      />
                      <Image
                        src={style.image}
                        alt={style.title}
                        fill
                        className="object-contain drop-shadow-xl"
                      />
                    </div>
                    <span 
                      className="text-xs font-semibold px-2 py-1 rounded-full mb-2"
                      style={{ backgroundColor: `${style.color}20`, color: style.color }}
                    >
                      {style.temperament}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {style.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{style.style} Leadership</p>
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-secondary/30">
                        <h4 className="text-sm font-semibold text-foreground mb-1">Superpower</h4>
                        <p className="text-sm text-muted-foreground">{style.superpower}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-secondary/30">
                        <h4 className="text-sm font-semibold text-foreground mb-1">Blind Spot</h4>
                        <p className="text-sm text-muted-foreground">{style.blindSpot}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Strengths</h4>
                      <ul className="space-y-1">
                        {style.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span style={{ color: style.color }}>+</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">Growth Path</h4>
                      <ul className="space-y-1">
                        {style.growthTips.map((tip, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: style.color }} />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="font-serif">Building a Balanced Leadership Team</h2>
          
          <p>
            The most effective leadership teams include all four temperaments:
          </p>

          <ul>
            <li><strong>The Sanguine</strong> generates energy, builds culture, and connects with people</li>
            <li><strong>The Choleric</strong> sets direction, makes hard decisions, and drives execution</li>
            <li><strong>The Melancholic</strong> builds systems, maintains quality, and catches blind spots</li>
            <li><strong>The Phlegmatic</strong> holds the team together, mediates conflict, and ensures psychological safety</li>
          </ul>

          <div className="not-prose my-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-foreground">
              <strong className="text-primary">The leadership trap:</strong> Most organizations over-promote Cholerics 
              (because they are visible and assertive) and under-promote Phlegmatics (because they are quiet and 
              accommodating). A balanced team requires intentionally recognizing and elevating all leadership styles.
            </p>
          </div>

          <h2 className="font-serif">Temperament-Aware Communication</h2>
          
          <p>
            How you motivate and communicate should flex based on their temperament, not yours:
          </p>
        </div>

        {/* Communication Table */}
        <div className="my-8 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Leading a...</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Do this</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Avoid this</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-[#FFD700] font-medium">Sanguine</td>
                <td className="py-3 px-4 text-muted-foreground">Give public recognition, variety, and social interaction</td>
                <td className="py-3 px-4 text-muted-foreground">Micromanaging, isolating them, or assigning repetitive tasks</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-[#E63946] font-medium">Choleric</td>
                <td className="py-3 px-4 text-muted-foreground">Give autonomy, clear goals, and challenge</td>
                <td className="py-3 px-4 text-muted-foreground">Withholding authority, being indecisive, or ignoring results</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 px-4 text-[#4CC9F0] font-medium">Melancholic</td>
                <td className="py-3 px-4 text-muted-foreground">Give clear expectations, private recognition, and time to plan</td>
                <td className="py-3 px-4 text-muted-foreground">Public criticism, chaotic changes, or rushing their process</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-[#52B788] font-medium">Phlegmatic</td>
                <td className="py-3 px-4 text-muted-foreground">Give stability, gentle encouragement, and advance notice</td>
                <td className="py-3 px-4 text-muted-foreground">Pressuring, confronting aggressively, or ignoring contributions</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="font-serif">Which temperament makes the best leader?</h2>
          
          <p>
            There is no single best temperament for leadership — it depends on the context. Cholerics excel in 
            turnaround situations. Sanguines excel in creative or sales-driven environments. Melancholics excel 
            where precision matters. Phlegmatics excel in people-intensive or service organizations.
          </p>

          <p>
            <strong>The best leaders understand their type and flex beyond it.</strong>
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-[#E63946]/10 border border-border text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
            Want to discover your leadership temperament?
          </h3>
          <p className="text-muted-foreground mb-6">
            Take our quiz and find out which style drives you.
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
