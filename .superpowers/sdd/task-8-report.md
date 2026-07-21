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
