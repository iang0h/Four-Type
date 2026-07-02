import { MetadataRoute } from 'next'
import { getAllSubtypes } from '@/lib/subtypes'
import { allContentPages } from '@/lib/seo-content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fourtype.com'

  const subtypeUrls = getAllSubtypes().flatMap(subtype => [
    {
      url: `${baseUrl}/subtype/${subtype.slug}`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/subtype/${subtype.slug}.md`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly' as const,
      priority: 0.45,
    },
  ])

  const seoUrls = allContentPages.flatMap((page) => [
    {
      url: `${baseUrl}${page.href}`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    },
    {
      url: `${baseUrl}${page.href}.md`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ])

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
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
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/index.md`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/quiz.md`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/what-is-temperament-test.md`,
      lastModified: new Date('2026-07-02'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...seoUrls,
    ...subtypeUrls,
  ]
}
