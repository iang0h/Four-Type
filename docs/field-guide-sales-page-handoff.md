# Field Guide Sales Page Handoff

Date: 2026-07-21

## Release State

The Field Guide supporter campaign is implemented locally at `/field-guide`. It presents FourType as a contextual reflective framework, keeps the free quiz available, and uses supporter language rather than charitable, investment, or diagnostic claims. No deployment, publication, live checkout, live charge, Stripe object creation, Blob upload, or provider email was performed for this handoff.

The campaign message is "Help more people read the room." Supporters receive digital rewards after server-side payment verification. The page states that the framework is for reflection and conversation and must not be used to diagnose, rank, hire, exclude, or permanently label people.

## Supporter Tiers

| Tier | USD | MYR | Included rewards |
| --- | ---: | ---: | --- |
| Field Guide Supporter | US$12 | RM39 | Complete 144-page PDF, reflowable EPUB, immediate secure access after verified payment, personal-use license |
| Founding Supporter | US$25 | RM79 | Field Guide rewards plus printable worksheet pack and Edition 1 revisions; personal-use license |

The Founding level is voluntary additional support. "Edition 1 revisions" means revised files in this edition only, not future editions, every future book, or a publication schedule.

## Routes And Components

Campaign routes:

- `/field-guide`
- `/field-guide/success`
- `/field-guide/cancelled`
- `/field-guide/access`
- `POST /api/field-guide/checkout`
- `POST /api/field-guide/webhook`
- `POST /api/field-guide/request-access`
- `GET /api/field-guide/download/[asset]`

Campaign components:

- `InteractiveBook`, `FourTypeCompass`, `BookPreview`, and `SupporterTiers`
- `CheckoutButton`, `SupporterDownloads`, and `SupporterAccessRequest`
- `PolicyLinks`, `CancelledTracker`, and `CampaignAnalytics`

The checkout route accepts only allowlisted tier and currency selections. It derives configured prices on the server and returns only a redirect URL. The webhook verifies the raw signed event, accepts paid completion and asynchronous success events, and fulfills idempotently. Access and download routes require valid signed entitlement scope; download URLs are single-object private URLs capped at 15 minutes.

## Approved Release

Release ID: `field-guide-edition-1-20260721`.

| Asset | SHA-256 | Eligible tiers |
| --- | --- | --- |
| PDF | `18aa32b98edd6c2e53d510d3aa660811177f0a63b62a0d7c370340649e974617` | Field Guide, Founding |
| EPUB | `f1b3ecdf1ba442f02c6ba37018de4748205584ec3d3659cc60dcf534d924b850` | Field Guide, Founding |
| Worksheets | `153a9683e15687ba53c97ba59e2c5446d5e7a18dfe2666f94c382db64e1b3d6f` | Founding only |

`upload_release.mjs --dry-run` re-read all three local reward files and verified these hashes with exit code 0. The real upload was not run because no approved Blob credential is available.

Public output contains the cover, social artwork, and approved preview derivatives only. The final public-asset audit passed after the production build. It scans `public/` and static build output for complete reward files and credential-shaped content, server build output for credential-shaped content, and non-ignored production text sources including JSON; Markdown is outside that command's scan scope.

## Stripe Catalog And Configuration

The test catalog script defines these product names:

- `FourType Field Guide Supporter`
- `FourType Founding Supporter`

It uses these local configuration names for the four approved test-mode prices, without recording IDs in the repository or this handoff:

- `STRIPE_FIELD_GUIDE_USD_PRICE_ID`
- `STRIPE_FIELD_GUIDE_MYR_PRICE_ID`
- `STRIPE_FOUNDING_SUPPORTER_USD_PRICE_ID`
- `STRIPE_FOUNDING_SUPPORTER_MYR_PRICE_ID`

Required service configuration names:

