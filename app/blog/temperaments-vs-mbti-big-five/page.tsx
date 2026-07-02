import Link from 'next/link'
import { ArrowLeft, Clock, ChevronRight, Check, X } from 'lucide-react'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '4 Temperaments vs MBTI vs Big Five — How They Compare | FourType',
  description: 'A clear comparison of the 4 temperaments, Myers-Briggs (MBTI), Big Five, and DISC personality systems. Learn how they relate and which one is right for you.',
  keywords: ['MBTI vs temperaments', 'Big Five personality', 'DISC personality', 'personality test comparison', 'temperament types MBTI'],
  openGraph: {
    title: 'Temperaments vs MBTI vs Big Five | FourType',
    description: 'Compare the four temperaments with MBTI, Big Five, and DISC personality systems.',
    type: 'article',
  },
  alternates: { canonical: '/blog/temperaments-vs-mbti-big-five' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: '4 Temperaments vs MBTI vs Big Five — How They Compare',
  description: 'A clear comparison of the 4 temperaments, Myers-Briggs (MBTI), Big Five, and DISC personality systems.',
  image: 'https://www.fourtype.com/icon.png',
  author: { '@type': 'Organization', name: 'FourType', url: 'https://www.fourtype.com' },
  publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: 'https://www.fourtype.com/fourtype-logo.png' } },
  datePublished: '2024-03-23',
  dateModified: '2024-03-23',
  mainEntityOfPage: 'https://www.fourtype.com/blog/temperaments-vs-mbti-big-five',
}

const systems = [
  { name: '4 Temperaments', origin: 'Ancient Greece (c. 400 BC)', categories: '4 types + blends', basedOn: 'Behavioral drives & emotional patterns', bestFor: 'Quick self-understanding, relationships' },
  { name: 'MBTI', origin: '1940s (Myers & Briggs)', categories: '16 types', basedOn: 'Cognitive preferences (how you think)', bestFor: 'Career guidance, team building' },
  { name: 'Big Five (OCEAN)', origin: '1960s–1990s', categories: '5 trait spectrums', basedOn: 'Statistical analysis of language and behavior', bestFor: 'Research, clinical psychology' },
  { name: 'DISC', origin: '1928 (William Marston)', categories: '4 styles', basedOn: 'Behavioral response to environment', bestFor: 'Workplace communication' },
]

const mbtiMapping = [
  { temperament: 'Sanguine', keirsey: 'Artisan (SP)', types: 'ESTP, ESFP, ISTP, ISFP', color: '#FFD700' },
  { temperament: 'Choleric', keirsey: 'Rational (NT)', types: 'ENTJ, ENTP, INTJ, INTP', color: '#E63946' },
  { temperament: 'Melancholic', keirsey: 'Guardian (SJ)', types: 'ESTJ, ESFJ, ISTJ, ISFJ', color: '#4CC9F0' },
  { temperament: 'Phlegmatic', keirsey: 'Idealist (NF)', types: 'ENFJ, ENFP, INFJ, INFP', color: '#52B788' },
]

const bigFiveMapping = [
  { temperament: 'Sanguine', high: 'Extraversion, Openness', low: 'Conscientiousness, Neuroticism', color: '#FFD700' },
  { temperament: 'Choleric', high: 'Extraversion, Conscientiousness', low: 'Agreeableness, Neuroticism', color: '#E63946' },
  { temperament: 'Melancholic', high: 'Conscientiousness, Neuroticism', low: 'Extraversion', color: '#4CC9F0' },
  { temperament: 'Phlegmatic', high: 'Agreeableness', low: 'Extraversion, Neuroticism', color: '#52B788' },
]

const discMapping = [
  { temperament: 'Sanguine', disc: 'I (Influence)', traits: 'Social, enthusiastic, persuasive, optimistic', color: '#FFD700' },
  { temperament: 'Choleric', disc: 'D (Dominance)', traits: 'Decisive, goal-driven, direct, competitive', color: '#E63946' },
  { temperament: 'Melancholic', disc: 'C (Conscientiousness)', traits: 'Analytical, detail-oriented, quality-focused', color: '#4CC9F0' },
  { temperament: 'Phlegmatic', disc: 'S (Steadiness)', traits: 'Patient, reliable, team-oriented, conflict-avoidant', color: '#52B788' },
]

