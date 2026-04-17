import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { AppleGlyph, GoogleGlyph } from '../components/auth/SocialGlyphs'
import { MasjidMark } from '../components/auth/MasjidMark'
import { Button } from '../components/ui/Button'
import { AuthTextField } from '../components/ui/AuthTextField'
import { getSession, setSession, verifyCredentials } from '../lib/authStorage'

export function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  if (getSession()) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email') ?? '').trim()
    const password = String(fd.get('password') ?? '')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    const result = verifyCredentials(email, password)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setSession(result.user)
    const fromPath = location.state?.from?.pathname
    const fromSearch = location.state?.from?.search ?? ''
    const target =
      fromPath && fromPath !== '/login' ? `${fromPath}${fromSearch}` : '/dashboard'
    navigate(target, { replace: true })
  }

  return (
    <div className="auth-page">
      <Link className="auth-page__back" to="/">
        ← Back to home
      </Link>

      <div className="auth-card">
        <div className="auth-card__mark">
          <MasjidMark />
        </div>
        <h1 className="auth-card__title">Noor Masjid</h1>
        <p className="auth-card__subtitle">
          Welcome back — sign in to stay connected with your local mosque.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : null}
          <AuthTextField
            id="login-email"
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            icon={<Mail size={18} strokeWidth={2} />}
          />

          <AuthTextField
            id="login-password"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            autoComplete="current-password"
            icon={<Lock size={18} strokeWidth={2} />}
            right={
              <button
                type="button"
                className="auth-field__action"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={2} />
                ) : (
                  <Eye size={18} strokeWidth={2} />
                )}
              </button>
            }
          />

          <div className="auth-forgot">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <Button type="submit" variant="primary" className="auth-submit">
            Sign In
          </Button>
        </form>

        <div className="auth-divider" role="presentation">
          OR
        </div>

        <div className="auth-social">
          <button type="button" className="auth-social__btn">
            <GoogleGlyph />
            Google
          </button>
          <button type="button" className="auth-social__btn">
            <AppleGlyph />
            Apple
          </button>
        </div>

        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
