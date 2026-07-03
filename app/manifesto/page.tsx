'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronDown, ChevronRight, Flame, Droplets, Wind, Mountain, BookOpen, Users, Brain, Heart, Sparkles, Zap, Shield, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import RuneBackground from '@/components/RuneBackground'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const temperaments = [
  {
    key: 'sanguine',
    name: 'Sanguine',
    title: 'The Bard',
    element: 'Air',
    humor: 'Blood',
    season: 'Spring',
    quality: 'Hot & Moist',
    color: '#FFD700',
    icon: Wind,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png',
    coreDrive: 'Pleasure-seeking and social connection',
    lore: 'You are the spark in every room — the one who makes strangers feel like old friends in minutes. The world is your stage and you play it well.',
    strengths: ['Magnetic and charismatic', 'Gifted storyteller', 'Optimistic to the bone', 'Energizes rooms naturally', 'Spontaneous and creative'],
    weaknesses: ['Follow-through is your Achilles heel', 'Talks more than listens', 'Fear of missing out overrides logic', 'Avoids deep introspection'],
    bestAt: 'The Sanguine is the most extraverted and socially energized of the four temperaments. They light up a room, build rapport quickly, and thrive on novelty and social interaction.',
    fear: 'Rejection and being perceived as unsuccessful',
    atBest: 'Inspiring communicators who energize teams, spark ideas, and make others feel welcomed',
    atWorst: 'Scattered, unreliable, attention-seeking, and emotionally volatile',
  },
  {
    key: 'choleric',
    name: 'Choleric',
    title: 'The Commander',
    element: 'Fire',
    humor: 'Yellow Bile',
    season: 'Summer',
    quality: 'Hot & Dry',
    color: '#E63946',
    icon: Flame,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png',
    coreDrive: 'Achievement and control of environment',
    lore: 'You are built to lead. Where others see problems, you see the next move. You do not wait for permission — you take the hill and figure out the details later.',
    strengths: ['Natural-born leader', 'Gets things done fast', 'Self-motivated', 'Sees the big picture', 'Thrives under pressure'],
    weaknesses: ['Quick-tempered', 'Controlling', 'Runs over feelings', 'Rarely says sorry', 'Struggles to celebrate others'],
    bestAt: 'The Choleric is the natural leader — decisive, goal-oriented, and results-driven. Cholerics take charge of situations, thrive under pressure, and are energized by challenge.',
    fear: 'Loss of control, being taken advantage of',
    atBest: 'Transformational leaders who get results, inspire action, and overcome obstacles',
    atWorst: 'Tyrannical, manipulative, workaholic, emotionally cold',
  },
  {
    key: 'melancholic',
    name: 'Melancholic',
    title: 'The Strategist',
    element: 'Earth',
    humor: 'Black Bile',
    season: 'Autumn',
    quality: 'Cold & Dry',
    color: '#4CC9F0',
    icon: Mountain,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png',
    coreDrive: 'Perfection, understanding, and meaning',
    lore: 'You see what others miss. The flaw in the plan. The pattern in the chaos. Your depth is your power. You think before you speak, feel before you act.',
    strengths: ['Deeply analytical', 'High standards drive quality', 'Organized and systematic', 'Emotionally deep', 'Detail-oriented'],
    weaknesses: ['Perfectionism leads to paralysis', 'Pessimistic by default', 'Hard to please', 'Holds grudges', 'Prone to depression'],
    bestAt: 'The Melancholic is the deep thinker — analytical, detail-oriented, and idealistic. Melancholics set high standards and find meaning in quality, order, and truth.',
    fear: 'Criticism, making mistakes, chaos',
    atBest: 'Brilliant analysts, artists, and planners who produce work of exceptional depth and quality',
    atWorst: 'Paralyzed by self-doubt, resentful, rigidly judgmental, isolated',
  },
  {
    key: 'phlegmatic',
    name: 'Phlegmatic',
    title: 'The Guardian',
    element: 'Water',
    humor: 'Phlegm',
    season: 'Winter',
    quality: 'Cold & Moist',
    color: '#52B788',
    icon: Droplets,
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png',
    coreDrive: 'Peace, harmony, and stability',
    lore: 'You are the peace everyone else is searching for. When the room is on fire, you are the still water. You listen when no one else does.',
    strengths: ['Most reliable person in any group', 'Master listener', 'Diplomatic and fair', 'Patient to a fault', 'Loyal and supportive'],
    weaknesses: ['Avoids conflict to self-erasure', 'Unmotivated without external push', 'Passive-aggressive when pushed', 'Indecisive', 'Can disappear'],
    bestAt: 'The Phlegmatic is the peacemaker — calm, steady, cooperative, and agreeable. Phlegmatics value harmony and stability above all.',
    fear: 'Conflict, sudden change, loss of security',
    atBest: 'Stabilizing forces who keep teams grounded, mediate disputes, and quietly ensure things run smoothly',
    atWorst: 'Stagnant, enabling, passive-aggressive, emotionally detached',
  },
]

