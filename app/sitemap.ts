import { MetadataRoute } from 'next'
import { getAllSubtypes } from '@/lib/subtypes'
import { allContentPages, contentLastReviewed } from '@/lib/seo-content'
import { localizedPagePaths, localizedLocales } from '@/lib/localized-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fourtype.com'
  const lastReviewedDate = new Date(contentLastReviewed)
  const localizedAlternates: Record<string, Record<string, string>> = {
    '/': {
      en: baseUrl,
      'zh-CN': `${baseUrl}/zh-CN`,
      es: `${baseUrl}/es`,
      id: `${baseUrl}/id`,
    },
    '/quiz': {
      en: `${baseUrl}/quiz`,
      'zh-CN': `${baseUrl}/zh-CN/quiz`,
      es: `${baseUrl}/es/quiz`,
      id: `${baseUrl}/id/quiz`,
    },
    '/temperament-test': {
      en: `${baseUrl}/temperament-test`,
      'zh-CN': `${baseUrl}/zh-CN/temperament-test`,
      es: `${baseUrl}/es/temperament-test`,
      id: `${baseUrl}/id/temperament-test`,
    },
    '/four-temperaments-test': {
      en: `${baseUrl}/four-temperaments-test`,
      'zh-CN': `${baseUrl}/zh-CN/four-temperaments-test`,
      es: `${baseUrl}/es/four-temperaments-test`,
      id: `${baseUrl}/id/four-temperaments-test`,
    },
  }

  function alternatesFor(path: string) {
    const languages = localizedAlternates[path]
    return languages ? { languages } : undefined
  }

  const subtypeUrls = getAllSubtypes().flatMap(subtype => [
    {
      url: `${baseUrl}/subtype/${subtype.slug}`,
      lastModified: lastReviewedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/subtype/${subtype.slug}.md`,
      lastModified: lastReviewedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.45,
    },
  ])

  const seoUrls = allContentPages.flatMap((page) => [
    {
      url: `${baseUrl}${page.href}`,
      lastModified: lastReviewedDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: alternatesFor(page.href),
    },
    {
      url: `${baseUrl}${page.href}.md`,
      lastModified: lastReviewedDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ])
  const localizedUrls = Object.keys(localizedLocales).flatMap((locale) => (
    Object.values(localizedPagePaths).map((path) => {
      const englishPath = path || '/'
      return {
      url: `${baseUrl}/${locale}${path}`,
      lastModified: lastReviewedDate,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 0.88 : 0.84,
      alternates: alternatesFor(englishPath),
    }
    })
  ))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: alternatesFor('/'),
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: alternatesFor('/quiz'),
    },
    {
      url: `${baseUrl}/field-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/what-is-temperament-test`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/manifesto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog.md`,
      lastModified: lastReviewedDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: lastReviewedDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/index.md`,
      lastModified: lastReviewedDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/quiz.md`,
      lastModified: lastReviewedDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/what-is-temperament-test.md`,
      lastModified: lastReviewedDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...seoUrls,
    ...localizedUrls,
    ...subtypeUrls,
  ]
}
