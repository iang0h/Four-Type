'use client'

import { useEffect, useRef, useCallback } from 'react'

interface CinematicBackgroundProps {
  /** 1-40 question number for assessment, or undefined for results */
  questionNumber?: number
  /** Temperament key for results screen theming */
  temperament?: 'Yellow' | 'Red' | 'Blue' | 'Green'
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
  life: number
  maxLife: number
}

interface Rune {
  x: number
  y: number
  rotation: number
  rotationSpeed: number
  size: number
  alpha: number
  pulsePhase: number
}

const TEMPERAMENT_THEMES = {
  Yellow: {
    baseColor: [255, 200, 60],
    accentColor: [255, 165, 0],
    particleColors: ['#FFD700', '#FFA500', '#FFCC00', '#FFE066'],
  },
  Red: {
    baseColor: [180, 40, 40],
    accentColor: [255, 100, 50],
    particleColors: ['#E63946', '#FF4444', '#FF6B35', '#CC2936'],
  },
  Blue: {
    baseColor: [30, 60, 120],
    accentColor: [76, 201, 240],
    particleColors: ['#4CC9F0', '#00B4D8', '#0077B6', '#90E0EF'],
  },
  Green: {
    baseColor: [30, 80, 60],
    accentColor: [82, 183, 136],
    particleColors: ['#52B788', '#40916C', '#74C69D', '#2D6A4F'],
  },
}

export default function CinematicBackground({ questionNumber, temperament }: CinematicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const runesRef = useRef<Rune[]>([])
  const timeRef = useRef(0)
  const rafRef = useRef<number | undefined>(undefined)

  // Calculate color temperature based on question progress (warm gold -> cold blue)
  const getProgressColor = useCallback((progress: number) => {
    // Q1 = warm gold (#FFD700), Q40 = cold blue (#0a0a2e)
    const warmR = 26, warmG = 0, warmB = 0 // #1a0000
    const coldR = 10, coldG = 10, coldB = 46 // #0a0a2e
    
    const r = Math.round(warmR + (coldR - warmR) * progress)
    const g = Math.round(warmG + (coldG - warmG) * progress)
    const b = Math.round(warmB + (coldB - warmB) * progress)
    
    return { r, g, b }
  }, [])

  // Get theme based on context
  const getTheme = useCallback(() => {
    if (temperament) {
      return TEMPERAMENT_THEMES[temperament]
    }
    // During assessment, use warm gold theme shifting to blue
    return TEMPERAMENT_THEMES.Yellow
  }, [temperament])

  const initParticles = useCallback((width: number, height: number, count: number) => {
    const theme = getTheme()
    const particles: Particle[] = []
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height + height * 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.8 - 0.2,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        color: theme.particleColors[Math.floor(Math.random() * theme.particleColors.length)],
        life: 0,
        maxLife: Math.random() * 400 + 200,
      })
    }
    
    return particles
  }, [getTheme])

  const initRunes = useCallback((width: number, height: number) => {
    const runes: Rune[] = []
    const cols = Math.ceil(width / 80)
    const rows = Math.ceil(height / 80)
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.5) continue // Sparse placement
        runes.push({
          x: i * 80 + 40 + (Math.random() - 0.5) * 20,
          y: j * 80 + 40 + (Math.random() - 0.5) * 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.002,
          size: Math.random() * 15 + 10,
          alpha: 0.02 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }
    
    return runes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = initParticles(canvas.width, canvas.height, 60)
      runesRef.current = initRunes(canvas.width, canvas.height)
    }
    
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      timeRef.current += 1
      const time = timeRef.current
      
      const { width, height } = canvas
      
      // Clear with base color
      ctx.fillStyle = '#0D0D0F'
      ctx.fillRect(0, 0, width, height)
      
      // Calculate progress for color shift during assessment
      const progress = questionNumber ? (questionNumber - 1) / 39 : 0
      
      // Radial gradient background (pulsing)
      const pulseAlpha = 0.15 + Math.sin(time * 0.008) * 0.05
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) * 0.7
      )
      
      if (temperament) {
        // Results screen: use temperament theme
        const theme = TEMPERAMENT_THEMES[temperament]
        gradient.addColorStop(0, `rgba(${theme.baseColor.join(',')}, ${pulseAlpha})`)
        gradient.addColorStop(0.5, `rgba(${theme.baseColor[0] / 2}, ${theme.baseColor[1] / 2}, ${theme.baseColor[2] / 2}, ${pulseAlpha * 0.5})`)
        gradient.addColorStop(1, 'rgba(13, 13, 15, 0)')
      } else {
        // Assessment: shift from warm to cold
        const { r, g, b } = getProgressColor(progress)
        gradient.addColorStop(0, `rgba(${r + 10}, ${g}, ${b}, ${pulseAlpha})`)
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${pulseAlpha * 0.5})`)
        gradient.addColorStop(1, 'rgba(13, 13, 15, 0)')
      }
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // Draw hexagonal runes (ghostly grid)
      ctx.save()
      runesRef.current.forEach((rune) => {
        rune.rotation += rune.rotationSpeed
        const pulse = Math.sin(time * 0.01 + rune.pulsePhase) * 0.02
        const alpha = rune.alpha + pulse
        
        const theme = getTheme()
        ctx.strokeStyle = `rgba(${theme.accentColor.join(',')}, ${alpha})`
        ctx.lineWidth = 1
        
        ctx.save()
        ctx.translate(rune.x, rune.y)
        ctx.rotate(rune.rotation)
        
        // Draw hexagon
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i
          const x = Math.cos(angle) * rune.size
          const y = Math.sin(angle) * rune.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()
        
        // Inner hexagon
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i + Math.PI / 6
          const x = Math.cos(angle) * rune.size * 0.5
          const y = Math.sin(angle) * rune.size * 0.5
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.stroke()
        
        ctx.restore()
      })
      ctx.restore()
      
      // Update and draw particles
      const theme = getTheme()
      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life += 1
        
        // Fade out at top or when life exceeded
        const fadeY = Math.max(0, 1 - particle.y / (height * 0.3))
        const fadeLife = 1 - particle.life / particle.maxLife
        const alpha = particle.alpha * fadeY * fadeLife
        
        // Reset particle if dead
        if (particle.life >= particle.maxLife || particle.y < 0) {
          particle.x = Math.random() * width
          particle.y = height + Math.random() * 50
          particle.life = 0
          particle.maxLife = Math.random() * 400 + 200
          particle.color = theme.particleColors[Math.floor(Math.random() * theme.particleColors.length)]
        }
        
        // Draw ember/particle with glow
        if (alpha > 0.01) {
          ctx.save()
          ctx.globalAlpha = alpha
          
          // Glow
          const glow = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 4
          )
          glow.addColorStop(0, particle.color)
          glow.addColorStop(0.4, `${particle.color}60`)
          glow.addColorStop(1, 'transparent')
          
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2)
          ctx.fill()
          
          // Core
          ctx.globalAlpha = alpha * 1.5
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.restore()
        }
      })
      
      rafRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [questionNumber, temperament, getProgressColor, getTheme, initParticles, initRunes])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#0D0D0F' }}
    />
  )
}
