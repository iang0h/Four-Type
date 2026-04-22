import { Metadata } from 'next';
import MelancholicPageClient from './MelancholicPageClient';

export const metadata: Metadata = {
  title: 'Melancholic Temperament — Analytical, Perfectionist & Free Personality Test | FourType',
  description: 'Understand the Melancholic personality: analytical, thoughtful, perfectionist. Explore their strengths, analytical gifts, challenges, ideal careers, and take the free temperament test.',
  keywords: ['melancholic temperament', 'melancholic personality', 'melancholic personality traits', 'the strategist', 'perfectionist personality', 'analytical personality', 'introvert personality', 'four temperaments test'],
  openGraph: {
    title: 'Melancholic Temperament — The Thoughtful Analyst | FourType',
    description: 'The Melancholic is analytical, detail-oriented, and deeply thoughtful. Discover their analytical strengths, perfectionism, and how to thrive with this profound personality type.',
    type: 'article',
    images: [{ url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png', width: 400, height: 500, alt: 'The Strategist - Melancholic Temperament Character' }],
  },
  twitter: { card: 'summary_large_image', title: 'Melancholic Temperament — Personality & Traits Guide | FourType', description: 'Melancholic personality explained: analytical mind, perfectionism, depth, and how to leverage your strengths.' },
  alternates: { canonical: 'https://www.fourtype.com/temperament/melancholic' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a Melancholic temperament?', acceptedAnswer: { '@type': 'Answer', text: 'The Melancholic temperament is one of the four classical temperaments characterized by analytical thinking, perfectionism, and deep introspection. Melancholics are introverted thinkers who excel at detailed work and maintain high standards.' } },
    { '@type': 'Question', name: 'What are the main strengths of a Melancholic personality?', acceptedAnswer: { '@type': 'Answer', text: 'Key Melancholic strengths include exceptional analytical skills, high-quality work output, great attention to detail, reliability and dependability, deep emotional intelligence, and the ability to create comprehensive plans and thorough research.' } },
    { '@type': 'Question', name: 'What careers are best for Melancholic temperaments?', acceptedAnswer: { '@type': 'Answer', text: 'Melancholics excel in careers requiring precision and depth: research and science, software development, accounting and finance, academic careers, quality assurance, writing and journalism, psychology, and engineering.' } },
    { '@type': 'Question', name: 'How do Melancholics behave in relationships?', acceptedAnswer: { '@type': 'Answer', text: 'In relationships, Melancholics are deeply loyal, thoughtful partners who show love through acts of service and quality time. They need time to open up and appreciate partners who respect their need for depth and space.' } },
    { '@type': 'Question', name: 'What are the weaknesses of the Melancholic temperament?', acceptedAnswer: { '@type': 'Answer', text: 'Common Melancholic challenges include being overly critical (of self and others), perfectionism that paralyzes action, difficulty delegating, social withdrawal, anxiety and overthinking, and slow decision-making.' } },
    { '@type': 'Question', name: 'How does a Melancholic handle stress?', acceptedAnswer: { '@type': 'Answer', text: 'Under stress, Melancholics may become withdrawn, overly critical, anxious, or pessimistic. They benefit from structured problem-solving, creative outlets, trusted confidants, and practices that break the cycle of overthinking.' } },
    { '@type': 'Question', name: 'Is Melancholic the same as being depressed?', acceptedAnswer: { '@type': 'Answer', text: 'No. Despite the similar-sounding name, the Melancholic temperament is not depression. While Melancholics may be more prone to negative emotions due to their deep thinking, the temperament describes a personality type characterized by thoughtfulness, not a mental health condition.' } },
  ],
};

const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Melancholic Temperament: The Complete Guide to the Strategist Personality', description: 'A comprehensive guide to understanding the Melancholic temperament, including analytical strengths, perfectionist challenges, career paths, and relationship dynamics.', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png', author: { '@type': 'Organization', name: 'FourType' }, publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: '/fourtype-logo.png' } }, datePublished: '2024-01-01', dateModified: new Date().toISOString().split('T')[0] };

export default function MelancholicPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <MelancholicPageClient />
    </>
  );
}
