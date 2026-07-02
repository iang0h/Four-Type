import { blogArticles, contentToMarkdown, faqsToMarkdown, getBlogArticle, getSeoPage, guideLinksForSeoPage, linksToMarkdown, popularGuideLinks, seoPages, staticContentPages } from '@/lib/seo-content'
import { getAllSubtypes, getSubtype } from '@/lib/subtypes'

export const dynamic = 'force-static'

type Props = {
  params: Promise<{ path: string[] }>
}

const coreMarkdown: Record<string, { canonical: string; title: string; body: string }> = {
  index: {
    canonical: '/',
    title: 'FourType',
    body: 'FourType is a free four temperaments quiz for discovering whether your strongest pattern is Choleric, Sanguine, Melancholic, Phlegmatic, or a blended subtype.',
  },
  quiz: {
    canonical: '/quiz',
    title: 'FourType Quiz',
    body: 'Take the free 40-question FourType quiz to discover your temperament pattern and subtype.',
  },
  blog: {
    canonical: '/blog',
    title: 'FourType Temperament Test Guides',
    body: 'Read FourType guides for taking and understanding the free temperament test, including Choleric, Sanguine, Melancholic, Phlegmatic comparisons, quiz questions, free test advice, compatibility, subtypes, and methodology.',
  },
  'what-is-temperament-test': {
    canonical: '/what-is-temperament-test',
    title: 'What Is a Temperament Test?',
    body: 'A temperament test identifies your core behavioral patterns across the four classical temperaments: Choleric, Sanguine, Melancholic, and Phlegmatic.',
  },
  'blog/choleric': {
    canonical: '/blog/choleric',
    title: 'Choleric Temperament: The Natural Leader Explained',
    body: 'The Choleric temperament describes a direct, decisive, goal-focused pattern. Choleric people often move toward leadership, challenge, and action under pressure. Use this guide with the FourType temperament test to compare Choleric traits against Sanguine, Melancholic, and Phlegmatic patterns.',
  },
  'blog/sanguine': {
    canonical: '/blog/sanguine',
    title: 'Sanguine Temperament: Traits, Strengths & Challenges',
    body: 'The Sanguine temperament describes an expressive, social, optimistic pattern. Sanguine people often seek connection, energy, storytelling, novelty, and shared experience. Use this guide with the FourType temperament test to compare Sanguine traits against Choleric, Melancholic, and Phlegmatic patterns.',
  },
  'blog/melancholic': {
    canonical: '/blog/melancholic',
    title: 'Melancholic Temperament: Depth, Detail & Perfectionism',
    body: 'The Melancholic temperament describes a reflective, analytical, standards-driven pattern. Melancholic people often care about depth, meaning, accuracy, beauty, and quality. Use this guide with the FourType temperament test to compare Melancholic traits against Choleric, Sanguine, and Phlegmatic patterns.',
  },
  'blog/phlegmatic': {
    canonical: '/blog/phlegmatic',
    title: 'Phlegmatic Temperament: The Quiet Strength',
    body: 'The Phlegmatic temperament describes a calm, steady, loyal pattern. Phlegmatic people often protect peace, trust, stability, support, and emotional steadiness. Use this guide with the FourType temperament test to compare Phlegmatic traits against Choleric, Sanguine, and Melancholic patterns.',
  },
}

export function generateStaticParams() {
  const paths = [
    ...Object.keys(coreMarkdown).map((key) => ({ path: key.split('/') })),
    ...seoPages.map((page) => ({ path: [page.slug] })),
    ...blogArticles.map((article) => ({ path: ['blog', article.slug] })),
    ...staticContentPages.map((page) => ({ path: page.href.replace(/^\//, '').split('/') })),
    ...getAllSubtypes().map((subtype) => ({ path: ['subtype', subtype.slug] })),
  ]

  const seen = new Set<string>()
  return paths.filter(({ path }) => {
    const key = path.join('/')
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export async function GET(_request: Request, { params }: Props) {
  const { path } = await params
  const joined = path.join('/')
  const core = coreMarkdown[joined]

  if (core) {
    return markdownResponse(`# ${core.title}\n\n${core.body}\n\nStart here: https://www.fourtype.com/quiz\n`, core.canonical)
  }

  if (joined.startsWith('blog/')) {
    const article = getBlogArticle(joined.replace('blog/', ''))
    if (article) {
      return markdownResponse(
        `${contentToMarkdown(article.title, article.description, article.blocks)}\n${linksToMarkdown('Popular temperament test guides', popularGuideLinks)}\n${linksToMarkdown('Related guides', article.related)}\n${faqsToMarkdown(article.faq)}`,
        `/blog/${article.slug}`,
      )
    }
  }

  const staticPage = staticContentPages.find((page) => page.href === `/${joined}`)
  if (staticPage) {
    return markdownResponse(
      `# ${staticPage.title}\n\n${staticPage.description}\n\n${staticPage.markdownBody}\n\n${linksToMarkdown('Keep exploring temperament tests', popularGuideLinks)}\n`,
      staticPage.href,
    )
  }

  const page = getSeoPage(joined)
  if (page) {
    return markdownResponse(
      `${contentToMarkdown(page.title, page.description, page.blocks)}\n${linksToMarkdown('Keep exploring temperament tests', guideLinksForSeoPage(page.slug))}\n${faqsToMarkdown(page.faq)}`,
      `/${page.slug}`,
    )
  }

  if (joined.startsWith('subtype/')) {
    const subtype = getSubtype(joined.replace('subtype/', ''))
    if (!subtype) return notFound()
    return markdownResponse(subtypeToMarkdown(subtype), `/subtype/${subtype.slug}`)
  }

  return notFound()
}

type MarkdownSubtype = NonNullable<ReturnType<typeof getSubtype>>

function subtypeToMarkdown(subtype: MarkdownSubtype) {
  const lines = [
    `# ${subtype.name}: ${subtype.title}`,
    '',
    subtype.tagline,
    '',
    '## Overview',
    '',
    subtype.overview,
    '',
    '## Strengths',
    '',
    ...subtype.strengths.map((item) => `- ${item}`),
    '',
    '## Challenges',
    '',
    ...subtype.weaknesses.map((item) => `- ${item}`),
    '',
    '## Communication Style',
    '',
    `- Pace: ${subtype.communicationStyle.pace}`,
    `- Tone: ${subtype.communicationStyle.tone}`,
    `- Preferred input: ${subtype.communicationStyle.preferredInput}`,
    `- Pet peeve: ${subtype.communicationStyle.petPeeve}`,
    '',
    '## Stress and Recovery',
    '',
    `Stress response: ${subtype.stressResponse}`,
    '',
    `Recovery strategy: ${subtype.recoveryStrategy}`,
    '',
  ]

  if (subtype.relationshipPatterns) {
    lines.push('## Relationship Pattern', '', subtype.relationshipPatterns, '')
  }

  lines.push(
    '## Keep exploring temperament tests',
    '',
    '- Take the FourType quiz: https://www.fourtype.com/quiz',
    '- Read the subtype guide: https://www.fourtype.com/subtypes',
    '- Compare all four temperaments: https://www.fourtype.com/four-temperaments-test',
    '',
  )

  return lines.join('\n')
}

function markdownResponse(markdown: string, canonicalPath: string) {
  return new Response(markdown, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'link': `<https://www.fourtype.com${canonicalPath}>; rel="canonical"`,
      'x-robots-tag': 'noindex, follow',
    },
  })
}

function notFound() {
  return new Response('Not found', {
    status: 404,
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'x-robots-tag': 'noindex, follow',
    },
  })
}
