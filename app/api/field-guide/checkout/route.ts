import { NextResponse } from 'next/server'
import { parseSupporterSelection } from '@/lib/field-guide/catalog'
import { createFieldGuideCheckout } from '@/lib/field-guide/stripe'

function getCheckoutOrigin(request: Request) {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const origin = configuredOrigin || new URL(request.url).origin
  const url = new URL(origin)

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('Checkout origin must use HTTP or HTTPS')
  }

  return url.origin
}

export async function POST(request: Request) {
  let input: unknown

  try {
    input = await request.json()
  } catch {
    return new Response(null, { status: 400 })
  }

  const selection = parseSupporterSelection(input)

  if (!selection) {
    return new Response(null, { status: 400 })
  }

  try {
    const { url } = await createFieldGuideCheckout(selection, getCheckoutOrigin(request))
    return NextResponse.json({ url })
  } catch {
    return new Response(null, { status: 503 })
  }
}
