import type { Metadata } from 'next'
import { breadcrumbJsonLd, faqJsonLd, fourTypeOrganizationRef, fourTypeQuizAppRef, fourTypeWebsiteRef, itemListJsonLd, quizActionJsonLd, temperamentTopicJsonLd } from '@/lib/seo-content'

export const metadata: Metadata = {
  title: 'Free Temperament Test 2026 | 40-Question Personality Quiz',
  description: 'Take the free 2026 FourType temperament test to discover your Choleric, Sanguine, Melancholic, Phlegmatic, or blended subtype score spread. No email required for the core result.',
  keywords: [
    'temperament test', 'free personality test', 'temperament quiz', '4 temperament test',
    'choleric sanguine melancholic phlegmatic', 'personality type quiz', 'temperament assessment',
    'free temperament test online', 'personality quiz', 'four temperaments test',
  ],
  alternates: {
    canonical: 'https://www.fourtype.com/quiz',
    languages: {
      en: 'https://www.fourtype.com/quiz',
      'zh-CN': 'https://www.fourtype.com/zh-CN/quiz',
      es: 'https://www.fourtype.com/es/quiz',
    },
  },
  openGraph: {
    title: 'Free Temperament Test 2026 | Discover Your True Nature',
    description: 'Take the free 2026 FourType temperament test. Discover your score spread across Commander, Bard, Strategist, Guardian, and blended subtypes.',
    url: 'https://www.fourtype.com/quiz',
    type: 'website',
    images: [
      {
        url: 'https://www.fourtype.com/og-image.png',
        width: 1672,
        height: 941,
        alt: 'FourType Temperament Test - 40 Questions, 4 Temperaments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Temperament Test 2026 | 40-Question Quiz',
    description: 'Discover your temperament score spread: Choleric, Sanguine, Melancholic, Phlegmatic, and blended subtype direction.',
    images: ['https://www.fourtype.com/og-image.png'],
  },
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbSchema = breadcrumbJsonLd([
    { href: '/', title: 'FourType', description: 'FourType home' },
    { href: '/quiz', title: 'Free Temperament Test', description: 'Take the FourType temperament quiz' },
  ])
  const faqSchema = faqJsonLd([
    {
      question: 'What does the FourType temperament test measure?',
      answer: 'It measures repeated behavioral patterns across the four temperaments: how you respond to pressure, make decisions, relate to people, and recover energy.',
    },
    {
      question: 'Is this temperament test free?',
      answer: 'Yes. The core FourType temperament test is free and gives you a primary pattern, score spread, and subtype direction.',
    },
    {
      question: 'How should I answer the quiz?',
      answer: 'Answer as your default self, especially under ordinary stress. Avoid choosing the answer that sounds most impressive or ideal.',
    },
    {
      question: 'What are the four temperament results?',
      answer: 'The four main temperament results are Choleric, Sanguine, Melancholic, and Phlegmatic. FourType also shows blended subtype direction when your top two scores are close.',
    },
    {
      question: 'How long does the temperament test take?',
      answer: 'The FourType temperament test has 40 questions and usually takes under 10 minutes.',
    },
    {
      question: 'How is FourType different from other temperament tests?',
      answer: 'FourType gives the core result free first, shows score spread across all four temperaments, points toward blended subtype direction, and links the result to practical guides for relationships, work, stress, and growth.',
    },
    {
      question: 'Should I take FourType or a shorter temperament quiz?',
      answer: 'Use a short quiz if you only want a quick first signal. Use FourType if you want more behavioral detail, score spread, subtype guidance, and practical follow-up after the result.',
    },
  ])
  const quizGuideSchema = itemListJsonLd('FourType quiz support guides', [
    { href: '/temperament-test', title: 'Temperament Test Guide', description: 'Learn what the FourType temperament test measures and how to read your result.' },
    { href: '/four-temperaments-test', title: 'Four Temperaments Test', description: 'Take the free Choleric, Sanguine, Melancholic, and Phlegmatic quiz path.' },
    { href: '/blog/choleric-sanguine-melancholic-phlegmatic-test', title: 'Four Temperament Types Test', description: 'Compare Choleric, Sanguine, Melancholic, and Phlegmatic together.' },
    { href: '/blog/temperament-test-questions', title: 'Temperament Test Questions', description: 'See what useful quiz questions should ask.' },
    { href: '/blog/4-temperaments-test-free', title: 'Free 4 Temperaments Test', description: 'Learn how to take a free 4 temperaments test and read your score spread.' },
    { href: '/methodology', title: 'FourType Methodology', description: 'How the 40-question quiz is scored and interpreted.' },
    { href: '/subtypes', title: 'Temperament Subtypes', description: 'Use your top two scores to understand blended temperament results.' },
    { href: '/blog/temperament-test-comparison', title: 'Temperament Test Comparison', description: 'Compare FourType with OSPP, IDRlabs, Truity, JobCannon, Psych Central, and more.' },
  ])
  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    '@id': 'https://www.fourtype.com/quiz#quiz',
    name: 'FourType Temperament Test',
    alternateName: ['Free Temperament Test', 'Four Temperaments Test', '4 Temperament Test'],
    url: 'https://www.fourtype.com/quiz',
    description: 'A free 40-question temperament quiz for comparing Choleric, Sanguine, Melancholic, Phlegmatic, and blended subtype patterns.',
    image: 'https://www.fourtype.com/og-image.png',
    inLanguage: 'en-US',
    educationalUse: 'Self assessment',
    assesses: 'Four temperaments pattern: Choleric, Sanguine, Melancholic, Phlegmatic, and blended subtypes',
    isAccessibleForFree: true,
    numberOfQuestions: 40,
    timeRequired: 'PT10M',
    provider: fourTypeOrganizationRef,
    publisher: fourTypeOrganizationRef,
    creator: fourTypeOrganizationRef,
    isPartOf: fourTypeWebsiteRef,
    mainEntity: fourTypeQuizAppRef,
    mainEntityOfPage: 'https://www.fourtype.com/quiz',
    about: temperamentTopicJsonLd,
    potentialAction: {
      '@type': 'TakeAction',
      target: 'https://www.fourtype.com/quiz',
      name: 'Take the free temperament test',
      object: fourTypeQuizAppRef,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizActionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {quizGuideSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizGuideSchema) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {children}
    </>
  )
}
