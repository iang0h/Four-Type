import releaseData from '../../data/field-guide-release.json'
import { SUPPORTER_TIERS, type SupporterTierKey } from './catalog'

export const FIELD_GUIDE_ASSET_KEYS = ['pdf', 'epub', 'worksheets'] as const
export type FieldGuideAssetKey = (typeof FIELD_GUIDE_ASSET_KEYS)[number]

type FieldGuideAsset = {
  pathname: string
  customerFilename: string
  mimeType: string
  bytes: number
  sha256: string
  tiers: readonly SupporterTierKey[]
}

export type FieldGuideRelease = {
  id: string
  edition: string
  assets: Record<FieldGuideAssetKey, FieldGuideAsset>
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isSupporterTier(value: unknown): value is SupporterTierKey {
  return SUPPORTER_TIERS.includes(value as SupporterTierKey)
}

function validateRelease(value: unknown): FieldGuideRelease {
  if (!isRecord(value) || typeof value.id !== 'string' || typeof value.edition !== 'string' || !isRecord(value.assets)) {
    throw new Error('Invalid Field Guide release manifest')
  }

  const assetKeys = Object.keys(value.assets)
  if (assetKeys.length !== FIELD_GUIDE_ASSET_KEYS.length || FIELD_GUIDE_ASSET_KEYS.some((key) => !assetKeys.includes(key))) {
    throw new Error('Invalid Field Guide release manifest assets')
  }

  for (const key of FIELD_GUIDE_ASSET_KEYS) {
    const asset = value.assets[key]
    if (
      !isRecord(asset) ||
      typeof asset.pathname !== 'string' ||
      typeof asset.customerFilename !== 'string' ||
      typeof asset.mimeType !== 'string' ||
      typeof asset.bytes !== 'number' ||
      !Number.isSafeInteger(asset.bytes) ||
      asset.bytes <= 0 ||
      !/^[a-f0-9]{64}$/.test(typeof asset.sha256 === 'string' ? asset.sha256 : '') ||
      !Array.isArray(asset.tiers) ||
      !asset.tiers.every(isSupporterTier)
    ) {
      throw new Error(`Invalid Field Guide release asset: ${key}`)
    }
  }

  return value as unknown as FieldGuideRelease
}

export const FIELD_GUIDE_RELEASE = validateRelease(releaseData)

export function assetsForTier(tier: SupporterTierKey): FieldGuideAssetKey[] {
  return FIELD_GUIDE_ASSET_KEYS.filter((key) => FIELD_GUIDE_RELEASE.assets[key].tiers.includes(tier))
}
