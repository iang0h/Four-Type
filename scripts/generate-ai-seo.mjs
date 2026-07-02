import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const out = path.join(root, 'public', 'ai-seo-manifest.json')

const routes = [
  '/',
  '/quiz',
  '/what-is-temperament-test',
  '/temperament-test',
  '/free-temperament-test',
  '/4-temperament-test',
  '/temperament-test-for-couples',
  '/four-temperaments',
  '/subtypes',
  '/methodology',
  '/temperaments-vs-mbti',
  '/premium',
  '/blog/temperament-compatibility-chart',
  '/blog/temperament-test-accuracy',
  '/blog/choleric-sanguine-melancholic-phlegmatic',
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
