# FourType Share Loop Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make shared FourType results more curiosity-driven so recipients feel invited to test whether FourType can read them too.

**Architecture:** Add one shared copy helper for share text and OG metadata, then update the result screen, share page, and dynamic OG route to use a consistent curiosity hook. Keep the quiz free and keep result sharing centered on the existing `/share/[id]` URL.

**Tech Stack:** Next.js App Router, React client components, `next/og` ImageResponse, existing FourType blend and temperament data.

## Global Constraints

- No new dependencies.
- Keep all share claims non-clinical and self-reflection oriented.
- Keep OG output 1200x630.
- Preserve existing share URL decoding format.
- Keep changes scoped to result sharing and OG previews.

---

### Task 1: Shared Viral Copy Helper

**Files:**
- Create: `lib/share-copy.ts`

**Interfaces:**
- Consumes: `Blend` from `lib/blends.ts`.
- Produces: `getShareHook(blend)`, `getShareText(blend, shareUrl)`, `getShareMetadata(heroName, blend)`.

- [ ] Create a helper that returns curiosity-led copy for native share, share pages, and OG metadata.
- [ ] Verify TypeScript imports compile.

### Task 2: Result and Share Page Copy

**Files:**
- Modify: `components/ResultsScreen.tsx`
- Modify: `app/share/[id]/SharePageClient.tsx`
- Modify: `app/share/[id]/page.tsx`
- Modify: `lib/quiz-i18n.ts`

**Interfaces:**
- Consumes: `getShareText`, `getShareMetadata` from Task 1.
- Produces: a result-page friend prompt and better native share text.

- [ ] Replace generic native share text with curiosity-led text.
- [ ] Add localized friend prompt near result share buttons.
- [ ] Update share page metadata to match the new promise.

### Task 3: Captivating Dynamic OG Image

**Files:**
- Modify: `app/api/og/route.tsx`

**Interfaces:**
- Consumes: `getShareMetadata` and existing `BLENDS`/character images.
- Produces: redesigned 1200x630 OG image with hook, result, insight chips, character art, and CTA.

- [ ] Redesign dynamic OG image as a personality dossier.
- [ ] Keep fallback image behavior for invalid blend keys.
- [ ] Verify `/api/og?blend=...&name=...` returns an image.

### Task 4: Verification and Commit

**Files:**
- Test changed files through existing build.

- [ ] Run `pnpm exec tsc --noEmit`.
- [ ] Run `node node_modules/next/dist/bin/next build`.
- [ ] Start local server and curl OG endpoint.
- [ ] Commit and push.
