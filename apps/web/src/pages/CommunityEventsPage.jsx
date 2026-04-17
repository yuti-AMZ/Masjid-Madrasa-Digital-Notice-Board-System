import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Calendar, Megaphone, Settings } from 'lucide-react'
import { announcementsById, announcementsList } from '../data/announcementsData'
import './CommunityEventsPage.css'

const FILTERS = ['All', 'General', 'Event', 'Madrasa', 'Friday']

const FEATURED_ID = 'upcoming-khutbah'

function linkLabel(item) {
  if (item.category === 'Events' || item.type === 'eid') return 'Register as Volunteer →'
  if (item.category === 'General') return 'See Project Status →'
  if (item.category === 'Friday') return 'View Schedule →'
  if (item.category === 'Madrasa') return 'View Details →'
  return 'View Details →'
}

export function CommunityEventsPage() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')

  const featuredDetail = announcementsById[FEATURED_ID]
  const featuredSpeaker = featuredDetail?.speakers?.[0]

  const gridItems = useMemo(() => {
    return announcementsList.filter((item) => {
      if (item.id === FEATURED_ID) return false
      if (activeFilter === 'All') return true
      if (activeFilter === 'Event') {
        return item.category === 'Events' || item.type === 'eid'
      }
      if (activeFilter === 'Friday') return item.category === 'Friday'
      if (activeFilter === 'Madrasa') return item.category === 'Madrasa'
      if (activeFilter === 'General') return item.category === 'General'
      return true
    })
  }, [activeFilter])

  const featuredTitle =
    featuredSpeaker?.topic ?? 'Friday Khutbah: The Importance of Community Bonds'
  const featuredBlurb =
    featuredSpeaker?.details?.slice(0, 160) ??
    featuredDetail?.description ??
    'Join us for this week’s Khutbah with our guest speaker.'

  function openFeatured() {
    navigate(`/announcement/${FEATURED_ID}`)
  }

  function openItem(item) {
    if (item.type === 'madrasa') {
      navigate('/madrasa')
      return
    }
    navigate(`/announcement/${item.id}`)
  }

  return (
    <div className="community-events">
      <header className="community-events__toolbar">
        <div className="community-events__toolbar-left">
          <Megaphone className="community-events__toolbar-icon" size={22} strokeWidth={2} aria-hidden />
          <span className="community-events__toolbar-label">Community Events</span>
        </div>
        <div className="community-events__toolbar-right">
          <Link to="/announcements/notifications" className="community-events__icon-btn" aria-label="Notifications">
            <Bell size={22} strokeWidth={2} />
          </Link>
          <Link to="/settings" className="community-events__icon-btn" aria-label="Settings">
            <Settings size={22} strokeWidth={2} />
          </Link>
        </div>
      </header>

      <div className="community-events__intro">
        <div className="community-events__intro-icon" aria-hidden>
          <Calendar size={28} strokeWidth={2} />
        </div>
        <h1 className="community-events__title">Community Events</h1>
        <p className="community-events__subtitle">
          Stay updated with the latest news, events, and Friday Khutbah schedules at Noor Masjid.
        </p>
      </div>

      <div className="community-events__filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={
              'community-events__filter' +
              (activeFilter === f ? ' community-events__filter--active' : '')
            }
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <article className="community-events__featured">
        <button type="button" className="community-events__featured-media" onClick={openFeatured}>
          <img
            src="https://images.unsplash.com/photo-1584555613497-9ecf9d0b1f40?auto=format&fit=crop&w=1400&q=80"
            alt=""
            className="community-events__featured-img"
          />
        </button>
        <div className="community-events__featured-body">
          <p className="community-events__featured-eyebrow">
            <span className="community-events__featured-dot" aria-hidden />
            Featured
          </p>
          <h2 className="community-events__featured-title">{featuredTitle}</h2>
          <p className="community-events__featured-desc">{featuredBlurb}</p>
          <div className="community-events__featured-footer">
            <span className="community-events__featured-meta">Friday · 1:15 PM · Main hall</span>
            <button type="button" className="community-events__featured-cta" onClick={openFeatured}>
              Set reminder
            </button>
          </div>
        </div>
      </article>

      <div className="community-events__grid">
        {gridItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="community-events__card"
            onClick={() => openItem(item)}
          >
            <div className="community-events__card-image-wrap">
              <img src={item.image} alt="" className="community-events__card-img" />
            </div>
            <div className="community-events__card-body">
              <div className="community-events__card-meta">
                <span className="community-events__card-tag">{item.category.toUpperCase()}</span>
                <span className="community-events__card-time">{item.time}</span>
              </div>
              <h3 className="community-events__card-title">{item.title}</h3>
              <p className="community-events__card-desc">{item.description}</p>
              <span className="community-events__card-link">{linkLabel(item)}</span>
            </div>
          </button>
        ))}
      </div>

      {gridItems.length === 0 ? (
        <p className="community-events__empty">
          {activeFilter === 'Friday'
            ? 'This week’s Khutbah is featured above.'
            : 'No items match this filter.'}
        </p>
      ) : null}

      <div className="community-events__more-wrap">
        <button type="button" className="community-events__more">
          More events
        </button>
      </div>
    </div>
  )
}
