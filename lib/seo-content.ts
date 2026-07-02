import type { LucideIcon } from 'lucide-react'
import {
  ArrowRightLeft,
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  CheckCircle2,
  Flame,
  Heart,
  HelpCircle,
  MessageCircle,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react'

export type Accent = 'gold' | 'red' | 'blue' | 'green' | 'purple' | 'pink'

export type ContentBlock =
  | {
      type: 'section'
      title: string
      body: string[]
      accent?: Accent
      bullets?: string[]
    }
  | {
      type: 'callout'
      title: string
      body: string
      bullets?: string[]
    }
  | {
      type: 'grid'
      title: string
      intro?: string
      items: { title: string; body: string; accent?: Accent }[]
    }

export type SeoPage = {
  slug: string
  title: string
  shortTitle: string
  description: string
  keywords: string[]
  eyebrow: string
  icon: LucideIcon
  accent: Accent
  priority: number
  changeFrequency: 'weekly' | 'monthly'
  heroImage?: string
  ctaLabel?: string
  blocks: ContentBlock[]
}

export type BlogArticle = {
  slug: string
  title: string
  shortTitle: string
  description: string
  keywords: string[]
  category: string
  readTime: string
  accent: Accent
  icon: LucideIcon
  image: string
  imageAlt: string
  published: string
  blocks: ContentBlock[]
  related: { href: string; title: string; description: string }[]
}

export const accentStyles: Record<Accent, { border: string; text: string; bg: string; button: string }> = {
  gold: { border: 'border-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', button: 'bg-yellow-500 hover:bg-yellow-400 text-black' },
  red: { border: 'border-red-400', text: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', button: 'bg-red-600 hover:bg-red-700 text-white' },
  blue: { border: 'border-blue-400', text: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20', button: 'bg-blue-600 hover:bg-blue-700 text-white' },
  green: { border: 'border-green-400', text: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20', button: 'bg-green-600 hover:bg-green-700 text-white' },
  purple: { border: 'border-purple-400', text: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20', button: 'bg-purple-600 hover:bg-purple-700 text-white' },
  pink: { border: 'border-pink-400', text: 'text-pink-400', bg: 'bg-pink-400/10 border-pink-400/20', button: 'bg-pink-600 hover:bg-pink-700 text-white' },
}

export const seoPages: SeoPage[] = [
  {
    slug: 'temperament-test',
    shortTitle: 'Temperament Test',
    title: 'Temperament Test: Find Your Choleric, Sanguine, Melancholic, or Phlegmatic Type',
    description: 'Take a free temperament test and learn how choleric, sanguine, melancholic, and phlegmatic patterns shape your work, stress, relationships, and growth.',
    keywords: ['temperament test', 'four temperament test', '4 temperament test', 'choleric sanguine melancholic phlegmatic test', 'temperament quiz'],
    eyebrow: 'Free Four Temperaments Quiz',
    icon: Target,
    accent: 'gold',
    priority: 0.94,
    changeFrequency: 'weekly',
    ctaLabel: 'Take the Free Temperament Test',
    blocks: [
      {
        type: 'section',
        title: 'What a temperament test actually measures',
        body: [
          'A temperament test looks for your default behavioral pattern: how you respond to pressure, how you move toward goals, how you process emotion, and how you relate to other people.',
          'FourType scores your answers across the four classical temperaments: Choleric, Sanguine, Melancholic, and Phlegmatic. Your result is not a diagnosis or a life sentence. It is a practical language for noticing your patterns with more honesty.',
        ],
      },
      {
        type: 'grid',
        title: 'The four temperament signals',
        items: [
          { title: 'Choleric', body: 'Direct, decisive, goal-focused, and energized by challenge.', accent: 'red' },
          { title: 'Sanguine', body: 'Expressive, social, optimistic, and energized by connection.', accent: 'gold' },
          { title: 'Melancholic', body: 'Analytical, deep, careful, and energized by meaning and quality.', accent: 'blue' },
          { title: 'Phlegmatic', body: 'Calm, loyal, steady, and energized by peace and trust.', accent: 'green' },
        ],
      },
      {
        type: 'callout',
        title: 'Best use of your result',
        body: 'Use your temperament result as a mirror, not a box. The most useful question is not “What label am I?” but “What pattern keeps showing up, and how can I work with it wisely?”',
        bullets: ['Notice your stress triggers.', 'Improve communication with opposite types.', 'Choose work rhythms that fit your natural energy.', 'Read your subtype for more nuance.'],
      },
    ],
  },
  {
    slug: 'free-temperament-test',
    shortTitle: 'Free Temperament Test',
    title: 'Free Temperament Test: Discover Your Four Temperaments Pattern',
    description: 'Use FourType’s free temperament test to identify your dominant temperament and subtype without signups, paywalls, or clinical claims.',
    keywords: ['free temperament test', 'free four temperaments test', 'free temperament quiz', 'personality temperament test free'],
    eyebrow: 'Free Forever',
    icon: CheckCircle2,
    accent: 'green',
    priority: 0.9,
    changeFrequency: 'weekly',
    ctaLabel: 'Start the Free Quiz',
    blocks: [
      {
        type: 'section',
        title: 'A free test should still be useful',
        body: [
          'Many personality quizzes are fun but vague. FourType is designed to be simple enough to finish quickly and specific enough to make your result useful.',
          'The quiz gives you a primary temperament, score spread, and subtype direction so you can understand both your strongest pattern and your secondary influence.',
        ],
      },
      {
        type: 'callout',
        title: 'What you get',
        body: 'You can take the quiz without creating an account. The free result is enough to understand your likely temperament and begin comparing your communication, stress, and relationship patterns.',
        bullets: ['40 questions', 'Four temperament score spread', 'Primary pattern', 'Subtype guidance', 'Shareable result page'],
      },
    ],
  },
  {
    slug: '4-temperament-test',
    shortTitle: '4 Temperament Test',
    title: '4 Temperament Test: Choleric, Sanguine, Melancholic, and Phlegmatic Explained',
    description: 'A clear 4 temperament test guide for comparing choleric, sanguine, melancholic, and phlegmatic personality patterns.',
    keywords: ['4 temperament test', 'four temperament test', 'choleric sanguine melancholic phlegmatic', 'four types personality test'],
    eyebrow: 'Four Types, Clear Patterns',
    icon: BarChart3,
    accent: 'purple',
    priority: 0.9,
    changeFrequency: 'weekly',
    ctaLabel: 'Find Your 4 Temperament Type',
    blocks: [
      {
        type: 'grid',
        title: 'Fast comparison',
        intro: 'If you are choosing between the four types, start with energy direction and stress response.',
        items: [
          { title: 'Choleric asks: “What is the goal?”', body: 'They move fast, make decisions, and prefer control over ambiguity.', accent: 'red' },
          { title: 'Sanguine asks: “Who is coming?”', body: 'They bring energy, connection, and spontaneous enthusiasm.', accent: 'gold' },
          { title: 'Melancholic asks: “Is this right?”', body: 'They notice quality, meaning, detail, and what could go wrong.', accent: 'blue' },
          { title: 'Phlegmatic asks: “Can we keep peace?”', body: 'They stabilize the room, reduce conflict, and preserve trust.', accent: 'green' },
        ],
      },
      {
        type: 'section',
        title: 'Why a 4 temperament test can feel accurate',
        body: [
          'The model is memorable because it describes visible behavior under pressure. You may be flexible in daily life, but stress often reveals the default pattern: control, stimulation, perfection, or peace.',
          'FourType adds subtype interpretation because many people are blends. A Sanguine-Choleric will look different from a Choleric-Sanguine even though both share energy and drive.',
        ],
      },
    ],
  },
  {
    slug: 'temperament-test-for-couples',
    shortTitle: 'Temperament Test for Couples',
    title: 'Temperament Test for Couples: Understand Communication and Conflict Patterns',
    description: 'Use a temperament test for couples to compare emotional pace, conflict style, communication needs, and relationship strengths.',
    keywords: ['temperament test for couples', 'temperament compatibility', 'personality compatibility test', 'temperament relationships'],
    eyebrow: 'Relationships',
    icon: Heart,
    accent: 'pink',
    priority: 0.86,
    changeFrequency: 'monthly',
    ctaLabel: 'Take the Quiz Together',
    blocks: [
      {
        type: 'section',
        title: 'Temperament compatibility is about patterns, not perfect matches',
        body: [
          'Couples often struggle less because they are “incompatible” and more because they read each other through the wrong lens. A Choleric may think a Phlegmatic is avoiding the issue. A Phlegmatic may experience the same Choleric as unnecessarily intense.',
          'A temperament test gives couples shared language for emotional pace, decision-making, affection, conflict, and repair.',
        ],
      },
      {
        type: 'grid',
        title: 'Common couple dynamics',
        items: [
          { title: 'Choleric + Phlegmatic', body: 'Drive meets steadiness. Powerful when pace is negotiated.', accent: 'red' },
          { title: 'Sanguine + Melancholic', body: 'Lightness meets depth. Strong when both respect different needs.', accent: 'gold' },
          { title: 'Melancholic + Phlegmatic', body: 'Loyalty and care. Watch for quiet avoidance of hard conversations.', accent: 'blue' },
          { title: 'Choleric + Sanguine', body: 'High energy and bold action. Needs follow-through and tenderness.', accent: 'green' },
        ],
      },
    ],
  },
  {
    slug: 'four-temperaments',
    shortTitle: 'Four Temperaments',
    title: 'The Four Temperaments: Choleric, Sanguine, Melancholic, and Phlegmatic',
    description: 'Learn the four temperaments, compare their strengths and blind spots, and take the FourType temperament test to find your pattern.',
    keywords: ['four temperaments', 'the four temperaments', 'choleric sanguine melancholic phlegmatic', 'temperament types'],
    eyebrow: 'The Classical Framework',
    icon: Sparkles,
    accent: 'gold',
    priority: 0.88,
    changeFrequency: 'monthly',
    blocks: [
      {
        type: 'section',
        title: 'A simple model with surprising staying power',
        body: [
          'The four temperaments have survived because they describe patterns people recognize quickly: the decisive leader, the lively connector, the thoughtful analyst, and the steady peacemaker.',
          'Modern personality science uses different language, but the practical insight remains: people differ in activation, sociability, emotional sensitivity, and preferred pace.',
        ],
      },
      {
        type: 'grid',
        title: 'The four temperament archetypes',
        items: [
          { title: 'The Commander', body: 'Choleric: assertive, action-oriented, direct.', accent: 'red' },
          { title: 'The Bard', body: 'Sanguine: expressive, social, playful.', accent: 'gold' },
          { title: 'The Strategist', body: 'Melancholic: precise, reflective, meaningful.', accent: 'blue' },
          { title: 'The Guardian', body: 'Phlegmatic: calm, supportive, loyal.', accent: 'green' },
        ],
      },
    ],
  },
  {
    slug: 'subtypes',
    shortTitle: 'Temperament Subtypes',
    title: 'Temperament Subtypes: How Primary and Secondary Temperaments Blend',
    description: 'Explore temperament subtypes and learn how primary and secondary patterns combine into more specific FourType profiles.',
    keywords: ['temperament subtypes', 'four temperament subtypes', 'temperament blends', 'sanguine choleric', 'melancholic phlegmatic'],
    eyebrow: 'Beyond Four Labels',
    icon: ArrowRightLeft,
    accent: 'blue',
    priority: 0.88,
    changeFrequency: 'monthly',
    blocks: [
      {
        type: 'section',
        title: 'Most people are blends',
        body: [
          'Pure types are useful teaching examples, but real people often carry a strong secondary temperament. That secondary pattern changes how the primary one shows up.',
          'A Sanguine-Choleric may be playful and persuasive. A Choleric-Sanguine may be driven and charismatic. The order matters.',
        ],
      },
      {
        type: 'callout',
        title: 'How to read a subtype',
        body: 'The first temperament is usually your default drive. The second temperament often colors your style, motivation, and social expression.',
        bullets: ['Primary = default pattern', 'Secondary = flavor and compensation', 'Score spread = confidence level', 'Context can amplify different traits'],
      },
    ],
  },
  {
    slug: 'methodology',
    shortTitle: 'Methodology',
    title: 'FourType Methodology: How the Temperament Test Is Scored',
    description: 'Read how FourType scores the 40-question temperament test, interprets subtypes, and explains responsible limits of the model.',
    keywords: ['temperament test methodology', 'temperament test scoring', 'how temperament tests work', 'FourType methodology'],
    eyebrow: 'Responsible Interpretation',
    icon: ShieldCheck,
    accent: 'purple',
    priority: 0.84,
    changeFrequency: 'monthly',
    blocks: [
      {
        type: 'section',
        title: 'How FourType reads your answers',
        body: [
          'Each question is designed to reveal a behavioral preference rather than a moral value. The scoring key maps answers toward Choleric, Sanguine, Melancholic, or Phlegmatic tendencies.',
          'Your final result considers your top score, secondary score, and score spread. A close spread means you may relate to multiple patterns; a dominant spread usually means the primary type is clearer.',
        ],
      },
      {
        type: 'callout',
        title: 'What FourType is not',
        body: 'FourType is not a medical, psychiatric, or employment-screening diagnosis. It is a self-reflection framework for education, communication, and personal growth.',
        bullets: ['Do not use it to label someone permanently.', 'Do not use it to make clinical claims.', 'Do use it to ask better questions about patterns.'],
      },
    ],
  },
  {
    slug: 'temperaments-vs-mbti',
    shortTitle: 'Temperaments vs MBTI',
    title: 'Temperaments vs MBTI: How Four Temperaments Compare to Myers-Briggs',
    description: 'Compare four temperaments with MBTI and learn when each personality framework is useful for self-understanding.',
    keywords: ['temperaments vs MBTI', 'four temperaments vs Myers Briggs', 'temperament and MBTI', 'personality frameworks comparison'],
    eyebrow: 'Framework Comparison',
    icon: Scale,
    accent: 'blue',
    priority: 0.84,
    changeFrequency: 'monthly',
    blocks: [
      {
        type: 'section',
        title: 'Different tools answer different questions',
        body: [
          'MBTI describes preferences around attention, information, decisions, and structure. Temperament describes emotional pace, activation, social energy, and stress response.',
          'That is why the two systems can overlap without being identical. A person can share an MBTI type with someone else and still feel temperamentally different in conflict, work, and relationships.',
        ],
      },
      {
        type: 'grid',
        title: 'When each model helps',
        items: [
          { title: 'Use temperament for', body: 'Stress response, interpersonal pace, conflict style, motivation, and fast self-reflection.', accent: 'gold' },
          { title: 'Use MBTI for', body: 'Cognitive preferences, decision style, planning style, and how someone processes information.', accent: 'blue' },
        ],
      },
    ],
  },
  {
    slug: 'premium',
    shortTitle: 'Premium Report',
    title: 'FourType Premium Report: Deeper Temperament Guidance',
    description: 'Preview what a premium FourType temperament report can include: subtype patterns, communication guidance, stress response, and growth prompts.',
    keywords: ['temperament report', 'premium temperament test', 'personality report', 'FourType premium'],
    eyebrow: 'Deeper Guidance',
    icon: BookOpen,
    accent: 'gold',
    priority: 0.76,
    changeFrequency: 'monthly',
    ctaLabel: 'Take the Free Quiz First',
    blocks: [
      {
        type: 'section',
        title: 'What a deeper report should give you',
        body: [
          'A good temperament report should not simply repeat your label. It should help you see your patterns in real situations: communication, work, pressure, relationships, growth, and blind spots.',
          'FourType premium is shaped around practical guidance: what to watch for, what to practice, and how your subtype changes the story.',
        ],
      },
      {
        type: 'callout',
        title: 'Responsible premium guidance',
        body: 'The best use of a paid report is not certainty. It is a more detailed mirror that helps you make better choices.',
        bullets: ['Subtype interpretation', 'Stress and recovery patterns', 'Communication guidance', 'Relationship dynamics', 'Growth prompts'],
      },
    ],
  },
]

export const blogArticles: BlogArticle[] = [
  {
    slug: 'temperament-compatibility-chart',
    title: 'Four Temperaments Compatibility Chart: Which Types Get Along?',
    shortTitle: 'Four Temperaments Compatibility Chart',
    description: 'Compare choleric, sanguine, melancholic, and phlegmatic compatibility in dating, friendships, family, and work relationships.',
    keywords: ['temperament compatibility', 'four temperaments compatibility chart', 'choleric sanguine compatibility', 'melancholic phlegmatic compatibility', 'personality compatibility'],
    category: 'Relationships',
    readTime: '9 min',
    accent: 'pink',
    icon: Heart,
    image: '/images/blog/temperament-compatibility-chart.png',
    imageAlt: 'Four temperament archetypes gathered around a glowing compatibility map',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'Compatibility is not about finding your twin',
        body: [
          'The most compatible temperament pairing is not always the easiest one. Easy chemistry often comes from similarity, but long-term growth often comes from complementary strengths.',
          'A Choleric may bring direction to a Phlegmatic relationship. A Phlegmatic may bring calm to the Choleric. Neither person is “better”; they are solving different problems in the emotional system.',
        ],
      },
      {
        type: 'grid',
        title: 'Quick compatibility chart',
        intro: 'Use this as a starting point, not a rulebook.',
        items: [
          { title: 'Choleric + Phlegmatic', body: 'Strong balance of drive and peace. The risk is pace mismatch: one pushes, one withdraws.', accent: 'red' },
          { title: 'Sanguine + Melancholic', body: 'Lightness meets depth. Great when play and seriousness are both honored.', accent: 'gold' },
          { title: 'Melancholic + Phlegmatic', body: 'Loyal, gentle, and thoughtful. Watch for quiet resentment and conflict avoidance.', accent: 'blue' },
          { title: 'Choleric + Sanguine', body: 'High energy and fast movement. Exciting, but needs tenderness and follow-through.', accent: 'green' },
        ],
      },
      {
        type: 'section',
        title: 'Best matches by temperament',
        body: [
          'Cholerics often pair well with Phlegmatics because steadiness softens intensity. They can also respect Melancholic competence and Sanguine courage, but they must learn to slow down.',
          'Sanguines often pair well with Phlegmatics because calm helps their energy land. They can enjoy Choleric momentum and Melancholic depth, but they must practice consistency.',
          'Melancholics often pair well with Phlegmatics because both value loyalty. They can admire Choleric decisiveness and Sanguine warmth, but they must avoid overreading every difference.',
          'Phlegmatics often pair well with Cholerics and Sanguines because those types bring movement. They can deeply understand Melancholics, but both may need help naming hard feelings.',
        ],
      },
      {
        type: 'callout',
        title: 'The real compatibility question',
        body: 'Ask: “Can we respect each other’s default pattern under stress?” Temperament compatibility improves when both people stop treating their own pace as the only normal one.',
        bullets: ['Name the stress pattern.', 'Negotiate pace before conflict escalates.', 'Use temperament language as empathy, not ammunition.', 'Take the quiz separately, then compare results.'],
      },
    ],
    related: [
      { href: '/temperament-test-for-couples', title: 'Temperament Test for Couples', description: 'Compare communication and conflict patterns together.' },
      { href: '/blog/temperament-dating', title: 'Temperament & Dating', description: 'A dating-focused guide to the four types.' },
    ],
  },
  {
    slug: 'temperament-test-accuracy',
    title: 'Temperament Test Accuracy: How Reliable Are Four Temperaments Quizzes?',
    shortTitle: 'Temperament Test Accuracy',
    description: 'Learn what makes a temperament test accurate, what it can and cannot tell you, and how to read your FourType result responsibly.',
    keywords: ['temperament test accuracy', 'are temperament tests accurate', 'four temperaments test reliable', 'personality test accuracy'],
    category: 'Methodology',
    readTime: '8 min',
    accent: 'purple',
    icon: ShieldCheck,
    image: '/images/blog/temperament-test-accuracy.png',
    imageAlt: 'Four temperament archetypes examining a luminous quiz scroll and scales',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'A temperament test can be useful without being clinical',
        body: [
          'A good temperament test is not trying to diagnose you. It is trying to reveal a repeatable pattern in how you move through pressure, people, decisions, and emotion.',
          'Accuracy in this context means “Does the result describe a pattern I can recognize, test against my life, and use constructively?” That is different from medical validity or hiring-grade psychometrics.',
        ],
      },
      {
        type: 'grid',
        title: 'What improves accuracy',
        items: [
          { title: 'Behavior-based questions', body: 'Questions should ask what you actually do, not what sounds admirable.', accent: 'green' },
          { title: 'Score spread', body: 'Close scores should be interpreted with more nuance than dominant scores.', accent: 'blue' },
          { title: 'Subtype reading', body: 'A secondary temperament often explains why a pure type description feels incomplete.', accent: 'gold' },
          { title: 'Responsible limits', body: 'The result should avoid clinical claims and permanent labels.', accent: 'purple' },
        ],
      },
      {
        type: 'section',
        title: 'Why results can feel wrong',
        body: [
          'Sometimes a result feels wrong because you answered as your ideal self, not your default self. Sometimes it is because your work role rewards a learned behavior that is different from your natural pattern.',
          'Context matters. A parent, founder, student, or manager may display traits that are partly trained by responsibility. That is why the best reading compares your result against stress response, not only daily identity.',
        ],
      },
      {
        type: 'callout',
        title: 'How to read your result well',
        body: 'Treat your result as a hypothesis. Look for confirmation in your energy, stress, conflict, and recovery patterns.',
        bullets: ['Read your top two scores.', 'Ask what happens under pressure.', 'Compare your subtype, not only your primary type.', 'Retake only after a meaningful life change or clearer self-observation.'],
      },
    ],
    related: [
      { href: '/methodology', title: 'FourType Methodology', description: 'How scoring and subtype interpretation work.' },
      { href: '/what-is-temperament-test', title: 'What Is a Temperament Test?', description: 'A deeper guide to the model and quiz.' },
    ],
  },
  {
    slug: 'choleric-sanguine-melancholic-phlegmatic',
    title: 'Choleric, Sanguine, Melancholic, Phlegmatic: How to Tell the Difference',
    shortTitle: 'How to Tell the Four Temperaments Apart',
    description: 'A practical guide to telling choleric, sanguine, melancholic, and phlegmatic temperament patterns apart in real life.',
    keywords: ['choleric sanguine melancholic phlegmatic', 'how to tell temperaments apart', 'four temperament types explained', 'difference between temperaments'],
    category: 'Temperaments',
    readTime: '10 min',
    accent: 'gold',
    icon: Search,
    image: '/images/blog/four-temperaments-differences.png',
    imageAlt: 'Four temperament archetypes standing in a comparison formation',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'The fastest way to tell the difference',
        body: [
          'Do not start with stereotypes. Start with what the person protects under stress. Choleric protects control. Sanguine protects connection. Melancholic protects meaning and quality. Phlegmatic protects peace.',
          'That one distinction explains why the four types can behave so differently even when they share intelligence, kindness, ambition, or creativity.',
        ],
      },
      {
        type: 'grid',
        title: 'The four core questions',
        items: [
          { title: 'Choleric: “What is the goal?”', body: 'Looks for action, authority, progress, and control. Frustrated by delays and indecision.', accent: 'red' },
          { title: 'Sanguine: “Where is the energy?”', body: 'Looks for people, novelty, humor, and shared experience. Frustrated by boredom and isolation.', accent: 'gold' },
          { title: 'Melancholic: “Is this meaningful and correct?”', body: 'Looks for depth, accuracy, beauty, and standards. Frustrated by shallowness and sloppy work.', accent: 'blue' },
          { title: 'Phlegmatic: “Can we keep this steady?”', body: 'Looks for harmony, loyalty, calm, and safety. Frustrated by pressure and conflict.', accent: 'green' },
        ],
      },
      {
        type: 'section',
        title: 'Common mistypes',
        body: [
          'Choleric and Sanguine can both be extroverted, but Choleric is task-first while Sanguine is people-first. One wants momentum toward an outcome; the other wants shared energy.',
          'Melancholic and Phlegmatic can both be quiet, but Melancholic is more intense internally while Phlegmatic is more peace-seeking. One may overthink; the other may understate.',
          'Choleric and Melancholic can both have high standards, but Choleric pushes for results while Melancholic protects quality. Sanguine and Phlegmatic can both be agreeable, but one energizes the room while the other calms it.',
        ],
      },
      {
        type: 'callout',
        title: 'The best next step',
        body: 'If you are stuck between two types, your subtype may be the answer. Take the quiz, then compare your top two scores instead of forcing yourself into a pure label.',
        bullets: ['Look at stress response.', 'Compare top two scores.', 'Read the subtype page.', 'Ask a trusted person how you behave under pressure.'],
      },
    ],
    related: [
      { href: '/4-temperament-test', title: '4 Temperament Test', description: 'A focused guide to the four-type quiz.' },
      { href: '/four-temperaments', title: 'The Four Temperaments', description: 'The classical framework explained clearly.' },
    ],
  },
]

