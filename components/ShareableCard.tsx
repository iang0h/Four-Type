'use client'

import React, { useRef, useCallback, useState } from 'react'
import { Temperament, TEMPERAMENTS } from '@/lib/temperaments'
import { TemperamentKey, getDominantAndSecondary, resolveBlend } from '@/lib/scoringKey'
import { BLENDS, getBlendColors } from '@/lib/blends'
import { getShareText } from '@/lib/share-copy'
import { getLocalizedBlendSummary, getQuizCopy, type QuizLocale } from '@/lib/quiz-i18n'

interface ShareableCardProps {
  heroName: string
  temperament: Temperament
  scores: { Yellow: number; Red: number; Blue: number; Green: number }
  locale?: QuizLocale
}

export default function ShareableCard({ heroName, temperament, scores, locale = 'en' }: ShareableCardProps) {
  const [cardMode, setCardMode] = useState<'square' | 'story'>('story')
  const [dominant, secondary] = getDominantAndSecondary(scores)
  const secTemperament = TEMPERAMENTS[secondary]
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const dominantPct = Math.round((scores[dominant] / total) * 100)
  const secondaryPct = Math.round((scores[secondary] / total) * 100)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Resolve blend
  const blendResult = resolveBlend(scores)
  const blend = BLENDS[blendResult.blendKey]
  const localizedBlend = getLocalizedBlendSummary(locale, blend.key)
  const quizCopy = getQuizCopy(locale)
  const displayName = localizedBlend?.name ?? blend.name
  const displayBlend = localizedBlend?.blend ?? blend.blend
  const displayClass = localizedBlend?.rpgClass ?? blend.rpgClass
  const displayStrengths = localizedBlend?.strengths ?? blend.strengths
  const blendColors = getBlendColors(blend)
  const storyBullets = getStoryBullets(blend.primary, locale)
  const labels = locale === 'id' ? {
    story: 'Cerita', storyCard: 'Kartu cerita', squareCard: 'Kartu persegi', got: 'Saya mendapat', accurate: '3 hal yang sangat akurat',
    question: 'Anda tipe yang mana?', strengths: 'Kekuatan utama', primary: 'Utama', secondary: 'Sekunder',
    copied: 'Disalin!', copy: 'Salin teks', downloaded: 'Diunduh', rendering: 'Membuat...', downloadStory: 'Unduh cerita', downloadCard: 'Unduh kartu',
    copyError: 'Teks tidak dapat disalin. Silakan salin secara manual.', downloadError: 'Kartu tidak dapat diunduh. Silakan ambil tangkapan layar.',
  } : {
    story: 'Story', storyCard: 'Story Card', squareCard: 'Square Card', got: 'I got', accurate: '3 Painfully Accurate Things',
    question: 'What are you?', strengths: 'Key Strengths', primary: 'Primary', secondary: 'Secondary',
    copied: 'Copied!', copy: 'Copy Text', downloaded: 'Downloaded', rendering: 'Rendering...', downloadStory: 'Download Story', downloadCard: 'Download Card',
    copyError: 'Could not copy text. Please copy manually.', downloadError: 'Could not download the card. Please take a screenshot instead.',
  }

  const traits = displayStrengths.slice(0, 3).map((s) => {
    const match = s.match(/^([^—;]+)/)
    return match ? match[1].trim() : s.slice(0, 40)
  })

  const handleCopyText = useCallback(async () => {
    const quizPath = locale === 'en' ? '/quiz' : `/${locale}/quiz`
    const text = getShareText(blend, `https://www.fourtype.com${quizPath}`, locale)
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      // Fallback for browsers without clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        document.body.removeChild(textarea)
        return true
      } catch {
        document.body.removeChild(textarea)
        alert(labels.copyError)
        return false
      }
    }
  }, [blend, labels.copyError, locale])

  const handleDownloadCard = useCallback(async () => {
    if (!cardRef.current) return false

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      const safeName = blend.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      link.download = `fourtype-${safeName}-${cardMode}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      return true
    } catch {
      alert(labels.downloadError)
      return false
    }
  }, [blend.name, cardMode, labels.downloadError])

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Format switch */}
      <div
        className="grid grid-cols-2 gap-1 rounded-xl border p-1"
        style={{
          borderColor: `${blendColors.primary}30`,
          backgroundColor: 'rgba(13, 13, 15, 0.72)',
        }}
      >
        {(['story', 'square'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setCardMode(mode)}
            className="rounded-lg px-3 py-2 font-serif text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
            style={{
              backgroundColor: cardMode === mode ? blendColors.primary : 'transparent',
              color: cardMode === mode ? '#0D0D0F' : '#94A3B8',
            }}
          >
            {mode === 'story' ? labels.storyCard : labels.squareCard}
          </button>
        ))}
      </div>

      {cardMode === 'story' ? (
        <div className="flex justify-center">
          <div
            ref={cardRef}
            className="relative w-full max-w-[360px] aspect-[9/16] overflow-hidden rounded-[28px] border p-5"
            style={{
              backgroundColor: '#08080B',
              borderColor: blendColors.primary,
              boxShadow: `0 0 46px ${blendColors.primary}24`,
            }}
          >
            {/* Story background */}
            <div
              className="absolute inset-0 opacity-80 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 18%, ${blendColors.primary}40 0%, transparent 38%), radial-gradient(circle at 20% 84%, ${blendColors.secondary}28 0%, transparent 42%)`,
              }}
            />
            <div
              className="absolute inset-3 rounded-[22px] pointer-events-none"
              style={{ border: `1px solid ${blendColors.primary}42` }}
            />
            <div
              className="absolute left-1/2 top-[19%] h-[240px] w-[240px] -translate-x-1/2 rounded-full opacity-25 blur-2xl pointer-events-none"
              style={{ backgroundColor: blendColors.primary }}
            />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg font-serif text-lg font-black"
                    style={{ backgroundColor: blendColors.primary, color: '#08080B' }}
                  >
                    F
                  </div>
                  <p className="font-serif text-[11px] tracking-[0.34em] uppercase text-[#CBD5E1]">FourType</p>
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#64748B]">{labels.story}</p>
              </div>

              <div className="mt-5 flex flex-1 flex-col items-center text-center">
                <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#64748B]">
                  {labels.got}
                </p>
                <h2
                  className="mt-1 font-serif text-[34px] font-black uppercase leading-[0.95] tracking-normal"
                  style={{ color: blendColors.primary, textShadow: `0 0 30px ${blendColors.primary}50` }}
                >
                  {displayName}
                </h2>
                <p className="mt-2 font-serif text-sm text-[#E2E8F0]">{displayBlend}</p>

                <div className="relative mt-4 flex h-[210px] w-full items-end justify-center">
                  <div
                    className="absolute bottom-0 h-[150px] w-[150px] rounded-full opacity-30 blur-2xl"
                    style={{ backgroundColor: blendColors.primary }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={temperament.characterImage}
                    alt={temperament.title}
                    crossOrigin="anonymous"
                    className="relative z-10 h-[210px] w-auto object-contain"
                    style={{ filter: `drop-shadow(0 0 22px ${blendColors.primary}55)` }}
                  />
                </div>

                <div className="mt-4 w-full rounded-2xl border p-4 text-left" style={{ borderColor: `${blendColors.primary}38`, backgroundColor: '#FFFFFF0D' }}>
                  <p className="mb-3 font-serif text-[10px] uppercase tracking-[0.24em] text-[#64748B]">
                    {labels.accurate}
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {storyBullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: blendColors.primary }}
                        />
                        <p className="font-sans text-[13px] leading-snug text-[#E2E8F0]">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border px-4 py-3" style={{ borderColor: `${blendColors.primary}42`, backgroundColor: `${blendColors.primary}14` }}>
                <p className="text-center font-serif text-[17px] font-black leading-tight text-[#F8FAFC]">
                  {labels.question}
                </p>
                <p className="mt-1 text-center font-sans text-[12px] tracking-[0.18em] text-[#CBD5E1]">
                  fourtype.com
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl p-4 w-full"
          style={{
            backgroundColor: '#0D0D0F',
            border: `2px solid ${blendColors.primary}`,
          }}
        >
          {/* Glow background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${blendColors.primary}40 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            {/* Character image */}
            <div
              className="shrink-0 w-16 h-20 rounded-xl flex items-center justify-center border-2 overflow-hidden"
              style={{
                borderColor: blendColors.primary,
                backgroundColor: `${blendColors.primary}15`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={temperament.characterImage}
                alt={temperament.title}
                crossOrigin="anonymous"
                style={{ height: '68px', width: 'auto', objectFit: 'contain' }}
              />
            </div>

            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <p className="font-sans text-[11px] text-[#64748B] truncate">{heroName}</p>
              <h2
                className="font-serif text-xl font-black leading-tight break-words"
                style={{ color: blendColors.primary }}
              >
                {displayName.toUpperCase()}
              </h2>
              <p className="font-sans text-xs text-[#94A3B8] leading-snug">
                {displayBlend}
              </p>
              <p className="font-sans text-[11px] text-[#64748B] leading-snug">
                {displayClass}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${blendColors.primary}40, transparent)` }}
          />

          {/* Key Traits */}
          <div className="flex flex-col gap-2">
            <p className="font-serif text-[9px] tracking-[0.3em] uppercase text-[#64748B]">{labels.strengths}</p>
            {traits.map((trait, i) => (
              <div key={i} className="flex items-start gap-2">
                <div
                  className="shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                  style={{ backgroundColor: blendColors.primary }}
                />
                <p className="font-sans text-sm text-[#E2E8F0] leading-snug">{trait}</p>
              </div>
            ))}
          </div>

          {/* Score summary */}
          <div className="flex gap-2">
            <div
              className="flex-1 rounded-lg px-3 py-2 border"
              style={{ borderColor: `${blendColors.primary}40`, backgroundColor: `${blendColors.primary}10` }}
            >
              <p className="font-sans text-[9px] uppercase tracking-wider text-[#64748B]">{labels.primary}</p>
              <p className="font-serif text-sm font-bold" style={{ color: blendColors.primary }}>
                {quizCopy.results.temperamentNames[dominant]} <span className="text-[#94A3B8] font-normal">({dominantPct}%)</span>
              </p>
            </div>
            <div
              className="flex-1 rounded-lg px-3 py-2 border"
              style={{ borderColor: `${blendColors.secondary}30`, backgroundColor: `${blendColors.secondary}08` }}
            >
              <p className="font-sans text-[9px] uppercase tracking-wider text-[#64748B]">{labels.secondary}</p>
              <p className="font-serif text-sm font-bold" style={{ color: blendColors.secondary }}>
                {quizCopy.results.temperamentNames[secondary]} <span className="text-[#94A3B8] font-normal">({secondaryPct}%)</span>
              </p>
            </div>
          </div>

          {/* Score bar */}
          <div className="flex gap-0.5 h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#1A1A2E' }}>
            {(['Yellow', 'Red', 'Blue', 'Green'] as TemperamentKey[]).map((key) => {
              const colors: Record<TemperamentKey, string> = {
                Yellow: '#FFD700', Red: '#E63946', Blue: '#4CC9F0', Green: '#52B788',
              }
              const t = Object.values(scores).reduce((a, b) => a + b, 0)
              const pct = (scores[key] / t) * 100
              return (
                <div
                  key={key}
                  style={{
                    width: `${pct}%`,
                    backgroundColor: colors[key],
                    opacity: key === temperament.key ? 1 : 0.35,
                  }}
                />
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="font-serif text-[9px] tracking-[0.15em] uppercase text-[#3A3A50]">FourType</p>
            <p className="font-sans text-[9px] text-[#3A3A50]">fourtype.com</p>
          </div>
        </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <ShareTextButton color={blendColors.primary} onCopy={handleCopyText} copiedLabel={labels.copied} copyLabel={labels.copy} />
        <DownloadCardButton
          color={blendColors.primary}
          onDownload={handleDownloadCard}
          label={cardMode === 'story' ? labels.downloadStory : labels.downloadCard}
          downloadedLabel={labels.downloaded}
          renderingLabel={labels.rendering}
        />
      </div>
    </div>
  )
}

function getStoryBullets(primary: TemperamentKey, locale: QuizLocale) {
  if (locale === 'id') {
    const idBullets: Record<TemperamentKey, string[]> = {
      Red: ['Mengambil kendali sebelum diminta.', 'Lebih membenci rencana kabur daripada kerja keras.', 'Merasa tenang ketika langkah berikutnya jelas.'],
      Yellow: ['Mengubah keheningan menjadi panggung.', 'Membutuhkan semangat lebih daripada izin.', 'Merasa bosan sebelum mau mengakuinya.'],
      Blue: ['Melihat kekurangan yang terlewat orang lain.', 'Menyebutnya standar, bukan berpikir berlebihan.', 'Membutuhkan makna sebelum bergerak.'],
      Green: ['Menjaga damai sampai batasnya habis.', 'Terlihat santai sambil memperhatikan semuanya.', 'Berkata ya lalu membutuhkan waktu sendiri.'],
    }
    return idBullets[primary]
  }
  const bullets: Record<TemperamentKey, string[]> = {
    Red: [
      'Takes charge before anyone asks.',
      'Hates vague plans more than hard work.',
      'Feels calm only when there is a next move.',
    ],
    Yellow: [
      'Turns silence into a stage.',
      'Needs momentum more than permission.',
      'Gets bored before admitting they are bored.',
    ],
    Blue: [
      'Spots flaws nobody else sees.',
      'Calls it standards, not overthinking.',
      'Needs meaning before momentum.',
    ],
    Green: [
      'Keeps the peace until they are done.',
      'Looks relaxed while tracking everything.',
      'Says yes, then needs three days alone.',
    ],
  }

  return bullets[primary]
}

function ShareTextButton({
  color,
  onCopy,
  copiedLabel,
  copyLabel,
}: {
  color: string
  onCopy: () => Promise<boolean>
  copiedLabel: string
  copyLabel: string
}) {
  const [copied, setCopied] = useState(false)
  const [copying, setCopying] = useState(false)

  const handleClick = async () => {
    if (copying) return
    setCopying(true)
    try {
      const success = await onCopy()
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } finally {
      setCopying(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      className="flex-1 flex items-center justify-center gap-2 font-serif text-xs font-bold tracking-widest uppercase py-3 rounded-xl border transition-all duration-200 cursor-pointer"
      style={{
        borderColor: `${color}40`,
        color: color,
        backgroundColor: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.backgroundColor = `${color}10`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}40`
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {copiedLabel}
        </>
      ) : (
        <>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          {copyLabel}
        </>
      )}
    </button>
  )
}

function DownloadCardButton({
  color,
  label,
  onDownload,
  downloadedLabel,
  renderingLabel,
}: {
  color: string
  label: string
  onDownload: () => Promise<boolean>
  downloadedLabel: string
  renderingLabel: string
}) {
  const [downloaded, setDownloaded] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleClick = async () => {
    if (downloading) return
    setDownloading(true)
    try {
      const success = await onDownload()
      if (success) {
        setDownloaded(true)
        setTimeout(() => setDownloaded(false), 2000)
      }
    } finally {
      setDownloading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={downloading}
      className="flex-1 flex items-center justify-center gap-2 font-serif text-xs font-bold tracking-widest uppercase py-3 rounded-xl border transition-all duration-200 cursor-pointer disabled:cursor-wait disabled:opacity-70"
      style={{
        borderColor: `${color}40`,
        color,
        backgroundColor: `${color}08`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.backgroundColor = `${color}12`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}40`
        e.currentTarget.style.backgroundColor = `${color}08`
      }}
    >
      {downloaded ? (
        <>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {downloadedLabel}
        </>
      ) : (
        <>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
          </svg>
          {downloading ? renderingLabel : label}
        </>
      )}
    </button>
  )
}
