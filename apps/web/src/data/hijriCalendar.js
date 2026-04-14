function pad2(n) {
  return String(n).padStart(2, '0');
}

function isoDate(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getHijriParts(date) {
  // Use Umm al-Qura (commonly used in many systems) and keep month numeric for robust logic.
  const numericFmt = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  const labelFmt = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const parts = numericFmt.formatToParts(date);
  const day = Number(parts.find((p) => p.type === 'day')?.value);
  const year = Number(parts.find((p) => p.type === 'year')?.value);
  const month = Number(parts.find((p) => p.type === 'month')?.value);
  return { hDay: day, hYear: year, hMonth: month, label: labelFmt.format(date) };
}

function weekdayIndexSaturdayFirst(date) {
  // JS: Sun=0..Sat=6  -> Saturday-first: Sat=0, Sun=1, ...
  return (date.getDay() - 6 + 7) % 7;
}

function eventForHijriDay({ hDay, hMonth }) {
  // Minimal dynamic reminders based on Hijri date:
  // - Ayyām al-Bīḍ: 13/14/15 any month
  // - Eid al-Fitr: 1 Shawwal
  // - Day of Arafah: 9 Dhul Hijjah
  // - Eid al-Adha: 10 Dhul Hijjah
  if (hDay === 13 || hDay === 14 || hDay === 15) {
    return {
      kind: 'ayyam_al_bid',
      title: 'Ayyām al-Bīḍ',
      message: 'Sunnah fasting days: 13th, 14th, 15th of every Hijri month.',
    };
  }

  // Hijri month numbers: 10 = Shawwal, 12 = Dhul Hijjah
  if (hDay === 1 && hMonth === 10) {
    return { kind: 'eid', title: 'Eid al-Fitr', message: 'Eid Mubarak! Check prayer time and meeting point.' };
  }

  if (hMonth === 12 && hDay === 9) {
    return { kind: 'arafah', title: 'Day of Arafah', message: 'Don’t miss fasting on the Day of Arafah (for those not performing Hajj).' };
  }

  if (hMonth === 12 && hDay === 10) {
    return { kind: 'eid', title: 'Eid al-Adha', message: 'Eid Mubarak! Check prayer time and meeting point.' };
  }

  return null;
}

export function getHijriMonthGrid(cursorDate) {
  const cursorHijri = getHijriParts(cursorDate);

  // Find start of current Hijri month (hDay = 1) by walking backwards.
  let start = new Date(cursorDate);
  for (let i = 0; i < 35; i++) {
    const h = getHijriParts(start);
    if (h.hDay === 1) break;
    start = addDays(start, -1);
  }

  // Collect all Gregorian dates belonging to this Hijri month.
  const monthDates = [];
  let d = new Date(start);
  for (let i = 0; i < 33; i++) {
    const h = getHijriParts(d);
    if (i > 0 && h.hDay === 1) break; // next month reached
    monthDates.push({ date: new Date(d), hijri: h });
    d = addDays(d, 1);
  }

  const firstDow = weekdayIndexSaturdayFirst(monthDates[0].date);
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);

  const eventsByIso = new Map();
  for (const md of monthDates) {
    const iso = isoDate(md.date);
    const e = eventForHijriDay({ hDay: md.hijri.hDay, hMonth: md.hijri.hMonth });
    if (e) eventsByIso.set(iso, [{ id: `${e.kind}-${iso}`, dateIso: iso, ...e, hijriLabel: md.hijri.label }]);

    cells.push({
      iso,
      gDay: md.date.getDate(),
      hDay: md.hijri.hDay,
      hijriLabel: md.hijri.label,
      markKind: e?.kind || null,
    });
  }

  while (cells.length % 7 !== 0) cells.push(null);

  return {
    todayIso: isoDate(new Date()),
    hijriMonthLabel: `${cursorHijri.label.split(',')[0]}, ${cursorHijri.hYear} AH`,
    cells,
    eventsByIso,
  };
}

export function getUpcomingEventsHijri({ fromDate = new Date(), daysAhead = 90, limit = 5 } = {}) {
  const events = [];
  for (let i = 0; i <= daysAhead; i++) {
    const d = addDays(fromDate, i);
    const h = getHijriParts(d);
    const e = eventForHijriDay({ hDay: h.hDay, hMonth: h.hMonth });
    if (e) {
      events.push({
        id: `${e.kind}-${isoDate(d)}`,
        iso: isoDate(d),
        hijriLabel: h.label,
        ...e,
      });
    }
  }

  // De-duplicate (Ayyam al-Bid produces 3 days; we keep all but unique iso).
  const seen = new Set();
  const unique = [];
  for (const e of events) {
    if (seen.has(e.id)) continue;
    seen.add(e.id);
    unique.push(e);
  }
  return unique.slice(0, limit);
}

export function getNextUpcomingEventHijri({ fromDate = new Date(), daysAhead = 180 } = {}) {
  for (let i = 0; i <= daysAhead; i++) {
    const d = addDays(fromDate, i);
    const h = getHijriParts(d);
    const e = eventForHijriDay({ hDay: h.hDay, hMonth: h.hMonth });
    if (e) {
      return {
        ...e,
        iso: isoDate(d),
        hijriLabel: h.label,
        daysUntil: i,
      };
    }
  }
  return null;
}