- `NEXT_PUBLIC_SITE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `BLOB_READ_WRITE_TOKEN`
- `FOURTYPE_ACCESS_TOKEN_SECRET`
- `RESEND_API_KEY`
- `FOURTYPE_EMAIL_FROM`

Optional email configuration:

- `FOURTYPE_EMAIL_REPLY_TO`

Policy decision configuration, currently unset in this worktree:

- `FOURTYPE_REFUND_POLICY_URL`
- `FOURTYPE_PRIVACY_URL`
- `FOURTYPE_TERMS_URL`
- `FOURTYPE_CONTACT_URL`

Current policy behavior is deliberately fail-closed: each absent setting is shown as honest plain text, not a dead link. The refund fallback makes no refund promise.

## Private Delivery Model

Reward files stage outside `public/` and are uploaded as immutable private Blob objects. Entitlements are private JSON records keyed by a hash of the Checkout Session identifier; the email index uses an HMAC-derived pathname. Neither raw customer addresses nor raw session identifiers are used in Blob paths.

After payment verification, the server creates or repairs the entitlement idempotently, sends a private `/field-guide/access` link, and records delivery state with provider idempotency and payload digests rather than raw link or email content. Re-access always returns the same generic response, then schedules lookup/delivery after the response. It does not disclose whether an address has records. The Field Guide tier sees PDF and EPUB; Founding also sees worksheets. Tampered, expired, or out-of-scope links reveal no files.

## Local Verification

Fresh Task 11 checks used the repository's bundled Node runtime because the inherited shell PATH omitted `node`.

- `pnpm lint`: exit 0 with 77 existing repository warnings and no errors.
- `pnpm exec tsc --noEmit`: exit 0.
- `pnpm test`: exit 0, 125 passing tests.
- `pnpm build`: exit 0 after moving an ignored stale `.next` directory containing `.DS_Store` to a temporary backup. Next reported the existing multiple-lockfile workspace-root warning and an Edge runtime static-generation notice.
- `pnpm exec playwright test`: exit 0, 7 Chromium tests. These cover keyboard controls, focus, responsive containment, mobile preview navigation, reduced motion, fixed-nav preview target clearance, and the three captures below.
- `node scripts/field-guide/audit_public_assets.mjs`: exit 0.
- `git diff --check`: run again after documentation changes before commit; recorded in the validation JSON.

Stable screenshot evidence:

- [Mobile 320 px](field-guide-evidence/field-guide-320.png)
- [Tablet 768 px](field-guide-evidence/field-guide-768.png)
- [Desktop 1440 px](field-guide-evidence/field-guide-1440.png)

Visual review of these captures found the preview legible and framed at each size, with no clipped content or navigation overlap.

## Provider Checks: Blocked, Not Passed

No approved test-mode Stripe credential or Blob credential is available in this environment. The catalog command was run with `STRIPE_SECRET_KEY` explicitly unset; it exited 1 before network activity, proving the missing-key guard. It did not create test products or prices. The private upload dry run passed locally; the real upload and unauthenticated Blob URL check were not run.

Consequently, all external test-mode scenarios remain **BLOCKED**, not passed: four price/tier purchases, cancellation, invalid or unpaid Session handling against Stripe, duplicate and asynchronous webhook delivery against Stripe, temporary Blob failure plus retry, tier download scope against Blob, tampered/expired access against production adapters, and real re-access email delivery. Unit tests exercise the corresponding local contracts and fail-closed behavior, but are not a substitute for provider integration.

An exposed live Stripe secret must be revoked and rotated. It was not used or stored during this task. Secure non-production credentials are required before any integration check can be marked passed.

## Safe Live Transition Checklist

1. Obtain explicit approval for production release and a separate reviewed production credential model. The current Stripe client intentionally rejects live credentials; do not place a live key in the current test-only configuration.
2. Create live products and the four live prices with the approved tier names, amounts, currencies, and lookup keys. Store only their IDs in the production secret configuration named above.
3. Create a new live webhook endpoint secret for `/api/field-guide/webhook`; configure the production endpoint with the paid completion and asynchronous success events.
4. Configure production private Blob/OIDC access, with write/read/signing permissions limited to the release and entitlement namespaces. Do not make reward objects public.
5. Upload the release only after rerunning the local hash verifier and checking all three approved hashes; verify unauthenticated reward access is denied and signed URLs are one-path, short-lived GET URLs.
6. Configure approved first-party refund, privacy, terms, and contact URLs. Review their final legal and support copy before linking them.
7. With approved non-production credentials, execute and record every blocked integration scenario. Repeat the complete public-asset audit against the production build.
8. Only after explicit approval, run one low-value controlled live checkout, verify webhook fulfillment, scoped downloads, email/re-access behavior, and operational cleanup. Do not charge a real supporter as a test.
9. Deploy only after the controlled checkout evidence and policy decisions are approved. Monitor webhook failures, private storage errors, and delivery ambiguity without logging customer or secret data.
