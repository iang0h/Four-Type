import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

type EditorialNoteProps = {
  className?: string
}

export function EditorialNote({ className = '' }: EditorialNoteProps) {
  return (
    <section className={`rounded-xl border border-border bg-card p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-full border border-primary/30 bg-primary/10 p-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Editorial note</p>
          <h2 className="mt-2 font-serif text-xl font-bold">Created for responsible self-reflection</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            FourType is created by Ian Goh as a personality media and self-reflection project. The content separates
            ancient temperament language from modern personality science and avoids clinical, hiring, or diagnostic claims.
          </p>
          <Link href="/methodology" className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
            See how FourType scores and interprets results
          </Link>
        </div>
      </div>
    </section>
  )
}
