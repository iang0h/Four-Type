# Subtype Learning Practices Design

## Goal

Help FourType visitors learn from their subtype instead of only recognizing it. Every subtype page should teach one practical way to mature, relate, work, and reset under stress.

## Scope

Add a generated learning layer for all 16 subtype pages:

- Personal growth practice
- Relationship practice
- Work practice
- Stress reset
- Journaling question
- Weekly pattern to watch
- Immature, balanced, and mature expressions of the subtype

## Approach

Keep the content generated from the existing subtype primary and secondary temperament data. This avoids maintaining 16 fully separate blocks while still making each page feel specific. The generated copy should stay warm, useful, and slightly piercing, with no clinical or diagnostic claims.

## UI

Render the new section after the current Know Thyself block on `/subtype/[slug]`. Use the existing dark card style, subtype accent color, short labels, and scannable cards. The section should feel like a practical next step, not a separate article.

## Constraints

- No new dependencies.
- Do not change quiz scoring.
- Do not remove existing Know Thyself content.
- Keep language educational and self-reflective.
- Preserve current subtype page layout and SEO URLs.

## Verification

- TypeScript must pass.
- Next build must pass.
- Smoke-check at least three subtype pages, including a pure type and two blended types.
