# FourType Authority Comparison Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a trust and comparison layer that helps FourType compete for "temperament test" and "best temperament test" search intent.

**Architecture:** Use static React components for reusable trust/editorial signals, then render them from existing App Router pages. Add the comparison article and methodology upgrades to the existing `lib/seo-content.ts` registry so metadata, sitemap, markdown mirrors, AI manifest, FAQ schema, and internal links continue to work through the current system.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5.7, Tailwind classes, lucide-react icons, existing dynamic content registry in `lib/seo-content.ts`.

## Global Constraints

- Do not invent credentials, reviewers, or fake academic review claims.
- Keep FourType framed as educational self-reflection, not clinical, hiring, medical, or diagnostic advice.
- Keep trust proof compact and scannable.
- Do not add a new persistence layer.
- Follow the existing dynamic content system rather than creating one-off page files for the comparison article.
- Verify with `pnpm exec tsc --noEmit` and `node node_modules/next/dist/bin/next build`.

---

### Task 1: Reusable Trust and Editorial Components

**Files:**
- Create: `components/TrustProof.tsx`
- Create: `components/EditorialNote.tsx`

**Interfaces:**
- Produces: `TrustProof({ variant?: 'compact' | 'full'; className?: string })`
- Produces: `EditorialNote({ className?: string })`
- Consumes: `next/link`, lucide-react icons, static FourType copy.

- [ ] **Step 1: Create `components/TrustProof.tsx`**

Create a client-free server component:

```tsx
import Link from 'next/link'
import { BarChart3, CheckCircle2, Mail, ShieldCheck, Sparkles, Users } from 'lucide-react'

type TrustProofProps = {
  variant?: 'compact' | 'full'
  className?: string
}

const proofItems = [
  { label: 'Free core result', body: 'Take the quiz and see your result without paying first.', icon: CheckCircle2 },
  { label: 'No signup required', body: 'Email is optional and appears only after the free result.', icon: Mail },
  { label: '40 behavior questions', body: 'Questions focus on repeated behavior, pressure, motivation, and communication.', icon: Sparkles },
  { label: 'Score spread', body: 'See all four temperament scores instead of only a flat label.', icon: BarChart3 },
  { label: '15 FourType blends', body: 'Use primary and secondary patterns to understand subtype direction.', icon: Users },
  { label: 'Responsible limits', body: 'FourType is for self-reflection, not diagnosis or hiring decisions.', icon: ShieldCheck },
]

export function TrustProof({ variant = 'full', className = '' }: TrustProofProps) {
  const visibleItems = variant === 'compact' ? proofItems.slice(0, 4) : proofItems

  return (
    <section className={`rounded-xl border border-border bg-secondary/20 p-5 md:p-6 ${className}`}>
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Why FourType</p>
          <h2 className="mt-2 font-serif text-2xl font-bold">A practical temperament test, not a black box</h2>
        </div>
        <Link href="/methodology" className="text-sm font-semibold text-primary hover:underline">
          Read methodology
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {visibleItems.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-lg border border-border bg-background/60 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <h3 className="font-serif text-base font-bold">{item.label}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          )
        })}
      </div>
      {variant === 'full' && (
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          More than 50,000 people have taken FourType. The result is designed to start better self-understanding,
          not to replace professional psychological, medical, or employment guidance.
        </p>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Create `components/EditorialNote.tsx`**

```tsx
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

type EditorialNoteProps = {
  className?: string
}

