import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SharePageClient from './SharePageClient'
import { BLENDS } from '@/lib/blends'
import { TEMPERAMENTS } from '@/lib/temperaments'
import { getShareMetadata } from '@/lib/share-copy'
import { decodeShareId } from '@/lib/share-id'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const data = decodeShareId(id)
  
  if (!data) {
    return {
      title: 'Share Your Temperament | FourType',
      description: 'Discover your temperament at FourType.com',
      robots: {
        index: false,
        follow: true,
      },
    }
  }
  
  const blend = BLENDS[data.blendKey]
  const shareMetadata = getShareMetadata(data.heroName, blend)
  
  const title = `${shareMetadata.title} | FourType`
  const description = shareMetadata.description
  
  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: 'https://www.fourtype.com/quiz',
    },
    openGraph: {
      title: shareMetadata.ogTitle,
      description: shareMetadata.ogDescription,
      url: `https://www.fourtype.com/share/${id}`,
      siteName: 'FourType',
      images: [
        {
          url: `https://www.fourtype.com/api/og?blend=${data.blendKey}&name=${encodeURIComponent(data.heroName)}`,
          width: 1200,
          height: 630,
          alt: `${blend.name} - ${blend.blend}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: shareMetadata.ogTitle,
      description: shareMetadata.ogDescription,
      images: [`https://www.fourtype.com/api/og?blend=${data.blendKey}&name=${encodeURIComponent(data.heroName)}`],
    },
  }
}

export default async function SharePage({ params }: PageProps) {
  const { id } = await params
  const data = decodeShareId(id)
  
  if (!data) {
    notFound()
  }
  
  const blend = BLENDS[data.blendKey]
  const dominantTemp = TEMPERAMENTS[blend.primary]
  
  return (
    <SharePageClient
      heroName={data.heroName}
      blend={blend}
      dominantTemp={dominantTemp}
      scores={data.scores}
      shareId={id}
    />
  )
}
