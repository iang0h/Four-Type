'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Flame, Wind, Mountain, Droplets, Target, Heart, Sparkles, Eye, Briefcase, AlertTriangle, Shield, Zap, CalendarCheck, MessageCircle, RefreshCw, PenLine, CheckCircle2, Gauge } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import RuneBackground from '@/components/RuneBackground'
import { Subtype, getKnowThyselfInsight, getSubtypeLearningGuide, getSubtypeColor } from '@/lib/subtypes'

interface SubtypePageClientProps {
  subtype: Subtype
}

export default function SubtypePageClient({ subtype }: SubtypePageClientProps) {
  const color = getSubtypeColor(subtype.primary)
  const secondaryColor = subtype.secondary && subtype.secondary !== 'pure' ? getSubtypeColor(subtype.secondary as 'sanguine' | 'choleric' | 'melancholic' | 'phlegmatic') : null
  const knowThyself = getKnowThyselfInsight(subtype)
  const learningGuide = getSubtypeLearningGuide(subtype)
  
  // Determine element icon based on primary temperament
  const elementMap: Record<string, string> = {
    sanguine: 'Air',
    choleric: 'Fire',
    melancholic: 'Earth',
    phlegmatic: 'Water'
  }
  const element = elementMap[subtype.primary]
  const ElementIcon = element === 'Fire' ? Flame :
                     element === 'Air' ? Wind :
                     element === 'Earth' ? Mountain :
                     element === 'Water' ? Droplets : null

  return (
    <div className="min-h-screen bg-background">
      <RuneBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          <Link href="/blog/subtypes" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Subtypes
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left: Character Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20`, borderColor: color, borderWidth: '2px' }}>
                  {ElementIcon && <ElementIcon className="w-6 h-6" style={{ color }} />}
                </div>
                <span className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">{subtype.primary}</span>
              </div>
              
              <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-4" style={{ color }}>
                {subtype.name}
              </h1>
              
              <p className="text-2xl text-muted-foreground mb-6 italic">
                {subtype.title}
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {subtype.tagline}
              </p>
              
              {/* Core Stats */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 mt-1 flex-shrink-0" style={{ color }} />
                  <div>
                    <h3 className="font-semibold mb-1">Axes</h3>
                    <p className="text-muted-foreground">{subtype.axes}</p>
                  </div>
                </div>
                
                {subtype.developmentPriority && (
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 mt-1 flex-shrink-0" style={{ color }} />
                    <div>
                      <h3 className="font-semibold mb-1">Development Priority</h3>
                      <p className="text-muted-foreground">{subtype.developmentPriority}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 mt-1 flex-shrink-0" style={{ color }} />
                  <div>
                    <h3 className="font-semibold mb-1">Stress Response</h3>
                    <p className="text-muted-foreground">{subtype.stressResponse}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Character Stats Card */}
            <div className="relative">
              <div
                className="rounded-2xl border-2 p-8 space-y-6"
                style={{
                  backgroundColor: `${color}0a`,
                  borderColor: `${color}40`,
                }}
              >
                <div className="space-y-2 border-b pb-6" style={{ borderColor: `${color}20` }}>
                  <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">Overview</h2>
                  <p className="text-sm text-muted-foreground">{subtype.overview}</p>
                </div>
                
                <div className="space-y-4">
                  {subtype.strengths && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color }}>
                        <Sparkles className="w-4 h-4" /> Strengths
                      </h3>
                      <ul className="space-y-2">
                        {subtype.strengths.map((strength, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {subtype.weaknesses && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2" style={{ color }}>
                        <Target className="w-4 h-4" /> Challenges
                      </h3>
                      <ul className="space-y-2">
                        {subtype.weaknesses.map((weakness, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Communication & Interaction */}
          {subtype.communicationStyle && (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="rounded-xl border p-6" style={{ backgroundColor: `${color}05`, borderColor: `${color}20` }}>
                <h3 className="font-serif text-2xl font-bold mb-4" style={{ color }}>Communication Style</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-semibold text-foreground">Pace:</span>
                    <p className="text-muted-foreground">{subtype.communicationStyle.pace}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">Tone:</span>
                    <p className="text-muted-foreground">{subtype.communicationStyle.tone}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">Preferred Input:</span>
                    <p className="text-muted-foreground">{subtype.communicationStyle.preferredInput}</p>
                  </div>
                  {subtype.communicationStyle.petPeeve && (
                    <div>
                      <span className="text-sm font-semibold text-foreground">Pet Peeve:</span>
                      <p className="text-muted-foreground">{subtype.communicationStyle.petPeeve}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {subtype.relationshipPatterns && (
                <div className="rounded-xl border p-6" style={{ backgroundColor: secondaryColor ? `${secondaryColor}05` : `${color}05`, borderColor: secondaryColor ? `${secondaryColor}20` : `${color}20` }}>
                  <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: secondaryColor || color }}>Relationship Approach</h3>
                  <p className="text-muted-foreground leading-relaxed">{subtype.relationshipPatterns}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Career & Growth */}
          {(subtype.career?.idealRoles || subtype.recoveryStrategy) && (
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {subtype.career?.idealRoles && (
                <div className="rounded-xl border p-6" style={{ backgroundColor: `${color}05`, borderColor: `${color}20` }}>
                  <h3 className="font-serif text-2xl font-bold mb-4" style={{ color }}>Ideal Careers</h3>
                  <ul className="space-y-2">
                    {subtype.career.idealRoles.map((role, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }} />
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {subtype.recoveryStrategy && (
                <div className="rounded-xl border p-6" style={{ backgroundColor: secondaryColor ? `${secondaryColor}05` : `${color}05`, borderColor: secondaryColor ? `${secondaryColor}20` : `${color}20` }}>
                  <h3 className="font-serif text-2xl font-bold mb-4" style={{ color: secondaryColor || color }}>Recovery Strategy</h3>
                  <p className="text-muted-foreground leading-relaxed">{subtype.recoveryStrategy}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Know Thyself */}
          <div className="mb-16 rounded-2xl border p-6 md:p-8 relative overflow-hidden" style={{ backgroundColor: `${color}08`, borderColor: `${color}30` }}>
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: secondaryColor || color }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-xl flex items-center justify-center border" style={{ borderColor: `${color}50`, backgroundColor: `${color}18` }}>
                  <Eye className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.28em] uppercase text-muted-foreground">Know Thyself</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color }}>The Deeper Pattern</h2>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
                These are the patterns that often make a result feel uncomfortably accurate: the fear underneath the behavior, the way others misread you, and the small growth move that changes everything.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <InsightCard color={color} icon={<Shield className="w-5 h-5" />} title="Core Fear" body={knowThyself.coreFear} />
                <InsightCard color={color} icon={<Eye className="w-5 h-5" />} title="What People Misunderstand" body={knowThyself.misunderstoodAs} />
                <InsightCard color={color} icon={<Heart className="w-5 h-5" />} title="Relationship Pattern" body={knowThyself.relationshipPattern} />
                <InsightCard color={color} icon={<Briefcase className="w-5 h-5" />} title="Work Pattern" body={knowThyself.workPattern} />
              </div>

              <div className="grid lg:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border p-5" style={{ borderColor: `${color}25`, backgroundColor: 'rgba(13, 13, 15, 0.42)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5" style={{ color }} />
                    <h3 className="font-serif text-xl font-bold">Stress Spiral</h3>
                  </div>
                  <div className="space-y-2">
                    {knowThyself.stressSpiral.map((step, index) => (
                      <div key={`${step}-${index}`} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: `${color}22`, color }}>
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <InsightCard color={color} icon={<Target className="w-5 h-5" />} title="Blind Spot" body={knowThyself.blindSpot} compact />
                <InsightCard color={color} icon={<Zap className="w-5 h-5" />} title="Growth Move" body={knowThyself.growthMove} compact />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <InsightCard color={color} icon={<Heart className="w-5 h-5" />} title="How To Love This Type" body={knowThyself.howToLove} />
                <InsightCard color={color} icon={<AlertTriangle className="w-5 h-5" />} title="How They Self-Sabotage" body={knowThyself.selfSabotage} />
              </div>

              <div className="rounded-xl border p-5" style={{ borderColor: `${color}30`, backgroundColor: 'rgba(13, 13, 15, 0.48)' }}>
                <p className="font-serif text-xs tracking-[0.28em] uppercase text-muted-foreground mb-4">This is you if...</p>
                <div className="grid md:grid-cols-3 gap-3">
                  {knowThyself.thisIsYouIf.map((item) => (
                    <div key={item} className="rounded-lg border px-4 py-3" style={{ borderColor: `${color}22`, backgroundColor: `${color}0d` }}>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Practice This Type */}
          <div className="mb-16 rounded-2xl border p-6 md:p-8 relative overflow-hidden" style={{ backgroundColor: 'rgba(13, 13, 15, 0.72)', borderColor: `${color}30` }}>
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full blur-3xl opacity-15" style={{ backgroundColor: secondaryColor || color }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-xl flex items-center justify-center border" style={{ borderColor: `${color}50`, backgroundColor: `${color}18` }}>
                  <CalendarCheck className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.28em] uppercase text-muted-foreground">Practice This Type</p>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color }}>Turn Insight Into Growth</h2>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mb-8">
                A temperament result becomes useful when it changes what you notice this week. Start with one practice, not a personality overhaul.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <PracticeCard color={color} icon={<CalendarCheck className="w-5 h-5" />} title="Daily Practice" body={learningGuide.dailyPractice} />
                <PracticeCard color={color} icon={<MessageCircle className="w-5 h-5" />} title="Relationship Practice" body={learningGuide.relationshipPractice} />
                <PracticeCard color={color} icon={<Briefcase className="w-5 h-5" />} title="Work Practice" body={learningGuide.workPractice} />
                <PracticeCard color={color} icon={<RefreshCw className="w-5 h-5" />} title="Stress Reset" body={learningGuide.stressReset} />
                <PracticeCard color={color} icon={<PenLine className="w-5 h-5" />} title="Journal Prompt" body={learningGuide.journalPrompt} />
                <PracticeCard color={color} icon={<Gauge className="w-5 h-5" />} title="Watch This Week" body={learningGuide.weeklyWatch} />
              </div>

              <div className="rounded-xl border p-5" style={{ borderColor: `${color}30`, backgroundColor: `${color}08` }}>
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle2 className="w-5 h-5" style={{ color }} />
                  <div>
                    <p className="font-serif text-xs tracking-[0.28em] uppercase text-muted-foreground">How This Type Matures</p>
                    <h3 className="font-serif text-2xl font-bold">Same Nature, Better Stewardship</h3>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <MaturityCard color={color} expression={learningGuide.maturity.immature} />
                  <MaturityCard color={color} expression={learningGuide.maturity.balanced} />
                  <MaturityCard color={color} expression={learningGuide.maturity.mature} />
                </div>
              </div>
            </div>
          </div>

          {/* Famous Examples */}
          {subtype.famousExamples && subtype.famousExamples.length > 0 && (
            <div className="rounded-xl border p-8 mb-16" style={{ backgroundColor: `${color}05`, borderColor: `${color}20` }}>
              <h3 className="font-serif text-2xl font-bold mb-6" style={{ color }}>Notable Examples</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {subtype.famousExamples.map((example, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ backgroundColor: `${color}10` }}>
                    <p className="font-semibold text-sm">{example.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{example.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Tagline */}
          {subtype.tagline && (
            <div className="text-center py-12 border-t border-b" style={{ borderColor: `${color}20` }}>
              <p className="text-2xl font-serif italic text-muted-foreground mb-3">
                {subtype.tagline}
              </p>
              <p className="text-sm text-muted-foreground">The essence of {subtype.name}</p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl font-bold mb-4">Discover Your Type</h2>
          <p className="text-muted-foreground mb-8">Not sure if this is your temperament? Take our comprehensive quiz to find out.</p>
          <Link
            href="/quiz"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: color, color: '#0D0D0F' }}
          >
            Take the Quiz
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

function PracticeCard({
  color,
  icon,
  title,
  body,
}: {
  color: string
  icon: ReactNode
  title: string
  body: string
}) {
  return (
    <div className="rounded-xl border p-5" style={{ borderColor: `${color}25`, backgroundColor: 'rgba(13, 13, 15, 0.46)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }}>{icon}</span>
        <h3 className="font-serif text-lg font-bold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  )
}

function MaturityCard({
  color,
  expression,
}: {
  color: string
  expression: { label: string; body: string }
}) {
  return (
    <div className="rounded-lg border px-4 py-4" style={{ borderColor: `${color}22`, backgroundColor: 'rgba(13, 13, 15, 0.48)' }}>
      <p className="font-serif text-sm font-bold mb-2" style={{ color }}>{expression.label}</p>
      <p className="text-sm text-muted-foreground leading-relaxed">{expression.body}</p>
    </div>
  )
}

function InsightCard({
  color,
  icon,
  title,
  body,
  compact = false,
}: {
  color: string
  icon: ReactNode
  title: string
  body: string
  compact?: boolean
}) {
  return (
    <div className="rounded-xl border p-5" style={{ borderColor: `${color}25`, backgroundColor: 'rgba(13, 13, 15, 0.42)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color }}>{icon}</span>
        <h3 className={`font-serif font-bold ${compact ? 'text-lg' : 'text-xl'}`}>{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  )
}
