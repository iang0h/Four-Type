'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react'
import { trackFieldGuideEvent } from './CampaignAnalytics'
import { consumePreviewClickGuard, getPreviewSwipeDirection, getWrappedPreviewIndex, type InteractionPoint } from './interaction-logic'

export const PREVIEW_PAGES = [
  {
    page: 24,
    pages: '24-25',
    left: '/images/field-guide/preview-24.webp',
    right: '/images/field-guide/preview-25.webp',
    title: 'Method and the Commander',
    leftAlt: 'FourType method summary page',
    rightAlt: 'Commander Choleric chapter opener with an illustrated workplace scene',
  },
  {
    page: 36,
    pages: '36-37',
    left: '/images/field-guide/preview-36.webp',
    right: '/images/field-guide/preview-37.webp',
    title: 'Worked case and the Bard',
    leftAlt: 'Commander Choleric workplace case study page',
    rightAlt: 'Bard Sanguine chapter opener with an illustrated creative scene',
  },
  {
    page: 48,
    pages: '48-49',
    left: '/images/field-guide/preview-48.webp',
    right: '/images/field-guide/preview-49.webp',
    title: 'Worked case and the Strategist',
    leftAlt: 'Bard Sanguine worked case page',
    rightAlt: 'Strategist Melancholic chapter opener with an illustrated analysis scene',
  },
  {
    page: 60,
    pages: '60-61',
    left: '/images/field-guide/preview-60.webp',
    right: '/images/field-guide/preview-61.webp',
    title: 'Worked case and the Guardian',
    leftAlt: 'Strategist Melancholic worked case page',
    rightAlt: 'Guardian Phlegmatic chapter opener with an illustrated household scene',
  },
  {
    page: 76,
    pages: '76-77',
    left: '/images/field-guide/preview-76.webp',
    right: '/images/field-guide/preview-77.webp',
    title: 'Blend field lab',
    leftAlt: 'Writable directional blend field lab',
    rightAlt: 'Commander-Bard directional blend with an illustrated meeting scene',
  },
  {
    page: 108,
    pages: '108-109',
    left: '/images/field-guide/preview-108.webp',
    right: '/images/field-guide/preview-109.webp',
    title: 'FourType in real life',
    leftAlt: 'Twelve-blend practice map',
    rightAlt: 'Illustrated meeting scene showing FourType in real life',
  },
  {
    page: 130,
    pages: '130-131',
    left: '/images/field-guide/preview-130.webp',
    right: '/images/field-guide/preview-131.webp',
    title: 'Field practice',
    leftAlt: 'Writable field note worksheet',
    rightAlt: 'Observe before you label reflection worksheet',
  },
] as const

type BookPreviewContextValue = {
  activeIndex: number
  isOpen: boolean
  closePreview: () => void
  navigatePreview: (direction: -1 | 1) => void
  openPreview: (index: number) => void
  selectPreview: (index: number) => void
}

const BookPreviewContext = createContext<BookPreviewContextValue | null>(null)

export function BookPreviewProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const activeIndexRef = useRef(0)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const trackNavigation = useCallback((index: number) => {
    trackFieldGuideEvent({ event: 'field-guide-preview-navigate', previewPage: PREVIEW_PAGES[index].page })
  }, [])

  const selectPreview = useCallback((index: number) => {
    const normalizedIndex = ((index % PREVIEW_PAGES.length) + PREVIEW_PAGES.length) % PREVIEW_PAGES.length

    if (activeIndexRef.current === normalizedIndex) return

    activeIndexRef.current = normalizedIndex
    setActiveIndex(normalizedIndex)
    trackNavigation(normalizedIndex)
  }, [trackNavigation])

  const navigatePreview = useCallback((direction: -1 | 1) => {
    const nextIndex = getWrappedPreviewIndex(activeIndexRef.current, direction, PREVIEW_PAGES.length)

    activeIndexRef.current = nextIndex
    setActiveIndex(nextIndex)
    trackNavigation(nextIndex)
  }, [trackNavigation])

  const openPreview = useCallback((index: number) => {
    const normalizedIndex = ((index % PREVIEW_PAGES.length) + PREVIEW_PAGES.length) % PREVIEW_PAGES.length
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    activeIndexRef.current = normalizedIndex
    setActiveIndex(normalizedIndex)
    setIsOpen(true)
    trackFieldGuideEvent({ event: 'field-guide-preview-open', previewPage: PREVIEW_PAGES[normalizedIndex].page })
  }, [])

  const closePreview = useCallback(() => {
    setIsOpen(false)
    window.setTimeout(() => returnFocusRef.current?.focus(), 0)
  }, [])

  return (
    <BookPreviewContext.Provider value={{ activeIndex, isOpen, closePreview, navigatePreview, openPreview, selectPreview }}>
      {children}
    </BookPreviewContext.Provider>
  )
}

export function useBookPreview() {
  const context = useContext(BookPreviewContext)

  if (!context) {
    throw new Error('useBookPreview must be used within BookPreviewProvider')
  }

  return context
}

function useInlinePreview() {
  const [isInlinePreview, setIsInlinePreview] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 680px)')
    const updateLayout = () => setIsInlinePreview(mediaQuery.matches)

    updateLayout()
    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  return isInlinePreview
}

