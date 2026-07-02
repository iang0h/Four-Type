import type { Metadata } from 'next'
import { Cinzel, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '600', '700', '900'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Free Temperament Test | FourType',
    template: '%s',
  },
  description: 'Take the free FourType temperament test to discover whether you are Choleric, Sanguine, Melancholic, Phlegmatic, or a blended subtype.',
  metadataBase: new URL('https://www.fourtype.com'),
  alternates: {
    canonical: 'https://www.fourtype.com',
  },
  keywords: [
    'temperament test', 'four temperaments', 'free personality test', 'what is my temperament',
    'choleric sanguine melancholic phlegmatic', 'temperament quiz', 'personality type quiz',
    'know your temperament', 'temperament types explained', 'four humors personality',
    'choleric personality', 'sanguine personality', 'melancholic personality', 'phlegmatic personality',
    'temperament vs personality', 'ancient personality types', 'Hippocrates temperaments',
    'character archetypes', '15 temperament subtypes', 'temperament blend', 'FourType',
    'fourtype.com', 'temperament education', 'personality psychology', 'self discovery quiz',
  ],
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
  openGraph: {
    title: 'FourType — Discover Your Temperament | Free 40-Question Quiz',
    description: 'Understanding your temperament unlocks the key to why you think, feel, and act the way you do. Discover if you are The Commander, The Bard, The Strategist, or The Guardian.',
    url: 'https://www.fourtype.com',
    siteName: 'FourType',
    images: [
      {
        url: 'https://www.fourtype.com/og-image.jpg',
        width: 1280,
        height: 960,
        alt: 'FourType — Know Your True Nature. The Temperament Quest. 40 questions. 4 temperaments. Free forever.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FourType — Discover Your Temperament',
    description: 'Understanding your temperament unlocks the key to why you think, feel, and act the way you do. Free 40-question quiz.',
    images: ['https://www.fourtype.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  themeColor: '#0D0D0F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FourType',
    alternateName: 'FourType — The Temperament Quest',
    url: 'https://www.fourtype.com',
    description: 'Understanding your temperament unlocks the key to why you think, feel, and act the way you do. Take the free 40-question temperament test to discover your type: The Commander (Choleric), The Bard (Sanguine), The Strategist (Melancholic), or The Guardian (Phlegmatic). Based on 2,500 years of temperament science. Free forever.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.fourtype.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FourType',
      url: 'https://www.fourtype.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.fourtype.com/fourtype-logo.png',
      },
    },
    sameAs: ['https://www.fourtype.com'],
  }

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cinzel.variable} ${dmSans.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
