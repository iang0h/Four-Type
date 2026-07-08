'use client'

import { useEffect, useState } from 'react'

const CHAPTER_GATES = [
  { question: 12, label: 'CH.I' },
  { question: 19, label: 'CH.II' },
  { question: 24, label: 'CH.III' },
  { question: 40, label: 'FINALE' },
]

interface XPProgressBarProps {
  current: number
  total: number
  heroName: string
}

export default function XPProgressBar({ current, total, heroName }: XPProgressBarProps) {
  const pct = (current / total) * 100
  const [flash, setFlash] = useState(false)

  // Flash after a real chapter boundary has just been crossed.
  useEffect(() => {
    if (CHAPTER_GATES.slice(0, -1).some((gate) => gate.question === current - 1)) {
      setFlash(true)
      const timer = setTimeout(() => setFlash(false), 500)
      return () => clearTimeout(timer)
    }
  }, [current])

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Top row - name and progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Shield icon */}
          <div 
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(184,134,11,0.1) 100%)',
              border: '1px solid rgba(255,215,0,0.4)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L10 3V6C10 8.5 8 10.5 6 11C4 10.5 2 8.5 2 6V3L6 1Z" fill="#FFD700" fillOpacity="0.3" stroke="#FFD700" strokeWidth="1"/>
            </svg>
          </div>
          <span className="font-serif text-sm font-semibold text-[#E2E8F0]">
            {heroName}
          </span>
        </div>
        <div 
          className="flex items-center gap-2 px-3 py-1 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.05) 100%)',
            border: '1px solid rgba(255,215,0,0.3)',
            boxShadow: '0 0 15px rgba(255,215,0,0.15)',
          }}
        >
          <span className="font-serif text-lg font-bold" style={{ color: '#FFD700', textShadow: '0 0 10px rgba(255,215,0,0.5)' }}>
            {current}
          </span>
          <span className="font-sans text-xs text-[#64748B]">/</span>
          <span className="font-sans text-xs text-[#64748B]">{total}</span>
        </div>
      </div>

      {/* XP Bar Container - CHUNKY VERSION */}
      <div
        className="relative w-full h-5 sm:h-6 rounded-lg overflow-hidden"
        style={{ 
          backgroundColor: '#0D0D0F',
          border: '2px solid #2A2A40',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,215,0,0.1)',
        }}
      >
        {/* Inner track */}
        <div className="absolute inset-[2px] rounded overflow-hidden" style={{ backgroundColor: '#1A1A2E' }}>
          {/* Fill with gradient and glow */}
          <div
            className="h-full rounded transition-all duration-500 relative"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(180deg, #FFE55C 0%, #FFD700 30%, #B8860B 70%, #8B6914 100%)',
              boxShadow: flash
                ? '0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(255,215,0,0.8), inset 0 1px 0 rgba(255,255,255,0.5)'
                : '0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            {/* Inner highlight */}
            <div 
              className="absolute inset-x-0 top-0 h-1/3 rounded-t"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)' }}
            />
            {/* Animated shimmer across entire bar */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmerSlide 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Level gate markers (diamond icons) - now larger */}
        {CHAPTER_GATES.slice(0, -1).map((gate) => {
          const markerPct = (gate.question / total) * 100
          const reached = current > gate.question
          return (
            <div
              key={gate.question}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 transition-all duration-300"
              style={{ left: `${markerPct}%` }}
            >
              {/* Diamond shape - larger */}
              <div
                className="w-4 h-4 rotate-45 transition-all duration-300"
                style={{
                  backgroundColor: reached ? '#FFD700' : '#1A1A2E',
                  boxShadow: reached 
                    ? '0 0 15px rgba(255,215,0,0.8), 0 0 30px rgba(255,215,0,0.4)' 
                    : 'inset 0 1px 3px rgba(0,0,0,0.5)',
                  border: `2px solid ${reached ? '#FFE55C' : '#2A2A40'}`,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Level labels - more visible */}
      <div className="relative w-full h-5">
        {CHAPTER_GATES.map((gate) => {
          const markerPct = (gate.question / total) * 100
          const reached = current > gate.question || current === total
          return (
            <div
              key={gate.question}
              className="absolute -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${markerPct}%` }}
            >
              <span
                className="font-serif text-[10px] sm:text-xs font-bold tracking-wider transition-all duration-300"
                style={{
                  color: reached ? '#FFD700' : '#3A3A50',
                  textShadow: reached ? '0 0 10px rgba(255,215,0,0.6)' : 'none',
                }}
              >
                {gate.label}
              </span>
            </div>
          )
        })}
      </div>

      <style>{`
        @keyframes shimmerSlide {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  )
}
