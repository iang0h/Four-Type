import Link from 'next/link'
import { ArrowDown, ArrowRight, ChevronRight, KeyRound, Sparkles } from 'lucide-react'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import BookPreview, { BookPreviewProvider } from '@/components/field-guide/BookPreview'
import { CampaignCtaLink } from '@/components/field-guide/CampaignAnalytics'
import FourTypeCompass from '@/components/field-guide/FourTypeCompass'
import InteractiveBook from '@/components/field-guide/InteractiveBook'
import SupporterTiers from '@/components/field-guide/SupporterTiers'

const faqItems = [
  {
    question: 'What does each supporter level include?',
    answer: 'Field Guide Supporter includes the complete 144-page PDF, a reflowable EPUB and a personal-use license. Founding Supporter also includes a separate printable worksheet pack and revised files released within Edition 1.',
  },
  {
    question: 'Is this a physical book?',
    answer: 'No. Both supporter levels are digital rewards. Nothing is shipped.',
  },
  {
    question: 'What is the difference between PDF and EPUB?',
    answer: 'The PDF preserves the illustrated page layout. The EPUB is reflowable, so its text can adapt on compatible reading apps and devices.',
  },
  {
    question: 'How do secure downloads and re-access work?',
    answer: 'After payment is verified, supporters open a private access page for the files included with their level. A secure access link can be requested again when email delivery is configured.',
  },
  {
    question: 'Can I share the files?',
    answer: 'The rewards are for personal use. Please do not share, resell or distribute the files.',
  },
  {
    question: 'What do future revisions of Edition 1 mean?',
    answer: 'Founding Supporters receive revised files that are released within Edition 1. It does not include every future book, a future Edition 2, lifetime support or a publication schedule.',
  },
  {
    question: 'Is support tax-deductible?',
    answer: 'No. This is an independent-publishing supporter reward, not charitable support.',
  },
  {
    question: 'Where can I find refund details or get in touch?',
    answer: 'Refund and contact routes are being configured before checkout opens. This campaign page does not point to unfinished policy or contact links.',
  },
]

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="field-guide-eyebrow">{children}</p>
}

