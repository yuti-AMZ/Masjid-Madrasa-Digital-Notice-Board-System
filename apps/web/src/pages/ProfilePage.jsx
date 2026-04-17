import { Link } from 'react-router-dom'
import {
  Camera,
  ChevronRight,
  Globe,
  Headphones,
  Heart,
  MessageCircle,
  Settings,
  UserRound,
  UserRoundCog,
} from 'lucide-react'
import { getMergedProfile } from '../lib/profileStorage'
import './ProfilePage.css'

function Section({ icon: Icon, title, children }) {
  return (
    <section className="profile-screen__section">
      <div className="profile-screen__section-head">
        <span className="profile-screen__section-icon" aria-hidden>
          <Icon size={20} strokeWidth={2} />
        </span>
        <h2 className="profile-screen__section-title">{title}</h2>
      </div>
      <div className="profile-screen__card">{children}</div>
    </section>
  )
}

function RowLink({ to, icon: Icon, label, description, onClick }) {
  const inner = (
    <>
      <span className="profile-screen__row-icon" aria-hidden>
        <Icon size={20} strokeWidth={2} />
      </span>
      <span className="profile-screen__row-text">
        <span className="profile-screen__row-label">{label}</span>
        {description ? <span className="profile-screen__row-desc">{description}</span> : null}
      </span>
      <ChevronRight className="profile-screen__row-chevron" size={20} strokeWidth={2} aria-hidden />
    </>
  )
  if (onClick) {
    return (
      <button type="button" className="profile-screen__row profile-screen__row--btn" onClick={onClick}>
        {inner}
      </button>
    )
  }
  return (
    <Link to={to} className="profile-screen__row">
      {inner}
    </Link>
  )
}

export function ProfilePage() {
  const p = getMergedProfile()
  const isPremium = p.membership === 'premium'
  const initial = (p.fullName || '?')
    .split(/\s+/)
    .map((s) => s[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="profile-screen">
      <header className="profile-screen__hero">
        <div className="profile-screen__avatar-wrap">
          <div className="profile-screen__avatar">
            {p.avatarDataUrl ? (
              <img src={p.avatarDataUrl} alt="" />
            ) : (
              <span className="profile-screen__avatar-fallback" aria-hidden>
                {initial}
              </span>
            )}
          </div>
          <Link to="/profile/edit" className="profile-screen__avatar-cam" aria-label="Change profile photo">
            <Camera size={16} strokeWidth={2} />
          </Link>
        </div>
        <div className="profile-screen__hero-main">
          <div className="profile-screen__name-row">
            <h1 className="profile-screen__name">{p.fullName || 'Member'}</h1>
            <span
              className={'profile-screen__badge' + (isPremium ? ' profile-screen__badge--premium' : '')}
            >
              {isPremium ? 'Premium member' : 'Member'}
            </span>
          </div>
          <p className="profile-screen__email">{p.email || '—'}</p>
        </div>
        <Link to="/profile/edit" className="profile-screen__edit-btn">
          Edit profile
        </Link>
      </header>

      <Section icon={UserRoundCog} title="Account settings">
        <RowLink to="/settings" icon={Settings} label="General settings" />
        <RowLink
          to="/announcements"
          icon={Heart}
          label="Favorites & bookmarks"
          description="Saved announcements and events"
        />
      </Section>

      <Section icon={Settings} title="Preferences">
        <RowLink
          to="/settings"
          icon={Globe}
          label="Language"
          description={p.language}
        />
        <RowLink to="/feedback" icon={MessageCircle} label="App feedback" />
      </Section>

      <Section icon={Headphones} title="Support">
        <RowLink
          to="/feedback"
          icon={UserRound}
          label="Help and support"
          description="Questions, issues, or suggestions"
        />
      </Section>
    </div>
  )
}
