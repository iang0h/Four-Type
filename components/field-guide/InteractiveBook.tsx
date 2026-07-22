'use client'

import Image from 'next/image'
import { BookOpen } from 'lucide-react'
import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react'
import { useBookPreview } from './BookPreview'

type BookRotation = {
  x: number
  y: number
}

const RESTING_ROTATION: BookRotation = { x: 3, y: -7 }

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  return reducedMotion
}

export default function InteractiveBook() {
  const { openPreview } = useBookPreview()
  const reducedMotion = useReducedMotion()
  const [rotation, setRotation] = useState<BookRotation>(RESTING_ROTATION)

  function updateTilt(event: PointerEvent<HTMLButtonElement>) {
    if (reducedMotion || event.pointerType !== 'mouse') return

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const rotateY = Math.max(-7, Math.min(7, ((event.clientX - left) / width - 0.5) * 14))
    const rotateX = Math.max(-5, Math.min(5, -((event.clientY - top) / height - 0.5) * 10))

    setRotation({ x: rotateX, y: rotateY })
  }

  const style = {
    '--book-rotate-x': `${rotation.x}deg`,
    '--book-rotate-y': `${rotation.y}deg`,
  } as CSSProperties

  return (
    <div className="field-guide-book-stage">
      <div className="field-guide-book-shadow" aria-hidden="true" />
      <button
        type="button"
        className="interactive-book"
        style={style}
        aria-label="Open the Field Guide page preview"
        onClick={() => openPreview(0)}
        onPointerMove={updateTilt}
        onPointerLeave={() => setRotation(RESTING_ROTATION)}
      >
        <span className="field-guide-book-pages" aria-hidden="true" />
        <Image
          src="/images/field-guide/cover.webp"
          alt="FourType Field Guide cover"
          width={980}
          height={1400}
          priority
          sizes="(max-width: 760px) 230px, 340px"
        />
      </button>
      <p className="field-guide-book-caption"><BookOpen aria-hidden="true" size={16} /> Open the book preview</p>
    </div>
  )
}
