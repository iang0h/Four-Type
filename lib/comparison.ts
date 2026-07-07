import type { Blend } from './blends'

const protectionByPrimary: Record<Blend['primary'], string> = {
  Red: 'progress, control, and clear decisions',
  Yellow: 'connection, energy, and shared momentum',
  Blue: 'meaning, accuracy, and quality',
  Green: 'peace, trust, and emotional steadiness',
}

const frictionByPrimary: Record<Blend['primary'], string> = {
  Red: 'may push too quickly when the other person needs more space or context',
  Yellow: 'may move toward humor, energy, or novelty when the other person wants steadiness or depth',
  Blue: 'may become careful, critical, or slow when the other person wants movement',
  Green: 'may go quiet or delay when the other person wants directness',
}

const giftByPrimary: Record<Blend['primary'], string> = {
  Red: 'brings courage, direction, and the willingness to make the hard call',
  Yellow: 'brings warmth, social oxygen, and the ability to keep things alive',
  Blue: 'brings depth, discernment, and care for what is true or worth doing well',
  Green: 'brings steadiness, patience, and the ability to keep trust intact',
}

const practiceByPrimary: Record<Blend['primary'], string> = {
  Red: 'Ask before taking over.',
  Yellow: 'Stay present after the exciting beginning.',
  Blue: 'Say the concern without turning it into a verdict.',
  Green: 'State the real preference before it turns into quiet resentment.',
}

export function getComparisonInsight(self: Blend, friend: Blend) {
  const samePrimary = self.primary === friend.primary
  const complementary = self.primary === friend.secondary || friend.primary === self.secondary

  return {
    headline: samePrimary
      ? `You both protect ${protectionByPrimary[self.primary]}.`
      : complementary
        ? 'Your patterns may feel different, but they can cover each other well.'
        : 'Your patterns will teach each other different forms of maturity.',
    chemistry: samePrimary
      ? `You may understand each other's instincts quickly because both of you move to protect ${protectionByPrimary[self.primary]}.`
      : `${self.name} ${giftByPrimary[self.primary]}. ${friend.name} ${giftByPrimary[friend.primary]}.`,
    friction: `${self.name} ${frictionByPrimary[self.primary]}. ${friend.name} ${frictionByPrimary[friend.primary]}.`,
    repair: `Your move: ${practiceByPrimary[self.primary]} Their move: ${practiceByPrimary[friend.primary]}`,
  }
}
