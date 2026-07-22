import { parseSupporterSelection, type CurrencyKey, type SupporterTierKey } from './catalog'

type SupporterSelection = { tier: SupporterTierKey; currency: CurrencyKey }

type CheckoutCreator = (selection: SupporterSelection, origin: string) => Promise<{ url: string }>

type CheckoutRouteOptions = {
  siteUrl: string | undefined
  createCheckout: CheckoutCreator
  rateLimit?: (request: Request) => Promise<'allowed' | 'rate-limited'>
}

const localHosts = new Set(['localhost', '127.0.0.1'])
const hostnamePattern = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(?:\.(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?))*$/i
const MAX_CHECKOUT_REQUEST_BYTES = 1_024

export function resolveCanonicalCheckoutOrigin(siteUrl: string | undefined) {
  if (!siteUrl || siteUrl !== siteUrl.trim()) return null

  let url: URL

  try {
    url = new URL(siteUrl)
  } catch {
    return null
  }

  const isLocal = localHosts.has(url.hostname)
  const usesAllowedProtocol = url.protocol === 'https:' || (url.protocol === 'http:' && isLocal)

  if (
    !usesAllowedProtocol ||
    !hostnamePattern.test(url.hostname) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  ) {
    return null
  }

  return url.origin
}

export function createCheckoutPostHandler({ siteUrl, createCheckout, rateLimit }: CheckoutRouteOptions) {
  return async function POST(request: Request) {
    if (rateLimit) {
      const requestLimit = await rateLimit(request).catch(() => 'rate-limited' as const)
      if (requestLimit === 'rate-limited') return new Response(null, { status: 429 })
    }

    const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase()
    if (contentType !== 'application/json') return new Response(null, { status: 400 })
    const contentLength = request.headers.get('content-length')
    if (contentLength && (!/^\d+$/.test(contentLength) || Number(contentLength) > MAX_CHECKOUT_REQUEST_BYTES)) return new Response(null, { status: 400 })

    let body: string

    let input: unknown

    try {
      body = await request.text()
      if (body.length > MAX_CHECKOUT_REQUEST_BYTES) return new Response(null, { status: 400 })
      input = JSON.parse(body)
    } catch {
      return new Response(null, { status: 400 })
    }

    const selection = parseSupporterSelection(input)

    if (!selection) {
      return new Response(null, { status: 400 })
    }

    const origin = resolveCanonicalCheckoutOrigin(siteUrl)

    if (!origin) {
      return new Response(null, { status: 503 })
    }

    try {
      const { url } = await createCheckout(selection, origin)
      return Response.json({ url })
    } catch {
      return new Response(null, { status: 503 })
    }
  }
}
