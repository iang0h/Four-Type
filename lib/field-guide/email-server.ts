import 'server-only'

import { sendEmail } from '../email-delivery-server'
import type { FieldGuideEntitlement } from './entitlements'
import { createSupporterAccessEmail } from './email'

export function sendSupporterAccessEmail(
  entitlement: FieldGuideEntitlement,
  accessUrl: string,
  idempotencyKey: string,
) {
  return sendEmail(
    createSupporterAccessEmail(entitlement, accessUrl),
    'Supporter access email failed',
    idempotencyKey,
  )
}
