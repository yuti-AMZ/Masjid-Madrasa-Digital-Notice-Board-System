import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Play,
  RotateCcw,
  RotateCw,
  UserPlus,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const TELEGRAM_CHANNEL_URL = 'https://t.me/aastumuslims'

const relatedKhutbahs = [
  {
    title: 'Building Bridges: Interfaith Dialogue',
    date: 'Oct 20, 2023',
    tone: 'khutbah-card--sand',
  },
  {
    title: 'Patience in Times of Trial',
    date: 'Oct 13, 2023',
    tone: 'khutbah-card--ink',
  },
  {
    title: 'The Ethics of Wealth in Islam',
    date: 'Oct 6, 2023',
    tone: 'khutbah-card--gold',
  },
]

const khutbahTranscript = [
  'Bismillah. All praise is due to Allah, Lord of the worlds.',
  'Today we reflect on the importance of community in Islam and how the believer is strengthened by the people around them.',
  'Our masjid is not only a place for salah. It is a place for support, learning, mercy, and shared responsibility.',
  'When hearts are connected for the sake of Allah, hardship becomes lighter and gratitude becomes deeper.',
  'May Allah make us people who care for one another and build strong, faithful communities. Ameen.',
].join(' ')

function formatSeconds(value) {
  const safe = Math.max(0, Math.floor(value))
  const minutes = String(Math.floor(safe / 60)).padStart(2, '0')
  const seconds = String(safe % 60).padStart(2, '0')
  return `${minutes}:${seconds}`
}

export function KhutbahPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const duration = 25

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  useEffect(() => {
    let intervalId

    if (isPlaying) {
      intervalId = window.setInterval(() => {
        setProgress((value) => {
          if (value >= duration) {
            window.speechSynthesis.cancel()
            setIsPlaying(false)
            return duration
          }

          return Math.min(duration, value + 1)
        })
      }, 1000)
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId)
      }
    }
  }, [duration, isPlaying])

  const progressWidth = useMemo(
    () => `${Math.min(100, (progress / duration) * 100)}%`,
    [duration, progress],
  )

  const startSpeech = () => {
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(khutbahTranscript)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1
    utterance.onend = () => {
      setIsPlaying(false)
      setProgress(duration)
    }

    setProgress(0)
    setIsPlaying(true)
    window.speechSynthesis.speak(utterance)
  }

  const togglePlayback = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    startSpeech()
  }

  const restartPlayback = () => {
    startSpeech()
  }

  const skipForward = () => {
    setProgress((value) => Math.min(duration, value + 10))
  }

  function handleSubscribe(event) {
    event.preventDefault()
  }

  return (
    <main className="khutbah-page">
      <div className="container khutbah-shell">
        <div className="khutbah-back">
          <Link className="btn btn--secondary" to="/announcements">
            <ArrowLeft size={16} aria-hidden />
            Back to announcements
          </Link>
        </div>

        <section className="khutbah-hero">
          <div className="khutbah-hero__overlay">
            <span className="khutbah-badge">Featured Khutbah</span>
            <h1>The Importance of Community in Islam</h1>
            <div className="khutbah-meta">
              <span>
                <CalendarDays size={15} aria-hidden />
                Friday, Oct 27, 2023
              </span>
              <span>
                <Clock3 size={15} aria-hidden />
                25 mins
              </span>
            </div>
          </div>
        </section>

        <section className="khutbah-grid">
          <div className="khutbah-main">
            <article className="khutbah-speaker card">
              <div className="khutbah-speaker__identity">
                <div className="khutbah-speaker__avatar" aria-hidden>
                  SA
                </div>
                <div>
                  <h2>Sheikh Ahmed Al-Farsi</h2>
                  <p>Head Imam, Noor Masjid</p>
                </div>
              </div>

              <div className="khutbah-speaker__actions">
                <button className="btn btn--primary" type="button" onClick={togglePlayback}>
                  <Play size={16} aria-hidden />
                  {isPlaying ? 'Stop Audio' : 'Listen Now'}
                </button>

                <a
                  className="btn btn--secondary"
                  href={TELEGRAM_CHANNEL_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  <UserPlus size={16} aria-hidden />
                  Follow
                </a>
              </div>
            </article>

            <article className="khutbah-summary card">
              <h2>Khutbah Summary</h2>
              <p>
                In this Friday address, Sheikh Ahmed Al-Farsi reflects on the
                importance of Ummah and why community is not just a social
                bond, but a foundation of faith. Drawing from the Quran and
                Sunnah, he reminds believers that strength, mercy, and
                accountability are nurtured together.
              </p>

              <div className="khutbah-takeaways">
                <article className="khutbah-takeaway">
                  <h3>Key Takeaway 1</h3>
                  <p>
                    The collective strength of the community is essential for
                    individual spiritual growth and resilience during trials.
                  </p>
                </article>

                <article className="khutbah-takeaway">
                  <h3>Key Takeaway 2</h3>
                  <p>
                    Every Muslim owes care, rights, and sincerity to their
                    neighbors and brothers and sisters in faith.
                  </p>
                </article>
              </div>

              <p>
                The khutbah emphasizes that isolation often deepens spiritual
                fatigue, while local masjid life creates support, belonging,
                and shared purpose for everyday challenges.
              </p>
            </article>

            <article className="khutbah-player card">
              <div className="khutbah-player__top">
                <div>
                  <p className="khutbah-player__eyebrow">Khutbah Audio</p>
                  <h3>Voice playback is now active from the page controls</h3>
                </div>
              </div>

              <div className="khutbah-player__bar">
                <span
                  className="khutbah-player__progress"
                  style={{ width: progressWidth }}
                />
              </div>

              <div className="khutbah-player__times">
                <span>{formatSeconds(progress)}</span>
                <span>{formatSeconds(duration)}</span>
              </div>

              <div className="khutbah-player__controls">
                <button type="button" aria-label="Restart audio" onClick={restartPlayback}>
                  <RotateCcw size={18} aria-hidden />
                </button>
                <button
                  type="button"
                  className="khutbah-player__play"
                  aria-label={isPlaying ? 'Stop audio' : 'Play audio'}
                  onClick={togglePlayback}
                >
                  {isPlaying ? '■' : '▶'}
                </button>
                <button type="button" aria-label="Advance audio timer" onClick={skipForward}>
                  <RotateCw size={18} aria-hidden />
                </button>
              </div>

              <p className="khutbah-player__note">
                This page now has working audio playback behavior. Replace the
                spoken khutbah text with a real uploaded recording whenever you
                have the final file.
              </p>
            </article>
          </div>

          <aside className="khutbah-sidebar">
            <section className="card khutbah-related">
              <h2>Related Khutbahs</h2>

              <div className="khutbah-related__list">
                {relatedKhutbahs.map((item) => (
                  <article key={item.title} className="khutbah-related__item">
                    <div className={`khutbah-related__thumb ${item.tone}`} aria-hidden />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.date}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="khutbah-subscribe">
              <h2>Join our community</h2>
              <p>
                Stay updated with the latest khutbahs, events, and important
                announcements.
              </p>

              <form onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Your email address"
                  autoComplete="email"
                />
                <button className="btn" type="submit">
                  Subscribe
                </button>
              </form>
            </section>
          </aside>
        </section>
      </div>
    </main>
  )
}
