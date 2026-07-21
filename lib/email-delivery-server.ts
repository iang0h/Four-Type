import 'server-only'

import { BLENDS } from './blends'
import type { EmailDeliveryResult, EmailMessage } from './email-delivery'
import { deliverEmail } from './email-transport'
import type { LeadCapturePayload } from './google-sheets-leads'
import { getProfileEmailPreview, getSharePrompts } from './result-virality'
import { getSubtypeByBlendKey } from './subtypes'

function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.FOURTYPE_EMAIL_FROM
  const replyTo = process.env.FOURTYPE_EMAIL_REPLY_TO
  return apiKey && from ? { apiKey, from, replyTo } : null
}

export function isProfileEmailConfigured() {
  return getEmailConfig() !== null
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function getProfileEmail(payload: LeadCapturePayload) {
  const blend = BLENDS[payload.blendKey as keyof typeof BLENDS]

  if (!blend) {
    return {
      subject: 'Your FourType profile',
      text: `Thanks for joining FourType.\n\nYour result: ${payload.resultName}\n${payload.shareUrl}\n\nTake the quiz again or share it with a friend: https://www.fourtype.com/quiz`,
      html: `<p>Thanks for joining FourType.</p><p>Your result: <strong>${escapeHtml(payload.resultName)}</strong></p><p><a href="${escapeHtml(payload.shareUrl)}">Open your share page</a></p><p><a href="https://www.fourtype.com/quiz">Take the quiz again</a></p>`,
    }
  }

  const preview = getProfileEmailPreview(blend)
  const subtype = getSubtypeByBlendKey(payload.blendKey)
  const subtypeUrl = subtype ? `https://www.fourtype.com/subtype/${subtype.slug}` : 'https://www.fourtype.com/blog/subtypes'
  const shareUrl = payload.shareUrl || 'https://www.fourtype.com/quiz'
  const shareId = shareUrl.includes('/share/') ? shareUrl.split('/share/')[1]?.split(/[?#]/)[0] : ''
  const compareUrl = shareId ? `https://www.fourtype.com/quiz?compare=${shareId}` : 'https://www.fourtype.com/quiz'
  const sharePrompts = getSharePrompts(blend)
  const subject = `Your FourType profile: ${blend.name}`
  const text = [
    `Your FourType profile: ${blend.name}`, '', `${blend.blend} · ${blend.rpgClass}`, '', preview.oneSentence, '',
    `What people may misread: ${preview.misunderstood}`, '', `Under pressure: ${blend.underStress}`, '',
    `How to speak to you: ${blend.speakTo}`, '', `Your growth move this week: ${preview.challenge}`, '',
    `Read your deeper subtype profile: ${subtypeUrl}`, `Open your result: ${shareUrl}`,
    `Compare your result with a friend: ${compareUrl}`, '', 'Send this to someone who...',
    ...sharePrompts.map((prompt) => `- ${prompt}`), '', 'FourType is a self-reflection tool, not a clinical diagnosis.',
  ].join('\n')
  const html = `
    <div style="font-family: Inter, Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <p style="font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; color: #64748b;">FourType Profile</p>
      <h1 style="font-family: Georgia, serif; font-size: 30px; margin: 0 0 12px;">${escapeHtml(blend.name)}</h1>
      <p style="margin: 0 0 18px; color: #64748b;">${escapeHtml(blend.blend)} · ${escapeHtml(blend.rpgClass)}</p>
      <p style="font-size: 17px;">${escapeHtml(preview.oneSentence)}</p>
      <div style="border-left: 4px solid #eab308; padding-left: 16px; margin: 22px 0;"><p style="margin: 0; color: #475569;"><strong>What people may misread:</strong><br>${escapeHtml(preview.misunderstood)}</p></div>
      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 22px 0;"><tr><td style="padding: 14px; border: 1px solid #e2e8f0; border-radius: 10px;"><strong>Under pressure</strong><br><span style="color: #475569;">${escapeHtml(blend.underStress)}</span></td></tr><tr><td style="padding: 14px; border: 1px solid #e2e8f0; border-radius: 10px;"><strong>How to speak to you</strong><br><span style="color: #475569;">${escapeHtml(blend.speakTo)}</span></td></tr></table>
      <p><strong>Your growth move this week:</strong><br>${escapeHtml(preview.challenge)}</p>
      <p><a href="${escapeHtml(subtypeUrl)}" style="display: inline-block; padding: 12px 16px; background: #0f172a; color: #ffffff; text-decoration: none; border-radius: 8px;">Read your deeper subtype profile</a></p>
      <p><a href="${escapeHtml(compareUrl)}" style="display: inline-block; padding: 12px 16px; background: #eab308; color: #111827; text-decoration: none; border-radius: 8px; font-weight: 700;">Compare your type with a friend</a></p>
      <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px;"><p style="margin-top: 0;"><strong>Send this to someone who...</strong></p><ul style="margin-bottom: 0; padding-left: 18px;">${sharePrompts.map((prompt) => `<li>${escapeHtml(prompt)}</li>`).join('')}</ul></div>
      <p><a href="${escapeHtml(shareUrl)}">Open your share page</a></p>
      <p style="font-size: 13px; color: #64748b;">FourType is a self-reflection tool, not a clinical diagnosis.</p>
    </div>
  `
  return { subject, text, html }
}

export async function sendEmail(
  message: EmailMessage,
  failureLabel = 'Email delivery failed',
  idempotencyKey?: string,
): Promise<EmailDeliveryResult> {
  const config = getEmailConfig()
  if (!config) return { sent: false, skipped: true }

  try {
    return await deliverEmail(message, config, idempotencyKey)
  } catch (error) {
    const messageText = error instanceof Error ? error.message.replace(/^Email delivery failed: /, '') : 'unknown error'
    throw new Error(`${failureLabel}: ${messageText}`)
  }
}

export async function sendProfileEmail(payload: LeadCapturePayload) {
  const { sent, skipped } = await sendEmail({ to: payload.email, ...getProfileEmail(payload) }, 'Profile email failed')
  return { sent, skipped }
}
