import { accentStyles, type ContentBlock } from '@/lib/seo-content'

export function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-12 mb-16">
      {blocks.map((block) => {
        if (block.type === 'grid') {
          return (
            <section key={block.title} className="py-2">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">{block.title}</h2>
              {block.intro && <p className="text-muted-foreground mb-6 leading-relaxed">{block.intro}</p>}
              <div className="grid md:grid-cols-2 gap-4">
                {block.items.map((item) => {
                  const accent = accentStyles[item.accent ?? 'gold']
                  return (
                    <div key={item.title} className={`rounded-xl border p-5 ${accent.bg}`}>
                      <h3 className={`font-serif text-xl font-bold mb-2 ${accent.text}`}>{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        }

        if (block.type === 'callout') {
          return (
            <section key={block.title} className="bg-secondary/30 border border-border rounded-xl p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">{block.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{block.body}</p>
              {block.bullets && (
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {block.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          )
        }

        const accent = accentStyles[block.accent ?? 'gold']
        return (
          <section key={block.title} className={`border-l-4 ${accent.border} pl-6 py-4`}>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">{block.title}</h2>
            <div className="space-y-4 text-muted-foreground">
              {block.body.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed">{paragraph}</p>
              ))}
              {block.bullets && (
                <ul className="space-y-2 text-sm">
                  {block.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )
      })}
    </div>
  )
}
