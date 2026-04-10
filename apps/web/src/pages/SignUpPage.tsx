import type { FormEvent } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ShieldCheck, User } from 'lucide-react'
import { MasjidMark } from '../components/auth/MasjidMark'
import { Button } from '../components/ui/Button'
import { AuthTextField } from '../components/ui/AuthTextField'

function GoogleGlyph() {
  return (
    <svg
      className="auth-social__icon"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}

function AppleGlyph() {
  return (
    <svg
      className="auth-social__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
      />
    </svg>
  )
}

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
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
          Join the Ummah today and stay connected with your local mosque.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <AuthTextField
            id="signup-name"
            label="Full Name"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            icon={<User size={18} strokeWidth={2} />}
          />

          <AuthTextField
            id="signup-email"
            label="Email Address"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            icon={<Mail size={18} strokeWidth={2} />}
          />

          <AuthTextField
            id="signup-password"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            autoComplete="new-password"
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

          <AuthTextField
            id="signup-password-confirm"
            label="Confirm Password"
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat your password"
            autoComplete="new-password"
            icon={<ShieldCheck size={18} strokeWidth={2} />}
          />

          <Button type="submit" variant="primary" className="auth-submit">
            Create Account
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
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  )
}
