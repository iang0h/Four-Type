# Task 5 Report: Stripe Test Catalog and Secure Checkout

## RED / GREEN

- RED: `tests/field-guide-checkout.test.ts` failed because the Stripe helper did not exist.
- RED: the preview interaction regression failed because swipe handlers were attached to a container that included the arrow controls.
- RED: the campaign content test failed because the supporter-tier shell was still disabled.
- GREEN: focused checkout, content, and interaction tests passed (14 tests).
- GREEN: full suite passed (30 tests); `pnpm exec tsc --noEmit` and `pnpm build` completed successfully.

## Dependency Change

- Added `stripe` `22.3.2`; `@vercel/blob` was already present and unchanged.

## Security Checks

- Browser sends only allowlisted `tier` and `currency` keys to `/api/field-guide/checkout`.
- Server maps those keys to configured Price IDs and creates the exact one-time Checkout payload with fixed metadata and success/cancel URLs.
- Stripe SDK usage remains server-route-only and rejects every secret that does not start with `sk_test_`.
- Successful API responses contain only `{ url }`; invalid input returns bodyless `400`, and unavailable configuration returns bodyless `503`.
- No secret, customer, payment, Price ID, or Checkout object is sent to analytics or logged by the checkout path.
- Currency is explicitly selected and session-persisted; no geolocation, add-on, or upsell selection is used.
- Preview swipe listeners now attach only to image buttons, so a gesture beginning on an arrow cannot produce an additional navigation.

## External Credential Status

- No `STRIPE_SECRET_KEY` was available locally.
- No Stripe network call, product, price, customer, Checkout Session, charge, deployment, or publication was performed.
- The catalog script was exercised with a non-test placeholder key and rejected it before any network operation. Test catalog creation remains blocked until a valid `sk_test_` key is supplied.

## Files and Tests

- Added secure Stripe helper, allowlisted checkout route, client checkout button, supporter-tier selector, test-catalog script, and checkout tests.
- Updated Field Guide campaign/CSS and preview interaction handling.
- Browser smoke: MYR selection persisted across reload, exact MYR price rendered, missing-config checkout showed the recoverable message, and no console errors appeared.
- Route smoke: unsupported selection returned `400`; missing configuration returned `503`.

## Concerns

- `pnpm lint` remains unavailable because the repository has no ESLint executable/configuration; scope was not broadened to add one.
- Next.js warns that the parent workspace lockfile is inferred as the Turbopack root. The production build still completed successfully.
