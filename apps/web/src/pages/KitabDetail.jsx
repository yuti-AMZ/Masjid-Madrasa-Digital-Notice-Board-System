import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { announcementsById } from '../data/announcementsData';

function KitabDetail() {
  const { announcementId, kitabIndex } = useParams();

  const { announcement, kitab, index } = useMemo(() => {
    const a = announcementsById[announcementId] || null;
    const i = Number.parseInt(String(kitabIndex ?? ''), 10);
    const k = a?.kitaabs?.[i] || null;
    return { announcement: a, kitab: k, index: i };
  }, [announcementId, kitabIndex]);

  if (!announcement || announcement.type !== 'madrasa' || !kitab || !Number.isFinite(index)) {
    return (
      <div style={{ width: '100%', maxWidth: '980px', margin: '0 auto', padding: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', color: '#0F172A' }}>Kitāb not found</h1>
        <p style={{ margin: '10px 0 0', color: '#64748B', lineHeight: 1.8 }}>
          Please go back to the program page and choose a Kitāb again.
        </p>
        <div style={{ marginTop: '18px' }}>
          <Link to={`/announcement/${announcementId || 'winter-quran-registration'}`} style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: '#0F172A', color: '#fff', border: 'none', borderRadius: '14px', padding: '12px 18px', cursor: 'pointer', fontWeight: 800 }}>
              ← Back to program
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '24px', color: '#0F172A' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '22px' }}>
        <div>
          <p style={{ margin: 0, color: '#3B82F6', fontSize: '13px', fontWeight: 900, letterSpacing: '1px' }}>
            Kitāb Track • Nejashi Mesjid Koye Feche
          </p>
          <h1 style={{ margin: '10px 0 0', fontSize: '34px' }}>{kitab.name}</h1>
          <p style={{ margin: '10px 0 0', color: '#64748B', lineHeight: 1.8, maxWidth: '820px' }}>{kitab.description}</p>
        </div>
        <Link to={`/announcement/${announcement.id}`} style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#fff', color: '#334155', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '12px 18px', cursor: 'pointer', fontWeight: 800 }}>
            ← Back to Program
          </button>
        </Link>
      </div>

      <div style={{ borderRadius: '28px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 18px 45px rgba(15, 23, 42, 0.08)', border: '1px solid #E2E8F0' }}>
        <div style={{ position: 'relative', width: '100%', height: '360px', overflow: 'hidden' }}>
          <img src={kitab.image} alt={kitab.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: 'rgba(15, 23, 42, 0.88)', color: '#fff', padding: '10px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 900 }}>
            {kitab.classTime}
          </span>
        </div>

        <div style={{ padding: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {[
              { label: 'Teacher', value: kitab.teacher },
              { label: 'Author', value: kitab.author },
              { label: 'Written', value: kitab.yearWritten },
              { label: 'Current Page', value: kitab.currentPage },
              { label: 'Start Date', value: kitab.startDate },
              { label: 'End Date', value: kitab.endDate },
            ].map((item) => (
              <div key={item.label} style={{ backgroundColor: '#F8FAFC', borderRadius: '20px', padding: '18px', border: '1px solid #E2E8F0' }}>
                <p style={{ margin: 0, color: '#64748B', fontSize: '12px', fontWeight: 900, letterSpacing: '0.6px', textTransform: 'uppercase' }}>{item.label}</p>
                <p style={{ margin: '10px 0 0', color: '#0F172A', fontWeight: 900, lineHeight: 1.6 }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '18px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Assessment plan</h3>
              <p style={{ margin: '10px 0 0', color: '#475569', lineHeight: 1.8 }}>{kitab.tests} and assignments include {kitab.assignments}.</p>
            </div>
            <div style={{ backgroundColor: '#fff', borderRadius: '20px', padding: '18px', border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Related works</h3>
              <ul style={{ margin: '10px 0 0', paddingLeft: '18px', color: '#475569', lineHeight: 1.8 }}>
                {kitab.relatedWorks.map((work) => (
                  <li key={work}>{work}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginTop: '18px', borderRadius: '20px', padding: '18px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
            <p style={{ margin: 0, color: '#1D4ED8', fontWeight: 900 }}>Location</p>
            <p style={{ margin: '8px 0 0', color: '#0F172A', fontWeight: 800 }}>{announcement.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KitabDetail;

