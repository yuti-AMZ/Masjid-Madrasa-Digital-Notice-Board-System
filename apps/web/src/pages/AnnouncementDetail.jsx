import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { announcementsById } from '../data/announcementsData';
import { downloadICS } from '../utils/ics';
 

function AnnouncementDetail() {
  
  const { announcementId } = useParams();
  const navigate = useNavigate();
  const announcement = announcementsById[announcementId] || announcementsById['special-eid-al-fitr'];
  const [selectedKitabIndex, setSelectedKitabIndex] = useState(0);

  useEffect(() => {
    setSelectedKitabIndex(0);
  }, [announcementId]);

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

      default:
        return null;
    }
  };

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
