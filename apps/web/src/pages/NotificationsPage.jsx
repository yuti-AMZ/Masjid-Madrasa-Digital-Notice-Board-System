import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  Calendar,
  ChevronRight,
  Clock3,
  GraduationCap,
  Megaphone,
  Settings,
} from 'lucide-react'
import { getSession } from '../lib/authStorage'
import './NotificationsPage.css'

const INITIAL_UNREAD = [
  {
    id: 'u1',
    title: 'New Community Dinner announced',
    time: '2 mins ago',
    body: 'Join us this Friday after Maghrib for a community dinner in the hall. Families welcome — please RSVP via the office.',
  },
]

const STATIC_GROUPS = [
  {
    key: 'events',
    title: 'Events',
    items: [
      {
        id: 'e1',
        title: 'Monthly Community Dinner',
        time: '1 hour ago',
        body: 'Special lecture after dinner: “Patience in the Quran.” Main hall, 7:30 PM.',
        icon: 'calendar',
      },
    ],
  },
  {
    key: 'classes',
    title: 'Classes',
    items: [
      {
        id: 'c1',
        title: 'Next Madrasa Class',
        time: '3 hours ago',
        body: 'Reminder: bring your notebooks for Chapter 5 review. Tajweed track meets Thursday 4 PM.',
        icon: 'class',
      },
    ],
  },
  {
    key: 'prayer',
    title: 'Prayer alerts',
    items: [
      {
        id: 'p1',
        title: 'Asr Prayer Alert',
        time: 'Just now',
        body: 'Asr begins in 15 minutes. Masjid is open — wudu facilities on the east side.',
        icon: 'clock',
      },
    ],
  },
]

function IconBox({ variant, type }) {
  const cls = `notif-icon notif-icon--${variant}`
  if (type === 'calendar')
    return (
      <span className={cls} aria-hidden>
        <Calendar size={20} strokeWidth={2} />
      </span>
    )
  if (type === 'class')
    return (
      <span className={cls} aria-hidden>
        <GraduationCap size={20} strokeWidth={2} />
      </span>
    )
  if (type === 'clock')
    return (
      <span className={cls} aria-hidden>
        <Clock3 size={20} strokeWidth={2} />
      </span>
    )
  return (
    <span className={cls} aria-hidden>
      <Megaphone size={20} strokeWidth={2} />
    </span>
  )
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

export function NotificationsPage() {
  const session = getSession()
  const name = displayName(session)
  const [unreadItems, setUnreadItems] = useState(INITIAL_UNREAD)

  const newCount = unreadItems.length

  const markAllRead = () => setUnreadItems([])

  const sectionUnread = useMemo(
    () =>
      unreadItems.length > 0
        ? [
            {
              key: 'unread',
              title: 'Unread announcements',
              markAll: true,
              items: unreadItems.map((n) => ({
                ...n,
                icon: 'megaphone',
                variant: 'unread',
                border: 'unread',
              })),
            },
          ]
        : [],
    [unreadItems],
  )

  const restGroups = STATIC_GROUPS.map((g) => ({
    ...g,
    items: g.items.map((it) => ({
      ...it,
      variant: g.key === 'events' ? 'event' : 'mint',
      border: 'default',
    })),
  }))

  const allSections = [...sectionUnread, ...restGroups]

  return (
    <div className="notifications-page">
      <header className="notifications-page__header">
        <div className="notifications-page__title-row">
          <h1 className="notifications-page__title">Notifications</h1>
          {newCount > 0 ? (
            <span className="notifications-page__badge">{newCount} new</span>
          ) : null}
        </div>
        <div className="notifications-page__header-right">
          <span className="notifications-page__bell-wrap" aria-hidden>
            <Bell size={22} strokeWidth={2} />
            {newCount > 0 ? <span className="notifications-page__bell-dot" /> : null}
          </span>
          <Link to="/profile" className="notifications-page__profile">
            <div className="notifications-page__profile-text">
              <span className="notifications-page__profile-name">{name}</span>
              <span className="notifications-page__profile-role">Community member</span>
            </div>
            <div className="notifications-page__profile-avatar">{initials(name)}</div>
          </Link>
        </div>
      </header>

      <div className="notifications-page__feed">
        {allSections.map((section) => (
          <section key={section.key} className="notifications-page__section">
            <div className="notifications-page__section-head">
              <h2
                className={
                  'notifications-page__section-title' +
                  (section.key === 'unread' ? ' notifications-page__section-title--accent' : '')
                }
              >
                {section.title}
              </h2>
              {section.markAll ? (
                <button type="button" className="notifications-page__mark-all" onClick={markAllRead}>
                  Mark all as read
                </button>
              ) : null}
            </div>
            <ul className="notifications-page__list">
              {section.items.map((item) => (
                <li key={item.id}>
                  <article
                    className={
                      'notifications-page__card' +
                      (item.border === 'unread' ? ' notifications-page__card--unread' : '')
                    }
                  >
                    <IconBox variant={item.variant} type={item.icon} />
                    <div className="notifications-page__card-body">
                      <h3 className="notifications-page__card-title">{item.title}</h3>
                      <p className="notifications-page__card-time">{item.time}</p>
                      <p className="notifications-page__card-desc">{item.body}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <Link to="/settings" className="notifications-page__settings-bar">
        <Settings size={22} strokeWidth={2} aria-hidden />
        <span>Notification settings</span>
        <ChevronRight size={22} strokeWidth={2} className="notifications-page__settings-chevron" aria-hidden />
      </Link>
    </div>
  )
}
