# FourType compare, analytics, and language loop

## Goal

Improve FourType's growth loop after the quiz result by making results easier to compare with friends, making share/copy behavior measurable, upgrading the saved-profile email, and adding an honest language-expansion SEO page.

## Shipped

- Move share-id encode/decode into a reusable helper so result pages and compare links use the same format.
- Add a `?compare=` quiz path that lets a friend take the quiz and see a short compatibility interpretation against the original sharer.
- Add client event tracking for result views, compare result views, share clicks, and copy-link actions.
- Add a Google Sheets-backed `/api/events` endpoint with a separate `Events` tab target.
- Upgrade the profile email into a mini-report with subtype link, pressure pattern, communication note, growth move, share prompts, and compare link.
- Add a `temperament-test-languages` blog article for Chinese, Spanish, and next-language expansion strategy.

## Verification

- Run TypeScript checks.
- Run a production build.
- Smoke-test `/quiz?compare=...`, `/share/...`, `/api/events`, and the new blog route locally.
- Deploy and check production routes after Vercel finishes.
