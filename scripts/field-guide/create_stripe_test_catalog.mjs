import Stripe from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey || !secretKey.startsWith('sk_test_')) {
  throw new Error('A Stripe test-mode secret is required to create the Field Guide test catalog')
}

const stripe = new Stripe(secretKey)

const products = {
  'field-guide': {
    name: 'FourType Field Guide Supporter',
    metadata: { product: 'fourtype-field-guide', tier: 'field-guide' },
  },
  founding: {
    name: 'FourType Founding Supporter',
    metadata: { product: 'fourtype-founding-supporter', tier: 'founding' },
  },
}

const prices = [
  ['STRIPE_FIELD_GUIDE_USD_PRICE_ID', 'fourtype_field_guide_usd', 'usd', 1200, 'field-guide'],
  ['STRIPE_FIELD_GUIDE_MYR_PRICE_ID', 'fourtype_field_guide_myr', 'myr', 3900, 'field-guide'],
  ['STRIPE_FOUNDING_SUPPORTER_USD_PRICE_ID', 'fourtype_founding_usd', 'usd', 2500, 'founding'],
  ['STRIPE_FOUNDING_SUPPORTER_MYR_PRICE_ID', 'fourtype_founding_myr', 'myr', 7900, 'founding'],
]

async function getOrCreateProduct(tier) {
  const product = products[tier]
  const existing = await stripe.products.search({ query: `metadata['product']:'${product.metadata.product}'`, limit: 1 })

  if (existing.data[0]) return existing.data[0]

  return stripe.products.create(product)
}

async function getOrCreatePrice(environmentName, lookupKey, currency, unitAmount, product) {
  const existing = await stripe.prices.list({ lookup_keys: [lookupKey], active: true, limit: 1 })
  const price = existing.data[0]

  if (price) {
    if (price.currency !== currency || price.unit_amount !== unitAmount || price.product !== product.id) {
      throw new Error(`Existing price ${lookupKey} does not match the approved test catalog`)
    }

    return [environmentName, price.id]
  }

  const created = await stripe.prices.create({
    currency,
    unit_amount: unitAmount,
    product: product.id,
    lookup_key: lookupKey,
  })

  return [environmentName, created.id]
}

const productsByTier = new Map()

for (const tier of Object.keys(products)) {
  productsByTier.set(tier, await getOrCreateProduct(tier))
}

const assignments = []

for (const [environmentName, lookupKey, currency, unitAmount, tier] of prices) {
  assignments.push(
    await getOrCreatePrice(
      environmentName,
      lookupKey,
      currency,
      unitAmount,
      productsByTier.get(tier),
    ),
  )
}

for (const [environmentName, priceId] of assignments) {
  console.log(`${environmentName}=${priceId}`)
}
