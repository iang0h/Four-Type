import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface BlogCTAProps {
  variant?: 'inline' | 'callout'
}

export default function BlogCTA({ variant = 'callout' }: BlogCTAProps) {
  if (variant === 'inline') {
    return (
      <div className="my-8 p-6 rounded-xl bg-primary/10 border border-primary/20">
        <p className="text-center text-foreground mb-4">
          Unsure of your temperament type?
        </p>
        <Link
          href="/quiz"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 w-full sm:w-auto"
          style={{
            backgroundColor: '#FFD700',
            color: '#1a1000',
          }}
        >
          Take the Free 40-Question Test
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-5 flex items-center justify-between">
        <div className="flex-1">
          <p className="font-semibold text-foreground mb-1">Ready to discover your temperament?</p>
          <p className="text-sm text-muted-foreground">
            Take our free 40-question temperament test to identify your type and 15 unique blends.
          </p>
        </div>
        <Link
          href="/quiz"
          className="ml-4 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 flex items-center gap-2 flex-shrink-0 whitespace-nowrap"
          style={{
            backgroundColor: '#FFD700',
            color: '#1a1000',
          }}
        >
          Begin Quiz
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
