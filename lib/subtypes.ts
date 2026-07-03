export type SubtypeSlug =
  // Pure types
  | 'pure-sanguine'
  | 'pure-choleric'
  | 'pure-melancholic'
  | 'pure-phlegmatic'
  // Sanguine blends
  | 'sanguine-choleric'
  | 'sanguine-melancholic'
  | 'sanguine-phlegmatic'
  // Choleric blends
  | 'choleric-sanguine'
  | 'choleric-melancholic'
  | 'choleric-phlegmatic'
  // Melancholic blends
  | 'melancholic-sanguine'
  | 'melancholic-choleric'
  | 'melancholic-phlegmatic'
  // Phlegmatic blends
  | 'phlegmatic-sanguine'
  | 'phlegmatic-choleric'
  | 'phlegmatic-melancholic'

export interface DevelopmentStage {
  stage: string
  focus: string
  practice: string
  milestone: string
}

export interface Subtype {
  slug: SubtypeSlug
  name: string
  title: string
  tagline: string
  icon: string
  primary: 'sanguine' | 'choleric' | 'melancholic' | 'phlegmatic'
  secondary: 'sanguine' | 'choleric' | 'melancholic' | 'phlegmatic' | 'pure'
  axes: string
  overview: string
  strengths: string[]
  weaknesses: string[]
  communicationStyle: {
    pace: string
    tone: string
    preferredInput: string
    petPeeve: string
  }
  career: {
    idealRoles: string[]
    rolesToAvoid: string[]
  }
  stressResponse: string
  recoveryStrategy: string
  developmentPriority?: string
  developmentPath?: DevelopmentStage[]
  famousExamples: { name: string; description: string }[]
  misidentifications: { type: string; difference: string }[]
  relationshipPatterns?: string
  blendKey?: string // Maps to the RPG blend key if applicable
}

// Color mapping for temperaments
export const SUBTYPE_COLORS = {
  sanguine: {
    primary: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.3)',
    gradient: 'from-amber-500 to-yellow-600',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
  },
  choleric: {
    primary: '#EF4444',
    glow: 'rgba(239, 68, 68, 0.3)',
    gradient: 'from-red-500 to-orange-600',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
  },
  melancholic: {
    primary: '#3B82F6',
    glow: 'rgba(59, 130, 246, 0.3)',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
  phlegmatic: {
    primary: '#10B981',
    glow: 'rgba(16, 185, 129, 0.3)',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
  },
}

