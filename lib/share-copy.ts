import type { Blend } from './blends'
import { getMisunderstoodLine, getOgHook, getOgLine, getResultOneSentence } from './result-virality'

export type ShareLocale = 'en' | 'zh-CN' | 'es' | 'id'

const pressureHooks: Record<Blend['primary'], string> = {
  Red: 'why I take over when things get vague',
  Yellow: 'why I chase energy before I admit I am bored',
  Blue: 'why I notice the flaw before the compliment',
  Green: 'why I keep the peace until I quietly check out',
}

const resultHooks: Record<Blend['primary'], string> = {
  Red: 'decision style',
  Yellow: 'social rhythm',
  Blue: 'inner standards',
  Green: 'conflict pattern',
}

const chipHooks: Record<Blend['primary'], string[]> = {
  Red: ['control', 'pressure', 'directness'],
  Yellow: ['energy', 'attention', 'momentum'],
  Blue: ['standards', 'overthinking', 'meaning'],
  Green: ['calm', 'avoidance', 'hidden limits'],
}

export function getShareHook(blend: Blend, locale: ShareLocale = 'en') {
  if (locale === 'id') return `FourType menyebut saya ${blend.name} dan hasil ini terasa sangat mengenal saya.`
  return `FourType called me ${blend.name} and somehow caught ${pressureHooks[blend.primary]}.`
}

export function getShareText(blend: Blend, shareUrl?: string, locale: ShareLocale = 'en') {
  const text = locale === 'id'
    ? `${getShareHook(blend, locale)} Tes temperamen Anda dan lihat bagaimana kita saling melengkapi. Anda tipe yang mana?`
    : `${getShareHook(blend, locale)} Annoyingly accurate. What are you?`
  return shareUrl ? `${text}\n\n${shareUrl}` : text
}

export function getShareMetadata(heroName: string, blend: Blend, locale: ShareLocale = 'en') {
  const safeName = heroName.trim() || 'Someone'
  const insight = resultHooks[blend.primary]
  const oneSentence = getResultOneSentence(blend)
  const misunderstood = getMisunderstoodLine(blend)

  if (locale === 'id') {
    return {
      title: `${safeName} mendapatkan ${blend.name} di FourType`,
      description: 'Hasil ini terasa sangat mengenal saya. Ikuti tes temperamen gratis dan lihat pola Anda.',
      ogTitle: `${safeName} mendapatkan ${blend.name}`,
      ogDescription: 'Hasil ini terasa sangat mengenal saya. Tes temperamen Anda dan lihat bagaimana kita saling melengkapi.',
      hook: 'Hasil ini terasa sangat mengenal saya.',
      eyebrow: 'Profil kepribadian',
      insight: 'pola temperamen',
      line: 'Lihat pola utama, respons terhadap tekanan, dan gaya komunikasi Anda.',
      chips: ['tekanan', 'komunikasi', 'pertumbuhan'],
      cta: 'Anda tipe yang mana? fourtype.com',
    }
  }

  return {
    title: `${safeName} got ${blend.name} on FourType`,
    description: `${oneSentence} Take the free temperament test and see what it catches about you.`,
    ogTitle: `${safeName} got ${blend.name}`,
    ogDescription: `${misunderstood} Take the free test and see what it says about you.`,
    hook: getOgHook(blend),
    eyebrow: 'Personality Dossier',
    insight,
    line: getOgLine(blend),
    chips: chipHooks[blend.primary],
    cta: 'What are you? Take the free test',
  }
}
