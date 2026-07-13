'use client'

import Image from 'next/image'
import { AlertTriangle, Copy, MessageCircle, Share2, Sparkles, Users } from 'lucide-react'
import type { Blend } from '@/lib/blends'
import type { PairInsight } from '@/lib/comparison'
import { TEMPERAMENTS } from '@/lib/temperaments'
import PairShareCard from './PairShareCard'
import type { QuizCopy } from '@/lib/quiz-i18n'

type PairComparisonProps = {
  selfName: string
  friendName: string
  selfBlend: Blend
  friendBlend: Blend
  selfBlendLabel?: string
  friendBlendLabel?: string
  insight: PairInsight
  copy: QuizCopy['results']['pair']
  copied: boolean
  onShare: () => void
  onCopy: () => void
  onCardDownload: () => void
}

export default function PairComparison({
  selfName,
  friendName,
  selfBlend,
  friendBlend,
  selfBlendLabel,
  friendBlendLabel,
  insight,
  copy,
  copied,
  onShare,
  onCopy,
  onCardDownload,
}: PairComparisonProps) {
  const selfTemperament = TEMPERAMENTS[selfBlend.primary]
  const friendTemperament = TEMPERAMENTS[friendBlend.primary]
  const insightRows = [
    { label: copy.sharedQuality, body: insight.sharedQuality, icon: Users },
    { label: copy.naturalComplement, body: insight.complement, icon: Sparkles },
    { label: copy.likelyFriction, body: insight.friction, icon: AlertTriangle },
  ]

  return (
    <section className="flex flex-col gap-5 border-y border-[#FFD700]/25 py-7">
      <div className="text-center">
        <p className="font-serif text-[11px] uppercase tracking-[0.28em] text-[#FFD700]">{copy.eyebrow}</p>
        <h2 className="mt-2 font-serif text-2xl font-black leading-tight text-[#F8FAFC]">{selfName} + {friendName}</h2>
        <p className="mx-auto mt-2 max-w-lg font-sans text-sm leading-relaxed text-[#94A3B8]">{insight.headline}</p>
      </div>

      <div className="grid min-w-0 grid-cols-2 gap-3">
        {[
          { name: selfName, blend: selfBlend, blendLabel: selfBlendLabel ?? selfBlend.blend, image: selfTemperament.characterImage },
          { name: friendName, blend: friendBlend, blendLabel: friendBlendLabel ?? friendBlend.blend, image: friendTemperament.characterImage },
        ].map((person) => (
          <div key={`${person.name}-${person.blend.key}`} className="min-w-0 text-center">
            <div className="relative mx-auto aspect-square w-full max-w-[170px] overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
              <Image src={person.image} alt={person.blend.name} fill sizes="170px" className="object-contain p-2" />
            </div>
            <p className="mt-2 truncate font-sans text-xs text-[#64748B]">{person.name}</p>
            <p className="font-serif text-sm font-bold leading-tight text-[#E2E8F0] break-words">{person.blend.name}</p>
            <p className="mt-1 font-sans text-[10px] text-[#64748B] break-words">{person.blendLabel}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3">
        {insightRows.map(({ label, body, icon: Icon }) => (
          <div key={label} className="border-l-2 border-[#FFD700]/40 py-1 pl-4">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-[#FFD700]" aria-hidden="true" />
              <p className="font-serif text-[10px] uppercase tracking-[0.18em] text-[#64748B]">{label}</p>
            </div>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#CBD5E1]">{body}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="border-l-2 border-[#52B788]/50 pl-4">
          <p className="font-serif text-[10px] uppercase tracking-[0.18em] text-[#64748B]">{copy.personMove(selfName)}</p>
          <p className="mt-1 font-sans text-sm leading-relaxed text-[#E2E8F0]">{insight.selfAdvice}</p>
        </div>
        <div className="border-l-2 border-[#4CC9F0]/50 pl-4">
          <p className="font-serif text-[10px] uppercase tracking-[0.18em] text-[#64748B]">{copy.personMove(friendName)}</p>
          <p className="mt-1 font-sans text-sm leading-relaxed text-[#E2E8F0]">{insight.friendAdvice}</p>
        </div>
      </div>

      <div className="border-l-2 border-[#FFD700] bg-[#FFD700]/[0.06] px-4 py-4">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-[#FFD700]" aria-hidden="true" />
          <p className="font-serif text-[10px] uppercase tracking-[0.18em] text-[#FFD700]">{copy.tryTogether}</p>
        </div>
        <p className="mt-2 font-sans text-sm leading-relaxed text-[#E2E8F0]">{insight.challenge}</p>
      </div>

      <p className="text-center font-sans text-[11px] leading-relaxed text-[#64748B]">
        {copy.safety}
      </p>

      <div className="grid grid-cols-[1fr_auto] gap-2">
        <button type="button" onClick={onShare} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#FFD700] px-4 font-serif text-xs font-bold uppercase tracking-widest text-[#0D0D0F]">
          <Share2 className="h-4 w-4" aria-hidden="true" />
          {copy.challengeAnother}
        </button>
        <button type="button" onClick={onCopy} title={copy.copyAria} aria-label={copy.copyAria} className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#FFD700]/35 text-[#FFD700]">
          <Copy className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {copied && <p className="text-center font-sans text-xs text-[#52B788]">{copy.copied}</p>}

      <PairShareCard
        selfName={selfName}
        friendName={friendName}
        selfBlend={selfBlend}
        friendBlend={friendBlend}
        insight={insight}
        copy={copy}
        onDownload={onCardDownload}
      />
    </section>
  )
}
