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

export type DiscoverablePage = LinkCard & {
  priority: number
  changeFrequency: 'weekly' | 'monthly'
  markdownBody?: string
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
    slug: 'choleric-test',
    shortTitle: 'Choleric Test',
    title: 'Choleric Test: Are You the Driven, Decisive Type?',
    description: 'Take a Choleric test to see whether your strongest temperament pattern is direct, goal-focused, decisive, and energized by challenge.',
    keywords: ['choleric test', 'am I choleric', 'choleric temperament test', 'choleric personality test', 'choleric quiz'],
    eyebrow: 'Commander Pattern Check',
    icon: Flame,
    accent: 'red',
    priority: 0.87,
    changeFrequency: 'monthly',
    ctaLabel: 'Take the Choleric Test',
    blocks: [
      {
        type: 'section',
        title: 'What a Choleric test should check',
        body: [
          'A Choleric test should look beyond confidence or ambition. The deeper signal is how you respond when something needs direction, pressure rises, or progress stalls.',
          'Choleric patterns tend to move toward action, control, efficiency, and challenge. That can become powerful leadership, but it can also become impatience when others need more time.',
        ],
      },
      {
        type: 'grid',
        title: 'Signs you may be Choleric',
        items: [
          { title: 'You decide quickly', body: 'You would rather make a call and adjust than stay stuck in endless discussion.', accent: 'red' },
          { title: 'You notice inefficiency', body: 'Slow systems, vague ownership, and avoidant leadership bother you quickly.', accent: 'gold' },
          { title: 'You protect progress', body: 'Under stress, you push for momentum and can become more forceful.', accent: 'purple' },
          { title: 'You respect competence', body: 'You trust people who show clarity, skill, and follow-through.', accent: 'blue' },
        ],
      },
      {
        type: 'callout',
        title: 'Why the full quiz matters',
        body: 'Many Choleric traits overlap with Sanguine energy or Melancholic standards. A full temperament test compares all four patterns so you can see whether Choleric is primary, secondary, or just a learned role.',
        bullets: ['Compare your top two scores.', 'Check whether drive or connection leads.', 'Notice what happens under stress.', 'Read your subtype before locking in a label.'],
      },
    ],
    faq: [
      { question: 'How do I know if I am Choleric?', answer: 'You may be Choleric if you naturally take charge, move quickly toward goals, dislike delays, and become more controlling or forceful under stress.' },
      { question: 'Is Choleric the same as being bossy?', answer: 'No. Choleric describes drive, decisiveness, and action orientation. It can become bossy when immature, but mature Choleric energy can be protective, focused, and effective.' },
      { question: 'Can Choleric be my secondary temperament?', answer: 'Yes. A strong Choleric secondary can make another primary type more direct, ambitious, or decisive.' },
    ],
  },
  {
    slug: 'sanguine-test',
    shortTitle: 'Sanguine Test',
    title: 'Sanguine Test: Are You the Social, Expressive Type?',
    description: 'Take a Sanguine test to see whether your strongest temperament pattern is expressive, optimistic, people-focused, and energized by connection.',
    keywords: ['sanguine test', 'am I sanguine', 'sanguine temperament test', 'sanguine personality test', 'sanguine quiz'],
    eyebrow: 'Bard Pattern Check',
    icon: MessageCircle,
    accent: 'gold',
    priority: 0.87,
    changeFrequency: 'monthly',
    ctaLabel: 'Take the Sanguine Test',
    blocks: [
      {
        type: 'section',
        title: 'What a Sanguine test should check',
        body: [
          'A Sanguine test should not only ask whether you are outgoing. It should look at what gives you energy, how quickly your attention moves, and how much connection matters to your sense of aliveness.',
          'Sanguine patterns tend to move toward people, humor, novelty, storytelling, and shared momentum. At their best, they bring warmth and courage into the room.',
        ],
      },
      {
        type: 'grid',
        title: 'Signs you may be Sanguine',
        items: [
          { title: 'You gain energy from people', body: 'Conversation, shared experience, and spontaneous connection wake you up.', accent: 'gold' },
          { title: 'You move with enthusiasm', body: 'You can start quickly when something feels exciting or alive.', accent: 'red' },
          { title: 'You tell stories naturally', body: 'You often process life by talking, joking, performing, or making meaning socially.', accent: 'pink' },
          { title: 'You resist dull routine', body: 'Too much sameness can make you restless, scattered, or checked out.', accent: 'green' },
        ],
      },
      {
        type: 'callout',
        title: 'Why the full quiz matters',
        body: 'Sanguine can be confused with Choleric because both can be energetic, or with Phlegmatic because both can be agreeable. The full FourType quiz compares what actually leads your behavior.',
        bullets: ['Look for people-first versus task-first energy.', 'Compare enthusiasm with follow-through.', 'Watch what drains you fastest.', 'Use score spread to identify blends.'],
      },
    ],
    faq: [
      { question: 'How do I know if I am Sanguine?', answer: 'You may be Sanguine if you are energized by people, novelty, humor, storytelling, and shared experiences, especially when life feels too dull or isolated.' },
      { question: 'Can introverts be Sanguine?', answer: 'Some people with Sanguine influence are not constantly social, but the pattern usually still shows through expressiveness, warmth, spontaneity, or a strong need for meaningful connection.' },
      { question: 'What is the difference between Sanguine and Choleric?', answer: 'Sanguine is usually people-first and energy-seeking, while Choleric is task-first and goal-seeking. Both can be active, but they protect different things under stress.' },
    ],
  },
  {
    slug: 'melancholic-test',
    shortTitle: 'Melancholic Test',
    title: 'Melancholic Test: Are You the Deep, Analytical Type?',
    description: 'Take a Melancholic test to see whether your strongest temperament pattern is thoughtful, precise, meaning-focused, and driven by quality.',
    keywords: ['melancholic test', 'am I melancholic', 'melancholic temperament test', 'melancholic personality test', 'melancholic quiz'],
    eyebrow: 'Strategist Pattern Check',
    icon: Search,
    accent: 'blue',
    priority: 0.87,
    changeFrequency: 'monthly',
    ctaLabel: 'Take the Melancholic Test',
    blocks: [
      {
        type: 'section',
        title: 'What a Melancholic test should check',
        body: [
          'A Melancholic test should not reduce the type to sadness. In temperament language, Melancholic points to depth, analysis, sensitivity, meaning, and high standards.',
          'Melancholic patterns tend to protect accuracy and quality. They often notice what others miss, think several steps ahead, and feel uneasy when things seem shallow or careless.',
        ],
      },
      {
        type: 'grid',
        title: 'Signs you may be Melancholic',
        items: [
          { title: 'You notice details', body: 'You catch inconsistencies, missing context, and quality issues quickly.', accent: 'blue' },
          { title: 'You need meaning', body: 'A task feels easier when you understand why it matters.', accent: 'purple' },
          { title: 'You think deeply', body: 'You process internally and may revisit conversations long after they happen.', accent: 'gold' },
          { title: 'You protect standards', body: 'Under stress, you may become critical, anxious, or perfectionistic.', accent: 'red' },
        ],
      },
      {
        type: 'callout',
        title: 'Why the full quiz matters',
        body: 'Melancholic can be confused with Phlegmatic because both may be quiet, or with Choleric because both can have high standards. A full temperament test separates depth, drive, peace, and connection.',
        bullets: ['Compare internal intensity with outward calm.', 'Notice whether quality or control leads.', 'Look at stress response.', 'Check whether Melancholic is primary or secondary.'],
      },
    ],
    faq: [
      { question: 'How do I know if I am Melancholic?', answer: 'You may be Melancholic if you naturally think deeply, notice details, care about meaning and quality, and become anxious or critical when things feel careless.' },
      { question: 'Does Melancholic mean depressed?', answer: 'No. In temperament language, Melancholic does not mean clinically depressed. It describes depth, sensitivity, analysis, and high standards.' },
      { question: 'Can Melancholic be mixed with another temperament?', answer: 'Yes. Melancholic can appear as a primary type or as a secondary influence that adds depth, precision, or sensitivity to another temperament.' },
    ],
  },
  {
    slug: 'phlegmatic-test',
    shortTitle: 'Phlegmatic Test',
    title: 'Phlegmatic Test: Are You the Calm, Steady Type?',
    description: 'Take a Phlegmatic test to see whether your strongest temperament pattern is calm, loyal, peace-seeking, supportive, and steady under pressure.',
    keywords: ['phlegmatic test', 'am I phlegmatic', 'phlegmatic temperament test', 'phlegmatic personality test', 'phlegmatic quiz'],
    eyebrow: 'Guardian Pattern Check',
    icon: Users,
    accent: 'green',
    priority: 0.87,
    changeFrequency: 'monthly',
    ctaLabel: 'Take the Phlegmatic Test',
    blocks: [
      {
        type: 'section',
        title: 'What a Phlegmatic test should check',
        body: [
          'A Phlegmatic test should look at your relationship to peace, steadiness, pressure, loyalty, and conflict. The pattern is quieter than the others, but it is not weak.',
          'Phlegmatic patterns tend to protect trust and stability. They often stabilize groups, listen patiently, and keep relationships from becoming unnecessarily tense.',
        ],
      },
      {
        type: 'grid',
        title: 'Signs you may be Phlegmatic',
        items: [
          { title: 'You protect peace', body: 'You notice tension quickly and often try to lower the emotional temperature.', accent: 'green' },
          { title: 'You are steady', body: 'People may rely on your consistency, patience, and calm presence.', accent: 'blue' },
          { title: 'You dislike pressure', body: 'Forceful demands can make you withdraw, delay, or become quietly stubborn.', accent: 'purple' },
          { title: 'You value loyalty', body: 'Trust, familiarity, and dependable relationships matter deeply to you.', accent: 'gold' },
        ],
      },
      {
        type: 'callout',
        title: 'Why the full quiz matters',
        body: 'Phlegmatic can be confused with Melancholic because both may be reserved, or with Sanguine because both can be agreeable. The full quiz shows whether peace, meaning, connection, or action leads.',
        bullets: ['Watch whether calm or depth leads.', 'Notice conflict response.', 'Compare loyalty with social energy.', 'Use subtype guidance if your scores are close.'],
      },
    ],
    faq: [
      { question: 'How do I know if I am Phlegmatic?', answer: 'You may be Phlegmatic if you naturally seek peace, value loyalty, avoid unnecessary conflict, and stay steady when others become intense.' },
      { question: 'Are Phlegmatic people lazy?', answer: 'No. Phlegmatic people are often steady and reliable. They may simply need clear motivation, trust, and a calm environment before taking initiative.' },
      { question: 'What is the difference between Phlegmatic and Melancholic?', answer: 'Both can be quiet, but Phlegmatic tends to protect peace and stability, while Melancholic tends to protect meaning, accuracy, and quality.' },
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
    slug: 'four-temperaments-test',
    shortTitle: 'Four Temperaments Test',
    title: 'Four Temperaments Test: Free Choleric, Sanguine, Melancholic, Phlegmatic Quiz',
    description: 'Take a free Four Temperaments test to compare Choleric, Sanguine, Melancholic, and Phlegmatic patterns with subtype guidance.',
    keywords: ['four temperaments test', 'four temperament test', 'free four temperaments test', 'four temperaments quiz', 'choleric sanguine melancholic phlegmatic test', 'temperament test four types'],
    eyebrow: 'Free Four Temperaments Quiz',
    icon: BarChart3,
    accent: 'gold',
    priority: 0.91,
    changeFrequency: 'weekly',
    ctaLabel: 'Take the Free Four Temperaments Test',
    blocks: [
      {
        type: 'section',
        title: 'Take the free Four Temperaments test',
        body: [
          'A Four Temperaments test compares the four classic personality patterns: Choleric, Sanguine, Melancholic, and Phlegmatic. The free FourType quiz uses 40 behavior-based questions to show your strongest pattern and possible subtype.',
          'Instead of asking which label sounds flattering, FourType looks at repeated behavior: whether you tend to lead, connect, analyze, or stabilize first under ordinary pressure.',
        ],
      },
      {
        type: 'grid',
        title: 'Choleric, Sanguine, Melancholic, and Phlegmatic results',
        intro: 'Use these short cues before taking the quiz, then let your full score show the strongest pattern and possible subtype.',
        items: [
          { title: 'Choleric', body: 'Direct, decisive, goal-driven, and energized by challenge or responsibility.', accent: 'red' },
          { title: 'Sanguine', body: 'Expressive, spontaneous, people-oriented, and energized by connection.', accent: 'gold' },
          { title: 'Melancholic', body: 'Reflective, careful, idealistic, and sensitive to quality or meaning.', accent: 'blue' },
          { title: 'Phlegmatic', body: 'Calm, loyal, steady, and motivated by peace, trust, and stability.', accent: 'green' },
        ],
      },
      {
        type: 'callout',
        title: 'What makes this Four Temperaments quiz useful',
        body: 'The best Four Temperaments test should be free to start, behavior-based, clear about its limits, and useful after the result page. FourType is built around score spread and subtype guidance because many people are not a pure single temperament.',
        bullets: ['Primary temperament shows your default drive.', 'Secondary temperament changes your style.', 'Close scores need careful interpretation.', 'Results should explain real behavior, not just flatter you.'],
      },
      {
        type: 'section',
        title: 'How to use your test result',
        body: [
          'After you get your result, read it through everyday situations: work pace, conflict style, social energy, emotional processing, and what makes you shut down.',
          'The goal is not to box yourself in. It is to notice your first move so you can choose your next move with more awareness.',
        ],
      },
    ],
    faq: [
      { question: 'Is this Four Temperaments test free?', answer: 'Yes. The core FourType Four Temperaments test is free and gives you a primary pattern, score spread, and subtype direction without requiring a signup.' },
      { question: 'What are the four temperaments?', answer: 'The four temperaments are Choleric, Sanguine, Melancholic, and Phlegmatic. They describe broad patterns of drive, sociability, depth, steadiness, communication, and stress response.' },
      { question: 'How long does the Four Temperaments quiz take?', answer: 'The FourType quiz has 40 questions and usually takes under 10 minutes. Answer from your repeated behavior, especially under ordinary pressure, for the clearest result.' },
      { question: 'Is Four Temperaments the same as the 4 temperament test?', answer: 'Yes. People use both terms for the same basic model: four classic temperament patterns that describe motivation, relationships, decisions, and stress response.' },
      { question: 'Can I have two Four Temperaments?', answer: 'Yes. Many people have a clear primary temperament and a strong secondary temperament, which creates a more specific subtype pattern.' },
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
    description: 'Compare the OSPP four temperaments test with FourType, including quiz length, scoring style, result depth, subtype guidance, and how to choose the right temperament test.',
    keywords: ['OSPP four temperaments test', 'OSPP temperament test', 'Open Four Temperaments Scales', 'O4TS test', 'four temperaments test comparison', 'best four temperaments test', 'temperament quiz comparison'],
    category: 'Comparison',
    readTime: '8 min',
    accent: 'blue',
    icon: Scale,
    image: '/images/blog/ospp-four-temperaments-test-v2.jpg',
    imageAlt: 'Four temperament archetypes comparing two assessment scrolls for OSPP and FourType temperament tests',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'Why people search for OSPP',
        body: [
          'People usually search for the OSPP four temperaments test when they want a simple, familiar quiz for Choleric, Sanguine, Melancholic, and Phlegmatic patterns. The Open Four Temperaments Scales, often shortened to O4TS, is known as a quick open-source style measure rather than a long personality report.',
          'That intent is good: the user wants a lightweight temperament answer without learning a complicated personality framework first. The better question is which test helps you understand your pattern clearly enough to use it in work, stress, relationships, and growth.',
        ],
      },
      {
        type: 'grid',
        title: 'How to compare temperament tests',
        intro: 'Use these signals whether you take OSPP, FourType, or another four temperaments quiz.',
        items: [
          { title: 'Question design', body: 'Look for behavior-based questions rather than flattering identity labels.', accent: 'green' },
          { title: 'Result depth', body: 'A useful result should explain your top scores and not only assign a single label.', accent: 'blue' },
          { title: 'Subtype nuance', body: 'Many people are blends, so secondary temperament interpretation matters.', accent: 'gold' },
          { title: 'Responsible limits', body: 'A trustworthy quiz avoids clinical claims and permanent labels.', accent: 'purple' },
        ],
      },
      {
        type: 'grid',
        title: 'OSPP vs FourType at a glance',
        intro: 'The right choice depends on whether you want a quick reference result or a guided temperament journey.',
        items: [
          { title: 'OSPP/O4TS: quick signal', body: 'Useful when you want a short four temperaments check and a simple result to compare with other quizzes.', accent: 'blue' },
          { title: 'FourType: guided result', body: 'Built for a fuller path: quiz, score spread, subtype direction, type pages, and practical next steps.', accent: 'gold' },
          { title: 'OSPP/O4TS: minimal framing', body: 'Best for people comfortable interpreting a compact result without much hand-holding.', accent: 'green' },
          { title: 'FourType: learning ecosystem', body: 'Best for people who want to keep exploring temperament in relationships, work, stress, and growth.', accent: 'purple' },
        ],
      },
      {
        type: 'section',
        title: 'What FourType adds after the quiz',
        body: [
          'FourType is designed for the moment after the label, when you ask: “What does this mean for how I actually live?” The quiz result connects to subtype pages, methodology notes, comparison guides, and type-specific temperament test pages.',
          'That matters because many people are not pure Choleric, Sanguine, Melancholic, or Phlegmatic. A Choleric-Sanguine blend and a Choleric-Melancholic blend can both be driven, but the social energy, standards, and stress pattern feel different. FourType makes that second layer easier to explore.',
        ],
      },
      {
        type: 'section',
        title: 'Where FourType is different',
        body: [
          'FourType is built around a modern temperament journey: a free 40-question quiz, clear score interpretation, subtype guidance, and practical education pages for the major temperament search intents.',
          'The goal is not to “beat” another quiz by sounding more certain. The goal is to make your result more useful. FourType treats temperament as a practical mirror rather than a diagnosis, and it gives you places to keep learning once you know your likely pattern.',
        ],
      },
      {
        type: 'callout',
        title: 'Which one should you take?',
        body: 'If you want a fast temperament label, many tests can be interesting. If you want a result you can keep exploring through subtype pages, relationship guidance, and methodology notes, start with FourType.',
        bullets: ['Take OSPP/O4TS when you want a compact reference point.', 'Take FourType when you want score spread and subtype direction.', 'Compare your top two scores when results feel mixed.', 'Read methodology before treating any result as truth.', 'Use your result to improve behavior, not to label yourself forever.'],
      },
    ],
    related: [
      { href: '/four-temperaments-test', title: 'Four Temperaments Test', description: 'Start with the core Choleric, Sanguine, Melancholic, and Phlegmatic guide.' },
      { href: '/blog/best-free-four-temperaments-test', title: 'Best Free Four Temperaments Test', description: 'See what makes a free quiz worth taking.' },
      { href: '/methodology', title: 'FourType Methodology', description: 'How FourType scores and interprets results.' },
      { href: '/blog/temperament-test-accuracy', title: 'Temperament Test Accuracy', description: 'How to judge reliability in temperament quizzes.' },
    ],
    faq: [
      { question: 'What is the OSPP four temperaments test?', answer: 'The OSPP four temperaments test usually refers to the Open Four Temperaments Scales, a short open-source style temperament measure for Choleric, Sanguine, Melancholic, and Phlegmatic patterns.' },
      { question: 'How is FourType different from OSPP?', answer: 'FourType focuses on a polished quiz journey, practical result interpretation, score spread, subtype guidance, and educational pages that explain how to use temperament responsibly.' },
      { question: 'Is OSPP or FourType more detailed?', answer: 'OSPP/O4TS is useful as a compact temperament check. FourType is more detailed after the result because it connects your score spread to subtype guidance, methodology, and practical type guides.' },
      { question: 'Should I take OSPP or FourType?', answer: 'If you want a practical free temperament quiz with subtype direction and follow-up guides, FourType is a strong place to start. You can still compare results from multiple tests as hypotheses, not final labels.' },
    ],
  },
  {
    slug: 'four-humors-test',
    title: 'Four Humors Test vs Four Temperaments Test: From Ancient Theory to Modern Quiz',
    shortTitle: 'Four Humors Test vs Temperament Test',
    description: 'Learn how the ancient four humors connect to the modern four temperaments test, what a four humors personality quiz can and cannot tell you, and how to use the model responsibly.',
    keywords: ['four humors test', 'four humors personality test', 'four temperaments test', 'Hippocrates temperament test', 'humors temperament', 'four humors quiz', 'Galen temperament test'],
    category: 'History',
    readTime: '9 min',
    accent: 'gold',
    icon: BookOpen,
    image: '/images/blog/four-humors-test-v2.jpg',
    imageAlt: 'Ancient four humors symbols transforming into four modern temperament archetypes',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'The four humors are the origin story, not the science',
        body: [
          'The ancient four humors theory connected personality and health to bodily fluids: blood, yellow bile, black bile, and phlegm. That medical explanation is outdated, and a modern four humors test should never treat it as literal health science.',
          'But the behavioral language that survived from that tradition became the four temperaments: Sanguine, Choleric, Melancholic, and Phlegmatic. FourType keeps the useful pattern language while avoiding outdated medical claims.',
        ],
      },
      {
        type: 'grid',
        title: 'From humors to temperaments',
        intro: 'The old medical theory is not the point. The useful modern version is the personality pattern each symbol eventually came to describe.',
        items: [
          { title: 'Blood -> Sanguine', body: 'Social, lively, expressive, novelty-seeking, and connection-oriented.', accent: 'gold' },
          { title: 'Yellow bile -> Choleric', body: 'Direct, forceful, decisive, ambitious, and action-oriented.', accent: 'red' },
          { title: 'Black bile -> Melancholic', body: 'Reflective, analytical, standards-driven, sensitive, and depth-oriented.', accent: 'blue' },
          { title: 'Phlegm -> Phlegmatic', body: 'Calm, loyal, steady, diplomatic, and peace-oriented.', accent: 'green' },
        ],
      },
      {
        type: 'grid',
        title: 'Ancient humors vs modern temperament tests',
        intro: 'A search for “four humors test” usually mixes history curiosity with a modern personality-test goal. These are related, but they are not the same thing.',
        items: [
          { title: 'Four humors', body: 'A historical medical framework used to explain health, mood, and personality in ancient and medieval thought.', accent: 'purple' },
          { title: 'Four temperaments', body: 'The personality-language descendant: Choleric, Sanguine, Melancholic, and Phlegmatic patterns.', accent: 'gold' },
          { title: 'Modern quiz use', body: 'A self-reflection tool for behavior, stress response, relationships, communication, and growth.', accent: 'green' },
          { title: 'Responsible limit', body: 'Not a diagnosis, not medical advice, and not a fixed identity you are stuck with forever.', accent: 'blue' },
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
        type: 'section',
        title: 'When a four humors quiz becomes useful',
        body: [
          'A four humors quiz becomes useful when it translates the old symbols into observable behavior. Instead of asking which fluid defines you, it should ask how you move under pressure, what drains your energy, how you handle conflict, and what kind of growth practice helps you mature.',
          'That is the bridge FourType is trying to build: honor the old vocabulary, remove the outdated medical claims, and give you a modern temperament result you can actually use.',
        ],
      },
      {
        type: 'callout',
        title: 'Should you search for a four humors test or a temperament test?',
        body: 'If you are curious about history, “four humors” is the right phrase. If you want a practical result you can use today, “four temperaments test” or “temperament test” is usually the better search.',
        bullets: ['Use Four Humors for history.', 'Use Four Temperaments for personality patterns.', 'Use FourType for a modern quiz and subtype interpretation.', 'Use methodology pages to understand scoring before treating a result as truth.'],
      },
    ],
    related: [
      { href: '/four-temperaments-test', title: 'Four Temperaments Test', description: 'Take the modern Choleric, Sanguine, Melancholic, and Phlegmatic quiz path.' },
      { href: '/blog/choleric-sanguine-melancholic-phlegmatic', title: 'Choleric, Sanguine, Melancholic, Phlegmatic', description: 'A practical guide to telling the four patterns apart.' },
      { href: '/four-temperaments', title: 'The Four Temperaments', description: 'A clear modern explanation of the four types.' },
      { href: '/methodology', title: 'FourType Methodology', description: 'How the modern FourType quiz is scored and interpreted.' },
    ],
    faq: [
      { question: 'What is a four humors test?', answer: 'A four humors test refers to the ancient idea that personality patterns were linked to blood, yellow bile, black bile, and phlegm. Modern temperament tests use the behavioral patterns without treating the old medical theory as literal science.' },
      { question: 'Are the four humors and four temperaments the same?', answer: 'They are historically connected but not identical. The four humors are the ancient medical origin story; the four temperaments are the personality pattern language that survived from that tradition.' },
      { question: 'What are the four humors personality types?', answer: 'The historical mapping is usually blood with Sanguine, yellow bile with Choleric, black bile with Melancholic, and phlegm with Phlegmatic. Modern temperament tests use these as personality patterns, not medical categories.' },
      { question: 'Does FourType believe the four humors are medically true?', answer: 'No. FourType uses the four temperaments as a self-reflection framework and does not make medical or clinical claims based on the ancient four humors theory.' },
    ],
  },
  {
    slug: 'best-free-four-temperaments-test',
    title: 'Best Free Four Temperaments Test: How to Choose a Useful Quiz',
    shortTitle: 'Best Free Four Temperaments Test',
    description: 'Compare what makes a free four temperaments test useful, including question quality, score spread, subtype interpretation, privacy, and practical next steps.',
    keywords: ['best free four temperaments test', '4 temperaments test free', 'free four temperaments test', 'free temperament test online', 'temperament test free', 'four temperament test free', 'free choleric sanguine melancholic phlegmatic test'],
    category: 'Guides',
    readTime: '8 min',
    accent: 'green',
    icon: CheckCircle2,
    image: '/images/blog/best-free-four-temperaments-test-v2.jpg',
    imageAlt: 'Four temperament archetypes gathered around a glowing quiz table for choosing the best free temperament test',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'Free does not have to mean shallow',
        body: [
          'A free four temperaments test can still be useful if it asks grounded questions, explains the result clearly, and gives you next steps beyond a label. The best free quizzes help you compare Choleric, Sanguine, Melancholic, and Phlegmatic patterns without turning the result into a diagnosis.',
          'The problem with many free quizzes is not that they are free. It is that they stop at a fun result, hide the useful interpretation behind a paywall, or never explain what your second-highest score means.',
        ],
      },
      {
        type: 'grid',
        title: 'What the best free tests include',
        intro: 'Use this checklist before trusting any four temperaments quiz, including ours.',
        items: [
          { title: 'Clear four-type scoring', body: 'You should see how Choleric, Sanguine, Melancholic, and Phlegmatic patterns are being weighed.', accent: 'gold' },
          { title: 'Score spread', body: 'Close results need nuance. A dominant score and a tie should not be interpreted the same way.', accent: 'blue' },
          { title: 'Subtype guidance', body: 'Blends explain why two people with the same primary temperament can feel very different.', accent: 'green' },
          { title: 'Responsible wording', body: 'Avoid tests that make clinical, destiny, or employment-screening claims.', accent: 'purple' },
        ],
      },
      {
        type: 'grid',
        title: 'Free test comparison signals',
        intro: 'When search results all promise a quick personality answer, these details separate a useful temperament test from a thin quiz.',
        items: [
          { title: 'Instant result', body: 'You should not have to create an account before seeing your basic temperament pattern.', accent: 'green' },
          { title: 'Practical explanations', body: 'A strong result connects the type to stress, communication, relationships, and growth.', accent: 'gold' },
          { title: 'Privacy-friendly flow', body: 'The core quiz should work without asking for sensitive personal information.', accent: 'blue' },
          { title: 'Educational follow-up', body: 'A good site should let you keep learning through type pages, methodology, and comparison guides.', accent: 'purple' },
        ],
      },
      {
        type: 'section',
        title: 'Why searchers often compare several tests',
        body: [
          'People searching for a free four temperament test are usually doing one of three things: checking whether they are Choleric, Sanguine, Melancholic, or Phlegmatic; comparing a result they already received somewhere else; or looking for a clearer explanation than a short quiz result gave them.',
          'That is why a single label is rarely enough. If your two highest scores are close, a subtype page may explain the result better than a pure temperament description. If your result surprises you, the methodology page should help you understand how the test is reading your answers.',
        ],
      },
      {
        type: 'section',
        title: 'Why FourType is free',
        body: [
          'FourType keeps the core quiz free because temperament is most useful when people can compare results with friends, partners, teams, and family members. A basic temperament result should be easy to access, especially when the goal is self-reflection rather than clinical assessment.',
          'The free result is designed to be enough to start: primary temperament, subtype direction, score spread, and pages that explain the pattern. Deeper reports can add nuance later, but the basic self-understanding should not be locked away.',
        ],
      },
      {
        type: 'callout',
        title: 'Take the free test well',
        body: 'Answer as your default self, especially under stress. Do not answer as your ideal self, your work persona, or the version of you that sounds most impressive.',
        bullets: ['Move quickly through questions.', 'Think about repeated behavior, not one-off moments.', 'Compare the top two scores.', 'Read the subtype if your result feels mixed.', 'Use the result as a mirror, not a permanent label.'],
      },
    ],
    related: [
      { href: '/free-temperament-test', title: 'Free Temperament Test', description: 'Start the FourType quiz without signup or payment.' },
      { href: '/four-temperaments-test', title: 'Four Temperaments Test', description: 'Compare Choleric, Sanguine, Melancholic, and Phlegmatic patterns.' },
      { href: '/methodology', title: 'FourType Methodology', description: 'See how the quiz is scored and interpreted.' },
      { href: '/blog/temperament-test-accuracy', title: 'Temperament Test Accuracy', description: 'Learn how to judge a test result responsibly.' },
    ],
    faq: [
      { question: 'What is the best free four temperaments test?', answer: 'The best free four temperaments test should ask behavior-based questions, show your score spread, explain your likely subtype, and avoid clinical or destiny-style claims.' },
      { question: 'Is FourType a free four temperaments test?', answer: 'Yes. FourType’s core 40-question temperament test is free and gives you a useful result without requiring payment for the basic interpretation.' },
      { question: 'What does a free four temperament test measure?', answer: 'A free four temperament test usually compares Choleric, Sanguine, Melancholic, and Phlegmatic patterns through behavior, motivation, stress response, communication, and relationship style.' },
      { question: 'How do I get the most accurate free temperament result?', answer: 'Answer based on your repeated default behavior, especially under stress. Avoid answering as your ideal self or as the role you play at work.' },
    ],
  },
  {
    slug: '4-temperaments-test-free',
    title: '4 Temperaments Test Free: Find Your Choleric, Sanguine, Melancholic, or Phlegmatic Type',
    shortTitle: '4 Temperaments Test Free',
    description: 'Take a free 4 temperaments test and learn how to read your Choleric, Sanguine, Melancholic, and Phlegmatic score spread without over-labeling yourself.',
    keywords: ['4 temperaments test free', 'four temperaments test free', 'free 4 temperament test', 'free four temperament quiz', 'choleric sanguine melancholic phlegmatic test free', 'temperament test free online', 'what are my 4 temperaments'],
    category: 'Guides',
    readTime: '8 min',
    accent: 'gold',
    icon: Search,
    image: '/images/blog/4-temperaments-test-free.jpg',
    imageAlt: 'Four temperament archetypes gathered around a luminous free quiz scroll for a 4 temperaments test',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'What a free 4 temperaments test should tell you',
        body: [
          'A good free 4 temperaments test should do more than hand you one dramatic label. It should compare the four classic patterns: Choleric, Sanguine, Melancholic, and Phlegmatic, then help you understand which pattern is strongest and which one may be close behind.',
          'That second part matters. Many people are blends. You might lead with Choleric drive but carry Sanguine warmth, or show Melancholic depth with Phlegmatic steadiness. A useful free result makes that score spread easier to read.',
        ],
      },
      {
        type: 'grid',
        title: 'The four patterns at a glance',
        intro: 'Use these descriptions as a quick orientation before taking the quiz. Real people can show more than one pattern.',
        items: [
          { title: 'Choleric', body: 'Direct, decisive, challenge-oriented, and motivated by progress, control, and action.', accent: 'red' },
          { title: 'Sanguine', body: 'Expressive, energetic, people-oriented, and motivated by connection, variety, and enthusiasm.', accent: 'gold' },
          { title: 'Melancholic', body: 'Reflective, analytical, careful, and motivated by depth, quality, meaning, and accuracy.', accent: 'blue' },
          { title: 'Phlegmatic', body: 'Calm, loyal, diplomatic, and motivated by peace, steadiness, support, and low-friction harmony.', accent: 'green' },
        ],
      },
      {
        type: 'section',
        title: 'Why free tests can still be useful',
        body: [
          'Free personality quizzes sometimes feel lightweight because they hide the serious interpretation or use vague questions that flatter everyone. The FourType approach is different: the free quiz is meant to give you a practical starting point, not a locked teaser.',
          'The result is most useful when you treat it as a mirror. Look at your default behavior under stress, conflict, decision-making, and relationships. If the result feels close but not exact, your subtype may explain the missing nuance.',
        ],
      },
      {
        type: 'grid',
        title: 'How to take the quiz well',
        intro: 'The quality of a temperament result depends partly on the questions and partly on how honestly you answer them.',
        items: [
          { title: 'Answer your default self', body: 'Choose what you usually do, not what sounds mature, impressive, or ideal.', accent: 'green' },
          { title: 'Think under pressure', body: 'Temperament shows clearly when plans fail, people disagree, or energy runs low.', accent: 'red' },
          { title: 'Watch close scores', body: 'A narrow gap between your top two scores often points toward a blended subtype.', accent: 'blue' },
          { title: 'Avoid permanent labels', body: 'Use the result to notice patterns and grow, not to excuse behavior or box yourself in.', accent: 'purple' },
        ],
      },
      {
        type: 'section',
        title: 'What happens after the free result',
        body: [
          'After you take the FourType quiz, you can explore your main temperament, compare your secondary score, and read subtype guides that explain blended patterns. That follow-up is where the four temperaments become more practical than a simple label.',
          'For example, a Sanguine-Choleric result and a Sanguine-Phlegmatic result can both be social, but one may push harder toward action while the other protects ease and relational comfort. The free result points you toward that difference.',
        ],
      },
      {
        type: 'callout',
        title: 'Start with the free quiz, then read the pattern',
        body: 'The best path is simple: take the quiz, look at your top two scores, read your main temperament, then check whether a subtype explains the parts that feel mixed.',
        bullets: ['Take the 40-question FourType quiz.', 'Compare all four scores, not only the winner.', 'Read the matching temperament guide.', 'Check the subtype if your top scores are close.', 'Use the result as a growth tool, not a fixed identity.'],
      },
    ],
    related: [
      { href: '/quiz', title: 'Take the Free Quiz', description: 'Start the 40-question FourType temperament test.' },
      { href: '/4-temperament-test', title: '4 Temperament Test', description: 'Compare the classic four-type model in more detail.' },
      { href: '/blog/best-free-four-temperaments-test', title: 'Best Free Four Temperaments Test', description: 'Learn what separates a useful free quiz from a thin one.' },
      { href: '/subtypes', title: 'Temperament Subtypes', description: 'Explore blended Choleric, Sanguine, Melancholic, and Phlegmatic patterns.' },
    ],
    faq: [
      { question: 'Is there a free 4 temperaments test?', answer: 'Yes. FourType offers a free 4 temperaments test that compares Choleric, Sanguine, Melancholic, and Phlegmatic patterns and gives you a practical result without requiring payment for the basic interpretation.' },
      { question: 'What are the 4 temperaments?', answer: 'The four temperaments are Choleric, Sanguine, Melancholic, and Phlegmatic. They describe broad behavior patterns around action, connection, depth, and steadiness.' },
      { question: 'How many questions are in the FourType test?', answer: 'The FourType quiz uses 40 questions to compare the four temperament patterns and help identify your likely primary temperament and subtype direction.' },
      { question: 'Can I be a mix of two temperaments?', answer: 'Yes. Many people show a primary temperament with a strong secondary pattern. FourType uses subtype pages to explain common blends such as Choleric-Sanguine, Melancholic-Phlegmatic, and others.' },
    ],
  },
  {
    slug: 'temperament-test-questions',
    title: 'Temperament Test Questions: What a Good Four Temperaments Quiz Should Ask',
    shortTitle: 'Temperament Test Questions',
    description: 'See what useful temperament test questions look like, why behavior-based prompts matter, and how FourType compares Choleric, Sanguine, Melancholic, and Phlegmatic patterns.',
    keywords: ['temperament test questions', 'four temperaments test questions', '4 temperament test questions', 'personality temperament test questions', 'choleric sanguine melancholic phlegmatic questions', 'temperament quiz questions', 'free temperament test questions'],
    category: 'Methodology',
    readTime: '9 min',
    accent: 'blue',
    icon: HelpCircle,
    image: '/images/blog/temperament-test-questions.jpg',
    imageAlt: 'Four temperament archetypes studying a luminous questionnaire for temperament test questions',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'Good questions ask about behavior, not labels',
        body: [
          'The best temperament test questions do not ask whether you are “a leader,” “creative,” “deep,” or “peaceful” in a way that makes every answer sound flattering. They ask how you usually behave when decisions, conflict, pressure, boredom, and relationships reveal your default pattern.',
          'That is important because Choleric, Sanguine, Melancholic, and Phlegmatic temperaments are easier to see through repeated behavior than through identity words. A useful quiz should make you recognize your habits, not simply choose the type you wish you were.',
        ],
      },
      {
        type: 'grid',
        title: 'What each temperament question is trying to reveal',
        intro: 'A balanced four temperaments quiz needs prompts that give every pattern a fair chance to show up.',
        items: [
          { title: 'Choleric questions', body: 'Look for decisiveness, challenge response, impatience with delay, direct communication, and action under pressure.', accent: 'red' },
          { title: 'Sanguine questions', body: 'Look for expressiveness, social energy, novelty seeking, optimism, enthusiasm, and attention to connection.', accent: 'gold' },
          { title: 'Melancholic questions', body: 'Look for analysis, carefulness, standards, emotional depth, private processing, and sensitivity to quality.', accent: 'blue' },
          { title: 'Phlegmatic questions', body: 'Look for calm, loyalty, mediation, steadiness, conflict avoidance, and preference for low-friction harmony.', accent: 'green' },
        ],
      },
      {
        type: 'section',
        title: 'Why obvious questions can distort the result',
        body: [
          'Some quiz questions make the “right” answer too obvious. If a prompt says, “Do you like being the boss?” many people answer based on confidence, culture, role, or aspiration rather than temperament. The result can become a self-image test instead of a behavior test.',
          'FourType questions are meant to compare tendencies across situations. The pattern is stronger when several answers point in the same direction: how you initiate, how you respond to friction, what drains you, what energizes you, and what you naturally protect.',
        ],
      },
      {
        type: 'grid',
        title: 'Signals of a better temperament quiz',
        intro: 'Use this checklist when judging any four temperaments test or set of temperament questions.',
        items: [
          { title: 'It balances all four types', body: 'The test should not over-favor loud leadership, social charm, intellectual depth, or calm agreeableness.', accent: 'purple' },
          { title: 'It asks across contexts', body: 'Work, stress, conflict, friendship, routines, and decision-making should all contribute clues.', accent: 'blue' },
          { title: 'It allows mixed results', body: 'Close scores should lead to subtype interpretation rather than forcing a pure label.', accent: 'green' },
          { title: 'It avoids clinical claims', body: 'Temperament questions are for reflection and personality education, not diagnosis or treatment.', accent: 'gold' },
        ],
      },
      {
        type: 'section',
        title: 'Example topics a temperament test should cover',
        body: [
          'Useful temperament questions usually cover decision speed, social appetite, planning style, emotional processing, conflict behavior, work rhythm, stress response, and recovery needs. These topics help separate what you enjoy from what you reliably do.',
          'For example, a Sanguine and a Choleric may both look energetic, but the Sanguine pattern often seeks connection and variety while the Choleric pattern pushes toward action and control. A good question set notices that difference.',
        ],
      },
      {
        type: 'section',
        title: 'How to answer temperament test questions accurately',
        body: [
          'Answer from your repeated default, especially when you are tired, rushed, or emotionally pressed. Do not answer from your job title, your ideal self, or one unusual season of life.',
          'If two answers feel true, choose the one that describes you more often. After the quiz, compare your top two scores. The secondary score may explain why you do not feel like a textbook version of your primary temperament.',
        ],
      },
      {
        type: 'callout',
        title: 'Before you take a temperament quiz',
        body: 'The strongest results come from honest pattern recognition. Think about what people close to you would recognize as your normal behavior, not only what you admire.',
        bullets: ['Answer quickly but honestly.', 'Use repeated behavior, not rare moments.', 'Think about stress and conflict.', 'Compare your top two scores after the result.', 'Read the subtype when the result feels mixed.'],
      },
    ],
    related: [
      { href: '/methodology', title: 'FourType Methodology', description: 'See how FourType scores and interprets the quiz.' },
      { href: '/temperament-test', title: 'Temperament Test', description: 'Take the main free four temperaments quiz path.' },
      { href: '/blog/temperament-test-accuracy', title: 'Temperament Test Accuracy', description: 'Learn how to judge quiz reliability responsibly.' },
      { href: '/blog/4-temperaments-test-free', title: '4 Temperaments Test Free', description: 'Use the free quiz and learn how to read your score spread.' },
    ],
    faq: [
      { question: 'What questions are on a temperament test?', answer: 'Temperament test questions usually ask about repeated behavior in stress, conflict, relationships, decision-making, social energy, planning, and emotional processing. FourType uses questions that compare Choleric, Sanguine, Melancholic, and Phlegmatic patterns.' },
      { question: 'How many questions should a temperament test have?', answer: 'There is no single required number, but a useful quiz needs enough questions to compare all four patterns across several contexts. FourType uses 40 questions to balance depth with a quick quiz experience.' },
      { question: 'What makes a temperament question accurate?', answer: 'A more accurate temperament question asks about observable behavior instead of flattering labels. It should help reveal what you repeatedly do, especially under pressure.' },
      { question: 'Should I answer as my work self or personal self?', answer: 'Answer as your repeated default self across life. If work changes your behavior, consider how you act when you are not performing a role or trying to meet a specific expectation.' },
    ],
  },
  {
    slug: 'choleric-sanguine-melancholic-phlegmatic-test',
    title: 'Choleric Sanguine Melancholic Phlegmatic Test: Compare the Four Temperaments',
    shortTitle: 'Choleric Sanguine Melancholic Phlegmatic Test',
    description: 'Take a practical Choleric, Sanguine, Melancholic, and Phlegmatic test path and learn how to compare the four temperaments without forcing yourself into a flat label.',
    keywords: ['choleric sanguine melancholic phlegmatic test', 'choleric sanguine melancholic phlegmatic quiz', 'four temperament types test', 'four temperaments personality test', 'which temperament am I test', 'choleric test sanguine test melancholic test phlegmatic test', '4 temperament types test'],
    category: 'Guides',
    readTime: '9 min',
    accent: 'purple',
    icon: ArrowRightLeft,
    image: '/images/blog/choleric-sanguine-melancholic-phlegmatic-test.jpg',
    imageAlt: 'Four temperament archetypes around a glowing compass for the Choleric Sanguine Melancholic Phlegmatic test',
    published: '2026-07-02',
    blocks: [
      {
        type: 'section',
        title: 'The four names are a comparison, not four boxes',
        body: [
          'People search for a Choleric, Sanguine, Melancholic, Phlegmatic test when they already know the four classic temperament names and want to know which one fits. The useful answer is not simply a label. It is a comparison of which pattern leads, which pattern supports it, and where your behavior changes by context.',
          'FourType treats the four temperaments as a practical map. Choleric shows action and direction. Sanguine shows expression and connection. Melancholic shows depth and standards. Phlegmatic shows steadiness and harmony. Most people can recognize pieces of more than one pattern.',
        ],
      },
      {
        type: 'grid',
        title: 'What the test compares',
        intro: 'A balanced four temperaments test should make each type visible through real behavior, not stereotype.',
        items: [
          { title: 'Choleric', body: 'How quickly you decide, challenge friction, take command, and push toward visible progress.', accent: 'red' },
          { title: 'Sanguine', body: 'How much you seek interaction, novelty, enthusiasm, shared energy, and expressive connection.', accent: 'gold' },
          { title: 'Melancholic', body: 'How strongly you value accuracy, meaning, preparation, quality, and private reflection.', accent: 'blue' },
          { title: 'Phlegmatic', body: 'How naturally you protect calm, loyalty, patience, mediation, and relational steadiness.', accent: 'green' },
        ],
      },
      {
        type: 'section',
        title: 'Why your second-highest temperament matters',
        body: [
          'A test that only announces one winner can miss the most useful part of the result. A Choleric-Sanguine and a Choleric-Melancholic may both be decisive, but one moves through charisma and momentum while the other moves through standards and strategy.',
          'That is why FourType points toward subtype interpretation. Your primary temperament shows the main direction. Your secondary temperament often explains the flavor: warmer, sharper, quieter, steadier, more analytical, or more socially expressive.',
        ],
      },
      {
        type: 'grid',
        title: 'How the four types can look similar',
        intro: 'Mistyping often happens because two temperaments can produce the same surface behavior for different reasons.',
        items: [
          { title: 'Choleric vs Sanguine energy', body: 'Both can be bold. Choleric energy pushes outcomes; Sanguine energy pulls people into shared momentum.', accent: 'red' },
          { title: 'Melancholic vs Phlegmatic quiet', body: 'Both can be reserved. Melancholic quiet often analyzes; Phlegmatic quiet often stabilizes.', accent: 'blue' },
          { title: 'Choleric vs Melancholic standards', body: 'Both can be demanding. Choleric standards focus on results; Melancholic standards focus on correctness.', accent: 'purple' },
          { title: 'Sanguine vs Phlegmatic warmth', body: 'Both can be easy to like. Sanguine warmth animates the room; Phlegmatic warmth calms it.', accent: 'green' },
        ],
      },
      {
        type: 'section',
        title: 'How to take the test honestly',
        body: [
          'Answer based on your repeated default, especially when you are tired, hurried, disappointed, or challenged. Temperament becomes clearer when life is not perfectly arranged around your preferences.',
          'Avoid choosing the answer that sounds most admirable. A Choleric answer is not better than a Phlegmatic answer; a Melancholic answer is not deeper than a Sanguine answer. Each pattern has gifts, blind spots, and growth work.',
        ],
      },
      {
        type: 'section',
        title: 'What to read after your result',
        body: [
          'After you know your likely pattern, read the guide for your primary temperament and then compare your subtype. If your result surprises you, the question-design and accuracy guides can help you decide whether the result reflects your real behavior or a temporary season.',
          'The goal is not to memorize four ancient labels. The goal is to understand your action style, social rhythm, emotional processing, conflict pattern, and growth edge well enough to use the result.',
        ],
      },
      {
        type: 'callout',
        title: 'The best result is the one you can use',
        body: 'A Choleric, Sanguine, Melancholic, Phlegmatic test is most useful when it gives you both clarity and nuance: a likely main pattern, a visible score spread, and a path for learning what to do next.',
        bullets: ['Compare all four temperament scores.', 'Look for a clear primary pattern.', 'Check whether the second score changes the interpretation.', 'Read subtype pages when scores are close.', 'Use the result for self-awareness, not self-excuse.'],
      },
    ],
    related: [
      { href: '/quiz', title: 'Take the Free Quiz', description: 'Start the FourType temperament test.' },
      { href: '/blog/choleric-sanguine-melancholic-phlegmatic', title: 'How to Tell the Four Temperaments Apart', description: 'Compare the four classic temperament patterns.' },
      { href: '/blog/temperament-test-questions', title: 'Temperament Test Questions', description: 'See what a useful temperament quiz should ask.' },
      { href: '/subtypes', title: 'Temperament Subtypes', description: 'Explore mixed Choleric, Sanguine, Melancholic, and Phlegmatic results.' },
    ],
    faq: [
      { question: 'What is a Choleric Sanguine Melancholic Phlegmatic test?', answer: 'It is a four temperaments test that compares the classic Choleric, Sanguine, Melancholic, and Phlegmatic behavior patterns to identify your likely primary temperament and possible blend.' },
      { question: 'Can I be more than one of the four temperaments?', answer: 'Yes. Many people have a primary temperament with a strong secondary pattern. FourType uses subtype interpretation to explain common blends rather than forcing everyone into a pure type.' },
      { question: 'Which temperament is best?', answer: 'No temperament is best. Choleric, Sanguine, Melancholic, and Phlegmatic patterns each have strengths, blind spots, stress habits, and growth paths.' },
      { question: 'How do I know if my result is accurate?', answer: 'Look for repeated behavior across stress, relationships, work rhythm, and conflict. If your top two scores are close, read the subtype and methodology pages before treating the result as final.' },
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

export const staticContentPages: DiscoverablePage[] = [
  {
    href: '/blog/choleric',
    title: 'Choleric Temperament Guide',
    description: 'Discover the Choleric temperament, including leadership traits, strengths, weaknesses, careers, and growth strategies.',
    priority: 0.82,
    changeFrequency: 'monthly',
    markdownBody: 'The Choleric temperament describes a direct, decisive, goal-focused pattern. Choleric people often move toward leadership, challenge, and action under pressure. Use this guide with the FourType temperament test to compare Choleric traits against Sanguine, Melancholic, and Phlegmatic patterns.',
  },
  {
    href: '/blog/sanguine',
    title: 'Sanguine Temperament Guide',
    description: 'Discover the Sanguine temperament, including social energy, strengths, weaknesses, relationships, and growth strategies.',
    priority: 0.82,
    changeFrequency: 'monthly',
    markdownBody: 'The Sanguine temperament describes an expressive, social, optimistic pattern. Sanguine people often seek connection, energy, storytelling, novelty, and shared experience. Use this guide with the FourType temperament test to compare Sanguine traits against Choleric, Melancholic, and Phlegmatic patterns.',
  },
  {
    href: '/blog/melancholic',
    title: 'Melancholic Temperament Guide',
    description: 'Discover the Melancholic temperament, including depth, standards, strengths, weaknesses, careers, and growth strategies.',
    priority: 0.82,
    changeFrequency: 'monthly',
    markdownBody: 'The Melancholic temperament describes a reflective, analytical, standards-driven pattern. Melancholic people often care about depth, meaning, accuracy, beauty, and quality. Use this guide with the FourType temperament test to compare Melancholic traits against Choleric, Sanguine, and Phlegmatic patterns.',
  },
  {
    href: '/blog/phlegmatic',
    title: 'Phlegmatic Temperament Guide',
    description: 'Discover the Phlegmatic temperament, including calm, loyalty, strengths, weaknesses, relationships, and growth strategies.',
    priority: 0.82,
    changeFrequency: 'monthly',
    markdownBody: 'The Phlegmatic temperament describes a calm, steady, loyal pattern. Phlegmatic people often protect peace, trust, stability, support, and emotional steadiness. Use this guide with the FourType temperament test to compare Phlegmatic traits against Choleric, Sanguine, and Melancholic patterns.',
  },
  {
    href: '/blog/history-of-temperaments',
    title: 'History of the 4 Temperaments',
    description: 'Trace the four temperaments from ancient Greek medicine through modern personality psychology.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'The history of the four temperaments runs from Hippocrates and Galen through later personality frameworks. Use this article to understand where Choleric, Sanguine, Melancholic, and Phlegmatic language came from before taking the modern FourType temperament test.',
  },
  {
    href: '/blog/leadership-and-temperament',
    title: 'Temperament and Leadership',
    description: 'Learn how each temperament approaches leadership, teamwork, pressure, and decision-making.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'Temperament affects leadership pace, communication, conflict, delegation, and decision-making. This guide shows how Choleric, Sanguine, Melancholic, and Phlegmatic leaders can use their strengths without overusing them.',
  },
  {
    href: '/blog/temperaments-vs-mbti-big-five',
    title: '4 Temperaments vs MBTI vs Big Five',
    description: 'Compare the four temperaments with MBTI, Big Five, and DISC personality frameworks.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'The four temperaments, MBTI, Big Five, and DISC all describe personality from different angles. This comparison explains where temperament language is useful and where more modern frameworks may be better.',
  },
  {
    href: '/blog/subtypes',
    title: '15 Temperament Subtypes',
    description: 'Explore the blended temperament subtypes that appear when primary and secondary patterns combine.',
    priority: 0.85,
    changeFrequency: 'monthly',
    markdownBody: 'Temperament subtypes explain why two people with the same primary type can still feel different. This guide introduces the 15 blended patterns across Choleric, Sanguine, Melancholic, and Phlegmatic combinations.',
  },
  {
    href: '/blog/temperament-anxiety',
    title: 'Temperament and Anxiety',
    description: 'Understand how each temperament tends to experience stress, worry, overload, and recovery.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'Each temperament can experience anxiety and stress differently. This article explains common stress triggers and recovery patterns for Choleric, Sanguine, Melancholic, and Phlegmatic people without treating temperament as a diagnosis.',
  },
  {
    href: '/blog/temperament-dating',
    title: 'Temperament and Dating',
    description: 'Use temperament patterns to understand dating, compatibility, communication, and relationship friction.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'Temperament can help partners understand emotional pace, conflict style, affection, and communication. This relationship guide pairs naturally with the FourType temperament test for couples.',
  },
  {
    href: '/blog/temperament-work',
    title: 'Temperament at Work',
    description: 'Apply temperament types to team building, productivity, leadership, and workplace communication.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'Temperament at work affects meetings, deadlines, feedback, planning, and collaboration. This guide helps teams use Choleric, Sanguine, Melancholic, and Phlegmatic patterns more productively.',
  },
  {
    href: '/blog/temperament-science',
    title: 'The Science Behind Temperament',
    description: 'Explore the historical and modern research context behind temperament theory.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'Temperament has ancient roots and modern parallels in personality psychology. This article explains the scientific context carefully, showing what the model can and cannot claim.',
  },
  {
    href: '/temperament/choleric',
    title: 'Choleric Temperament',
    description: 'A complete profile of the Choleric temperament, including traits, strengths, careers, and growth.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'The Choleric temperament is direct, decisive, driven, and action-oriented. Use this profile to compare Choleric traits with your FourType temperament test result.',
  },
  {
    href: '/temperament/sanguine',
    title: 'Sanguine Temperament',
    description: 'A complete profile of the Sanguine temperament, including traits, strengths, relationships, and growth.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'The Sanguine temperament is expressive, social, energetic, and connection-oriented. Use this profile to compare Sanguine traits with your FourType temperament test result.',
  },
  {
    href: '/temperament/melancholic',
    title: 'Melancholic Temperament',
    description: 'A complete profile of the Melancholic temperament, including traits, depth, standards, and growth.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'The Melancholic temperament is reflective, analytical, sensitive to meaning, and careful about quality. Use this profile to compare Melancholic traits with your FourType temperament test result.',
  },
  {
    href: '/temperament/phlegmatic',
    title: 'Phlegmatic Temperament',
    description: 'A complete profile of the Phlegmatic temperament, including calm, loyalty, stability, and growth.',
    priority: 0.8,
    changeFrequency: 'monthly',
    markdownBody: 'The Phlegmatic temperament is calm, steady, loyal, and peace-oriented. Use this profile to compare Phlegmatic traits with your FourType temperament test result.',
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
  ...staticContentPages,
]

export const coreGuideLinks: LinkCard[] = [
  { href: '/temperament-test', title: 'Temperament Test', description: 'Start with the main free four temperaments quiz guide.' },
  { href: '/four-temperaments-test', title: 'Four Temperaments Test', description: 'Take the free Choleric, Sanguine, Melancholic, and Phlegmatic quiz.' },
  { href: '/temperament-quiz', title: 'Temperament Quiz', description: 'Use the quiz-focused path to identify your four temperaments pattern.' },
  { href: '/what-is-my-temperament', title: 'What Is My Temperament?', description: 'Compare the signs of each temperament before taking the quiz.' },
  { href: '/personality-temperament-test', title: 'Personality Temperament Test', description: 'Understand temperament as a practical layer of personality.' },
  { href: '/free-temperament-test', title: 'Free Temperament Test', description: 'See what the free FourType result includes.' },
  { href: '/4-temperament-test', title: '4 Temperament Test', description: 'Compare Choleric, Sanguine, Melancholic, and Phlegmatic.' },
  { href: '/blog/4-temperaments-test-free', title: '4 Temperaments Test Free', description: 'Take the free quiz and learn how to read your score spread.' },
  { href: '/blog/temperament-test-questions', title: 'Temperament Test Questions', description: 'See what useful quiz questions should ask.' },
  { href: '/blog/choleric-sanguine-melancholic-phlegmatic-test', title: 'Choleric Sanguine Melancholic Phlegmatic Test', description: 'Compare the four classic temperament test patterns.' },
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

export const typeTestLinks: LinkCard[] = [
  { href: '/blog/choleric-sanguine-melancholic-phlegmatic-test', title: 'Four Temperament Types Test', description: 'Compare Choleric, Sanguine, Melancholic, and Phlegmatic together.' },
  { href: '/choleric-test', title: 'Choleric Test', description: 'Check whether drive, decisiveness, and challenge lead your temperament.' },
  { href: '/sanguine-test', title: 'Sanguine Test', description: 'Check whether connection, expression, and enthusiasm lead your temperament.' },
  { href: '/melancholic-test', title: 'Melancholic Test', description: 'Check whether depth, quality, and analysis lead your temperament.' },
  { href: '/phlegmatic-test', title: 'Phlegmatic Test', description: 'Check whether calm, loyalty, and peace lead your temperament.' },
]

export const methodologyGuideLinks: LinkCard[] = [
  { href: '/methodology', title: 'FourType Methodology', description: 'How the temperament test is scored and interpreted.' },
  { href: '/blog/temperament-test-accuracy', title: 'Temperament Test Accuracy', description: 'How to judge quiz reliability without overclaiming.' },
  { href: '/blog/temperament-test-questions', title: 'Temperament Test Questions', description: 'What a useful four temperaments quiz should ask.' },
  { href: '/temperaments-vs-mbti', title: 'Temperaments vs MBTI', description: 'Compare temperament with other personality frameworks.' },
  { href: '/four-temperaments', title: 'The Four Temperaments', description: 'A clear guide to the classical four-type model.' },
]

export const popularGuideLinks: LinkCard[] = [
  ...coreGuideLinks.slice(1, 6),
  ...methodologyGuideLinks.slice(0, 2),
]

export function guideLinksForSeoPage(slug: string): LinkCard[] {
  if (slug.endsWith('-test') && ['choleric-test', 'sanguine-test', 'melancholic-test', 'phlegmatic-test'].includes(slug)) {
    return [
      { href: '/temperament-test', title: 'Full Temperament Test', description: 'Compare all four temperaments before deciding your type.' },
      { href: '/what-is-my-temperament', title: 'What Is My Temperament?', description: 'Use the broader self-check to compare all four patterns.' },
      { href: '/blog/choleric-sanguine-melancholic-phlegmatic', title: 'How to Tell the Four Temperaments Apart', description: 'See the differences between Choleric, Sanguine, Melancholic, and Phlegmatic.' },
      ...typeTestLinks.filter((link) => link.href !== `/${slug}`).slice(0, 3),
    ]
  }

  if (slug === 'temperament-test-for-couples') {
    return relationshipGuideLinks
  }

  if (slug === 'methodology' || slug === 'temperaments-vs-mbti') {
    return methodologyGuideLinks
  }

  if (slug === 'four-temperaments' || slug === 'subtypes') {
    return [
      { href: '/blog/choleric-sanguine-melancholic-phlegmatic', title: 'How to Tell the Four Temperaments Apart', description: 'Compare the four types through stress response and real behavior.' },
      ...typeTestLinks,
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

export function itemListJsonLd(name: string, items: LinkCard[]) {
  if (!items.length) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.title,
      description: item.description,
      url: `https://www.fourtype.com${item.href}`,
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
