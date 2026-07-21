'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type TouchEvent } from 'react'
import { trackFieldGuideEvent } from './CampaignAnalytics'
import { consumePreviewClickGuard, getPreviewSwipeDirection, getWrappedPreviewIndex, type InteractionPoint } from './interaction-logic'

export const PREVIEW_PAGES = [
  { page: 1, src: '/images/field-guide/preview-01.webp', title: 'The Field Guide cover', alt: 'The FourType Field Guide cover' },
  { page: 9, src: '/images/field-guide/preview-09.webp', title: 'The FourType map', alt: 'The FourType map and attention patterns' },
  { page: 10, src: '/images/field-guide/preview-10.webp', title: 'The two-axis view', alt: 'A two-axis FourType diagram' },
  { page: 25, src: '/images/field-guide/preview-25.webp', title: 'The attention patterns', alt: 'An opening page for a FourType attention pattern' },
  { page: 77, src: '/images/field-guide/preview-77.webp', title: 'Directional blends', alt: 'A FourType directional blend spread' },
  { page: 109, src: '/images/field-guide/preview-109.webp', title: 'FourType in real life', alt: 'A FourType real-life scenario' },
  { page: 131, src: '/images/field-guide/preview-131.webp', title: 'Stress and repair', alt: 'A practical FourType repair method' },
  { page: 142, src: '/images/field-guide/preview-142.webp', title: 'Field practice worksheet', alt: 'A printable Field Guide worksheet' },
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
  const activePage = PREVIEW_PAGES[activeIndex]

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
          aria-label={`Open page ${activePage.page}, ${activePage.title}, in an enlarged preview`}
        >
          <Image src={activePage.src} alt={activePage.alt} width={980} height={1400} sizes="(max-width: 680px) 100vw, 460px" />
        </button>
        <div className="field-guide-preview-controls">
          <button type="button" className="field-guide-icon-button" onClick={() => navigatePreview(-1)} aria-label="Show previous preview page">
            <ChevronLeft aria-hidden="true" size={19} />
          </button>
          <p aria-live="polite"><span>Page {activePage.page}</span> {activeIndex + 1} of {PREVIEW_PAGES.length} · {activePage.title}</p>
          <button type="button" className="field-guide-icon-button" onClick={() => navigatePreview(1)} aria-label="Show next preview page">
            <ChevronRight aria-hidden="true" size={19} />
          </button>
        </div>
      </div>

      <div className="field-guide-preview-thumbnails" aria-label="Select a Field Guide preview page">
        {PREVIEW_PAGES.map((page, index) => (
          <button
            key={page.src}
            type="button"
            className={index === activeIndex ? 'is-selected' : ''}
            aria-pressed={index === activeIndex}
            onClick={() => selectPreview(index)}
          >
            <Image src={page.src} alt="" width={180} height={257} sizes="(max-width: 680px) 20vw, 90px" />
            <span className="field-guide-sr-only">Page {page.page}: {page.title}</span>
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
            aria-label={`Enlarged preview of page ${activePage.page}: ${activePage.title}`}
            tabIndex={-1}
          >
            <button ref={closeButtonRef} type="button" className="field-guide-preview-close" onClick={closePreview} aria-label="Close enlarged preview">
              <X aria-hidden="true" size={20} />
            </button>
            <button type="button" className="field-guide-preview-dialog-page" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onClick={handleDialogPreviewClick} aria-label="Show next preview page">
              <Image src={activePage.src} alt={activePage.alt} width={980} height={1400} sizes="(max-width: 680px) 100vw, 70vw" />
            </button>
            <div className="field-guide-preview-controls">
              <button type="button" className="field-guide-icon-button" onClick={() => navigatePreview(-1)} aria-label="Show previous preview page">
                <ChevronLeft aria-hidden="true" size={19} />
              </button>
              <p aria-live="polite"><span>Page {activePage.page}</span> {activeIndex + 1} of {PREVIEW_PAGES.length} · {activePage.title}</p>
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
