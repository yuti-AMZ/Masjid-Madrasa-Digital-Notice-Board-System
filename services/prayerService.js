const ALADHAN_BASE = "https://api.aladhan.com/v1";

export const ADDIS_ABABA_PRAYER_CONFIG = {
  city: "Addis Ababa",
  country: "Ethiopia",
  latitude: 9.03,
  longitude: 38.74,
  method: 3,
  timeZone: "Africa/Addis_Ababa",
  utcOffsetMinutes: 180,
};

function getDatePartsInTimeZone(date = new Date(), timeZone = ADDIS_ABABA_PRAYER_CONFIG.timeZone) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const valueOf = (type) => parts.find((part) => part.type === type)?.value;

  return {
    day: Number(valueOf("day")),
    month: Number(valueOf("month")),
    year: Number(valueOf("year")),
  };
}

export function formatApiDate(date = new Date(), timeZone = ADDIS_ABABA_PRAYER_CONFIG.timeZone) {
  const { day, month, year } = getDatePartsInTimeZone(date, timeZone);
  return `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}`;
}

export const fetchPrayerData = async (configOrLat = ADDIS_ABABA_PRAYER_CONFIG, legacyLng, legacyMethod) => {
  const config =
    typeof configOrLat === "object"
      ? { ...ADDIS_ABABA_PRAYER_CONFIG, ...configOrLat }
      : {
          ...ADDIS_ABABA_PRAYER_CONFIG,
          latitude: configOrLat,
          longitude: legacyLng,
          method: legacyMethod ?? ADDIS_ABABA_PRAYER_CONFIG.method,
        };

  const {
    city,
    country,
    latitude,
    longitude,
    method,
    date = new Date(),
    timeZone,
  } = config;

  const dateStr = formatApiDate(date, timeZone);
  const hasCity = Boolean(city && country);
  const url = hasCity
    ? `${ALADHAN_BASE}/timingsByCity/${dateStr}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(
        country
      )}&method=${method}`
    : `${ALADHAN_BASE}/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=${method}`;

  const res = await fetch(url);
  const json = await res.json();

  if (json.code !== 200) {
    throw new Error("Failed to fetch prayer times");
  }

  return json.data;
};

export const fetchQibla = async (lat, lng) => {
  const res = await fetch(`${ALADHAN_BASE}/qibla/${lat}/${lng}`);
  const json = await res.json();
  return json.data?.direction || null;
};

export const parseTime = (
  timeStr,
  baseDate = new Date(),
  utcOffsetMinutes = ADDIS_ABABA_PRAYER_CONFIG.utcOffsetMinutes,
  timeZone = ADDIS_ABABA_PRAYER_CONFIG.timeZone
) => {
  const clean = String(timeStr).replace(/\s*\([^)]*\)/, "").trim();
  const [hours, minutes] = clean.split(":").map(Number);
  const { day, month, year } = getDatePartsInTimeZone(baseDate, timeZone);

  return new Date(Date.UTC(year, month - 1, day, hours, minutes, 0, 0) - utcOffsetMinutes * 60000);
};
