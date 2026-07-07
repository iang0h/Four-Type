# FourType Authority and Comparison Layer Design

## Goal

Move FourType closer to becoming the top-ranking website for "temperament test" by strengthening the signals Google and users use to trust a quiz site: clear methodology, transparent limits, comparison against alternatives, visible proof, and stronger internal routing from broad search intent into the quiz.

This design does not claim instant top ranking. It creates the next compounding layer needed to compete with older and more authoritative domains such as OSPP, IDRlabs, Truity, JobCannon, TemperamentQuiz.com, and exact-match temperament-test sites.

## Current Context

FourType already has strong assets:

- A live 40-question temperament quiz.
- Main SEO pages for "temperament test," "four temperaments test," "temperament quiz," and related terms.
- Blog clusters for compatibility, work, subtype, comparison, rarity, accuracy, and personality-test alternatives.
- Chinese and Spanish localized routes.
- Share pages, OG images, friend comparison links, email capture, and optional profile emails.
- Markdown mirrors, sitemap entries, AI manifest, FAQ schema, Quiz schema, Article schema, and internal link hubs.

The current gap is not raw content volume. The next gap is trust and decision support: why should a user, search engine, or AI answer engine choose FourType over older tests?

## SERP Observations

The current "temperament test" landscape includes:

- OSPP: older open-source psychometrics framing with development/scoring credibility.
- IDRlabs: professional and academic review framing, references, and scientific positioning.
- Truity: high authority and usage proof with a broader personality-test library.
- JobCannon: modern multi-test hub with fast quiz positioning and related assessments.
- TemperamentQuiz.com: share/compare positioning and a strong usage claim.
- Exact-match domains: simple keyword relevance and test-first landing pages.

FourType can compete by being the best modern, honest, useful Four Temperaments experience: free, no signup for core results, rich subtype profiles, practical relationship/work insights, multilingual direction, and shareable compare flows.

## Recommended Approach

Build an authority and comparison layer that makes FourType easier to trust and easier to choose.

### 1. Trust Proof Component

Add a reusable trust/proof block for quiz, SEO pages, and blog pages.

Content should include:

- Free core result.
- No signup required for the quiz result.
- 40 behavior-based questions.
- Score spread across all four temperaments.
- 15 FourType blends and subtype direction.
- 50,000+ people tested.
- Self-reflection tool, not a clinical diagnosis.
- Optional email profile only after the result.

Placement:

- Near the top of `/quiz`, below the first screen or SEO intro.
- Near CTA sections on dynamic SEO pages.
- Near the top CTA on high-intent blog articles.

The component should be concise. It should support trust without making the page feel defensive.

### 2. Best Temperament Test Comparison Page

Add a high-intent SEO page or article at:

- Preferred route: `/blog/best-temperament-test`

Target terms:

- best temperament test
- best free temperament test
- best four temperaments test
- temperament test comparison
- FourType vs OSPP
- FourType vs IDRlabs temperament test

Content structure:

- Explain what makes a temperament test useful.
- Compare FourType, OSPP, IDRlabs, Truity, JobCannon, TemperamentQuiz.com, and simple exact-match quiz sites.
- Use fair comparison criteria:
  - Free core result.
  - Number of questions.
  - Score spread or single result.
  - Subtype/blend support.
  - Relationship/work insights.
  - Methodology transparency.
  - Clinical overclaim restraint.
  - Share/compare features.
  - Multilingual support.
- Recommend FourType for users who want practical self-understanding, subtype depth, and shareable results.
- Recommend OSPP/IDRlabs for users who want psychometrics-oriented framing.
- Recommend Truity for users who want broad personality-test ecosystem.

Avoid attacking competitors. The tone should be confident, fair, and useful.

### 3. Methodology Upgrade

Improve `/methodology` so it feels like a serious source, not a thin explainer.

Add or strengthen:

- Why FourType uses behavior-based questions.
- Why answers are scored across four temperaments instead of forcing a single label.
- How primary, secondary, pure, and blended results are interpreted.
- What FourType does not claim:
  - Not clinical.
  - Not a hiring assessment.
  - Not a diagnosis.
  - Not proof of fixed identity.
- Data/privacy note:
  - Core quiz does not require email.
  - Optional email capture is after result.
  - Aggregated analytics should be used for product/content improvement, not population claims.
