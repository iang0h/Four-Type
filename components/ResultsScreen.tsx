'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import type { FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ScoreMap, TemperamentKey, getDominantAndSecondary, getMaskingWarning, resolveBlend } from '@/lib/scoringKey'
import { TEMPERAMENTS } from '@/lib/temperaments'
import { BLENDS, type BlendKey, getBlendColors } from '@/lib/blends'
import { getSubtypeByBlendKey } from '@/lib/subtypes'
import { getLocalizedBlendSummary, type QuizCopy, type QuizLocale } from '@/lib/quiz-i18n'
import { getShareText } from '@/lib/share-copy'
import { getMisunderstoodLine, getResultOneSentence, getSharePrompts, getWeeklyChallenge } from '@/lib/result-virality'
import { generateShareId, type DecodedShareResult } from '@/lib/share-id'
import { getComparisonInsight } from '@/lib/comparison'
import { trackFourTypeEvent } from '@/lib/analytics'
import ScoreChart from './ScoreChart'
import CinematicBackground from './CinematicBackground'
import ShareableCard from './ShareableCard'

// Get reading resources based on temperament
function getReadingResources(primaryKey: TemperamentKey, blendKey: string) {
  const temperamentMap: Record<TemperamentKey, { name: string; slug: string }> = {
    Yellow: { name: 'Sanguine', slug: 'sanguine' },
    Red: { name: 'Choleric', slug: 'choleric' },
    Blue: { name: 'Melancholic', slug: 'melancholic' },
    Green: { name: 'Phlegmatic', slug: 'phlegmatic' },
  }
  
  const temp = temperamentMap[primaryKey]
  const subtype = getSubtypeByBlendKey(blendKey)
  
  const resources = [
    ...(subtype ? [
      {
        title: `${subtype.name}: Your Exact Subtype`,
        description: subtype.tagline,
        href: `/subtype/${subtype.slug}`,
      },
    ] : []),
    {
      title: `${temp.name} Temperament: Complete Guide`,
      description: `Strengths, challenges, careers & relationships`,
      href: `/temperament/${temp.slug}`,
    },
    {
      title: `${temp.name} Blog: Deep Dive Article`,
      description: 'Detailed exploration with practical tips',
      href: `/blog/${temp.slug}`,
    },
    {
      title: 'The 16 FourTypes',
      description: 'Understand all the blends including yours',
      href: '/blog/subtypes',
    },
    {
      title: 'History of the 4 Temperaments',
      description: 'From Hippocrates to modern psychology',
      href: '/blog/history-of-temperaments',
    },
  ]

  return resources.slice(0, 5)
}

interface ResultsScreenProps {
  heroName: string
  scores: ScoreMap
  onRetake: () => void
  copy: QuizCopy['results']
  locale: QuizLocale
  comparison?: DecodedShareResult | null
}

type Tab = 'strengths' | 'shadow' | 'communication' | 'partners' | 'deeper' | 'growth'

