# Field Guide OG Image and Sales Copy Design

## Goal

Increase click-through and purchase intent for `/field-guide` by making the social-preview image and opening sales copy lead with self-recognition: this book helps a reader notice a pattern in themselves and choose a better next move.

## Direction

Use a book-object-first 1200 x 630 Open Graph image. The real Field Guide cover is the primary object; the four FourType characters support the composition without making the asset feel like a quiz-result card.

Visible text in the image is limited to:

- FOURTYPE
- THE FIELD GUIDE
- See your pattern. Choose your next move.

The image must not contain price, CTA buttons, dense body copy, logos beyond FourType, or invented typography inside generated art. Build the scene as a branded raster composition from approved cover/character assets, then add final text in HTML/SVG/Canvas so it remains accurate and readable.

## Sales Copy

Replace the hero message with:

> Read the room. Widen your range.

Supporting copy:

> A practical, illustrated guide to the patterns that shape how you work, relate, react, and repair.

The opening sections should explain that the guide helps readers:

- recognize the reaction they keep repeating;
- understand how the four temperament patterns experience pressure;
- choose one more useful next move in work, relationships, tension, and repair.

Keep the current single-offer structure and US$12 price. Reword the product inclusion sentence to:

> 144 illustrated pages, practical relationship and work tools, a reflowable EPUB, and worksheets you will actually use.

Preserve responsible-use language. Do not claim that the guide diagnoses, predicts, fixes, or reveals a reader's true fixed identity.

## Technical Design

- Create a dedicated social image at an explicit 1200 x 630 raster size under `public/images/field-guide/`.
- Update `/field-guide` metadata, Open Graph, Twitter metadata, and Product schema to use the image and the revised product language.
- Update hero and offer copy in existing Field Guide campaign components only.
- Keep the interactive book, preview, checkout, Stripe configuration, fulfillment, price, policies, and current visual identity untouched.
- Add focused tests for OG metadata, image existence/reference, revised copy, and the preservation of US$12 single-edition checkout behavior.

## Validation

- Verify the new image renders at 1200 x 630 and remains legible at social-card scale.
- Check Open Graph and Twitter metadata point to the same absolute image URL.
- Run focused Field Guide content tests, TypeScript, lint, production build, and a browser screenshot at desktop/mobile widths.
- Confirm existing checkout and product-catalog tests still pass.

## Out of Scope

- Redesigning the full sales page.
- Changing the price, payment setup, fulfillment, bundle contents, or policies.
- Publishing or deploying without a separate release decision.
