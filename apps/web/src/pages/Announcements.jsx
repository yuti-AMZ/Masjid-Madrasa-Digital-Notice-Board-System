import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { announcementsList, featuredAnnouncement } from '../data/announcementsData';
import { getNextUpcomingEventHijri } from '../data/hijriCalendar';

const filterItems = ['All', 'Madrasa', 'Events', 'Friday', 'General'];

function Announcements() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const nextEvent = useMemo(() => getNextUpcomingEventHijri({ fromDate: new Date() }), []);

  // Filter announcements based on category and search term
  const filteredAnnouncements = useMemo(() => {
    return announcementsList.filter((item) => {
      const matchesFilter = 
        activeFilter === 'All' || 
        (activeFilter === 'Friday' && item.category === 'Friday') ||
        (activeFilter === 'Madrasa' && item.category === 'Madrasa') ||
        (activeFilter === 'Events' && (item.category === 'Events' || item.type === 'eid')) ||
        (activeFilter === 'General' && item.category === 'General');

      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const handleFilterClick = (item) => {
    if (item === 'Friday') {
      navigate('/khutbahs');
      return;
    }

    if (item === 'Madrasa') {
      navigate('/madrasa');
      return;
    }

    setActiveFilter(item);
  };

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ margin: 0, color: 'var(--color-primary)', fontSize: '14px', fontWeight: '700', letterSpacing: '1px' }}>
          Nejashi Mesjid Koye Feche • Addis Ababa
        </p>
        <h1 style={{ margin: '12px 0 0', fontSize: '38px', color: '#0F172A' }}>
          Community Announcements
        </h1>
        <p style={{ margin: '12px 0 0', color: '#64748B', maxWidth: '680px', lineHeight: 1.8 }}>
          Stay updated with the latest news, Quran programs, events, and Friday Khutbahs at Nejashi Mesjid Koye Feche.
        </p>
      </div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <Link to="/calendar" style={{ textDecoration: 'none' }}>
          <button
            className="btn"
            style={{
              border: 'none',
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 16px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Calendar & reminders →
          </button>
        </Link>
      </div>

      {nextEvent && (
        <div
          className="card"
          style={{
            marginBottom: '20px',
            padding: '16px',
            background:
              nextEvent.kind === 'eid'
                ? 'rgba(255, 215, 0, 0.16)'
                : 'rgba(20, 195, 142, 0.10)',
            borderColor:
              nextEvent.kind === 'eid'
                ? 'rgba(255, 215, 0, 0.55)'
                : 'rgba(20, 195, 142, 0.35)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, fontWeight: 900, fontSize: '16px' }}>
                {nextEvent.kind === 'eid'
                  ? `${nextEvent.title} Mubarak!`
                  : nextEvent.kind === 'ayyam_al_bid'
                    ? 'Ayyām al-Bīḍ reminder'
                    : nextEvent.kind === 'arafah'
                      ? 'Day of Arafah reminder'
                      : 'Upcoming reminder'}
              </p>
              <p style={{ margin: '8px 0 0', color: 'var(--color-muted)', lineHeight: 1.7 }}>
                {nextEvent.message}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-muted)', fontWeight: 600 }}>
                {nextEvent.hijriLabel}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-text)', fontWeight: 900, background: 'rgba(255,255,255,0.7)', border: '1px solid var(--color-border)', borderRadius: '999px', padding: '6px 10px' }}>
                {nextEvent.daysUntil === 0 ? 'Today' : `In ${nextEvent.daysUntil} day(s)`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search announcements... (e.g. Quran, Eid, Khutbah)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '500px',
            padding: '14px 20px',
            border: '1px solid #E2E8F0',
            borderRadius: '999px',
            fontSize: '16px',
            outline: 'none',
            backgroundColor: '#fff'
          }}
        />
      </div>

      {/* Category Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {filterItems.map((item) => (
          <button
            key={item}
            onClick={() => handleFilterClick(item)}
            style={{
              border: 'none',
              borderRadius: '999px',
              padding: '10px 22px',
              backgroundColor: activeFilter === item ? 'var(--color-primary)' : '#F1F5F9',
              color: activeFilter === item ? '#fff' : '#334155',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '15px',
              boxShadow: activeFilter === item ? '0 10px 25px rgba(20, 195, 142, 0.20)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Featured Announcement */}
      <div 
        style={{ 
          backgroundColor: '#fff', 
          borderRadius: '16px', 
          overflow: 'hidden', 
          marginBottom: '34px', 
          boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
          cursor: 'pointer'
        }}
        onClick={() =>
          navigate(
            featuredAnnouncement.type === 'madrasa'
              ? '/madrasa'
              : `/announcement/${featuredAnnouncement.id}`,
          )
        }
      >
        <div style={{ width: '100%', height: '320px', overflow: 'hidden' }}>
          <img 
            src={featuredAnnouncement.image} 
            alt={featuredAnnouncement.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        <div style={{ padding: '36px 42px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span style={{ 
              backgroundColor: 'rgba(20, 195, 142, 0.12)', 
              color: 'var(--color-primary)', 
              padding: '10px 14px', 
              borderRadius: '999px', 
              fontSize: '12px', 
              fontWeight: '700' 
            }}>
              {featuredAnnouncement.category}
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: '32px', lineHeight: 1.1, color: '#0F172A' }}>
            {featuredAnnouncement.title}
          </h2>
          <p style={{ margin: '18px 0 0', color: '#475569', maxWidth: '760px', lineHeight: 1.8 }}>
            {featuredAnnouncement.description}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px', flexWrap: 'wrap', gap: '18px' }}>
            <span style={{ color: '#64748B', fontSize: '14px' }}>{featuredAnnouncement.time}</span>
            <button
              style={{
                border: 'none',
                backgroundColor: 'var(--color-primary)',
                color: '#fff',
                borderRadius: '12px',
                padding: '14px 26px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Announcements Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
        {filteredAnnouncements.map((item) => (
          <AnnouncementCard 
            key={item.id} 
            item={item} 
            onSelect={() =>
              navigate(item.type === 'madrasa' ? '/madrasa' : `/announcement/${item.id}`)
            } 
          />
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
          <p>No announcements found matching your search.</p>
        </div>
      )}

      {/* Load More Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <button style={{ 
          border: '1px solid #E2E8F0', 
          backgroundColor: '#fff', 
          color: '#334155', 
          borderRadius: '12px', 
          padding: '14px 32px', 
          fontWeight: 600, 
          cursor: 'pointer',
          fontSize: '15px'
        }}>
          Load More Announcements
        </button>
      </div>
    </div>
  );
}

// Reusable Announcement Card
function AnnouncementCard({ item, onSelect }) {
  const accent =
    item.type === 'khutbah'
      ? { bg: 'rgba(20, 195, 142, 0.10)', pillBg: 'rgba(20, 195, 142, 0.16)', pillText: 'var(--color-primary)' }
      : item.type === 'eid'
        ? { bg: 'rgba(255, 215, 0, 0.10)', pillBg: 'rgba(255, 215, 0, 0.18)', pillText: '#7A5E00' }
        : { bg: '#fff', pillBg: '#F1F5F9', pillText: '#334155' };

  return (
    <div 
      style={{ 
        borderRadius: '16px', 
        backgroundColor: accent.bg,
        overflow: 'hidden', 
        boxShadow: '0 15px 35px rgba(15, 23, 42, 0.06)', 
        cursor: 'pointer',
        border: '1px solid #E2E8F0',
        transition: 'transform 0.2s'
      }} 
      onClick={onSelect}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
        <img 
          src={item.image} 
          alt={item.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>
      <div style={{ padding: '24px' }}>
        <span style={{ 
          display: 'inline-flex', 
          backgroundColor: accent.pillBg,
          color: accent.pillText,
          borderRadius: '999px', 
          padding: '8px 14px', 
          fontSize: '12px', 
          fontWeight: 700, 
          marginBottom: '14px' 
        }}>
          {item.category}
        </span>
        
        <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', color: '#0F172A', lineHeight: 1.3 }}>
          {item.title}
        </h3>
        
        <p style={{ 
          color: '#64748B', 
          fontSize: '14px', 
          lineHeight: 1.7, 
          marginBottom: '18px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {item.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#94A3B8', fontSize: '13px' }}>{item.time}</span>
          <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '14px' }}>
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}

export default Announcements;
