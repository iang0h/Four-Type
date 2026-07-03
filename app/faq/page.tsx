'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Search, HelpCircle, Book, Users, Brain, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const faqCategories = [
  {
    id: 'basics',
    title: 'The Basics',
    icon: Book,
    color: '#FFD700',
    faqs: [
      {
        q: 'What are the four temperaments?',
        a: 'The four temperaments are Sanguine, Choleric, Melancholic, and Phlegmatic. They represent four fundamental patterns of personality that have been recognized for over 2,500 years. Each temperament describes a consistent way of thinking, feeling, and behaving that shapes how a person approaches life, relationships, and challenges.',
      },
      {
        q: 'Where did the four temperaments come from?',
        a: 'The four temperaments originated in ancient Greece with Hippocrates (c. 460–370 BC) and were formalized by the Roman physician Galen (c. 129–216 AD). Originally linked to bodily "humors" (blood, yellow bile, black bile, and phlegm), the concept was later refined by Kant, Wundt, Eysenck, and Keirsey into the psychological framework we use today.',
      },
      {
        q: 'Are the four temperaments scientifically proven?',
        a: 'The original humoral theory (bodily fluids causing personality) is not supported by modern science. However, the behavioral patterns described by the temperaments align remarkably well with established psychological dimensions — particularly Extraversion and Neuroticism in the Big Five model. Think of the temperaments as a practical, time-tested observation tool rather than a clinical diagnostic system.',
      },
      {
        q: 'How are temperaments different from personality?',
        a: 'Temperament is considered more innate and stable — the baseline patterns you were born with. Personality includes temperament plus the effects of upbringing, culture, experiences, and conscious choices. Your temperament is the raw material; your personality is what you have shaped from that material over time.',
      },
      {
        q: 'Can I have more than one temperament?',
        a: 'Yes! Most people are a blend of two temperaments — a primary that dominates and a secondary that adds nuance. These blends create 15 distinct subtypes (like San-Chol or Mel-Phleg). Pure types — people with only one dominant temperament — are relatively rare.',
      },
    ],
  },
  {
    id: 'types',
    title: 'The Four Types',
    icon: Users,
    color: '#E63946',
    faqs: [
      {
        q: 'What is the Sanguine temperament?',
        a: 'Sanguine (The Bard) is the most extraverted and socially energized temperament. Sanguines are optimistic, enthusiastic, talkative, and relationship-driven. They thrive on novelty, light up any room, and build rapport quickly. Their core drive is pleasure-seeking and social connection. Their challenge is follow-through and depth.',
      },
      {
        q: 'What is the Choleric temperament?',
        a: 'Choleric (The Commander) is the natural leader temperament — decisive, goal-oriented, and results-driven. Cholerics take charge, thrive under pressure, and are energized by challenge. Their core drive is achievement and control. Their challenge is empathy and patience with others.',
      },
      {
        q: 'What is the Melancholic temperament?',
        a: 'Melancholic (The Strategist) is the deep thinker — analytical, detail-oriented, and idealistic. Melancholics set high standards, find meaning in quality and order, and are the most introspective temperament. Their core drive is perfection and understanding. Their challenge is perfectionism and self-criticism.',
      },
      {
        q: 'What is the Phlegmatic temperament?',
        a: 'Phlegmatic (The Guardian) is the peacemaker — calm, steady, cooperative, and agreeable. Phlegmatics value harmony and stability above all. They are reliable, easy to get along with, and quietly effective. Their core drive is peace and security. Their challenge is initiative and assertiveness.',
      },
      {
        q: 'Which temperament is the rarest?',
        a: 'Choleric is generally considered the rarest temperament, estimated at roughly 10–15% of the population. This partly explains why Cholerics are disproportionately represented in leadership positions — there are fewer of them, but they naturally gravitate toward the top.',
      },
      {
        q: 'Which temperament is the most common?',
        a: 'Phlegmatic and Sanguine are generally considered the most common temperaments. Estimates vary, but together they may account for 50–60% of the population. Their social and cooperative natures make them well-suited to community life.',
      },
    ],
  },
  {
    id: 'subtypes',
    title: 'Subtypes & Blends',
    icon: Brain,
    color: '#4CC9F0',
    faqs: [
      {
        q: 'What are temperament subtypes?',
        a: 'FourType uses 16 personality patterns: 4 pure temperament patterns and 12 ordered blends. For example, a Sanguine-Choleric (San-Chol) is primarily social and fun-loving (Sanguine) but with a drive for results and action (Choleric). The subtype captures the nuance that makes each person unique.',
      },
      {
        q: 'How do I find my subtype?',
        a: 'Take our quiz! It scores you on all four temperaments independently. Your highest score is your primary, and your second-highest is your secondary. The blend of these two is your subtype. You can also reflect: Which temperament describes your default behavior? Which one adds flavor to that default?',
      },
      {
        q: 'What about three-way blends?',
        a: 'Some researchers acknowledge that people can have strong influences from three temperaments. In practice, most people have a clear primary and secondary, with the other two in the background. If you feel equally influenced by three, focus on situational patterns: Which one shows up most under stress?',
      },
      {
        q: 'Is there a Pure Phlegmatic subtype?',
        a: 'Yes. FourType uses the clean 16-pattern system: 4 core pure temperaments plus 12 ordered blends. Pure Phlegmatic is included as the fully steady Guardian pattern.',
      },
      {
        q: 'Can opposite temperaments blend?',
        a: 'Yes. Sanguine-Melancholic and Choleric-Phlegmatic are "opposite blends" that create more internal tension but also more psychological range. These individuals often feel like walking contradictions — highly creative but prone to mood swings (San-Mel) or quietly determined but conflict-avoidant (Chol-Phleg).',
      },
    ],
  },
  {
    id: 'practical',
    title: 'Practical Applications',
    icon: Sparkles,
    color: '#52B788',
    faqs: [
      {
        q: 'Can my temperament change over time?',
        a: 'Your core temperament is largely stable — it is considered part of your innate wiring. However, life experiences can strengthen your secondary temperament or help you develop skills associated with other types. What changes most is not your temperament but how you express and manage it.',
      },
      {
        q: 'How do temperaments affect relationships?',
        a: 'Temperaments shape communication styles, emotional needs, and conflict patterns. Classic complementary pairs are Sanguine-Melancholic (lightness + depth) and Choleric-Phlegmatic (drive + calm). Any pairing can work when both partners understand and respect each other\'s temperament needs.',
      },
      {
        q: 'How do temperaments affect leadership?',
        a: 'Each temperament leads differently: Sanguines inspire and motivate; Cholerics drive results and make tough calls; Melancholics build systems and ensure quality; Phlegmatics create harmony and mediate conflict. The best teams include all four styles.',
      },
      {
        q: 'How can I use temperament to communicate better?',
        a: 'Flex your communication to match their temperament: Be fun and personal with Sanguines. Be direct and results-focused with Cholerics. Be thorough and quality-conscious with Melancholics. Be patient and gentle with Phlegmatics. Speak their language, not just yours.',
      },
      {
        q: 'What is the growth edge for each temperament?',
        a: 'Each temperament has a natural area for development: Sanguines need discipline (follow-through and depth). Cholerics need empathy (listening and patience). Melancholics need action (shipping imperfect work and self-compassion). Phlegmatics need initiative (assertiveness and passion).',
      },
      {
        q: 'How do the four temperaments compare to MBTI?',
        a: 'David Keirsey mapped them: Sanguine ≈ Artisan (SP types), Choleric ≈ Rational (NT types), Melancholic ≈ Guardian (SJ types), Phlegmatic ≈ Idealist (NF types). The systems overlap but are not equivalent — MBTI focuses on how you think; temperaments focus on how you feel and act.',
      },
      {
        q: 'How do the four temperaments compare to DISC?',
        a: 'DISC maps almost 1:1: D (Dominance) = Choleric, I (Influence) = Sanguine, S (Steadiness) = Phlegmatic, C (Conscientiousness) = Melancholic. DISC is essentially a modernized, workplace-focused version of the four temperaments.',
      },
    ],
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('basics')
  const [expandedFaqs, setExpandedFaqs] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState('')

  const toggleFaq = (id: string) => {
    setExpandedFaqs(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const currentCategory = faqCategories.find(c => c.id === activeCategory)

  const filteredFaqs = searchQuery
    ? faqCategories.flatMap(cat => 
        cat.faqs
          .filter(faq => 
            faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(faq => ({ ...faq, category: cat.title, color: cat.color }))
      )
    : null

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Frequently Asked Questions</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Questions & Answers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about the four temperaments, subtypes, and how to apply this 
            ancient wisdom to modern life.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Search Results */}
        {filteredFaqs && (
          <div className="mb-12">
            <p className="text-sm text-muted-foreground mb-4">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-card border border-border overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(`search-${i}`)}
                    className="w-full flex items-start justify-between p-5 text-left"
                  >
                    <div className="flex-1 pr-4">
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block"
                        style={{ backgroundColor: `${faq.color}20`, color: faq.color }}
                      >
                        {faq.category}
                      </span>
                      <h3 className="font-medium text-foreground">{faq.q}</h3>
                    </div>
                    <ChevronDown className={cn(
                      "w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform",
                      expandedFaqs[`search-${i}`] && 'rotate-180'
                    )} />
                  </button>
                  {expandedFaqs[`search-${i}`] && (
                    <div className="px-5 pb-5 pt-0 animate-in fade-in slide-in-from-top-2">
                      <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No questions found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Category Navigation */}
        {!searchQuery && (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    activeCategory === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                  )}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.title}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            {currentCategory && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${currentCategory.color}20` }}
                  >
                    <currentCategory.icon className="w-5 h-5" style={{ color: currentCategory.color }} />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-foreground">{currentCategory.title}</h2>
                </div>

                {currentCategory.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/20 transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(`${currentCategory.id}-${i}`)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <h3 className="font-medium text-foreground pr-4">{faq.q}</h3>
                      <ChevronDown className={cn(
                        "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform",
                        expandedFaqs[`${currentCategory.id}-${i}`] && 'rotate-180'
                      )} />
                    </button>
                    {expandedFaqs[`${currentCategory.id}-${i}`] && (
                      <div className="px-5 pb-5 pt-0 animate-in fade-in slide-in-from-top-2">
                        <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-[#52B788]/10 border border-border text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Dive deeper into temperament theory with our comprehensive manifesto.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors"
            >
              Read the Manifesto
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
            >
              Take the Quiz
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  )
}
