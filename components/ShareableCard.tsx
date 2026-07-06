'use client'

import React, { useRef, useCallback, useState } from 'react'
import { Temperament, TEMPERAMENTS } from '@/lib/temperaments'
import { TemperamentKey, getDominantAndSecondary, resolveBlend } from '@/lib/scoringKey'
import { BLENDS, getBlendColors } from '@/lib/blends'
import { getShareText } from '@/lib/share-copy'

interface ShareableCardProps {
  heroName: string
  temperament: Temperament
  scores: { Yellow: number; Red: number; Blue: number; Green: number }
}

export default function ShareableCard({ heroName, temperament, scores }: ShareableCardProps) {
  const [dominant, secondary] = getDominantAndSecondary(scores)
  const secTemperament = TEMPERAMENTS[secondary]
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const dominantPct = Math.round((scores[dominant] / total) * 100)
  const secondaryPct = Math.round((scores[secondary] / total) * 100)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Resolve blend
  const blendResult = resolveBlend(scores)
  const blend = BLENDS[blendResult.blendKey]
  const blendColors = getBlendColors(blend)

  const traits = blend.strengths.slice(0, 3).map((s) => {
    const match = s.match(/^([^—;]+)/)
    return match ? match[1].trim() : s.slice(0, 40)
  })

  const handleCopyText = useCallback(async () => {
    const text = getShareText(blend, 'https://www.fourtype.com/quiz')
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
        alert('Could not copy text. Please copy manually.')
        return false
      }
    }
  }, [blend])

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* The shareable card */}
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
                {blend.name.toUpperCase()}
              </h2>
              <p className="font-sans text-xs text-[#94A3B8] leading-snug">
                {blend.blend}
              </p>
              <p className="font-sans text-[11px] text-[#64748B] leading-snug">
                {blend.rpgClass}
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
            <p className="font-serif text-[9px] tracking-[0.3em] uppercase text-[#64748B]">Key Strengths</p>
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
              <p className="font-sans text-[9px] uppercase tracking-wider text-[#64748B]">Primary</p>
              <p className="font-serif text-sm font-bold" style={{ color: blendColors.primary }}>
                {temperament.name} <span className="text-[#94A3B8] font-normal">({dominantPct}%)</span>
              </p>
            </div>
            <div
              className="flex-1 rounded-lg px-3 py-2 border"
              style={{ borderColor: `${blendColors.secondary}30`, backgroundColor: `${blendColors.secondary}08` }}
            >
              <p className="font-sans text-[9px] uppercase tracking-wider text-[#64748B]">Secondary</p>
              <p className="font-serif text-sm font-bold" style={{ color: blendColors.secondary }}>
                {secTemperament.name} <span className="text-[#94A3B8] font-normal">({secondaryPct}%)</span>
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

      {/* Action button */}
      <ShareTextButton color={blendColors.primary} onCopy={handleCopyText} />
    </div>
  )
}

function ShareTextButton({
  color,
  onCopy,
}: {
  color: string
  onCopy: () => Promise<boolean>
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
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Copy Text
        </>
      )}
    </button>
  )
}