- References and context:
  - Historical four temperaments.
  - Eysenck-style two-axis mapping as related context.
  - Big Five as the more research-backed trait framework.
  - Responsible self-reflection framing.

The page should make FourType look more careful than sites that overclaim accuracy.

### 4. Author and Reviewer Signal

Add a reusable "About FourType" or "Editorial Note" block to high-intent pages.

Minimum version:

- "FourType is created by Ian Goh as a self-reflection and personality media project."
- "The model is educational, not clinical."
- "Pages are written to distinguish ancient temperament language from modern personality science."
- Link to `/methodology`.

Future stronger version:

- Add a real reviewer when available.
- Add an editorial policy page.
- Add citations and update history.

This phase should not invent credentials or fake review claims.

### 5. Internal Link Routing

Strengthen routing from the new comparison layer into existing authority pages:

- `/blog/best-temperament-test` links to:
  - `/quiz`
  - `/temperament-test`
  - `/methodology`
  - `/blog/temperament-test-accuracy`
  - `/blog/temperament-test-questions`
  - `/blog/personality-test-vs-temperament-test`
  - `/blog/best-free-four-temperaments-test`
- Core pages link back to `/blog/best-temperament-test` where relevant.

This creates a tight cluster around "which temperament test should I use?"

## Architecture

Use the existing content system where possible.

### New/Updated Files

- `components/TrustProof.tsx`
  - Reusable trust/proof grid or compact strip.
- `components/EditorialNote.tsx`
  - Reusable author/responsible-use note.
- `lib/seo-content.ts`
  - Add `best-temperament-test` blog article.
  - Add related links into relevant guide clusters.
  - Potentially enrich the methodology page blocks.
- `app/(seo)/[slug]/page.tsx`
  - Render trust/editorial blocks for selected SEO pages.
- `app/blog/[slug]/page.tsx`
  - Render trust/editorial blocks for selected blog pages.
- `app/quiz/page.tsx`
  - Add compact trust proof near quiz SEO section or below initial screen.

No new persistence layer is needed.

## Data Flow

The comparison article is static content from `lib/seo-content.ts`.

The trust and editorial components are static React components. They should not fetch data. They may accept props to adjust compact/full display, but should keep copy centralized enough to avoid drift.

The dynamic page renderers decide whether to show trust/editorial blocks based on article/page slug or a small allowlist.

## SEO and Schema

Existing dynamic blog rendering already provides:

- Metadata.
- Open Graph.
- BlogPosting schema.
- FAQ schema.
- Breadcrumb schema.
- Related guide ItemList schema.
- Sitemap inclusion.
- Markdown mirror.
- AI manifest inclusion.

The new comparison article should include FAQ entries for:

- What is the best temperament test?
- Is FourType better than OSPP or IDRlabs?
- What should a free temperament test include?
- Is a temperament test scientifically validated?

Methodology updates should keep the existing Article schema and FAQ schema behavior.

## UX Guidelines

- Keep trust proof compact and scannable.
- Avoid making pages feel like a legal disclaimer.
- Do not bury the quiz CTA.
- Use clear labels like "Free core result," "No signup required," "40 questions," "Score spread," and "Not clinical advice."
- The comparison article should feel like a buyer's guide, not a sales page.

## Error Handling

No runtime error handling is expected because the feature is static.

If an article or SEO page slug is missing, existing `notFound()` behavior remains.

## Testing and Verification

Run:

- `pnpm exec tsc --noEmit`
- `node node_modules/next/dist/bin/next build`

Smoke-test locally:

- `/blog/best-temperament-test`
- `/blog/best-temperament-test.md`
- `/methodology`
- `/quiz`
- `/sitemap.xml`
- `/ai-seo-manifest.json`
- `/llms.txt`

Production checks after deploy:

- New route returns 200.
- New route appears in sitemap.
- Markdown mirror works.
- Quiz and methodology routes still return 200.

## Rollout Notes

This is one layer in a longer ranking push. It should be followed by:

- Real author/reviewer profile if available.
- More localized high-intent pages after Chinese and Spanish routes mature.
- Outcome data content once analytics has enough clean samples.
- Potential multi-test expansion only after the temperament core is stronger.

