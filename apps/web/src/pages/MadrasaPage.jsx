import { useMemo, useState } from 'react'
import { ArrowLeft, BookOpenText, CalendarDays, GraduationCap, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { announcementsById } from '../data/announcementsData'

const announcement = announcementsById['winter-quran-registration']

const filters = ['All Classes', 'Hadith', 'Arabic Grammar', 'Fiqh']

function getTrackLabel(kitab) {
  const name = kitab.name.toLowerCase()

  if (name.includes('hadith') || name.includes('riyadh')) return 'Hadith'
  if (name.includes('arabic') || name.includes('grammar')) return 'Arabic Grammar'
  if (name.includes('fiqh')) return 'Fiqh'
  return 'Quran'
}

function getLevelLabel(index) {
  if (index % 3 === 0) return 'Intermediate'
  if (index % 3 === 1) return 'Beginner'
  return 'Advanced'
}

function getInstructorTone(index) {
  const tones = ['#DCA85B', '#312026', '#2F6B63', '#3F7D58']
  return tones[index % tones.length]
}

export function MadrasaPage() {
  const [activeFilter, setActiveFilter] = useState('All Classes')

  const visibleKitaabs = useMemo(
    () =>
      announcement.kitaabs.filter((kitab) => {
        if (activeFilter === 'All Classes') return true
        return getTrackLabel(kitab) === activeFilter
      }),
    [activeFilter],
  )

  return (
    <div className="madrasa-page">
      <div className="madrasa-page__header">
        <div>
          <div className="madrasa-page__back">
            <Link className="btn btn--secondary" to="/announcements">
              <ArrowLeft size={16} aria-hidden />
              Back to announcements
            </Link>
          </div>
          <h1>Available Classes</h1>
          <p>
            Enroll in our structured Islamic studies programs and deepen your
            knowledge using Nejashi Mesjid Koye Feche&apos;s current kitab tracks.
          </p>
        </div>

        <Link
          className="btn madrasa-page__schedule"
          to={`/announcement/${announcement.id}/register`}
        >
          View My Schedule
        </Link>
      </div>

      <div className="madrasa-filters">
        {filters.map((filter, index) => (
          <button
            key={filter}
            type="button"
            className={
              activeFilter === filter
                ? 'madrasa-filter madrasa-filter--active'
                : 'madrasa-filter'
            }
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="madrasa-grid">
        {visibleKitaabs.map((kitab, index) => {
          const sourceIndex = announcement.kitaabs.findIndex((item) => item.name === kitab.name)
          const track = getTrackLabel(kitab)
          const level = getLevelLabel(sourceIndex)

          return (
            <article key={kitab.name} className="madrasa-card card">
              <div className="madrasa-card__content">
                <div className="madrasa-card__badges">
                  <span className="madrasa-pill madrasa-pill--track">{track}</span>
                  <span className="madrasa-pill madrasa-pill--level">{level}</span>
                </div>

                <h2>{kitab.name}</h2>
                <p className="madrasa-card__description">{kitab.description}</p>

                <div className="madrasa-card__meta">
                  <span
                    className="madrasa-card__avatar"
                    style={{ backgroundColor: getInstructorTone(sourceIndex) }}
                    aria-hidden
                  />
                  <div>
                    <p>
                      Instructor: <strong>{kitab.teacher}</strong>
                    </p>
                    <p>{kitab.classTime}</p>
                  </div>
                </div>

                <div className="madrasa-card__actions">
                  <Link
                    className="btn madrasa-card__join"
                    to={`/announcement/${announcement.id}/register?kitab=${sourceIndex}`}
                  >
                    <UserPlus size={16} aria-hidden />
                    Join Class
                  </Link>

                  <Link
                    className="btn btn--secondary madrasa-card__details"
                    to={`/announcement/${announcement.id}/kitaab/${sourceIndex}`}
                  >
                    <BookOpenText size={16} aria-hidden />
                    View Details
                  </Link>
                </div>
              </div>

              <div className="madrasa-card__media">
                <img src={kitab.image} alt={kitab.name} />
              </div>

              <div className="madrasa-card__footer">
                <div className="madrasa-stat">
                  <CalendarDays size={15} aria-hidden />
                  <span>{kitab.startDate}</span>
                </div>
                <div className="madrasa-stat">
                  <GraduationCap size={15} aria-hidden />
                  <span>{kitab.author}</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
