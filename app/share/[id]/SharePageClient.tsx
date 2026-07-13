'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Blend, getBlendColors } from '@/lib/blends'
import { Temperament, TEMPERAMENTS } from '@/lib/temperaments'
import { TemperamentKey } from '@/lib/scoringKey'
import { getSubtypeByBlendKey } from '@/lib/subtypes'
import { getShareText } from '@/lib/share-copy'
import type { ShareLocale } from '@/lib/share-copy'
import { getLocalizedBlendSummary, getQuizCopy } from '@/lib/quiz-i18n'
import { trackFourTypeEvent } from '@/lib/analytics'
import type { FourTypeEventName } from '@/lib/analytics'
import CinematicBackground from '@/components/CinematicBackground'
import ShareableCard from '@/components/ShareableCard'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'

interface SharePageClientProps {
  heroName: string
  blend: Blend
  dominantTemp: Temperament
  scores: { Yellow: number; Red: number; Blue: number; Green: number }
  shareId: string
  locale: ShareLocale
}

const enLabels = {
  is: 'is', breakdown: 'Temperament Breakdown', strengths: 'Key Strengths', question: "What's your temperament?",
  compare: 'Take the Test and Compare', solo: 'Take the Test Without Comparing', storyEyebrow: 'Save the Story Card',
  storyTitle: 'Share the part that makes people say, “wait, that is me.”', storyBody: 'Download a vertical Instagram or TikTok story card with the character, result name, and three painfully accurate lines.',
  challenge: 'Challenge a Friend', copied: 'Copied!', copy: 'Copy Challenge Link', learn: 'Learn More',
  learnPrompt: 'Want to learn more about your temperament?', profile: 'Explore Full Profile', continue: 'Continue Learning',
  deeper: (name: string) => `Dive deeper into understanding ${name}:`,
  footer: 'Understanding your temperament unlocks the key to why you think, feel, and act the way you do.',
}

const idLabels = {
  is: 'adalah', breakdown: 'Sebaran temperamen', strengths: 'Kekuatan utama', question: 'Apa temperamen Anda?',
  compare: 'Ikuti tes dan bandingkan', solo: 'Ikuti tes tanpa membandingkan', storyEyebrow: 'Simpan kartu cerita',
  storyTitle: 'Bagikan bagian yang membuat orang berkata, “ini benar-benar saya.”', storyBody: 'Unduh kartu vertikal untuk Instagram atau TikTok yang memuat karakter, nama hasil, dan tiga kalimat yang terasa sangat akurat.',
  challenge: 'Tantang seorang teman', copied: 'Disalin!', copy: 'Salin tautan tantangan', learn: 'Pelajari lebih lanjut',
  learnPrompt: 'Ingin memahami temperamen Anda lebih dalam?', profile: 'Buka profil lengkap', continue: 'Lanjutkan belajar',
  deeper: (name: string) => `Pelajari ${name} lebih dalam:`,
  footer: 'Memahami temperamen membantu Anda mengenali alasan di balik cara berpikir, merasa, dan bertindak.',
}

