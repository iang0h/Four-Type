import assert from 'node:assert/strict'
import test from 'node:test'
import { allContentPages, blogArticles, getBlogArticle, getSeoPage, relationshipGuideLinks, seoPages } from '../lib/seo-content'

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

test('relationship cluster routes are discoverable through the shared content index', () => {
  const hrefs = new Set(allContentPages.map((page) => page.href))

  ;[
    '/relationships',
    '/temperament-test-for-couples',
    '/blog/couples-discussion-guide-by-temperament',
    '/blog/parenting-by-temperament',
  ].forEach((href) => assert.ok(hrefs.has(href), `missing discoverable route ${href}`))
})

test('relationship cluster routes readers to the quiz and couples action page', () => {
  const hub = getSeoPage('relationships')!
  const hubLinks = hub.blocks.flatMap((block) => block.type === 'grid' ? block.items.map((item) => `${item.title} ${item.body}`) : [])
  assert.ok(hubLinks.some((copy) => /couple|discussion/i.test(copy)))
  assert.ok(relationshipGuideLinks.some((link) => link.href === '/temperament-test-for-couples'))
  assert.ok(relationshipGuideLinks.some((link) => link.href === '/blog/couples-discussion-guide-by-temperament'))
  assert.ok(relationshipGuideLinks.some((link) => link.href === '/blog/parenting-by-temperament'))
})

test('couples action page gives partners a shared three-step flow', () => {
  const page = getSeoPage('temperament-test-for-couples')!
  const copy = JSON.stringify(page.blocks)

  assert.match(copy, /Take the quiz separately/i)
  assert.match(copy, /Compare.*score/i)
  assert.match(copy, /one conversation prompt|one small agreement/i)
  assert.equal(page.ctaLabel, 'Take the Quiz Together')
})

test('relationship guides introduce the FourType role names where they first help readers', () => {
  const expectedRoles: Record<string, string[]> = {
    'temperament-test-for-couples': ['Commander (Choleric)', 'Bard (Sanguine)', 'Strategist (Melancholic)', 'Guardian (Phlegmatic)'],
    'four-temperaments-compatibility': ['Commander (Choleric)', 'Bard (Sanguine)', 'Strategist (Melancholic)', 'Guardian (Phlegmatic)'],
    'choleric-phlegmatic-relationship': ['Commander (Choleric)', 'Guardian (Phlegmatic)'],
    'sanguine-melancholic-compatibility': ['Bard (Sanguine)', 'Strategist (Melancholic)'],
    'temperament-conflict-style': ['Commander (Choleric)', 'Bard (Sanguine)', 'Strategist (Melancholic)', 'Guardian (Phlegmatic)'],
    'temperament-communication-style': ['Commander (Choleric)', 'Bard (Sanguine)', 'Strategist (Melancholic)', 'Guardian (Phlegmatic)'],
  }

  Object.entries(expectedRoles).forEach(([slug, roles]) => {
    const content = slug === 'temperament-test-for-couples'
      ? JSON.stringify(getSeoPage(slug)!.blocks)
      : JSON.stringify(getBlogArticle(slug)!.blocks)

    roles.forEach((role) => assert.match(content, new RegExp(role.replace(/[()]/g, '\\$&'))))
  })
})

test('new relationship guides use practical and responsible framing', () => {
  const couples = getBlogArticle('couples-discussion-guide-by-temperament')!
  const parenting = getBlogArticle('parenting-by-temperament')!
  const couplesCopy = JSON.stringify(couples)
  const parentingCopy = JSON.stringify(parenting)

  assert.match(couplesCopy, /30-minute|30 minute/i)
  assert.match(couplesCopy, /Choleric[\s\S]*Sanguine[\s\S]*Melancholic[\s\S]*Phlegmatic/)
  assert.match(parentingCopy, /not a diagnosis/i)
  assert.match(parentingCopy, /do not.*label|never.*label/i)
  assert.match(parentingCopy, /Commander \(Choleric\)|Choleric.*Commander/i)
})

test('couples discussion guide uses all five relationship topics in its 30-minute table', () => {
  const couples = getBlogArticle('couples-discussion-guide-by-temperament')!
  const discussion = couples.blocks.find((block) => block.type === 'table' && block.title === 'A 30-minute conversation')

  assert.ok(discussion && discussion.type === 'table')
  assert.equal(discussion.rows.reduce((total, [time]) => total + Number.parseInt(time, 10), 0), 30)
  const questions = discussion.rows.map(([, question]) => question).join(' ')
  ;['pressure', 'affection', 'conflict', 'pace', 'repair'].forEach((topic) => assert.match(questions, new RegExp(topic, 'i')))
})