export default function BookPreview() {
  const { activeIndex, closePreview, isOpen, navigatePreview, openPreview, selectPreview } = useBookPreview()
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const didSwipeRef = useRef(false)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const touchStartRef = useRef<InteractionPoint | null>(null)
  const isInlinePreview = useInlinePreview()
  const activeSpread = PREVIEW_PAGES[activeIndex]

  useEffect(() => {
    if (!isOpen) return

    const focusTimer = window.setTimeout(() => {
      if (isInlinePreview) {
        dialogRef.current?.scrollIntoView({ block: 'nearest' })
        dialogRef.current?.focus()
        return
      }

      closeButtonRef.current?.focus()
    }, 0)

    return () => window.clearTimeout(focusTimer)
  }, [isInlinePreview, isOpen])

  useEffect(() => {
    if (!isOpen) return

    function handleDialogKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePreview()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        navigatePreview(-1)
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        navigatePreview(1)
        return
      }

      if (isInlinePreview || event.key !== 'Tab' || !dialogRef.current) return

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'))
      const first = focusable[0]
      const last = focusable.at(-1)

      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleDialogKeyDown)
    return () => document.removeEventListener('keydown', handleDialogKeyDown)
  }, [closePreview, isInlinePreview, isOpen, navigatePreview])

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    const touch = event.changedTouches[0]
    didSwipeRef.current = false
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const touch = event.changedTouches[0]
    const touchStart = touchStartRef.current

    if (!touchStart) return

    touchStartRef.current = null
    const swipeDirection = getPreviewSwipeDirection(touchStart, { x: touch.clientX, y: touch.clientY })

    if (swipeDirection === null) return

    didSwipeRef.current = true
    navigatePreview(swipeDirection)
  }

  function shouldSuppressPreviewPageClick() {
    const clickGuard = consumePreviewClickGuard(didSwipeRef.current)
    didSwipeRef.current = clickGuard.didSwipe
    return clickGuard.shouldSuppressClick
  }

  function handleOpenPreviewClick() {
    if (shouldSuppressPreviewPageClick()) return

    openPreview(activeIndex)
  }

  function handleDialogPreviewClick() {
    if (shouldSuppressPreviewPageClick()) return

    navigatePreview(1)
  }

  return (
    <div className="field-guide-preview-experience" aria-label="Field Guide page previews">
      <div className="field-guide-preview-viewer">
        <button
          type="button"
          className="field-guide-preview-page"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleOpenPreviewClick}
          aria-label={`Open pages ${activeSpread.pages}, ${activeSpread.title}, in an enlarged preview`}
        >
          <span className="field-guide-preview-spread">
            <Image src={activeSpread.left} alt={activeSpread.leftAlt} width={980} height={1400} sizes="(max-width: 680px) 50vw, 430px" />
            <Image src={activeSpread.right} alt={activeSpread.rightAlt} width={980} height={1400} sizes="(max-width: 680px) 50vw, 430px" />
          </span>
        </button>
        <div className="field-guide-preview-controls">
          <button type="button" className="field-guide-icon-button" onClick={() => navigatePreview(-1)} aria-label="Show previous preview page">
            <ChevronLeft aria-hidden="true" size={19} />
          </button>
          <p aria-live="polite"><span>Pages {activeSpread.pages}</span> {activeIndex + 1} of {PREVIEW_PAGES.length} · {activeSpread.title}</p>
          <button type="button" className="field-guide-icon-button" onClick={() => navigatePreview(1)} aria-label="Show next preview page">
            <ChevronRight aria-hidden="true" size={19} />
          </button>
        </div>
      </div>

      <div className="field-guide-preview-thumbnails" aria-label="Select a Field Guide preview page">
        {PREVIEW_PAGES.map((page, index) => (
          <button
            key={page.pages}
            type="button"
            className={index === activeIndex ? 'is-selected' : ''}
            aria-pressed={index === activeIndex}
            onClick={() => selectPreview(index)}
          >
            <span className="field-guide-preview-thumbnail-spread" aria-hidden="true">
              <Image src={page.left} alt="" width={180} height={257} sizes="(max-width: 680px) 10vw, 55px" />
              <Image src={page.right} alt="" width={180} height={257} sizes="(max-width: 680px) 10vw, 55px" />
            </span>
            <span className="field-guide-sr-only">Pages {page.pages}: {page.title}</span>
          </button>
        ))}
      </div>

      {isOpen && (
        <div className={`field-guide-preview-dialog${isInlinePreview ? ' is-inline' : ''}`}>
          <div
            ref={dialogRef}
            className="field-guide-preview-dialog-panel"
            role={isInlinePreview ? undefined : 'dialog'}
            aria-modal={isInlinePreview ? undefined : true}
            aria-label={`Enlarged preview of pages ${activeSpread.pages}: ${activeSpread.title}`}
            tabIndex={-1}
          >
            <button ref={closeButtonRef} type="button" className="field-guide-preview-close" onClick={closePreview} aria-label="Close enlarged preview">
              <X aria-hidden="true" size={20} />
            </button>
            <button type="button" className="field-guide-preview-dialog-page" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onClick={handleDialogPreviewClick} aria-label="Show next preview page">
              <span className="field-guide-preview-spread">
                <Image src={activeSpread.left} alt={activeSpread.leftAlt} width={980} height={1400} sizes="(max-width: 680px) 50vw, 520px" />
                <Image src={activeSpread.right} alt={activeSpread.rightAlt} width={980} height={1400} sizes="(max-width: 680px) 50vw, 520px" />
              </span>
            </button>
            <div className="field-guide-preview-controls">
              <button type="button" className="field-guide-icon-button" onClick={() => navigatePreview(-1)} aria-label="Show previous preview page">
                <ChevronLeft aria-hidden="true" size={19} />
              </button>
              <p aria-live="polite"><span>Pages {activeSpread.pages}</span> {activeIndex + 1} of {PREVIEW_PAGES.length} · {activeSpread.title}</p>
              <button type="button" className="field-guide-icon-button" onClick={() => navigatePreview(1)} aria-label="Show next preview page">
                <ChevronRight aria-hidden="true" size={19} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
