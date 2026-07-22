import assert from 'node:assert/strict'
import test from 'node:test'
import { blogArticles, getBlogArticle, getSeoPage, relationshipGuideLinks, seoPages } from '../lib/seo-content'

const requiredArticleSlugs = [
  'four-temperaments-compatibility',
  'choleric-phlegmatic-relationship',
  'sanguine-melancholic-compatibility',
  'temperament-conflict-style',
  'temperament-communication-style',
  'couples-discussion-guide-by-temperament',
  'parenting-by-temperament',
]

test('relationship cluster has a pillar and every required guide', () => {
  assert.equal(getSeoPage('relationships')?.title, 'Temperament Relationships: Compatibility, Communication, and Repair')
  requiredArticleSlugs.forEach((slug) => assert.ok(getBlogArticle(slug), `missing ${slug}`))
  assert.ok(getSeoPage('temperament-test-for-couples'))
})

test('relationship cluster routes readers to the quiz and couples action page', () => {
  const hub = getSeoPage('relationships')!
  const hubLinks = hub.blocks.flatMap((block) => block.type === 'grid' ? block.items.map((item) => `${item.title} ${item.body}`) : [])
  assert.ok(hubLinks.some((copy) => /couple|discussion/i.test(copy)))
  assert.ok(relationshipGuideLinks.some((link) => link.href === '/temperament-test-for-couples'))
  assert.ok(relationshipGuideLinks.some((link) => link.href === '/blog/couples-discussion-guide-by-temperament'))
  assert.ok(relationshipGuideLinks.some((link) => link.href === '/blog/parenting-by-temperament'))
})

test('new relationship guides use practical and responsible framing', () => {
  const couples = getBlogArticle('couples-discussion-guide-by-temperament')!
  const parenting = getBlogArticle('parenting-by-temperament')!
  const couplesCopy = JSON.stringify(couples)
  const parentingCopy = JSON.stringify(parenting)

  assert.match(couplesCopy, /30-minute|30 minute/i)
  assert.match(couplesCopy, /Choleric.*Sanguine.*Melancholic.*Phlegmatic/s)
  assert.match(parentingCopy, /not a diagnosis/i)
  assert.match(parentingCopy, /do not.*label|never.*label/i)
  assert.match(parentingCopy, /Commander \(Choleric\)|Choleric.*Commander/i)
})

test('relationship articles have distinct titles and do not make match-score claims', () => {
  const articles = requiredArticleSlugs.map((slug) => getBlogArticle(slug)!)
  assert.equal(new Set(articles.map((article) => article.title)).size, articles.length)
  articles.forEach((article) => assert.doesNotMatch(JSON.stringify(article), /match score|perfect match|guaranteed compatibility/i))
  assert.equal(blogArticles.some((article) => article.slug === 'parenting-by-temperament'), true)
  assert.equal(seoPages.some((page) => page.slug === 'relationships'), true)
})
