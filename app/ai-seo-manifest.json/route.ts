import { blogArticles, seoPages, staticContentPages } from '@/lib/seo-content'
import { getAllSubtypes } from '@/lib/subtypes'

export const dynamic = 'force-static'

const baseUrl = 'https://www.fourtype.com'

function markdownUrl(route: string) {
  return `${baseUrl}${route === '/' ? '/index' : route}.md`
}

export function GET() {
  const routes = [
    {
      route: '/',
      kind: 'home',
      title: 'FourType',
      description: 'Free four temperaments quiz for discovering Choleric, Sanguine, Melancholic, Phlegmatic, and blended subtype patterns.',
      priority: 1,
      changeFrequency: 'weekly',
      keywords: ['temperament test', 'four temperaments test', 'free temperament quiz'],
    },
    {
      route: '/quiz',
      kind: 'quiz',
      title: 'Free Temperament Test',
      description: 'Take the free 40-question FourType quiz to discover your temperament pattern and subtype.',
      priority: 0.95,
      changeFrequency: 'weekly',
      keywords: ['free temperament test', 'temperament quiz', 'four temperaments test'],
    },
    {
      route: '/blog',
      kind: 'blog-index',
      title: 'FourType Temperament Test Guides',
      description: 'Guides for taking and understanding the free temperament test, including four temperament comparisons, quiz questions, compatibility, subtypes, and methodology.',
      priority: 0.85,
      changeFrequency: 'weekly',
      keywords: ['temperament test guides', 'four temperaments blog', 'temperament quiz articles'],
    },
    {
      route: '/what-is-temperament-test',
      kind: 'definition-guide',
      title: 'What Is a Temperament Test?',
      description: 'A temperament test identifies your core behavioral patterns across Choleric, Sanguine, Melancholic, and Phlegmatic traits.',
      priority: 0.9,
      changeFrequency: 'monthly',
      keywords: ['what is a temperament test', 'temperament test meaning', 'four temperaments test'],
    },
    ...seoPages.map((page) => ({
      route: `/${page.slug}`,
      kind: 'seo-guide',
      title: page.title,
      description: page.description,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
      keywords: page.keywords,
    })),
    ...blogArticles.map((article) => ({
      route: `/blog/${article.slug}`,
      kind: 'blog-article',
      title: article.title,
      description: article.description,
      priority: 0.82,
      changeFrequency: 'monthly',
      keywords: article.keywords,
      category: article.category,
      published: article.published,
    })),
    ...staticContentPages.map((page) => ({
      route: page.href,
      kind: 'static-guide',
      title: page.title,
      description: page.description,
      priority: page.priority,
      changeFrequency: page.changeFrequency,
    })),
    ...getAllSubtypes().map((subtype) => ({
      route: `/subtype/${subtype.slug}`,
      kind: 'subtype-profile',
      title: `${subtype.name}: ${subtype.title}`,
      description: subtype.tagline,
      priority: 0.8,
      changeFrequency: 'monthly',
      primaryTemperament: subtype.primary,
      secondaryTemperament: subtype.secondary,
    })),
    {
      route: '/llms.txt',
      kind: 'ai-index',
      title: 'FourType llms.txt',
      description: 'AI-readable index of FourType temperament test pages, markdown mirrors, and subtype profiles.',
      priority: 0.5,
      changeFrequency: 'weekly',
    },
  ]

  const seen = new Set<string>()
  const uniqueRoutes = routes.filter(({ route }) => {
    if (seen.has(route)) return false
    seen.add(route)
    return true
  })

  const manifest = {
    generatedAt: '2026-07-02',
    site: baseUrl,
    primaryTopic: 'Free four temperaments test for Choleric, Sanguine, Melancholic, Phlegmatic, and blended subtype patterns',
    primaryTargets: [
      `${baseUrl}/temperament-test`,
      `${baseUrl}/four-temperaments-test`,
      `${baseUrl}/quiz`,
    ],
    routes: uniqueRoutes.map(({ route, ...metadata }) => ({
      html: `${baseUrl}${route}`,
      markdown: route === '/llms.txt' ? null : markdownUrl(route),
      ...metadata,
    })),
  }

  return Response.json(manifest, {
    headers: {
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  })
}
