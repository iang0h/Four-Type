import type { EmailDeliveryResult, EmailMessage } from './email-delivery'

export type ResendEmailConfig = {
  apiKey: string
  from: string
  replyTo?: string
}

type FetchImplementation = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>

export async function deliverEmail(
  message: EmailMessage,
  config: ResendEmailConfig,
  idempotencyKey: string | undefined,
  fetchImplementation: FetchImplementation = fetch,
): Promise<EmailDeliveryResult> {
  if (idempotencyKey && (idempotencyKey.length > 256 || idempotencyKey.length === 0)) {
    throw new Error('Email idempotency key is invalid')
  }

  const response = await fetchImplementation('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: config.from,
      to: message.to,
      reply_to: config.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
  })

  if (!response.ok) {
    throw new Error(`Email delivery failed: ${await response.text()}`)
  }

  if (!idempotencyKey) return { sent: true, skipped: false }

  const responseBody: unknown = await response.json()
  const providerMessageId = typeof (responseBody as { id?: unknown }).id === 'string'
    ? (responseBody as { id: string }).id
    : undefined
  if (!providerMessageId) throw new Error('Email delivery receipt is invalid')

  return { sent: true, skipped: false, providerMessageId }
}
