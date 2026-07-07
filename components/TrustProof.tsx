import Link from 'next/link'
import { BarChart3, CheckCircle2, Mail, ShieldCheck, Sparkles, Users } from 'lucide-react'

type TrustProofProps = {
  variant?: 'compact' | 'full'
  className?: string
}

const proofItems = [
  { label: 'Free core result', body: 'Take the quiz and see your result without paying first.', icon: CheckCircle2 },
  { label: 'No signup required', body: 'Email is optional and appears only after the free result.', icon: Mail },
  { label: '40 behavior questions', body: 'Questions focus on repeated behavior, pressure, motivation, and communication.', icon: Sparkles },
  { label: 'Score spread', body: 'See all four temperament scores instead of only a flat label.', icon: BarChart3 },
  { label: '15 FourType blends', body: 'Use primary and secondary patterns to understand subtype direction.', icon: Users },
  { label: 'Responsible limits', body: 'FourType is for self-reflection, not diagnosis or hiring decisions.', icon: ShieldCheck },
]

export function TrustProof({ variant = 'full', className = '' }: TrustProofProps) {
  const visibleItems = variant === 'compact' ? proofItems.slice(0, 4) : proofItems

  return (
    <section className={`rounded-xl border border-border bg-secondary/20 p-5 md:p-6 ${className}`}>
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Why FourType</p>
          <h2 className="mt-2 font-serif text-2xl font-bold">A practical temperament test, not a black box</h2>
        </div>
        <Link href="/methodology" className="text-sm font-semibold text-primary hover:underline">
          Read methodology
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {visibleItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-lg border border-border bg-background/60 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <h3 className="font-serif text-base font-bold">{item.label}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          )
        })}
      </div>
      {variant === 'full' && (
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          More than 50,000 people have taken FourType. The result is designed to start better self-understanding,
          not to replace professional psychological, medical, or employment guidance.
        </p>
      )}
    </section>
  )
}
