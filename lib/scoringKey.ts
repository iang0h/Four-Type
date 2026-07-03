import { AnswerLetter } from './questions'

export type TemperamentKey = 'Yellow' | 'Red' | 'Blue' | 'Green'

export interface QuestionScore {
  Yellow: AnswerLetter
  Red: AnswerLetter
  Blue: AnswerLetter
  Green: AnswerLetter
}

export const SCORING_KEY: Record<number, QuestionScore> = {
  1:  { Yellow: 'D', Red: 'A', Blue: 'C', Green: 'B' },
  2:  { Yellow: 'B', Red: 'A', Blue: 'C', Green: 'D' },
  3:  { Yellow: 'B', Red: 'C', Blue: 'D', Green: 'A' },
  4:  { Yellow: 'A', Red: 'C', Blue: 'B', Green: 'D' },
  5:  { Yellow: 'B', Red: 'A', Blue: 'D', Green: 'C' },
  6:  { Yellow: 'A', Red: 'B', Blue: 'D', Green: 'C' },
  7:  { Yellow: 'D', Red: 'B', Blue: 'A', Green: 'C' },
  8:  { Yellow: 'B', Red: 'A', Blue: 'D', Green: 'C' },
  9:  { Yellow: 'C', Red: 'A', Blue: 'D', Green: 'B' },
  10: { Yellow: 'B', Red: 'A', Blue: 'C', Green: 'D' },
  11: { Yellow: 'C', Red: 'D', Blue: 'B', Green: 'A' },
  12: { Yellow: 'A', Red: 'C', Blue: 'D', Green: 'B' },
  13: { Yellow: 'A', Red: 'B', Blue: 'C', Green: 'D' },
  14: { Yellow: 'D', Red: 'C', Blue: 'B', Green: 'A' },
  15: { Yellow: 'C', Red: 'D', Blue: 'A', Green: 'B' },
  16: { Yellow: 'A', Red: 'C', Blue: 'B', Green: 'D' },
  17: { Yellow: 'D', Red: 'C', Blue: 'B', Green: 'A' },
  18: { Yellow: 'C', Red: 'A', Blue: 'B', Green: 'D' },
  19: { Yellow: 'A', Red: 'C', Blue: 'B', Green: 'D' },
  20: { Yellow: 'A', Red: 'D', Blue: 'B', Green: 'C' },
  21: { Yellow: 'C', Red: 'B', Blue: 'A', Green: 'D' },
  22: { Yellow: 'B', Red: 'A', Blue: 'C', Green: 'D' },
  23: { Yellow: 'C', Red: 'B', Blue: 'D', Green: 'A' },
  24: { Yellow: 'A', Red: 'D', Blue: 'C', Green: 'B' },
  25: { Yellow: 'C', Red: 'B', Blue: 'D', Green: 'A' },
  26: { Yellow: 'A', Red: 'B', Blue: 'D', Green: 'C' },
  27: { Yellow: 'D', Red: 'B', Blue: 'A', Green: 'C' },
  28: { Yellow: 'A', Red: 'C', Blue: 'B', Green: 'D' },
  29: { Yellow: 'C', Red: 'A', Blue: 'D', Green: 'B' },
  30: { Yellow: 'D', Red: 'A', Blue: 'C', Green: 'B' },
  31: { Yellow: 'D', Red: 'B', Blue: 'A', Green: 'C' },
  32: { Yellow: 'C', Red: 'A', Blue: 'D', Green: 'B' },
  33: { Yellow: 'C', Red: 'A', Blue: 'D', Green: 'B' },
  34: { Yellow: 'A', Red: 'C', Blue: 'D', Green: 'B' },
  35: { Yellow: 'B', Red: 'C', Blue: 'D', Green: 'A' },
  36: { Yellow: 'D', Red: 'A', Blue: 'B', Green: 'C' },
  37: { Yellow: 'B', Red: 'A', Blue: 'C', Green: 'D' },
  38: { Yellow: 'D', Red: 'B', Blue: 'C', Green: 'A' },
  39: { Yellow: 'B', Red: 'D', Blue: 'A', Green: 'C' },
  40: { Yellow: 'B', Red: 'C', Blue: 'D', Green: 'A' },
}

