import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Calendar, Share2, Play, Pause, SkipBack, SkipForward, Download } from 'lucide-react';
import { announcementsById } from '../data/announcementsData';
import { downloadICS } from '../utils/ics';
import './AnnouncementDetail.css';

function AnnouncementDetail() {
  
  const { announcementId } = useParams();
  const navigate = useNavigate();
  const announcement = announcementsById[announcementId] || announcementsById['special-eid-al-fitr'];
  const [selectedKitabIndex, setSelectedKitabIndex] = useState(0);
  const audioRef = useRef(null);
  const audioSectionRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [subscribeEmail, setSubscribeEmail] = useState('');

  useEffect(() => {
    setSelectedKitabIndex(0);
  }, [announcementId]);

  useEffect(() => {
    setAudioPlaying(false);
    setAudioProgress(0);
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
  }, [announcementId, announcement?.audioUrl]);

  const selectedKitab = announcement.kitaabs?.[selectedKitabIndex] || null;

  const handlePrimaryAction = () => {
    if (announcement.type === 'madrasa') {
      navigate('/madrasa');
      return;
    }

    if (announcement.type === 'khutbah') {
      // Save a simple reminder to localStorage for visibility in calendar page.
      const key = 'nejashi_reminders';
      const current = JSON.parse(localStorage.getItem(key) || '[]');
      const next = [{ id: `${announcement.id}-${Date.now()}`, announcementId: announcement.id, title: announcement.title, createdAt: new Date().toISOString() }, ...current].slice(0, 20);
      localStorage.setItem(key, JSON.stringify(next));
      alert('تم حفظ التذكير. يمكنك رؤيته في صفحة التقويم.');
      return;
    }

    // Add to calendar (ICS download). Uses "now + 1 hour" as a safe default unless schedule exists.
    const start = new Date();
    start.setHours(start.getHours() + 1, 0, 0, 0);
    const end = new Date(start);
    end.setHours(end.getHours() + 1);

    downloadICS({
      title: announcement.title,
      description: announcement.description,
      location: announcement.location,
      start,
      end,
      filename: `${announcement.id}.ics`,
    });
  };

  const handleAudioTimeUpdate = () => {
    const a = audioRef.current;
    if (!a?.duration) return;
    setAudioProgress((a.currentTime / a.duration) * 100);
  };

  const toggleAudio = () => {
    if (!announcement.audioUrl) return;
    const a = audioRef.current;
    if (!a) return;
    if (audioPlaying) {
      a.pause();
      setAudioPlaying(false);
    } else {
      void a.play().then(() => setAudioPlaying(true)).catch(() => setAudioPlaying(false));
    }
  };

  const skipAudio = (deltaSec) => {
    const a = audioRef.current;
    if (!a?.duration) return;
    a.currentTime = Math.max(0, Math.min(a.duration, a.currentTime + deltaSec));
  };

  const seekAudio = (ratio) => {
    const a = audioRef.current;
    if (!a?.duration) return;
    a.currentTime = ratio * a.duration;
    setAudioProgress(ratio * 100);
  };

  const scrollToAudio = () => {
    audioSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (announcement.audioUrl && audioRef.current) {
      void audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {});
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: announcement.title,
          text: announcement.description,
          url,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(url);
    }
  };

  const renderSidebarContent = () => {
    switch (announcement.type) {
      case 'event':
        return (
          <div style={{ borderRadius: '24px', padding: '28px', background: 'linear-gradient(180deg, #FF7D33 0%, #F6A35F 100%)', color: '#fff', boxShadow: '0 18px 45px rgba(255, 125, 51, 0.18)' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Our Programs</h2>
            <div style={{ marginTop: '20px', display: 'grid', gap: '14px' }}>
              {announcement.programs.map((program) => (
                <div key={program.name} style={{ padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '18px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>{program.name}</div>
                  <div style={{ color: '#FCEDE2', fontSize: '14px', marginBottom: '4px' }}>{program.time}</div>
                  <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}>{program.description}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ margin: '0 0 12px', fontSize: '16px' }}>Volunteer Opportunities:</h3>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: 1.6 }}>
                {announcement.volunteerNeeds.map((need, index) => (
                  <li key={index}>{need}</li>
                ))}
              </ul>
            </div>
            <p style={{ margin: '20px 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: 1.7 }}>
              Volunteers please arrive 15 minutes early for briefing.
            </p>
          </div>
        );

      case 'khutbah':
        return (
          <div style={{ borderRadius: '24px', padding: '28px', background: 'linear-gradient(180deg, #10B981 0%, #34D399 100%)', color: '#fff', boxShadow: '0 18px 45px rgba(16, 185, 129, 0.18)' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>This Month's Khutbah Topics</h2>
            <div style={{ marginTop: '20px', display: 'grid', gap: '14px' }}>
              {announcement.speakers.map((speaker) => (
                <div key={speaker.name} style={{ padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '18px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>{speaker.name}</div>
                  <div style={{ color: '#E0F2FE', fontSize: '14px', marginBottom: '6px', fontWeight: 600 }}>{speaker.topic}</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginBottom: '8px' }}>{speaker.date}</div>
                  <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', lineHeight: 1.4 }}>{speaker.details}</div>
                </div>
              ))}
            </div>
            <p style={{ margin: '20px 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: 1.7 }}>
              Khutbah starts at 1:15 PM. Please arrive early for the best seats.
            </p>
          </div>
        );

      case 'madrasa':
        return (
          <div style={{ borderRadius: '24px', padding: '28px', background: 'linear-gradient(180deg, #3B82F6 0%, #60A5FA 100%)', color: '#fff', boxShadow: '0 18px 45px rgba(59, 130, 246, 0.18)' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Available Kitaabs</h2>
            <div style={{ marginTop: '20px', display: 'grid', gap: '14px' }}>
              {announcement.kitaabs.map((kitab) => (
                <div key={kitab.name} style={{ padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '18px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>{kitab.name}</div>
                  <div style={{ color: '#DBEAFE', fontSize: '14px', marginBottom: '6px' }}>By: {kitab.author}</div>
                  <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', marginBottom: '6px' }}>{kitab.startDate} - {kitab.endDate}</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', lineHeight: 1.4 }}>{kitab.description}</div>
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#BFDBFE' }}>
                    <div>Tests: {kitab.tests}</div>
                    <div>Assignments: {kitab.assignments}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ margin: '20px 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: 1.7 }}>
              Classes begin December 1st. Registration closes November 25th.
            </p>
          </div>
        );

      case 'general':
        return (
          <div style={{ borderRadius: '24px', padding: '28px', background: 'linear-gradient(180deg, #6B7280 0%, #9CA3AF 100%)', color: '#fff', boxShadow: '0 18px 45px rgba(107, 114, 128, 0.18)' }}>
            <h2 style={{ margin: 0, fontSize: '20px' }}>Facility Status</h2>
            <div style={{ marginTop: '20px', display: 'grid', gap: '14px' }}>
              {announcement.facilityIssues.map((issue) => (
                <div key={issue.facility} style={{ padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '18px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '4px' }}>{issue.facility}</div>
                  <div style={{ color: '#F3F4F6', fontSize: '14px', marginBottom: '6px' }}>{issue.status}</div>
                  <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', marginBottom: '6px' }}>{issue.issue}</div>
                  <div style={{ color: '#FDE68A', fontSize: '14px', fontWeight: 600 }}>Cost: {issue.cost}</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>Completion: {issue.estimatedCompletion}</div>
                </div>
              ))}
            </div>
            <p style={{ margin: '20px 0 0', color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: 1.7 }}>
              Expected completion: Next week. We appreciate your patience.
            </p>
          </div>
        );

      case 'eid':
        if (!announcement.schedule?.length) return null;
        return (
          <div className="ann-detail__schedule-card">
            <h3>Eid schedule</h3>
            {announcement.schedule.map((row) => {
              const highlight = /eid prayer/i.test(row.label);
              return (
                <div
                  key={row.label}
                  className={
                    'ann-detail__schedule-row' +
                    (highlight ? ' ann-detail__schedule-row--highlight' : '')
                  }
                >
                  <span>{row.label}</span>
                  <span>{row.time}</span>
                </div>
              );
            })}
            <p className="ann-detail__schedule-footnote">
              Please arrive early for parking. Carpooling is highly recommended.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const relatedKhutbahThumbs = [
    'https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1458014854819-043adac3d570?auto=format&fit=crop&w=200&q=80',
  ];

  if (announcement.type === 'khutbah') {
    const meta = announcement.featuredMeta || { dateLabel: '', durationMins: 25 };
    const speaker = announcement.speaker || {
      name: announcement.speakers?.[0]?.name || 'Speaker',
      role: 'Nejashi Mesjid Koye Feche',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    };
    const takeaways = announcement.keyTakeaways?.length
      ? announcement.keyTakeaways
      : [
          { title: 'Reflection', text: announcement.description },
          { title: 'Details', text: (announcement.details || '').slice(0, 280) },
        ];
    const related = (announcement.speakers || []).slice(1, 4);

    return (
      <div className="ann-detail khutbah-detail" style={{ color: 'var(--color-text)' }}>
        <nav className="ann-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="ann-detail__breadcrumb-sep" aria-hidden>
            ›
          </span>
          <Link to="/announcements">Announcements</Link>
          <span className="ann-detail__breadcrumb-sep" aria-hidden>
            ›
          </span>
          <span className="ann-detail__breadcrumb-current">{announcement.title}</span>
        </nav>

        <div className="ann-detail__hero">
          <img className="ann-detail__hero-img" src={announcement.hero} alt="" />
          <div className="ann-detail__hero-overlay" aria-hidden />
          <span className="ann-detail__hero-badge">Featured Khutbah</span>
          <p className="khutbah-detail__hero-meta">
            <span>{meta.dateLabel}</span>
            <span className="khutbah-detail__hero-meta-dot" aria-hidden>
              ·
            </span>
            <span>{meta.durationMins} mins</span>
          </p>
          <h1 className="ann-detail__hero-title">{announcement.title}</h1>
        </div>

        <div className="khutbah-detail__speaker">
          <div className="khutbah-detail__speaker-info">
            <img src={speaker.photo} alt="" className="khutbah-detail__speaker-photo" />
            <div>
              <p className="khutbah-detail__speaker-name">{speaker.name}</p>
              <p className="khutbah-detail__speaker-role">{speaker.role}</p>
            </div>
          </div>
          <div className="khutbah-detail__speaker-actions">
            <button type="button" className="khutbah-detail__btn-listen" onClick={scrollToAudio}>
              <Play size={18} strokeWidth={2.5} aria-hidden />
              Listen now
            </button>
            <button
              type="button"
              className="khutbah-detail__btn-follow"
              onClick={() => alert('Follow reminders can be enabled when accounts are connected.')}
            >
              Follow
            </button>
            <button type="button" className="khutbah-detail__btn-icon" onClick={handleShare} aria-label="Share">
              <Share2 size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div className="bentoGrid" style={{ marginBottom: '32px' }}>
          <div className="bentoSpan2">
            <h2 className="ann-detail__section-title">Summary</h2>
            <p className="ann-detail__prose">{announcement.description}</p>
            <p className="ann-detail__prose" style={{ marginTop: '-0.5rem' }}>
              {announcement.details}
            </p>

            <h2 className="ann-detail__section-title" style={{ marginTop: '0.5rem' }}>
              Key takeaways
            </h2>
            <div className="khutbah-detail__takeaways">
              {takeaways.map((item) => (
                <div key={item.title} className="khutbah-detail__takeaway-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <div ref={audioSectionRef} className="khutbah-detail__audio">
              <div className="khutbah-detail__audio-head">
                <span className="khutbah-detail__audio-label">Full audio recording</span>
                {announcement.audioUrl ? (
                  <a
                    href={announcement.audioUrl}
                    download
                    className="khutbah-detail__audio-dl"
                    aria-label="Download audio"
                  >
                    <Download size={18} />
                  </a>
                ) : null}
              </div>
              {announcement.audioUrl ? (
                <>
                  <audio
                    ref={audioRef}
                    src={announcement.audioUrl}
                    onTimeUpdate={handleAudioTimeUpdate}
                    onEnded={() => setAudioPlaying(false)}
                    onPlay={() => setAudioPlaying(true)}
                    onPause={() => setAudioPlaying(false)}
                    preload="metadata"
                  />
                  <div
                    className="khutbah-detail__audio-bar"
                    onClick={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      seekAudio(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleAudio();
                      }
                    }}
                    role="slider"
                    tabIndex={0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(audioProgress)}
                    aria-label="Playback position"
                  >
                    <span className="khutbah-detail__audio-bar-fill" style={{ width: `${audioProgress}%` }} />
                  </div>
                  <div className="khutbah-detail__audio-controls">
                    <button
                      type="button"
                      className="khutbah-detail__ctrl"
                      aria-label="Back 10 seconds"
                      onClick={() => skipAudio(-10)}
                    >
                      <SkipBack size={22} />
                    </button>
                    <button
                      type="button"
                      className="khutbah-detail__ctrl khutbah-detail__ctrl--play"
                      onClick={toggleAudio}
                      aria-label={audioPlaying ? 'Pause' : 'Play'}
                    >
                      {audioPlaying ? <Pause size={28} /> : <Play size={28} />}
                    </button>
                    <button
                      type="button"
                      className="khutbah-detail__ctrl"
                      aria-label="Forward 10 seconds"
                      onClick={() => skipAudio(10)}
                    >
                      <SkipForward size={22} />
                    </button>
                  </div>
                </>
              ) : (
                <p className="khutbah-detail__audio-placeholder">
                  The recording will be posted here after Jumu‘ah, in shā’ Allāh.
                </p>
              )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
              <button type="button" className="ann-detail__btn-primary" onClick={handlePrimaryAction}>
                Set reminder
              </button>
              <button type="button" className="ann-detail__btn-secondary" onClick={handleShare}>
                Share
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="khutbah-detail__related">
              <h3>Related Khutbahs</h3>
              {related.length === 0 ? (
                <p className="khutbah-detail__audio-placeholder" style={{ color: '#64748b' }}>
                  More topics will appear here as the monthly schedule is updated.
                </p>
              ) : (
                <ul className="khutbah-detail__related-list">
                  {related.map((k, i) => (
                    <li key={`${k.name}-${k.date}`} className="khutbah-detail__related-item">
                      <img src={relatedKhutbahThumbs[i % relatedKhutbahThumbs.length]} alt="" />
                      <div>
                        <p className="khutbah-detail__related-title">{k.topic}</p>
                        <p className="khutbah-detail__related-date">{k.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Link to="/announcements" className="khutbah-detail__archive-link">
                View archive →
              </Link>
            </div>

            <div className="khutbah-detail__subscribe">
              <h3>Join our community</h3>
              <p>Stay updated with the latest khutbahs, events, and masjid announcements.</p>
              <form
                className="khutbah-detail__subscribe-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (subscribeEmail.trim()) {
                    alert('Thanks — we will use this for announcements when email delivery is enabled.');
                    setSubscribeEmail('');
                  }
                }}
              >
                <input
                  type="email"
                  placeholder="Email address"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  aria-label="Email for updates"
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>

            <div
              style={{
                borderRadius: '16px',
                padding: '26px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '18px', color: '#0F172A' }}>Location</h3>
              <div
                style={{
                  marginTop: '18px',
                  height: '160px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#E2E8F0',
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <p style={{ margin: '18px 0 0', color: '#475569', lineHeight: 1.7 }}>{announcement.location}</p>
            </div>
          </div>
        </div>

        <Link to="/announcements" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <button
            type="button"
            style={{
              backgroundColor: '#fff',
              color: '#334155',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '14px 22px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            ← Back to Announcements
          </button>
        </Link>
      </div>
    );
  }

  if (announcement.type === 'eid') {
    return (
      <div className="ann-detail" style={{ color: 'var(--color-text)' }}>
        <nav className="ann-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span className="ann-detail__breadcrumb-sep" aria-hidden>
            ›
          </span>
          <Link to="/announcements">Announcements</Link>
          <span className="ann-detail__breadcrumb-sep" aria-hidden>
            ›
          </span>
          <span className="ann-detail__breadcrumb-current">{announcement.title}</span>
        </nav>

        <div className="ann-detail__hero">
          <img
            className="ann-detail__hero-img"
            src={announcement.hero}
            alt=""
          />
          <div className="ann-detail__hero-overlay" aria-hidden />
          <span className="ann-detail__hero-badge">Event</span>
          <h1 className="ann-detail__hero-title">{announcement.title}</h1>
        </div>

        <div className="ann-detail__actions">
          <button type="button" className="ann-detail__btn-primary" onClick={handlePrimaryAction}>
            <Calendar size={20} strokeWidth={2} aria-hidden />
            Add to Calendar
          </button>
          <button type="button" className="ann-detail__btn-secondary" onClick={handleShare}>
            <Share2 size={20} strokeWidth={2} aria-hidden />
            Share
          </button>
        </div>

        <div className="bentoGrid" style={{ marginBottom: '32px' }}>
          <div className="bentoSpan2">
            <h2 className="ann-detail__section-title">About the celebration</h2>
            <p className="ann-detail__prose">
              {announcement.description} We will be celebrating the completion of the blessed month
              of Ramadan together with the wider community.
            </p>

            {announcement.features && (
              <div className="ann-detail__feature-grid">
                {announcement.features.map((feature) => (
                  <div key={feature.label} className="ann-detail__feature-card">
                    <h3>{feature.label}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            )}

            {announcement.eidInfo && (
              <div
                style={{
                  marginBottom: '28px',
                  borderRadius: '22px',
                  padding: '18px',
                  background:
                    'linear-gradient(90deg, rgba(234,88,12,0.12) 0%, rgba(20,195,142,0.1) 100%)',
                  border: '1px solid rgba(20, 195, 142, 0.28)',
                }}
              >
                <p style={{ margin: 0, color: '#0F172A', fontWeight: 900, fontSize: '16px' }}>
                  {announcement.eidInfo.greeting}
                </p>
                <p style={{ margin: '8px 0 0', color: '#475569', lineHeight: 1.7, fontSize: '14px' }}>
                  Meet at {announcement.eidInfo.meetWhere}. Salah: {announcement.eidInfo.salahStarts}.
                </p>
              </div>
            )}

            <p className="ann-detail__prose" style={{ marginBottom: 0 }}>
              {announcement.details}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {renderSidebarContent()}

            <div
              style={{
                borderRadius: '16px',
                padding: '26px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '18px', color: '#0F172A' }}>Location</h3>
              <div
                style={{
                  marginTop: '18px',
                  height: '200px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#E2E8F0',
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <p style={{ margin: '18px 0 0', color: '#475569', lineHeight: 1.7 }}>
                {announcement.location}
              </p>
            </div>

            <div
              style={{
                borderRadius: '16px',
                padding: '26px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '18px', color: '#0F172A' }}>Other updates</h3>
              <div style={{ marginTop: '20px', display: 'grid', gap: '14px' }}>
                {announcement.otherUpdates.map((update) => (
                  <div
                    key={update.title || update.label}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'center',
                      backgroundColor: '#F8FAFC',
                      padding: '14px 16px',
                      borderRadius: '18px',
                    }}
                  >
                    <div
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-primary)',
                      }}
                    />
                    <div>
                      <p style={{ margin: '0 0 6px', fontWeight: 700, color: '#0F172A' }}>
                        {update.title || update.label}
                      </p>
                      <p style={{ margin: 0, color: '#64748B', fontSize: '13px' }}>{update.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Link to="/announcements" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <button
            type="button"
            style={{
              backgroundColor: '#fff',
              color: '#334155',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '14px 22px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            ← Back to Announcements
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', color: 'var(--color-text)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px', marginBottom: '30px' }}>
        <div>
          <p style={{ margin: 0, color: '#FB923C', fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>Announcements</p>
          <h1 style={{ margin: '12px 0 0', fontSize: '34px' }}>{announcement.title}</h1>
          <p style={{ margin: '14px 0 0', color: '#64748B', maxWidth: '720px', lineHeight: 1.8 }}>
            {announcement.type === 'khutbah' ? 'Explore the full Khutbah schedule and speaker information for this month.' :
             announcement.type === 'madrasa' ? 'Learn about our upcoming Quran intensive program and registration details.' :
             announcement.type === 'event' ? 'Join us for this community service event and make a difference.' :
             announcement.type === 'general' ? 'Stay updated with the latest facility improvements and announcements.' :
             'Explore the full celebration details, schedule, and community information for our upcoming Eid prayer.'}
          </p>
        </div>
        <Link to="/announcements" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#fff', color: '#334155', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '14px 22px', cursor: 'pointer', fontWeight: 700 }}>
            ← Back to Announcements
          </button>
        </Link>
      </div>

      <div className="bentoGrid" style={{ marginBottom: '32px' }}>
        <div className="bentoSpan2">
        <div style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--color-border)' }}>
          <div style={{ position: 'relative', width: '100%', height: '420px', overflow: 'hidden' }}>
            <img src={announcement.hero} alt={announcement.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <span style={{ position: 'absolute', top: '24px', left: '24px', backgroundColor: 'rgba(20, 195, 142, 0.95)', color: '#fff', padding: '10px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.4px' }}>
              {announcement.category}
            </span>
          </div>
          <div style={{ padding: '32px 34px' }}>
            {announcement.type === 'eid' && announcement.eidInfo && (
              <div style={{ marginBottom: '22px', borderRadius: '22px', padding: '18px', background: 'linear-gradient(90deg, rgba(255,125,51,0.14) 0%, rgba(16,185,129,0.12) 100%)', border: '1px solid rgba(255, 125, 51, 0.25)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ margin: 0, color: '#0F172A', fontWeight: 900, fontSize: '16px' }}>{announcement.eidInfo.greeting}</p>
                    <p style={{ margin: '6px 0 0', color: '#475569', lineHeight: 1.7, fontSize: '14px' }}>
                      Students and families: please arrive early and follow the organizers for meeting points and prayer arrangement.
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: '1px solid rgba(148,163,184,0.45)', color: '#0F172A', borderRadius: '999px', padding: '8px 12px', fontSize: '12px', fontWeight: 900 }}>
                      Meet: {announcement.eidInfo.meetWhen}
                    </span>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: '1px solid rgba(148,163,184,0.45)', color: '#0F172A', borderRadius: '999px', padding: '8px 12px', fontSize: '12px', fontWeight: 900 }}>
                      Salah: {announcement.eidInfo.salahStarts}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {announcement.type === 'madrasa' ? (
                <button
                  style={{ backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: '12px', color: '#fff', padding: '12px 20px', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => window.location.assign(`/announcement/${announcement.id}/register`)}
                >
                  Register Now
                </button>
              ) : (
                <button
                  style={{ backgroundColor: 'var(--color-primary)', border: 'none', borderRadius: '12px', color: '#fff', padding: '12px 20px', fontWeight: 700, cursor: 'pointer' }}
                  onClick={handlePrimaryAction}
                >
                  {announcement.type === 'khutbah' ? 'Set Reminder' :
                   announcement.type === 'event' ? 'Sign Up to Volunteer' :
                   announcement.type === 'general' ? 'View Progress' :
                   'Add to Calendar'}
                </button>
              )}
              <button style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '12px', color: 'var(--color-text)', padding: '12px 20px', fontWeight: 700, cursor: 'pointer' }}>
                Share
              </button>
            </div>
            <div style={{ marginBottom: '28px' }}>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#0F172A' }}>
                {announcement.type === 'khutbah' ? 'About This Month\'s Khutbahs' :
                 announcement.type === 'madrasa' ? 'Program Overview' :
                 announcement.type === 'event' ? 'Event Details' :
                 announcement.type === 'general' ? 'Update Details' :
                 'About the Celebration'}
              </h2>
              <p style={{ margin: '16px 0 0', color: '#475569', lineHeight: 1.8 }}>
                {announcement.description}
                {announcement.type === 'eid' ? ' We will be celebrating the completion of the blessed month of Ramadan together.' :
                 announcement.type === 'khutbah' ? ' Each Khutbah focuses on contemporary issues affecting our community.' :
                 announcement.type === 'madrasa' ? ' This program is designed to deepen students\' understanding of the Quran.' :
                 announcement.type === 'event' ? ' Your participation helps strengthen our community bonds.' :
                 ' We continue to improve our facilities for better service to the community.'}
              </p>
            </div>
            {announcement.features && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px', marginBottom: '28px' }}>
                {announcement.features.map((feature) => (
                  <div key={feature.label} style={{ backgroundColor: '#F8FAFC', borderRadius: '20px', padding: '22px' }}>
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#0F172A' }}>{feature.label}</h3>
                    <p style={{ margin: '10px 0 0', color: '#64748B', fontSize: '14px', lineHeight: 1.8 }}>{feature.description}</p>
                  </div>
                ))}
              </div>
            )}
            {announcement.type === 'madrasa' && selectedKitab && (
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ margin: '0 0 20px', fontSize: '24px', color: '#0F172A' }}>Kitāb Tracks</h2>
                <p style={{ margin: '0 0 24px', color: '#64748B', lineHeight: 1.8 }}>
                  Select a track below to view full details for each specific kitab, including the teacher, timeline, written author, and assessment plan.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.9fr', gap: '24px' }}>
                  <div style={{ display: 'grid', gap: '18px' }}>
                    {announcement.kitaabs.map((kitab, index) => (
                      <button
                        key={kitab.name}
                        onClick={() => setSelectedKitabIndex(index)}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '120px 1fr',
                          gap: '16px',
                          alignItems: 'center',
                          textAlign: 'left',
                          border: selectedKitabIndex === index ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          borderRadius: '22px',
                          backgroundColor: selectedKitabIndex === index ? 'rgba(20, 195, 142, 0.10)' : 'var(--color-surface)',
                          padding: '18px',
                          cursor: 'pointer',
                          boxShadow: selectedKitabIndex === index ? '0 18px 35px rgba(20, 195, 142, 0.14)' : '0 12px 30px rgba(15, 23, 42, 0.06)'
                        }}
                      >
                        <div style={{ width: '120px', height: '120px', borderRadius: '18px', overflow: 'hidden' }}>
                          <img src={kitab.image} alt={kitab.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <p style={{ margin: 0, color: '#0F172A', fontSize: '15px', fontWeight: 700 }}>{kitab.name}</p>
                          <p style={{ margin: '8px 0 10px', color: '#475569', fontSize: '13px', lineHeight: 1.6 }}>{kitab.author}</p>
                          <p style={{ margin: 0, color: '#64748B', fontSize: '13px' }}>{kitab.classTime}</p>
                          <p style={{ margin: '6px 0 0', color: '#94A3B8', fontSize: '12px' }}>{kitab.startDate} – {kitab.endDate}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div style={{ borderRadius: '28px', backgroundColor: '#F8FAFC', padding: '28px', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)' }}>
                    <div style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '22px' }}>
                      <img src={selectedKitab.image} alt={selectedKitab.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, color: '#64748B', fontSize: '13px' }}>Selected Kitāb</p>
                      <h3 style={{ margin: '10px 0 6px', fontSize: '24px', color: '#0F172A' }}>{selectedKitab.name}</h3>
                      <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>{selectedKitab.description}</p>
                    </div>

                    <div style={{ marginTop: '18px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => navigate(`/announcement/${announcement.id}/kitaab/${selectedKitabIndex}`)}
                        style={{ border: 'none', backgroundColor: 'var(--color-primary)', color: '#fff', borderRadius: '12px', padding: '12px 18px', cursor: 'pointer', fontWeight: 800 }}
                      >
                        Open this Kitāb page →
                      </button>
                      <button
                        onClick={() => navigator.clipboard?.writeText?.(selectedKitab.name)}
                        style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', color: 'var(--color-text)', borderRadius: '12px', padding: '12px 18px', cursor: 'pointer', fontWeight: 800 }}
                      >
                        Copy Kitāb name
                      </button>
                    </div>

                    <div style={{ marginTop: '24px', display: 'grid', gap: '16px' }}>
                      {[
                        { label: 'Teacher', value: selectedKitab.teacher },
                        { label: 'Author', value: selectedKitab.author },
                        { label: 'Class Time', value: selectedKitab.classTime },
                        { label: 'Current Page', value: selectedKitab.currentPage },
                        { label: 'Duration', value: `${selectedKitab.startDate} to ${selectedKitab.endDate}` },
                        { label: 'Written', value: selectedKitab.yearWritten }
                      ].map((item) => (
                        <div key={item.label} style={{ padding: '18px', backgroundColor: '#fff', borderRadius: '20px' }}>
                          <p style={{ margin: 0, color: '#64748B', fontSize: '12px' }}>{item.label}</p>
                          <p style={{ margin: '8px 0 0', color: '#0F172A', fontWeight: 700 }}>{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '24px', display: 'grid', gap: '16px' }}>
                      <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '20px' }}>
                        <h4 style={{ margin: '0 0 10px', fontSize: '18px', color: '#0F172A' }}>Assessment Plan</h4>
                        <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>{selectedKitab.tests} and assignments include {selectedKitab.assignments}.</p>
                      </div>
                      <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '20px' }}>
                        <h4 style={{ margin: '0 0 10px', fontSize: '18px', color: '#0F172A' }}>Related Works</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', lineHeight: 1.8 }}>
                          {selectedKitab.relatedWorks.map((work) => (
                            <li key={work}>{work}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {announcement.type === 'eid' && announcement.eidInfo && (
              <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
                {[
                  { label: 'Meeting', value: `${announcement.eidInfo.meetWho} — ${announcement.eidInfo.meetWhen}` },
                  { label: 'Meeting point', value: announcement.eidInfo.meetWhere },
                  { label: 'Salah starts', value: announcement.eidInfo.salahStarts },
                  { label: 'Eid prayer location', value: announcement.eidInfo.prayerWhere },
                ].map((item) => (
                  <div key={item.label} style={{ backgroundColor: '#F8FAFC', borderRadius: '20px', padding: '22px', border: '1px solid #E2E8F0' }}>
                    <p style={{ margin: 0, color: '#64748B', fontSize: '12px', fontWeight: 900, letterSpacing: '0.6px', textTransform: 'uppercase' }}>{item.label}</p>
                    <p style={{ margin: '10px 0 0', color: '#0F172A', fontWeight: 900, lineHeight: 1.6 }}>{item.value}</p>
                  </div>
                ))}
              </div>
            )}
            <p style={{ margin: 0, color: '#475569', lineHeight: 1.8 }}>
              {announcement.details}
            </p>
          </div>
        </div>

        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {renderSidebarContent()}

          <div style={{ borderRadius: '16px', padding: '26px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-soft)' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#0F172A' }}>Location</h3>
            <div style={{ marginTop: '18px', height: '200px', borderRadius: '20px', overflow: 'hidden', backgroundColor: '#E2E8F0', backgroundImage: 'url(https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <p style={{ margin: '18px 0 0', color: '#475569', lineHeight: 1.7 }}>{announcement.location}</p>
          </div>

          <div style={{ borderRadius: '16px', padding: '26px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-soft)' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#0F172A' }}>Other Updates</h3>
            <div style={{ marginTop: '20px', display: 'grid', gap: '14px' }}>
              {announcement.otherUpdates.map((update) => (
                <div key={update.title || update.label} style={{ display: 'flex', gap: '14px', alignItems: 'center', backgroundColor: '#F8FAFC', padding: '14px 16px', borderRadius: '18px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#34D399' }} />
                  <div>
                    <p style={{ margin: '0 0 6px', fontWeight: 700, color: '#0F172A' }}>{update.title || update.label}</p>
                    <p style={{ margin: 0, color: '#64748B', fontSize: '13px' }}>{update.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementDetail;
