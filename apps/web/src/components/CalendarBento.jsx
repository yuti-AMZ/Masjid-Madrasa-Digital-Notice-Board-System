import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUpcomingEventsHijri, getHijriMonthGrid } from '../data/hijriCalendar';

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function daysInMonth(date) {
  return endOfMonth(date).getDate();
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function isoForDay(year, monthIndex, day) {
  return `${year}-${pad2(monthIndex + 1)}-${pad2(day)}`;
}

// Saturday-first layout (common in the region).
const WEEKDAYS = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const WEEK_START_DOW = 6; // 6 = Saturday

function shiftToWeekStart(dow) {
  // Convert JS dow (Sun=0..Sat=6) into index relative to weekStart.
  return (dow - WEEK_START_DOW + 7) % 7;
}

export default function CalendarBento({ defaultCollapsed = true } = {}) {
  const [cursorDate, setCursorDate] = useState(() => new Date());
  const monthGrid = useMemo(() => getHijriMonthGrid(cursorDate), [cursorDate]);
  const eventsByIso = useMemo(() => monthGrid.eventsByIso, [monthGrid]);

  const [selectedDate, setSelectedDate] = useState(() => monthGrid.todayIso);
  const selectedEvents = eventsByIso.get(selectedDate) || [];
  const upcoming = useMemo(() => getUpcomingEventsHijri({ fromDate: new Date(), daysAhead: 90, limit: 5 }), []);
  const [collapsed, setCollapsed] = useState(Boolean(defaultCollapsed));

  return (
    <div className="card" style={{ padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <p style={{ margin: 0, color: 'var(--color-muted)', fontWeight: 500, fontSize: '12px', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
            Calendar & reminders
          </p>
          <h2 style={{ margin: '6px 0 0', fontSize: '18px' }}>
            {monthGrid.hijriMonthLabel}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            className="btn"
            onClick={() => setCollapsed((v) => !v)}
            style={{
              border: '1px solid var(--color-border)',
              background: collapsed ? 'rgba(20, 195, 142, 0.12)' : 'var(--color-surface)',
              color: 'var(--color-text)',
              padding: '10px 12px',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            {collapsed ? 'Show calendar' : 'Hide calendar'}
          </button>
          <button
            className="btn"
            onClick={() => setCursorDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 29))}
            style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', padding: '10px 12px', cursor: 'pointer' }}
          >
            ‹
          </button>
          <button
            className="btn"
            onClick={() => setCursorDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 29))}
            style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-text)', padding: '10px 12px', cursor: 'pointer' }}
          >
            ›
          </button>
        </div>
      </div>

      {!collapsed && (
        <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: '8px' }}>
          {WEEKDAYS.map((key) => (
            <div key={key} style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-muted)', fontWeight: 500, padding: '6px 0' }}>
              {key}
            </div>
          ))}
          {monthGrid.cells.map((cell, idx) => {
            if (!cell) return <div key={idx} />;
            const iso = cell.iso;
            const hasEvents = (eventsByIso.get(iso) || []).length > 0;
            const isSelected = iso === selectedDate;
            const isToday = iso === monthGrid.todayIso;
            const isAyyamAlBid = cell.markKind === 'ayyam_al_bid';
            const isEid = cell.markKind === 'eid';
            const isArafah = cell.markKind === 'arafah';

            return (
              <button
                key={iso}
                className="btn"
                onClick={() => setSelectedDate(iso)}
                style={{
                  border: `1px solid ${
                    isSelected || isToday
                      ? 'var(--color-primary)'
                      : isEid
                        ? 'rgba(255, 215, 0, 0.70)'
                        : isArafah
                          ? 'rgba(255, 215, 0, 0.60)'
                        : isAyyamAlBid
                          ? 'rgba(255, 215, 0, 0.45)'
                          : 'var(--color-border)'
                  }`,
                  background: isSelected
                    ? 'rgba(20, 195, 142, 0.12)'
                    : isToday
                      ? 'rgba(20, 195, 142, 0.06)'
                      : isEid
                        ? 'rgba(255, 215, 0, 0.16)'
                        : isArafah
                          ? 'rgba(255, 215, 0, 0.12)'
                        : isAyyamAlBid
                          ? 'rgba(255, 215, 0, 0.08)'
                      : 'var(--color-surface)',
                  color: 'var(--color-text)',
                  padding: '10px 0',
                  cursor: 'pointer',
                  position: 'relative',
                  fontWeight: 500,
                  boxShadow: isToday && !isSelected ? '0 0 0 2px rgba(20, 195, 142, 0.22) inset' : undefined,
                }}
                aria-label={`Select ${iso}`}
              >
                <div style={{ display: 'grid', gap: '2px' }}>
                  <span style={{ fontWeight: 700 }}>{String(cell.hDay)}</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>{cell.gDay}</span>
                </div>
                {hasEvents && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '6px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '6px',
                      height: '6px',
                      borderRadius: '999px',
                      background: 'var(--color-accent)',
                    }}
                  />
                )}
                {isEid && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      fontSize: '10px',
                      fontWeight: 800,
                      color: '#7A5E00',
                      background: 'rgba(255, 215, 0, 0.45)',
                      border: '1px solid rgba(255, 215, 0, 0.70)',
                      borderRadius: '999px',
                      padding: '2px 6px',
                      lineHeight: 1.2,
                    }}
                    aria-hidden="true"
                  >
                    Eid
                  </span>
                )}
                {isArafah && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      fontSize: '10px',
                      fontWeight: 800,
                      color: '#7A5E00',
                      background: 'rgba(255, 215, 0, 0.36)',
                      border: '1px solid rgba(255, 215, 0, 0.65)',
                      borderRadius: '999px',
                      padding: '2px 6px',
                      lineHeight: 1.2,
                    }}
                    aria-hidden="true"
                  >
                    Arafah
                  </span>
                )}
                {isAyyamAlBid && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      left: '6px',
                      fontSize: '10px',
                      fontWeight: 800,
                      color: '#7A5E00',
                      background: 'rgba(255, 215, 0, 0.28)',
                      border: '1px solid rgba(255, 215, 0, 0.55)',
                      borderRadius: '999px',
                      padding: '2px 6px',
                      lineHeight: 1.2,
                    }}
                    aria-hidden="true"
                  >
                    Ayyām al-Bīḍ
                  </span>
                )}
                {isToday && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '6px',
                      right: '6px',
                      width: '6px',
                      height: '6px',
                      borderRadius: '999px',
                      background: 'var(--color-primary)',
                    }}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
        {!collapsed && (
          <div style={{ borderRadius: '16px', border: '1px solid var(--color-border)', padding: '14px', background: 'var(--color-surface)' }}>
            <p style={{ margin: 0, fontWeight: 700 }}>Selected day: {selectedDate}</p>
            {selectedEvents.length === 0 ? (
              <p style={{ margin: '8px 0 0', color: 'var(--color-muted)', lineHeight: 1.7 }}>No reminders for this day.</p>
            ) : (
              <div style={{ marginTop: '10px', display: 'grid', gap: '10px' }}>
                {selectedEvents.map((e) => (
                  <div key={e.id} style={{ borderRadius: '16px', padding: '12px', background: 'rgba(255, 215, 0, 0.10)', border: '1px solid rgba(255, 215, 0, 0.30)' }}>
                    <p style={{ margin: 0, fontWeight: 700 }}>{e.title}</p>
                    <p style={{ margin: '6px 0 0', color: 'var(--color-muted)', lineHeight: 1.7 }}>{e.message}</p>
                    {e.linkAnnouncementId && (
                      <div style={{ marginTop: '10px' }}>
                        <Link to={`/announcement/${e.linkAnnouncementId}`} style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>
                          Open announcement →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ borderRadius: '16px', border: '1px solid var(--color-border)', padding: '14px', background: 'var(--color-surface)' }}>
          <p style={{ margin: 0, fontWeight: 700 }}>Upcoming reminders</p>
          <p style={{ margin: '6px 0 0', color: 'var(--color-muted)', fontSize: '13px', lineHeight: 1.7 }}>
            Shows upcoming Hijri-based reminders only.
          </p>
          <div style={{ marginTop: '10px', display: 'grid', gap: '10px' }}>
            {upcoming.length === 0 ? (
              <p style={{ margin: 0, color: 'var(--color-muted)', lineHeight: 1.7 }}>No upcoming reminders.</p>
            ) : (
              upcoming.map((e) => (
                <div key={e.id} style={{ borderRadius: '16px', padding: '12px', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <p style={{ margin: 0, fontWeight: 700 }}>{e.title}</p>
                    <span style={{ fontSize: '12px', color: 'var(--color-muted)', fontWeight: 500 }}>{e.hijriLabel}</span>
                  </div>
                  <p style={{ margin: '6px 0 0', color: 'var(--color-muted)', lineHeight: 1.7 }}>{e.message}</p>
                  {e.linkAnnouncementId && (
                    <div style={{ marginTop: '10px' }}>
                      <Link to={`/announcement/${e.linkAnnouncementId}`} style={{ color: 'var(--color-primary)', fontWeight: 700, textDecoration: 'none' }}>
                        Open announcement →
                      </Link>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

