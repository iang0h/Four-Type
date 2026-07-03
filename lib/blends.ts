import { TemperamentKey } from './scoringKey'

export type BlendKey = 
  | 'Motivator' | 'Executive' | 'Director'
  | 'Marketer' | 'Relater' | 'Performer'
  | 'Inspector' | 'Harmonizer' | 'Helper'
  | 'Achiever' | 'Diplomat' | 'Analyst'
  | 'Commander' | 'Spark' | 'Strategist' | 'Guardian'

export interface Blend {
  key: BlendKey
  name: string
  blend: string
  primary: TemperamentKey
  secondary: TemperamentKey | 'Pure'
  rpgClass: string
  tagline: string
  drive: string
  lore: string
  mbti: string[]
  enneagram: string[]
  strengths: string[]
  shadows: string[]
  underStress: string
  speakTo: string
  neverDo: string
  famous: string[]
}

// Blend mapping: primary -> secondary -> blend key
export const BLEND_MAP: Record<TemperamentKey, Partial<Record<TemperamentKey, BlendKey>>> = {
  Red:    { Yellow: 'Motivator', Green: 'Executive', Blue: 'Director' },
  Yellow: { Red: 'Marketer', Green: 'Relater', Blue: 'Performer' },
  Green:  { Red: 'Inspector', Yellow: 'Harmonizer', Blue: 'Helper' },
  Blue:   { Red: 'Achiever', Yellow: 'Diplomat', Green: 'Analyst' },
}