export type ScoreMap = Record<TemperamentKey, number>

export function calculateScores(answers: Record<number, AnswerLetter>): ScoreMap {
  const scores: ScoreMap = { Yellow: 0, Red: 0, Blue: 0, Green: 0 }
  for (const [qNumStr, selected] of Object.entries(answers)) {
    const qNum = parseInt(qNumStr, 10)
    const key = SCORING_KEY[qNum]
    if (!key) continue
    if (key.Yellow === selected) scores.Yellow++
    if (key.Red === selected) scores.Red++
    if (key.Blue === selected) scores.Blue++
    if (key.Green === selected) scores.Green++
  }
  return scores
}

export function getDominantAndSecondary(scores: ScoreMap): [TemperamentKey, TemperamentKey] {
  const sorted = (Object.entries(scores) as [TemperamentKey, number][]).sort((a, b) => b[1] - a[1])
  return [sorted[0][0], sorted[1][0]]
}

export function getMaskingWarning(scores: ScoreMap): 'diagonal' | 'triple' | null {
  const vals = Object.values(scores).sort((a, b) => b - a)
  const [dominant, secondary] = getDominantAndSecondary(scores)

  // Diagonal check: Sanguine+Melancholic (Yellow+Blue) or Choleric+Phlegmatic (Red+Green)
  const diagonalPairs = [
    ['Yellow', 'Blue'],
    ['Blue', 'Yellow'],
    ['Red', 'Green'],
    ['Green', 'Red'],
  ]
  if (diagonalPairs.some(([a, b]) => dominant === a && secondary === b)) {
    return 'diagonal'
  }

  // Triple close check: top 3 within 3 points of each other
  if (Math.abs(vals[0] - vals[2]) <= 3) {
    return 'triple'
  }

  return null
}

// ═══════════════════════════════════════════════════════════
// BLEND RESOLUTION LOGIC — 16 FourTypes
// ═══════════════════════════════════════════════════════════

import { BlendKey, BLEND_MAP } from './blends'

export type BlendFlag = 'bilingual' | 'pure' | null

export interface BlendResult {
  blendKey: BlendKey
  primary: TemperamentKey
  secondary: TemperamentKey
  flag: BlendFlag
}

export function resolveBlend(scores: ScoreMap): BlendResult {
  const sorted = (Object.entries(scores) as [TemperamentKey, number][]).sort((a, b) => b[1] - a[1])
  const [primary, pScore] = sorted[0]
  const [secondary, sScore] = sorted[1]

  // Pure dominant: dominant score >= 22 AND secondary <= 6
  if (pScore >= 22 && sScore <= 6) {
    const pureBlendByPrimary: Record<TemperamentKey, BlendKey> = {
      Yellow: 'Spark',
      Red: 'Commander',
      Blue: 'Strategist',
      Green: 'Guardian',
    }

    return {
      blendKey: pureBlendByPrimary[primary],
      primary,
      secondary: primary,
      flag: 'pure',
    }
  }
  
  // Check for bilingual flag: top 2 scores within 2 points
  const flag: BlendFlag = Math.abs(pScore - sScore) <= 2 ? 'bilingual' : null
  
  // Normal blend resolution
  const blendKey = BLEND_MAP[primary]?.[secondary]
  
  if (!blendKey) {
    // Fallback — shouldn't happen with valid data
    console.warn('Could not resolve blend for:', primary, secondary)
    return {
      blendKey: 'Motivator',
      primary,
      secondary,
      flag,
    }
  }
  
  return {
    blendKey,
    primary,
    secondary,
    flag,
  }
}
