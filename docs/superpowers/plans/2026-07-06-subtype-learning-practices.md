# Subtype Learning Practices Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add practical learning practices and maturity levels to all 16 FourType subtype pages.

**Architecture:** Extend `lib/subtypes.ts` with a generated `getSubtypeLearningGuide(subtype)` helper that combines primary temperament guidance with secondary influence. Render the guide in `app/subtype/[slug]/SubtypePageClient.tsx` using the existing card system and subtype color.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, lucide-react.

## Global Constraints

- No new dependencies.
- Do not change quiz scoring.
- Do not remove existing Know Thyself content.
- Keep language educational and self-reflective.
- Preserve current subtype page layout and SEO URLs.

---

### Task 1: Add Learning Guide Data Generator

**Files:**
- Modify: `lib/subtypes.ts`

**Interfaces:**
- Produces: `SubtypeLearningGuide` interface
- Produces: `getSubtypeLearningGuide(subtype: Subtype): SubtypeLearningGuide`

- [ ] **Step 1: Add TypeScript interfaces**

Add `SubtypeLearningGuide` and `MaturityExpression` near the existing `KnowThyselfInsight` interface.

- [ ] **Step 2: Add primary temperament learning data**

Add a private map keyed by primary temperament with daily, relationship, work, stress, journal, weekly watch, immature, balanced, and mature copy.

- [ ] **Step 3: Add exported generator**

Create `getSubtypeLearningGuide(subtype)` that combines primary and secondary temperament language and returns the guide.

- [ ] **Step 4: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no TypeScript errors.

### Task 2: Render Learning Guide On Subtype Pages

**Files:**
- Modify: `app/subtype/[slug]/SubtypePageClient.tsx`

**Interfaces:**
- Consumes: `getSubtypeLearningGuide(subtype: Subtype): SubtypeLearningGuide`

- [ ] **Step 1: Import helper and icons**

Import `getSubtypeLearningGuide` plus lucide icons for practice cards.

- [ ] **Step 2: Compute guide in page component**

Add `const learningGuide = getSubtypeLearningGuide(subtype)` beside the existing `knowThyself` constant.

- [ ] **Step 3: Render a “Practice This Type” section**

Add the section after Know Thyself with six compact practice cards and a maturity ladder.

- [ ] **Step 4: Build**

Run: `node node_modules/next/dist/bin/next build`
Expected: build completes successfully.

### Task 3: Smoke Test And Commit

**Files:**
- Verify: `/subtype/pure-choleric`
- Verify: `/subtype/sanguine-melancholic`
- Verify: `/subtype/phlegmatic-melancholic`

- [ ] **Step 1: Start production-mode server locally**

Run: `pnpm start -- --hostname 127.0.0.1 --port 4187`
Expected: server listens on port `4187`.

- [ ] **Step 2: Curl smoke pages**

Run each URL and check for `Practice This Type`, `How This Type Matures`, and `Journal Prompt`.
Expected: each page returns `200 text/html` and contains all markers.

- [ ] **Step 3: Stop local server**

Stop the background server cleanly.

- [ ] **Step 4: Commit changes**

Commit message: `Add subtype learning practices`
