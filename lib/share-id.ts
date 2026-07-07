import { BLENDS, type BlendKey } from './blends'
import type { ScoreMap } from './scoringKey'

export type DecodedShareResult = {
  heroName: string
  blendKey: BlendKey
  scores: ScoreMap
}

function normalizeBase64Url(id: string) {
  const base64 = id.replace(/-/g, '+').replace(/_/g, '/')
  const padding = base64.length % 4 === 0 ? '' : '='.repeat(4 - (base64.length % 4))
  return `${base64}${padding}`
}

function encodeBase64(value: string) {
  if (typeof window === 'undefined') {
    return Buffer.from(value, 'utf8').toString('base64')
  }

  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function decodeBase64(value: string) {
  if (typeof window === 'undefined') {
    return Buffer.from(value, 'base64').toString('utf8')
  }

  const binary = atob(value)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function generateShareId(heroName: string, blendKey: string, scores: ScoreMap) {
  const data = `${heroName}|${blendKey}|${scores.Yellow},${scores.Red},${scores.Blue},${scores.Green}`
  const encoded = encodeBase64(data)

  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeShareId(id: string): DecodedShareResult | null {
  try {
    const normalized = normalizeBase64Url(id)
    const decoded = decodeBase64(normalized)
    const [heroName, blendKey, scoresStr] = decoded.split('|')
    const [yellow, red, blue, green] = scoresStr.split(',').map(Number)

    if (!heroName || !blendKey || !scoresStr || !(blendKey in BLENDS)) {
      return null
    }

    if ([yellow, red, blue, green].some((score) => !Number.isFinite(score))) {
      return null
    }

    return {
      heroName: heroName.slice(0, 40),
      blendKey: blendKey as BlendKey,
      scores: { Yellow: yellow, Red: red, Blue: blue, Green: green },
    }
  } catch {
    return null
  }
}