const subtypesTable = [
  { subtype: 'Pure San', primary: 'Sanguine', secondary: 'Pure', traits: 'Undiluted social energy, warmth, spontaneity, and contagious enthusiasm', color1: '#FFD700', color2: '#FFD700' },
  { subtype: 'San-Chol', primary: 'Sanguine', secondary: 'Choleric', traits: 'Super-extroverted, always on the go, explosive but brief emotions', color1: '#FFD700', color2: '#E63946' },
  { subtype: 'San-Mel', primary: 'Sanguine', secondary: 'Melancholic', traits: 'Highly emotional, rapid mood swings from highs to lows', color1: '#FFD700', color2: '#4CC9F0' },
  { subtype: 'San-Phleg', primary: 'Sanguine', secondary: 'Phlegmatic', traits: 'Outgoing nature tempered by grace, warm and easygoing', color1: '#FFD700', color2: '#52B788' },
  { subtype: 'Pure Chol', primary: 'Choleric', secondary: 'Pure', traits: 'Undiluted drive, decisiveness, control, and results focus', color1: '#E63946', color2: '#E63946' },
  { subtype: 'Chol-San', primary: 'Choleric', secondary: 'Sanguine', traits: 'Driven by results with social charm, practical and forceful', color1: '#E63946', color2: '#FFD700' },
  { subtype: 'Chol-Mel', primary: 'Choleric', secondary: 'Melancholic', traits: 'Analytical and decisive, visionary with attention to detail', color1: '#E63946', color2: '#4CC9F0' },
  { subtype: 'Chol-Phleg', primary: 'Choleric', secondary: 'Phlegmatic', traits: 'Decisive yet calm, diplomatic, goal-driven but measured', color1: '#E63946', color2: '#52B788' },
  { subtype: 'Pure Mel', primary: 'Melancholic', secondary: 'Pure', traits: 'Undiluted depth, standards, analysis, and meaning focus', color1: '#4CC9F0', color2: '#4CC9F0' },
  { subtype: 'Mel-San', primary: 'Melancholic', secondary: 'Sanguine', traits: 'Emotional depth with outward expressiveness, idealistic', color1: '#4CC9F0', color2: '#FFD700' },
  { subtype: 'Mel-Chol', primary: 'Melancholic', secondary: 'Choleric', traits: 'Detail-oriented with drive, analytical and determined', color1: '#4CC9F0', color2: '#E63946' },
  { subtype: 'Mel-Phleg', primary: 'Melancholic', secondary: 'Phlegmatic', traits: 'Most introverted blend, deeply appreciates art and music', color1: '#4CC9F0', color2: '#52B788' },
  { subtype: 'Pure Phleg', primary: 'Phlegmatic', secondary: 'Pure', traits: 'Undiluted calm, patience, stability, and peacekeeping', color1: '#52B788', color2: '#52B788' },
  { subtype: 'Phleg-San', primary: 'Phlegmatic', secondary: 'Sanguine', traits: 'Easy-going with social warmth, relaxed and friendly', color1: '#52B788', color2: '#FFD700' },
  { subtype: 'Phleg-Chol', primary: 'Phlegmatic', secondary: 'Choleric', traits: 'Steady with hidden determination, diplomatic but firm', color1: '#52B788', color2: '#E63946' },
  { subtype: 'Phleg-Mel', primary: 'Phlegmatic', secondary: 'Melancholic', traits: 'Quiet and thoughtful, gentle, people-focused introvert', color1: '#52B788', color2: '#4CC9F0' },
]

const timeline = [
  { era: 'c. 400 BC', figure: 'Hippocrates', event: 'Proposes the four humors' },
  { era: 'c. 190 AD', figure: 'Galen', event: 'Formalizes four temperaments' },
  { era: '1798', figure: 'Kant', event: 'Separates temperament from biology' },
  { era: '1879', figure: 'Wundt', event: 'Creates scientific axes model' },
  { era: '1978', figure: 'Keirsey', event: 'Links to MBTI 16 types' },
  { era: 'Today', figure: 'Modern Era', event: 'DISC, coaching, education' },
]

