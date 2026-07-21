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

## Review Remediation Evidence

### RED / GREEN

- RED: focused checkout tests failed because the extracted pure checkout and route helpers did not yet exist, and the supporter currency controls did not expose an explicit accessible group.
- GREEN: `pnpm exec tsx --test tests/field-guide-checkout.test.ts tests/field-guide-content.test.ts` passed all 14 focused tests.
- GREEN: `pnpm test` passed all 37 tests; `pnpm exec tsc --noEmit` passed with no diagnostics.
- GREEN: `pnpm build` completed successfully. The first build encountered an ignored Finder-created `.next/server/.DS_Store` cleanup conflict; moving only that generated `.next` directory aside and rebuilding succeeded.

### Dependency Changes

- Added `server-only` `0.0.1` to make the required production `import 'server-only'` boundary resolvable. Stripe remains pinned at `22.3.2`.

### Security Checks

- `lib/field-guide/stripe.ts` now begins with `import 'server-only'`; Stripe construction and secret-key validation remain in that server-only module.
- Checkout construction is pure and dependency-injected for tests. The production wrapper still obtains Stripe only through the guarded module and rejects non-`sk_test_` keys.
- The route no longer reads `request.url`, `Host`, or request origin to form redirects. It uses only `NEXT_PUBLIC_SITE_URL`, validates URL, host, credentials, path, query, hash, and protocol, requires HTTPS for non-local hosts, and permits HTTP only for `localhost` or `127.0.0.1`.
- Missing or invalid canonical configuration produces a bodyless `503`; malformed JSON and unsupported tier/currency produce a bodyless `400`.
- The handler returns only `{ url }` on success. Browser selection remains tier/currency-only; no amount or Price ID is accepted from the browser.
- The catalog resolves each tier's product once, caches it before its two prices, and processes the approved prices in fixed sequence.

### Route and Browser Smoke

- Local development server: `NEXT_PUBLIC_SITE_URL=http://localhost:3010 pnpm dev --port 3010`.
- Route smoke: malformed JSON returned `400` with 0 body bytes; unsupported selection returned `400` with 0 body bytes; a valid selection sent with `Host: attacker.example` returned bodyless `503` because no Stripe key was configured, without using that host as a redirect origin.
- Browser smoke: Field Guide rendered one accessible `Choose checkout currency` group; MYR selected uniquely, updated pressed state, and remained selected after reload.
- Catalog guard: `STRIPE_SECRET_KEY=sk_live_placeholder node scripts/field-guide/create_stripe_test_catalog.mjs` exited 1 with the test-mode-key refusal before any network operation.

### External Credential Status

- No valid Stripe test key was available. No Stripe network request, external object creation, customer, Checkout Session, charge, deployment, or publication occurred.

### Self-Review

- Reviewed the checkout diff for request-controlled origin use, client-controlled amount/Price ID, logging, metadata drift, and response shape. None found.
- `git diff --check` completed without whitespace errors.
