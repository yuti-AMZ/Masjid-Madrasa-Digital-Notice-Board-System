import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const featuredAnnouncement = {
  id: 'winter-quran-registration',
  category: 'Madrasa',
  title: 'Winter Quran Intensive Registration',
  description: 'Registration is now open for our annual winter Quran program for youth ages 7-15 at Najashi Masjid, Koye Feche. Limited spots available.',
  time: '2 days ago',
  image: 'https://images.unsplash.com/photo-1609592806500-3e27a7b0b5a8?auto=format&fit=crop&w=1200&q=80',
  type: 'madrasa'
};

const announcements = [
  {
    id: 'winter-quran-registration',
    category: 'Madrasa',
    title: 'Winter Quran Intensive Registration',
    description: 'Registration is now open for our annual winter Quran program for youth ages 7-15. Limited spots available.',
    time: '2 days ago',
    image: 'https://images.unsplash.com/photo-1609592806500-3e27a7b0b5a8?auto=format&fit=crop&w=900&q=80',
    type: 'madrasa'
  },
  {
    id: 'food-drive',
    category: 'Events',
    title: 'Monthly Community Food Drive',
    description: 'Help us distribute food parcels to local families in need this Sunday morning. Volunteers needed.',
    time: '5 hours ago',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=900&q=80',
    type: 'event'
  },
  {
    id: 'facility-upgrade',
    category: 'General',
    title: 'New Wudu Area Construction Update',
    description: 'The new wudu facilities are nearly complete. Thank you for your patience.',
    time: '1 week ago',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
    type: 'general'
  },
  {
    id: 'upcoming-khutbah',
    category: 'Friday',
    title: 'Upcoming Friday Khutbah Schedule',
    description: 'Guest speakers announced for the month. View full topics and details.',
    time: 'Yesterday',
    image: 'https://images.unsplash.com/photo-1524213156136-7e6cdd7302df?auto=format&fit=crop&w=900&q=80',
    type: 'khutbah'
  },
  {
    id: 'special-eid-al-fitr',
    category: 'Events',
    title: 'Special Eid Al-Fitr Prayer 1445H',
    description: 'Join us for Eid congregational prayer and community festival at Najashi Masjid.',
    time: '3 days ago',
    image: 'https://images.unsplash.com/photo-1549893073-173dd5049f6d?auto=format&fit=crop&w=900&q=80',
    type: 'eid'
  }
];

const filterItems = ['All', 'Madrasa', 'Events', 'Friday', 'General'];

function Announcements() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter announcements based on category and search term
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
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

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ margin: 0, color: '#FB923C', fontSize: '14px', fontWeight: '700', letterSpacing: '1px' }}>
          Najashi Masjid - Koye Feche
        </p>
        <h1 style={{ margin: '12px 0 0', fontSize: '38px', color: '#0F172A' }}>
          Community Announcements
        </h1>
        <p style={{ margin: '12px 0 0', color: '#64748B', maxWidth: '680px', lineHeight: 1.8 }}>
          Stay updated with the latest news, Quran programs, events, and Friday Khutbahs at Najashi Masjid.
        </p>
      </div>

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
            onClick={() => setActiveFilter(item)}
            style={{
              border: 'none',
              borderRadius: '999px',
              padding: '10px 22px',
              backgroundColor: activeFilter === item ? '#FF7D33' : '#F1F5F9',
              color: activeFilter === item ? '#fff' : '#334155',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '15px',
              boxShadow: activeFilter === item ? '0 10px 25px rgba(255, 125, 51, 0.18)' : 'none',
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
          borderRadius: '28px', 
          overflow: 'hidden', 
          marginBottom: '34px', 
          boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)',
          cursor: 'pointer'
        }}
        onClick={() => navigate(`/announcement/${featuredAnnouncement.id}`)}
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
              backgroundColor: '#FFF4ED', 
              color: '#FF7D33', 
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
                backgroundColor: '#FF7D33',
                color: '#fff',
                borderRadius: '14px',
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
        {filteredAnnouncements.map((item) => (
          <AnnouncementCard 
            key={item.id} 
            item={item} 
            onSelect={() => navigate(`/announcement/${item.id}`)} 
          />
        ))}
      </div>

      {filteredAnnouncements.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748B' }}>
          <p>No announcements found matching your search.</p>
        </div>
      )}

      {/* Load More Button (for future) */}
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
  return (
    <div 
      style={{ 
        borderRadius: '24px', 
        backgroundColor: '#fff', 
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
          backgroundColor: '#F1F5F9', 
          color: '#334155', 
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
          <span style={{ color: '#FF7D33', fontWeight: 700, fontSize: '14px' }}>
            View Details →
          </span>
        </div>
      </div>
    </div>
  );
}

export default Announcements;