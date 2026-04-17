import { Link } from 'react-router-dom'
import {
  Bell,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Users,
} from 'lucide-react'
import { announcementsList } from '../data/announcementsData'
import { usePrayerTimes } from '../hooks/usePrayerTimes'
import { getSession } from '../lib/authStorage'
import './DashboardPage.css'

const PRAYER_METHOD = 3

function formatClock(date, timeZone) {
  if (!date) return '—'
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  }).format(date)
}

function formatPeriod(date, timeZone) {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone,
  })
    .formatToParts(date)
    .find((p) => p.type === 'dayPeriod')?.value ?? ''
}

function displayName(session) {
  return session?.fullName?.trim() || 'Guest'
}

function initials(name) {
  if (!name || name === 'Guest') return 'NM'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

function categoryClass(category) {
  const c = (category || '').toLowerCase()
  if (c.includes('madrasa')) return 'dash-hub__tag--madrasa'
  if (c.includes('event') || c === 'friday') return 'dash-hub__tag--event'
  return 'dash-hub__tag--general'
}

export function DashboardPage() {
  const session = getSession()
  const name = displayName(session)
  const { schedule, nextEvent, headerDate, loading, error, locationLabel, timeZone } = usePrayerTimes({
    method: PRAYER_METHOD,
  })

  const latestAnnouncements = announcementsList.slice(0, 3)

  return (
    <div className="dash-hub">
      <header className="dash-hub__header">
        <div className="dash-hub__greeting">
          <h1 className="dash-hub__salam">Assalamu Alaikum, {name}</h1>
          <p className="dash-hub__date">{headerDate || '…'}</p>
        </div>
        <div className="dash-hub__header-right">
          <Link
            to="/announcements/notifications"
            className="dash-hub__icon-btn"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={2} />
          </Link>
          <Link to="/profile" className="dash-hub__profile-chip">
            <div className="dash-hub__profile-text">
              <span className="dash-hub__profile-name">{name}</span>
              <span className="dash-hub__profile-role">Community member</span>
            </div>
            <div className="dash-hub__profile-avatar" aria-hidden>
              {initials(name)}
            </div>
          </Link>
        </div>
      </header>

      <div className="dash-hub__layout">
        <div className="dash-hub__main">
          <section className="dash-panel dash-panel--prayer">
            <div className="dash-panel__head">
              <h2 className="dash-panel__title">Today&apos;s Prayer Times</h2>
              <div className="dash-panel__location">
                <MapPin size={18} strokeWidth={2} className="dash-panel__pin" aria-hidden />
                <span>{locationLabel}</span>
              </div>
            </div>

            {loading && <p className="dash-panel__muted">Loading prayer times…</p>}
            {error && <p className="dash-panel__error">{error}</p>}

            {!loading && !error && schedule && (
              <div className="dash-prayer-row">
                {schedule.map((prayer) => {
                  const isNext = nextEvent && prayer.name === nextEvent.name
                  const t = prayer.adhan
                  return (
                    <div
                      key={prayer.name}
                      className={
                        'dash-prayer-card' + (isNext ? ' dash-prayer-card--next' : '')
                      }
                    >
                      {isNext ? (
                        <span className="dash-prayer-card__badge">Next prayer</span>
                      ) : null}
                      <span className="dash-prayer-card__name">{prayer.name}</span>
                      <span className="dash-prayer-card__time">{formatClock(t, timeZone)}</span>
                      <span className="dash-prayer-card__ampm">
                        {formatPeriod(t, timeZone)}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          <section className="dash-panel">
            <div className="dash-panel__head">
              <h2 className="dash-panel__title">Latest Announcements</h2>
              <Link to="/announcements" className="dash-panel__link">
                View all
              </Link>
            </div>
            <ul className="dash-announce-list">
              {latestAnnouncements.map((item) => (
                <li key={item.id}>
                  <Link to={`/announcement/${item.id}`} className="dash-announce-card">
                    <div
                      className="dash-announce-card__thumb"
                      style={{ backgroundImage: `url(${item.image})` }}
                      role="presentation"
                    />
                    <div className="dash-announce-card__body">
                      <div className="dash-announce-card__meta">
                        <span
                          className={
                            'dash-hub__tag ' + categoryClass(item.category)
                          }
                        >
                          {item.category}
                        </span>
                        <span className="dash-announce-card__posted">
                          Posted {item.time}
                        </span>
                      </div>
                      <h3 className="dash-announce-card__title">{item.title}</h3>
                      <p className="dash-announce-card__desc">{item.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="dash-panel dash-panel--quick">
            <h2 className="dash-panel__title dash-panel__title--solo">Quick actions</h2>
            <div className="dash-quick-row">
              <Link to="/madrasa" className="dash-quick-card">
                <span className="dash-quick-card__icon" aria-hidden>
                  <GraduationCap size={26} strokeWidth={2} />
                </span>
                <span className="dash-quick-card__label">Join class</span>
              </Link>
              <Link to="/settings" className="dash-quick-card">
                <span className="dash-quick-card__icon" aria-hidden>
                  <Bell size={26} strokeWidth={2} />
                </span>
                <span className="dash-quick-card__label">Set reminders</span>
              </Link>
              <a href="#volunteer" className="dash-quick-card">
                <span className="dash-quick-card__icon" aria-hidden>
                  <Users size={26} strokeWidth={2} />
                </span>
                <span className="dash-quick-card__label">Volunteer</span>
              </a>
            </div>
          </section>
        </div>

        <aside className="dash-hub__aside">
          <div className="dash-masjid-card">
            <div className="dash-masjid-card__image-wrap">
              <div
                className="dash-masjid-card__image"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1584555613497-9ecf9d0b1f40?auto=format&fit=crop&w=900&q=80)',
                }}
                role="presentation"
              />
              <span className="dash-masjid-card__badge">Open for Salah</span>
            </div>
            <div className="dash-masjid-card__content">
              <h3 className="dash-masjid-card__title">Noor Masjid</h3>
              <p className="dash-masjid-card__est">Serving the community since 1986</p>
              <ul className="dash-masjid-card__details">
                <li>
                  <MapPin size={16} strokeWidth={2} aria-hidden />
                  <span>Kilinto, Addis Ababa, Ethiopia</span>
                </li>
                <li>
                  <Phone size={16} strokeWidth={2} aria-hidden />
                  <span>+251 91 123 4567</span>
                </li>
                <li>
                  <Mail size={16} strokeWidth={2} aria-hidden />
                  <span>contact@noormasjid.org</span>
                </li>
              </ul>
              <a href="mailto:contact@noormasjid.org" className="dash-masjid-card__cta">
                Contact admin
              </a>
            </div>
          </div>

          <div className="dash-map-card" id="volunteer">
            <h3 className="dash-map-card__title">Masjid location</h3>
            <a
              className="dash-map-card__map"
              href="https://www.google.com/maps/search/?api=1&query=Kilinto%2C%20Addis%20Ababa%2C%20Ethiopia"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={40} strokeWidth={1.5} className="dash-map-card__pin" aria-hidden />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