test('communication guide gives every pattern a care request and missed-signal repair sentence', () => {
  const communication = getBlogArticle('temperament-communication-style')!
  const scripts = communication.blocks.find((block) => block.type === 'grid' && block.title === 'Ask for care and repair a missed signal')

  assert.ok(scripts && scripts.type === 'grid')
  assert.equal(scripts.items.length, 4)
  scripts.items.forEach((item) => {
    assert.match(item.body, /Ask for care:/)
    assert.match(item.body, /Repair after a missed signal:/)
  })
})

test('parenting guide models a concrete adult-child repair interaction', () => {
  const parenting = getBlogArticle('parenting-by-temperament')!
  const repair = parenting.blocks.find((block) => block.type === 'table' && block.title === 'A family repair after a hard afternoon')

  assert.ok(repair && repair.type === 'table')
  assert.deepEqual(repair.columns, ['Adult reaction', 'Child situation', 'Repair script', 'Workable next step'])
  assert.equal(repair.rows.length, 1)
  assert.match(repair.rows[0][2], /I was too loud/i)
})

test('relationship guide links start with the shared relationship path and couples actions', () => {
  assert.deepEqual(
    relationshipGuideLinks.slice(0, 3).map((link) => link.href),
    ['/relationships', '/temperament-test-for-couples', '/blog/couples-discussion-guide-by-temperament'],
  )
})

test('couples discussion guide image describes the shared compatibility map', () => {
  assert.equal(
    getBlogArticle('couples-discussion-guide-by-temperament')!.imageAlt,
    'Four temperament characters around a compatibility map',
  )
})

test('new practical guides point to the right next relationship actions', () => {
  const couples = getBlogArticle('couples-discussion-guide-by-temperament')!
  const parenting = getBlogArticle('parenting-by-temperament')!

  assert.ok(couples.related.some((link) => link.href === '/temperament-test-for-couples'))
  assert.ok(couples.related.some((link) => link.href === '/blog/temperament-conflict-style'))
  assert.ok(couples.related.some((link) => link.href === '/blog/temperament-communication-style'))
  assert.ok(parenting.related.some((link) => link.href === '/temperament/choleric'))
  assert.ok(parenting.related.some((link) => link.href === '/temperament/phlegmatic'))
  assert.ok(parenting.related.some((link) => link.href === '/blog/couples-discussion-guide-by-temperament'))
})

test('existing relationship guides expose the right next practical step', () => {
  const requiredLinks: Record<string, string[]> = {
    'four-temperaments-compatibility': [
      '/blog/couples-discussion-guide-by-temperament',
      '/blog/temperament-conflict-style',
      '/blog/choleric-phlegmatic-relationship',
      '/blog/sanguine-melancholic-compatibility',
    ],
    'choleric-phlegmatic-relationship': ['/blog/couples-discussion-guide-by-temperament', '/blog/temperament-conflict-style'],
    'sanguine-melancholic-compatibility': ['/blog/couples-discussion-guide-by-temperament', '/blog/temperament-communication-style'],
    'temperament-conflict-style': ['/blog/couples-discussion-guide-by-temperament', '/blog/temperament-communication-style'],
    'temperament-communication-style': ['/blog/couples-discussion-guide-by-temperament', '/blog/temperament-conflict-style'],
  }

  Object.entries(requiredLinks).forEach(([slug, hrefs]) => {
    const article = getBlogArticle(slug)!
    hrefs.forEach((href) => assert.ok(article.related.some((link) => link.href === href), `${slug} missing ${href}`))
  })
})

test('relationship articles have distinct titles and do not make match-score claims', () => {
  const articles = requiredArticleSlugs.map((slug) => getBlogArticle(slug)!)
  assert.equal(new Set(articles.map((article) => article.title)).size, articles.length)
  articles.forEach((article) => assert.doesNotMatch(JSON.stringify(article), /match score|guaranteed compatibility|(?:is|are|will be|can be) (?:a |an )?perfect match/i))
  assert.equal(blogArticles.some((article) => article.slug === 'parenting-by-temperament'), true)
  assert.equal(seoPages.some((page) => page.slug === 'relationships'), true)
})
