'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TEMPERAMENTS } from '@/lib/temperaments'
import type { TemperamentKey } from '@/lib/scoringKey'

interface LandingScreenProps {
  onBegin: () => void
}

const characterOrder: TemperamentKey[] = ['Red', 'Yellow', 'Blue', 'Green']

export default function LandingScreen({ onBegin }: LandingScreenProps) {
  const [visible, setVisible] = useState(false)
  const [hoveredChar, setHoveredChar] = useState<TemperamentKey | null>(null)
  const [glowPulse, setGlowPulse] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowPulse(prev => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-16 overflow-hidden"
      style={{ 
        background: 'radial-gradient(ellipse at center top, #1a1a2e 0%, #0D0D0F 50%, #000000 100%)',
      }}
    >
      {/* Ambient glow effects */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none transition-opacity duration-1000"
        style={{ 
          background: 'radial-gradient(ellipse, rgba(255,215,0,0.15) 0%, transparent 70%)',
          opacity: glowPulse ? 0.8 : 0.5,
        }} 
      />
      <div 
        className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 70%)' }} 
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(82,183,136,0.08) 0%, transparent 70%)' }} 
      />

      {/* Decorative corner frames */}
      <div className="absolute top-4 left-4 w-24 h-24 border-l-2 border-t-2 border-[#FFD700]/30 rounded-tl-lg pointer-events-none" />
      <div className="absolute top-4 right-4 w-24 h-24 border-r-2 border-t-2 border-[#FFD700]/30 rounded-tr-lg pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-24 h-24 border-l-2 border-b-2 border-[#FFD700]/30 rounded-bl-lg pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-24 h-24 border-r-2 border-b-2 border-[#FFD700]/30 rounded-br-lg pointer-events-none" />

      <div
        className="relative z-10 flex flex-col items-center gap-10 max-w-5xl w-full text-center"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        {/* Epic Title Section */}
        <div className="flex flex-col items-center gap-4">
          {/* Decorative top element */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#FFD700]">
              <path fill="currentColor" d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z" />
            </svg>
            <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent via-[#FFD700]/50 to-transparent" />
          </div>

          <p 
            className="font-serif text-[10px] md:text-xs tracking-[0.4em] uppercase"
            style={{ 
              color: '#B8860B',
              textShadow: '0 0 10px rgba(255,215,0,0.3)',
            }}
          >
            Know Your True Nature
          </p>

          {/* Main Title with epic styling */}
          <div className="relative mt-2">
            <h1
              className="font-serif text-6xl md:text-8xl font-black tracking-wider"
              style={{ 
                color: '#FFD700',
                textShadow: `
                  0 0 20px rgba(255,215,0,0.5),
                  0 0 40px rgba(255,215,0,0.3),
                  0 0 60px rgba(255,215,0,0.2),
                  0 4px 0 #B8860B,
                  0 5px 0 #8B6914
                `,
                letterSpacing: '0.05em',
              }}
            >
              FOURTYPE
            </h1>
          </div>

          {/* Subtitle */}
          <p 
            className="font-serif text-lg md:text-2xl tracking-widest mt-2"
            style={{ 
              color: '#94A3B8',
              textShadow: '0 0 10px rgba(226,232,240,0.2)',
            }}
          >
            The Temperament Quest
          </p>

          {/* Subtitle ornament */}
          <div className="flex items-center gap-4 mt-2">
            <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#FFD700]/40" />
            <span className="font-serif text-[#FFD700] text-xl">&#9674;</span>
            <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#FFD700]/40" />
          </div>
        </div>

        {/* Video in ornate frame */}
        <div className="relative w-full max-w-2xl">
          {/* Ornate frame corners */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-[#FFD700] rounded-tl" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-[#FFD700] rounded-tr" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-[#FFD700] rounded-bl" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-[#FFD700] rounded-br" />
          
          <div 
            className="rounded-lg overflow-hidden border border-[#2A2A40]"
            style={{ 
              boxShadow: `
                0 0 30px rgba(255,215,0,0.15),
                inset 0 0 30px rgba(0,0,0,0.5)
              `,
            }}
          >
            <video
              src="/videos/landing-bg.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Tagline below video */}
        <p
          className="font-serif text-xl md:text-2xl tracking-wider text-center"
          style={{
            color: '#E2E8F0',
            textShadow: '0 0 10px rgba(226,232,240,0.2)',
          }}
        >
          Find Your True Nature
        </p>

        {/* Character showcase with epic presentation */}
        <div className="relative w-full max-w-4xl mt-4">
          {/* Section header */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#2A2A40] to-[#2A2A40]" />
            <p className="font-serif text-sm tracking-[0.3em] uppercase text-[#64748B]">
              Choose Your Path
            </p>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#2A2A40] to-[#2A2A40]" />
          </div>

          {/* Characters — 2x2 grid on mobile, row on desktop */}
          <div className="grid grid-cols-2 md:flex md:flex-row justify-center items-end gap-4 md:gap-8 w-full">
            {characterOrder.map((key, i) => {
              const t = TEMPERAMENTS[key]
              const isHovered = hoveredChar === key
              return (
                <div
                  key={key}
                  className="relative flex flex-col items-center group cursor-pointer"
                  onMouseEnter={() => setHoveredChar(key)}
                  onMouseLeave={() => setHoveredChar(null)}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {/* Platform glow */}
                  <div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full blur-xl transition-all duration-500"
                    style={{
                      backgroundColor: t.colorHex,
                      opacity: isHovered ? 0.7 : 0.2,
                      transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                  {/* Vertical light beam on hover */}
                  {isHovered && (
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-32 pointer-events-none"
                      style={{ background: `linear-gradient(to top, ${t.colorHex}60, transparent)` }}
                    />
                  )}
                  {/* Character image */}
                  <div
                    className="relative transition-all duration-500"
                    style={{
                      transform: isHovered ? 'translateY(-12px) scale(1.1)' : 'translateY(0) scale(1)',
                      width: '100px',
                      height: '130px',
                      aspectRatio: '100 / 130',
                    }}
                  >
                    <Image
                      src={t.characterImage}
                      alt={t.title}
                      width={100}
                      height={130}
                      loading="eager"
                      className="object-contain w-full h-full"
                      style={{
                        filter: isHovered
                          ? `drop-shadow(0 0 25px ${t.colorHex}) drop-shadow(0 0 50px ${t.colorHex}60)`
                          : `drop-shadow(0 0 10px ${t.colorHex}40)`,
                      }}
                    />
                  </div>
                  {/* Nameplate */}
                  <div
                    className="mt-3 px-3 py-1.5 rounded border transition-all duration-300 w-full text-center"
                    style={{
                      backgroundColor: isHovered ? `${t.colorHex}15` : 'rgba(13,13,15,0.8)',
                      borderColor: isHovered ? t.colorHex : '#2A2A40',
                      boxShadow: isHovered ? `0 0 20px ${t.colorHex}30` : 'none',
                    }}
                  >
                    <p
                      className="font-serif text-[10px] md:text-sm font-bold tracking-wider"
                      style={{
                        color: t.colorHex,
                        textShadow: isHovered ? `0 0 10px ${t.colorHex}` : 'none',
                      }}
                    >
                      {t.title.toUpperCase()}
                    </p>
                    <p className="font-sans text-[9px] md:text-xs text-[#64748B] mt-0.5">
                      {t.name}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Hover tooltip - positioned below characters */}
          <div
            className="mt-8 h-16 flex items-center justify-center"
          >
            {hoveredChar ? (
              <div
                className="px-6 py-3 rounded-lg border text-center max-w-sm transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(13, 13, 15, 0.95)',
                  borderColor: TEMPERAMENTS[hoveredChar].colorHex + '60',
                  boxShadow: `
                    0 0 30px ${TEMPERAMENTS[hoveredChar].colorHex}20,
                    inset 0 0 20px ${TEMPERAMENTS[hoveredChar].colorHex}10
                  `,
                }}
              >
                <p className="font-serif text-sm text-[#E2E8F0]">
                  {TEMPERAMENTS[hoveredChar].rpgClass}
                </p>
                <p
                  className="font-sans text-xs mt-1"
                  style={{ color: TEMPERAMENTS[hoveredChar].colorHex }}
                >
                  The Language of {TEMPERAMENTS[hoveredChar].language}
                </p>
              </div>
            ) : (
              <p className="font-sans text-xs text-[#4A5568] italic">
                Hover over a character to learn more
              </p>
            )}
          </div>
        </div>

        {/* Lore text */}
        <div className="mt-8 max-w-lg">
          <p className="font-serif text-[#94A3B8] text-base leading-relaxed italic text-pretty">
            &ldquo;Every hero carries a nature forged before the quest begins...&rdquo;
          </p>
          <p className="font-sans text-[#64748B] text-sm mt-3">
            <span className="text-[#E2E8F0]">40 questions</span> &bull; 
            <span className="text-[#E2E8F0]"> 16 personality patterns</span> &bull; 
            <span className="text-[#E2E8F0]"> No paywall</span>
          </p>
        </div>

        {/* Epic CTA Button */}
        <button
          onClick={onBegin}
          className="group relative font-serif text-lg font-bold tracking-[0.2em] uppercase px-12 py-5 rounded-lg transition-all duration-300 cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #FFD700 0%, #B8860B 100%)',
            color: '#0D0D0F',
            boxShadow: `
              0 0 30px rgba(255,215,0,0.3),
              0 4px 0 #8B6914,
              inset 0 1px 0 rgba(255,255,255,0.3)
            `,
            border: '2px solid #FFD700',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(180deg, #FFE44D 0%, #FFD700 100%)'
            e.currentTarget.style.boxShadow = `
              0 0 50px rgba(255,215,0,0.5),
              0 0 100px rgba(255,215,0,0.3),
              0 4px 0 #B8860B,
              inset 0 1px 0 rgba(255,255,255,0.4)
            `
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(180deg, #FFD700 0%, #B8860B 100%)'
            e.currentTarget.style.boxShadow = `
              0 0 30px rgba(255,215,0,0.3),
              0 4px 0 #8B6914,
              inset 0 1px 0 rgba(255,255,255,0.3)
            `
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <span className="relative z-10">Begin Your Quest</span>
          {/* Button shine effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
              transform: 'skewX(-20deg)',
            }}
          />
        </button>

        <p className="font-sans text-[#64748B] text-xs tracking-wide">
          ~20 minutes &bull; Free forever
        </p>
      </div>
    </main>
  )
}
