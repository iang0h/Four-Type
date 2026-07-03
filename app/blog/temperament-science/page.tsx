import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Brain } from 'lucide-react'
import Footer from '@/components/Footer'
import { LegacyBlogSeo } from '@/components/LegacyBlogSeo'
import Navigation from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'From Hippocrates to Brain Scans: The Science Behind Temperament | FourType',
  description: 'Explore the 2,400-year history of temperament theory. From ancient Greece to modern neuroscience, discover why temperament remains one of the most validated personality frameworks.',
  keywords: ['temperament science', 'temperament history', 'four humors', 'temperament neuroscience', 'temperament psychology'],
  openGraph: {
    title: 'From Hippocrates to Brain Scans: The Science of Temperament',
    description: 'Discover why temperament theory has endured for 2,400 years and what modern science reveals about personality types.',
    type: 'article',
    publishedTime: '2024-03-28',
    authors: ['FourType'],
  },
  alternates: { canonical: '/blog/temperament-science' },
}

export default function TemperamentSciencePage() {
  return (
    <>
      <LegacyBlogSeo
        title="From Hippocrates to Brain Scans: The Science Behind Temperament"
        description="Explore the scientific foundation of temperament theory across 2,400 years of research."
        path="/blog/temperament-science"
        published="2024-03-28"
      />
      <Navigation />
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Hero */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-purple-400" />
              <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Science</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              From Hippocrates to Brain Scans: The Science of Temperament
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For 2,400 years, temperament theory has survived, evolved, and been validated by modern science. Discover why this ancient framework remains one of psychology's most reliable personality systems.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-12 mb-16">
            {/* Ancient Origins */}
            <section className="border-l-4 border-purple-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Ancient Origins: 400 BCE - The Four Humors</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Hippocrates (460-370 BCE)</strong> observed that people seemed to fall into four distinct personality patterns. He theorized these were caused by four bodily "humors":
                </p>
                <div className="bg-purple-400/10 border border-purple-400/20 rounded-lg p-4 mb-4">
                  <ul className="text-sm space-y-2">
                    <li><strong>Sanguine:</strong> Excess blood → optimistic, energetic, social</li>
                    <li><strong>Choleric:</strong> Excess yellow bile → ambitious, decisive, hot-tempered</li>
                    <li><strong>Melancholic:</strong> Excess black bile → analytical, creative, prone to sadness</li>
                    <li><strong>Phlegmatic:</strong> Excess phlegm → calm, reliable, apathetic</li>
                  </ul>
                </div>
                <p>
                  The humor theory was scientifically wrong (we now know this isn't about actual bodily fluids), but Hippocrates correctly identified the underlying personality patterns that still hold today. This is remarkable—the categories were accurate even though the mechanism was wrong.
                </p>
              </div>
            </section>

            {/* Classical Validation */}
            <section className="border-l-4 border-purple-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Classical Period: 200 CE - Galen's Refinement</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Galen of Pergamon (129-200 CE)</strong> refined Hippocrates' theory, adding crucial distinctions: he recognized that temperament combined disposition (your natural tendencies) with constitution (how your body functions). This separation of nature from nurture was revolutionary.
                </p>
                <p>
                  Galen also documented that temperament affected health outcomes, mood stability, and life satisfaction. Medieval physicians used his work for 1,500 years, suggesting it had practical predictive value.
                </p>
              </div>
            </section>

            {/* Modern Psychology */}
            <section className="border-l-4 border-purple-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Modern Era: 1800s-1950s - Psychological Validation</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Immanuel Kant (1798)</strong> revived temperament theory with a psychological framework, noting the same four patterns in human behavior. <strong>Wilhelm Wundt (1874)</strong>, the founder of experimental psychology, created a 2×2 model matching temperament to emotional arousal dimensions.
                </p>
                <p>
                  <strong className="text-foreground">Ivan Pavlov (1920s)</strong> connected temperament to nervous system responsiveness. He showed that dogs (and by extension, humans) had innate differences in excitation and inhibition that matched the four temperament types. This was the first biological validation.
                </p>
                <p>
                  <strong className="text-foreground">Gordon Allport & Hans Eysenck (1930s-1960s)</strong> brought temperament into academic psychology. Eysenck's Introversion/Extraversion and Neuroticism dimensions directly mapped onto the four types. Allport's personality research confirmed distinct patterns that matched classical descriptions.
                </p>
              </div>
            </section>

            {/* Modern Neuroscience */}
            <section className="border-l-4 border-purple-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Neuroscience Era: 1990s-Present - Brain Imaging Validation</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Neurotransmitter Basis (1990s-2000s):</strong> Research revealed that different personality types have different baseline neurotransmitter levels:
                </p>
                <div className="bg-purple-400/10 border border-purple-400/20 rounded-lg p-4 mb-4">
                  <ul className="text-sm space-y-2">
                    <li><strong>Sanguine:</strong> Higher dopamine (reward-seeking, novelty-driven)</li>
                    <li><strong>Choleric:</strong> Higher adrenaline/cortisol reactivity (activation-dominant)</li>
                    <li><strong>Melancholic:</strong> Higher serotonin sensitivity (detail-focused, regulation-seeking)</li>
                    <li><strong>Phlegmatic:</strong> Lower arousal baseline (calm, resistant to stimulation)</li>
                  </ul>
                </div>
                <p>
                  <strong className="text-foreground">Brain Imaging Studies (2000s-Present):</strong> fMRI studies show that personality types have different patterns of brain activation:
                </p>
                <ul className="text-sm space-y-2 mt-3">
                  <li>• Extroverts (Sanguine/Choleric) show more activation in reward centers (ventromedial prefrontal cortex)</li>
                  <li>• Introverts (Melancholic/Phlegmatic) show more activation in frontal and temporal lobes (planning, analysis)</li>
                  <li>• High-anxiety types (Melancholic) show greater amygdala reactivity</li>
                  <li>• Sensation-seekers (Sanguine) show reduced reward-center activation to standard stimuli (they need more novelty)</li>
                </ul>
              </div>
            </section>

            {/* Modern Temperament Research */}
            <section className="border-l-4 border-purple-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">Contemporary Research: Why Temperament Endures</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Despite the rise of alternative frameworks like MBTI and Big Five, temperament remains valuable because:
                </p>
                <div className="space-y-3 mt-4">
                  <div>
                    <p className="font-semibold text-foreground mb-1">✓ Biological Foundation</p>
                    <p className="text-sm">Temperament is rooted in neurotransmitter systems and brain structure, not just learned behavior or cultural values.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">✓ High Stability</p>
                    <p className="text-sm">Temperament traits show remarkable stability from childhood through adulthood (unlike other personality models).</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">✓ Predictive Value</p>
                    <p className="text-sm">Temperament predicts life outcomes (job satisfaction, relationship compatibility, health, mental health) better than most alternatives.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">✓ Cross-Cultural Validity</p>
                    <p className="text-sm">The four temperament types appear consistently across cultures and have been observed for 2,400 years.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">✓ Therapeutic Application</p>
                    <p className="text-sm">Therapists and coaches increasingly use temperament-based approaches for anxiety, relationships, and career guidance.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* The 16-Pattern Advantage */}
            <section className="border-l-4 border-purple-400 pl-6 py-4">
              <h2 className="text-2xl font-serif font-bold mb-3">The FourType Innovation: Why 16 FourTypes Matter</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  While classical temperament theory recognized four pure types, it largely ignored blends. FourType recognizes that most people are blends—combinations of two temperament types in different orders.
                </p>
                <p>
                  <strong className="text-foreground">Scientific Basis:</strong> This aligns with modern temperament research showing that personality exists on continuous dimensions, not discrete categories. A Sanguine-Choleric is quantitatively different from a Choleric-Sanguine, just as a 65% extrovert is different from a 35% extrovert.
                </p>
                <p>
                  The 16-pattern system provides granular accuracy without losing the predictive power of classical temperament theory. You get both the biological validity of four temperaments AND the individual specificity needed for practical applications (coaching, hiring, relationship advice).
                </p>
              </div>
            </section>
          </div>

          {/* Key Takeaway */}
          <div className="mb-16 bg-secondary/30 border border-border rounded-xl p-8">
            <h3 className="text-2xl font-serif font-bold mb-4">Why This Matters for You</h3>
            <p className="text-muted-foreground leading-relaxed">
              Temperament isn't pseudoscience or pop psychology. It's a framework validated across 2,400 years of observation, classical scholarship, modern psychology, and cutting-edge neuroscience. When you take the FourType temperament test, you're using one of the oldest and most scientifically grounded personality systems available.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-secondary/30 border border-border rounded-xl p-8 text-center">
            <h3 className="text-2xl font-serif font-bold mb-3">Discover Your Type</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands who have taken the FourType temperament quiz.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
            >
              Take the Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related Articles */}
          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-serif font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/blog/temperaments-vs-mbti-big-five" className="group p-4 rounded-lg border border-border hover:border-purple-400/50 transition-colors">
                <p className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">Temperament vs. MBTI & Big Five</p>
                <p className="text-sm text-muted-foreground">How temperament compares to other personality frameworks</p>
              </Link>
              <Link href="/blog" className="group p-4 rounded-lg border border-border hover:border-purple-400/50 transition-colors">
                <p className="font-semibold mb-2 group-hover:text-purple-400 transition-colors">All Articles</p>
                <p className="text-sm text-muted-foreground">Explore the complete FourType educational library</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
