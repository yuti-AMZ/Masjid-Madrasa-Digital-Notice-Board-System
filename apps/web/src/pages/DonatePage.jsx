import { useState } from 'react'
import { Heart, Landmark, Quote, ShieldCheck, Sparkles } from 'lucide-react'
import './DonatePage.css'

const WAYS = [
  {
    icon: Heart,
    title: 'General sadaqah',
    body: 'Unrestricted gifts keep lights on, maintenance current, and weekend programs running.',
  },
  {
    icon: Landmark,
    title: 'Building & expansion',
    body: 'Capital projects including wudu upgrades, accessibility, and hall improvements.',
  },
  {
    icon: Sparkles,
    title: 'Zakat al-Māl',
    body: 'Designated channel for Zakat distribution through the masjid committee (receipts provided).',
  },
]

const IMPACT = [
  { value: '840+', label: 'Hot meals last Ramadan', sub: 'Community kitchen & partners' },
  { value: '120', label: 'Families supported', sub: 'Zakat & emergency aid' },
  { value: '24/7', label: 'Prayer space', sub: 'Heating, cleaning, security' },
]

export function DonatePage() {
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [frequency, setFrequency] = useState('once')

  function handleSubmit(e) {
    e.preventDefault()
    if (!amount.trim()) return
    alert(
      'Demo only: payment processing is not connected yet. Jazāk Allāhu khayran for your intention to give.',
    )
  }

  return (
    <div className="donate-page">
      <section className="donate-page__hero" aria-labelledby="donate-hero-title">
        <div className="donate-page__hero-glow" aria-hidden />
        <div className="donate-page__hero-inner">
          <div className="donate-page__hero-copy">
            <p className="donate-page__eyebrow">Sadaqah · Zakat · Building fund</p>
            <h1 id="donate-hero-title" className="donate-page__title">
              Give with <span className="donate-page__title-i">intention</span>, leave a lasting{' '}
              <span className="donate-page__title-w">barakah</span>
            </h1>
            <p className="donate-page__lead">
              Every contribution maintains Nejashi Mesjid Koye Feche as a home for prayer, learning, and dignified
              support for those who need it most. Online checkout is a demo until we connect a payment provider.
            </p>
            <div className="donate-page__hero-badges">
              <span className="donate-page__pill">
                <ShieldCheck size={16} strokeWidth={2} aria-hidden />
                Transparent use of funds
              </span>
              <span className="donate-page__pill donate-page__pill--soft">Receipts for Zakat available</span>
            </div>
          </div>
          <div className="donate-page__hero-visual" aria-hidden>
            <div className="donate-page__orb donate-page__orb--1" />
            <div className="donate-page__orb donate-page__orb--2" />
            <div className="donate-page__goal-card">
              <p className="donate-page__goal-label">Winter utilities &amp; heating</p>
              <div className="donate-page__goal-bar">
                <span className="donate-page__goal-fill" style={{ width: '68%' }} />
              </div>
              <div className="donate-page__goal-meta">
                <span>68% funded</span>
                <span>Goal: 150,000 ETB</span>
              </div>
            </div>
            <div className="donate-page__mini-stat">
              <Heart className="donate-page__mini-icon" size={22} strokeWidth={2} aria-hidden />
              <div>
                <strong>Community match weekend</strong>
                <span>Double impact on demo gifts — coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="donate-page__impact" aria-label="Impact at a glance">
        {IMPACT.map((item) => (
          <div key={item.label} className="donate-page__impact-card">
            <span className="donate-page__impact-value">{item.value}</span>
            <span className="donate-page__impact-label">{item.label}</span>
            <span className="donate-page__impact-sub">{item.sub}</span>
          </div>
        ))}
      </section>

      <div className="donate-page__layout">
        <section className="donate-page__panel donate-page__panel--form" aria-labelledby="donate-form-heading">
          <div className="donate-page__panel-head">
            <h2 id="donate-form-heading" className="donate-page__panel-title">
              Give online
            </h2>
            <p className="donate-page__panel-sub">Demo form — no charge will be made.</p>
          </div>

          <div className="donate-page__frequency" role="group" aria-label="Donation frequency">
            <button
              type="button"
              className={frequency === 'once' ? 'is-active' : ''}
              onClick={() => setFrequency('once')}
            >
              One-time
            </button>
            <button
              type="button"
              className={frequency === 'monthly' ? 'is-active' : ''}
              onClick={() => setFrequency('monthly')}
            >
              Monthly
            </button>
          </div>

          <form className="donate-page__form" onSubmit={handleSubmit}>
            <label className="donate-page__label">
              Amount (ETB)
              <div className="donate-page__amount-wrap">
                <span className="donate-page__currency" aria-hidden>
                  Br
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  autoComplete="off"
                  className="donate-page__amount-input"
                />
              </div>
            </label>
            <div className="donate-page__chips" role="group" aria-label="Suggested amounts">
              {['100', '250', '500', '1000'].map((v) => (
                <button key={v} type="button" className="donate-page__chip" onClick={() => setAmount(v)}>
                  {v}
                </button>
              ))}
            </div>
            <label className="donate-page__label">
              Note (optional)
              <textarea
                rows={3}
                placeholder="Zakat, sadaqah jāriyah, or a loved one’s name…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </label>
            <p className="donate-page__secure">
              <ShieldCheck size={16} strokeWidth={2} aria-hidden />
              Card details will use a secure checkout when payments go live.
            </p>
            <button type="submit" className="donate-page__submit">
              {frequency === 'monthly' ? 'Start monthly giving' : 'Continue to payment'}
            </button>
          </form>
        </section>

        <div className="donate-page__side">
          <section className="donate-page__panel donate-page__panel--ways" aria-labelledby="donate-ways-heading">
            <h2 id="donate-ways-heading" className="donate-page__panel-title">
              Where your gift goes
            </h2>
            <ul className="donate-page__ways">
              {WAYS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="donate-page__way">
                  <span className="donate-page__way-icon" aria-hidden>
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="donate-page__way-title">{title}</h3>
                    <p className="donate-page__way-body">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="donate-page__footnote">
              For bank transfer or in-person drop-off, contact the masjid office for the latest account details and
              hours.
            </p>
          </section>

          <blockquote className="donate-page__quote">
            <Quote className="donate-page__quote-icon" size={28} strokeWidth={1.5} aria-hidden />
            <p>
              “The believer’s shade on the Day of Resurrection is his charity.” <span>— Hadith, Tirmidhi</span>
            </p>
          </blockquote>
        </div>
      </div>
    </div>
  )
}
