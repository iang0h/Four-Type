# Task 8 Report: Secure Supporter Access

## Status

Implemented and verified in-process. No live Stripe key was supplied or used, and no Stripe, Resend, Blob, deployment, or publishing call was made.

## RED / GREEN

- RED: download authorization tests failed because the access policy module did not exist.
- GREEN: asset scope, token-to-path binding, current-release validation, entitlement lookup, and private URL issuance now pass.
- RED: renewal tests failed because the non-disclosing handler did not exist; a later regression test showed entitlement lookup still preceded the generic response.
- GREEN: input parsing is bounded, email normalization is strict, valid renewal lookup and delivery are scheduled after the fixed response, and padding is capped at a 20 ms envelope.
- RED: success access tests failed because no helper preserved immediate access after a post-payment email-delivery failure.
- GREEN: success always attempts authoritative fulfillment and renders only a matching current persisted entitlement.

## Implementation

- Added server-verified `/field-guide/success`, signed `/field-guide/access`, and calm `/field-guide/cancelled` states with accessible headings, controls, and return paths.
- Success bounds `session_id` before fulfillment. Invalid or unpaid sessions have no entitlement record and render no customer information or reward files.
- Access tokens are verified before entitlement lookup. The entitlement must match the token session and current release; only assets authorized by its tier receive short-lived download-route tokens.
- The renewal endpoint returns the same JSON and status for malformed, unknown, and known addresses. It validates a maximum 320-character normalized email, limits request bodies to 1 KiB, schedules lookup and delivery after the response, and caps padding at 20 ms rather than holding serverless invocations for a long delay.
- The download route accepts only approved asset keys, requires the HMAC download token to name the exact requested asset, rechecks entitlement, release, and tier, then returns a 303 to the exact private signed Blob GET URL. Blob URLs appear only in that redirect response and use the existing 15-minute maximum signer.
- Browser analytics records downloads as only `tier`, `currency`, and `asset`; renewal and cancelled events contain no customer, session, or token data. No code logs customer data, tokens, or secrets.
- Secret reads, Blob access, entitlement indexing, signing, and email preparation remain in `server-only` production adapters.

## Verification

- Focused: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsx --test tests/field-guide-download.test.ts tests/field-guide-fulfillment.test.ts` - 25 passed.
- TypeScript: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsc --noEmit` - passed with no diagnostics.
- Full suite: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm test` - 97 passed.
- Production build: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm build` - passed. The existing multi-lockfile workspace-root and edge-runtime static-generation warnings were emitted.
- Diff check: `git diff --check` passed with no whitespace errors.

## Namespace Follow-Up

- Fixed the re-access provider-attempt write to retain its `reaccess` purpose. The write now targets the same namespaced record that the claim read, preventing private-Blob ETag failures against the fulfillment namespace.
- Delivery purpose is explicit and runtime-validated for claim, provider attempt, claim release, and receipt completion. The internal writer requires the purpose argument, preventing a state transition from silently selecting a default namespace.
- Added a real in-memory Blob integration regression covering re-access claim -> provider-attempt digest -> receipt -> sent state. It verifies that only the re-access delivery pathname is written and no fulfillment delivery record appears.

### Namespace Follow-Up Verification

- Focused delivery suites: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsx --test tests/field-guide-delivery.test.ts tests/field-guide-fulfillment.test.ts tests/field-guide-reaccess.test.ts` - 28 passed.
- Full suite: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm test` - 108 passed.
- TypeScript: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsc --noEmit` - passed with no diagnostics.
- Production build: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm build` - passed. The pre-existing multi-lockfile workspace-root and edge-runtime static-generation warnings were emitted.
- Diff check: `git diff --check` passed with no whitespace errors.

## Review Remediation

Follow-up review findings were fixed with regression tests before implementation:

- Analytics now serializes only `window.location.pathname`. The `/api/events` boundary independently extracts a pathname from any supplied relative or absolute URL, strips query strings and fragments, rejects sensitive query-like values and embedded email-shaped values from persisted text fields, and ignores unrecognized request keys. Event append errors are not logged.
- The event handler is dependency-injectable for route-to-persistence tests. Tests prove `?token=` and `?session_id=` never reach the persisted payload, and customer-facing event/lead routes do not log caught errors that might contain email, token, or session data.
- Re-access delivery now reuses the durable Task 7 claim, provider-attempt digest, release, and receipt workflow under a distinct `reaccess` delivery purpose and idempotency-key prefix. Its private records use a separate hashed namespace and never store a raw email, token, or email body.
- Re-access requests obtain a concurrency-safe, HMAC-keyed private 15-minute cooldown before work is scheduled. Concurrent requests yield one logical delivery per matching entitlement; cooldown, unknown, transport-failure, malformed, cross-origin, and non-JSON cases retain the same generic `200` response body. Failed and ambiguous delivery claims remain recoverable through the durable delivery state.
- The request endpoint now requires `application/json`, bounds body parsing to 1 KiB, accepts a missing `Origin` for non-browser/same-origin callers, and rejects any supplied `Origin` that does not exactly match configured canonical `NEXT_PUBLIC_SITE_URL`; it never trusts `Host`.

### Review Verification

- Focused privacy/re-access suites: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsx --test tests/analytics-privacy.test.ts tests/analytics.test.ts tests/field-guide-download.test.ts tests/field-guide-reaccess.test.ts tests/field-guide-delivery.test.ts` - 31 passed.
- Full suite: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm test` - 106 passed.
- TypeScript: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsc --noEmit` - passed with no diagnostics.
- Production build: after moving aside stale ignored `.next` output that caused an `ENOTEMPTY` cleanup error, `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm build` - passed. The pre-existing multi-lockfile workspace-root and edge-runtime static-generation warnings were emitted.
- Diff check: `git diff --check` passed with no whitespace errors.
