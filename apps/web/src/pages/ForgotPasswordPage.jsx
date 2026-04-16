import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MailCheck } from 'lucide-react'
import { MasjidMark } from '../components/auth/MasjidMark'
import { Button } from '../components/ui/Button'
import { AuthTextField } from '../components/ui/AuthTextField'

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="auth-page">
      <Link className="auth-page__back" to="/login">
        ← Back to sign in
      </Link>

      <div className="auth-card">
        <div className="auth-card__mark">
          <MasjidMark />
        </div>
        <h1 className="auth-card__title">Noor Masjid</h1>
        <p className="auth-card__subtitle">
          {sent
            ? 'If an account exists for that email, you’ll receive a link to reset your password shortly.'
            : 'Enter the email for your account. We’ll send you a link to choose a new password.'}
        </p>

        {sent ? (
          <div className="auth-success" role="status">
            <MailCheck size={28} strokeWidth={1.75} className="auth-success__icon" aria-hidden />
            <p className="auth-success__title">Check your inbox</p>
            <p className="auth-success__text">
              Follow the link in the email to finish resetting your password. The link may take a
              minute to arrive.
            </p>
            <button
              type="button"
              className="btn btn--secondary auth-success__btn"
              onClick={() => setSent(false)}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <AuthTextField
              id="forgot-email"
              label="Email Address"
              name="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              icon={<Mail size={18} strokeWidth={2} />}
            />

            <Button type="submit" variant="primary" className="auth-submit">
              Send reset link
            </Button>
          </form>
        )}

        <p className="auth-footer">
          Remember your password? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
