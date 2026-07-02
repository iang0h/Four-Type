import type { Metadata } from 'next'
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd, quizActionJsonLd } from '@/lib/seo-content'

export const metadata: Metadata = {
  title: 'Free Temperament Test | 40-Question Personality Quiz',
  description: 'Take the free 40-question temperament test to discover your personality type. Are you Choleric (Commander), Sanguine (Bard), Melancholic (Strategist), or Phlegmatic (Guardian)? Find out in under 10 minutes.',
  keywords: [
    'temperament test', 'free personality test', 'temperament quiz', '4 temperament test',
    'choleric sanguine melancholic phlegmatic', 'personality type quiz', 'temperament assessment',
    'free temperament test online', 'personality quiz', 'four temperaments test',
  ],
  alternates: {
    canonical: 'https://www.fourtype.com/quiz',
  },
  openGraph: {
    title: 'Free Temperament Test | Discover Your True Nature',
    description: 'Take the free 40-question temperament test. Discover if you are The Commander, The Bard, The Strategist, or The Guardian.',
    url: 'https://www.fourtype.com/quiz',
    type: 'website',
    images: [
      {
        url: 'https://www.fourtype.com/og-image.jpg',
        width: 1280,
        height: 960,
        alt: 'FourType Temperament Test - 40 Questions, 4 Temperaments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Temperament Test | 40-Question Quiz',
    description: 'Discover your temperament type. Are you Choleric, Sanguine, Melancholic, or Phlegmatic?',
    images: ['https://www.fourtype.com/og-image.jpg'],
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
  ])
  const quizGuideSchema = itemListJsonLd('FourType quiz support guides', [
    { href: '/temperament-test', title: 'Temperament Test Guide', description: 'Learn what the FourType temperament test measures and how to read your result.' },
    { href: '/four-temperaments-test', title: 'Four Temperaments Test', description: 'Take the free Choleric, Sanguine, Melancholic, and Phlegmatic quiz path.' },
    { href: '/blog/choleric-sanguine-melancholic-phlegmatic-test', title: 'Four Temperament Types Test', description: 'Compare Choleric, Sanguine, Melancholic, and Phlegmatic together.' },
    { href: '/blog/temperament-test-questions', title: 'Temperament Test Questions', description: 'See what useful quiz questions should ask.' },
    { href: '/blog/4-temperaments-test-free', title: 'Free 4 Temperaments Test', description: 'Learn how to take a free 4 temperaments test and read your score spread.' },
    { href: '/methodology', title: 'FourType Methodology', description: 'How the 40-question quiz is scored and interpreted.' },
    { href: '/subtypes', title: 'Temperament Subtypes', description: 'Use your top two scores to understand blended temperament results.' },
  ])
  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'FourType Temperament Test',
    url: 'https://www.fourtype.com/quiz',
    description: 'A free 40-question temperament quiz for comparing Choleric, Sanguine, Melancholic, Phlegmatic, and blended subtype patterns.',
    educationalUse: 'Self assessment',
    assesses: 'Four temperaments pattern: Choleric, Sanguine, Melancholic, Phlegmatic, and blended subtypes',
    isAccessibleForFree: true,
    provider: {
      '@type': 'Organization',
      name: 'FourType',
      url: 'https://www.fourtype.com',
    },
    about: [
      { '@type': 'DefinedTerm', name: 'Choleric temperament', url: 'https://www.fourtype.com/choleric-test' },
      { '@type': 'DefinedTerm', name: 'Sanguine temperament', url: 'https://www.fourtype.com/sanguine-test' },
      { '@type': 'DefinedTerm', name: 'Melancholic temperament', url: 'https://www.fourtype.com/melancholic-test' },
      { '@type': 'DefinedTerm', name: 'Phlegmatic temperament', url: 'https://www.fourtype.com/phlegmatic-test' },
    ],
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
