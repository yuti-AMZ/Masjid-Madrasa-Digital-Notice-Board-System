import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Clock, HeartHandshake, LifeBuoy, MapPin, Phone, Users } from 'lucide-react'
import './ServicesPage.css'

const TAGS = ['Education', 'Counseling', 'Youth', 'Social aid']

const STATS = [
  { value: '12+', label: 'Weekly learning circles' },
  { value: '5', label: 'Core service areas' },
  { value: 'Daily', label: 'Prayer & masjid access' },
  { value: '100%', label: 'Community-funded programs' },
]

const SERVICES = [
  {
    icon: BookOpen,
    title: 'Madrasa & Quran programs',
    body: 'Structured kitāb tracks, youth circles, and Tajweed support — registration through the Madrasa hub.',
    to: '/madrasa',
    cta: 'Open Madrasa',
    accent: 'teal',
  },
  {
    icon: Users,
    title: 'New Muslim support',
    body: 'Orientation sessions, prayer coaching, and community buddies for those new to the masjid.',
    to: '/announcements',
    cta: 'Contact office',
    accent: 'orange',
  },
  {
    icon: HeartHandshake,
    title: 'Marriage & family counseling',
    body: 'Confidential sessions with qualified counselors by appointment (referrals through the imām’s office).',
    to: '/announcements',
    cta: 'Learn more',
    accent: 'violet',
  },
  {
    icon: LifeBuoy,
    title: 'Zakat & social aid',
    body: 'Local distribution, food support, and guidance on calculating and paying Zakat al-Māl.',
    to: '/announcements/donate',
    cta: 'Support fund',
    accent: 'emerald',
  },
]

export function ServicesPage() {
  return (
    <div className="services-page">
      <section className="services-page__hero" aria-labelledby="services-hero-title">
        <div className="services-page__hero-bg" aria-hidden />
        <div className="services-page__hero-grid">
          <div className="services-page__hero-copy">
            <p className="services-page__eyebrow">Nejashi Mesjid Koye Feche · Addis Ababa</p>
            <h1 id="services-hero-title" className="services-page__title">
              Services built around the{' '}
              <span className="services-page__title-accent">whole community</span>
            </h1>
            <p className="services-page__lead">
              From Qur’ān and madrasa to confidential support and Zakat — everything here exists to help families
              grow in faith together. Stop by the office or catch us after Jumu‘ah.
            </p>
            <ul className="services-page__tags" aria-label="Service categories">
              {TAGS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="services-page__hero-actions">
              <Link to="/madrasa" className="services-page__btn services-page__btn--primary">
                Explore Madrasa
                <ArrowRight size={18} aria-hidden />
              </Link>
              <Link to="/announcements/donate" className="services-page__btn services-page__btn--ghost">
                Support the masjid
              </Link>
            </div>
          </div>
          <div className="services-page__hero-panel" aria-hidden>
            <div className="services-page__hero-card services-page__hero-card--main">
              <span className="services-page__hero-card-kicker">This week</span>
              <p className="services-page__hero-card-title">Programs & circles</p>
              <p className="services-page__hero-card-text">
                Tajweed review, youth halaqah, and new-Muslim welcome — check the board in the lobby for exact
                rooms.
              </p>
              <div className="services-page__hero-card-foot">
                <Clock size={16} strokeWidth={2} />
                <span>Office hours: Sat–Thu, 10am–4pm</span>
              </div>
            </div>
            <div className="services-page__hero-card services-page__hero-card--float">
              <MapPin size={20} strokeWidth={2} />
              <p>Koye Feche — main hall & east classrooms</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-page__stats" aria-label="Highlights">
        {STATS.map((s) => (
          <div key={s.label} className="services-page__stat">
            <span className="services-page__stat-value">{s.value}</span>
            <span className="services-page__stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      <div className="services-page__section-head">
        <h2 className="services-page__section-title">What we offer</h2>
        <p className="services-page__section-desc">
          Each service connects to a real team at the masjid — tap through for the next step.
        </p>
      </div>

      <ul className="services-page__grid">
        {SERVICES.map(({ icon: Icon, title, body, to, cta, accent }, i) => (
          <li key={title} className={`services-page__card services-page__card--${accent}`}>
            <span className="services-page__card-index" aria-hidden>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="services-page__icon" aria-hidden>
              <Icon size={22} strokeWidth={2} />
            </span>
            <h3 className="services-page__card-title">{title}</h3>
            <p className="services-page__card-body">{body}</p>
            <Link to={to} className="services-page__link">
              {cta}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </li>
        ))}
      </ul>

      <section className="services-page__cta-band" aria-labelledby="services-cta-title">
        <div className="services-page__cta-inner">
          <div>
            <h2 id="services-cta-title" className="services-page__cta-title">
              Not sure where to start?
            </h2>
            <p className="services-page__cta-text">
              The imām’s office can point you to the right program — or walk you through Zakat questions in private.
            </p>
          </div>
          <div className="services-page__cta-actions">
            <a href="tel:+251911000000" className="services-page__btn services-page__btn--light">
              <Phone size={18} aria-hidden />
              Call the office
            </a>
            <Link to="/calendar" className="services-page__btn services-page__btn--outline-light">
              View calendar
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