export function EditorialNote({ className = '' }: EditorialNoteProps) {
  return (
    <section className={`rounded-xl border border-border bg-card p-5 ${className}`}>
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-full border border-primary/30 bg-primary/10 p-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Editorial note</p>
          <h2 className="mt-2 font-serif text-xl font-bold">Created for responsible self-reflection</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            FourType is created by Ian Goh as a personality media and self-reflection project. The content separates
            ancient temperament language from modern personality science and avoids clinical, hiring, or diagnostic claims.
          </p>
          <Link href="/methodology" className="mt-3 inline-flex text-sm font-semibold text-primary hover:underline">
            See how FourType scores and interprets results
          </Link>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Run TypeScript**

Run: `pnpm exec tsc --noEmit`

Expected: exit code `0`.

- [ ] **Step 4: Commit Task 1**

```bash
git add components/TrustProof.tsx components/EditorialNote.tsx
git commit -m "Add FourType trust proof components"
```

---

### Task 2: Render Trust Signals on Quiz, SEO, and Blog Pages

**Files:**
- Modify: `app/quiz/page.tsx`
- Modify: `app/(seo)/[slug]/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `TrustProof` from `@/components/TrustProof`
- Consumes: `EditorialNote` from `@/components/EditorialNote`
- Produces: visible trust and editorial blocks on high-intent pages.

- [ ] **Step 1: Add trust proof to `/quiz` SEO section**

In `app/quiz/page.tsx`, import:

```tsx
import { TrustProof } from '@/components/TrustProof'
```

Inside `QuizSeoSection`, place this after the intro block and before the temperament cards:

```tsx
<TrustProof variant="compact" className="mb-12" />
```

- [ ] **Step 2: Add trust proof and editorial note to dynamic SEO pages**

In `app/(seo)/[slug]/page.tsx`, import:

```tsx
import { TrustProof } from '@/components/TrustProof'
import { EditorialNote } from '@/components/EditorialNote'
```

Add this constant after `relatedGuideLinks`:

```tsx
const trustPageSlugs = new Set(['temperament-test', 'four-temperaments-test', 'temperament-quiz', 'methodology', 'personality-temperament-test'])
const showTrustSignals = trustPageSlugs.has(page.slug)
```

Render after `<ContentBlocks blocks={page.blocks} />`:

```tsx
{showTrustSignals && (
  <div className="mb-16 space-y-6">
    <TrustProof variant={page.slug === 'methodology' ? 'full' : 'compact'} />
    <EditorialNote />
  </div>
)}
```

- [ ] **Step 3: Add trust proof and editorial note to selected blog pages**

In `app/blog/[slug]/page.tsx`, import:

```tsx
import { TrustProof } from '@/components/TrustProof'
import { EditorialNote } from '@/components/EditorialNote'
```

Add this constant after `relatedGuideLinks`:

```tsx
const trustArticleSlugs = new Set([
  'best-temperament-test',
  'best-free-four-temperaments-test',
  'temperament-test-accuracy',
  'temperament-test-questions',
  'personality-test-vs-temperament-test',
  'how-to-read-temperament-test-results',
])
const showTrustSignals = trustArticleSlugs.has(article.slug)
```

Render after `<ContentBlocks blocks={article.blocks} />`:

```tsx
{showTrustSignals && (
  <div className="mb-16 space-y-6">
    <TrustProof variant={article.slug === 'best-temperament-test' ? 'full' : 'compact'} />
    <EditorialNote />
  </div>
)}
```

- [ ] **Step 4: Run TypeScript**

Run: `pnpm exec tsc --noEmit`

Expected: exit code `0`.

- [ ] **Step 5: Commit Task 2**

```bash
git add app/quiz/page.tsx 'app/(seo)/[slug]/page.tsx' 'app/blog/[slug]/page.tsx'
git commit -m "Show trust signals on FourType pages"
```

---

### Task 3: Add Best Temperament Test Article and Methodology Upgrade

**Files:**
- Modify: `lib/seo-content.ts`

**Interfaces:**
- Produces: `blogArticles` entry with slug `best-temperament-test`
- Produces: enriched `seoPages` entry for slug `methodology`
- Produces: updated guide links that include `/blog/best-temperament-test`

- [ ] **Step 1: Add the `best-temperament-test` article**

Insert this article near the start of `blogArticles`, before the data articles:

```ts
{
  slug: 'best-temperament-test',
  title: 'Best Temperament Test: How to Choose a Useful Four Temperaments Quiz',
  shortTitle: 'Best Temperament Test',
  description: 'Compare FourType, OSPP, IDRlabs, Truity, JobCannon, TemperamentQuiz.com, and other four temperament tests to choose the most useful quiz.',
  keywords: ['best temperament test', 'best free temperament test', 'best four temperaments test', 'temperament test comparison', 'FourType vs OSPP', 'FourType vs IDRlabs'],
  category: 'Comparison',
  readTime: '10 min',
  accent: 'gold',
  icon: Scale,
  image: '/images/blog/temperament-test-accuracy.jpg',
  imageAlt: 'Comparison of the best temperament test options',
  published: '2026-07-07',
  blocks: [
    {
      type: 'section',
      title: 'The best temperament test depends on what you need',
      body: [
        'A good temperament test should do more than hand you a flattering label. It should help you understand repeated behavior: how you respond to pressure, communicate, make decisions, recover energy, and relate to other people.',
        'FourType is built for practical self-understanding. Other tests may be better if you specifically want open-source psychometrics, a broader personality-test library, or an academically reviewed Eysenck-style framing.',
      ],
    },
    {
      type: 'grid',
      title: 'What to compare before choosing a temperament test',
      intro: 'Use these criteria before trusting any free four temperaments quiz.',
      items: [
        { title: 'Question quality', body: 'Useful questions ask about repeated behavior and stress response, not only ideal identity or obvious type stereotypes.', accent: 'gold' },
        { title: 'Score transparency', body: 'A score spread is more useful than a single label because many people are blended patterns.', accent: 'blue' },
        { title: 'Responsible limits', body: 'The test should avoid clinical, hiring, medical, or destiny-style claims.', accent: 'green' },
        { title: 'Practical next steps', body: 'The best result helps with relationships, work style, conflict, and growth, not only type trivia.', accent: 'purple' },
      ],
    },
    {
      type: 'grid',
      title: 'Popular temperament tests compared',
      items: [
        { title: 'FourType', body: 'Best for a free 40-question quiz with score spread, subtype direction, practical growth notes, share cards, friend comparison, and multilingual support.', accent: 'gold' },
        { title: 'OSPP Four Temperaments Test', body: 'Best for users who want an open-source psychometrics style test with public development and scoring context.', accent: 'blue' },
        { title: 'IDRlabs Temperament Test', body: 'Best for users who want professional and academic-review framing around an Eysenck-influenced temperament test.', accent: 'purple' },
        { title: 'Truity TypeFinder Temperament Test', body: 'Best for users who want a broader personality-test ecosystem and a Keirsey/Myers-Briggs style temperament path.', accent: 'green' },
        { title: 'JobCannon Temperament Test', body: 'Best for users who want a very short modern test alongside many other quick assessments.', accent: 'red' },
        { title: 'TemperamentQuiz.com', body: 'Best for users who want a simple quiz with share-and-compare positioning and a faith-adjacent temperament tradition.', accent: 'gold' },
      ],
    },
    {
      type: 'section',
      title: 'Why FourType is different',
      body: [
        'FourType gives the free result first. You do not need to enter an email to see your core temperament pattern. The quiz then shows a score spread across Choleric, Sanguine, Melancholic, and Phlegmatic tendencies so you can see whether your result is clear or blended.',
        'FourType also treats subtype direction as important. A Choleric-Sanguine does not behave like a Choleric-Phlegmatic, and a Melancholic-Sanguine does not feel like a Melancholic-Phlegmatic. The result should help you know yourself more clearly, not flatten you into one ancient label.',
      ],
    },
    {
      type: 'callout',
      title: 'The quick recommendation',
      body: 'Use FourType if you want a modern, free, practical temperament test with score spread, subtype guidance, relationship/work insights, and shareable results. Use OSPP or IDRlabs if your priority is psychometric or academic-style framing.',
      bullets: ['Start with FourType for self-understanding.', 'Read the methodology before treating any result too seriously.', 'Compare your result with someone close to you for better relationship insight.'],
    },
  ],
  related: [
    { href: '/quiz', title: 'Take the Free Temperament Test', description: 'Start with the 40-question FourType quiz.' },
    { href: '/temperament-test', title: 'Temperament Test Guide', description: 'Learn what a useful temperament test measures.' },
    { href: '/methodology', title: 'FourType Methodology', description: 'See how FourType scores and interprets results.' },
    { href: '/blog/temperament-test-accuracy', title: 'Temperament Test Accuracy', description: 'Read what temperament tests can and cannot claim.' },
    { href: '/blog/best-free-four-temperaments-test', title: 'Best Free Four Temperaments Test', description: 'Choose a free four temperaments quiz carefully.' },
    { href: '/blog/personality-test-vs-temperament-test', title: 'Personality Test vs Temperament Test', description: 'Compare temperament tests with broader personality tools.' },
  ],
  faq: [
    { question: 'What is the best temperament test?', answer: 'The best temperament test asks behavior-based questions, shows score spread, explains blended patterns, gives practical next steps, and avoids clinical or hiring claims. FourType is designed around those criteria.' },
    { question: 'Is FourType better than OSPP or IDRlabs?', answer: 'FourType is better if you want practical self-understanding, subtype depth, shareable results, and a modern quiz experience. OSPP or IDRlabs may be better if your priority is open-source psychometrics or academic-review framing.' },
    { question: 'What should a free temperament test include?', answer: 'A useful free temperament test should include clear questions, a result without forcing payment, score spread, responsible limits, and guidance for applying the result in everyday life.' },
    { question: 'Is a temperament test scientifically validated?', answer: 'Some temperament tests use psychometric ideas or Eysenck-style mapping, but the classical four temperaments are best used as self-reflection language rather than a clinical or diagnostic system.' },
  ],
}
```

- [ ] **Step 2: Enrich the `methodology` SEO page**

Replace the `blocks` array for slug `methodology` with:

```ts
blocks: [
  {
    type: 'section',
    title: 'How FourType reads your answers',
    body: [
      'Each question is designed to reveal a behavioral preference rather than a moral value. The scoring key maps answers toward Choleric, Sanguine, Melancholic, or Phlegmatic tendencies.',
      'Your final result considers your top score, secondary score, and score spread. A close spread means you may relate to multiple patterns; a dominant spread usually means the primary type is clearer.',
    ],
  },
  {
    type: 'grid',
    title: 'What the score spread means',
    items: [
      { title: 'Primary temperament', body: 'Your strongest repeated pattern, especially under pressure or when you stop performing for others.', accent: 'gold' },
      { title: 'Secondary temperament', body: 'The influence that colors your main type and often explains your subtype direction.', accent: 'blue' },
      { title: 'Close scores', body: 'A sign that your result needs nuance and comparison instead of a rigid single label.', accent: 'green' },
      { title: 'Pure pattern', body: 'A stronger one-temperament result where the secondary influence is less obvious.', accent: 'purple' },
    ],
  },
  {
    type: 'section',
    title: 'Why FourType uses behavior-based questions',
    body: [
      'A useful temperament test should ask how you repeatedly act, not which identity sounds most attractive. FourType questions focus on pressure, communication, conflict, decision-making, motivation, and recovery.',
      'This keeps the quiz practical. The goal is not to prove every part of your personality. The goal is to give you language for patterns you can observe and improve.',
    ],
  },
  {
    type: 'callout',
    title: 'What FourType is not',
    body: 'FourType is not a medical, psychiatric, or employment-screening diagnosis. It is a self-reflection framework for education, communication, and personal growth.',
    bullets: ['Do not use it to label someone permanently.', 'Do not use it to make clinical or hiring decisions.', 'Do not treat ancient humors as medical science.', 'Do use it to ask better questions about repeated patterns.'],
  },
  {
    type: 'section',
    title: 'Data, privacy, and responsible use',
    body: [
      'The core quiz does not require an email address. Optional email capture appears only after the free result, so users can receive a fuller profile without blocking the basic experience.',
      'Aggregate result and share analytics should be used to improve content, localization, and product quality. They should not be used to claim that an entire country, industry, or group has one fixed temperament.',
    ],
  },
  {
    type: 'section',
    title: 'How FourType relates to modern personality science',
    body: [
      'The four temperaments come from an ancient framework, not modern medicine. FourType uses the terms as practical self-reflection language while separating them from obsolete bodily-fluid claims.',
      'Modern trait systems such as the Big Five are more research-backed for formal personality measurement. Temperament remains useful when handled as a simple map for stress response, emotional pace, communication, and relationship patterns.',
    ],
  },
]
```

- [ ] **Step 3: Update methodology FAQ**

Replace methodology `faq` with:

```ts
faq: [
  { question: 'How is the FourType temperament test scored?', answer: 'FourType maps each answer toward Choleric, Sanguine, Melancholic, or Phlegmatic tendencies, then reads the top score, secondary score, and overall spread.' },
  { question: 'Why does score spread matter?', answer: 'Score spread shows how dominant or blended your result is. A close spread needs more nuance than a result where one temperament is clearly ahead.' },
  { question: 'Is FourType a clinical assessment?', answer: 'No. FourType is an educational self-reflection tool. It should not be used for diagnosis, employment screening, or clinical decisions.' },
  { question: 'Does FourType claim the ancient four humors are medically true?', answer: 'No. FourType uses the temperament names as practical personality language and does not treat ancient bodily-fluid theory as modern medical science.' },
  { question: 'Why does FourType ask 40 questions?', answer: 'A 40-question format gives enough room to compare behavior across pressure, motivation, communication, conflict, and recovery without making the quiz feel like a formal assessment.' },
]
```

- [ ] **Step 4: Update internal guide links**

Add this link near the top of `coreGuideLinks` after `/temperament-test`:

```ts
{ href: '/blog/best-temperament-test', title: 'Best Temperament Test', description: 'Compare FourType with other temperament tests before choosing a quiz.' },
```

Add this link to `methodologyGuideLinks` after `/methodology`:

```ts
{ href: '/blog/best-temperament-test', title: 'Best Temperament Test', description: 'Compare FourType, OSPP, IDRlabs, Truity, JobCannon, and other tests.' },
```

- [ ] **Step 5: Run TypeScript**

Run: `pnpm exec tsc --noEmit`

Expected: exit code `0`.

- [ ] **Step 6: Commit Task 3**

```bash
git add lib/seo-content.ts
git commit -m "Add best temperament test authority content"
```

---

### Task 4: Verification, Build, Push, and Production Smoke Test

**Files:**
- No new source files expected beyond previous tasks.

**Interfaces:**
- Consumes: completed Tasks 1-3.
- Produces: pushed commit with production-verified routes.

- [ ] **Step 1: Run TypeScript**

Run:

```bash
pnpm exec tsc --noEmit
```

Expected: exit code `0`.

- [ ] **Step 2: Run production build**

Run:

```bash
node node_modules/next/dist/bin/next build
```

Expected: build exits `0` and includes `/blog/[slug]`, `/methodology`, `/quiz`, `/sitemap.xml`, `/ai-seo-manifest.json`, and `/llms.txt`.

- [ ] **Step 3: Start local server**

Run:

```bash
node node_modules/next/dist/bin/next start -p 3018
```

Expected: server reports ready at `http://localhost:3018`.

- [ ] **Step 4: Smoke-test local routes**

Run:

```bash
curl -s -o /tmp/fourtype-best-test.html -w '%{http_code} %{size_download}\n' http://127.0.0.1:3018/blog/best-temperament-test
curl -s -o /tmp/fourtype-best-test.md -w '%{http_code} %{size_download}\n' http://127.0.0.1:3018/md/blog/best-temperament-test
curl -s -o /tmp/fourtype-methodology.html -w '%{http_code} %{size_download}\n' http://127.0.0.1:3018/methodology
curl -s -o /tmp/fourtype-quiz.html -w '%{http_code} %{size_download}\n' http://127.0.0.1:3018/quiz
curl -s http://127.0.0.1:3018/sitemap.xml | rg 'best-temperament-test'
curl -s http://127.0.0.1:3018/ai-seo-manifest.json | rg 'best-temperament-test'
curl -s http://127.0.0.1:3018/llms.txt | rg 'Best Temperament Test'
```

Expected:

- First four commands return HTTP `200`.
- Sitemap includes `https://www.fourtype.com/blog/best-temperament-test`.
- AI manifest includes `/blog/best-temperament-test`.
- `llms.txt` includes `Best Temperament Test`.

- [ ] **Step 5: Stop local server**

Send Ctrl-C to the running server session.

- [ ] **Step 6: Push**

Run:

```bash
git status --short
git push
```

Expected: `git status --short` is empty before push or only expected generated files are removed first. Push exits `0`.

- [ ] **Step 7: Production smoke test**

After deployment is ready, run:

```bash
curl -s -o /tmp/prod-best-test.html -w '%{http_code} %{size_download}\n' https://www.fourtype.com/blog/best-temperament-test
curl -s https://www.fourtype.com/sitemap.xml | rg 'best-temperament-test'
curl -s https://www.fourtype.com/ai-seo-manifest.json | rg 'best-temperament-test'
curl -s https://www.fourtype.com/llms.txt | rg 'Best Temperament Test'
curl -s -o /tmp/prod-methodology.html -w '%{http_code} %{size_download}\n' https://www.fourtype.com/methodology
curl -s -o /tmp/prod-quiz.html -w '%{http_code} %{size_download}\n' https://www.fourtype.com/quiz
```

Expected:

- New article, methodology, and quiz return HTTP `200`.
- Sitemap, AI manifest, and `llms.txt` include the new comparison article.

- [ ] **Step 8: Final report**

Report:

- Commit hashes.
- Verification commands run.
- Production URLs checked.
- Note that the broader goal of top ranking remains active because ranking changes require indexing, time, and external SERP evidence.

