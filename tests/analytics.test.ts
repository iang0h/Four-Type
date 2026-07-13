import assert from 'node:assert/strict'
import test from 'node:test'
import { FOURTYPE_EVENT_NAMES, isFourTypeEventName } from '../lib/analytics'

test('accepts every referral funnel event and historical event', () => {
  const required = [
    'quiz-start',
    'chapter-complete',
    'quiz-complete',
    'quiz-result',
    'invite-share',
    'invite-copy',
    'invite-open',
    'referred-quiz-start',
    'referred-quiz-complete',
    'compare-result',
    'pair-share',
    'pair-copy',
    'invalid-share-id',
    'share-click',
    'copy-link',
  ]

  assert.deepEqual([...FOURTYPE_EVENT_NAMES].sort(), required.sort())
  required.forEach((event) => assert.equal(isFourTypeEventName(event), true))
  assert.equal(isFourTypeEventName('arbitrary-event'), false)
})
