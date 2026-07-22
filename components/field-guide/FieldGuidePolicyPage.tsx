import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function FieldGuidePolicyPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="field-guide-policy-page">
      <Navigation />
      <main id="main-content" className="field-guide-policy-main">
        <article className="field-guide-shell field-guide-policy-article">
          <p className="field-guide-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="field-guide-policy-updated">Effective 22 July 2026</p>
          {children}
          <Link className="field-guide-policy-back" href="/field-guide">
            <ArrowLeft aria-hidden="true" size={16} /> Return to the Field Guide
          </Link>
        </article>
      </main>
      <Footer />
    </div>
  )
}
