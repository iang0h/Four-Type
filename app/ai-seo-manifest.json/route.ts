import { allContentPages } from '@/lib/seo-content'
import { getAllSubtypes } from '@/lib/subtypes'

export const dynamic = 'force-static'

const baseUrl = 'https://www.fourtype.com'

function markdownUrl(route: string) {
  return `${baseUrl}${route === '/' ? '/index' : route}.md`
}

export function GET() {
  const routes = [
    '/',
    '/quiz',
    '/blog',
    '/what-is-temperament-test',
    ...allContentPages.map((page) => page.href),
    ...getAllSubtypes().map((subtype) => `/subtype/${subtype.slug}`),
    '/llms.txt',
  ]

  const seen = new Set<string>()
  const uniqueRoutes = routes.filter((route) => {
    if (seen.has(route)) return false
    seen.add(route)
    return true
  })

  const manifest = {
    generatedAt: '2026-07-02',
    site: baseUrl,
    routes: uniqueRoutes.map((route) => ({
      html: `${baseUrl}${route}`,
      markdown: route === '/llms.txt' ? null : markdownUrl(route),
    })),
  }

  return Response.json(manifest, {
    headers: {
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  })
}
