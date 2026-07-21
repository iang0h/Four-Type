import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import {
  consumePreviewClickGuard,
  getCompassFocusIndex,
  getPreviewSwipeDirection,
  getWrappedPreviewIndex,
} from '../components/field-guide/interaction-logic'

test('wraps preview navigation in both directions', () => {
  assert.equal(getWrappedPreviewIndex(0, -1, 8), 7)
  assert.equal(getWrappedPreviewIndex(7, 1, 8), 0)
})

test('requires more than 50 pixels before recognizing a preview swipe', () => {
  assert.equal(getPreviewSwipeDirection({ x: 0, y: 0 }, { x: 50, y: 0 }), null)
  assert.equal(getPreviewSwipeDirection({ x: 0, y: 0 }, { x: 51, y: 0 }), -1)
})

test('recognizes only horizontally dominant preview swipes', () => {
  assert.equal(getPreviewSwipeDirection({ x: 0, y: 0 }, { x: -80, y: 30 }), 1)
  assert.equal(getPreviewSwipeDirection({ x: 0, y: 0 }, { x: 80, y: 80 }), null)
})

test('leaves vertical preview scrolling unclassified', () => {
  assert.equal(getPreviewSwipeDirection({ x: 20, y: 10 }, { x: 45, y: 90 }), null)
})

test('consumes the recognized-swipe click guard exactly once', () => {
  assert.deepEqual(consumePreviewClickGuard(true), { didSwipe: false, shouldSuppressClick: true })
  assert.deepEqual(consumePreviewClickGuard(false), { didSwipe: false, shouldSuppressClick: false })
})

test('scopes preview swipe handlers to image surfaces instead of arrow controls', () => {
  const preview = readFileSync('components/field-guide/BookPreview.tsx', 'utf8')

  assert.doesNotMatch(preview, /field-guide-preview-viewer" onTouchStart=/)
  assert.match(preview, /field-guide-preview-page"\s+onTouchStart={handleTouchStart}\s+onTouchEnd={handleTouchEnd}/)
  assert.match(preview, /field-guide-preview-dialog-page"\s+onTouchStart={handleTouchStart}\s+onTouchEnd={handleTouchEnd}/)
})

test('moves compass roving focus across wrapped and endpoint keys', () => {
  assert.equal(getCompassFocusIndex(3, 'ArrowRight', 4), 0)
  assert.equal(getCompassFocusIndex(0, 'ArrowLeft', 4), 3)
  assert.equal(getCompassFocusIndex(2, 'Home', 4), 0)
  assert.equal(getCompassFocusIndex(1, 'End', 4), 3)
  assert.equal(getCompassFocusIndex(1, 'Enter', 4), null)
})
