'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Brain, Sparkles, Users } from 'lucide-react'
import RuneBackground from '@/components/RuneBackground'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { homeCopy, type HomeLocale } from '@/lib/home-i18n'

const temperaments = [
  {
    key: 'sanguine',
    color: '#FFD700',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Bard-QJJyqACHiDlWLpgew2foCbl5YGjLOi.png',
  },
  {
    key: 'choleric',
    color: '#E63946',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Commander-rEIrJwEHYOzxNaP1ngaLZqm7A6GdrY.png',
  },
  {
    key: 'melancholic',
    color: '#4CC9F0',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Strategist-11A2ki2xYEb1yOkVrQ2xjaZ1etfh3Z.png',
  },
  {
    key: 'phlegmatic',
    color: '#52B788',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Guardian-98lWuYWNazfR3hvOW2FUE3dkp13BLy.png',
  },
]

const featureIcons = [Brain, Users, BookOpen, Sparkles]

export default function HomePage() {
  return <HomeExperience locale="en" />
}

export function HomeExperience({ locale = 'en' }: { locale?: HomeLocale }) {
  const [hoveredTemp, setHoveredTemp] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const copy = homeCopy[locale]
  const quizHref = locale === 'en' ? '/quiz' : `/${locale}/quiz`
  const localizedTemperaments = temperaments.map((temp) => ({
    ...temp,
    ...copy.temperaments[temp.key],
  }))
  const features = copy.features.map((feature, index) => ({
    ...feature,
    icon: featureIcons[index],
  }))

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // Attempt to play — required on some mobile browsers that ignore autoPlay attribute
    video.muted = true
    video.play().catch(() => {
      // Silent catch — user gesture will be needed on some restricted browsers
    })
  }, [])

  const temperamentTestGuidesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FourType temperament test guide cluster',
    itemListElement: copy.guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.title,
      description: guide.description,
      url: `https://www.fourtype.com${guide.href}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(temperamentTestGuidesSchema) }} />
      <Navigation />
      <main className="min-h-screen bg-background">
        <RuneBackground />

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-12 overflow-hidden">
          {/* Radial dark vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,transparent_50%,rgba(13,13,15,0.85)_100%)]" />

          <div className="relative z-10 w-full flex flex-col items-center px-4">

            {/* FourType logo — responsive sizing for mobile */}
            <div className="w-full max-w-[280px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto flex items-center justify-center mb-1 px-2">
              <Image
                src="/fourtype-logo.png"
                alt={copy.heroAlt}
                width={900}
                height={380}
                className="w-full h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.3)) drop-shadow(0 4px 20px rgba(0,0,0,0.5))',
                }}
                priority
              />
            </div>

            {/* Diamond divider */}
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-12 sm:w-24 bg-[#FFD700]/25" />
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                <path d="M4.5 0L9 4.5L4.5 9L0 4.5Z" fill="#FFD700" fillOpacity="0.7" />
              </svg>
              <div className="h-px w-12 sm:w-24 bg-[#FFD700]/25" />
            </div>

            {/* Video frame */}
            <div className="relative w-full max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto mb-6">
              <span className="pointer-events-none absolute -top-[10px] -left-[10px] w-7 h-7 border-t-2 border-l-2 border-[#FFD700]/75" />
              <span className="pointer-events-none absolute -top-[10px] -right-[10px] w-7 h-7 border-t-2 border-r-2 border-[#FFD700]/75" />
              <span className="pointer-events-none absolute -bottom-[10px] -left-[10px] w-7 h-7 border-b-2 border-l-2 border-[#FFD700]/75" />
              <span className="pointer-events-none absolute -bottom-[10px] -right-[10px] w-7 h-7 border-b-2 border-r-2 border-[#FFD700]/75" />
              <div
                className="overflow-hidden bg-black"
                style={{
                  aspectRatio: '16/9',
                  boxShadow: '0 0 0 1px rgba(255,215,0,0.18), 0 8px 48px rgba(0,0,0,0.7)',
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  style={{ WebkitTransform: 'translateZ(0)' }}
                >
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grok-video-a2da9931-dd77-40ca-b351-adddc5cc3a08-PYDgy4CNaLVdiZe0hjEl7V7Jxejpnr.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Importance statement */}
            <p className="text-center text-sm sm:text-base text-foreground/60 max-w-lg mx-auto mb-6 leading-relaxed">
              {copy.heroStatement}
            </p>

            {/* Gold BEGIN YOUR QUEST button */}
            <Link
              href={quizHref}
              className="group relative flex items-center justify-center gap-3 px-8 sm:px-12 py-3.5 sm:py-4 font-serif font-bold text-base sm:text-lg tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] mb-4"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #B8860B 100%)',
                color: '#1a1000',
                boxShadow: '0 0 35px rgba(255,215,0,0.5), 0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3)',
                borderRadius: '8px',
                border: '1.5px solid rgba(255,215,0,0.9)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 1L11 7H17L12 11L14 17L9 13L4 17L6 11L1 7H7L9 1Z" fill="currentColor" />
              </svg>
              {copy.heroCta}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M9 1L11 7H17L12 11L14 17L9 13L4 17L6 11L1 7H7L9 1Z" fill="currentColor" />
              </svg>
            </Link>
            <p className="font-sans text-xs text-foreground/35 tracking-wider mb-12">
              {copy.heroMeta}
            </p>

            {/* Character Selection */}
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex items-center gap-5 justify-center mb-10">
                <div className="h-px flex-1 max-w-[180px] bg-foreground/12" />
                <p className="font-sans text-[10px] sm:text-xs font-semibold tracking-[0.45em] uppercase text-foreground/35 whitespace-nowrap">
                  {copy.choosePath}
                </p>
                <div className="h-px flex-1 max-w-[180px] bg-foreground/12" />
              </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {localizedTemperaments.map((temp) => (
                  <Link
                    key={temp.key}
                    href={`/temperament/${temp.key}`}
                    className="group relative flex flex-col items-center"
                    onMouseEnter={() => setHoveredTemp(temp.key)}
                    onMouseLeave={() => setHoveredTemp(null)}
                  >
                    {/* Character with ornate frame */}
                    <div 
                      className="relative flex items-end justify-center w-full mb-3 p-3 transition-all duration-300"
                      style={{
                        background: hoveredTemp === temp.key 
                          ? `radial-gradient(ellipse at center bottom, ${temp.color}15 0%, transparent 70%)`
                          : 'transparent',
                      }}
                    >
                      {/* Ornate corner brackets */}
                      <div 
                        className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 rounded-tl transition-all duration-300"
                        style={{ 
                          borderColor: hoveredTemp === temp.key ? temp.color : `${temp.color}40`,
                          boxShadow: hoveredTemp === temp.key ? `0 0 10px ${temp.color}50` : 'none',
                        }}
                      />
                      <div 
                        className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 rounded-tr transition-all duration-300"
                        style={{ 
                          borderColor: hoveredTemp === temp.key ? temp.color : `${temp.color}40`,
                          boxShadow: hoveredTemp === temp.key ? `0 0 10px ${temp.color}50` : 'none',
                        }}
                      />
                      <div 
                        className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 rounded-bl transition-all duration-300"
                        style={{ 
                          borderColor: hoveredTemp === temp.key ? temp.color : `${temp.color}40`,
                          boxShadow: hoveredTemp === temp.key ? `0 0 10px ${temp.color}50` : 'none',
                        }}
                      />
                      <div 
                        className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 rounded-br transition-all duration-300"
                        style={{ 
                          borderColor: hoveredTemp === temp.key ? temp.color : `${temp.color}40`,
                          boxShadow: hoveredTemp === temp.key ? `0 0 10px ${temp.color}50` : 'none',
                        }}
                      />
                      {/* Platform glow */}
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-20 sm:h-28 rounded-full blur-2xl transition-all duration-300"
                        style={{ 
                          backgroundColor: temp.color, 
                          opacity: hoveredTemp === temp.key ? 0.5 : 0.15,
                          transform: hoveredTemp === temp.key ? 'scale(1.2)' : 'scale(1)',
                        }}
                      />
                      <Image
                        src={temp.image}
                        alt={temp.title}
                        width={140}
                        height={175}
                        className="relative object-contain transition-all duration-300 group-hover:-translate-y-3 group-hover:scale-105 w-auto h-[120px] sm:h-[155px]"
                        style={{
                          filter: hoveredTemp === temp.key 
                            ? `drop-shadow(0 0 20px ${temp.color}) drop-shadow(0 0 40px ${temp.color}60)`
                            : 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                        }}
                      />
                    </div>

                    {/* Name card - parchment style */}
                    <div
                      className="w-full px-2 sm:px-3 py-2 sm:py-3 text-center transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: hoveredTemp === temp.key 
                          ? `linear-gradient(135deg, ${temp.color}15 0%, ${temp.color}08 100%)`
                          : 'linear-gradient(135deg, rgba(26,26,46,0.8) 0%, rgba(18,18,30,0.9) 100%)',
                        border: `2px solid ${hoveredTemp === temp.key ? temp.color : `${temp.color}50`}`,
                        boxShadow: hoveredTemp === temp.key
                          ? `0 0 25px ${temp.color}50, inset 0 0 15px ${temp.color}15`
                          : `0 2px 10px rgba(0,0,0,0.3)`,
                      }}
                    >
                      {/* Inner corner accents */}
                      <div className="absolute top-0.5 left-0.5 w-2 h-2 border-l border-t transition-colors duration-300" style={{ borderColor: temp.color }} />
                      <div className="absolute top-0.5 right-0.5 w-2 h-2 border-r border-t transition-colors duration-300" style={{ borderColor: temp.color }} />
                      <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-l border-b transition-colors duration-300" style={{ borderColor: temp.color }} />
                      <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-r border-b transition-colors duration-300" style={{ borderColor: temp.color }} />
                      
                      <p 
                        className="font-serif text-xs sm:text-sm font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase transition-all duration-300" 
                        style={{ 
                          color: temp.color,
                          textShadow: hoveredTemp === temp.key ? `0 0 10px ${temp.color}` : 'none',
                        }}
                      >
                        {temp.title}
                      </p>
                      <p className="font-sans text-[10px] sm:text-xs text-foreground/45 mt-0.5">{temp.name}</p>
                    </div>

                    {/* Hover detail card */}
                    <div
                      className="absolute bottom-full left-1/2 mb-3 w-52 pointer-events-none z-20 transition-all duration-200"
                      style={{
                        opacity: hoveredTemp === temp.key ? 1 : 0,
                        transform: `translateX(-50%) translateY(${hoveredTemp === temp.key ? '0px' : '8px'})`,
                      }}
                    >
                      <div
                        className="rounded-lg p-4"
                        style={{
                          backgroundColor: '#13131a',
                          border: `1px solid ${temp.color}60`,
                          boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 20px ${temp.color}20`,
                        }}
                      >
                        <p className="font-serif text-xs font-bold tracking-widest uppercase mb-2" style={{ color: temp.color }}>
                          {temp.title}
                        </p>
                        <p className="font-sans text-[11px] text-foreground/70 leading-relaxed mb-3">
                          {temp.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {temp.traits.map((t) => (
                            <span
                              key={t}
                              className="font-sans text-[10px] px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: `${temp.color}20`, color: temp.color }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <div
                          className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
                          style={{ backgroundColor: '#13131a', borderRight: `1px solid ${temp.color}60`, borderBottom: `1px solid ${temp.color}60` }}
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Introductory Text Section — Crawlable SEO Content */}
        <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6 sr-only">
              {copy.introSrTitle}
            </h1>
            <div className="prose prose-invert max-w-none">
              {copy.introParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-card/30 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10 max-w-3xl">
              <p className="text-xs font-semibold tracking-[0.35em] uppercase text-primary mb-3">
                {copy.guideEyebrow}
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                {copy.guideTitle}
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {copy.guideDescription}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {copy.guides.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group relative overflow-hidden rounded-lg border border-border bg-background/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <h3 className="font-serif text-lg font-bold text-foreground mb-3">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {guide.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {copy.readGuide}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 bg-card/50 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#FFD700] mb-2">
                  40
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {copy.stats.peopleTested}
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#4CC9F0] mb-2">
                  16
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {copy.stats.blends}
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl sm:text-5xl font-bold text-[#52B788] mb-2">
                  2,500+
                </p>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {copy.stats.wisdom}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative py-24 lg:py-32 bg-card/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                {copy.whyTitle}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
                {copy.whyDescription}
              </p>
              <div className="w-full max-w-4xl mx-auto mb-16">
                <YouTubeEmbed videoId="MFi57x7BBXE" title={copy.videoTitle} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
