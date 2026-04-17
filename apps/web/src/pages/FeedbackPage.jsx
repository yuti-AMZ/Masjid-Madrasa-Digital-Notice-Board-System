import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bug, ChevronRight, Lightbulb } from 'lucide-react'
import { getSession } from '../lib/authStorage'
import './FeedbackPage.css'

const CATEGORIES = [
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'technical', label: 'Technical issue' },
  { value: 'content', label: 'Content or schedule' },
  { value: 'other', label: 'Other' },
]

export function FeedbackPage() {
  const session = getSession()
  const [name, setName] = useState(session?.fullName ?? '')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!category || !message.trim()) return
    const payload = {
      name: anonymous ? 'Anonymous' : name.trim(),
      category,
      message: message.trim(),
      at: new Date().toISOString(),
    }
    try {
      const key = 'nejashi_feedback_log'
      const prev = JSON.parse(localStorage.getItem(key) || '[]')
      const next = [payload, ...(Array.isArray(prev) ? prev : [])].slice(0, 50)
      localStorage.setItem(key, JSON.stringify(next))
    } catch {
      // ignore
    }
    setSent(true)
  }

  return (
    <div className="feedback-page">
      <div className="feedback-page__grid">
        <div className="feedback-page__intro">
          <p className="feedback-page__eyebrow">Your voice matters</p>
          <h1 className="feedback-page__title">App feedback</h1>
          <p className="feedback-page__lead">
            Help us improve the Nejashi portal — whether it is a bug, a missing feature, or an idea for the
            community. We read every message.
          </p>

          <div className="feedback-page__info-cards">
            <div className="feedback-page__info-card">
              <span className="feedback-page__info-icon" aria-hidden>
                <Lightbulb size={22} strokeWidth={2} />
              </span>
              <p className="feedback-page__info-title">Suggestions</p>
              <p className="feedback-page__info-text">New features or improvements you would like to see.</p>
            </div>
            <div className="feedback-page__info-card">
              <span className="feedback-page__info-icon" aria-hidden>
                <Bug size={22} strokeWidth={2} />
              </span>
              <p className="feedback-page__info-title">Technical issues</p>
              <p className="feedback-page__info-text">Broken links, errors, or confusing flows in the app.</p>
            </div>
          </div>

          <div className="feedback-page__quote">
            <p className="feedback-page__quote-text">Indeed, Allah is with those who are patient.</p>
            <p className="feedback-page__quote-ref">Qur’ān 8:46</p>
          </div>
        </div>

        <div className="feedback-page__form-card">
          {sent ? (
            <div className="feedback-page__thanks">
              <h2>Thank you</h2>
              <p>Your feedback was saved locally for this demo. Jazāk Allāhu khayran.</p>
              <Link to="/profile" className="feedback-page__thanks-link">
                Back to profile <ChevronRight size={18} aria-hidden />
              </Link>
            </div>
          ) : (
            <form className="feedback-page__form" onSubmit={handleSubmit}>
              <label className="feedback-page__label">
                Full name
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={anonymous}
                  autoComplete="name"
                />
              </label>

              <label className="feedback-page__label">
                Feedback category
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="feedback-page__label">
                Detailed feedback
                <textarea
                  rows={5}
                  placeholder="Tell us what is on your mind…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </label>

              <label className="feedback-page__check">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                />
                <span>Keep my feedback anonymous</span>
              </label>

              <button type="submit" className="feedback-page__submit">
                Submit feedback
                <ChevronRight size={20} strokeWidth={2} aria-hidden />
              </button>

              <p className="feedback-page__legal">
                By submitting, you agree to our terms of service and privacy policy (demo).
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
