export const FIELD_GUIDE_POLICY_KEYS = ['refund', 'privacy', 'terms', 'contact'] as const
export type FieldGuidePolicyKey = (typeof FIELD_GUIDE_POLICY_KEYS)[number]

export type FieldGuidePolicy = {
  href: string | null
  copy: string
}

export type FieldGuidePolicies = {
  [key in FieldGuidePolicyKey]: FieldGuidePolicy
} & {
  missing: FieldGuidePolicyKey[]
}

const policyEnvironmentKeys: Record<FieldGuidePolicyKey, string> = {
  refund: 'FOURTYPE_REFUND_POLICY_URL',
  privacy: 'FOURTYPE_PRIVACY_URL',
  terms: 'FOURTYPE_TERMS_URL',
  contact: 'FOURTYPE_CONTACT_URL',
}

const policyDefaultUrls: Record<FieldGuidePolicyKey, string> = {
  refund: '/field-guide/refunds',
  privacy: '/field-guide/privacy',
  terms: '/field-guide/terms',
  contact: '/field-guide/contact',
}

const policyFallbackCopy: Record<FieldGuidePolicyKey, string> = {
  refund: 'Refund policy is being finalized; this page does not make a refund promise.',
  privacy: 'Privacy details are being finalized; no privacy link is available yet.',
  terms: 'Terms are being finalized; no terms link is available yet.',
  contact: 'Contact details are being finalized; no contact link is available yet.',
}

const CONTROL_OR_BACKSLASH = /[\\\u0000-\u001F\u007F]/
const SAFE_POLICY_PATH = /^\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)*\/?$/

function normalizePolicyUrl(value: unknown) {
  if (typeof value !== 'string' || value.length === 0 || value !== value.trim()) return null
  if (CONTROL_OR_BACKSLASH.test(value)) return null
  if (value.startsWith('//')) return null
  if (value.includes('%') || value.includes('?') || value.includes('#')) return null

  const isRootRelative = value.startsWith('/')
  if (!isRootRelative && !/^https:\/\//i.test(value)) return null

  let url: URL
  try {
    url = new URL(value, 'https://www.fourtype.com')
  } catch {
    return null
  }

  if (url.username || url.password || url.protocol !== 'https:') return null
  if (isRootRelative) {
    if (!value.startsWith('/') || value.startsWith('//')) return null
  } else {
    const authorityStart = value.indexOf('//') + 2
    const authorityRemainder = value.slice(authorityStart)
    const authorityEnd = authorityRemainder.search(/[/?#]/)
    const authority = authorityRemainder.slice(0, authorityEnd === -1 ? authorityRemainder.length : authorityEnd)
    const authorityMatch = authority.match(/^([^:]+)(?::(\d+))?$/)
    if (!authorityMatch || authority.includes('@')) return null
    if (authorityMatch[1].toLowerCase() !== 'www.fourtype.com') return null
    if (authorityMatch[2] && authorityMatch[2] !== '443') return null
  }

  if (url.port || url.search || url.hash || !SAFE_POLICY_PATH.test(url.pathname)) return null
  return value
}

export function getFieldGuidePolicies(environment?: Record<string, string | undefined>): FieldGuidePolicies {
  const source = environment ?? process.env
  const useDefaults = environment === undefined
  const missing: FieldGuidePolicyKey[] = []
  const policies = {} as Record<FieldGuidePolicyKey, FieldGuidePolicy>

  for (const key of FIELD_GUIDE_POLICY_KEYS) {
    const configuredValue = Object.prototype.hasOwnProperty.call(source, policyEnvironmentKeys[key])
      ? source[policyEnvironmentKeys[key]]
      : useDefaults ? policyDefaultUrls[key] : undefined
    const href = normalizePolicyUrl(configuredValue)
    if (!href) missing.push(key)
    policies[key] = {
      href,
      copy: href ?? policyFallbackCopy[key],
    }
  }

  return { ...policies, missing }
}

export const missingPolicyDecisions = getFieldGuidePolicies().missing
