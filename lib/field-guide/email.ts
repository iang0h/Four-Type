import type { FieldGuideEntitlement } from './entitlements'
import type { EmailMessage } from '../email-delivery'

function getTierLabel(tier: FieldGuideEntitlement['tier']) {
  return tier === 'founding' ? 'Founding Supporter' : 'Field Guide Supporter'
}

function getRewards(tier: FieldGuideEntitlement['tier']) {
  const rewards = ['Complete 144-page Field Guide PDF', 'Reflowable EPUB edition']
  if (tier === 'founding') rewards.push('Printable worksheet pack and Edition 1 revisions')
  return rewards
}

function assertAccessUrl(accessUrl: string) {
  let url: URL

  try {
    url = new URL(accessUrl)
  } catch {
    throw new Error('Supporter access URL is invalid')
  }

  if (
    (url.protocol !== 'https:' && url.protocol !== 'http:')
    || url.pathname !== '/field-guide/access'
    || !url.searchParams.get('token')
    || [...url.searchParams.keys()].some((key) => key !== 'token')
    || url.hash
  ) {
    throw new Error('Supporter access URL is invalid')
  }
}

export function createSupporterAccessEmail(entitlement: FieldGuideEntitlement, accessUrl: string): EmailMessage {
  assertAccessUrl(accessUrl)

  const tier = getTierLabel(entitlement.tier)
  const rewards = getRewards(entitlement.tier)
  const text = [
    'Thank you for supporting FourType.',
    '',
    `Your supporter level: ${tier}`,
    'Included rewards:',
    ...rewards.map((reward) => `- ${reward}`),
    '',
    `Open your private supporter access page: ${accessUrl}`,
    '',
    'These files are for your personal use. Please do not share, resell, or distribute them.',
  ].join('\n')
  const html = [
    '<div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">',
    '<p>Thank you for supporting FourType.</p>',
    `<p><strong>Your supporter level:</strong> ${tier}</p>`,
    '<p><strong>Included rewards:</strong></p>',
    `<ul>${rewards.map((reward) => `<li>${reward}</li>`).join('')}</ul>`,
    `<p><a href="${accessUrl}">Open your private supporter access page</a></p>`,
    '<p>These files are for your personal use. Please do not share, resell, or distribute them.</p>',
    '</div>',
  ].join('')

  return {
    to: entitlement.customerEmail,
    subject: `Your FourType ${tier} access`,
    text,
    html,
  }
}
