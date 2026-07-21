# Task 7 Report: Secure Field Guide Fulfillment

## Status

Implemented and verified in-process. No Stripe, Resend, or Vercel Blob network call was made, and no live Stripe secret was requested or used.

## RED / GREEN

- RED: the focused test command initially could not resolve `node` from the `tsx` shim because the Codex runtime Node bin directory was absent from `PATH`.
- RED: after adding only the existing Codex runtime Node bin directory to the command environment, the focused suites failed because `lib/field-guide/fulfillment` and `lib/field-guide/webhook` did not exist.
- GREEN: focused fulfillment and webhook tests passed with 9 tests after implementing the injected domain handlers, server-only production adapter, email message, and route composition.
- RED: review regression tests showed failed or skipped email delivery could leave fulfillment reported as complete, duplicate entitlement reads skipped email-index repair, and webhook configuration failures could be classified as bad signatures.
- GREEN: focused transport, delivery, fulfillment, and webhook tests passed with 18 tests after durable delivery claims, receipt persistence, server-only email wrappers, and explicit configuration handling were added.

## Implementation

- `fulfillFieldGuideCheckout` retrieves the Checkout Session with line items through injected dependencies, requires `payment_status === 'paid'`, and validates the exact product, tier, currency, release ID, currency field, quantity, and configured Price ID before writing an entitlement.
- Existing entitlements always flow through `writeEntitlement`, including retries, so its duplicate path repairs a partial email index before fulfillment continues.
- Fulfillment returns only a bounded status object. It does not log or return customer, payment, Price, session, token, or Blob data.
- The private delivery record uses a hashed session pathname and `pending`, `sending`, and `sent` states. ETag-protected claims permit one current sender, release failed or skipped delivery for retry, and reclaim stale in-progress claims after five minutes.
- A session-derived, hashed Resend `Idempotency-Key` remains stable across retries. The provider message ID is persisted only after a successful provider response; raw access tokens are neither persisted nor logged. Access-token expiry derives from the original entitlement timestamp so retry payloads remain stable.
- The webhook reads the raw request body, requires `stripe-signature`, verifies it through `stripe.webhooks.constructEvent`, handles only completed and async-payment-succeeded Checkout events, returns bodyless `400` for invalid signatures, `200` for unrelated verified events, and bodyless retryable `500` for missing configuration or fulfillment failures.
- Production Stripe, Blob, token-secret, and email delivery composition is isolated in `lib/field-guide/fulfillment-server.ts`, `lib/field-guide/email-server.ts`, and `lib/email-delivery-server.ts`; each secret-reading module begins with `import 'server-only'`. The webhook route uses the Node.js runtime.
- The existing Resend helper is split into a pure transport contract and a server-only configuration wrapper. `sendProfileEmail` preserves its recipient, payload, skipped-config result, and successful no-receipt behavior.
- Supporter emails state the supporter tier and eligible rewards, use only `/field-guide/access?token=...`, include personal-use terms, and reject direct Blob URLs.

## Delivery Semantics

- Application-visible fulfillment is exactly-once after a persisted `sent` receipt: concurrent calls cannot claim a second active send, and sequential retries reuse the same provider idempotency key.
- Resend documents idempotency for matching `POST /emails` requests for 24 hours. A process failure after provider success but before the receipt write is therefore at-least-once at transport level, with retries deduplicated during that provider window. After the provider key expires, absolute forever-exactly-once transport semantics are not available without a provider-side lookup; this implementation does not claim them.

## Verification

- Focused review regression tests: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsx --test tests/email-transport.test.ts tests/field-guide-delivery.test.ts tests/field-guide-fulfillment.test.ts tests/field-guide-webhook.test.ts` - 18 passed.
- TypeScript: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm exec tsc --noEmit` - passed with no diagnostics.
- Full suite: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm test` - 72 passed.
- Production build: `PATH=/Users/iangoh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH pnpm build` - passed. The existing multi-lockfile workspace-root warning and edge-runtime static-generation warning were emitted.
- Diff check: `git diff --check` passed with no whitespace errors.

## External Services

- No `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, Resend configuration, or Blob credential was supplied or read for a network operation.
- No Stripe customer, Checkout Session, charge, webhook forwarding, Resend message, Blob read/write, deployment, or publication occurred.
