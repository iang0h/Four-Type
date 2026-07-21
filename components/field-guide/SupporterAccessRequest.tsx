'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { trackFieldGuideEvent } from './CampaignAnalytics'

const responseMessage = 'If that email has a FourType supporter record, a fresh access link is on its way.'

export default function SupporterAccessRequest() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function requestAccess(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    trackFieldGuideEvent({ event: 'field-guide-access-request' })

    try {
      await fetch('/api/field-guide/request-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // The generic result protects supporter privacy even if the network is unavailable.
    } finally {
      setSubmitting(false)
      setSubmitted(true)
    }
  }

  return (
    <section className="field-guide-access-request" aria-labelledby="access-request-title">
      <h2 id="access-request-title">Request a fresh access link</h2>
      <form onSubmit={requestAccess}>
        <label htmlFor="supporter-email">Purchase email</label>
        <div>
          <input
            id="supporter-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={320}
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button className="field-guide-button field-guide-button-primary" type="submit" disabled={submitting}>
            <Mail aria-hidden="true" size={17} /> {submitting ? 'Sending...' : 'Email access link'}
          </button>
        </div>
      </form>
      {submitted && <p role="status">{responseMessage}</p>}
    </section>
  )
}