export default function ComparisonBlogPage() {
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
              Comparison
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              7 min read
            </span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            4 Temperaments vs MBTI vs Big Five — How They Compare
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            If you have ever taken a personality quiz, you have probably been sorted into a type — INFJ, Type A, 
            High D, Enneagram 4, or maybe even "Sanguine-Choleric." With so many personality systems out there, 
            it is natural to wonder: How do they all relate?
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <p>
            The answer is that most popular personality frameworks are <strong>distant cousins</strong> — they share 
            common ancestry in ancient temperament theory, but they have evolved in different directions. Understanding 
            how they connect gives you a richer, more nuanced picture of human personality than any single system can offer.
          </p>
        </div>

        {/* Quick Overview Table */}
        <div className="my-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Quick Overview: The Four Systems</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">System</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Origin</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Categories</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Best For</th>
                </tr>
              </thead>
              <tbody>
                {systems.map((sys) => (
                  <tr key={sys.name} className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-primary">{sys.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{sys.origin}</td>
                    <td className="py-3 px-4 text-muted-foreground">{sys.categories}</td>
                    <td className="py-3 px-4 text-muted-foreground">{sys.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="font-serif">MBTI (Myers-Briggs Type Indicator)</h2>
          
          <p>
            The MBTI sorts people into 16 personality types based on four preference dichotomies: 
            E/I (Extraversion vs. Introversion), S/N (Sensing vs. Intuition), T/F (Thinking vs. Feeling), 
            and J/P (Judging vs. Perceiving).
          </p>

          <h3 className="font-serif">How MBTI Maps to the 4 Temperaments</h3>
          
          <p>
            David Keirsey explicitly connected the two systems in Please Understand Me (1978):
          </p>
        </div>

        <div className="my-8 space-y-3">
          {mbtiMapping.map((item) => (
            <div 
              key={item.temperament}
              className="p-4 rounded-xl bg-card border border-border"
              style={{ borderLeftColor: item.color, borderLeftWidth: '4px' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="font-semibold text-foreground" style={{ color: item.color }}>{item.temperament}</span>
                <span className="hidden sm:block text-muted-foreground">=</span>
                <span className="text-muted-foreground">{item.keirsey}</span>
                <span className="hidden sm:block text-muted-foreground">-</span>
                <span className="text-sm text-muted-foreground">{item.types}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="not-prose my-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-foreground">
              <strong className="text-primary">Important caveat:</strong> Keirsey mapping is one interpretation, 
              and it is debated. The point is that the two systems are <em>related but not equivalent</em>.
            </p>
          </div>

          <h3 className="font-serif">Key Differences</h3>
          
          <ul>
            <li>MBTI focuses on <strong>how you think</strong> (cognitive functions). Temperaments focus on <strong>how you feel and act</strong> (behavioral drives).</li>
            <li>MBTI gives you 16 types — more granular. Temperaments give you 4 types (or 15 blends) — simpler and faster to apply.</li>
            <li>MBTI is better for understanding communication styles. Temperaments are better for understanding emotional patterns.</li>
          </ul>

          <h2 className="font-serif">Big Five (OCEAN Model)</h2>
          
          <p>
            The Big Five is the most scientifically validated personality model. It measures five independent trait spectrums:
            Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.
          </p>

          <h3 className="font-serif">How the Big Five Maps to the 4 Temperaments</h3>
        </div>

        <div className="my-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Temperament</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">High In</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Low In</th>
                </tr>
              </thead>
              <tbody>
                {bigFiveMapping.map((item) => (
                  <tr key={item.temperament} className="border-b border-border">
                    <td className="py-3 px-4 font-medium" style={{ color: item.color }}>{item.temperament}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.high}</td>
                    <td className="py-3 px-4 text-muted-foreground">{item.low}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="font-serif">DISC</h2>
          
          <p>
            DISC is a behavioral assessment widely used in workplaces. It measures four behavioral styles:
            Dominance, Influence, Steadiness, and Conscientiousness.
          </p>

          <h3 className="font-serif">How DISC Maps to the 4 Temperaments</h3>
          
          <p>
            This is the closest 1:1 mapping of any modern system:
          </p>
        </div>

        <div className="my-8 space-y-3">
          {discMapping.map((item) => (
            <div 
              key={item.temperament}
              className="p-4 rounded-xl bg-card border border-border"
              style={{ borderLeftColor: item.color, borderLeftWidth: '4px' }}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground" style={{ color: item.color }}>{item.temperament}</span>
                  <span className="text-muted-foreground">=</span>
                  <span className="font-medium text-foreground">{item.disc}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.traits}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <p>
            DISC is essentially a <strong>modernized, workplace-focused version</strong> of the four temperaments.
          </p>

          <h2 className="font-serif">Which System Should You Use?</h2>
          
          <p>The honest answer: it depends on what you need.</p>

          <ul>
            <li><strong>For quick self-understanding and relationship insight</strong> - Start with the 4 Temperaments. It is simple, intuitive, and gives you the fastest path to "aha."</li>
            <li><strong>For career guidance and team dynamics</strong> - Use MBTI or DISC. They are designed for professional settings.</li>
            <li><strong>For scientific rigor and nuance</strong> - Use the Big Five. It is the most validated and granular.</li>
            <li><strong>For the fullest picture</strong> - Use them together. They are complementary lenses, not competing ones.</li>
          </ul>

          <div className="not-prose my-8 p-6 rounded-xl bg-card border border-border">
            <p className="text-lg font-serif text-foreground mb-2">
              Think of it this way:
            </p>
            <p className="text-muted-foreground">
              The 4 temperaments are the <strong>foundation</strong>. MBTI, Big Five, and DISC are the 
              <strong> buildings constructed on that foundation</strong> — different architectures, but the same ground underneath.
            </p>
          </div>

          <h2 className="font-serif">FAQ</h2>

          <h3 className="font-serif">Are the 4 temperaments scientifically proven?</h3>
          <p>
            The original humoral theory (bodily fluids causing personality) is not supported by modern science. 
            However, the behavioral patterns described by the temperaments align well with established psychological 
            dimensions — particularly Extraversion and Neuroticism in the Big Five.
          </p>

          <h3 className="font-serif">Can I be a different type in different systems?</h3>
          <p>
            Yes — and that is normal. Each system measures something slightly different. You might be a Melancholic 
            (temperament), INTJ (MBTI), and score high on Conscientiousness and Neuroticism (Big Five). These are not 
            contradictions — they are different angles on the same person.
          </p>

          <h3 className="font-serif">Which personality test is the most accurate?</h3>
          <p>
            The Big Five has the strongest scientific validation. But "accurate" depends on what you are trying to 
            measure. For everyday self-understanding and relationship dynamics, the 4 temperaments are remarkably 
            useful despite being 2,500 years old.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-[#4CC9F0]/10 border border-border text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
            Want to know your temperament?
          </h3>
          <p className="text-muted-foreground mb-6">
            Take our quiz and discover your type.
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
