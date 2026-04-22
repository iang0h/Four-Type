import { Metadata } from 'next';
import CholericPageClient from './CholericPageClient';

export const metadata: Metadata = {
  title: 'Choleric Temperament — Leadership, Traits & Free Personality Test | FourType',
  description: 'Discover the Choleric personality: ambitious, decisive, natural leader. Learn their core traits, leadership strengths, challenges, ideal careers, and take the free temperament test.',
  keywords: ['choleric temperament', 'choleric personality', 'choleric personality traits', 'the commander', 'type a personality', 'leadership personality', 'four temperaments test', 'am i choleric'],
  openGraph: {
    title: 'Choleric Temperament — The Natural Leader | FourType',
    description: 'The Choleric is decisive, ambitious, and born to lead. Discover their strengths, challenges, and how to thrive as or work with this powerful personality.',
    type: 'article',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png',
        width: 400,
        height: 500,
        alt: 'The Commander - Choleric Temperament Character',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Choleric Temperament — Leadership & Personality Guide | FourType',
    description: 'Choleric personality explained: traits, leadership style, strengths, weaknesses, and how to channel your natural drive.',
  },
  alternates: {
    canonical: 'https://www.fourtype.com/temperament/choleric',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Choleric temperament?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Choleric temperament is one of the four classical temperaments characterized by ambition, decisiveness, and natural leadership ability. Cholerics are goal-oriented extroverts who excel at taking charge and driving results.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main strengths of a Choleric personality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key Choleric strengths include exceptional leadership abilities, efficiency in getting things done, natural problem-solving skills, strong willpower and focus, clear vision and direction, and the ability to motivate teams to achieve goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What careers are best for Choleric temperaments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cholerics excel in leadership-oriented careers: executive leadership, entrepreneurship, military/law enforcement, project management, sales management, strategic planning, politics, and emergency services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Cholerics behave in relationships?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In relationships, Cholerics are protective, loyal, and action-oriented partners. They show love through providing and problem-solving. They need partners who can handle their directness and appreciate their drive.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the weaknesses of the Choleric temperament?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common Choleric challenges include appearing aggressive or domineering, impatience with others, difficulty delegating, struggling with empathy, workaholic tendencies, and dismissing others\' input too quickly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a Choleric handle stress?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under stress, Cholerics may become more controlling, aggressive, or workaholic. They benefit from physical exercise, strategic problem-solving approaches, and learning to delegate and trust others.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Choleric the same as Type A personality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While similar, they\'re not identical. Type A focuses on competitiveness and urgency, while Choleric encompasses broader leadership traits including decisiveness, goal-orientation, and commanding presence. Many Type A individuals are Choleric, but the temperament system provides deeper personality insights.',
      },
    },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Choleric Temperament: The Complete Guide to the Commander Personality',
  description: 'A comprehensive guide to understanding the Choleric temperament, including leadership strengths, challenges, career paths, and relationship dynamics.',
  image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png',
  author: { '@type': 'Organization', name: 'FourType' },
  publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: '/fourtype-logo.png' } },
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function CholericPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <CholericPageClient />
    </>
  );
}
