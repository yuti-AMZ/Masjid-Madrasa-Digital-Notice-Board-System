import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ShieldCheck, User } from 'lucide-react'
import { AppleGlyph, GoogleGlyph } from '../components/auth/SocialGlyphs'
import { MasjidMark } from '../components/auth/MasjidMark'
import { Button } from '../components/ui/Button'
import { AuthTextField } from '../components/ui/AuthTextField'

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(e) {
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
