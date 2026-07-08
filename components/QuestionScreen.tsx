'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import type { AnswerLetter, Question } from '@/lib/questions'
import type { QuizCopy } from '@/lib/quiz-i18n'
import XPProgressBar from './XPProgressBar'
import VideoBackground from './VideoBackground'

interface QuestionScreenProps {
  heroName: string
  onComplete: (answers: Record<number, AnswerLetter>) => void
  copy: QuizCopy['question']
  questions: Question[]
}

export default function QuestionScreen({ heroName, onComplete, copy, questions }: QuestionScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, AnswerLetter>>({})
  const [selected, setSelected] = useState<AnswerLetter | null>(null)
  const [levelMsg, setLevelMsg] = useState<string | null>(null)
  const [cardVisible, setCardVisible] = useState(true)
  const [chapterTransition, setChapterTransition] = useState<string | null>(null)
  const sparkCanvasRef = useRef<HTMLCanvasElement>(null)

  const currentQ: Question = questions[currentIndex]
  const questionNumber = currentIndex + 1

  // Spark particle burst on answer selection
  const spawnSparks = useCallback((x: number, y: number) => {
    const canvas = sparkCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const colors = ['#FFD700', '#E63946', '#4CC9F0', '#52B788', '#FFFFFF']
    const sparks: { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }[] = []

    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20 + Math.random() * 0.3
      const speed = 2 + Math.random() * 4
      sparks.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3,
      })
    }

    let frame = 0
    const animate = () => {
      frame++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let alive = false
      sparks.forEach((spark) => {
        spark.x += spark.vx
        spark.y += spark.vy
        spark.vy += 0.15 // gravity
        spark.life -= 0.025

        if (spark.life > 0) {
          alive = true
          ctx.globalAlpha = spark.life
          ctx.fillStyle = spark.color
          ctx.shadowColor = spark.color
          ctx.shadowBlur = 8
          ctx.beginPath()
          ctx.arc(spark.x, spark.y, spark.size * spark.life, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      if (alive && frame < 60) {
        requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animate()
  }, [])

  function handleSelect(letter: AnswerLetter, event: React.MouseEvent) {
    if (selected) return
    const selectedButton = event.currentTarget as HTMLElement
    selectedButton.blur()
    const rect = selectedButton.getBoundingClientRect()
    spawnSparks(rect.left + rect.width / 2, rect.top + rect.height / 2)
    setSelected(letter)

    setTimeout(() => {
      const newAnswers = { ...answers, [questionNumber]: letter }
      setAnswers(newAnswers)

      // Check level gate
      const msg = copy.levelGateMessages[questionNumber]
      if (msg) {
        setLevelMsg(msg)
        setTimeout(() => setLevelMsg(null), 2500)
      }

      if (currentIndex + 1 >= questions.length) {
        onComplete(newAnswers)
      } else {
        // Check section transition
        const nextQ = questions[currentIndex + 1]
        if (nextQ.section !== currentQ.section) {
          // Show chapter transition
          setChapterTransition(copy.sectionNames[nextQ.section])
          setTimeout(() => {
            setChapterTransition(null)
            setCardVisible(false)
            setTimeout(() => {
              setCurrentIndex((prev) => prev + 1)
              setSelected(null)
              setCardVisible(true)
            }, 300)
          }, 1500)
        } else {
          // Normal transition
          setCardVisible(false)
          setTimeout(() => {
            setCurrentIndex((prev) => prev + 1)
            setSelected(null)
            setCardVisible(true)
          }, 300)
        }
      }
    }, 400)
  }

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (selected || chapterTransition) return
      const map: Record<string, AnswerLetter> = { a: 'A', b: 'B', c: 'C', d: 'D', '1': 'A', '2': 'B', '3': 'C', '4': 'D' }
      const letter = map[e.key.toLowerCase()]
      if (letter) {
        const btn = document.getElementById(`answer-${letter}`)
        if (btn) btn.click()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, chapterTransition])

  // Resize spark canvas
  useEffect(() => {
    const canvas = sparkCanvasRef.current
    if (!canvas) return
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Neutral colors for answer letters to not reveal temperament type
  const neutralColor = '#94A3B8'
  const selectedColor = '#FFD700'

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 py-4 sm:py-6 pb-16 overflow-hidden"
      style={{ background: '#0D0D0F' }}
    >
      <VideoBackground questionNumber={questionNumber} overlayOpacity={0.45} />

      {/* Spark particle canvas */}
      <canvas ref={sparkCanvasRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Chapter transition overlay */}
      {chapterTransition && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(13, 13, 15, 0.95)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div className="text-center px-6">
            <p className="font-serif text-xs tracking-[0.5em] uppercase text-[#64748B] mb-2">{copy.entering}</p>
            <h2
              className="font-serif text-3xl md:text-5xl font-black text-[#FFD700]"
              style={{
                textShadow: '0 0 40px rgba(255,215,0,0.5)',
                animation: 'pulseGlow 1.5s ease infinite',
              }}
            >
              {chapterTransition}
            </h2>
          </div>
        </div>
      )}

      {/* Level up toast */}
      {levelMsg && (
        <div
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 font-serif text-sm px-5 py-3 rounded-lg border-2 text-center whitespace-nowrap"
          style={{
            backgroundColor: '#1A1A2E',
            borderColor: '#FFD700',
            color: '#FFD700',
            boxShadow: '0 0 30px rgba(255,215,0,0.5), inset 0 0 20px rgba(255,215,0,0.1)',
            animation: 'slideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {levelMsg}
        </div>
      )}

      <div className="relative z-10 w-full max-w-xl mx-auto flex flex-col gap-4">
        {/* Progress bar */}
        <XPProgressBar current={questionNumber} total={questions.length} heroName={heroName} />

        {/* Section label */}
        <div className="flex items-center gap-2 px-1">
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: '#FFD700', boxShadow: '0 0 8px #FFD700' }}
          />
          <span className="font-serif text-[9px] tracking-[0.3em] uppercase text-[#64748B]">
            {currentQ.sectionLabel}
          </span>
        </div>

        {/* === GAME CARD - PARCHMENT STYLE === */}
        <div
          className="relative rounded-xl overflow-hidden flex flex-col"
          style={{
            background: `
              linear-gradient(135deg, rgba(26,26,46,0.95) 0%, rgba(18,18,30,0.98) 100%),
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 2px,
                rgba(255,215,0,0.02) 2px,
                rgba(255,215,0,0.02) 4px
              )
            `,
            border: '2px solid',
            borderImage: 'linear-gradient(135deg, #FFD700 0%, #B8860B 50%, #FFD700 100%) 1',
            boxShadow: `
              0 0 0 1px rgba(0,0,0,0.5),
              0 0 30px rgba(255,215,0,0.2),
              0 0 60px rgba(255,215,0,0.1),
              0 20px 60px rgba(0,0,0,0.7),
              inset 0 0 100px rgba(255,215,0,0.03),
              inset 0 1px 0 rgba(255,215,0,0.1)
            `,
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
            transition: 'opacity 0.25s ease-out, transform 0.25s ease-out',
          }}
        >
          {/* Decorative corner runes */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-[#FFD700]/50 rounded-tl pointer-events-none" />
          <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-[#FFD700]/50 rounded-tr pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-[#FFD700]/50 rounded-bl pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-[#FFD700]/50 rounded-br pointer-events-none" />
          
          {/* Ambient glow behind card */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.05) 0%, transparent 70%)',
            }}
          />
          {/* Top header bar */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b"
            style={{ borderColor: 'rgba(255,215,0,0.15)', background: 'rgba(255,215,0,0.04)' }}
          >
            {/* Quest badge */}
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full"
              style={{
                background: 'linear-gradient(135deg, rgba(255,215,0,0.18) 0%, rgba(255,215,0,0.06) 100%)',
                border: '1px solid rgba(255,215,0,0.35)',
              }}
            >
              {/* Small sword icon */}
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H5M9 1V5" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-serif text-[11px] font-bold tracking-[0.15em] uppercase text-[#FFD700]">
                {copy.questLabel} {questionNumber}
              </span>
            </div>

            {/* Progress counter */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs text-[#E2E8F0] font-bold">{questionNumber}</span>
              <span className="font-mono text-[10px] text-[#2A2A40]">/</span>
              <span className="font-mono text-[10px] text-[#64748B]">{questions.length}</span>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-4 p-4 sm:p-5">
            {/* Instruction */}
            <p
              className="text-sm sm:text-base text-[#64748B] italic leading-relaxed"
              style={{ fontFamily: "'Crimson Text', serif" }}
            >
              {currentQ.instruction}
            </p>

            {/* Question text (if any) */}
            {currentQ.text && (
              <p
                className="font-serif text-lg sm:text-2xl text-[#E2E8F0] font-semibold leading-snug"
                style={{ letterSpacing: '0.01em' }}
              >
                {currentQ.text}
              </p>
            )}

            {/* Divider */}
            <div
              className="h-px w-full"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.2), transparent)' }}
            />

            {/* Answer options */}
            <div className="flex flex-col gap-3">
              {currentQ.answers.map((answer) => {
                const isSelected = selected === answer.letter
                return (
                  <button
                    key={`${currentQ.id}-${answer.letter}`}
                    id={`answer-${answer.letter}`}
                    onClick={(e) => handleSelect(answer.letter, e)}
                    disabled={!!selected}
                    className="answer-btn group w-full flex items-center gap-3 px-4 sm:px-5 py-4 sm:py-4.5 rounded-xl text-left transition-all duration-300 cursor-pointer disabled:cursor-default relative overflow-hidden"
                    style={{
                      background: isSelected
                        ? 'linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.08) 100%)'
                        : 'linear-gradient(135deg, rgba(26,26,46,0.8) 0%, rgba(18,18,30,0.9) 100%)',
                      border: `2px solid ${isSelected ? '#FFD700' : 'rgba(255,215,0,0.15)'}`,
                      boxShadow: isSelected 
                        ? '0 0 30px rgba(255,215,0,0.4), 0 0 60px rgba(255,215,0,0.2), inset 0 0 30px rgba(255,215,0,0.1)' 
                        : '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
                      transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    }}
                  >
                    {/* Hover glow overlay */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(255,215,0,0.02) 100%)',
                        boxShadow: 'inset 0 0 20px rgba(255,215,0,0.1)',
                      }}
                    />
                    {/* Shimmer effect on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.1) 50%, transparent 100%)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmerSlide 1.5s ease-in-out infinite',
                      }}
                    />
                    {/* Letter badge */}
                    <div
                      className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center font-serif text-base font-bold transition-all duration-300 relative z-10 group-hover:scale-110"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, #FFE55C 0%, #FFD700 50%, #B8860B 100%)'
                          : 'linear-gradient(135deg, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.05) 100%)',
                        color: isSelected ? '#0D0D0F' : '#B8860B',
                        boxShadow: isSelected 
                          ? '0 0 20px rgba(255,215,0,0.6), inset 0 1px 0 rgba(255,255,255,0.3)' 
                          : '0 0 10px rgba(255,215,0,0.1)',
                        border: `1px solid ${isSelected ? '#FFE55C' : 'rgba(255,215,0,0.3)'}`,
                      }}
                    >
                      {answer.letter}
                    </div>
                    {/* Answer text */}
                    <p
                      className="text-base sm:text-lg leading-snug flex-1 relative z-10 transition-all duration-300 group-hover:text-[#F1F5F9]"
                      style={{
                        color: isSelected ? '#F1F5F9' : '#94A3B8',
                        fontFamily: "'Crimson Text', serif",
                        fontWeight: isSelected ? 600 : 400,
                        textShadow: isSelected ? '0 0 10px rgba(255,215,0,0.3)' : 'none',
                      }}
                    >
                      {answer.text}
                    </p>
                    {/* Check mark on selected */}
                    {isSelected && (
                      <div className="relative z-10 shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" fill="rgba(255,215,0,0.3)" stroke="#FFD700" strokeWidth="2"/>
                          <path d="M8 12L11 15L16 9" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div 
                          className="absolute inset-0 rounded-full"
                          style={{ boxShadow: '0 0 15px rgba(255,215,0,0.5)' }}
                        />
                      </div>
                    )}
                    {/* Right arrow hint on hover (not selected) */}
                    {!isSelected && (
                      <div className="relative z-10 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M7 4L13 10L7 16" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Bottom glow accent */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.15), transparent)' }}
          />
        </div>

        {/* Keyboard hint */}
        <p className="font-sans text-center text-[10px] text-[#2A2A40] pb-2">
          {copy.keyboardHint}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes pulseGlow {
          0%, 100% { text-shadow: 0 0 40px rgba(255,215,0,0.5); }
          50% { text-shadow: 0 0 60px rgba(255,215,0,0.8), 0 0 100px rgba(255,215,0,0.4); }
        }
        @keyframes shimmerSlide {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .answer-btn:hover {
          border-color: rgba(255,215,0,0.5) !important;
          transform: translateY(-2px) scale(1.01) !important;
          box-shadow: 0 8px 25px rgba(0,0,0,0.4), 0 0 25px rgba(255,215,0,0.2), inset 0 1px 0 rgba(255,215,0,0.1) !important;
        }
        .answer-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.99) !important;
        }
      `}</style>
    </main>
  )
}
