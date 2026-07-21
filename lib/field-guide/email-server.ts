import 'server-only'

import { prepareEmailDelivery } from '../email-delivery-server'
import type { FieldGuideEntitlement } from './entitlements'
import { createSupporterAccessEmail } from './email'

export function prepareSupporterAccessEmail(
  entitlement: FieldGuideEntitlement,
  accessUrl: string,
  idempotencyKey: string,
) {
  return prepareEmailDelivery(
    createSupporterAccessEmail(entitlement, accessUrl),
    'Supporter access email failed',
    idempotencyKey,
  )
}
