import React from 'react';
import { Link } from 'react-router-dom';
import CalendarBento from '../components/CalendarBento';

function CalendarPage() {
  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: 0, color: 'var(--color-primary)', fontSize: '14px', fontWeight: 700, letterSpacing: '1px' }}>
            Nejashi Mesjid Koye Feche • Addis Ababa
          </p>
          <h1 style={{ margin: '10px 0 0', fontSize: '34px' }}>Calendar</h1>
          <p style={{ margin: '10px 0 0', color: 'var(--color-muted)', lineHeight: 1.8 }}>
            View Hijri-based reminders and click any day to see details.
          </p>
        </div>
        <Link to="/announcements" style={{ textDecoration: 'none' }}>
          <button className="btn" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', padding: '12px 16px', cursor: 'pointer' }}>
            ← Back to Announcements
          </button>
        </Link>
      </div>

      <CalendarBento defaultCollapsed={false} />
    </div>
  );
}

export default CalendarPage;
