import Link from 'next/link'
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronRight, KeyRound, Sparkles } from 'lucide-react'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'
import BookPreview, { BookPreviewProvider } from '@/components/field-guide/BookPreview'
import { CampaignCtaLink } from '@/components/field-guide/CampaignAnalytics'
import InteractiveBook from '@/components/field-guide/InteractiveBook'
import FieldGuidePolicyLinks from '@/components/field-guide/PolicyLinks'
import SupporterTiers from '@/components/field-guide/SupporterTiers'
import { getFieldGuidePolicies } from '@/lib/field-guide/policies'

const faqItems = [
  {
    question: 'What does each edition include?',
    answer:
      'Digital Edition includes the complete 144-page PDF, a reflowable EPUB and a personal-use licence. Founding Supporter also includes a separate printable worksheet pack and revisions released within Edition 1.',
  },
  {
    question: 'Is this a physical book?',
    answer: 'No. This is a digital product. Nothing is shipped.',
  },
  {
    question: 'What is the difference between PDF and EPUB?',
    answer: 'The PDF preserves the designed 7 x 10 page experience. The EPUB reflows for adjustable text and compatible reading apps.',
  },
  {
    question: 'When do I receive the book?',
    answer:
      'Immediately after Stripe confirms payment, you can open a private access page and download the files included with your edition.',
  },
  {
    question: 'How does re-access work?',
    answer:
      'Secure access links can expire. If you need the files again, request fresh access using the email address from checkout.',
  },
  {
    question: 'Can I share the files?',
    answer: 'The licence is for one reader. Personal use does not permit reposting or redistributing the files.',
  },
  {
    question: 'What do Edition 1 revisions mean?',
    answer: 'Founding Supporters receive revisions released within Edition 1. This does not include every future publication, a future Edition 2 or lifetime access to unrelated books.',
  },
  {
    question: 'What if I have a payment or download problem?',
    answer: 'Use the contact page below. Duplicate charges, damaged files and unresolved delivery problems are covered clearly in the refund policy.',
  },
]

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="field-guide-eyebrow">{children}</p>
}

