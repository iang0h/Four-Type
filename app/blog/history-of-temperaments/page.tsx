import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'History of the 4 Temperaments: From Hippocrates to Modern Psychology | FourType',
  description: 'The complete history of the four temperaments — from ancient Greek medicine through Galen, Kant, Wundt, Steiner, Keirsey, and LaHaye. How a 2,500-year-old idea still shapes personality science today.',
  keywords: ['history of temperaments', 'four temperaments origin', 'Hippocrates temperaments', 'Galen personality', 'humoral theory', 'temperament history'],
  openGraph: {
    title: 'History of the 4 Temperaments | FourType',
    description: 'From Hippocrates to modern psychology — the complete 2,500-year history of temperament theory.',
    type: 'article',
  },
  alternates: { canonical: '/blog/history-of-temperaments' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'History of the 4 Temperaments: From Hippocrates to Modern Psychology',
  description: 'The complete history of the four temperaments from ancient Greek medicine through Galen, Kant, Wundt, and modern psychology.',
  image: 'https://www.fourtype.com/icon.png',
  author: { '@type': 'Organization', name: 'FourType', url: 'https://www.fourtype.com' },
  publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: 'https://www.fourtype.com/fourtype-logo.png' } },
  datePublished: '2024-03-20',
  dateModified: '2024-03-20',
  mainEntityOfPage: 'https://www.fourtype.com/blog/history-of-temperaments',
}

const timeline = [
  { era: 'c. 400 BC', figure: 'Hippocrates', contribution: 'Proposed the four bodily humors as the basis of health and personality' },
  { era: 'c. 190 AD', figure: 'Galen', contribution: 'Formalized four temperament types and recognized blends' },
  { era: 'Medieval era', figure: 'Islamic & European scholars', contribution: 'Preserved and expanded humoral theory across cultures' },
  { era: '1798', figure: 'Immanuel Kant', contribution: 'Separated temperament from biology — reframed as psychological' },
  { era: '1879', figure: 'Wilhelm Wundt', contribution: 'Placed temperaments on two scientific axes (emotionality × changeability)' },
  { era: '1909', figure: 'Rudolf Steiner', contribution: 'Integrated temperaments into Waldorf education pedagogy' },
  { era: '1947', figure: 'Hans Eysenck', contribution: 'Mapped temperaments onto Extraversion and Neuroticism dimensions' },
  { era: '1966', figure: 'Tim LaHaye', contribution: 'Popularized temperament blends for a mainstream audience' },
  { era: '1978', figure: 'David Keirsey', contribution: 'Connected temperaments to the Myers-Briggs 16-type system' },
  { era: 'Today', figure: 'Various', contribution: 'Temperaments inform DISC, coaching, education, and online quizzes' },
]

const relatedPosts = [
  { slug: 'temperaments-vs-mbti-big-five', title: '4 Temperaments vs MBTI vs Big Five', category: 'Comparison' },
  { slug: 'subtypes', title: 'The 16 FourTypes', category: 'Deep Dive' },
  { slug: 'leadership-and-temperament', title: 'Temperament and Leadership', category: 'Leadership' },
]

