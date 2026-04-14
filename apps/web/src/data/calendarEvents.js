function toISODate(d) {
  // YYYY-MM-DD in local time
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export const calendarEvents = [
  // NOTE:
  // Eid/Ramadan dates change year-to-year. Set these to the correct dates for your local announcements.
  // This file is the single source of truth for reminders + the calendar UI.
  {
    id: 'eid-al-fitr',
    kind: 'eid',
    title: 'Eid al-Fitr',
    date: '2026-04-16',
    message: 'Eid Mubarak! Check prayer time + meeting point.',
    linkAnnouncementId: 'special-eid-al-fitr',
  },
  {
    id: 'eid-al-adha',
    kind: 'eid',
    title: 'Eid al-Adha',
    date: '2026-06-26',
    message: 'Eid Mubarak! Check prayer time + meeting point.',
    linkAnnouncementId: 'special-eid-al-fitr',
  },
  {
    id: 'ramadan',
    kind: 'season',
    title: 'Ramadan',
    date: '2026-02-18',
    message: 'Tarawih and iftar updates will be posted here.',
  },
  {
    id: 'shawwal-fasts',
    kind: 'fasting',
    title: '6 days of Shawwal',
    // A window rather than a single day; the UI treats this as a reminder range.
    startDate: '2026-04-17',
    endDate: '2026-05-16',
    message: 'You can complete the 6 days any time during Shawwal.',
  },
];

export function normalizeEventsForMonth(year, monthIndexZeroBased) {
  // Returns events that occur in a given (year, month).
  return calendarEvents
    .flatMap((e) => {
      if (e.date) return [e];
      if (e.startDate && e.endDate) {
        return [
          { ...e, id: `${e.id}__start`, date: e.startDate, isRangeEndpoint: true, rangeRole: 'start' },
          { ...e, id: `${e.id}__end`, date: e.endDate, isRangeEndpoint: true, rangeRole: 'end' },
        ];
      }
      return [];
    })
    .filter((e) => {
      const d = new Date(`${e.date}T00:00:00`);
      return d.getFullYear() === year && d.getMonth() === monthIndexZeroBased;
    });
}

export function getUpcomingEvents({ fromDate = new Date(), daysAhead = 30, limit = 4 } = {}) {
  const start = new Date(fromDate);
  const end = addDays(start, daysAhead);

  const flattened = calendarEvents.flatMap((e) => {
    if (e.date) return [e];
    if (e.startDate && e.endDate) {
      return [
        { ...e, id: `${e.id}__start`, date: e.startDate, isRangeEndpoint: true, rangeRole: 'start' },
        { ...e, id: `${e.id}__end`, date: e.endDate, isRangeEndpoint: true, rangeRole: 'end' },
      ];
    }
    return [];
  });

  return flattened
    .map((e) => ({ ...e, _d: new Date(`${e.date}T00:00:00`) }))
    .filter((e) => e._d >= new Date(toISODate(start)) && e._d <= new Date(toISODate(end)))
    .sort((a, b) => a._d - b._d)
    .slice(0, limit)
    .map(({ _d, ...rest }) => rest);
}

