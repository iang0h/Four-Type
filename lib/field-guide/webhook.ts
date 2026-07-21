type StripeWebhookEvent = {
  type: string
  data: { object: unknown }
}

type FulfillCheckout = (sessionId: string) => Promise<unknown>

type WebhookHandlerOptions = {
  webhookSecret: string | undefined
  constructEvent: (rawBody: string, signature: string, secret: string) => StripeWebhookEvent
  fulfill: FulfillCheckout
}

type WebhookConfiguration = () => WebhookHandlerOptions

const fulfilledEventTypes = new Set([
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
])

function getSessionId(event: StripeWebhookEvent) {
  const object = event.data?.object
  if (!object || typeof object !== 'object' || Array.isArray(object)) {
    throw new Error('Webhook Checkout Session is invalid')
  }

  const sessionId = (object as { id?: unknown }).id
  if (
    typeof sessionId !== 'string'
    || sessionId.length === 0
    || sessionId.length > 256
    || !/^[A-Za-z0-9_:-]+$/.test(sessionId)
  ) {
    throw new Error('Webhook Checkout Session is invalid')
  }

  return sessionId
}

export async function handleVerifiedEvent(event: StripeWebhookEvent, fulfill: FulfillCheckout) {
  if (!fulfilledEventTypes.has(event.type)) return { handled: false as const }

  await fulfill(getSessionId(event))
  return { handled: true as const }
}

export function createWebhookPostHandler({ webhookSecret, constructEvent, fulfill }: WebhookHandlerOptions) {
  return async function POST(request: Request) {
    const signature = request.headers.get('stripe-signature')
    if (!signature) return new Response(null, { status: 400 })
    if (!webhookSecret) return new Response(null, { status: 500 })

    let event: StripeWebhookEvent

    try {
      event = constructEvent(await request.text(), signature, webhookSecret)
    } catch {
      return new Response(null, { status: 400 })
    }

    try {
      await handleVerifiedEvent(event, fulfill)
      return new Response(null, { status: 200 })
    } catch {
      return new Response(null, { status: 500 })
    }
  }
}

export function createConfiguredWebhookPostHandler(configuration: WebhookConfiguration) {
  return async function POST(request: Request) {
    let handler: ReturnType<typeof createWebhookPostHandler>

    try {
      handler = createWebhookPostHandler(configuration())
    } catch {
      return new Response(null, { status: 500 })
    }

    return handler(request)
  }
}