export const allContentPages = [
  ...seoPages.map((page) => ({
    href: `/${page.slug}`,
    title: page.shortTitle,
    description: page.description,
    priority: page.priority,
    changeFrequency: page.changeFrequency,
  })),
  ...blogArticles.map((article) => ({
    href: `/blog/${article.slug}`,
    title: article.shortTitle,
    description: article.description,
    priority: 0.82,
    changeFrequency: 'monthly' as const,
  })),
]

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug)
}

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug)
}

export function contentToMarkdown(title: string, description: string, blocks: ContentBlock[]) {
  const lines = [`# ${title}`, '', description, '']

  for (const block of blocks) {
    lines.push(`## ${block.title}`, '')
    if (block.type === 'grid') {
      if (block.intro) {
        lines.push(block.intro, '')
      }
      for (const item of block.items) {
        lines.push(`### ${item.title}`, '', item.body, '')
      }
      continue
    }

    if (block.type === 'callout') {
      lines.push(block.body, '')
    } else {
      lines.push(...block.body.flatMap((paragraph) => [paragraph, '']))
    }

    if (block.bullets) {
      lines.push(...block.bullets.map((bullet) => `- ${bullet}`), '')
    }
  }

  lines.push('## Take the FourType quiz', '', 'Start here: https://www.fourtype.com/quiz', '')
  return lines.join('\n')
}