export default function SharePageClient({ 
  heroName, 
  blend, 
  dominantTemp, 
  scores,
  shareId,
  locale,
}: SharePageClientProps) {
  const blendColors = getBlendColors(blend)
  const primaryColor = blendColors.primary
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const [copied, setCopied] = useState(false)
  const subtype = getSubtypeByBlendKey(blend.key)
  const labels = locale === 'id' ? idLabels : enLabels
  const resultCopy = getLocalizedBlendSummary(locale, blend.key)
  const quizCopy = getQuizCopy(locale)
  const displayName = resultCopy?.name ?? blend.name
  const displayBlend = resultCopy?.blend ?? blend.blend
  const displayClass = resultCopy?.rpgClass ?? blend.rpgClass
  const displayTagline = resultCopy?.tagline ?? blend.tagline
  const displayStrengths = resultCopy?.strengths ?? blend.strengths
  const localePrefix = locale === 'en' ? '' : `/${locale}`
  const homeHref = localePrefix || '/'
  const comparePath = `${localePrefix}/quiz?compare=${shareId}`
  const compareUrl = `https://www.fourtype.com${comparePath}`

  const trackSharePageEvent = (event: FourTypeEventName, source: string) => {
    trackFourTypeEvent({
      event,
      locale,
      blendKey: blend.key,
      resultName: blend.name,
      shareId,
      source,
    })
  }
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(compareUrl)
      trackSharePageEvent('invite-copy', 'share-page-challenge-copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = compareUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      trackSharePageEvent('invite-copy', 'share-page-challenge-copy-fallback')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  
  const handleShare = async () => {
    const shareData = {
      title: locale === 'id' ? `Bandingkan FourType Anda dengan ${heroName}` : `Compare your FourType with ${heroName}`,
      text: locale === 'id'
        ? `${getShareText(blend, undefined, locale)} Ikuti tes agar kita dapat membandingkan kekuatan bersama, kemungkinan gesekan, dan gaya komunikasi.`
        : `${getShareText(blend, undefined, locale)} Take the test so we can compare our shared strengths, likely friction, and communication style.`,
      url: compareUrl,
    }
    
    if (navigator.share) {
      try {
        await navigator.share(shareData)
        trackSharePageEvent('invite-share', 'share-page-challenge-share')
      } catch {
        // User cancelled or error
      }
    } else {
      handleCopy()
    }
  }

  // Get reading resources based on the dominant temperament
  const readingResources = getReadingResources(blend.primary, blend.key, locale)

  return (
    <main className="relative min-h-screen flex flex-col items-center px-4 pt-8 pb-16" style={{ background: '#0D0D0F' }}>
      <CinematicBackground temperament={blend.primary} />
      
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center gap-8">
        {/* FourType branding */}
        <Link href={homeHref} className="flex items-center gap-2 group">
          <Image
            src="/icon.png"
            alt="FourType"
            width={32}
            height={32}
            className="opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-serif text-sm tracking-[0.3em] uppercase text-[#64748B] group-hover:text-[#94A3B8] transition-colors">
            FourType
          </span>
        </Link>

        {/* Character reveal card */}
        <div
          className="w-full rounded-2xl border overflow-hidden"
          style={{
            backgroundColor: 'rgba(13, 13, 15, 0.95)',
            borderColor: primaryColor,
            boxShadow: `0 0 60px ${primaryColor}30, 0 0 100px ${primaryColor}15`,
          }}
        >
          {/* Header with character */}
          <div 
            className="relative p-8 flex flex-col items-center text-center"
            style={{
              background: `linear-gradient(180deg, ${primaryColor}15 0%, transparent 100%)`,
            }}
          >
            {/* Animated glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-30 blur-3xl"
              style={{ backgroundColor: primaryColor }}
            />
            
            {/* Character image */}
            <div
              className="relative w-40 h-48 rounded-xl flex items-center justify-center mb-4 border-2 overflow-hidden"
              style={{
                borderColor: primaryColor,
                backgroundColor: `${primaryColor}15`,
              }}
            >
              <Image
                src={dominantTemp.characterImage}
                alt={displayName}
                width={140}
                height={170}
                className="object-contain"
                style={{ filter: `drop-shadow(0 0 20px ${primaryColor}60)` }}
              />
            </div>
            
            <p className="font-sans text-xs text-[#64748B] mb-1">{heroName} {labels.is}</p>
            <h1
              className="font-serif text-4xl md:text-5xl font-black mb-2"
              style={{ color: primaryColor, textShadow: `0 0 40px ${primaryColor}50` }}
            >
              {displayName.toUpperCase()}
            </h1>
            <p className="font-serif text-lg text-[#E2E8F0] mb-3">{displayBlend}</p>
            
            {/* Blend color bar */}
            <div className="flex items-center justify-center gap-1 mb-4">
              <div 
                className="h-2 rounded-full" 
                style={{ backgroundColor: primaryColor, width: '50px' }}
              />
              {blend.secondary !== 'Pure' && (
                <div 
                  className="h-2 rounded-full" 
                  style={{ backgroundColor: blendColors.secondary, width: '35px' }}
                />
              )}
            </div>
            
            {/* RPG Class badge */}
            <div
              className="px-4 py-2 rounded-full border"
              style={{
                borderColor: `${primaryColor}50`,
                backgroundColor: `${primaryColor}15`,
              }}
            >
              <span className="font-serif text-sm font-bold" style={{ color: primaryColor }}>
                {displayClass}
              </span>
            </div>
          </div>
          
          {/* Tagline */}
          <div className="px-8 py-6 border-t" style={{ borderColor: `${primaryColor}20` }}>
            <blockquote
              className="font-serif text-xl text-center italic text-[#E2E8F0]"
              style={{ textShadow: `0 0 30px ${primaryColor}30` }}
            >
              &ldquo;{displayTagline}&rdquo;
            </blockquote>
          </div>
          
          {/* Score breakdown */}
          <div className="px-8 py-6 border-t" style={{ borderColor: `${primaryColor}20` }}>
            <p className="font-serif text-xs tracking-widest uppercase text-[#64748B] mb-4 text-center">
              {labels.breakdown}
            </p>
            <div className="flex gap-0.5 h-4 rounded-full overflow-hidden mb-3" style={{ backgroundColor: '#1A1A2E' }}>
              {(['Yellow', 'Red', 'Blue', 'Green'] as TemperamentKey[]).map((key) => {
                const colors: Record<TemperamentKey, string> = {
                  Yellow: '#FFD700', Red: '#E63946', Blue: '#4CC9F0', Green: '#52B788',
                }
                const pct = (scores[key] / total) * 100
                return (
                  <div
                    key={key}
                    className="transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: colors[key],
                      opacity: key === blend.primary ? 1 : 0.4,
                    }}
                  />
                )
              })}
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              {(['Yellow', 'Red', 'Blue', 'Green'] as TemperamentKey[]).map((key) => {
                const t = TEMPERAMENTS[key]
                const pct = Math.round((scores[key] / total) * 100)
                const isMain = key === blend.primary
                return (
                  <div key={key} className={`flex flex-col items-center ${isMain ? '' : 'opacity-60'}`}>
                    <span className="font-serif text-xs font-bold" style={{ color: t.colorHex }}>{pct}%</span>
                    <span className="font-sans text-[9px] text-[#64748B]">{quizCopy.results.temperamentNames[key]}</span>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Key strengths */}
          <div className="px-8 py-6 border-t" style={{ borderColor: `${primaryColor}20` }}>
            <p className="font-serif text-xs tracking-widest uppercase text-[#64748B] mb-4">
              {labels.strengths}
            </p>
            <ul className="flex flex-col gap-2">
              {displayStrengths.slice(0, 4).map((s, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-sm text-[#94A3B8] leading-relaxed">
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          
          {/* CTA */}
          <div className="px-8 py-8 border-t" style={{ borderColor: `${primaryColor}20` }}>
            <p className="font-sans text-center text-sm text-[#64748B] mb-4">
              {labels.question}
            </p>
            <Link
              href={comparePath}
              className="block w-full font-serif text-sm font-bold tracking-widest uppercase py-4 rounded-xl border-2 text-center transition-all duration-200"
              style={{
                borderColor: primaryColor,
                color: '#0D0D0F',
                backgroundColor: primaryColor,
              }}
            >
              {labels.compare}
            </Link>
            <Link
              href={`${localePrefix}/quiz`}
              className="mt-3 block w-full font-serif text-sm font-bold tracking-widest uppercase py-4 rounded-xl border-2 text-center transition-all duration-200"
              style={{
                borderColor: `${primaryColor}66`,
                color: primaryColor,
                backgroundColor: `${primaryColor}10`,
              }}
            >
              {labels.solo}
            </Link>
          </div>
        </div>
        
        {/* Story card for resharing */}
        <div
          className="w-full rounded-2xl border p-5 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.82)', borderColor: `${primaryColor}35` }}
        >
          <div className="flex flex-col gap-2">
            <p className="font-serif text-xs tracking-widest uppercase" style={{ color: primaryColor }}>
              {labels.storyEyebrow}
            </p>
            <h2 className="font-serif text-2xl font-black leading-tight text-[#E2E8F0]">
              {labels.storyTitle}
            </h2>
            <p className="font-sans text-sm leading-relaxed text-[#94A3B8]">
              {labels.storyBody}
            </p>
          </div>
          <ShareableCard heroName={heroName} temperament={dominantTemp} scores={scores} locale={locale} />
        </div>

        {/* Share actions */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={handleShare}
            className="w-full flex items-center justify-center gap-2 font-serif text-sm font-bold tracking-widest uppercase py-4 rounded-xl border-2 transition-all duration-200 cursor-pointer"
            style={{
              borderColor: primaryColor,
              color: primaryColor,
              backgroundColor: 'transparent',
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {labels.challenge}
          </button>
          
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 font-sans text-xs py-3 rounded-xl border transition-all duration-200 cursor-pointer"
            style={{
              borderColor: '#2A2A40',
              color: '#64748B',
              backgroundColor: 'transparent',
            }}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {labels.copied}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {labels.copy}
              </>
            )}
          </button>
        </div>

        {/* Video Section */}
        <div
          className="w-full rounded-2xl border overflow-hidden"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          <div className="p-4 border-b" style={{ borderColor: '#2A2A40' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-serif text-sm tracking-widest uppercase" style={{ color: primaryColor }}>
                {labels.learn}
              </p>
            </div>
          </div>
          <YouTubeEmbed videoId="MFi57x7BBXE" title="Why Study Temperaments - FourType" className="rounded-none border-0" />
        </div>

        {/* Learn More CTA */}
        <div className="w-full text-center p-6 rounded-2xl border" style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}>
          <p className="text-muted-foreground mb-4 font-sans text-sm">{labels.learnPrompt}</p>
          <Link
            href={subtype ? `/subtype/${subtype.slug}` : '/subtypes'}
            className="inline-block px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 font-serif"
            style={{
              backgroundColor: primaryColor,
              color: '#0D0D0F',
            }}
          >
            {labels.profile}
          </Link>
        </div>

        {/* Reading Resources */}
        <div
          className="w-full rounded-2xl border p-6 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="font-serif text-sm tracking-widest uppercase" style={{ color: primaryColor }}>
              {labels.continue}
            </p>
          </div>
          
          <p className="font-sans text-sm text-[#64748B]">
            {labels.deeper(displayName)}
          </p>
          
          <div className="flex flex-col gap-2">
            {readingResources.map((resource, i) => (
              <Link
                key={i}
                href={resource.href}
                className="group flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 hover:border-opacity-50"
                style={{ 
                  borderColor: `${primaryColor}20`,
                  backgroundColor: `${primaryColor}05`,
                }}
              >
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${primaryColor}15` }}
                >
                  <span className="font-serif text-xs font-bold" style={{ color: primaryColor }}>
                    {i + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-sm text-[#E2E8F0] group-hover:text-white transition-colors truncate">
                    {resource.title}
                  </p>
                  <p className="font-sans text-xs text-[#64748B] truncate">{resource.description}</p>
                </div>
                <svg 
                  className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                  style={{ color: primaryColor }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer branding */}
        <div className="flex flex-col items-center gap-2 pt-4">
          <Link href={homeHref} className="flex items-center gap-2">
            <Image src="/icon.png" alt="FourType" width={24} height={24} className="opacity-60" />
            <span className="font-serif text-xs tracking-[0.2em] uppercase text-[#3A3A50]">FourType.com</span>
          </Link>
          <p className="font-sans text-[10px] text-[#2A2A40]">
            {labels.footer}
          </p>
        </div>
      </div>
    </main>
  )
}

function getReadingResources(primaryKey: TemperamentKey, blendKey: string, locale: ShareLocale) {
  const temperamentMap: Record<TemperamentKey, { name: string; slug: string }> = {
    Yellow: { name: 'Sanguine', slug: 'sanguine' },
    Red: { name: 'Choleric', slug: 'choleric' },
    Blue: { name: 'Melancholic', slug: 'melancholic' },
    Green: { name: 'Phlegmatic', slug: 'phlegmatic' },
  }
  
  const temp = temperamentMap[primaryKey]
  const subtype = getSubtypeByBlendKey(blendKey)
  const localizedName = ({ Yellow: 'Sanguinis', Red: 'Koleris', Blue: 'Melankolis', Green: 'Plegmatis' } as const)[primaryKey]

  if (locale === 'id') {
    return [
      ...(subtype ? [{ title: `${localizedName}: Perpaduan lengkap`, description: 'Pelajari pola utama dan sekunder Anda secara lebih khusus.', href: `/subtype/${subtype.slug}` }] : []),
      { title: `Panduan lengkap ${localizedName}`, description: 'Pelajari kekuatan, tantangan, pekerjaan, dan hubungan.', href: `/temperament/${temp.slug}` },
      { title: `Artikel ${localizedName}`, description: 'Penjelasan mendalam dengan langkah pertumbuhan praktis.', href: `/blog/${temp.slug}` },
      { title: '16 pola FourType', description: 'Pahami semua perpaduan termasuk hasil Anda.', href: '/blog/subtypes' },
      { title: 'Sejarah empat temperamen', description: 'Dari dunia kuno hingga psikologi modern.', href: '/blog/history-of-temperaments' },
    ].slice(0, 5)
  }
  
  return [
    ...(subtype ? [
      {
        title: `${subtype.name}: Full Subtype Profile`,
        description: subtype.tagline,
        href: `/subtype/${subtype.slug}`,
      },
    ] : []),
    {
      title: `${temp.name} Temperament: Complete Guide`,
      description: `Deep dive into the ${temp.name} personality`,
      href: `/temperament/${temp.slug}`,
    },
    {
      title: `${temp.name} Blog: Traits, Strengths & Growth`,
      description: 'Detailed article with practical tips',
      href: `/blog/${temp.slug}`,
    },
    {
      title: 'The 16 FourTypes Explained',
      description: 'Understand all the blends including yours',
      href: '/blog/subtypes',
    },
    {
      title: 'History of the 4 Temperaments',
      description: 'From Hippocrates to modern psychology',
      href: '/blog/history-of-temperaments',
    },
  ].slice(0, 5)
}