export default function FieldGuideCampaign() {
  return (
    <div className="field-guide-page">
      <Navigation />
      <BookPreviewProvider>
      <main id="main-content" className="field-guide-campaign">
        <section className="field-guide-hero" aria-labelledby="field-guide-title">
          <div className="field-guide-shell field-guide-hero-grid">
            <div className="field-guide-hero-copy">
              <SectionEyebrow>Support the next chapter of FourType</SectionEyebrow>
              <h1 id="field-guide-title">Help more people read the room.</h1>
              <p className="field-guide-lede">
                FourType turns recurring patterns of direction, energy, clarity and steadiness into practical language people can use at work, at home and in moments of tension.
              </p>
              <p className="field-guide-reward-bridge">
                Support the project and receive the complete illustrated Field Guide as your digital reward.
              </p>
              <div className="field-guide-actions">
                <CampaignCtaLink className="field-guide-button field-guide-button-primary" href="#supporter-levels" analyticsEvent={{ event: 'field-guide-hero-cta' }}>
                  Become a supporter <ArrowDown aria-hidden="true" size={17} />
                </CampaignCtaLink>
                <CampaignCtaLink className="field-guide-button field-guide-button-secondary" href="#inside-the-guide" analyticsEvent={{ event: 'field-guide-hero-cta' }}>
                  Preview the Field Guide <ArrowRight aria-hidden="true" size={17} />
                </CampaignCtaLink>
              </div>
              <p className="field-guide-reward-note">From US$12 / RM39 · 144-page PDF + reflowable EPUB · Secure digital access</p>
            </div>

            <InteractiveBook />
          </div>
        </section>

        <section className="field-guide-mission" aria-labelledby="mission-title">
          <div className="field-guide-shell field-guide-mission-grid">
            <div>
              <SectionEyebrow>Why support FourType</SectionEyebrow>
              <h2 id="mission-title">Keep practical self-knowledge free to begin.</h2>
            </div>
            <div className="field-guide-prose">
              <p>
                The core quiz stays free. Support helps FourType continue making accessible guides, visual lessons, videos and practical tools for people who want a better way to notice what is happening between them.
              </p>
              <p>
                It also keeps the work grounded in a simple idea: people are not permanent kinds. A contribution can help, crowd out or need repair depending on the situation.
              </p>
            </div>
          </div>
          <div className="field-guide-shell field-guide-mission-notes" aria-label="What supporter work makes possible">
            <p><strong>Learn</strong> Clearer language for recurring attention patterns.</p>
            <p><strong>Apply</strong> Useful ways to work with tension, meetings and relationships.</p>
            <p><strong>Create</strong> More illustrated lessons and accessible formats.</p>
            <p><strong>Keep open</strong> A free quiz that anyone can begin.</p>
          </div>
        </section>

        <section className="field-guide-model" aria-labelledby="model-title">
          <div className="field-guide-shell">
            <div className="field-guide-section-heading">
              <SectionEyebrow>The central FourType idea</SectionEyebrow>
              <h2 id="model-title">Four useful attentions. No fixed identity required.</h2>
              <p>Each pattern names a useful contribution, what it may crowd out and a question that can widen the response.</p>
            </div>
            <FourTypeCompass />
            <p className="field-guide-model-note">FourType is a lens for reflection and conversation, not a scorecard for people.</p>
          </div>
        </section>

        <section className="field-guide-reason" aria-labelledby="reason-title">
          <div className="field-guide-shell field-guide-reason-grid">
            <div className="field-guide-reason-statement">
              <SectionEyebrow>Why the Field Guide exists</SectionEyebrow>
              <h2 id="reason-title">The same move can help or cost, depending on the room.</h2>
            </div>
            <div className="field-guide-prose">
              <p>A stalled meeting may need more direction. It may also need a pause for evidence, an invitation to quieter voices or enough steadiness to name the real concern.</p>
              <p>The Field Guide treats timing, condition, capacity and consent as part of the question. It helps people replay moments more fairly, notice what is crowded out and find a repair that fits.</p>
            </div>
          </div>
        </section>

        <section id="inside-the-guide" className="field-guide-inside" aria-labelledby="inside-title">
          <div className="field-guide-shell field-guide-inside-grid">
            <div className="field-guide-section-heading">
              <SectionEyebrow>Inside the Field Guide</SectionEyebrow>
              <h2 id="inside-title">A working reference for real rooms.</h2>
              <p>Built for reading through, returning to and putting beside the next conversation.</p>
            </div>
            <ol className="field-guide-contents-list">
              <li>The FourType Map and core method</li>
              <li>The four attention patterns</li>
              <li>Directional blends</li>
              <li>Stress and repair</li>
              <li>FourType in real life</li>
              <li>Field practice and worksheets</li>
              <li>Responsible use and historical lineage</li>
            </ol>
          </div>

          <div className="field-guide-shell field-guide-preview-wrap">
            <div className="field-guide-preview-heading">
              <div>
                <SectionEyebrow>Selected pages</SectionEyebrow>
                <h3>Open the guide where the work happens.</h3>
              </div>
              <p>Eight approved preview pages at web resolution. Full reward files remain private.</p>
            </div>
            <BookPreview />
          </div>
        </section>

        <section className="field-guide-use" aria-labelledby="use-title">
          <div className="field-guide-shell">
            <SectionEyebrow>Use it when</SectionEyebrow>
            <h2 id="use-title">The room needs more than a quick label.</h2>
            <ol className="field-guide-moments">
              <li><span>01</span>A meeting has stalled.</li>
              <li><span>02</span>One contribution is crowding out the others.</li>
              <li><span>03</span>A conflict keeps repeating.</li>
              <li><span>04</span>A team needs to widen its response.</li>
              <li><span>05</span>You want to replay an interaction more fairly.</li>
            </ol>
          </div>
        </section>

        <section className="field-guide-tools" aria-labelledby="tools-title">
          <div className="field-guide-shell field-guide-tools-grid">
            <div className="field-guide-section-heading">
              <SectionEyebrow>Practical tools</SectionEyebrow>
              <h2 id="tools-title">Notice the move. Read the room. Widen the choice.</h2>
              <p>The guide gives names to familiar moments so they can become workable.</p>
            </div>
            <div className="field-guide-tools-list">
              <article><h3>Notice / Read / Widen</h3><p>Start with what is happening, then ask what the situation needs that is not yet present.</p></article>
              <article><h3>Gift / Cost / Repair</h3><p>Hold a contribution and its trade-off together. Then look for a repair instead of a verdict.</p></article>
              <article><h3>Crowding out</h3><p>When one useful attention fills the room, name the missing one without turning anyone into the problem.</p></article>
              <article><h3>Volume modulation</h3><p>Sometimes the next move is not a different trait. It is turning an existing contribution up, down or toward a better moment.</p></article>
              <article><h3>Five-minute replay</h3><p>Revisit a short exchange, track the gifts and costs, then try one widening question before the next conversation.</p></article>
            </div>
          </div>
        </section>

        <section id="supporter-levels" className="field-guide-support" aria-labelledby="support-title">
          <div className="field-guide-shell">
            <div className="field-guide-section-heading">
              <SectionEyebrow>Supporter levels</SectionEyebrow>
              <h2 id="support-title">Choose the version of support that fits.</h2>
              <p>Both are digital supporter rewards. No physical product is shipped.</p>
            </div>

            <SupporterTiers />
          </div>
        </section>

        <section className="field-guide-fulfillment" aria-labelledby="fulfillment-title">
          <div className="field-guide-shell">
            <SectionEyebrow>How it works</SectionEyebrow>
            <h2 id="fulfillment-title">Four clear steps from support to reading.</h2>
            <ol className="field-guide-steps">
              <li><span>01</span><strong>Choose a supporter level.</strong><p>Pick the Field Guide or Founding level and an explicit currency.</p></li>
              <li><span>02</span><strong>Complete secure Stripe Checkout.</strong><p>Checkout happens through Stripe when the supporter flow opens.</p></li>
              <li><span>03</span><strong>Payment is verified on the server.</strong><p>The reward only becomes available after a paid session is confirmed.</p></li>
              <li><span>04</span><strong>Open your private access page.</strong><p>Download the PDF, EPUB and any included worksheet pack there.</p></li>
            </ol>
          </div>
        </section>

        <section className="field-guide-boundary" aria-labelledby="boundary-title">
          <div className="field-guide-shell field-guide-boundary-grid">
            <KeyRound aria-hidden="true" size={34} />
            <div>
              <SectionEyebrow>Responsible use</SectionEyebrow>
              <h2 id="boundary-title">A framework for reflection, not a way to sort people.</h2>
              <p>FourType is a reflective framework. It should not be used to diagnose, rank, hire, exclude or permanently label people.</p>
            </div>
          </div>
        </section>

        <section className="field-guide-faq" aria-labelledby="faq-title">
          <div className="field-guide-shell field-guide-faq-grid">
            <div>
              <SectionEyebrow>Questions</SectionEyebrow>
              <h2 id="faq-title">A few practical details.</h2>
              <p>Clear expectations make a supporter campaign easier to join.</p>
            </div>
            <div className="field-guide-faq-list">
              {faqItems.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}<ChevronRight aria-hidden="true" size={18} /></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="field-guide-final" aria-labelledby="final-title">
          <div className="field-guide-shell">
            <Sparkles aria-hidden="true" size={24} />
            <h2 id="final-title">Keep your nature. Widen your choices.</h2>
            <p>Support the work, receive the Field Guide and keep the next conversation a little more open.</p>
            <div className="field-guide-actions">
              <a className="field-guide-button field-guide-button-primary" href="#supporter-levels">Become a supporter <ArrowDown aria-hidden="true" size={17} /></a>
              <Link className="field-guide-text-link" href="/quiz">Take the free quiz <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
          </div>
        </section>
      </main>
      </BookPreviewProvider>
      <Footer />
    </div>
  )
}
