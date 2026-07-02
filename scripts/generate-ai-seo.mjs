import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const out = path.join(root, 'public', 'ai-seo-manifest.json')
const subtypesSource = fs.readFileSync(path.join(root, 'lib', 'subtypes.ts'), 'utf8')
const subtypeRoutes = Array.from(subtypesSource.matchAll(/slug: '([a-z-]+)'/g), (match) => `/subtype/${match[1]}`)

const routes = [
  '/',
  '/quiz',
  '/what-is-temperament-test',
  '/temperament-test',
  '/free-temperament-test',
  '/temperament-quiz',
  '/what-is-my-temperament',
  '/personality-temperament-test',
  '/choleric-test',
  '/sanguine-test',
  '/melancholic-test',
  '/phlegmatic-test',
  '/4-temperament-test',
  '/four-temperaments-test',
  '/temperament-test-for-couples',
  '/four-temperaments',
  '/subtypes',
  '/methodology',
  '/temperaments-vs-mbti',
  '/premium',
  '/blog/temperament-compatibility-chart',
  '/blog/temperament-test-accuracy',
  '/blog/choleric-sanguine-melancholic-phlegmatic',
  '/blog/choleric',
  '/blog/sanguine',
  '/blog/melancholic',
  '/blog/phlegmatic',
  '/blog/history-of-temperaments',
  '/blog/leadership-and-temperament',
  '/blog/temperaments-vs-mbti-big-five',
  '/blog/subtypes',
  '/blog/temperament-anxiety',
  '/blog/temperament-dating',
  '/blog/temperament-work',
  '/blog/temperament-science',
  '/temperament/choleric',
  '/temperament/sanguine',
  '/temperament/melancholic',
  '/temperament/phlegmatic',
  '/blog/ospp-four-temperaments-test',
  '/blog/four-humors-test',
  '/blog/best-free-four-temperaments-test',
  ...subtypeRoutes,
  '/llms.txt',
]

const manifest = {
  generatedAt: new Date().toISOString(),
  site: 'https://www.fourtype.com',
  routes: routes.map((route) => ({
    html: `https://www.fourtype.com${route}`,
    markdown: route === '/llms.txt' ? null : `https://www.fourtype.com${route === '/' ? '/index' : route}.md`,
  })),
}

fs.writeFileSync(out, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`Wrote ${path.relative(root, out)} with ${routes.length} routes`)