export default function ResultsScreen({ heroName, scores, onRetake, copy, locale, comparison }: ResultsScreenProps) {
  // Resolve the 15-type blend
  const blendResult = resolveBlend(scores)
  const blend = BLENDS[blendResult.blendKey]
  const localizedBlend = getLocalizedBlendSummary(locale, blendResult.blendKey)
  const resultName = localizedBlend?.name ?? blend.name
  const resultBlend = localizedBlend?.blend ?? blend.blend
  const resultRpgClass = localizedBlend?.rpgClass ?? blend.rpgClass
  const resultTagline = localizedBlend?.tagline ?? blend.tagline
  const resultDrive = localizedBlend?.drive ?? blend.drive
  const resultLore = localizedBlend?.lore ?? blend.lore
  const resultStrengths = localizedBlend?.strengths ?? blend.strengths
  const resultShadows = localizedBlend?.shadows ?? blend.shadows
  const resultUnderStress = localizedBlend?.underStress ?? blend.underStress
  const resultSpeakTo = localizedBlend?.speakTo ?? blend.speakTo
  const resultNeverDo = localizedBlend?.neverDo ?? blend.neverDo
  const blendColors = getBlendColors(blend)
  const resultOneSentence = getResultOneSentence(blend)
  const misunderstoodLine = getMisunderstoodLine(blend)
  const weeklyChallenge = getWeeklyChallenge(blend)
  const sharePrompts = getSharePrompts(blend)
  
  // Legacy temperament data for character images and some content
  const [dominant, secondary] = getDominantAndSecondary(scores)
  const masking = getMaskingWarning(scores)
  const t = TEMPERAMENTS[dominant]
  const sec = TEMPERAMENTS[secondary]
  const dominantName = copy.temperamentNames[dominant] ?? t.name
  const dominantTitle = copy.classTitles[dominant] ?? t.title
  const secondaryName = copy.temperamentNames[secondary] ?? sec.name
  const secondaryTitle = copy.classTitles[secondary] ?? sec.title
  
  // Primary color for styling (from blend)
  const primaryColor = blendColors.primary
  const secondaryColor = blendColors.secondary

  const [revealed, setRevealed] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('strengths')
  const [showShareCard, setShowShareCard] = useState(false)
  const [viewingClass, setViewingClass] = useState<TemperamentKey | null>(null)
  const [linkCopied, setLinkCopied] = useState(false)
  const [leadEmail, setLeadEmail] = useState('')
  const [leadWebsite, setLeadWebsite] = useState('')
  const [leadStatus, setLeadStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const resultTrackedKey = useRef('')
  const viewingTemp = viewingClass ? TEMPERAMENTS[viewingClass] : null
  
  // Generate shareable URL
  const shareId = useMemo(() => generateShareId(heroName, blendResult.blendKey, scores), [heroName, blendResult.blendKey, scores])
  const shareUrl = `https://www.fourtype.com/share/${shareId}`
  const compareUrl = `https://www.fourtype.com/quiz?compare=${shareId}`
  const readingResources = useMemo(() => getReadingResources(dominant, blendResult.blendKey), [dominant, blendResult.blendKey])
  const friendBlend = comparison ? BLENDS[comparison.blendKey as BlendKey] : null
  const comparisonInsight = friendBlend ? getComparisonInsight(blend, friendBlend) : null

  const trackShareEvent = (event: 'share-click' | 'copy-link', source: string) => {
    trackFourTypeEvent({
      event,
      locale,
      blendKey: blendResult.blendKey,
      resultName,
      shareId,
      compareWith: comparison?.blendKey,
      source,
    })
  }
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      trackShareEvent('copy-link', 'result-copy-link')
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = shareUrl
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      trackShareEvent('copy-link', 'result-copy-link-fallback')
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    }
  }
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I am ${resultName}!`,
          text: getShareText(blend),
          url: shareUrl,
        })
        trackShareEvent('share-click', 'result-native-share')
      } catch {
        // User cancelled
      }
    } else {
      handleCopyLink()
    }
  }

  const handlePromptShare = async (prompt: string) => {
    const promptText = `${prompt}\n\n${getShareText(blend)}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `I got ${resultName} on FourType`,
          text: promptText,
          url: shareUrl,
        })
        trackShareEvent('share-click', 'result-prompt-share')
        return
      } catch {
        // User cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(`${promptText}\n\n${shareUrl}`)
      trackShareEvent('copy-link', 'result-prompt-copy')
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch {
      handleCopyLink()
    }
  }

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (leadStatus === 'submitting') return

    setLeadStatus('submitting')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: leadEmail,
          website: leadWebsite,
          heroName,
          locale,
          blendKey: blendResult.blendKey,
          resultName,
          resultBlend,
          scores,
          shareUrl,
          source: 'quiz-result',
          consentText: copy.leadCapture.consent,
        }),
      })

      if (!response.ok) {
        throw new Error('Lead capture failed.')
      }

      setLeadStatus('success')
      setLeadEmail('')
    } catch {
      setLeadStatus('error')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const trackingKey = `${comparison ? 'compare-result' : 'quiz-result'}:${shareId}:${comparison?.blendKey || ''}`

    if (resultTrackedKey.current === trackingKey) return

    resultTrackedKey.current = trackingKey
    trackFourTypeEvent({
      event: comparison ? 'compare-result' : 'quiz-result',
      locale,
      blendKey: blendResult.blendKey,
      resultName,
      shareId,
      compareWith: comparison?.blendKey,
      source: comparison ? 'compare-quiz-result' : 'quiz-result',
    })
  }, [blendResult.blendKey, comparison, locale, resultName, shareId])

  function getInterpretation(): string {
    if (blendResult.flag === 'pure') {
      return copy.interpretation.pure(dominantName)
    }
    if (blendResult.flag === 'bilingual') {
      return copy.interpretation.bilingual(dominantName, secondaryName)
    }
    if (masking === 'diagonal') {
      return copy.interpretation.diagonal
    }
    return resultDrive
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'strengths', label: copy.tabs.strengths },
    { key: 'shadow', label: copy.tabs.shadow },
    { key: 'deeper', label: copy.tabs.deeper },
    { key: 'communication', label: copy.tabs.communication },
    { key: 'partners', label: copy.tabs.partners },
    { key: 'growth', label: copy.tabs.growth },
  ]

  return (
    <main
      className="relative min-h-screen flex flex-col items-center px-4 pt-8 pb-16 gap-8"
      style={{ background: '#0D0D0F' }}
    >
      <CinematicBackground temperament={dominant} />

      <div className="relative z-10 w-full max-w-xl flex flex-col gap-8">
        {/* HERO REVEAL WITH CHARACTER */}
        <div
          className="flex flex-col items-center gap-6 text-center"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
            transition: 'opacity 0.8s cubic-bezier(0.34,1.56,0.64,1), transform 0.8s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-[#64748B]">
            {copy.characterClass}
          </p>

          {/* Character illustration with animated glow */}
          <div className="relative">
            {/* Animated glow ring */}
            <div
              className="absolute inset-0 rounded-full opacity-50 blur-3xl"
              style={{
                background: `radial-gradient(circle, ${primaryColor}60 0%, transparent 70%)`,
                animation: 'pulse-glow 3s ease-in-out infinite',
              }}
            />
            
            {/* Rotating border effect */}
            <div
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-full flex items-center justify-center p-1"
              style={{
                background: `conic-gradient(from 0deg, ${primaryColor}, transparent, ${primaryColor})`,
                animation: 'rotate 12s linear infinite',
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: '#0D0D0F',
                  boxShadow: `0 0 60px ${primaryColor}40, inset 0 0 30px ${primaryColor}15`,
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  <Image
                    src={t.characterImage}
                    alt={resultName}
                    width={160}
                    height={160}
                    loading="eager"
                    className="object-contain"
                    style={{
                      filter: `drop-shadow(0 0 20px ${primaryColor}60)`,
                      width: 'auto',
                      height: 'auto',
                      maxWidth: '100%',
                      maxHeight: '140px',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Sparkle decorations */}
            <div
              className="absolute top-2 right-4 w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }}
            />
            <div
              className="absolute bottom-4 left-2 w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: primaryColor, boxShadow: `0 0 8px ${primaryColor}`, animationDelay: '0.5s' }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-serif text-sm text-[#64748B]">
              {copy.youAre(heroName)}
            </p>
            <h1
              className="font-serif text-4xl md:text-5xl font-black text-balance"
              style={{ color: primaryColor, textShadow: `0 0 40px ${primaryColor}50` }}
            >
              {resultName.toUpperCase()}
            </h1>
            <p
              className="font-serif text-base font-semibold"
              style={{ color: '#E2E8F0' }}
            >
              {resultBlend}
            </p>
            {/* Dual color stripe showing the blend */}
            <div className="flex items-center justify-center gap-1 mt-2">
              <div 
                className="h-1.5 rounded-full" 
                style={{ backgroundColor: primaryColor, width: '40px' }}
              />
              {blend.secondary !== 'Pure' && (
                <div 
                  className="h-1.5 rounded-full" 
                  style={{ backgroundColor: secondaryColor, width: '30px' }}
                />
              )}
            </div>
          </div>

          {/* RPG Class badge */}
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-full border"
            style={{
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}10`,
            }}
          >
            <span
              className="font-serif text-sm font-bold"
              style={{ color: primaryColor }}
            >
              {resultRpgClass}
            </span>
          </div>

          {/* Interpretation badge */}
          <div
            className="px-4 py-2 rounded-full border text-xs font-sans text-center max-w-xs"
            style={{
              borderColor: `${primaryColor}40`,
              backgroundColor: `${primaryColor}10`,
              color: '#E2E8F0',
            }}
          >
            {getInterpretation()}
          </div>
          
          {/* MBTI & Enneagram hints */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span
              className="px-2 py-1 rounded text-[10px] font-sans border"
              style={{ borderColor: `${primaryColor}30`, color: '#94A3B8' }}
            >
              Likely MBTI: {blend.mbti.join(' / ')}
            </span>
            <span
              className="px-2 py-1 rounded text-[10px] font-sans border"
              style={{ borderColor: `${primaryColor}30`, color: '#94A3B8' }}
            >
              Enneagram: {blend.enneagram[0]}
            </span>
          </div>
        </div>

        {/* LORE */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-3 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: `${primaryColor}30` }}
        >
          {/* Subtle glow */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: primaryColor }}
          />
          <p className="font-serif text-xs tracking-widest uppercase relative" style={{ color: primaryColor }}>
            {copy.identityLore}
          </p>
          <blockquote
            className="font-sans text-sm text-[#94A3B8] leading-relaxed italic text-pretty relative"
          >
            &ldquo;{resultLore}&rdquo;
          </blockquote>
          <p className="font-sans text-xs text-[#64748B] relative">
            <span style={{ color: primaryColor }}>{copy.coreDrive}:</span> {resultDrive}
          </p>
          <p className="font-sans text-xs text-[#64748B] relative">
            <span style={{ color: primaryColor }}>{copy.tagline}:</span> {resultTagline}
          </p>
        </div>

        {/* QUICK MIRROR */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.84)', borderColor: `${primaryColor}35` }}
        >
          <p className="font-serif text-xs tracking-widest uppercase" style={{ color: primaryColor }}>
            The Part That Usually Lands
          </p>
          <div className="grid gap-3">
            <div className="rounded-xl border p-4" style={{ borderColor: `${primaryColor}25`, backgroundColor: `${primaryColor}08` }}>
              <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Your pattern in one sentence</p>
              <p className="font-sans text-sm text-[#E2E8F0] leading-relaxed">{resultOneSentence}</p>
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: `${primaryColor}25`, backgroundColor: 'rgba(13, 13, 15, 0.52)' }}>
              <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B] mb-1">What people misread</p>
              <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{misunderstoodLine}</p>
            </div>
            <div className="rounded-xl border p-4" style={{ borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}12` }}>
              <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B] mb-1">Your challenge this week</p>
              <p className="font-serif text-lg font-bold leading-snug" style={{ color: primaryColor }}>{weeklyChallenge}</p>
            </div>
          </div>
        </div>

        {/* SCORE CHART */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          <p className="font-serif text-xs tracking-widest uppercase text-[#64748B]">
            {copy.scoreBreakdown}
          </p>
          <ScoreChart scores={scores} dominant={dominant} copy={copy} />

          {/* Secondary */}
          <div
            className="flex items-center gap-3 rounded-lg px-3 py-2 border"
            style={{ borderColor: `${sec.colorHex}30`, backgroundColor: `${sec.colorHex}08` }}
          >
            <Image
              src={sec.characterImage}
              alt={secondaryTitle}
              width={32}
              height={40}
              className="object-contain opacity-70"
              style={{ width: '32px', height: '40px' }}
            />
            <p className="font-sans text-xs text-[#94A3B8]">
              {copy.secondary}: <span className="font-serif font-semibold" style={{ color: sec.colorHex }}>{secondaryTitle}</span>
              <span className="text-[#64748B]"> ({secondaryName})</span>
            </p>
          </div>

          {/* Masking warning */}
          {masking && (
            <div
              className="rounded-lg border px-3 py-2.5 flex gap-2"
              style={{ borderColor: '#E6394650', backgroundColor: '#E6394610' }}
            >
              <span className="text-[#E63946] text-xs mt-0.5 shrink-0">!</span>
              <p className="font-sans text-xs text-[#94A3B8] leading-relaxed">
                {masking === 'diagonal'
                  ? copy.masking.diagonal
                  : copy.masking.general}
              </p>
            </div>
          )}
        </div>

        {friendBlend && comparisonInsight && (
          <div
            className="rounded-2xl border p-5 flex flex-col gap-4 relative overflow-hidden"
            style={{ backgroundColor: 'rgba(26, 26, 46, 0.86)', borderColor: `${primaryColor}35` }}
          >
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-15"
              style={{ backgroundColor: primaryColor }}
            />
            <div className="relative flex flex-col gap-2">
              <p className="font-serif text-xs tracking-widest uppercase" style={{ color: primaryColor }}>
                Compare With {comparison?.heroName}
              </p>
              <h2 className="font-serif text-xl font-black text-[#E2E8F0] leading-tight">
                {resultName} + {friendBlend.name}
              </h2>
              <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">
                {comparisonInsight.headline}
              </p>
            </div>
            <div className="relative grid gap-3">
              {[
                { label: 'Chemistry', body: comparisonInsight.chemistry },
                { label: 'Friction', body: comparisonInsight.friction },
                { label: 'Repair Move', body: comparisonInsight.repair },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border p-4" style={{ borderColor: `${primaryColor}22`, backgroundColor: 'rgba(13, 13, 15, 0.46)' }}>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B] mb-1">{item.label}</p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TABS */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          {/* Tab bar — scrollable on mobile */}
          <div
            className="flex border-b overflow-x-auto scrollbar-none"
            style={{ borderColor: '#2A2A40' }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="shrink-0 px-3 py-3 font-serif text-[11px] font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap"
                style={{
                  color: activeTab === tab.key ? primaryColor : '#64748B',
                  borderBottom: activeTab === tab.key ? `2px solid ${primaryColor}` : '2px solid transparent',
                  backgroundColor: activeTab === tab.key ? `${primaryColor}08` : 'transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5">
            {activeTab === 'strengths' && (
              <ul className="flex flex-col gap-2">
                {resultStrengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-sm text-[#94A3B8] leading-relaxed">
                    <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                    {s}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'shadow' && (
              <ul className="flex flex-col gap-2">
                {resultShadows.map((w, i) => (
                  <li key={i} className="flex items-start gap-3 font-sans text-sm text-[#94A3B8] leading-relaxed">
                    <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                    {w}
                  </li>
                ))}
                <li className="flex items-start gap-3 font-sans text-sm leading-relaxed mt-2 pt-3 border-t" style={{ borderColor: '#2A2A40', color: '#94A3B8' }}>
                  <span className="shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
                  <span><span className="font-semibold text-[#E2E8F0]">{copy.underStress}</span> {resultUnderStress}</span>
                </li>
              </ul>
            )}

            {activeTab === 'communication' && (
              <div className="flex flex-col gap-4">
                <div
                  className="rounded-lg border px-4 py-3"
                  style={{ borderColor: `${primaryColor}40`, backgroundColor: `${primaryColor}08` }}
                >
                  <p className="font-serif text-xs uppercase tracking-widest mb-1" style={{ color: primaryColor }}>
                    {copy.speakTo(resultName)}
                  </p>
                  <p className="font-sans text-sm text-[#E2E8F0] leading-relaxed">
                    {resultSpeakTo}
                  </p>
                </div>
                <div
                  className="rounded-lg border px-4 py-3"
                  style={{ borderColor: '#E6394640', backgroundColor: '#E6394608' }}
                >
                  <p className="font-serif text-xs uppercase tracking-widest mb-1 text-[#E63946]">
                    {copy.neverDo}
                  </p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">
                    {resultNeverDo}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'partners' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-xs uppercase tracking-widest text-[#52B788]">{copy.bestPartners}</p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{t.bestPartners}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-xs uppercase tracking-widest text-[#E63946]">{copy.frictionWith}</p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{t.frictionWith}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-xs uppercase tracking-widest" style={{ color: primaryColor }}>{copy.famous(resultName)}</p>
                  <p className="font-sans text-sm text-[#94A3B8]">{blend.famous.join(', ')}</p>
                </div>
              </div>
            )}

            {activeTab === 'deeper' && (
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <p className="font-serif text-xs uppercase tracking-widest" style={{ color: primaryColor }}>{copy.identityStack}</p>
                  <div className="grid gap-2">
                    <div className="rounded-lg border px-3 py-2" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B]">{copy.primaryDrive}</p>
                      <p className="font-sans text-sm text-[#E2E8F0]">{resultDrive}</p>
                    </div>
                    <div className="rounded-lg border px-3 py-2" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B]">{copy.likelyMbti}</p>
                      <p className="font-sans text-sm text-[#E2E8F0]">{blend.mbti.join(' / ')}</p>
                    </div>
                    <div className="rounded-lg border px-3 py-2" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B]">{copy.enneagramPattern}</p>
                      <p className="font-sans text-sm text-[#E2E8F0]">{blend.enneagram.join(' or ')}</p>
                    </div>
                    <div className="rounded-lg border px-3 py-2" style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#64748B]">{copy.rpgClass}</p>
                      <p className="font-sans text-sm text-[#E2E8F0]">{resultRpgClass}</p>
                    </div>
                  </div>
                  <p className="font-sans text-[10px] text-[#4A5568] italic mt-1">
                    {copy.inferredNote}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-serif text-xs uppercase tracking-widest text-[#FFD700]">{copy.inRelationships}</p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{t.inRelationships}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-serif text-xs uppercase tracking-widest text-[#4CC9F0]">{copy.atWork}</p>
                  <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">{t.atWork}</p>
                </div>
              </div>
            )}

            {activeTab === 'growth' && (
              <div className="flex flex-col gap-4">
                <p className="font-sans text-sm text-[#64748B] italic">
                  {copy.growthIntro}
                </p>
                <ul className="flex flex-col gap-3">
                  {t.growthAreas.map((area, i) => (
                    <li key={i} className="flex items-start gap-3 font-sans text-sm text-[#94A3B8] leading-relaxed">
                      <span 
                        className="shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                      >
                        {i + 1}
                      </span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ALL CLASSES */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-3"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          <p className="font-serif text-xs tracking-widest uppercase text-[#64748B]">
            {copy.allClasses}
          </p>
          <p className="font-sans text-xs text-[#4A5568] -mt-1">
            {copy.tapClass}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {(['Yellow', 'Red', 'Blue', 'Green'] as TemperamentKey[]).map((key) => {
              const cls = TEMPERAMENTS[key]
              const classTitle = copy.classTitles[key] ?? cls.title
              const temperamentName = copy.temperamentNames[key] ?? cls.name
              const isUser = key === dominant
              return (
                <button
                  key={key}
                  onClick={() => setViewingClass(key)}
                  className="rounded-xl border p-3 flex items-center gap-3 relative overflow-hidden text-left transition-all duration-200 cursor-pointer hover:scale-[1.02]"
                  style={{
                    borderColor: isUser ? cls.colorHex : `${cls.colorHex}20`,
                    backgroundColor: isUser ? `${cls.colorHex}12` : `${cls.colorHex}05`,
                  }}
                >
                  {isUser && (
                    <div
                      className="absolute -top-10 -right-10 w-20 h-20 rounded-full opacity-20 blur-2xl"
                      style={{ backgroundColor: cls.colorHex }}
                    />
                  )}
                  <Image
                    src={cls.characterImage}
                    alt={cls.title}
                    width={36}
                    height={44}
                    className="object-contain relative shrink-0"
                    style={{ opacity: isUser ? 1 : 0.6, width: '36px', height: '44px' }}
                  />
                  <div className="flex flex-col gap-0.5 relative min-w-0">
                    <p className="font-serif text-[11px] font-bold leading-tight" style={{ color: cls.colorHex }}>
                      {classTitle}
                      {isUser && <span className="ml-1 text-[8px] opacity-60">{copy.you}</span>}
                    </p>
                    <p className="font-sans text-[10px] text-[#64748B]">{temperamentName}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* SHAREABLE CARD SECTION */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: '#2A2A40' }}
        >
          <div className="flex items-center justify-between">
            <p className="font-serif text-xs tracking-widest uppercase text-[#64748B]">
              {copy.shareResults}
            </p>
            <button
              onClick={() => setShowShareCard(!showShareCard)}
              className="font-sans text-xs px-3 py-1 rounded-full border transition-all cursor-pointer"
              style={{
                borderColor: `${primaryColor}40`,
                color: primaryColor,
              }}
            >
              {showShareCard ? copy.hideCard : copy.showCard}
            </button>
          </div>

          <Link
            href={`/quiz?compare=${shareId}`}
            className="rounded-xl border px-4 py-3 font-sans text-sm text-[#E2E8F0] transition-all hover:text-white"
            style={{ borderColor: `${primaryColor}30`, backgroundColor: `${primaryColor}08` }}
          >
            Compare your result with a friend
            <span className="block text-xs text-[#64748B] mt-1">
              Send them this quiz link so FourType can show how your patterns work together.
            </span>
          </Link>

          {showShareCard && (
            <ShareableCard
              heroName={heroName}
              temperament={t}
              scores={scores}
            />
          )}

          {!showShareCard && (
            <p className="font-sans text-sm text-[#64748B] text-center py-4">
              {copy.shareCardPrompt}
            </p>
          )}

          <div className="border-t pt-4" style={{ borderColor: `${primaryColor}20` }}>
            <p className="font-serif text-xs tracking-widest uppercase mb-3" style={{ color: primaryColor }}>
              Send this to someone who...
            </p>
            <div className="flex flex-col gap-2">
              {sharePrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handlePromptShare(prompt)}
                  className="text-left rounded-lg border px-3 py-2 font-sans text-xs leading-relaxed text-[#94A3B8] transition-all hover:text-[#E2E8F0] cursor-pointer"
                  style={{ borderColor: `${primaryColor}22`, backgroundColor: `${primaryColor}06` }}
                >
                  {prompt}
                </button>
              ))}
            </div>
            {linkCopied && (
              <p className="font-sans text-xs mt-2" style={{ color: primaryColor }}>
                Share text copied.
              </p>
            )}
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(compareUrl)
                  trackShareEvent('copy-link', 'result-compare-link')
                  setLinkCopied(true)
                  setTimeout(() => setLinkCopied(false), 2000)
                } catch {
                  handleCopyLink()
                }
              }}
              className="mt-3 w-full rounded-lg border px-3 py-2 font-sans text-xs text-left text-[#94A3B8] transition-all hover:text-[#E2E8F0] cursor-pointer"
              style={{ borderColor: `${primaryColor}22`, backgroundColor: `${primaryColor}06` }}
            >
              Copy compare-with-me quiz link
            </button>
          </div>
        </div>

        {/* EMAIL CAPTURE */}
        <form
          onSubmit={handleLeadSubmit}
          className="rounded-2xl border p-5 flex flex-col gap-4 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.86)', borderColor: `${primaryColor}35` }}
        >
          <div
            className="absolute -top-16 -right-16 w-36 h-36 rounded-full opacity-15 blur-3xl"
            style={{ backgroundColor: primaryColor }}
          />
          <div className="relative flex flex-col gap-2">
            <p className="font-serif text-xs tracking-widest uppercase" style={{ color: primaryColor }}>
              {copy.leadCapture.eyebrow}
            </p>
            <h2 className="font-serif text-xl font-black text-[#E2E8F0] leading-tight">
              {copy.leadCapture.title}
            </h2>
            <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">
              {copy.leadCapture.body}
            </p>
          </div>

          <input
            type="text"
            name="website"
            value={leadWebsite}
            onChange={(event) => setLeadWebsite(event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="relative flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={leadEmail}
              onChange={(event) => {
                setLeadEmail(event.target.value)
                if (leadStatus === 'error') setLeadStatus('idle')
              }}
              placeholder={copy.leadCapture.placeholder}
              required
              disabled={leadStatus === 'submitting' || leadStatus === 'success'}
              className="min-h-12 flex-1 rounded-xl border px-4 font-sans text-sm text-[#E2E8F0] outline-none transition-all placeholder:text-[#4A5568] disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: 'rgba(13, 13, 15, 0.72)',
                borderColor: `${primaryColor}30`,
              }}
            />
            <button
              type="submit"
              disabled={leadStatus === 'submitting' || leadStatus === 'success'}
              className="min-h-12 rounded-xl px-5 font-serif text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                backgroundColor: primaryColor,
                color: '#0D0D0F',
                boxShadow: `0 0 24px ${primaryColor}20`,
              }}
            >
              {leadStatus === 'submitting' ? copy.leadCapture.submitting : copy.leadCapture.button}
            </button>
          </div>

          <label className="relative flex items-start gap-2 font-sans text-[11px] leading-relaxed text-[#64748B]">
            <input type="checkbox" required className="mt-0.5 accent-[#FFD700]" />
            <span>{copy.leadCapture.consent}</span>
          </label>

          <div className="relative min-h-5">
            {leadStatus === 'success' && (
              <p className="font-sans text-xs leading-relaxed text-[#52B788]">
                {copy.leadCapture.success}
              </p>
            )}
            {leadStatus === 'error' && (
              <p className="font-sans text-xs leading-relaxed text-[#E63946]">
                {copy.leadCapture.error}
              </p>
            )}
            {leadStatus === 'idle' && (
              <p className="font-sans text-xs leading-relaxed text-[#4A5568]">
                {copy.leadCapture.trust}
              </p>
            )}
          </div>
        </form>

        {/* CONTINUE YOUR JOURNEY */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-4"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.8)', borderColor: `${primaryColor}30` }}
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" style={{ color: primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="font-serif text-xs tracking-widest uppercase" style={{ color: primaryColor }}>
              {copy.continueJourney}
            </p>
          </div>
          
          <p className="font-sans text-sm text-[#64748B]">
            {copy.journeyIntro}
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
                  <p className="font-serif text-sm text-[#E2E8F0] group-hover:text-white transition-colors">
                    {resource.title}
                  </p>
                  <p className="font-sans text-xs text-[#64748B]">{resource.description}</p>
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

        {/* FRIEND PROMPT */}
        <div
          className="rounded-2xl border p-5 flex flex-col gap-2"
          style={{ backgroundColor: 'rgba(26, 26, 46, 0.72)', borderColor: `${primaryColor}30` }}
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 h-8 w-8 shrink-0 rounded-full flex items-center justify-center border"
              style={{ borderColor: `${primaryColor}45`, backgroundColor: `${primaryColor}12` }}
            >
              <svg className="h-4 w-4" style={{ color: primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6m-6 8l-4-4V5a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2H7z" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-serif text-sm font-bold text-[#E2E8F0]">
                {copy.friendPrompt.title}
              </p>
              <p className="font-sans text-xs text-[#64748B] leading-relaxed">
                {copy.friendPrompt.body}
              </p>
            </div>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-2 font-serif text-sm font-bold tracking-widest uppercase py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer relative overflow-hidden group"
            style={{
              borderColor: primaryColor,
              color: '#0D0D0F',
              backgroundColor: primaryColor,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = primaryColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor
              e.currentTarget.style.color = '#0D0D0F'
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {copy.shareButton}
          </button>
          
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 font-sans text-xs py-3 rounded-xl border transition-all duration-200 cursor-pointer"
            style={{
              borderColor: linkCopied ? '#52B788' : `${primaryColor}30`,
              color: linkCopied ? '#52B788' : '#94A3B8',
              backgroundColor: linkCopied ? '#52B78810' : 'transparent',
            }}
          >
            {linkCopied ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {copy.copiedButton}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {copy.copyButton}
              </>
            )}
          </button>

          <button
            onClick={onRetake}
            className="w-full font-serif text-sm font-bold tracking-widest uppercase py-3.5 rounded-xl border transition-all duration-200 cursor-pointer"
            style={{
              borderColor: '#2A2A40',
              color: '#64748B',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#64748B'
              e.currentTarget.style.color = '#E2E8F0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#2A2A40'
              e.currentTarget.style.color = '#64748B'
            }}
          >
            {copy.retakeButton}
          </button>
        </div>

          <p className="font-sans text-center text-xs text-[#2A2A40]">
            {copy.footer}
          </p>
      </div>

      {/* CLASS DETAIL MODAL */}
      {viewingTemp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={() => setViewingClass(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border p-5 flex flex-col gap-4"
            style={{
              backgroundColor: '#0D0D0F',
              borderColor: viewingTemp.colorHex,
              boxShadow: `0 0 60px ${viewingTemp.colorHex}30`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setViewingClass(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer"
              style={{ backgroundColor: `${viewingTemp.colorHex}20`, color: viewingTemp.colorHex }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-24 rounded-xl flex items-center justify-center border-2 overflow-hidden shrink-0"
                style={{ borderColor: viewingTemp.colorHex, backgroundColor: `${viewingTemp.colorHex}15` }}
              >
                <Image
                  src={viewingTemp.characterImage}
                  alt={viewingTemp.title}
                  width={80}
                  height={96}
                  className="object-contain w-full h-full"
                  style={{ filter: `drop-shadow(0 0 10px ${viewingTemp.colorHex}60)` }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-2xl font-black" style={{ color: viewingTemp.colorHex }}>
                  {(copy.classTitles[viewingTemp.key] ?? viewingTemp.title).toUpperCase()}
                </h3>
                <p className="font-sans text-sm text-[#94A3B8]">
                  {copy.temperamentNames[viewingTemp.key] ?? viewingTemp.name} &bull; {copy.temperamentLanguages[viewingTemp.key] ?? viewingTemp.language}
                </p>
                <p className="font-sans text-xs text-[#64748B]">{viewingTemp.rpgClass}</p>
              </div>
            </div>

            {/* Lore */}
            <div
              className="rounded-lg border p-3"
              style={{ borderColor: `${viewingTemp.colorHex}30`, backgroundColor: `${viewingTemp.colorHex}08` }}
            >
              <p className="font-sans text-sm text-[#94A3B8] italic leading-relaxed">
                &ldquo;{viewingTemp.lore}&rdquo;
              </p>
            </div>

            {/* Core Need */}
            <div className="flex flex-col gap-1">
              <p className="font-serif text-xs uppercase tracking-widest" style={{ color: viewingTemp.colorHex }}>
                {copy.coreNeed}
              </p>
              <p className="font-sans text-sm text-[#E2E8F0]">{viewingTemp.coreNeed}</p>
            </div>

            {/* Strengths */}
            <div className="flex flex-col gap-2">
              <p className="font-serif text-xs uppercase tracking-widest text-[#52B788]">{copy.strengths}</p>
              <ul className="flex flex-col gap-1">
                {viewingTemp.strengths.slice(0, 4).map((s, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-[#94A3B8]">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: viewingTemp.colorHex }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shadow */}
            <div className="flex flex-col gap-2">
              <p className="font-serif text-xs uppercase tracking-widest text-[#E63946]">{copy.shadowSide}</p>
              <ul className="flex flex-col gap-1">
                {viewingTemp.weaknesses.slice(0, 3).map((w, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-[#94A3B8]">
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            {/* Famous */}
            <div className="flex flex-col gap-1">
              <p className="font-serif text-xs uppercase tracking-widest text-[#64748B]">
                {copy.famous(copy.classTitles[viewingTemp.key] ?? viewingTemp.title)}
              </p>
              <p className="font-sans text-sm text-[#94A3B8]">{viewingTemp.famous.join(', ')}</p>
            </div>

            {viewingClass === dominant && (
              <div
                className="rounded-lg border px-3 py-2 text-center"
                style={{ borderColor: `${viewingTemp.colorHex}40`, backgroundColor: `${viewingTemp.colorHex}10` }}
              >
                <p className="font-serif text-xs font-bold" style={{ color: viewingTemp.colorHex }}>
                  {copy.thisIsDominant}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </main>
  )
}
