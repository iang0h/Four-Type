import { blogArticles, contentToMarkdown, getBlogArticle, getSeoPage, seoPages } from '@/lib/seo-content'

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
  'what-is-temperament-test': {
    canonical: '/what-is-temperament-test',
    title: 'What Is a Temperament Test?',
    body: 'A temperament test identifies your core behavioral patterns across the four classical temperaments: Choleric, Sanguine, Melancholic, and Phlegmatic.',
  },
}

export function generateStaticParams() {
  return [
    { path: ['index'] },
    { path: ['quiz'] },
    { path: ['what-is-temperament-test'] },
    ...seoPages.map((page) => ({ path: [page.slug] })),
    ...blogArticles.map((article) => ({ path: ['blog', article.slug] })),
  ]
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
    if (!article) return notFound()
    return markdownResponse(contentToMarkdown(article.title, article.description, article.blocks), `/blog/${article.slug}`)
  }

  const page = getSeoPage(joined)
  if (!page) return notFound()

  return markdownResponse(contentToMarkdown(page.title, page.description, page.blocks), `/${page.slug}`)
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
