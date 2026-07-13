'use client'

import { useCallback, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import type { Blend } from '@/lib/blends'
import type { PairInsight } from '@/lib/comparison'
import { TEMPERAMENTS } from '@/lib/temperaments'
import type { QuizCopy } from '@/lib/quiz-i18n'

type PairShareCardProps = {
  selfName: string
  friendName: string
  selfBlend: Blend
  friendBlend: Blend
  insight: PairInsight
  copy: QuizCopy['results']['pair']
  onDownload?: () => void
}

export default function PairShareCard({ selfName, friendName, selfBlend, friendBlend, insight, copy, onDownload }: PairShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [downloadError, setDownloadError] = useState(false)
  const selfTemperament = TEMPERAMENTS[selfBlend.primary]
  const friendTemperament = TEMPERAMENTS[friendBlend.primary]

  const handleDownload = useCallback(async () => {
    if (!cardRef.current || downloading) return
    setDownloading(true)
    setDownloadError(false)

    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#08080B',
        scale: 3,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = 'fourtype-pair.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
      onDownload?.()
    } catch {
      setDownloadError(true)
    } finally {
      setDownloading(false)
    }
  }, [downloading, onDownload])

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        ref={cardRef}
        className="relative aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-lg border border-[#FFD700]/45 bg-[#08080B] p-5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(230,57,70,0.22),transparent_34%),radial-gradient(circle_at_80%_28%,rgba(76,201,240,0.2),transparent_34%)]" />
        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-center justify-between">
            <p className="font-serif text-[11px] uppercase tracking-[0.28em] text-[#FFD700]">FourType</p>
            <p className="font-sans text-[9px] uppercase tracking-[0.16em] text-[#64748B]">{copy.pairResult}</p>
          </div>

          <div className="mt-6 text-center">
            <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#94A3B8]">{copy.ourPair}</p>
            <h2 className="mt-2 font-serif text-2xl font-black leading-tight text-[#F8FAFC]">{selfBlend.name} + {friendBlend.name}</h2>
          </div>

          <div className="mt-5 grid min-w-0 grid-cols-2 gap-2">
            {[
              { name: selfName, blend: selfBlend, image: selfTemperament.characterImage },
              { name: friendName, blend: friendBlend, image: friendTemperament.characterImage },
            ].map((person) => (
              <div key={`${person.name}-${person.blend.key}`} className="min-w-0 text-center">
                <div className="mx-auto flex aspect-square w-full items-end justify-center overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={person.image} crossOrigin="anonymous" alt={person.blend.name} className="h-[92%] w-auto object-contain" />
                </div>
                <p className="mt-2 truncate font-sans text-[10px] text-[#94A3B8]">{person.name}</p>
                <p className="font-serif text-xs font-bold leading-tight text-[#E2E8F0] break-words">{person.blend.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-[#FFD700]/25 bg-[#FFD700]/[0.07] p-4">
            <p className="font-serif text-[9px] uppercase tracking-[0.2em] text-[#FFD700]">{copy.connects}</p>
            <p className="mt-2 font-sans text-xs leading-relaxed text-[#E2E8F0]">{insight.sharedQuality}</p>
          </div>

          <div className="mt-auto border-t border-white/10 pt-4 text-center">
            <p className="font-serif text-sm font-black text-[#F8FAFC]">{copy.whoUnderstands}</p>
            <p className="mt-1 font-sans text-[10px] tracking-[0.18em] text-[#FFD700]">FOURTYPE.COM</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#FFD700]/40 px-4 font-sans text-xs font-semibold text-[#E2E8F0] transition-colors hover:border-[#FFD700] disabled:opacity-60"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {downloading ? copy.preparing : copy.download}
      </button>
      {downloadError && (
        <p className="text-center font-sans text-xs text-[#E63946]">
          {copy.error}
        </p>
      )}
    </div>
  )
}