export default function FieldGuideCampaign() {
  const policy = getFieldGuidePolicies()

  return (
    <div className="field-guide-page">
      <Navigation />
      <BookPreviewProvider>
        <main id="main-content" className="field-guide-campaign">
          <section className="field-guide-hero" aria-labelledby="field-guide-title">
            <div className="field-guide-shell field-guide-hero-grid">
              <div className="field-guide-hero-copy">
                <SectionEyebrow>FourType · The Field Guide</SectionEyebrow>
                <h1 id="field-guide-title">Read the room. Widen your range.</h1>
                <p className="field-guide-lede">
                  A practical, illustrated field guide for work, relationships, tension and repair.
                </p>
                <p className="field-guide-reward-bridge">
                  Learn how Choleric Commanders, Sanguine Bards, Melancholic Strategists and Phlegmatic Guardians notice a situation, what each pattern may miss, and how to choose a better next move.
                </p>
                <div className="field-guide-actions">
                  <CampaignCtaLink className="field-guide-button field-guide-button-primary" href="#supporter-levels" analyticsEvent={{ event: 'field-guide-hero-cta' }}>
                    Get the Field Guide · US$12 <ArrowDown aria-hidden="true" size={17} />
                  </CampaignCtaLink>
                  <CampaignCtaLink className="field-guide-button field-guide-button-secondary" href="#field-guide-preview" analyticsEvent={{ event: 'field-guide-hero-cta' }}>
                    Read sample spreads <ArrowRight aria-hidden="true" size={17} />
                  </CampaignCtaLink>
                </div>
                <p className="field-guide-reward-note">144 pages · PDF + reflowable EPUB · Download immediately after secure Stripe payment</p>
                <p className="field-guide-purchase-support">Every purchase supports the free FourType quiz and future lessons.</p>
              </div>

              <InteractiveBook />
            </div>
          </section>

          <section id="inside-the-guide" className="field-guide-inside" aria-labelledby="inside-title">
            <div className="field-guide-shell field-guide-inside-grid">
              <div className="field-guide-section-heading">
                <SectionEyebrow>A complete illustrated book</SectionEyebrow>
                <h2 id="inside-title">Theory you can use in the next real conversation.</h2>
                <p>The guide moves from the FourType map into work, close relationships, family life, stress, repair and deliberate practice.</p>
              </div>
              <ol className="field-guide-contents-list">
                <li>The FourType map and core method</li>
                <li>Four complete attention-pattern chapters</li>
                <li>Twelve directional cross-type blends</li>
                <li>Work, leadership, relationships and family</li>
                <li>Stress, conflict, care and repair</li>
                <li>Field exercises and writable worksheets</li>
                <li>Responsible use and historical lineage</li>
              </ol>
            </div>

            <div id="field-guide-preview" className="field-guide-shell field-guide-preview-wrap">
              <div className="field-guide-preview-heading">
                <div>
                  <SectionEyebrow>Read before you choose</SectionEyebrow>
                  <h3>Seven real spreads from the finished book.</h3>
                </div>
                <p>Open any spread to enlarge it. These are the actual pages, including worked cases, scenes and exercises.</p>
              </div>
              <BookPreview />
            </div>
          </section>

          <section id="supporter-levels" className="field-guide-support" aria-labelledby="support-title">
            <div className="field-guide-shell">
              <div className="field-guide-section-heading field-guide-pricing-heading">
                <SectionEyebrow>Choose your edition</SectionEyebrow>
                <h2 id="support-title">Start reading today.</h2>
                <p>Pay securely through Stripe. Download your PDF and EPUB immediately.</p>
              </div>
              <SupporterTiers />
              <div className="field-guide-purchase-assurances" aria-label="Purchase assurances">
                <span><Check aria-hidden="true" size={16} /> Secure Stripe Checkout</span>
                <span><Check aria-hidden="true" size={16} /> Immediate private downloads</span>
                <span><Check aria-hidden="true" size={16} /> Clear refund and re-access terms</span>
              </div>
            </div>
          </section>

          <section className="field-guide-reason" aria-labelledby="reason-title">
            <div className="field-guide-shell field-guide-reason-grid">
              <div className="field-guide-reason-statement">
                <SectionEyebrow>Why this guide exists</SectionEyebrow>
                <h2 id="reason-title">A useful pattern can still crowd out the room.</h2>
              </div>
              <div className="field-guide-prose">
                <p>A stalled meeting may need Choleric direction. It may also need Sanguine possibility, Melancholic evidence or Phlegmatic steadiness.</p>
                <p>The Field Guide helps you notice what is present, read what the situation needs and widen your response without turning a type into a fixed identity.</p>
              </div>
            </div>
          </section>

          <section className="field-guide-use" aria-labelledby="use-title">
            <div className="field-guide-shell">
              <SectionEyebrow>Keep it close when</SectionEyebrow>
              <h2 id="use-title">The room needs more than a quick label.</h2>
              <ol className="field-guide-moments">
                <li><span>01</span>A meeting has stalled.</li>
                <li><span>02</span>One useful contribution is crowding out the others.</li>
                <li><span>03</span>A conflict keeps repeating.</li>
                <li><span>04</span>A relationship needs a repair that both people can use.</li>
                <li><span>05</span>You want to replay an interaction more fairly.</li>
              </ol>
            </div>
          </section>

          <section className="field-guide-tools" aria-labelledby="tools-title">
            <div className="field-guide-shell field-guide-tools-grid">
              <div className="field-guide-section-heading">
                <SectionEyebrow>Practical theory</SectionEyebrow>
                <h2 id="tools-title">Notice the move. Read the room. Widen the choice.</h2>
                <p>Each idea comes with examples, reflection prompts and a way to try it in ordinary life.</p>
              </div>
              <div className="field-guide-tools-list">
                <article><h3>Notice / Read / Widen</h3><p>Start with what is happening, then ask what the situation needs that is not yet present.</p></article>
                <article><h3>Gift / Cost / Repair</h3><p>Hold a contribution and its trade-off together. Look for a repair instead of a verdict.</p></article>
                <article><h3>Directional blends</h3><p>See why Commander-Bard and Bard-Commander can use the same strengths in a different order.</p></article>
                <article><h3>Stress sequences</h3><p>Recognise what becomes louder under pressure and what helps another attention enter.</p></article>
                <article><h3>Five-minute replay</h3><p>Revisit one exchange, track what helped and what disappeared, then prepare a better next move.</p></article>
              </div>
            </div>
          </section>

          <section className="field-guide-fulfillment" aria-labelledby="fulfillment-title">
            <div className="field-guide-shell">
              <SectionEyebrow>Simple delivery</SectionEyebrow>
              <h2 id="fulfillment-title">From checkout to reading in three steps.</h2>
              <ol className="field-guide-steps field-guide-steps-three">
                <li><span>01</span><strong>Choose your edition.</strong><p>Digital Edition includes the PDF and EPUB. Founding Supporter adds the worksheet pack and Edition 1 revisions.</p></li>
                <li><span>02</span><strong>Pay securely through Stripe.</strong><p>Your payment details are handled by Stripe, not stored by FourType.</p></li>
                <li><span>03</span><strong>Download immediately.</strong><p>Open your private access page for the PDF, EPUB and any included worksheets.</p></li>
              </ol>
            </div>
          </section>

          <section className="field-guide-boundary" aria-labelledby="boundary-title">
            <div className="field-guide-shell field-guide-boundary-grid">
              <KeyRound aria-hidden="true" size={34} />
              <div>
                <SectionEyebrow>Responsible use</SectionEyebrow>
                <h2 id="boundary-title">A reflective framework, not a way to sort people.</h2>
                <p>FourType is a reflective framework. It should not be used to diagnose, rank, hire, exclude or permanently label people.</p>
              </div>
            </div>
          </section>

          <section className="field-guide-faq" aria-labelledby="faq-title">
            <div className="field-guide-shell field-guide-faq-grid">
              <div>
                <SectionEyebrow>Before checkout</SectionEyebrow>
                <h2 id="faq-title">Clear answers and clear terms.</h2>
                <p>Know what you receive, how access works and where to get help before you pay.</p>
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
            <div className="field-guide-shell">
              <FieldGuidePolicyLinks policies={policy} />
            </div>
          </section>

          <section className="field-guide-final" aria-labelledby="final-title">
            <div className="field-guide-shell">
              <BookOpen aria-hidden="true" size={24} />
              <h2 id="final-title">Keep your nature. Widen your choices.</h2>
              <p>Read the finished guide, use one idea in a real room and return when the next conversation asks more of you.</p>
              <div className="field-guide-actions">
                <a className="field-guide-button field-guide-button-primary" href="#supporter-levels">Get the Field Guide · US$12 <ArrowDown aria-hidden="true" size={17} /></a>
                <Link className="field-guide-text-link" href="/quiz">Take the free quiz <ArrowRight aria-hidden="true" size={16} /></Link>
              </div>
              <p className="field-guide-purchase-support"><Sparkles aria-hidden="true" size={14} /> Every purchase supports the free FourType quiz and future lessons.</p>
            </div>
          </section>
        </main>
      </BookPreviewProvider>
      <Footer />
    </div>
  )
}
