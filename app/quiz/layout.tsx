import type { Metadata } from 'next'
import { breadcrumbJsonLd, quizActionJsonLd } from '@/lib/seo-content'

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizActionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