export const BLENDS: Record<BlendKey, Blend> = {
  // ═══════════════════════════════════════════════════════════
  // CHOLERIC (RED) BLENDS — "The Language of Power & Control"
  // ═══════════════════════════════════════════════════════════

  Motivator: {
    key: 'Motivator',
    name: 'The Motivator',
    blend: 'Choleric-Sanguine',
    primary: 'Red',
    secondary: 'Yellow',
    rpgClass: 'The Warlord Bard',
    tagline: 'Win fast. Win with people watching.',
    drive: 'Get results + Be accepted',
    lore: "You are the most dangerous kind of leader — one who can move mountains AND make the crowd love you for it. You don't just get results; you make results feel like a party. High energy, high stakes, zero patience for excuses.",
    mbti: ['ENTJ', 'ENTP'],
    enneagram: ['Type 8 — The Challenger', 'Type 3 — The Achiever'],
    strengths: [
      'Most persuasive of all blends — logic + charisma in one package',
      'Natural motivator; gets people moving without force',
      'Thrives under pressure; performs best on deadline',
      'Fearless in front of crowds, cameras, leadership',
      'Opportunistic and bold — sees the opening and takes it',
      'Can switch between commanding and charming instantly',
    ],
    shadows: [
      'Impatient to the point of cruelty — "move or get out of my way"',
      'Win/lose worldview — relationships become casualties',
      'Starts strong, gets bored once the hard part is done',
      'Steamrolls people while genuinely believing they\'re helping',
      'Talks over others when excited — doesn\'t realize it',
    ],
    underStress: 'Explosive. Domineering. Then suddenly charming again like nothing happened.',
    speakTo: 'Give them a challenge. Frame everything as a competition they can win. Keep it short. Show results.',
    neverDo: 'Be passive, vague, or emotional without a point.',
    famous: ['Tony Robbins', 'Elon Musk'],
  },

  Executive: {
    key: 'Executive',
    name: 'The Executive',
    blend: 'Choleric-Phlegmatic',
    primary: 'Red',
    secondary: 'Green',
    rpgClass: 'The Tactician',
    tagline: 'Results through systems. Control through calm.',
    drive: 'Get results + Maintain stability',
    lore: "You are the rarest of leaders — the one who is decisive AND stable. You don't need to be loud to be in charge. You are the person everyone eventually defers to, not because you demanded it, but because you were always right.",
    mbti: ['INTJ', 'ESTJ'],
    enneagram: ['Type 8 — The Challenger', 'Type 1 — The Perfectionist'],
    strengths: [
      'Most controlled of all Choleric blends',
      'Decisive without being reckless — thinks twice, acts once',
      'Doesn\'t need external validation — self-contained',
      'Excellent in crisis — the still center of a spinning room',
      'High standards, low drama',
      'Earns deep respect (not just compliance)',
    ],
    shadows: [
      'Cold and aloof — reads as uncaring even when they\'re not',
      'Rarely praises — assumes good work is just expected',
      'Difficulty building emotional rapport or intimacy',
      'Overconfident; believes their own judgment over all',
      'One of the least frequently found combinations — can feel deeply misunderstood',
    ],
    underStress: 'Withdrawn and cold. Then suddenly very, very blunt.',
    speakTo: 'Be brief. Lead with outcomes. Show competence. Don\'t require their emotional buy-in.',
    neverDo: 'Be dramatic, vague, or needy.',
    famous: ['Jeff Bezos', 'Margaret Thatcher'],
  },

  Director: {
    key: 'Director',
    name: 'The Director',
    blend: 'Choleric-Melancholy',
    primary: 'Red',
    secondary: 'Blue',
    rpgClass: 'The Iron General',
    tagline: 'The right result, done the right way.',
    drive: 'Get results + Do it perfectly',
    lore: "You are the most exacting person in any room. You want results AND perfection — and you will not stop until you have both. You are brilliant, intense, and occasionally terrifying. People either deeply respect you or quietly fear you.",
    mbti: ['INTJ', 'ENTJ'],
    enneagram: ['Type 1 — The Perfectionist', 'Type 8 — The Challenger'],
    strengths: [
      'Combines Choleric action with Melancholy precision — devastating combo',
      'Sets and meets impossibly high standards',
      'Analytical AND decisive — rare',
      'Self-motivated to an extreme degree',
      'Excellent strategic planner; sees both the vision and the detail',
      'Keeps score — remembers everything, misses nothing',
    ],
    shadows: [
      'Critical of everyone, including themselves — perfectionism as a weapon',
      'Impatient with those who don\'t meet their standard',
      'Rarely apologizes; views it as weakness',
      'Work relationships suffer — too demanding, too blunt',
      'Susceptible to burnout from self-imposed pressure',
      'Can be abrasive without realizing the damage',
    ],
    underStress: 'Micromanages, then explodes, then creates a 47-point improvement plan.',
    speakTo: 'Come prepared. Show data. Admit gaps before they find them. Take ownership.',
    neverDo: 'Make excuses, be sloppy, or waste their time.',
    famous: ['Steve Jobs', 'Gordon Ramsay'],
  },

  // ═══════════════════════════════════════════════════════════
  // SANGUINE (YELLOW) BLENDS — "The Language of People & Fun"
  // ═══════════════════════════════════════════════════════════

  Marketer: {
    key: 'Marketer',
    name: 'The Marketer',
    blend: 'Sanguine-Choleric',
    primary: 'Yellow',
    secondary: 'Red',
    rpgClass: 'The Champion Merchant',
    tagline: 'Be loved AND get things done.',
    drive: 'Be accepted + Get results',
    lore: "You are the strongest extrovert of all 15 blends. Two extroverted temperaments, zero filter. You are charismatic, electric, and relentlessly optimistic. You could sell philosophy to a nihilist. The world is your audience and you are always on.",
    mbti: ['ENFP', 'ENTP'],
    enneagram: ['Type 7 — The Enthusiast', 'Type 3 — The Achiever'],
    strengths: [
      'Most extroverted blend in the entire system',
      'Natural salesperson, promoter, champion of ideas',
      'Combines Sanguine charm with Choleric resolve — extremely persuasive',
      'Fearless; rejection rolls off them',
      'Energizes every room they walk into',
      'Gets things done — unlike pure Sanguine',
    ],
    shadows: [
      'Overcommits wildly; promises outrun capacity',
      'Can\'t sit still — chaos follows them',
      'Exaggerates and embellishes without meaning to',
      'Emotional volatility when not acknowledged',
      'Activity addiction — confuses motion with progress',
    ],
    underStress: 'Loud, scattered, seeks applause to self-regulate.',
    speakTo: 'Celebrate them publicly. Give them an audience. Let them lead the pitch.',
    neverDo: 'Give them detailed, data-heavy tasks without a relational hook.',
    famous: ['Will Smith', 'Richard Branson'],
  },

  Relater: {
    key: 'Relater',
    name: 'The Relater',
    blend: 'Sanguine-Phlegmatic',
    primary: 'Yellow',
    secondary: 'Green',
    rpgClass: 'The Village Healer',
    tagline: 'Be with people. Make them feel good.',
    drive: 'Be accepted + Maintain harmony',
    lore: "You are the easiest person to like on earth. The hard edges of a Sanguine are softened by Phlegmatic grace — you're fun, but you're also safe. People seek you out. Children especially adore you. You are the warm hearth in the middle of a cold world.",
    mbti: ['ESFP', 'ENFP'],
    enneagram: ['Type 2 — The Helper', 'Type 7 — The Enthusiast'],
    strengths: [
      'Most likeable of all blends — genuinely easy to be around',
      'Naturally builds relationships without effort',
      'Empathetic AND fun — rare combination',
      'Works well with almost anyone',
      'Optimistic and accommodating in equal measure',
      'Free of ego-driven behavior — it\'s all about connection',
    ],
    shadows: [
      'Least self-motivated of the Sanguine blends',
      'Avoids conflict to the point of self-erasure',
      'Struggles to say no — takes on too much',
      'Regulated by environment, not internal drive',
      'Lack of discipline; fun wins over follow-through',
      'Can waste time socializing when work is waiting',
    ],
    underStress: 'Jokes it away. Then quietly drowns.',
    speakTo: 'Be warm. Be personal. Give them relational meaning behind every task.',
    neverDo: 'Force them into high-conflict or isolated roles.',
    famous: ['Ellen DeGeneres', 'Matthew McConaughey'],
  },

  Performer: {
    key: 'Performer',
    name: 'The Performer',
    blend: 'Sanguine-Melancholy',
    primary: 'Yellow',
    secondary: 'Blue',
    rpgClass: 'The Court Poet',
    tagline: 'Be accepted AND be excellent.',
    drive: 'Be accepted + Do it right',
    lore: "You are image-conscious, creative, and deeply feeling. You want to shine AND do it right. You ask many questions. You need a plan before you act. You are one of the most complex blends — a people-lover who needs solitude, a performer who fears failure.",
    mbti: ['ESFJ', 'ENFJ'],
    enneagram: ['Type 4 — The Individualist', 'Type 2 — The Helper'],
    strengths: [
      'Highly creative — artistic, musical, expressive',
      'Image-aware and detail-conscious — quality matters',
      'Seeks recognition AND earns it through effort',
      'Analytically strong for a Sanguine blend',
      'Diplomatic and sensitive to others',
      'Great teacher and communicator',
    ],
    shadows: [
      'Fear of failure paralyzes action — "if I can\'t be sure I\'ll succeed, I won\'t try"',
      'Guilt-prone; self-critical under the fun exterior',
      'Information-hungry before acting — can stall indefinitely',
      'Inconsistent follow-through despite good intentions',
      'Needs security AND freedom — wants contradictory things',
    ],
    underStress: 'Withdraws dramatically. Guilt-spirals. Re-emerges performing.',
    speakTo: 'Create psychological safety. Celebrate their achievements publicly. Give them structure AND creative freedom.',
    neverDo: 'Embarrass them or demand action before they feel ready.',
    famous: ['Robin Williams', 'Lady Gaga'],
  },

  // ═══════════════════════════════════════════════════════════
  // PHLEGMATIC (GREEN) BLENDS — "The Language of Calm & Harmony"
  // ═══════════════════════════════════════════════════════════

  Inspector: {
    key: 'Inspector',
    name: 'The Inspector',
    blend: 'Phlegmatic-Choleric',
    primary: 'Green',
    secondary: 'Red',
    rpgClass: 'The Ranger',
    tagline: 'Get it done. Without drama.',
    drive: 'Maintain harmony + Get results',
    lore: "You don't need recognition, applause, or a team meeting. You need a clear task and the freedom to execute it your way. Quietly industrious and more determined than you appear — people consistently underestimate you. That works in your favor.",
    mbti: ['ISTJ', 'ISFJ'],
    enneagram: ['Type 6 — The Loyalist', 'Type 9 — The Peacemaker'],
    strengths: [
      'Most productive of all Phlegmatic blends — actually gets things done',
      'Steady and reliable — doesn\'t crack under pressure',
      'Works independently without needing supervision',
      'Sets their own pace and keeps it',
      'Detail-oriented AND willing to push',
      'Loyal; once committed, fully committed',
    ],
    shadows: [
      'Stubbornly resistant to change — especially sudden change',
      'Once their mind is made up, nearly impossible to redirect',
      'Struggles to ask for help; absorbs too much alone',
      'Difficulty saying no — takes on more than they can handle',
      'Pleasant voice, soft exterior masking real frustration inside',
    ],
    underStress: 'Does everything alone until they break. Then resents everyone silently.',
    speakTo: 'Give them autonomy. Let them set the pace. Don\'t micromanage.',
    neverDo: 'Spring sudden changes without notice or override their method.',
    famous: ['Warren Buffett', 'Tim Cook'],
  },

  Harmonizer: {
    key: 'Harmonizer',
    name: 'The Harmonizer',
    blend: 'Phlegmatic-Sanguine',
    primary: 'Green',
    secondary: 'Yellow',
    rpgClass: 'The Village Elder',
    tagline: 'Peaceful connection. Gentle inclusion.',
    drive: 'Maintain harmony + Be accepted',
    lore: "You are the most friendly of all the Phlegmatic blends. You accept everyone, judge no one, and make every space feel safe. You're not the loudest in the room — but somehow everyone ends up near you. You are quiet warmth.",
    mbti: ['ISFP', 'INFP'],
    enneagram: ['Type 9 — The Peacemaker', 'Type 2 — The Helper'],
    strengths: [
      'Deeply accepting; tolerance is a superpower',
      'Creates harmony in fractured environments',
      'Loyal and dependable — shows up, every time',
      'Easy to work with; no ego, no drama',
      'Learns by doing — hands-on and practical',
      'Genuinely caring without being overwhelming',
    ],
    shadows: [
      'Extreme difficulty saying no',
      'Overly independent-minded — resists being managed',
      'Once their mind is set, stubborn to a fault',
      'Very hard to read — stoic exterior hides real feeling',
      'Can carry silent resentment for a long time',
    ],
    underStress: 'Goes completely quiet. Smiles. Disappears internally.',
    speakTo: 'Be kind. Patient. Give them time. Create relational safety before making requests.',
    neverDo: 'Push, pressure, or publicly challenge them.',
    famous: ['Fred Rogers', 'Barack Obama'],
  },

  Helper: {
    key: 'Helper',
    name: 'The Helper',
    blend: 'Phlegmatic-Melancholy',
    primary: 'Green',
    secondary: 'Blue',
    rpgClass: 'The Chronicler',
    tagline: 'Do it right. Don\'t rush. Keep the peace.',
    drive: 'Maintain harmony + Do it right',
    lore: "You are the most consistent person alive. Routine is not a trap — it's your architecture. You don't move fast, but you move correctly. Patience, control, and deliberateness define you. You are the person teams don't appreciate until they don't have you.",
    mbti: ['ISFJ', 'INFJ'],
    enneagram: ['Type 6 — The Loyalist', 'Type 5 — The Investigator'],
    strengths: [
      'Amiable, easygoing, and deeply reliable',
      'Patient to an extraordinary degree',
      'High standards — won\'t submit anything below their bar',
      'Detail-oriented and thorough in everything',
      'Consistent performer; doesn\'t spike or crash',
      'Excellent in roles requiring care, precision, and longevity',
    ],
    shadows: [
      'The classic procrastinator — everything takes longer than needed',
      'Resistant to urgency; resents being pushed',
      'Can stall indefinitely when uncertain',
      'Prone to grudge-holding quietly',
      'Slow to forgive; patience can flip into withdrawal',
      'Low self-promotion — easily overlooked despite high output',
    ],
    underStress: 'Slows to a stop. Builds internal resentment. Erupts eventually.',
    speakTo: 'Be gentle. Don\'t rush them. Explain the why behind requests. Show appreciation specifically.',
    neverDo: 'Create artificial urgency or put them on the spot in public.',
    famous: ['Mother Teresa', 'Gandhi'],
  },

  // ═══════════════════════════════════════════════════════════
  // MELANCHOLY (BLUE) BLENDS — "The Language of Order & Perfection"
  // ═══════════════════════════════════════════════════════════

  Achiever: {
    key: 'Achiever',
    name: 'The Achiever',
    blend: 'Melancholy-Choleric',
    primary: 'Blue',
    secondary: 'Red',
    rpgClass: 'The Arcane Knight',
    tagline: 'The right answer. Executed perfectly. Now.',
    drive: 'Do it right + Get results',
    lore: "You are one of the most demanding blends in existence — on yourself most of all. The Melancholy's perfectionism is turbocharged by Choleric urgency. You think deeply before acting, then act with total commitment. You are right more than almost anyone. You are also one of the toughest people to work for.",
    mbti: ['INTJ'],
    enneagram: ['Type 1 — The Perfectionist', 'Type 5 — The Investigator'],
    strengths: [
      'Analytical AND willing to act — extremely rare',
      'Choleric side overrides Melancholy introversion under pressure',
      'Incredibly high standards — quality is non-negotiable',
      'Strategic thinker who can also execute',
      'Self-motivated; doesn\'t need cheerleading',
      'Corrects mistakes fast and without sentiment',
    ],
    shadows: [
      'Toughest blend to be in a relationship with — personal or professional',
      'Critical to the point of crushing morale',
      'Unforgiving of mistakes, including their own',
      'Anger problem AND tendency toward fear — both temperaments carry insecurity',
      'Needs to be admired; drives performance at personal cost',
      'Can burn out teams through sheer standard-setting',
    ],
    underStress: 'Goes cold. Critical. May become passive-aggressive before erupting.',
    speakTo: 'Competence is the only currency. Show your work. Prove yourself quietly.',
    neverDo: 'Make excuses, show sloppiness, or challenge them publicly without receipts.',
    famous: ['Nikola Tesla', 'Christopher Nolan'],
  },

  Diplomat: {
    key: 'Diplomat',
    name: 'The Diplomat',
    blend: 'Melancholy-Sanguine',
    primary: 'Blue',
    secondary: 'Yellow',
    rpgClass: 'The Emissary',
    tagline: 'Do it right AND maintain connection.',
    drive: 'Do it right + Be accepted',
    lore: "You are the most friendly of all Melancholy blends — which is still quite introverted, but you have a natural smile that disarms people. You are analytically brilliant and genuinely kind. You review every day before sleeping. You plan everything and feel guilty about most of it.",
    mbti: ['INFJ', 'INFP'],
    enneagram: ['Type 4 — The Individualist', 'Type 2 — The Helper'],
    strengths: [
      'Naturally diplomatic — restores unity without force',
      'Analytical AND sensitive to others\' needs — rare',
      'Versatile and productive; works well with most people',
      'Talkative when comfortable; profound when trusted',
      'High personal ambitions with ethical guardrails',
      'The most emotionally intelligent of all Melancholy blends',
    ],
    shadows: [
      'High guilt — even for things not their fault',
      'Apologizes excessively; can be overly self-critical',
      'Dreams big but struggles to take action',
      'Needs long periods alone to recharge',
      'Fear of failure can suppress high potential',
    ],
    underStress: 'Apologizes repeatedly. Overanalyzes. Eventually withdraws entirely.',
    speakTo: 'Build trust slowly. Honor their privacy. Let them come to you.',
    neverDo: 'Force them into high-visibility roles before they\'re ready.',
    famous: ['C.S. Lewis', 'Keanu Reeves'],
  },

  Analyst: {
    key: 'Analyst',
    name: 'The Analyst',
    blend: 'Melancholy-Phlegmatic',
    primary: 'Blue',
    secondary: 'Green',
    rpgClass: 'The Lorekeeper',
    tagline: 'Do it right. Figure out what "right" means first.',
    drive: 'Do it right + Maintain stability',
    lore: "You are the most detail-oriented, carefully analytical person in the system. You do not move until you have all the information. You will not submit anything below your standard. You are cautious, deliberate, and deeply private. You are also the person everyone calls when they actually need it done correctly.",
    mbti: ['INTP', 'ISTJ'],
    enneagram: ['Type 5 — The Investigator', 'Type 6 — The Loyalist'],
    strengths: [
      'Extremely analytical — processes information with total thoroughness',
      'Combines Melancholy precision with Phlegmatic patience — nothing rushed, nothing missed',
      'Consistently high output quality',
      'Cautious planner — rarely makes avoidable mistakes',
      'Deep thinker and trusted confidant',
      'Not swayed by trends, pressure, or social approval',
    ],
    shadows: [
      'Analysis paralysis — can\'t act until certainty is reached (which it never is)',
      'Pessimistic default — first thought is what could go wrong',
      'Hard to please; others\' work rarely meets their standard',
      'Procrastination through over-preparation',
      'Can carry deep sadness or melancholy without showing it',
      'Withdraws almost completely under stress',
    ],
    underStress: 'Goes silent. Spirals internally. Eventually stops producing.',
    speakTo: 'Give them time, data, and space. Don\'t rush the process.',
    neverDo: 'Demand quick decisions or dismiss their need for completeness.',
    famous: ['Albert Einstein', 'Bill Gates'],
  },

  // ═══════════════════════════════════════════════════════════
  // PURE TYPES
  // ═══════════════════════════════════════════════════════════

  Strategist: {
    key: 'Strategist',
    name: 'The Strategist',
    blend: 'Pure Melancholic',
    primary: 'Blue',
    secondary: 'Pure',
    rpgClass: 'The Deep Scholar',
    tagline: 'Depth first. Standards always. Nothing shallow survives.',
    drive: 'Pure meaning and quality drive — no softening influence',
    lore: "You are undiluted depth: analytical, exacting, private, and intensely aware of what could be better. You see patterns others miss and carry standards that can create great work — or a heavy inner burden.",
    mbti: ['INTJ', 'INFJ', 'ISTJ'],
    enneagram: ['Type 1 — The Perfectionist', 'Type 5 — The Investigator'],
    strengths: [
      'Extraordinary analytical depth',
      'Uncompromising standards for quality',
      'Notices flaws, patterns, and hidden risks early',
      'Loyal to truth, craft, and meaning',
      'Capable of profound creative or intellectual work',
    ],
    shadows: [
      'Perfectionism can become paralysis',
      'Inner criticism rarely switches off',
      'Can withdraw instead of asking for support',
      'May see what is wrong before what is working',
      'High standards can make relationships feel evaluated',
    ],
    underStress: 'Withdraws into rumination, becomes more critical, and may delay action until certainty feels possible.',
    speakTo: 'Be precise, sincere, and prepared. Give them time to process and show respect for quality.',
    neverDo: 'Rush them, dismiss their concerns, or treat standards as needless negativity.',
    famous: ['Emily Dickinson', 'Nikola Tesla'],
  },

  Commander: {
    key: 'Commander',
    name: 'The Commander',
    blend: 'Pure Choleric',
    primary: 'Red',
    secondary: 'Pure',
    rpgClass: 'The War Chief',
    tagline: 'Total control. Total results. No compromise.',
    drive: 'Pure results drive — no softening influence',
    lore: "Rarest of the pure types. Unfiltered Choleric with no secondary modifier. Decisive, forceful, occasionally brilliant. Almost impossible to be close to.",
    mbti: ['ENTJ'],
    enneagram: ['Type 8 — The Challenger'],
    strengths: [
      'Absolute decisiveness — no hesitation',
      'Unmatched drive and determination',
      'Natural authority that others follow instinctively',
      'Gets results when everyone else fails',
      'Fearless in the face of opposition',
    ],
    shadows: [
      'Completely uncompromising — "my way" is the only way',
      'Emotionally distant to the point of isolation',
      'Alienates almost everyone eventually',
      'Sees relationships as transactions',
      'No moderating influence — intensity is always at maximum',
    ],
    underStress: 'Becomes tyrannical. Demands absolute compliance. Burns bridges without noticing.',
    speakTo: 'Results only. Prove competence immediately. Never show weakness.',
    neverDo: 'Question their authority or show emotional need.',
    famous: ['Alexander the Great', 'Napoleon Bonaparte'],
  },

  Spark: {
    key: 'Spark',
    name: 'The Spark',
    blend: 'Pure Sanguine',
    primary: 'Yellow',
    secondary: 'Pure',
    rpgClass: 'The Wild Card',
    tagline: 'Connection. Joy. Presence. (Just... presence.)',
    drive: 'Pure people-energy — no anchoring influence',
    lore: "The most extroverted, most fun, and most unfocused of all types. No secondary temperament to anchor results or standards. High ceiling for inspiration, low floor for execution.",
    mbti: ['ESFP'],
    enneagram: ['Type 7 — The Enthusiast'],
    strengths: [
      'Absolutely magnetic personality — impossible not to like',
      'Brings joy and energy wherever they go',
      'Makes everyone feel special and seen',
      'Lives fully in the present moment',
      'Inspires others through sheer enthusiasm',
    ],
    shadows: [
      'Zero follow-through — commitments evaporate',
      'Cannot focus on anything for long',
      'Avoids all forms of depth or difficulty',
      'Relationships stay surface-level',
      'No anchoring force — chaos without structure',
    ],
    underStress: 'Becomes scattered, dramatic, seeks constant stimulation to avoid feelings.',
    speakTo: 'Be fun. Be present. Celebrate with them. Don\'t expect follow-through.',
    neverDo: 'Assign detailed, long-term projects or demand emotional depth.',
    famous: ['Peter Pan (fictional)', 'Ferris Bueller (fictional)'],
  },

  Guardian: {
    key: 'Guardian',
    name: 'The Guardian',
    blend: 'Pure Phlegmatic',
    primary: 'Green',
    secondary: 'Pure',
    rpgClass: 'The Still Water',
    tagline: 'Peace preserved. Pressure absorbed. Nothing rushed.',
    drive: 'Pure stability drive — no activating influence',
    lore: "You are undiluted calm: steady, patient, accepting, and deeply resistant to unnecessary pressure. Your gift is peace. Your risk is disappearing so completely into comfort that your own direction goes quiet.",
    mbti: ['ISFP', 'ISFJ'],
    enneagram: ['Type 9 — The Peacemaker'],
    strengths: [
      'Deep patience and emotional steadiness',
      'Naturally calming presence',
      'Excellent listener and stabilizer',
      'Low-drama, loyal, and accepting',
      'Creates safety for other people',
    ],
    shadows: [
      'Can avoid initiative until life decides for them',
      'Conflict avoidance may become self-erasure',
      'May hide disagreement behind silence',
      'Can drift, delay, or disappear under pressure',
      'Comfort can become a cage',
    ],
    underStress: 'Withdraws into passivity, goes quiet, and waits for pressure to pass instead of naming what they need.',
    speakTo: 'Be calm, kind, and concrete. Give them safety, then invite one clear next step.',
    neverDo: 'Pressure, shame, or corner them into sudden confrontation.',
    famous: ['The Quiet Neighbor', 'Keanu Reeves (partial)'],
  },
}

// Get temperament color for a blend
export function getBlendColors(blend: Blend): { primary: string; secondary: string } {
  const colorMap: Record<TemperamentKey, string> = {
    Red: '#E63946',
    Yellow: '#FFD700',
    Blue: '#4CC9F0',
    Green: '#52B788',
  }
  
  return {
    primary: colorMap[blend.primary],
    secondary: blend.secondary === 'Pure'
      ? colorMap[blend.primary] 
      : colorMap[blend.secondary],
  }
}