export const SUBTYPES: Record<SubtypeSlug, Subtype> = {
  // ═══════════════════════════════════════════════════════════
  // PURE TYPES
  // ═══════════════════════════════════════════════════════════

  'pure-sanguine': {
    slug: 'pure-sanguine',
    name: 'Pure Sanguine',
    title: 'The Undiluted Spark',
    tagline: 'Maximum extraversion, maximum warmth, maximum chaos — the life force in human form.',
    icon: '🎭',
    primary: 'sanguine',
    secondary: 'pure',
    axes: 'Maximum Extraversion + Maximum Stability',
    overview: `The Pure Sanguine is the maximum expression of the Sanguine temperament with no secondary type to temper it. This is undiluted social energy: effortless charm, infectious enthusiasm, boundless optimism, and absolutely zero capacity for sustained focus on anything that isn't fun.

Pure Sanguines are rare and unforgettable. They light up every room they enter and leave chaos in their wake. Their gift is connection — their curse is follow-through.`,
    strengths: [
      'Instant rapport with virtually anyone — social genius',
      'Natural entertainer; brings joy wherever they go',
      'Boundless enthusiasm that motivates others',
      'Recovers from setbacks almost immediately',
      'Creative improviser; thinks on their feet',
    ],
    weaknesses: [
      'Chronic inability to finish what they start',
      'Promises far more than they deliver',
      'Allergic to routine, discipline, and follow-through',
      'Emotionally shallow; struggles with depth',
      'Attention-dependent; wilts without an audience',
    ],
    communicationStyle: {
      pace: 'Fast, enthusiastic, tangential',
      tone: 'Warm, expressive, animated',
      preferredInput: 'Fun, exciting, personal, short',
      petPeeve: 'Boring people, rigid rules, being ignored, long explanations',
    },
    career: {
      idealRoles: [
        'Entertainment and performing arts',
        'Event planning and hosting',
        'Sales (relationship-based)',
        'Public relations and media',
        'Travel and hospitality',
      ],
      rolesToAvoid: [
        'Isolated research or analysis',
        'Highly structured administrative roles',
        'Anything requiring sustained attention to detail',
        'Roles with little human interaction',
      ],
    },
    stressResponse: 'Under stress, Pure Sanguines become scattered and attention-seeking. They may make jokes inappropriately, talk excessively, or seek distraction rather than addressing problems.',
    recoveryStrategy: 'Social connection with supportive friends, fun activities, and permission to process emotions through talking.',
    developmentPriority: `The Pure Sanguine's single most important growth area is discipline and follow-through. They must deliberately cultivate: From Choleric — Focus, goal-setting, and completion. From Melancholic — Depth, reflection, and attention to quality. From Phlegmatic — Patience, consistency, and listening.`,
    famousExamples: [
      { name: 'Jim Carrey', description: 'Boundless energy, constant entertainment, emotional volatility' },
      { name: 'Robin Williams (partial)', description: 'Electric improvisational genius, struggled with depth and stillness' },
    ],
    misidentifications: [
      { type: 'Sanguine-Phlegmatic', difference: 'San-Phlegs are calmer and more consistent. Pure Sanguines have more intensity and chaos.' },
      { type: 'ADHD', difference: 'Pure Sanguine is a temperament, not a disorder. However, Pure Sanguines may be more vulnerable to ADHD-like patterns.' },
    ],
  },

  'pure-choleric': {
    slug: 'pure-choleric',
    name: 'Pure Choleric',
    title: 'The Unstoppable Force',
    tagline: 'Raw willpower and drive with no softening influence — the most powerful and most alienating of all types.',
    icon: '🔥',
    primary: 'choleric',
    secondary: 'pure',
    axes: 'Maximum Extraversion + Maximum Reactivity',
    overview: `The Pure Choleric is the maximum expression of the Choleric temperament with no secondary type to soften it. This is undiluted drive: relentless ambition, total decisiveness, fearless leadership, and absolutely zero patience for weakness — in themselves or anyone else.

Pure Cholerics are the rarest of all types. Their untempered intensity makes them extraordinarily effective and extraordinarily difficult to be around.`,
    strengths: [
      'Unstoppable executor — when they decide something will happen, it happens',
      'Fearless leadership — no hesitation, no second-guessing, no backing down',
      'Peak productivity — relentless efficiency others can\'t sustain',
      'Crisis mastery — thinks clearly under pressure, acts decisively',
      'Visionary force — sees what needs to change and makes it happen',
    ],
    weaknesses: [
      'Ruthless — can be genuinely cruel without intending to be',
      'Alienating — intensity pushes people away',
      'Zero tolerance for weakness — views emotional needs as character flaws',
      'Burnout-prone — runs at maximum capacity until they crash',
      'Emotionally isolated — may not know how to access their own emotions',
    ],
    communicationStyle: {
      pace: 'Fast, direct, impatient',
      tone: 'Commanding, brief, results-only',
      preferredInput: 'Bottom-line, competent, action-oriented',
      petPeeve: 'Weakness, inefficiency, excuses, emotional displays, indecision',
    },
    career: {
      idealRoles: [
        'CEO, founder, and turnaround specialist',
        'Military command (combat or special operations)',
        'Emergency medicine and trauma surgery',
        'Litigation and criminal defense',
        'Investment banking and high-stakes finance',
      ],
      rolesToAvoid: [
        'Any role requiring sustained empathy or emotional labor',
        'Support or service roles',
        'Consensus-based organizations',
        'Roles with no autonomy',
      ],
    },
    stressResponse: 'Under stress, Pure Cholerics become more domineering and explosive. They may run over people, make unilateral decisions, and alienate allies.',
    recoveryStrategy: 'Physical challenge (sports, exercise), strategic planning session to regain control, and one trusted advisor to process with.',
    developmentPriority: `The Pure Choleric's single most important growth area is empathy and emotional connection. They must deliberately cultivate: From Sanguine — Warmth, social enjoyment, and lightheartedness. From Melancholic — Self-reflection, sensitivity, and depth of feeling. From Phlegmatic — Patience, listening, and acceptance.`,
    famousExamples: [
      { name: 'Napoleon Bonaparte', description: 'Pure strategic drive, relentless ambition, inability to stop or delegate' },
      { name: 'General George Patton', description: 'Fierce, demanding, results-obsessed, alienating to peers' },
    ],
    misidentifications: [
      { type: 'Choleric-Melancholic', difference: 'Chol-Mels have noticeably more self-reflection and quality-consciousness. Pure Cholerics are pure force.' },
      { type: 'Antisocial PD', difference: 'Pure Choleric intensity is not pathological. The difference is that Pure Cholerics can develop empathy — they just haven\'t prioritized it.' },
    ],
    relationshipPatterns: 'Pure Cholerics are challenging partners. They offer loyalty, protection, and material provision — but emotional availability is severely limited. They need partners with extraordinary emotional resilience who can stand their ground without escalating.',
  },

  'pure-melancholic': {
    slug: 'pure-melancholic',
    name: 'Pure Melancholic',
    title: 'The Profound Depth',
    tagline: 'Unfiltered depth, uncompromising standards, and unrelenting inner intensity — the most gifted and most tormented of all types.',
    icon: '🌑',
    primary: 'melancholic',
    secondary: 'pure',
    axes: 'Maximum Introversion + Maximum Reactivity',
    overview: `The Pure Melancholic is the maximum expression of the Melancholic temperament with no secondary type to balance it. This is undiluted depth: extraordinary analytical ability, genius-level insight, obsessive attention to detail, and a relentless inner critic that never rests.

Pure Melancholics produce some of humanity's greatest art, science, and philosophy — often at tremendous personal cost. Their capacity for depth is unmatched, but so is their capacity for suffering.`,
    strengths: [
      'Genius-level insight — sees patterns others cannot perceive',
      'Unmatched attention to detail — nothing escapes their notice',
      'Profound creativity — inner world of extraordinary depth and originality',
      'Intellectual honesty — pursues truth relentlessly',
      'Deep loyalty — when they commit, they commit completely',
    ],
    weaknesses: [
      'Crippling perfectionism — becomes paralyzing without counterbalance',
      'Social isolation — finds most interaction shallow or draining',
      'Chronic dissatisfaction — nothing ever meets their standards',
      'Depression vulnerability — high sensitivity + social withdrawal + self-criticism',
      'Analysis paralysis at maximum intensity',
    ],
    communicationStyle: {
      pace: 'Slow, deliberate, sometimes painfully thorough',
      tone: 'Precise, serious, deeply thoughtful',
      preferredInput: 'Intelligent, sincere, detailed, unhurried',
      petPeeve: 'Superficiality, carelessness, loud confidence without substance, being interrupted',
    },
    career: {
      idealRoles: [
        'Research science (theoretical physics, pure mathematics)',
        'Serious literary fiction and poetry',
        'Classical music composition',
        'Philosophy and academic scholarship',
        'Forensic analysis and investigation',
        'Software engineering (complex systems)',
      ],
      rolesToAvoid: [
        'Sales, PR, or any high-social-energy role',
        'Fast-paced startup environments',
        'Customer-facing service roles',
        'Roles requiring constant compromise on quality',
      ],
    },
    stressResponse: 'Under stress, Pure Melancholics withdraw into rumination, becoming more critical of themselves and others, spiraling into perfectionism and isolation.',
    recoveryStrategy: 'Gentle invitation (not pressure) from a safe person, quiet restorative activity (nature, reading, music), and small, manageable next steps.',
    developmentPriority: `The Pure Melancholic's single most important growth area is imperfect action and self-compassion. They must deliberately cultivate: From Sanguine — Joy, spontaneity, and social warmth. From Choleric — Decisiveness, drive, and willingness to ship imperfect work. From Phlegmatic — Acceptance, patience with self, and emotional equilibrium.`,
    famousExamples: [
      { name: 'Emily Dickinson', description: 'Profound poetic genius, near-total social withdrawal, lifelong creative devotion' },
      { name: 'Nikola Tesla', description: 'Obsessive analytical depth, social isolation, uncompromising standards' },
      { name: 'Søren Kierkegaard', description: 'Existential depth, melancholic temperament, extraordinary philosophical insight' },
    ],
    misidentifications: [
      { type: 'Melancholic-Phlegmatic', difference: 'Mel-Phlegs are calmer and gentler. Pure Melancholics have a more intense, restless inner life.' },
      { type: 'Clinical Depression', difference: 'Pure Melancholic temperament is a stable personality pattern, not a mood disorder. However, Pure Melancholics are at higher risk for depression.' },
    ],
    relationshipPatterns: 'Pure Melancholics are deeply devoted but difficult partners. They offer extraordinary loyalty, intellectual depth, and attentiveness — but their perfectionism, moodiness, and social withdrawal can strain even the most patient partner.',
  },

  'pure-phlegmatic': {
    slug: 'pure-phlegmatic',
    name: 'Pure Phlegmatic',
    title: 'The Absolute Calm',
    tagline: 'Total serenity, infinite patience, and complete absence of urgency — the most peaceful and most passive of all types.',
    icon: '🌊',
    primary: 'phlegmatic',
    secondary: 'pure',
    axes: 'Maximum Introversion + Maximum Stability',
    overview: `The Pure Phlegmatic is the maximum expression of the Phlegmatic temperament with no secondary type to activate it. This is undiluted calm: absolute steadiness, infinite patience, complete emotional equilibrium, and — in its shadow — total passivity.

Pure Phlegmatic is considered by many systems to be the rarest of all types. The Phlegmatic nature is so accommodating that it almost always absorbs influence from a secondary temperament.`,
    strengths: [
      'Unshakable steadiness — nothing rattles them',
      'Infinite patience — can wait, listen, and endure longer than any other type',
      'Ultimate team player — cooperates naturally, supports genuinely',
      'Emotional equilibrium — mood is remarkably consistent',
      'Non-judgmental acceptance — accepts people as they are',
    ],
    weaknesses: [
      'Complete passivity — nothing moves them to action without external force',
      'No initiative whatsoever — doesn\'t start, suggest, or change things',
      'May never reach potential — capabilities unexplored',
      'Enabling behavior — acceptance of everything can enable dysfunction',
      'Invisible suffering — their own needs go unnoticed',
    ],
    communicationStyle: {
      pace: 'Very slow, unhurried, minimal',
      tone: 'Gentle, agreeable, brief',
      preferredInput: 'Calm, non-demanding, supportive',
      petPeeve: 'Pressure, confrontation, rapid change, being forced to choose',
    },
    career: {
      idealRoles: [
        'Administrative support in stable environments',
        'Factory or process work with consistent routines',
        'Caretaking roles with clear protocols',
        'Library and archival work',
        'Grounds maintenance and horticulture',
      ],
      rolesToAvoid: [
        'Any role requiring initiative, competition, or self-direction',
        'Leadership positions',
        'Sales, marketing, or client acquisition',
        'High-stakes decision-making environments',
      ],
    },
    stressResponse: 'Under stress, Pure Phlegmatics withdraw into even greater passivity, becoming almost invisible. They go quiet and wait for the stress to pass.',
    recoveryStrategy: 'Time alone in familiar, comfortable surroundings. Permission to not act. Gentle re-engagement when ready.',
    developmentPriority: `The Pure Phlegmatic's single most important growth area is initiative and self-direction. They must deliberately cultivate: From Sanguine — Social engagement and enthusiasm. From Choleric — Goal-setting, decisiveness, and drive. From Melancholic — Passion for quality and intellectual depth.`,
    famousExamples: [
      { name: 'The Quiet Neighbor', description: 'Pure Phlegmatic examples are difficult to identify in famous figures — because fame itself requires initiative' },
      { name: 'Keanu Reeves (partial)', description: 'Even the most Phlegmatic public figures show clear secondary influences' },
    ],
    misidentifications: [
      { type: 'Phlegmatic-Sanguine', difference: 'Phleg-Sans have noticeably more social warmth and humor.' },
      { type: 'Depression', difference: 'Pure Phlegmatic is a contented calm, not a depressed flatness. They\'re not unhappy — they\'re simply unstirred.' },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // SANGUINE BLENDS
  // ═══════════════════════════════════════════════════════════

  'sanguine-choleric': {
    slug: 'sanguine-choleric',
    name: 'Sanguine-Choleric',
    title: 'The Charismatic Achiever',
    tagline: 'The most outwardly powerful temperament blend — magnetic personality fused with relentless drive.',
    icon: '⚡',
    primary: 'sanguine',
    secondary: 'choleric',
    axes: 'Extraverted + Stable / Extraverted + Reactive',
    blendKey: 'Marketer',
    overview: `The Sanguine-Choleric is the super-extrovert of the temperament system. This blend combines the Sanguine's social magnetism, optimism, and spontaneity with the Choleric's decisiveness, ambition, and results-orientation. The result is a person who is simultaneously the life of the party and the one driving everyone toward a goal.

San-Chols are always on the move. They think fast, talk fast, decide fast, and act fast. Their emotions are explosive but brief — they flare up quickly and forgive just as quickly.`,
    strengths: [
      'Magnetic leadership — attracts followers naturally',
      'Persuasion mastery — combines emotional storytelling with bottom-line directness',
      'Creative decisiveness — picks ideas and runs with them',
      'Highest raw energy of any subtype',
      'Resilience — setbacks roll off them',
    ],
    weaknesses: [
      'Obnoxious under threat — loud, domineering, dismissive when challenged',
      'Hurtful without realizing it — rapid-fire communication wounds others',
      'Overcommitment — says yes to everything, can\'t deliver on all',
      'Shallow relationships — moves too fast for intimacy',
      'Impulsive risk-taking — quick decisions + optimism bias',
    ],
    communicationStyle: {
      pace: 'Fast, energetic, sometimes overwhelming',
      tone: 'Enthusiastic, confident, persuasive',
      preferredInput: 'Brief, exciting, results-oriented',
      petPeeve: 'Long-winded explanations, hesitation, negativity',
    },
    career: {
      idealRoles: [
        'Sales leadership and business development',
        'Entrepreneurship and startup founding',
        'Marketing and brand evangelism',
        'Event management and entertainment',
        'Political campaigning and public relations',
        'Motivational speaking and coaching',
      ],
      rolesToAvoid: [
        'Isolated data analysis',
        'Highly repetitive, process-driven work',
        'Roles requiring sustained patience and diplomacy',
        'Backend support with no visibility',
      ],
    },
    stressResponse: 'Under mild stress, San-Chols speed up — talk faster, do more, try to power through. Under severe stress, they oscillate between Sanguine avoidance (distraction, denial) and Choleric aggression (blaming, controlling).',
    recoveryStrategy: 'Physical activity, social connection with trusted friends, and a concrete action plan to regain control.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice the overcommitment cycle', practice: 'Track every yes for 2 weeks — how many did you actually follow through on?', milestone: '"I see that I promise more than I deliver"' },
      { stage: '2. Depth', focus: 'Build deeper connections', practice: 'Have one 30-minute conversation per week with no agenda, no selling, no multitasking', milestone: 'Someone tells you they feel truly heard by you' },
      { stage: '3. Follow-through', focus: 'Finish what you start', practice: 'Complete your current project before starting a new one — no exceptions for 30 days', milestone: 'Deliver 3 projects end-to-end without dropping any' },
      { stage: '4. Integration', focus: 'Charisma with substance', practice: 'Mentor someone with sustained commitment over 6 months', milestone: 'Others describe you as both inspiring and reliable' },
    ],
    famousExamples: [
      { name: 'Theodore Roosevelt', description: 'Boundless energy, social magnetism, decisive action' },
      { name: 'Tony Robbins', description: 'High-octane motivational energy with strategic business mind' },
      { name: 'Richard Branson', description: 'Adventurous charm combined with entrepreneurial drive' },
    ],
    misidentifications: [
      { type: 'Choleric-Sanguine', difference: 'San-Chols lead with warmth and charm; Chol-Sans lead with authority and results. San-Chols attract; Chol-Sans command.' },
      { type: 'Pure Sanguine', difference: 'San-Chols have noticeably more drive and follow-through than pure Sanguines.' },
    ],
    relationshipPatterns: 'San-Chols are exciting but demanding partners. They bring passion, adventure, and spontaneity — but need a partner who can keep up with their pace. Best paired with Phlegmatic-Melancholic or Melancholic-Phlegmatic types who provide grounding depth.',
  },

  'sanguine-melancholic': {
    slug: 'sanguine-melancholic',
    name: 'Sanguine-Melancholic',
    title: 'The Emotional Artist',
    tagline: 'The most emotionally dynamic blend — oscillating between dazzling highs and contemplative depths.',
    icon: '🎨',
    primary: 'sanguine',
    secondary: 'melancholic',
    axes: 'Extraverted + Stable / Introverted + Reactive',
    blendKey: 'Performer',
    overview: `The Sanguine-Melancholic is one of the most emotionally complex temperament blends. It combines the Sanguine's outgoing warmth, enthusiasm, and social energy with the Melancholic's depth, sensitivity, and analytical nature.

This blend creates rapid mood swings — the San-Mel can shift from euphoria to melancholy in the space of an afternoon. They feel everything intensely: joy is ecstatic, disappointment is devastating, beauty is transcendent, criticism is crushing.`,
    strengths: [
      'Creative depth with communicative power — the artist who can explain their art',
      'Emotional intelligence — reads rooms and people with extraordinary accuracy',
      'Passionate advocacy — communicates with both heart and evidence',
      'Engaging storytelling — emotional range makes them captivating',
      'Empathic connection — connects on both surface and deep levels',
    ],
    weaknesses: [
      'Mood volatility — Sanguine optimism collides with Melancholic pessimism',
      'Internal contradiction — craves social interaction but needs solitude',
      'Critical nature surfacing unexpectedly mid-conversation',
      'Inconsistency — brilliant when inspired, paralyzed when down',
      'Sensitivity to rejection — Sanguine fear + Melancholic self-doubt',
    ],
    communicationStyle: {
      pace: 'Variable — animated when excited, slow when reflective',
      tone: 'Emotionally rich, expressive, sometimes dramatic',
      preferredInput: 'Authentic, emotionally honest, appreciative of nuance',
      petPeeve: 'Emotional dishonesty, superficiality without depth, dismissiveness',
    },
    career: {
      idealRoles: [
        'Creative arts (music, writing, visual arts, film)',
        'Teaching and education (especially arts and humanities)',
        'Counseling and therapy (creative or expressive modalities)',
        'Marketing with creative direction',
        'Journalism and storytelling',
        'Ministry, chaplaincy, or spiritual direction',
      ],
      rolesToAvoid: [
        'Pure data or number-crunching with no human element',
        'Cold, transactional sales environments',
        'Highly competitive, emotionally disconnected cultures',
        'Roles with no creative outlet',
      ],
    },
    stressResponse: 'Under stress, San-Mels first try to socialize their way out — seeking reassurance, venting, distracting. When that fails, they withdraw into rumination — overanalyzing what went wrong.',
    recoveryStrategy: 'Creative expression (writing, art, music), one trusted confidant for deep conversation, and structured self-compassion practices.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Track mood patterns', practice: 'Journal your emotional state 3x daily for 2 weeks — notice the oscillation', milestone: '"I can predict my mood shifts before they hit"' },
      { stage: '2. Stability', focus: 'Build emotional regulation', practice: 'Develop a grounding routine you do regardless of mood (walk, journaling, prayer)', milestone: 'Maintain routine through both highs and lows for 4 weeks' },
      { stage: '3. Consistency', focus: 'Produce regardless of inspiration', practice: 'Create something every day — 15 minutes minimum — mood irrelevant', milestone: '30-day streak of daily creative output' },
      { stage: '4. Integration', focus: 'Emotional depth with steadiness', practice: 'Complete a major creative project through the full mood cycle', milestone: 'Others describe you as both passionate and dependable' },
    ],
    famousExamples: [
      { name: 'Leonardo da Vinci', description: 'Restless curiosity (Sanguine) + extraordinary depth and perfectionism (Melancholic)' },
      { name: 'Robin Williams', description: 'Dazzling comedic warmth hiding profound emotional depth' },
      { name: 'Frédéric Chopin', description: 'Socially charming in salons yet deeply introspective in his music' },
    ],
    misidentifications: [
      { type: 'Melancholic-Sanguine', difference: 'San-Mels lead with warmth and energy, then retreat into depth. Mel-Sans lead with thoughtfulness, then express outwardly.' },
      { type: 'Bipolar Disorder', difference: 'The mood swings are temperamental, not pathological. They don\'t meet clinical criteria for mania or major depression.' },
    ],
    relationshipPatterns: 'San-Mels are intensely romantic partners. When up, they\'re the most exciting, creative, emotionally present partner. When down, they withdraw into self-doubt. Best paired with Phlegmatic-Choleric types who provide steady calm with quiet strength.',
  },

  'sanguine-phlegmatic': {
    slug: 'sanguine-phlegmatic',
    name: 'Sanguine-Phlegmatic',
    title: 'The Easygoing Connector',
    tagline: 'The most likeable temperament blend — warm, relaxed, and universally approachable.',
    icon: '☀️',
    primary: 'sanguine',
    secondary: 'phlegmatic',
    axes: 'Extraverted + Stable / Introverted + Stable',
    blendKey: 'Relater',
    overview: `The Sanguine-Phlegmatic is the most pleasant and easygoing of all temperament blends. It combines the Sanguine's social warmth, optimism, and enthusiasm with the Phlegmatic's calm, grace, and cooperativeness.

San-Phlegs are the people everyone likes. They don't create drama, they don't push too hard, and they bring a relaxed, positive energy to every situation. Their outgoing nature is tempered by a genuine gentleness that makes them feel safe to be around.`,
    strengths: [
      'Universal likability — broadest appeal of any subtype',
      'Steady warmth — consistent relational warmth unlike pure Sanguines',
      'Natural mediator — bridges between intense personality types',
      'Adaptable without being fake — genuinely enjoys different types of people',
      'Emotional balance — two most stable axes combine for remarkable equanimity',
    ],
    weaknesses: [
      'Lack of drive — neither Sanguine nor Phlegmatic is naturally driven',
      'Avoidance of difficult conversations — values fun and peace doubly',
      'Too laid-back — may be seen as lacking ambition or urgency',
      'People-pleasing — desire to be liked + conflict avoidance',
      'Shallow comfort zone — may stay in pleasant but unchallenging situations',
    ],
    communicationStyle: {
      pace: 'Moderate, warm, unhurried',
      tone: 'Friendly, casual, humorous, gentle',
      preferredInput: 'Positive, light, cooperative',
      petPeeve: 'Intensity, confrontation, pressure, negativity',
    },
    career: {
      idealRoles: [
        'Customer service and client relations',
        'Teaching (especially elementary)',
        'Human resources and people operations',
        'Hospitality and tourism',
        'Social media community management',
        'Counseling (supportive modalities)',
      ],
      rolesToAvoid: [
        'High-pressure sales with aggressive targets',
        'Cutthroat competitive environments',
        'Isolated technical work with no human interaction',
        'Roles requiring frequent confrontation',
      ],
    },
    stressResponse: 'Under stress, San-Phlegs first try to lighten the mood (Sanguine) and then withdraw into passive avoidance (Phlegmatic). They shut down gradually, becoming quieter and less engaged.',
    recoveryStrategy: 'Fun social activity with low stakes, physical comfort (good food, nature), and permission to not solve the problem immediately.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice avoidance-of-difficulty pattern', practice: 'Track every time you avoid a hard conversation or task for 2 weeks', milestone: '"I see how often I choose comfort over growth"' },
      { stage: '2. Ambition', focus: 'Set meaningful goals', practice: 'Define 1 important goal and create a weekly accountability check-in', milestone: 'Sustain effort toward a single goal for 60 days' },
      { stage: '3. Courage', focus: 'Have difficult conversations', practice: 'Address one uncomfortable issue per week directly and honestly', milestone: 'Have a hard conversation without deflecting into humor' },
      { stage: '4. Integration', focus: 'Warmth with purpose', practice: 'Lead a project or initiative that requires sustained effort and hard decisions', milestone: 'Others describe you as both warm and driven' },
    ],
    famousExamples: [
      { name: 'Jimmy Fallon', description: 'Warm, likeable, easygoing energy with broad social appeal' },
      { name: 'Ellen DeGeneres', description: 'Approachable charm combined with non-confrontational style' },
      { name: 'Bob Ross', description: 'Gentle warmth, steady calm, universally beloved' },
    ],
    misidentifications: [
      { type: 'Pure Sanguine', difference: 'San-Phlegs are calmer and less scattered. They have more patience and steadiness.' },
      { type: 'Phlegmatic-Sanguine', difference: 'San-Phlegs lead with social energy and initiative; Phleg-Sans lead with quiet observation and join in more gradually.' },
    ],
    relationshipPatterns: 'San-Phlegs are easy, warm partners who create a comfortable and happy home environment. The challenge is they may avoid addressing problems until they become crises. Best paired with Choleric-Melancholic types who add drive and depth.',
  },

  // ═══════════════════════════════════════════════════════════
  // CHOLERIC BLENDS
  // ═══════════════════════════════════════════════════════════

  'choleric-sanguine': {
    slug: 'choleric-sanguine',
    name: 'Choleric-Sanguine',
    title: 'The Commanding Motivator',
    tagline: 'The most outwardly impactful blend — commanding authority softened by social magnetism.',
    icon: '🎯',
    primary: 'choleric',
    secondary: 'sanguine',
    axes: 'Extraverted + Reactive / Extraverted + Stable',
    blendKey: 'Motivator',
    overview: `The Choleric-Sanguine is the most dynamic leader in the temperament system. This blend combines the Choleric's relentless drive, decisiveness, and results-orientation with the Sanguine's social warmth, persuasion, and enthusiasm.

Where the pure Choleric commands respect through force, the Chol-San commands it through a potent mix of competence and charisma. They're the CEO who also gives a killer speech, the general who troops would follow into fire.`,
    strengths: [
      'Motivational leadership — combines strategic vision with ability to rally people',
      'Action-oriented persuasion — every social interaction has a purpose',
      'High output — extremely productive and energetic',
      'Resilient optimism — bounces back from failures with renewed determination',
      'Decisive and personable — makes hard decisions while maintaining team morale',
    ],
    weaknesses: [
      'Win/lose mindset — everything is a competition',
      'Impatient with process — bulldozes through important processes and feelings',
      'Relationship instrumentalism — people may feel used',
      'Difficulty with vulnerability — admitting weakness feels like defeat',
      'Burnout risk — ambition + social overcommitment leads to crashes',
    ],
    communicationStyle: {
      pace: 'Fast and direct with social finesse',
      tone: 'Authoritative but warm, persuasive, motivating',
      preferredInput: 'Results-oriented, brief, enthusiastic',
      petPeeve: 'Incompetence, passivity, excessive deliberation, disloyalty',
    },
    career: {
      idealRoles: [
        'CEO, COO, and executive leadership',
        'Sales management and business development',
        'Entrepreneurship (especially growth-stage)',
        'Political leadership and public office',
        'Trial law and litigation',
        'Military command',
      ],
      rolesToAvoid: [
        'Support roles with no decision authority',
        'Consensus-heavy, slow-moving organizations',
        'Isolated individual contributor roles',
        'Roles requiring sustained patience and diplomacy',
      ],
    },
    stressResponse: 'Under stress, Chol-Sans first attack the problem head-on (Choleric) while trying to rally support (Sanguine). If both fail, they become domineering and explosive — a Choleric rage with Sanguine dramatic flair.',
    recoveryStrategy: 'Physical challenge (sports, exercise), strategic planning session to regain a sense of control, and one trusted advisor to process with.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice the instrumentalism', practice: 'Review 10 recent interactions — how many were agenda-free?', milestone: '"I see that I treat most relationships as means to an end"' },
      { stage: '2. Listening', focus: 'Develop genuine curiosity', practice: 'Have one conversation per day where you only listen and ask questions', milestone: 'Others start sharing more openly with you' },
      { stage: '3. Patience', focus: 'Accept slower timelines', practice: 'Let a team make a decision without your input once per week', milestone: 'A project succeeds without your direct control' },
      { stage: '4. Integration', focus: 'Power with genuine care', practice: 'Invest in someone else\'s goal with no personal return for 6 months', milestone: 'Others describe you as both powerful and genuinely caring' },
    ],
    famousExamples: [
      { name: 'Winston Churchill', description: 'Commanding leadership with oratory magnetism' },
      { name: 'Oprah Winfrey', description: 'Driven empire-builder with extraordinary personal warmth' },
      { name: 'Gary Vaynerchuk', description: 'Relentless hustle combined with motivational energy' },
    ],
    misidentifications: [
      { type: 'Sanguine-Choleric', difference: 'Chol-Sans command first, then charm. San-Chols attract first, then direct.' },
      { type: 'Pure Choleric', difference: 'Chol-Sans are significantly warmer and more socially skilled. They genuinely enjoy people, not just results.' },
    ],
    relationshipPatterns: 'Chol-Sans are exciting but intense partners. They bring adventure, ambition, and social fun — but they also need to be in charge. Best paired with Phlegmatic-Melancholic or Melancholic-Phlegmatic types who provide depth and stability without competing for control.',
  },

  'choleric-melancholic': {
    slug: 'choleric-melancholic',
    name: 'Choleric-Melancholic',
    title: 'The Strategic Perfectionist',
    tagline: 'The most formidable blend — visionary ambition paired with exacting standards and analytical depth.',
    icon: '🏛️',
    primary: 'choleric',
    secondary: 'melancholic',
    axes: 'Extraverted + Reactive / Introverted + Reactive',
    blendKey: 'Director',
    overview: `The Choleric-Melancholic is often considered the most competent and accomplished of all temperament blends. It combines the Choleric's relentless drive, strategic thinking, and decisiveness with the Melancholic's attention to detail, analytical depth, and high standards.

Chol-Mels are intense, focused, and demanding — both of themselves and others. They set ambitious goals and then plan meticulously to achieve them. They are visionary and detail-oriented, which is an extremely rare combination.`,
    strengths: [
      'Strategic excellence — sees big picture and small details simultaneously',
      'Relentless quality — gets things done right, not just done',
      'Deep competence — invests heavily in mastering their domain',
      'Creative problem-solving — analytical rigor with bold decisiveness',
      'Self-discipline — most naturally disciplined of all blends',
    ],
    weaknesses: [
      'Perfectionistic overload — Choleric demand for results meets Melancholic demand for perfection',
      'Demanding of others — holds everyone to impossibly high standards',
      'Workaholic tendencies — both components drive toward productivity with no natural braking',
      'Emotional suppression — emotions get buried deeply, then erupt',
      'Control issues — wants to control outcome and process, making delegation difficult',
    ],
    communicationStyle: {
      pace: 'Deliberate, precise, efficient',
      tone: 'Authoritative, detailed, analytical',
      preferredInput: 'Well-researched, organized, competent',
      petPeeve: 'Sloppiness, incompetence, vagueness, lack of preparation',
    },
    career: {
      idealRoles: [
        'CEO of complex organizations',
        'Surgery, medicine, and clinical leadership',
        'Architecture and engineering leadership',
        'Law (especially constitutional or corporate)',
        'Research leadership and R&D management',
        'Military strategy and intelligence',
      ],
      rolesToAvoid: [
        'Purely social roles with no tangible output',
        'Roles with ambiguous success metrics',
        'Highly collaborative roles requiring consensus',
        'Roles with low autonomy or micromanagement',
      ],
    },
    stressResponse: 'Under stress, Chol-Mels become more controlling and more critical. They tighten their grip on every detail, become harshly judgmental, and work even harder — a vicious cycle toward burnout.',
    recoveryStrategy: 'Forced rest (they won\'t rest voluntarily), acknowledgment that "good enough" has legitimate value, and physical activity to discharge tension.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice perfectionistic overload', practice: 'Track when "good enough" would have sufficed but you pushed for "perfect"', milestone: '"I see how often I overcomplicate and overdrive"' },
      { stage: '2. Delegation', focus: 'Release control', practice: 'Fully delegate one task per week with no checking or correcting', milestone: 'A delegated project succeeds without your involvement' },
      { stage: '3. Rest', focus: 'Normalize recovery', practice: 'Schedule one full day off per week with no work, no planning', milestone: 'Rest without guilt for one full day' },
      { stage: '4. Integration', focus: 'Excellence with sustainability', practice: 'Complete a major project while maintaining all personal boundaries', milestone: 'Others describe you as both brilliant and balanced' },
    ],
    famousExamples: [
      { name: 'Steve Jobs', description: 'Relentless drive for market dominance combined with obsessive attention to design detail' },
      { name: 'Mother Teresa', description: 'Deep compassion channeled through relentless, organized action' },
      { name: 'Margaret Thatcher', description: 'Iron will combined with meticulous preparation and analytical depth' },
    ],
    misidentifications: [
      { type: 'Melancholic-Choleric', difference: 'Chol-Mels lead with action and add precision. Mel-Chols lead with analysis and add drive. Chol-Mels decide first, then refine.' },
      { type: 'Pure Choleric', difference: 'Chol-Mels are notably more detail-oriented, self-critical, and quality-focused.' },
    ],
    relationshipPatterns: 'Chol-Mels are deeply loyal but intensely demanding partners. They show love through competence and planning. They need partners who appreciate quality and won\'t be intimidated by high standards. Best paired with Phlegmatic-Sanguine types who provide warmth and flexibility.',
  },

  'choleric-phlegmatic': {
    slug: 'choleric-phlegmatic',
    name: 'Choleric-Phlegmatic',
    title: 'The Diplomatic Commander',
    tagline: 'The most balanced leader — decisive authority tempered by calm wisdom and genuine empathy.',
    icon: '🕊️',
    primary: 'choleric',
    secondary: 'phlegmatic',
    axes: 'Extraverted + Reactive / Introverted + Stable',
    blendKey: 'Executive',
    overview: `The Choleric-Phlegmatic is the most balanced leadership blend in the temperament system. It combines the Choleric's drive, decisiveness, and results-orientation with the Phlegmatic's calm, patience, and diplomatic skill.

This blend is uncommon and highly effective. They are goal-driven but measured, decisive but willing to listen, strong-willed but flexible when evidence warrants it. Where pure Cholerics lead through force, Chol-Phlegs lead through a rare combination of strength and empathy.`,
    strengths: [
      'Calm authority — projects confidence without aggression',
      'Strategic patience — waits for the right moment rather than forcing action',
      'Empathetic decisiveness — makes hard decisions and considers human impact',
      'Adaptability under pressure — stays calm and acts decisively',
      'Trust-building — combination of competence and warmth makes them uniquely trustworthy',
    ],
    weaknesses: [
      'Internal conflict — Choleric pushes for action while Phlegmatic counsels patience',
      'Suppressed opinions — Phlegmatic conflict-avoidance can mute strong opinions',
      'Less assertive than expected — diplomacy mistaken for weakness',
      'Slow to confront — may tolerate problems longer than they should',
      'Emotional disconnect — both temperaments suppress emotions',
    ],
    communicationStyle: {
      pace: 'Measured, deliberate, calm',
      tone: 'Authoritative but approachable, diplomatic',
      preferredInput: 'Clear, respectful, solution-oriented',
      petPeeve: 'Drama, emotional manipulation, incompetence, disrespect',
    },
    career: {
      idealRoles: [
        'Executive leadership in people-centered organizations',
        'Diplomacy and international relations',
        'Mediation and negotiation',
        'Healthcare administration',
        'Non-profit leadership',
        'Judicial roles',
      ],
      rolesToAvoid: [
        'High-drama environments',
        'Roles requiring constant networking and self-promotion',
        'Chaotic organizations with no process',
        'Roles with no decision-making authority',
      ],
    },
    stressResponse: 'Under stress, Chol-Phlegs first go quiet and strategic — they pull back, observe, and plan. If the stressor persists, the Choleric emerges unexpectedly: sudden, firm, and sometimes shockingly forceful.',
    recoveryStrategy: 'Structured problem-solving, physical activity, and time alone to decompress and strategize.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice suppressed opinions', practice: 'Track times you held back a strong opinion for 2 weeks', milestone: '"I see how often I silence myself for peace"' },
      { stage: '2. Voice', focus: 'Express disagreement directly', practice: 'Share your honest opinion in one meeting per week, even if uncomfortable', milestone: 'Others start asking for your true opinion more often' },
      { stage: '3. Emotional access', focus: 'Open up emotionally', practice: 'Share one vulnerability per week with a trusted person', milestone: 'Someone close says they feel they truly know you' },
      { stage: '4. Integration', focus: 'Strength with full presence', practice: 'Lead through a crisis with both decisive action and emotional honesty', milestone: 'Others describe you as both powerful and deeply human' },
    ],
    famousExamples: [
      { name: 'Dwight D. Eisenhower', description: 'Decisive military commander with extraordinary diplomatic skill' },
      { name: 'Queen Elizabeth II', description: 'Duty-driven authority with legendary patience and calm' },
      { name: 'Colin Powell', description: 'Commanding presence balanced with measured, consensus-building approach' },
    ],
    misidentifications: [
      { type: 'Phlegmatic-Choleric', difference: 'Chol-Phlegs lead from the front with tempered intensity. Phleg-Chols lead from behind with quiet determination.' },
      { type: 'Pure Choleric', difference: 'Chol-Phlegs are notably calmer, more patient, and more diplomatically skilled.' },
    ],
    relationshipPatterns: 'Chol-Phlegs are steady, protective partners who show love through reliability and problem-solving. They need partners who appreciate both their strength and their calm. Best paired with Sanguine-Melancholic types who bring emotional expressiveness.',
  },

  // ═══════════════════════════════════════════════════════════
  // MELANCHOLIC BLENDS
  // ═══════════════════════════════════════════════════════════

  'melancholic-sanguine': {
    slug: 'melancholic-sanguine',
    name: 'Melancholic-Sanguine',
    title: 'The Expressive Thinker',
    tagline: 'Deep analytical nature with a surprising ability to articulate and connect — the philosopher who can also perform.',
    icon: '🎭',
    primary: 'melancholic',
    secondary: 'sanguine',
    axes: 'Introverted + Reactive / Extraverted + Stable',
    blendKey: 'Diplomat',
    overview: `The Melancholic-Sanguine combines the Melancholic's depth, analytical nature, and idealism with the Sanguine's expressiveness, warmth, and social energy. This is the deep thinker who can also communicate — the artist who can explain their vision, the analyst who can present their findings with passion.

Mel-Sans are emotionally rich and complex. They process everything deeply (Melancholic) but feel compelled to share it outwardly (Sanguine). This creates a person who oscillates between introverted contemplation and extroverted expression.`,
    strengths: [
      'Artistic vision with communication — profound inner world with ability to share it',
      'Emotional perception — reads people with extraordinary accuracy',
      'Passionate advocacy — argues with intellectual rigor and emotional conviction',
      'Creative synthesis — translates complex ideas into accessible forms',
      'Deep empathy — feels deeply for others and expresses it meaningfully',
    ],
    weaknesses: [
      'Mood unpredictability — Melancholic depths collide with Sanguine highs',
      'Torn between social needs and solitude — confusing withdrawal-approach patterns',
      'Inconsistent output — brilliant when inspired, blocked when melancholy dominates',
      'Perfectionism meets procrastination — wants things perfect and fun, or stalls',
      'Sensitivity to criticism — takes everything personally and needs approval',
    ],
    communicationStyle: {
      pace: 'Variable — eloquent when engaged, withdrawn when processing',
      tone: 'Thoughtful, expressive, sometimes intense',
      preferredInput: 'Intellectually stimulating, emotionally authentic, appreciative',
      petPeeve: 'Shallowness, dismissiveness, insensitivity, being rushed',
    },
    career: {
      idealRoles: [
        'Writing (fiction, nonfiction, journalism)',
        'Music composition and performance',
        'Psychology, counseling, therapy',
        'Teaching at advanced levels',
        'Film and theater direction',
        'Ministry and spiritual leadership',
      ],
      rolesToAvoid: [
        'Pure data or number-crunching with no human element',
        'Cold, transactional sales environments',
        'Highly competitive, emotionally disconnected cultures',
        'Roles with no creative outlet',
      ],
    },
    stressResponse: 'Under stress, Mel-Sans first withdraw to analyze (Melancholic default), then reach out for connection (Sanguine need), then withdraw again when the connection feels insufficient. This yo-yo pattern can be exhausting.',
    recoveryStrategy: 'One-on-one deep conversation with a trusted person, creative expression, and a structured plan to address the stressor.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Track emotional patterns', practice: 'Journal when you withdraw vs. when you seek connection for 2 weeks', milestone: '"I can predict my emotional oscillations"' },
      { stage: '2. Stability', focus: 'Create consistent output', practice: 'Produce one piece of work per week regardless of mood', milestone: 'Complete 8 weeks of consistent output' },
      { stage: '3. Voice', focus: 'Share before perfect', practice: 'Publish or share one imperfect work per month', milestone: 'Receive positive feedback on "imperfect" work' },
      { stage: '4. Integration', focus: 'Depth with visibility', practice: 'Teach or mentor others in your area of expertise', milestone: 'Others describe you as both profound and accessible' },
    ],
    famousExamples: [
      { name: 'Vincent van Gogh', description: 'Profound artistic depth with passionate emotional expression' },
      { name: 'Sylvia Plath', description: 'Analytical literary genius with intense emotional expressiveness' },
      { name: 'Beethoven', description: 'Deep interiority channeled into powerfully communicative music' },
    ],
    misidentifications: [
      { type: 'Sanguine-Melancholic', difference: 'Mel-Sans start in contemplation and emerge into expression. San-Mels start in social energy and retreat into depth.' },
      { type: 'Pure Melancholic', difference: 'Mel-Sans are notably more outwardly expressive and socially engaged.' },
    ],
    relationshipPatterns: 'Mel-Sans are deeply devoted but complex partners. They offer intellectual depth and emotional attentiveness. Best paired with Phlegmatic-Choleric types who provide steady calm with quiet strength.',
  },

  'melancholic-choleric': {
    slug: 'melancholic-choleric',
    name: 'Melancholic-Choleric',
    title: 'The Driven Perfectionist',
    tagline: 'The most intense introvert — relentless internal standards fueled by a powerful drive to achieve.',
    icon: '⚔️',
    primary: 'melancholic',
    secondary: 'choleric',
    axes: 'Introverted + Reactive / Extraverted + Reactive',
    blendKey: 'Achiever',
    overview: `The Melancholic-Choleric is the most intensely driven introvert in the temperament system. It combines the Melancholic's depth, analytical rigor, and perfectionism with the Choleric's ambition, determination, and willpower.

Where the pure Melancholic might analyze forever without acting, the Choleric secondary provides the engine to execute. Mel-Chols are serious, thorough, and uncompromising. They set extremely high standards and have the discipline and drive to meet them.`,
    strengths: [
      'Thoroughness with execution — doesn\'t just plan, actually does',
      'Ambitious idealism — high ideals with determination to make them real',
      'Deep expertise — enormous effort invested in mastering their field',
      'Disciplined consistency — shows up and delivers at a high standard',
      'Independent achievement — accomplishes extraordinary things working alone',
    ],
    weaknesses: [
      'Harsh self-criticism amplified by Choleric intensity — brutal self-talk',
      'Rigidity — develops strong opinions and defends them with Choleric force',
      'Demands perfection from everyone — chronic disappointment and strained relationships',
      'Emotional suppression — both components discourage vulnerability',
      'Burnout through self-punishment — pushes relentlessly and feels guilty when resting',
    ],
    communicationStyle: {
      pace: 'Deliberate, precise, structured',
      tone: 'Serious, analytical, occasionally cutting',
      preferredInput: 'Thorough, logical, well-researched',
      petPeeve: 'Carelessness, laziness, superficiality, emotional manipulation',
    },
    career: {
      idealRoles: [
        'Research science and academia',
        'Software architecture and engineering',
        'Medicine (diagnostics, pathology, research)',
        'Financial analysis and accounting',
        'Law (corporate, regulatory)',
        'Quality assurance and standards',
      ],
      rolesToAvoid: [
        'Purely social roles with no tangible output',
        'Roles with ambiguous success metrics',
        'Highly collaborative roles requiring consensus',
        'Roles with low autonomy',
      ],
    },
    stressResponse: 'Under stress, Mel-Chols double down on control and precision. They work harder, demand more, and become harshly critical. When this fails, they crash into Melancholic isolation — withdrawn, self-critical, and hopeless.',
    recoveryStrategy: 'Forced rest (they must be convinced, not asked), acknowledgment from a respected peer, and a reminder that their worth is not equal to their output.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice the self-punishment cycle', practice: 'Track your self-talk for 1 week — how often is it harsh?', milestone: '"I see how brutally I treat myself"' },
      { stage: '2. Compassion', focus: 'Develop self-kindness', practice: 'Practice self-compassion meditation; celebrate completion before critiquing', milestone: 'Genuinely say "that was good enough" and mean it' },
      { stage: '3. Flexibility', focus: 'Release rigid control', practice: 'Let someone else do a task their way without correction once per week', milestone: 'Accept a different approach without internal resentment' },
      { stage: '4. Integration', focus: 'Excellence with grace', practice: 'Produce excellent work while maintaining healthy boundaries', milestone: 'Others describe you as both brilliant and kind' },
    ],
    famousExamples: [
      { name: 'Nikola Tesla', description: 'Obsessive analytical depth with relentless drive to invent and execute' },
      { name: 'Ludwig van Beethoven', description: 'Profound musical perfectionism powered by unstoppable creative determination' },
      { name: 'Marie Curie', description: 'Meticulous scientific rigor combined with ferocious persistence' },
    ],
    misidentifications: [
      { type: 'Choleric-Melancholic', difference: 'Mel-Chols lead with analysis then act. Chol-Mels lead with action then refine. Mel-Chols agonize before deciding.' },
      { type: 'Pure Melancholic', difference: 'Mel-Chols are notably more driven and productive. They finish what they start.' },
    ],
    relationshipPatterns: 'Mel-Chols are loyal but demanding partners. They show love through excellence and problem-solving. Best paired with Sanguine-Phlegmatic types who provide warmth and flexibility.',
  },

  'melancholic-phlegmatic': {
    slug: 'melancholic-phlegmatic',
    name: 'Melancholic-Phlegmatic',
    title: 'The Gentle Analyst',
    tagline: 'The most introverted blend — profound inner depth combined with gentle, steady calm.',
    icon: '🦉',
    primary: 'melancholic',
    secondary: 'phlegmatic',
    axes: 'Introverted + Reactive / Introverted + Stable',
    blendKey: 'Analyst',
    overview: `The Melancholic-Phlegmatic is the most introverted of all temperament blends. It combines the Melancholic's analytical depth, idealism, and sensitivity with the Phlegmatic's calm, patience, and gentleness.

Mel-Phlegs are the people who notice everything, say little, and when they do speak, it's worth listening to. They have profound self-awareness, a deep appreciation for art, beauty, and meaning, and a gentle steadiness that makes them trustworthy confidants.`,
    strengths: [
      'Profound self-understanding — deeper self-knowledge than almost any other blend',
      'Gentle wisdom — insights that are both deep and kind, never harsh',
      'Aesthetic sensitivity — appreciates beauty at a level most can\'t access',
      'Loyal and faithful — among the most steadfast friends and partners',
      'Thoughtful analysis — considers problems from every angle with patience',
    ],
    weaknesses: [
      'Deep insecurity — Melancholic self-criticism + Phlegmatic passivity = crippling self-doubt',
      'Difficulty connecting — wants deep connection but lacks social initiative',
      'Negativity bias — sees flaws in themselves and lacks energy to fix them',
      'Paralysis by analysis × passivity — Melancholic overthinks, Phlegmatic avoids action',
      'Chronic underachievement — may have extraordinary talent but never put it into the world',
    ],
    communicationStyle: {
      pace: 'Slow, thoughtful, measured',
      tone: 'Gentle, sincere, understated',
      preferredInput: 'Patient, kind, intellectually substantive',
      petPeeve: 'Loudness, superficiality, pressure, being put on the spot',
    },
    career: {
      idealRoles: [
        'Research and academic writing',
        'Library and archival sciences',
        'Counseling (one-on-one, not group)',
        'Editing, proofreading, quality review',
        'Art restoration, museum curation',
        'Spiritual direction and contemplative ministry',
      ],
      rolesToAvoid: [
        'Sales or high-pressure client-facing roles',
        'Loud, chaotic, open-plan environments',
        'Leadership roles requiring public decisiveness',
        'Competitive, fast-paced workplaces',
      ],
    },
    stressResponse: 'Under stress, Mel-Phlegs withdraw completely. The Melancholic retreats into rumination and the Phlegmatic shuts down emotionally. They often suffer in silence.',
    recoveryStrategy: 'Gentle invitation (not pressure) from a safe person, quiet restorative activity (nature, reading, music), and small, manageable next steps.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice the withdrawal pattern', practice: 'Track when you disengage vs. when you stay present for 2 weeks', milestone: '"I see how often I disappear when things get hard"' },
      { stage: '2. Expression', focus: 'Share your inner world', practice: 'Tell one person per week something you genuinely think or feel', milestone: 'Someone thanks you for sharing something meaningful' },
      { stage: '3. Action', focus: 'Start before you\'re ready', practice: 'Take one imperfect action per day toward a meaningful goal', milestone: 'Complete something and share it — even if it\'s not perfect' },
      { stage: '4. Integration', focus: 'Depth with presence in the world', practice: 'Publish, present, or contribute your best thinking to others', milestone: 'Others describe you as both profound and present' },
    ],
    famousExamples: [
      { name: 'Warren Buffett', description: 'Patient analytical depth, quiet demeanor, avoids drama, steady and loyal' },
      { name: 'J.R.R. Tolkien', description: 'Gentle scholar who created an entire world of extraordinary depth over decades' },
      { name: 'Emily Dickinson', description: 'Profound poetic insight combined with extreme introversion and domestic calm' },
    ],
    misidentifications: [
      { type: 'Pure Melancholic', difference: 'Mel-Phlegs are calmer and less anxious. The Phlegmatic adds a settled quality.' },
      { type: 'Phlegmatic-Melancholic', difference: 'Mel-Phlegs have more analytical depth and perfectionism. Phleg-Mels are more easygoing with occasional depth.' },
    ],
    relationshipPatterns: 'Mel-Phlegs are devoted, attentive partners who show love through consistent care. The challenge is they may not express their own needs. Best paired with Sanguine-Choleric types who bring energy and directness.',
  },

  // ═══════════════════════════════════════════════════════════
  // PHLEGMATIC BLENDS
  // ═══════════════════════════════════════════════════════════

  'phlegmatic-sanguine': {
    slug: 'phlegmatic-sanguine',
    name: 'Phlegmatic-Sanguine',
    title: 'The Warm Peacemaker',
    tagline: 'Gentle calm infused with social warmth — the most emotionally safe person in any room.',
    icon: '☀️',
    primary: 'phlegmatic',
    secondary: 'sanguine',
    axes: 'Introverted + Stable / Extraverted + Stable',
    blendKey: 'Harmonizer',
    overview: `The Phlegmatic-Sanguine is one of the most pleasant and emotionally safe temperament blends. It combines the Phlegmatic's calm, patience, and cooperativeness with the Sanguine's warmth, humor, and social interest.

Phleg-Sans don't draw attention to themselves like Sanguines do, but they bring a relaxed, warm energy that makes everyone around them comfortable. They're the person at the gathering who may not be the loudest, but everyone gravitates toward.`,
    strengths: [
      'Calm sociability — enjoys people without needing to dominate',
      'Quiet humor — often the funniest person in the room in a dry, observational way',
      'Cooperative spirit — brings out the best in others',
      'Emotional steadiness with warmth — provides consistent emotional safety',
      'Likability without effort — people trust them instinctively',
    ],
    weaknesses: [
      'Passivity amplified — both temperaments avoid difficulty',
      'Lack of urgency — nothing feels urgent to them',
      'Avoids responsibility — may let others make decisions and do hard tasks',
      'Hidden stubbornness — beneath the pleasant surface, quietly immovable',
      'Underperformance — has more capability than they typically demonstrate',
    ],
    communicationStyle: {
      pace: 'Unhurried, warm, observant',
      tone: 'Gentle, humorous, self-deprecating',
      preferredInput: 'Kind, patient, non-demanding',
      petPeeve: 'Aggression, pressure, conflict, being forced to lead',
    },
    career: {
      idealRoles: [
        'Customer support and success',
        'Elementary teaching',
        'Social work and community services',
        'Administrative roles in calm environments',
        'Librarian, archivist',
        'Pastoral counseling',
      ],
      rolesToAvoid: [
        'Aggressive sales environments',
        'Leadership requiring public confrontation',
        'High-stakes decision-making roles',
        'Competitive, fast-paced workplaces',
      ],
    },
    stressResponse: 'Under stress, Phleg-Sans withdraw into passive pleasantness. They smile, agree, and internally disengage. The Sanguine humor becomes a deflection tool rather than genuine connection.',
    recoveryStrategy: 'Low-pressure social time, permission to not solve the problem immediately, and gentle accountability from someone they respect.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice avoidance patterns', practice: 'Track times you used humor to deflect a serious topic for 2 weeks', milestone: '"I see how often I avoid rather than engage"' },
      { stage: '2. Initiative', focus: 'Take proactive action', practice: 'Make one decision per day without waiting for someone else to lead', milestone: 'Others start looking to you for direction' },
      { stage: '3. Assertiveness', focus: 'Express genuine opinions', practice: 'State your preference even when it might cause mild friction once per week', milestone: 'Voice a disagreement directly and respectfully' },
      { stage: '4. Integration', focus: 'Warmth with agency', practice: 'Lead a small group or project for 3 months', milestone: 'Others describe you as both warm and capable' },
    ],
    famousExamples: [
      { name: 'Fred Rogers (Mr. Rogers)', description: 'Quiet warmth, steady presence, gentle humor, beloved by all' },
      { name: 'Keanu Reeves', description: 'Calm, likeable, quietly funny, no drama' },
      { name: 'Bob Newhart', description: 'Dry humor delivered with understated calm' },
    ],
    misidentifications: [
      { type: 'Sanguine-Phlegmatic', difference: 'Phleg-Sans observe first, then warm up. San-Phlegs enter warmly from the start.' },
      { type: 'Pure Phlegmatic', difference: 'Phleg-Sans are noticeably more socially engaged and humorous.' },
    ],
    relationshipPatterns: 'Phleg-Sans are easy, supportive partners who create harmony. The challenge is they may avoid addressing issues. Best paired with Choleric-Melancholic types who bring drive and depth.',
  },

  'phlegmatic-choleric': {
    slug: 'phlegmatic-choleric',
    name: 'Phlegmatic-Choleric',
    title: 'The Quiet Leader',
    tagline: 'Hidden steel beneath calm waters — the leader nobody sees coming.',
    icon: '🛡️',
    primary: 'phlegmatic',
    secondary: 'choleric',
    axes: 'Introverted + Stable / Extraverted + Reactive',
    blendKey: 'Inspector',
    overview: `The Phlegmatic-Choleric is one of the most deceptively powerful temperament blends. On the surface, they appear calm, steady, and unassuming — a typical Phlegmatic. But beneath that placid exterior lies a Choleric determination that emerges when it truly matters.

Phleg-Chols are the quiet achievers. They don't announce their intentions, they don't grandstand, and they don't waste energy on posturing. They simply assess the situation, decide what needs to happen, and make it happen — often so smoothly that others barely notice the effort.`,
    strengths: [
      'Reliable under pressure — gets calm and decisive where others panic',
      'Quietly effective leadership — leads by competence and example',
      'Balanced judgment — considers people and results together',
      'Strategic patience — waits for the right moment to act decisively',
      'Trustworthy strength — people sense both reliability and capability',
    ],
    weaknesses: [
      'Stubbornness disguised as patience — calm exterior masks iron will',
      'Slow to act on important decisions — strategic hesitation',
      'Passive-aggressive tendencies — indirect resistance when avoiding confrontation',
      'Underestimated and frustrated by it — overlooked for leadership',
      'Emotional suppression doubled — vulnerable to unexpressed resentment',
    ],
    communicationStyle: {
      pace: 'Unhurried, measured, deliberate',
      tone: 'Calm and authoritative when they choose to speak, often surprisingly direct',
      preferredInput: 'Respectful, clear, competent',
      petPeeve: 'Loud incompetence, dramatic attention-seeking, being underestimated',
    },
    career: {
      idealRoles: [
        'Operations management and COO positions',
        'Project management (complex, long-term projects)',
        'Military logistics and strategic planning',
        'Nursing and healthcare administration',
        'Financial planning and wealth management',
        'Quality assurance leadership',
      ],
      rolesToAvoid: [
        'High-energy sales and public speaking',
        'Roles requiring constant networking and self-promotion',
        'Chaotic startup environments with no process',
        'Roles with no decision-making authority',
      ],
    },
    stressResponse: 'Under stress, Phleg-Chols first go quiet and strategic — they pull back, observe, and plan. If the stressor persists, the Choleric emerges unexpectedly: sudden, firm, and sometimes shockingly forceful.',
    recoveryStrategy: 'Structured problem-solving, physical activity, and time alone to decompress and strategize.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice the hidden resistance', practice: 'Track times you quietly resisted instead of directly disagreeing for 2 weeks', milestone: '"I see how often I say yes when I mean no"' },
      { stage: '2. Directness', focus: 'Express disagreement early', practice: 'Voice one concern before it becomes resentment each week', milestone: 'Others start respecting your boundaries more' },
      { stage: '3. Visibility', focus: 'Step into leadership visibly', practice: 'Volunteer to lead or present once per month', milestone: 'Receive recognition for leadership you\'ve always quietly provided' },
      { stage: '4. Integration', focus: 'Calm strength, fully expressed', practice: 'Lead a major initiative with both quiet competence and visible authority', milestone: 'Others describe you as both steady and formidable' },
    ],
    famousExamples: [
      { name: 'George Washington', description: 'Calm, steady presence masking iron determination and decisive leadership' },
      { name: 'Angela Merkel', description: 'Understated, patient diplomat with quiet but unmistakable authority' },
      { name: 'Tim Duncan', description: 'The "Big Fundamental" — no flash, no drama, just quiet dominance' },
    ],
    misidentifications: [
      { type: 'Choleric-Phlegmatic', difference: 'Chol-Phlegs lead from the front with tempered intensity. Phleg-Chols lead from behind with quiet determination that surprises people.' },
      { type: 'Pure Phlegmatic', difference: 'Phleg-Chols have a decisiveness and determination that pure Phlegmatics lack. They will take charge when needed.' },
    ],
    relationshipPatterns: 'Phleg-Chols are steady, protective partners who show love through reliability and quiet acts of service. Best paired with Sanguine-Melancholic types who bring emotional expressiveness and creative energy.',
  },

  'phlegmatic-melancholic': {
    slug: 'phlegmatic-melancholic',
    name: 'Phlegmatic-Melancholic',
    title: 'The Thoughtful Caretaker',
    tagline: 'Quiet devotion meets careful thought — the gentle soul who holds everything together behind the scenes.',
    icon: '🌿',
    primary: 'phlegmatic',
    secondary: 'melancholic',
    axes: 'Introverted + Stable / Introverted + Reactive',
    blendKey: 'Helper',
    overview: `The Phlegmatic-Melancholic is a deeply caring, quietly thoughtful blend. It combines the Phlegmatic's peace-loving, cooperative nature with the Melancholic's attention to detail, loyalty, and desire to do things right.

Phleg-Mels are the unsung heroes of any group. They don't seek recognition, they don't make waves, and they don't cut corners. They quietly ensure that things are done properly, that people are cared for, and that nothing falls through the cracks.`,
    strengths: [
      'Harmonious thoroughness — combines desire for peace with desire for quality',
      'Deeply loyal — among the most faithful once committed',
      'Careful and cooperative — approaches everything with care for task and people',
      'Consistent reliability — shows up, does work well, never creates drama',
      'Gentle perceptiveness — notices things others miss in data and emotions',
    ],
    weaknesses: [
      'Slow to act vs. wanting to do it right — agonizing indecision',
      'Difficulty expressing opinions — avoids conflict and fears criticism',
      'Chronic self-neglect — prioritizes everyone else\'s needs over their own',
      'Passive resentment — quietly builds frustration over unacknowledged effort',
      'Resistance to change — both components prefer stability',
    ],
    communicationStyle: {
      pace: 'Slow, careful, considerate',
      tone: 'Gentle, precise, quietly warm',
      preferredInput: 'Kind, detailed, patient',
      petPeeve: 'Being rushed, carelessness, inconsideration, loud criticism',
    },
    career: {
      idealRoles: [
        'Nursing and patient care',
        'Administrative support and executive assistance',
        'Teaching (especially special education)',
        'Social work and community care',
        'Accounting and bookkeeping',
        'Church or nonprofit administration',
      ],
      rolesToAvoid: [
        'Aggressive sales environments',
        'Rapid-fire decision-making roles',
        'Public-facing leadership requiring assertiveness',
        'Competitive, cutthroat cultures',
      ],
    },
    stressResponse: 'Under stress, Phleg-Mels go quiet and internal. They worry (Melancholic) but don\'t act (Phlegmatic). They may develop physical stress symptoms before they ever verbalize their distress.',
    recoveryStrategy: 'Verbal reassurance from a trusted person, a concrete (small) first step to address the stressor, and self-care activities they often deny themselves.',
    developmentPath: [
      { stage: '1. Awareness', focus: 'Notice the self-neglect pattern', practice: 'Track every time you prioritize someone else\'s needs over your own for 2 weeks', milestone: '"I see how often I sacrifice my needs for others"' },
      { stage: '2. Voice', focus: 'Express your needs and opinions', practice: 'State one need or preference per day, even a small one ("I\'d prefer...")', milestone: 'Express a preference that contradicts someone else\'s without apologizing' },
      { stage: '3. Initiative', focus: 'Act without waiting for permission', practice: 'Make one proactive decision per week without seeking consensus', milestone: 'Start a small project entirely on your own initiative' },
      { stage: '4. Integration', focus: 'Care for others and yourself', practice: 'Set and maintain one non-negotiable boundary for 90 days', milestone: 'Others describe you as both caring and strong' },
    ],
    famousExamples: [
      { name: 'Mr. Rogers (Fred Rogers)', description: 'Gentle, caring, detail-oriented, consistent, and quietly profound' },
      { name: 'Jane Goodall', description: 'Patient observation, quiet devotion, meticulous research combined with gentle advocacy' },
      { name: 'Albert Schweitzer', description: 'Deeply caring humanitarian with intellectual rigor and lifelong consistency' },
    ],
    misidentifications: [
      { type: 'Melancholic-Phlegmatic', difference: 'Phleg-Mels lead with calm cooperation and add analytical care. Mel-Phlegs lead with analytical depth and add calm patience.' },
      { type: 'Pure Phlegmatic', difference: 'Phleg-Mels have a noticeably higher standard for quality and a deeper analytical streak.' },
    ],
    relationshipPatterns: 'Phleg-Mels are devoted, attentive partners who show love through consistent care and attention to detail. The challenge is they may not express their own needs. Best paired with Sanguine-Choleric types who bring energy and directness.',
  },
}

