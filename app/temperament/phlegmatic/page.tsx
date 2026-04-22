import { Metadata } from 'next';
import PhlegmaticPageClient from './PhlegmaticPageClient';

export const metadata: Metadata = {
  title: 'Phlegmatic Temperament — Peaceful, Loyal & Free Personality Test | FourType',
  description: 'Discover the Phlegmatic personality: calm, loyal, peaceful peacemaker. Learn their strengths, peaceful nature, challenges, ideal careers, and take the free temperament test.',
  keywords: ['phlegmatic temperament', 'phlegmatic personality', 'phlegmatic personality traits', 'the guardian', 'peaceful personality', 'loyal personality', 'introvert personality', 'four temperaments test', 'am i phlegmatic'],
  openGraph: {
    title: 'Phlegmatic Temperament — The Calm Peacemaker | FourType',
    description: 'The Phlegmatic is calm, loyal, and profoundly supportive. Discover their peaceful strengths, harmony-building abilities, and how to thrive with this grounding personality type.',
    type: 'article',
    images: [{ url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png', width: 400, height: 500, alt: 'The Guardian - Phlegmatic Temperament Character' }],
  },
  twitter: { card: 'summary_large_image', title: 'Phlegmatic Temperament — Personality & Traits Guide | FourType', description: 'Phlegmatic personality explained: calm nature, loyalty, harmony-building, and how to embrace your peaceful strength.' },
  alternates: { canonical: 'https://www.fourtype.com/temperament/phlegmatic' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a Phlegmatic temperament?', acceptedAnswer: { '@type': 'Answer', text: 'The Phlegmatic temperament is one of the four classical temperaments characterized by calmness, loyalty, and a peaceful disposition. Phlegmatics are introverted supporters who excel at creating harmony, maintaining stability, and building deep, lasting relationships.' } },
    { '@type': 'Question', name: 'What are the main strengths of a Phlegmatic personality?', acceptedAnswer: { '@type': 'Answer', text: 'Key Phlegmatic strengths include exceptional listening skills, natural ability to create peaceful environments, outstanding loyalty and dependability, talent for mediation and conflict resolution, steady and consistent work output, and the ability to remain calm under pressure.' } },
    { '@type': 'Question', name: 'What careers are best for Phlegmatic temperaments?', acceptedAnswer: { '@type': 'Answer', text: 'Phlegmatics excel in careers requiring patience and interpersonal skills: human resources, counseling and therapy, nursing and healthcare, social work, teaching and education support, administrative roles, customer service, and community services.' } },
    { '@type': 'Question', name: 'How do Phlegmatics behave in relationships?', acceptedAnswer: { '@type': 'Answer', text: 'In relationships, Phlegmatics are deeply loyal, supportive partners who create stable, harmonious environments. They show love through consistent presence, acts of service, and unwavering support. They need partners who appreciate their calm nature and don\'t mistake quietness for lack of caring.' } },
    { '@type': 'Question', name: 'What are the weaknesses of the Phlegmatic temperament?', acceptedAnswer: { '@type': 'Answer', text: 'Common Phlegmatic challenges include being overly passive, difficulty making decisions, lack of initiative, resistance to change, tendency to suppress their own needs, avoiding conflict to an unhealthy degree, and struggling with assertiveness.' } },
    { '@type': 'Question', name: 'How does a Phlegmatic handle stress?', acceptedAnswer: { '@type': 'Answer', text: 'Under stress, Phlegmatics may become withdrawn, stubborn, or passive-aggressive. They might internalize problems rather than addressing them, leading to hidden resentment. Healthy coping includes gentle exercise, time in nature, trusted confidants, and structured problem-solving at their own pace.' } },
    { '@type': 'Question', name: 'What is the difference between Phlegmatic and Melancholic temperaments?', acceptedAnswer: { '@type': 'Answer', text: 'While both Phlegmatics and Melancholics are introverted, they differ in orientation. Phlegmatics seek harmony and stability—they want peaceful relationships and consistent environments. Melancholics seek perfection and depth—they want things done right and ideas explored thoroughly. Phlegmatics are relationship-oriented; Melancholics are task-oriented.' } },
  ],
};

const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', headline: 'Phlegmatic Temperament: The Complete Guide to the Guardian Personality', description: 'A comprehensive guide to understanding the Phlegmatic temperament, including peaceful strengths, loyalty patterns, career paths, and relationship dynamics.', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png', author: { '@type': 'Organization', name: 'FourType' }, publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: '/fourtype-logo.png' } }, datePublished: '2024-01-01', dateModified: new Date().toISOString().split('T')[0] };

export default function PhlegmaticPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <PhlegmaticPageClient />
    </>
  );
}
