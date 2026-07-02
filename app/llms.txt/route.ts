import { allContentPages } from '@/lib/seo-content'

export const dynamic = 'force-static'

export function GET() {
  const lines = [
    '# FourType',
    '',
    'FourType is a free four temperaments quiz covering Choleric, Sanguine, Melancholic, Phlegmatic, blended subtypes, relationship patterns, work patterns, and practical temperament education.',
    '',
    '## Core routes',
    '- Home: https://www.fourtype.com',
    '- Quiz: https://www.fourtype.com/quiz',
    '- What is a temperament test: https://www.fourtype.com/what-is-temperament-test',
    '',
    '## High-intent temperament resources',
    ...allContentPages.map((page) => `- ${page.title}: https://www.fourtype.com${page.href} - ${page.description}`),
    '',
    '## Markdown mirrors',
    '- FourType: https://www.fourtype.com/index.md',
    '- FourType Quiz: https://www.fourtype.com/quiz.md',
    '- What Is a Temperament Test: https://www.fourtype.com/what-is-temperament-test.md',
    ...allContentPages.map((page) => `- ${page.title}: https://www.fourtype.com${page.href}.md`),
    '',
  ]

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  })
}
