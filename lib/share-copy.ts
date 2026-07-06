import type { Blend } from './blends'

const pressureHooks: Record<Blend['primary'], string> = {
  Red: 'how I take control under pressure',
  Yellow: 'why I chase energy and momentum',
  Blue: 'why I notice what everyone else misses',
  Green: 'why I keep the peace until I quietly refuse',
}

const resultHooks: Record<Blend['primary'], string> = {
  Red: 'decision style',
  Yellow: 'social rhythm',
  Blue: 'inner standards',
  Green: 'conflict pattern',
}

export function getShareHook(blend: Blend) {
  return `This test called me ${blend.name} and exposed ${pressureHooks[blend.primary]}.`
}

export function getShareText(blend: Blend, shareUrl?: string) {
  const text = `${getShareHook(blend)} Annoyingly accurate. What does it say about you?`
  return shareUrl ? `${text}\n\n${shareUrl}` : text
}

export function getShareMetadata(heroName: string, blend: Blend) {
  const safeName = heroName.trim() || 'Someone'
  const insight = resultHooks[blend.primary]

  return {
    title: `${safeName} got ${blend.name} on FourType`,
    description: `${getShareHook(blend)} Take the free test and see what it catches about you.`,
    ogTitle: `${safeName} is ${blend.name}`,
    ogDescription: `A free temperament test that reads your ${insight}, stress pattern, and blind spot.`,
    hook: 'This test read me too well',
    eyebrow: 'Personality Dossier',
    insight,
    chips: [insight, 'stress pattern', 'blind spot'],
    cta: 'Take the free FourType test',
  }
}
