export const SUPPORTER_TIERS = ['field-guide', 'founding'] as const
export const SUPPORTER_CURRENCIES = ['usd'] as const
export type SupporterTierKey = (typeof SUPPORTER_TIERS)[number]
export type CurrencyKey = (typeof SUPPORTER_CURRENCIES)[number]

const offers = {
  'field-guide:usd': { amount: 1200, label: 'US$12', priceEnv: 'STRIPE_FIELD_GUIDE_USD_PRICE_ID' },
  'founding:usd': { amount: 2500, label: 'US$25', priceEnv: 'STRIPE_FOUNDING_SUPPORTER_USD_PRICE_ID' },
} as const

export function getSupporterOffer(tier: SupporterTierKey, currency: CurrencyKey) {
  return offers[`${tier}:${currency}` as keyof typeof offers]
}

export function parseSupporterSelection(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const input = value as Record<string, unknown>
  if (!SUPPORTER_TIERS.includes(input.tier as SupporterTierKey)) return null
  if (!SUPPORTER_CURRENCIES.includes(input.currency as CurrencyKey)) return null
  return { tier: input.tier as SupporterTierKey, currency: input.currency as CurrencyKey }
}