// Helper function to get a subtype by slug
export function getSubtype(slug: string): Subtype | undefined {
  return SUBTYPES[slug as SubtypeSlug]
}

export function getSubtypeByBlendKey(blendKey: string): Subtype | undefined {
  const pureSubtypeByBlendKey: Record<string, SubtypeSlug> = {
    Spark: 'pure-sanguine',
    Commander: 'pure-choleric',
    Strategist: 'pure-melancholic',
    Guardian: 'pure-phlegmatic',
  }

  const pureSubtypeSlug = pureSubtypeByBlendKey[blendKey]
  if (pureSubtypeSlug) {
    return getSubtype(pureSubtypeSlug)
  }

  return getAllSubtypes().find((subtype) => subtype.blendKey === blendKey)
}

// Get all subtypes as an array
export function getAllSubtypes(): Subtype[] {
  return Object.values(SUBTYPES)
}

// Get subtypes by primary temperament
export function getSubtypesByPrimary(primary: 'sanguine' | 'choleric' | 'melancholic' | 'phlegmatic'): Subtype[] {
  return getAllSubtypes().filter(s => s.primary === primary)
}

// Get color for a temperament type
export function getSubtypeColor(temperament: 'sanguine' | 'choleric' | 'melancholic' | 'phlegmatic'): string {
  const colors: Record<string, string> = {
    sanguine: '#FFD700',
    choleric: '#E63946',
    melancholic: '#4CC9F0',
    phlegmatic: '#52B788',
  }
  return colors[temperament] || '#FFD700'
}