export default function HistoryBlogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-16">
      {/* Article Header */}
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
              History
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              8 min read
            </span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            History of the 4 Temperaments: From Hippocrates to Modern Psychology
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            The four temperaments are not a modern self-help invention. They are one of the oldest ideas in Western 
            intellectual history — a framework for understanding human personality that has survived, evolved, and 
            influenced virtually every personality system in use today.
          </p>
        </header>

        {/* Featured Image Area */}
        <div className="relative mb-12 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-card to-[#4CC9F0]/10 p-8">
          <div className="flex justify-center gap-4">
            {[
              { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png', color: '#FFD700' },
              { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png', color: '#E63946' },
              { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png', color: '#4CC9F0' },
              { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png', color: '#52B788' },
            ].map((char, i) => (
              <div key={i} className="relative w-24 h-32 sm:w-32 sm:h-44">
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

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="lead">
            From ancient Greek physicians to medieval scholars, from Enlightenment philosophers to 20th-century 
            psychologists, the four temperaments have been reinterpreted for every era. And they are still going.
          </p>

          <p>
            In this guide, we will trace the full arc — from Hippocrates to the modern day — showing how four 
            simple categories of human behavior have endured for over 2,500 years.
          </p>

          {/* Timeline Section */}
          <h2 className="font-serif">Timeline at a Glance</h2>
          
          <div className="not-prose my-8">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
              
              {timeline.map((item, i) => (
                <div key={i} className="relative pl-12 pb-8 last:pb-0">
                  {/* Timeline dot */}
                  <div className="absolute left-2 top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary" />
                  
                  <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-primary">{item.era}</span>
                      <span className="hidden sm:block text-muted-foreground">—</span>
                      <span className="text-sm font-medium text-foreground">{item.figure}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.contribution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h2 className="font-serif">Ancient Greece: Where It All Began</h2>

          <h3 className="font-serif">Empedocles and the Four Elements (c. 490–430 BC)</h3>
          <p>
            Before there were temperaments, there were elements. The Greek philosopher Empedocles proposed that all 
            matter was made up of four fundamental elements: earth, water, air, and fire. This idea of four basic 
            building blocks of nature became the philosophical foundation for everything that followed.
          </p>

          <h3 className="font-serif">Hippocrates and the Four Humors (c. 460���370 BC)</h3>
          <p>
            Hippocrates — often called the "father of medicine" — took Empedocles idea and applied it to the human 
            body. He proposed that health and personality were governed by the balance of four bodily fluids, 
            called humors:
          </p>

          <div className="not-prose my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { humor: 'Blood', element: 'Air', traits: 'Warm, moist, social, optimistic', color: '#FFD700' },
              { humor: 'Yellow Bile', element: 'Fire', traits: 'Warm, dry, ambitious, irritable', color: '#E63946' },
              { humor: 'Black Bile', element: 'Earth', traits: 'Cold, dry, analytical, melancholic', color: '#4CC9F0' },
              { humor: 'Phlegm', element: 'Water', traits: 'Cold, moist, calm, sluggish', color: '#52B788' },
            ].map((item) => (
              <div 
                key={item.humor}
                className="p-4 rounded-xl bg-card border border-border"
                style={{ borderLeftColor: item.color, borderLeftWidth: '3px' }}
              >
                <h4 className="font-serif font-semibold text-foreground mb-1">{item.humor}</h4>
                <p className="text-xs text-muted-foreground mb-2">Associated with {item.element}</p>
                <p className="text-sm text-muted-foreground">{item.traits}</p>
              </div>
            ))}
          </div>

          <p>
            When the humors were in balance, a person was healthy. When one dominated, it shaped both physical 
            health and personality. This humoral theory was a unified model of body and mind — something modern 
            medicine has only recently begun to re-explore through psychoneuroimmunology.
          </p>

          <h3 className="font-serif">Galen and the Four Temperaments (c. 129–216 AD)</h3>
          <p>
            The Roman physician Galen took Hippocrates humoral theory and formalized the connection between humor 
            dominance and personality type. He gave us the names we still use today: <strong>Sanguine</strong> (blood-dominant), 
            <strong>Choleric</strong> (yellow bile-dominant), <strong>Melancholic</strong> (black bile-dominant), and 
            <strong>Phlegmatic</strong> (phlegm-dominant).
          </p>

          <div className="not-prose my-8 p-6 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-foreground">
              <strong className="text-primary">Key insight:</strong> Crucially, Galen recognized that most people are 
              blends of two or more temperaments — not pure types. This insight was remarkably modern and anticipated 
              the trait-continuum models that would not arrive for another 1,700 years.
            </p>
          </div>

          <h2 className="font-serif">The Medieval Period: Preservation and Expansion</h2>

          <h3 className="font-serif">Islamic Golden Age (8th–14th centuries)</h3>
          <p>
            When much of European learning was lost during the early medieval period, Islamic scholars preserved and 
            expanded Greek medical knowledge. Physicians like Avicenna (The Canon of Medicine, c. 1025) refined humoral 
            theory and integrated it with their own observations. Avicenna work was used as a medical textbook in both 
            Islamic and European universities for centuries.
          </p>

          <h2 className="font-serif">The Enlightenment: Temperament Meets Philosophy</h2>

          <h3 className="font-serif">Immanuel Kant (1724–1804)</h3>
          <p>
            Kant made a pivotal distinction in his Anthropology From a Pragmatic Point of View (1798): he separated 
            <em>physical temperament</em> (bodily constitution) from <em>psychological temperament</em> (personality patterns). 
            For the first time, temperament was framed as a pattern of feeling and activity rather than a consequence of 
            fluid imbalances.
          </p>

          <h2 className="font-serif">The Birth of Modern Psychology</h2>

          <h3 className="font-serif">Wilhelm Wundt (1832–1920)</h3>
          <p>
            Wundt — widely regarded as the father of experimental psychology — completed Kant work by fully separating 
            temperament from body fluids. He placed the four temperaments on two independent, measurable axes:
          </p>

          <ul>
            <li><strong>Emotionality:</strong> How strongly and quickly do you react emotionally? (Strong vs. Weak)</li>
            <li><strong>Changeability:</strong> How quickly do your emotions and interests shift? (Changeable vs. Stable)</li>
          </ul>

          <p>
            This created a clean 2×2 matrix that anticipated the Big Five and every two-axis personality model that followed.
          </p>

          <h2 className="font-serif">The 20th Century: Temperament Goes Mainstream</h2>

          <h3 className="font-serif">Hans Eysenck (1916–1997)</h3>
          <p>
            British psychologist Eysenck explicitly connected the four temperaments to his own dimensional model of 
            personality in Dimensions of Personality (1947). He mapped them onto two factors: <strong>Extraversion</strong> 
            and <strong>Neuroticism</strong>. The four quadrants of Eysenck model correspond directly to the four 
            temperaments — and his work heavily influenced the Big Five (OCEAN) model that dominates academic psychology today.
          </p>

          <h3 className="font-serif">David Keirsey (1921–2013)</h3>
          <p>
            In Please Understand Me (1978), Keirsey bridged the ancient and the modern by mapping the four temperaments 
            onto the 16 Myers-Briggs personality types. His framework brought temperament theory into corporate training, 
            career counseling, and educational settings — contexts where it continues to thrive today.
          </p>

          <h2 className="font-serif">Today: The Temperaments in Modern Life</h2>

          <p>
            The four temperaments are alive and well in the 21st century, though they often go by different names:
          </p>

          <ul>
            <li>DISC (the dominant workplace behavioral assessment) maps almost 1:1 to the four temperaments</li>
            <li>Personality quizzes on social media frequently use temperament-based frameworks</li>
            <li>Coaching and therapy increasingly use temperament as a tool for self-understanding</li>
            <li>Education continues to apply temperament principles, especially in Waldorf and Montessori-influenced schools</li>
            <li>Neuroscience is exploring whether the temperaments map onto neurotransmitter profiles</li>
          </ul>

          <div className="not-prose my-8 p-6 rounded-xl bg-card border border-border">
            <p className="text-lg font-serif text-foreground mb-2">
              "The four temperaments have been called the most durable personality model in history."
            </p>
            <p className="text-sm text-muted-foreground">
              Whether they endure for another 2,500 years remains to be seen — but given their track record, it is a safe bet.
            </p>
          </div>

          <h2 className="font-serif">What is Next?</h2>
          <p>
            Now that you know the full history, explore the temperaments in practice. Take our quiz to discover your 
            type, or dive deeper into each temperament profile.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-[#4CC9F0]/10 border border-border text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
            Curious which temperament you are?
          </h3>
          <p className="text-muted-foreground mb-6">
            Take our quiz and discover your type — then you will know exactly where you fit in 2,500 years of history.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            Take the Quiz
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h3 className="font-serif text-xl font-bold text-foreground mb-6">Continue Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <span className="text-xs text-primary mb-2 block">{post.category}</span>
                <h4 className="font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
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
