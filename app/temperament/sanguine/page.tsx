import { Metadata } from 'next';
import SanguinePageClient from './SanguinePageClient';

export const metadata: Metadata = {
  title: 'Sanguine Temperament — Traits, Strengths & Free Personality Test | FourType',
  description: 'Discover the Sanguine personality: enthusiastic, creative, charismatic. Learn their core traits, natural strengths, ideal careers, relationship styles, and take the free temperament test to find your unique blend.',
  keywords: ['sanguine temperament', 'sanguine personality', 'sanguine personality traits', 'the bard', 'extrovert personality', 'optimistic personality type', 'four temperaments test', 'am i sanguine'],
  openGraph: {
    title: 'Sanguine Temperament — The Enthusiastic Connector | FourType',
    description: 'The Sanguine is enthusiastic, creative, and socially magnetic. Discover their strengths, challenges, relationships, and career fit.',
    type: 'article',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png',
        width: 400,
        height: 500,
        alt: 'The Bard - Sanguine Temperament Character',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanguine Temperament — Traits & Personality Guide | FourType',
    description: 'Sanguine personality explained: traits, strengths, weaknesses, and how to thrive as or with a Sanguine type.',
  },
  alternates: {
    canonical: 'https://www.fourtype.com/temperament/sanguine',
  },
};

// FAQ Schema for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Sanguine temperament?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Sanguine temperament is one of the four classical temperaments characterized by enthusiasm, optimism, and social magnetism. Sanguines are extroverted, creative, and thrive in social settings where they can connect with others and share ideas.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main strengths of a Sanguine personality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key strengths include natural charisma, excellent communication skills, creativity, adaptability, the ability to motivate others, strong networking abilities, and bringing joy to difficult situations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What careers are best for Sanguine temperaments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sanguines excel in careers involving people and creativity: sales and marketing, entertainment, event planning, public relations, teaching, hospitality, creative industries, and leadership roles that require inspiring others.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do Sanguines behave in relationships?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In relationships, Sanguines are warm, affectionate, and fun-loving partners. They bring excitement and spontaneity but may struggle with consistency and deep emotional conversations. They need partners who appreciate their social nature.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the weaknesses of the Sanguine temperament?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common challenges include impulsivity, difficulty with long-term focus, struggles with detail-oriented tasks, tendency to overcommit, and sometimes being perceived as shallow or unreliable.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a Sanguine handle stress?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under stress, Sanguines may become scattered, overly talkative, or seek distraction through social activities. They benefit from supportive friends, creative outlets, and structured approaches to problem-solving.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Sanguine and Choleric temperaments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'While both are extroverted, Sanguines are people-focused and seek connection and fun, while Cholerics are task-focused and seek achievement and control. Sanguines inspire through enthusiasm; Cholerics lead through decisive action.',
      },
    },
  ],
};

// Article Schema for SEO
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sanguine Temperament: The Complete Guide to the Bard Personality',
  description: 'A comprehensive guide to understanding the Sanguine temperament, including strengths, weaknesses, career paths, and relationship dynamics.',
  image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png',
  author: {
    '@type': 'Organization',
    name: 'FourType',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FourType',
    logo: {
      '@type': 'ImageObject',
      url: '/fourtype-logo.png',
    },
  },
  datePublished: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function SanguinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SanguinePageClient />
    </>
  );
}
