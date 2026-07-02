import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import RuneBackground from '@/components/RuneBackground';
import { FaqSection } from '@/components/FaqSection';
import { InternalLinkHub } from '@/components/InternalLinkHub';
import { breadcrumbJsonLd, faqJsonLd, quizActionJsonLd, type FaqItem, type LinkCard } from '@/lib/seo-content';

interface BlogPostProps {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  canonicalPath?: string;
  description?: string;
  published?: string;
  sections: {
    heading: string;
    content: string[];
  }[];
  faq?: FaqItem[];
  relatedLinks?: LinkCard[];
  relatedTopics?: string[];
}

export function BlogPostTemplate({
  title,
  subtitle,
  author,
  date,
  readTime,
  image,
  imageAlt,
  canonicalPath,
  description,
  published,
  sections,
  faq,
  relatedLinks = [],
  relatedTopics = [],
}: BlogPostProps) {
  const canonicalUrl = canonicalPath ? `https://www.fourtype.com${canonicalPath}` : undefined;
  const articleSchema = canonicalUrl ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description ?? subtitle,
    image: `https://www.fourtype.com${image}`,
    datePublished: published ?? date,
    dateModified: published ?? date,
    author: { '@type': 'Organization', name: author, url: 'https://www.fourtype.com' },
    publisher: { '@type': 'Organization', name: 'FourType', logo: { '@type': 'ImageObject', url: 'https://www.fourtype.com/fourtype-logo.png' } },
    mainEntityOfPage: canonicalUrl,
  } : null;
  const faqSchema = faqJsonLd(faq);
  const breadcrumbSchema = canonicalPath ? breadcrumbJsonLd([
    { href: '/', title: 'FourType', description: 'FourType home' },
    { href: '/blog', title: 'Blog', description: 'FourType temperament articles' },
    { href: canonicalPath, title, description: description ?? subtitle },
  ]) : null;

  return (
    <>
      {articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />}
      {breadcrumbSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizActionJsonLd) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <RuneBackground />
      <Navigation />
      <main className="min-h-screen relative z-10">
        {/* Header */}
        <section className="pt-32 pb-12 px-4 border-b border-gray-800">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#FFD700] hover:text-yellow-300 mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{subtitle}</p>
            <div className="flex flex-wrap gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {readTime} min read
              </div>
              <div>By {author}</div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={image}
                alt={imageAlt}
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-invert max-w-none space-y-12">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-3xl font-bold text-white mb-6">{section.heading}</h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-300 leading-relaxed text-lg">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </article>

            <InternalLinkHub title="Temperament Test Guides" links={relatedLinks} />
            <FaqSection faq={faq} />

            {/* Related Topics */}
            {relatedTopics.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {relatedTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 hover:border-[#FFD700] transition-colors cursor-pointer"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Find Your Temperament Pattern</h3>
            <p className="text-gray-300 mb-8">
              Take the free FourType quiz, then compare your result with the guide above.
            </p>
            <Link
              href="/quiz"
              className="inline-block px-8 py-3 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              Take the Free Temperament Test
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