export default function ManifestoPage() {
  const [activeTemp, setActiveTemp] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <RuneBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4CC9F0]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">The Complete Manifesto</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            The Four
            <br />
            <span className="bg-gradient-to-r from-[#FFD700] via-[#E63946] via-[#4CC9F0] to-[#52B788] bg-clip-text text-transparent">
              Temperaments
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            This manifesto is a living document that aims to become the most comprehensive guide to the 4 temperaments 
            and their subtypes. It synthesizes classical roots, modern psychology, and practical applications into a 
            single coherent system.
          </p>

          {/* Animated Character Display */}
          <div className="flex items-end justify-center gap-6 sm:gap-10 my-12">
            {temperaments.map((temp, i) => (
              <div
                key={temp.key}
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveTemp(temp.key)}
                onMouseLeave={() => setActiveTemp(null)}
              >
                <div 
                  className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ backgroundColor: temp.color }}
                />
                <div 
                  className={cn(
                    "relative w-20 h-28 sm:w-28 sm:h-40 md:w-32 md:h-44 transition-all duration-500",
                    activeTemp === temp.key ? 'scale-110 -translate-y-3' : ''
                  )}
                >
                  <Image
                    src={temp.image}
                    alt={temp.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div 
                  className={cn(
                    "absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300",
                    activeTemp === temp.key ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  )}
                >
                  <p className="text-xs font-semibold" style={{ color: temp.color }}>{temp.title}</p>
                  <p className="text-xs text-muted-foreground">{temp.element}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 animate-bounce">
            <ChevronDown className="w-6 h-6 mx-auto text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Part I: The Four Temperaments */}
      <section id="temperaments" className="relative py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-semibold tracking-wider uppercase mb-4 block">Part I</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              The Four Temperaments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each temperament represents a fundamental pattern of personality that shapes how you think, feel, and act.
            </p>
          </div>

          {/* Temperament Cards */}
          <div className="space-y-8">
            {temperaments.map((temp, index) => (
              <div
                key={temp.key}
                className={cn(
                  "relative overflow-hidden rounded-3xl bg-card border border-border transition-all duration-500",
                  visibleSections.has('temperaments') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Glow effect */}
                <div 
                  className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
                  style={{ backgroundColor: temp.color }}
                />

                <div className="relative p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Character & Info */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-1/3">
                      <div className="relative w-32 h-44 mb-6">
                        <div 
                          className="absolute inset-0 rounded-full blur-3xl opacity-40"
                          style={{ backgroundColor: temp.color }}
                        />
                        <Image
                          src={temp.image}
                          alt={temp.title}
                          fill
                          className="object-contain drop-shadow-2xl"
                        />
                      </div>

                      <div 
                        className="flex items-center gap-2 px-3 py-1 rounded-full mb-3"
                        style={{ backgroundColor: `${temp.color}20` }}
                      >
                        <temp.icon className="w-4 h-4" style={{ color: temp.color }} />
                        <span className="text-sm font-semibold" style={{ color: temp.color }}>{temp.name}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                        {temp.title}
                      </h3>

                      {/* Element Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs mt-4 w-full max-w-xs">
                        <div className="p-2 rounded-lg bg-secondary/30 text-center">
                          <span className="text-muted-foreground">Element</span>
                          <p className="font-medium text-foreground">{temp.element}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary/30 text-center">
                          <span className="text-muted-foreground">Season</span>
                          <p className="font-medium text-foreground">{temp.season}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary/30 text-center">
                          <span className="text-muted-foreground">Humor</span>
                          <p className="font-medium text-foreground">{temp.humor}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary/30 text-center">
                          <span className="text-muted-foreground">Quality</span>
                          <p className="font-medium text-foreground">{temp.quality}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">
                      <div>
                        <p className="text-foreground italic text-lg leading-relaxed">
                          "{temp.lore}"
                        </p>
                      </div>

                      <div className="p-4 rounded-xl" style={{ backgroundColor: `${temp.color}10`, borderLeft: `3px solid ${temp.color}` }}>
                        <p className="text-sm text-foreground">
                          <strong>Core Drive:</strong> {temp.coreDrive}
                        </p>
                      </div>

                      <p className="text-muted-foreground">{temp.bestAt}</p>

                      {/* Expandable Sections */}
                      <div className="space-y-4">
                        <button
                          onClick={() => toggleSection(`${temp.key}-strengths`)}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <span className="font-semibold text-foreground">Strengths</span>
                          <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", expandedSections[`${temp.key}-strengths`] && 'rotate-180')} />
                        </button>
                        {expandedSections[`${temp.key}-strengths`] && (
                          <div className="pl-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                            {temp.strengths.map((s, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <span style={{ color: temp.color }}>+</span>
                                <span className="text-muted-foreground">{s}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => toggleSection(`${temp.key}-weaknesses`)}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <span className="font-semibold text-foreground">Weaknesses</span>
                          <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", expandedSections[`${temp.key}-weaknesses`] && 'rotate-180')} />
                        </button>
                        {expandedSections[`${temp.key}-weaknesses`] && (
                          <div className="pl-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                            {temp.weaknesses.map((w, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <span className="text-red-400">-</span>
                                <span className="text-muted-foreground">{w}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <button
                          onClick={() => toggleSection(`${temp.key}-extremes`)}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                        >
                          <span className="font-semibold text-foreground">At Best & At Worst</span>
                          <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform", expandedSections[`${temp.key}-extremes`] && 'rotate-180')} />
                        </button>
                        {expandedSections[`${temp.key}-extremes`] && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                              <p className="text-xs font-semibold text-green-400 mb-1">At Their Best</p>
                              <p className="text-sm text-muted-foreground">{temp.atBest}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                              <p className="text-xs font-semibold text-red-400 mb-1">At Their Worst</p>
                              <p className="text-sm text-muted-foreground">{temp.atWorst}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-4">
                        <Link
                          href={`/temperament/${temp.key}`}
                          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:gap-3"
                          style={{ color: temp.color }}
                        >
                          Explore {temp.name} in depth
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part II: The 16 FourTypes */}
      <section id="subtypes" className="relative py-24 lg:py-32 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-semibold tracking-wider uppercase mb-4 block">Part II</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              The 16 FourTypes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Most people are a blend of two temperaments. The subtype is written as Primary-Secondary.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subtypesTable.map((sub) => (
              <div
                key={sub.subtype}
                className="group relative p-5 rounded-xl bg-card border border-border hover:border-opacity-50 transition-all duration-300 hover:-translate-y-1"
              >
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${sub.color1}10, ${sub.color2}10)` }}
                />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: sub.color1 }} />
                      <div className="w-3 h-3 rounded-full -ml-1" style={{ backgroundColor: sub.color2 }} />
                    </div>
                    <span className="font-serif font-semibold text-foreground">{sub.subtype}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{sub.traits}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog/subtypes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors"
            >
              Read the full subtypes guide
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Part III: Historical Timeline */}
      <section id="history" className="relative py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-semibold tracking-wider uppercase mb-4 block">Part III</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Historical & Theoretical Roots
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The four temperaments are one of the most durable personality models in history, spanning over 2,500 years.
            </p>
          </div>

          {/* Animated Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-[#E63946] via-[#4CC9F0] to-[#52B788]" />
            
            {timeline.map((item, i) => (
              <div
                key={i}
                className={cn(
                  "relative pl-20 pb-12 last:pb-0 transition-all duration-500",
                  visibleSections.has('history') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="absolute left-5 top-0 w-7 h-7 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="text-lg font-semibold text-primary">{item.era}</span>
                    <span className="hidden sm:block text-muted-foreground">—</span>
                    <span className="text-foreground font-medium">{item.figure}</span>
                  </div>
                  <p className="text-muted-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog/history-of-temperaments"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-medium rounded-xl hover:bg-secondary/80 transition-colors"
            >
              Read the complete history
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Part IV: Practical Applications */}
      <section id="applications" className="relative py-24 lg:py-32 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm text-primary font-semibold tracking-wider uppercase mb-4 block">Part IV</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Practical Applications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding temperament transforms how you communicate, lead, parent, and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Users, title: 'Relationships & Communication', desc: 'Learn to speak each temperament\'s language and meet their core needs.', color: '#FFD700' },
              { icon: Target, title: 'Leadership & Teamwork', desc: 'Build balanced teams and adapt your leadership style to each type.', color: '#E63946' },
              { icon: Brain, title: 'Education & Parenting', desc: 'Help children learn according to their natural temperament.', color: '#4CC9F0' },
              { icon: Heart, title: 'Self-Development', desc: 'Identify your growth edge and take practical steps toward balance.', color: '#52B788' },
            ].map((app, i) => (
              <div
                key={app.title}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${app.color}20` }}
                >
                  <app.icon className="w-7 h-7" style={{ color: app.color }} />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{app.title}</h3>
                <p className="text-muted-foreground">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-[#52B788]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Discover Your Type?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Take our comprehensive temperament assessment and receive detailed insights about your personality, 
            your blend, and your path to growth.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-semibold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            Take the Quiz
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}
