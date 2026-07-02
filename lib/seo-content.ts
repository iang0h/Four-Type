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
  faq?: { question: string; answer: string }[]
}

export type LinkCard = { href: string; title: string; description: string }

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
  faq?: { question: string; answer: string }[]
  related: LinkCard[]
}

export type FaqItem = NonNullable<SeoPage['faq']>[number]

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
    faq: [
      { question: 'What is a temperament test?', answer: 'A temperament test is a personality quiz that identifies your default behavioral pattern across the four classical temperaments: Choleric, Sanguine, Melancholic, and Phlegmatic.' },
      { question: 'Is FourType a free temperament test?', answer: 'Yes. FourType offers a free 40-question temperament test that gives you a primary temperament, score spread, and subtype direction.' },
      { question: 'What are the four temperament types?', answer: 'The four temperament types are Choleric, Sanguine, Melancholic, and Phlegmatic. They describe patterns in energy, stress response, communication, motivation, and relationship style.' },
      { question: 'Is a temperament test the same as a diagnosis?', answer: 'No. A temperament test is a self-reflection tool, not a clinical or medical diagnosis. It should be used as practical pattern language, not a permanent label.' },
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
    faq: [
      { question: 'Where can I take a free temperament test?', answer: 'You can take the FourType temperament test for free at fourtype.com/quiz. It does not require payment to see your basic temperament result.' },
      { question: 'What does the free FourType result include?', answer: 'The free result includes your main temperament pattern, your score spread across the four temperaments, and guidance toward your likely subtype.' },
      { question: 'Do I need an account to take the test?', answer: 'No. The core FourType quiz can be taken without creating an account.' },
    ],
  },
  {
    slug: 'temperament-quiz',
    shortTitle: 'Temperament Quiz',
    title: 'Temperament Quiz: Discover Your Four Temperaments Pattern',
    description: 'Take a free temperament quiz to discover whether your strongest pattern is Choleric, Sanguine, Melancholic, Phlegmatic, or a blended subtype.',
    keywords: ['temperament quiz', 'free temperament quiz', 'four temperament quiz', 'personality temperament quiz', 'choleric sanguine melancholic phlegmatic quiz'],
    eyebrow: 'Fast Four Temperaments Quiz',
    icon: HelpCircle,
    accent: 'gold',
    priority: 0.92,
    changeFrequency: 'weekly',
    ctaLabel: 'Take the Temperament Quiz',
    blocks: [
      {
        type: 'section',
        title: 'A temperament quiz should give you more than a label',
        body: [
          'A good temperament quiz helps you notice your repeated patterns: how you respond to pressure, how you connect with people, what motivates you, and what tends to drain you.',
          'FourType turns the classic Choleric, Sanguine, Melancholic, and Phlegmatic model into a practical quiz experience with score spread and subtype direction. That matters because many people are blends rather than pure types.',
        ],
      },
      {
        type: 'grid',
        title: 'What the quiz looks for',
        intro: 'The best clues are usually visible in everyday behavior, not in idealized self-image.',
        items: [
          { title: 'Decision pace', body: 'Do you move quickly toward action, gather context, seek harmony, or follow energy?', accent: 'red' },
          { title: 'Social energy', body: 'Do people charge you, drain you, focus you, or help you feel safe?', accent: 'gold' },
          { title: 'Stress response', body: 'Under pressure, do you push, perform, perfect, or withdraw?', accent: 'blue' },
          { title: 'Growth pattern', body: 'Your result points toward habits that help your temperament mature.', accent: 'green' },
        ],
      },
      {
        type: 'callout',
        title: 'How to answer for the clearest result',
        body: 'Answer as your repeated default self, especially under ordinary stress. Do not answer as your best day, your job title, or the person you wish you were.',
        bullets: ['Choose what you usually do.', 'Move quickly through the quiz.', 'Compare your top two scores.', 'Use the result as a mirror, not a box.'],
      },
    ],
    faq: [
      { question: 'What is a temperament quiz?', answer: 'A temperament quiz is a personality-style questionnaire that helps identify your likely Choleric, Sanguine, Melancholic, or Phlegmatic pattern.' },
      { question: 'Is the FourType temperament quiz free?', answer: 'Yes. The core FourType temperament quiz is free and gives you a useful result with primary pattern, score spread, and subtype direction.' },
      { question: 'How long does the temperament quiz take?', answer: 'Most people can complete the FourType quiz quickly because it uses 40 focused questions about repeated behavior and stress response.' },
    ],
  },
  {
    slug: 'what-is-my-temperament',
    shortTitle: 'What Is My Temperament?',
    title: 'What Is My Temperament? Find Your Choleric, Sanguine, Melancholic, or Phlegmatic Pattern',
    description: 'Wondering “what is my temperament?” Learn the signs of each type and take the free FourType quiz to identify your strongest pattern.',
    keywords: ['what is my temperament', 'what temperament am I', 'find my temperament', 'my temperament test', 'which temperament am I'],
    eyebrow: 'Find Your Pattern',
    icon: Search,
    accent: 'blue',
    priority: 0.91,
    changeFrequency: 'weekly',
    ctaLabel: 'Find My Temperament',
    blocks: [
      {
        type: 'section',
        title: 'Start with what you protect under stress',
        body: [
          'If you are asking “what is my temperament?”, do not start with stereotypes. Start with what you instinctively protect when pressure rises.',
          'Choleric protects control and progress. Sanguine protects connection and energy. Melancholic protects meaning and quality. Phlegmatic protects peace and trust.',
        ],
      },
      {
        type: 'grid',
        title: 'Quick self-check',
        items: [
          { title: 'You may be Choleric if...', body: 'You move toward goals quickly, dislike delay, and feel calmer when someone takes charge.', accent: 'red' },
          { title: 'You may be Sanguine if...', body: 'You light up around people, ideas, stories, humor, and shared momentum.', accent: 'gold' },
          { title: 'You may be Melancholic if...', body: 'You notice details, care about depth, and feel uneasy when things seem careless.', accent: 'blue' },
          { title: 'You may be Phlegmatic if...', body: 'You value calm, loyalty, stability, and keeping relationships from becoming unnecessarily tense.', accent: 'green' },
        ],
      },
      {
        type: 'callout',
        title: 'Why the quiz is better than guessing',
        body: 'Most people relate to more than one temperament. A quiz gives you a score spread so you can see whether you have a dominant type or a blended subtype.',
        bullets: ['Look at your primary temperament.', 'Read your secondary score.', 'Compare your stress pattern.', 'Use subtype guidance when two types feel close.'],
      },
    ],
    faq: [
      { question: 'How do I know what my temperament is?', answer: 'Look at your repeated stress response, motivation, social energy, and conflict style. A temperament quiz can help clarify your strongest pattern and secondary influence.' },
      { question: 'Can I have two temperaments?', answer: 'Yes. Many people have a primary temperament and a strong secondary temperament, which creates a subtype or blend.' },
      { question: 'What if I relate to all four temperaments?', answer: 'Relating to all four is common. Focus on what shows up most under pressure and compare your quiz score spread rather than forcing a pure label.' },
    ],
  },
  {
    slug: 'personality-temperament-test',
    shortTitle: 'Personality Temperament Test',
    title: 'Personality Temperament Test: Understand Your Natural Pattern',
    description: 'Take a personality temperament test to understand your natural behavior, stress response, communication style, and four temperaments subtype.',
    keywords: ['personality temperament test', 'personality temperament quiz', 'temperament personality test', 'personality type temperament test'],
    eyebrow: 'Personality Meets Temperament',
    icon: Brain,
    accent: 'purple',
    priority: 0.89,
    changeFrequency: 'weekly',
    ctaLabel: 'Take the Personality Temperament Test',
    blocks: [
      {
        type: 'section',
        title: 'Temperament is the practical layer of personality',
        body: [
          'Personality can mean many things: habits, values, identity, cognitive preferences, emotional style, and learned roles. Temperament focuses on the natural patterns that tend to show up early and repeat under pressure.',
          'FourType uses the four temperaments as a practical personality language. The point is not to explain every part of you. The point is to name a repeatable pattern you can observe and work with.',
        ],
      },
      {
        type: 'grid',
        title: 'What a personality temperament test can reveal',
        items: [
          { title: 'Motivation', body: 'What naturally gets you moving: challenge, connection, meaning, or peace.', accent: 'gold' },
          { title: 'Communication', body: 'How direct, expressive, careful, or diplomatic you tend to be.', accent: 'blue' },
          { title: 'Conflict style', body: 'Whether you push, smooth, analyze, joke, withdraw, or seek resolution.', accent: 'red' },
          { title: 'Growth edge', body: 'The habit your temperament most often needs to practice to mature.', accent: 'green' },
        ],
      },
      {
        type: 'callout',
        title: 'Use it responsibly',
        body: 'A personality temperament test is useful for self-understanding, relationships, and communication. It should not be used as a diagnosis, hiring filter, or permanent identity box.',
        bullets: ['Use the result to ask better questions.', 'Compare behavior, not ego.', 'Respect that context changes expression.', 'Let the result guide growth, not excuses.'],
      },
    ],
    faq: [
      { question: 'What is a personality temperament test?', answer: 'A personality temperament test is a quiz that identifies your natural behavior pattern, often using the four temperaments: Choleric, Sanguine, Melancholic, and Phlegmatic.' },
      { question: 'Is temperament the same as personality?', answer: 'No. Temperament is one layer of personality. It focuses on natural patterns in energy, emotion, stress response, communication, and motivation.' },
      { question: 'Is FourType a personality test?', answer: 'FourType is a temperament-based personality quiz for self-reflection. It is educational, not clinical or diagnostic.' },
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
    faq: [
      { question: 'What is the 4 temperament test?', answer: 'The 4 temperament test compares your answers across Choleric, Sanguine, Melancholic, and Phlegmatic patterns to identify your most likely temperament style.' },
      { question: 'Which of the four temperaments is rarest?', answer: 'Rarity depends on the sample and test method. FourType focuses less on rarity and more on whether your result explains your actual stress, work, and relationship patterns.' },
      { question: 'Can someone be a mix of two temperaments?', answer: 'Yes. Many people are blends, which is why FourType includes subtype guidance instead of forcing every result into a pure four-type label.' },
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
    faq: [
      { question: 'Is a temperament test useful for couples?', answer: 'Yes. A temperament test can help couples name differences in pace, conflict style, emotional needs, and repair patterns without turning those differences into blame.' },
      { question: 'Which temperament pairing is best for relationships?', answer: 'There is no single best pairing. Complementary pairings can balance each other, while similar pairings may feel easier at first. Respect and communication matter more than the exact match.' },
      { question: 'Should partners get the same temperament result?', answer: 'No. Partners do not need the same temperament to have a strong relationship. Different temperaments often work well when both people understand the other person’s default pattern.' },
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
    faq: [
      { question: 'What are the four temperaments?', answer: 'The four temperaments are Choleric, Sanguine, Melancholic, and Phlegmatic. They describe patterns in drive, sociability, emotional depth, steadiness, stress response, and communication.' },
      { question: 'Are the four temperaments still useful today?', answer: 'Yes, when used responsibly. The four temperaments are not modern clinical categories, but they can be useful as practical language for self-reflection and relationships.' },
      { question: 'Can I have more than one temperament?', answer: 'Yes. Many people have a strong primary temperament and a noticeable secondary temperament, which is why FourType includes subtype interpretation.' },
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
    faq: [
      { question: 'What are temperament subtypes?', answer: 'Temperament subtypes describe how a primary temperament blends with a secondary temperament. The blend helps explain why two people with the same main type can still feel different.' },
      { question: 'Does the order of a temperament blend matter?', answer: 'Yes. A Choleric-Sanguine and a Sanguine-Choleric share ingredients, but the first temperament usually describes the default drive while the second colors the style.' },
      { question: 'How do I find my temperament subtype?', answer: 'Take the FourType quiz and compare your top two scores. A strong second score often points toward your likely subtype.' },
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
    faq: [
      { question: 'How is the FourType temperament test scored?', answer: 'FourType maps each answer toward Choleric, Sanguine, Melancholic, or Phlegmatic tendencies, then reads the top score, secondary score, and overall spread.' },
      { question: 'Why does score spread matter?', answer: 'Score spread shows how dominant or blended your result is. A close spread needs more nuance than a result where one temperament is clearly ahead.' },
      { question: 'Is FourType a clinical assessment?', answer: 'No. FourType is an educational self-reflection tool. It should not be used for diagnosis, employment screening, or clinical decisions.' },
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
    faq: [
      { question: 'Are temperaments the same as MBTI?', answer: 'No. MBTI focuses on cognitive preferences, while temperament focuses more on emotional pace, activation, stress response, and interpersonal style.' },
      { question: 'Can I use MBTI and temperament together?', answer: 'Yes. The two frameworks can be used together as long as you treat them as different lenses rather than identical systems.' },
      { question: 'Which is better: temperament or MBTI?', answer: 'Neither is automatically better. Temperament is often simpler for understanding conflict and stress patterns, while MBTI can be useful for cognitive preference language.' },
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
    faq: [
      { question: 'What is in a premium temperament report?', answer: 'A premium temperament report can add deeper subtype interpretation, communication guidance, stress patterns, relationship notes, and growth prompts beyond the basic quiz result.' },
      { question: 'Should I take the free quiz before getting a report?', answer: 'Yes. The free quiz gives you the primary pattern and score spread needed before deeper report guidance is useful.' },
      { question: 'Is a premium report a diagnosis?', answer: 'No. A premium FourType report is still self-reflection guidance, not a medical, psychiatric, or employment diagnosis.' },
    ],
  },
]

export const blogArticles: BlogArticle[] = [
  {
    slug: 'ospp-four-temperaments-test',
    title: 'OSPP Four Temperaments Test vs FourType: Which Temperament Quiz Should You Take?',
    shortTitle: 'OSPP Four Temperaments Test vs FourType',
    description: 'Compare the OSPP four temperaments test with FourType, including scoring style, result depth, subtype guidance, and how to choose the right temperament quiz.',
    keywords: ['OSPP four temperaments test', 'OSPP temperament test', 'four temperaments test comparison', 'best four temperaments test', 'temperament quiz comparison'],
    category: 'Comparison',
    readTime: '8 min',
    accent: 'blue',
    icon: Scale,
    image: '/images/blog/ospp-four-temperaments-test.jpg',
    imageAlt: 'Four temperament archetypes comparing two glowing assessment scrolls',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'Why people search for OSPP',
        body: [
          'The OSPP four temperaments test is often searched by people who want a simple, familiar temperament quiz. That intent is good: the user wants to understand Choleric, Sanguine, Melancholic, and Phlegmatic patterns without a complicated personality framework.',
          'The better question is not which quiz has the oldest name recognition. It is which test helps you understand your pattern clearly enough to use it in work, stress, relationships, and growth.',
        ],
      },
      {
        type: 'grid',
        title: 'How to compare temperament tests',
        items: [
          { title: 'Question design', body: 'Look for behavior-based questions rather than flattering identity labels.', accent: 'green' },
          { title: 'Result depth', body: 'A useful result should explain your top scores and not only assign a single label.', accent: 'blue' },
          { title: 'Subtype nuance', body: 'Many people are blends, so secondary temperament interpretation matters.', accent: 'gold' },
          { title: 'Responsible limits', body: 'A trustworthy quiz avoids clinical claims and permanent labels.', accent: 'purple' },
        ],
      },
      {
        type: 'section',
        title: 'Where FourType is different',
        body: [
          'FourType is built around a modern temperament journey: a free 40-question quiz, clear score interpretation, subtype guidance, and practical education pages for the major temperament search intents.',
          'The goal is not to “beat” another quiz by sounding more certain. The goal is to make your result more useful. FourType treats temperament as a practical mirror rather than a diagnosis.',
        ],
      },
      {
        type: 'callout',
        title: 'Which one should you take?',
        body: 'If you want a fast temperament label, many tests can be interesting. If you want a result you can keep exploring through subtype pages, relationship guidance, and methodology notes, start with FourType.',
        bullets: ['Take one quiz when you want a quick signal.', 'Compare your top two scores when results feel mixed.', 'Read methodology before treating any result as truth.', 'Use your result to improve behavior, not to label yourself forever.'],
      },
    ],
    related: [
      { href: '/methodology', title: 'FourType Methodology', description: 'How FourType scores and interprets results.' },
      { href: '/blog/temperament-test-accuracy', title: 'Temperament Test Accuracy', description: 'How to judge reliability in temperament quizzes.' },
    ],
    faq: [
      { question: 'What is the OSPP four temperaments test?', answer: 'The OSPP four temperaments test is a searched-for temperament quiz based on the classical four temperament labels. People usually look for it when they want a simple Choleric, Sanguine, Melancholic, or Phlegmatic result.' },
      { question: 'How is FourType different from OSPP?', answer: 'FourType focuses on a polished quiz journey, practical result interpretation, score spread, subtype guidance, and educational pages that explain how to use temperament responsibly.' },
      { question: 'Should I take OSPP or FourType?', answer: 'If you want a practical free temperament quiz with subtype direction and follow-up guides, FourType is a strong place to start. You can still compare results from multiple tests as hypotheses, not final labels.' },
    ],
  },
  {
    slug: 'four-humors-test',
    title: 'Four Humors Test vs Four Temperaments Test: What Is the Difference?',
    shortTitle: 'Four Humors Test vs Temperament Test',
    description: 'Learn how the ancient four humors connect to the modern four temperaments test, and why FourType uses the model responsibly today.',
    keywords: ['four humors test', 'four humors personality test', 'four temperaments test', 'Hippocrates temperament test', 'humors temperament'],
    category: 'History',
    readTime: '9 min',
    accent: 'gold',
    icon: BookOpen,
    image: '/images/blog/four-humors-test.jpg',
    imageAlt: 'Ancient four humors symbols transforming into four modern temperament archetypes',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'The four humors are the origin story, not the science',
        body: [
          'The ancient four humors theory connected personality and health to bodily fluids: blood, yellow bile, black bile, and phlegm. That medical explanation is outdated.',
          'But the behavioral patterns that survived from that tradition became the four temperaments: Sanguine, Choleric, Melancholic, and Phlegmatic. FourType keeps the useful pattern language while avoiding outdated medical claims.',
        ],
      },
      {
        type: 'grid',
        title: 'From humors to temperaments',
        items: [
          { title: 'Blood -> Sanguine', body: 'Social, lively, expressive, novelty-seeking, and connection-oriented.', accent: 'gold' },
          { title: 'Yellow bile -> Choleric', body: 'Direct, forceful, decisive, ambitious, and action-oriented.', accent: 'red' },
          { title: 'Black bile -> Melancholic', body: 'Reflective, analytical, standards-driven, sensitive, and depth-oriented.', accent: 'blue' },
          { title: 'Phlegm -> Phlegmatic', body: 'Calm, loyal, steady, diplomatic, and peace-oriented.', accent: 'green' },
        ],
      },
      {
        type: 'section',
        title: 'Why modern temperament tests should be careful',
        body: [
          'A modern four temperaments test should not claim that ancient medicine was literally correct. It should explain that the old framework is a historical ancestor of a practical personality language.',
          'That is why FourType frames temperament as self-understanding, not diagnosis. The value is in pattern recognition: stress response, communication, work rhythm, relationship pace, and growth practices.',
        ],
      },
      {
        type: 'callout',
        title: 'Should you search for a four humors test or a temperament test?',
        body: 'If you are curious about history, “four humors” is the right phrase. If you want a practical result you can use today, “four temperaments test” or “temperament test” is usually the better search.',
        bullets: ['Use Four Humors for history.', 'Use Four Temperaments for personality patterns.', 'Use FourType for a modern quiz and subtype interpretation.'],
      },
    ],
    related: [
      { href: '/blog/choleric-sanguine-melancholic-phlegmatic', title: 'Choleric, Sanguine, Melancholic, Phlegmatic', description: 'A practical guide to telling the four patterns apart.' },
      { href: '/four-temperaments', title: 'The Four Temperaments', description: 'A clear modern explanation of the four types.' },
    ],
    faq: [
      { question: 'What is a four humors test?', answer: 'A four humors test refers to the ancient idea that personality patterns were linked to blood, yellow bile, black bile, and phlegm. Modern temperament tests use the behavioral patterns without treating the old medical theory as literal science.' },
      { question: 'Are the four humors and four temperaments the same?', answer: 'They are historically connected but not identical. The four humors are the ancient medical origin story; the four temperaments are the personality pattern language that survived from that tradition.' },
      { question: 'Does FourType believe the four humors are medically true?', answer: 'No. FourType uses the four temperaments as a self-reflection framework and does not make medical or clinical claims based on the ancient four humors theory.' },
    ],
  },
  {
    slug: 'best-free-four-temperaments-test',
    title: 'Best Free Four Temperaments Test: What to Look For Before You Take One',
    shortTitle: 'Best Free Four Temperaments Test',
    description: 'Compare what makes a free four temperaments test useful, including question quality, score spread, subtype interpretation, and practical next steps.',
    keywords: ['best free four temperaments test', '4 temperaments test free', 'free four temperaments test', 'free temperament test online', 'temperament test free'],
    category: 'Guides',
    readTime: '8 min',
    accent: 'green',
    icon: CheckCircle2,
    image: '/images/blog/best-free-four-temperaments-test.jpg',
    imageAlt: 'A seeker choosing a free temperament test path guided by four temperament archetypes',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'Free does not have to mean shallow',
        body: [
          'A free four temperaments test can still be useful if it asks grounded questions, explains the result clearly, and gives you next steps beyond a label.',
          'The problem with many free quizzes is not that they are free. It is that they stop at a fun result and never help you apply the insight to your real life.',
        ],
      },
      {
        type: 'grid',
        title: 'What the best free tests include',
        items: [
          { title: 'Clear four-type scoring', body: 'You should see how Choleric, Sanguine, Melancholic, and Phlegmatic patterns are being weighed.', accent: 'gold' },
          { title: 'Score spread', body: 'Close results need nuance. A dominant score and a tie should not be interpreted the same way.', accent: 'blue' },
          { title: 'Subtype guidance', body: 'Blends explain why two people with the same primary temperament can feel very different.', accent: 'green' },
          { title: 'Responsible wording', body: 'Avoid tests that make clinical, destiny, or employment-screening claims.', accent: 'purple' },
        ],
      },
      {
        type: 'section',
        title: 'Why FourType is free',
        body: [
          'FourType keeps the core quiz free because temperament is most useful when people can compare results with friends, partners, teams, and family members.',
          'The free result is designed to be enough to start: primary temperament, subtype direction, score spread, and pages that explain the pattern. Deeper reports can add nuance later, but the basic self-understanding should not be locked away.',
        ],
      },
      {
        type: 'callout',
        title: 'Take the free test well',
        body: 'Answer as your default self, especially under stress. Do not answer as your ideal self, your work persona, or the version of you that sounds most impressive.',
        bullets: ['Move quickly through questions.', 'Think about repeated behavior, not one-off moments.', 'Compare the top two scores.', 'Read the subtype if your result feels mixed.'],
      },
    ],
    related: [
      { href: '/free-temperament-test', title: 'Free Temperament Test', description: 'Start the FourType quiz without signup or payment.' },
      { href: '/blog/temperament-test-accuracy', title: 'Temperament Test Accuracy', description: 'Learn how to judge a test result responsibly.' },
    ],
    faq: [
      { question: 'What is the best free four temperaments test?', answer: 'The best free four temperaments test should ask behavior-based questions, show your score spread, explain your likely subtype, and avoid clinical or destiny-style claims.' },
      { question: 'Is FourType free?', answer: 'Yes. FourType’s core 40-question temperament test is free and gives you a useful result without requiring payment for the basic interpretation.' },
      { question: 'How do I get the most accurate free temperament result?', answer: 'Answer based on your repeated default behavior, especially under stress. Avoid answering as your ideal self or as the role you play at work.' },
    ],
  },
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
    image: '/images/blog/temperament-compatibility-chart.jpg',
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
      { href: '/blog/choleric-sanguine-melancholic-phlegmatic', title: 'How to Tell the Types Apart', description: 'Spot the four temperament patterns in real life.' },
    ],
    faq: [
      { question: 'Which temperaments are most compatible?', answer: 'Complementary pairings such as Choleric and Phlegmatic or Sanguine and Phlegmatic can work well because one type balances the other. Compatibility depends more on respect and communication than on a fixed perfect match.' },
      { question: 'Can opposite temperaments have a good relationship?', answer: 'Yes. Opposite temperaments can work very well when both people respect different emotional pace, conflict style, and communication needs.' },
      { question: 'Should couples take a temperament test together?', answer: 'Yes. Taking the test separately and comparing results can help couples discuss stress patterns, communication style, and conflict repair without turning types into labels.' },
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
    image: '/images/blog/temperament-test-accuracy.jpg',
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
      { href: '/temperament-test', title: 'Temperament Test', description: 'A deeper guide to the model and quiz.' },
    ],
    faq: [
      { question: 'Are temperament tests accurate?', answer: 'Temperament tests can be useful for self-reflection when they ask behavior-based questions and explain score spread. They should not be treated as clinical diagnoses or permanent labels.' },
      { question: 'Why did I get a mixed temperament result?', answer: 'A mixed result usually means your top two scores are close or you have a strong secondary temperament. FourType uses subtype guidance to make those blends easier to understand.' },
      { question: 'Can my temperament change?', answer: 'Your default temperament pattern may stay fairly stable, but habits, roles, stress, and maturity can change how it shows up in daily life.' },
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
    image: '/images/blog/four-temperaments-differences.jpg',
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
    faq: [
      { question: 'How do I know if I am Choleric or Sanguine?', answer: 'Both can be energetic, but Choleric is usually task-first and control-oriented, while Sanguine is people-first and connection-oriented.' },
      { question: 'How do I know if I am Melancholic or Phlegmatic?', answer: 'Both can be quiet, but Melancholic tends to protect meaning, standards, and accuracy, while Phlegmatic tends to protect peace, steadiness, and trust.' },
      { question: 'What if I relate to all four temperaments?', answer: 'Look at your strongest pattern under stress and compare your top two scores. Many people relate to multiple types because they are blends rather than pure temperaments.' },
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

export const coreGuideLinks: LinkCard[] = [
  { href: '/temperament-test', title: 'Temperament Test', description: 'Start with the main free four temperaments quiz guide.' },
  { href: '/temperament-quiz', title: 'Temperament Quiz', description: 'Use the quiz-focused path to identify your four temperaments pattern.' },
  { href: '/what-is-my-temperament', title: 'What Is My Temperament?', description: 'Compare the signs of each temperament before taking the quiz.' },
  { href: '/personality-temperament-test', title: 'Personality Temperament Test', description: 'Understand temperament as a practical layer of personality.' },
  { href: '/free-temperament-test', title: 'Free Temperament Test', description: 'See what the free FourType result includes.' },
  { href: '/4-temperament-test', title: '4 Temperament Test', description: 'Compare Choleric, Sanguine, Melancholic, and Phlegmatic.' },
  { href: '/blog/best-free-four-temperaments-test', title: 'Best Free Four Temperaments Test', description: 'Learn what makes a free quiz worth taking.' },
  { href: '/blog/ospp-four-temperaments-test', title: 'OSPP Four Temperaments Test', description: 'Compare OSPP-style temperament tests with FourType.' },
  { href: '/blog/four-humors-test', title: 'Four Humors Test', description: 'Understand the historical roots of the four temperaments.' },
]

export const relationshipGuideLinks: LinkCard[] = [
  { href: '/temperament-test-for-couples', title: 'Temperament Test for Couples', description: 'Compare communication and conflict patterns together.' },
  { href: '/blog/temperament-compatibility-chart', title: 'Temperament Compatibility Chart', description: 'See how the four temperaments relate in relationships.' },
  { href: '/blog/choleric-sanguine-melancholic-phlegmatic', title: 'How to Tell the Four Temperaments Apart', description: 'Spot the real-life differences between the four patterns.' },
  { href: '/subtypes', title: 'Temperament Subtypes', description: 'Go beyond the primary label with blended subtype patterns.' },
]

export const methodologyGuideLinks: LinkCard[] = [
  { href: '/methodology', title: 'FourType Methodology', description: 'How the temperament test is scored and interpreted.' },
  { href: '/blog/temperament-test-accuracy', title: 'Temperament Test Accuracy', description: 'How to judge quiz reliability without overclaiming.' },
  { href: '/temperaments-vs-mbti', title: 'Temperaments vs MBTI', description: 'Compare temperament with other personality frameworks.' },
  { href: '/four-temperaments', title: 'The Four Temperaments', description: 'A clear guide to the classical four-type model.' },
]

export const popularGuideLinks: LinkCard[] = [
  ...coreGuideLinks.slice(1, 6),
  ...methodologyGuideLinks.slice(0, 2),
]

export function guideLinksForSeoPage(slug: string): LinkCard[] {
  if (slug === 'temperament-test-for-couples') {
    return relationshipGuideLinks
  }

  if (slug === 'methodology' || slug === 'temperaments-vs-mbti') {
    return methodologyGuideLinks
  }

  if (slug === 'four-temperaments' || slug === 'subtypes') {
    return [
      { href: '/blog/choleric-sanguine-melancholic-phlegmatic', title: 'How to Tell the Four Temperaments Apart', description: 'Compare the four types through stress response and real behavior.' },
      ...relationshipGuideLinks.slice(1, 3),
      ...methodologyGuideLinks.slice(0, 1),
    ]
  }

  return popularGuideLinks
}

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

export function faqsToMarkdown(faq?: FaqItem[]) {
  if (!faq?.length) return ''

  return [
    '## Frequently asked questions',
    '',
    ...faq.flatMap((item) => [`### ${item.question}`, '', item.answer, '']),
  ].join('\n')
}

export function linksToMarkdown(title: string, links: LinkCard[]) {
  if (!links.length) return ''

  return [
    `## ${title}`,
    '',
    ...links.flatMap((link) => [`- [${link.title}](https://www.fourtype.com${link.href}) - ${link.description}`]),
    '',
  ].join('\n')
}

export function faqJsonLd(faq?: FaqItem[]) {
  if (!faq?.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbJsonLd(items: LinkCard[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      item: `https://www.fourtype.com${item.href}`,
    })),
  }
}

export const quizActionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FourType Temperament Test',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  url: 'https://www.fourtype.com/quiz',
  description: 'A free 40-question temperament test for identifying Choleric, Sanguine, Melancholic, Phlegmatic, and blended subtype patterns.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  potentialAction: {
    '@type': 'TakeAction',
    target: 'https://www.fourtype.com/quiz',
    name: 'Take the free temperament test',
  },
}
