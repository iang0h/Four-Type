export type EmailMessage = {
  to: string
  subject: string
  text: string
  html: string
}

export type EmailDeliveryResult = {
  sent: boolean
  skipped: boolean
  providerMessageId?: string
}
