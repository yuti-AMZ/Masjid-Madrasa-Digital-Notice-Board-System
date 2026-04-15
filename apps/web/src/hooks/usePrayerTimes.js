import { useEffect, useState } from "react";
import {
  ADDIS_ABABA_PRAYER_CONFIG,
  fetchPrayerData,
  formatApiDate,
  parseTime,
} from "../../../../services/prayerService.js";

const IQAMAH_OFFSETS = {
  Fajr: 30,
  Dhuhr: 15,
  Asr: 15,
  Maghrib: 7,
  Isha: 15,
};

const PRAYER_NAMES = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

function formatHeaderDate(date, timeZone) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function buildSchedule(timings, baseDate, utcOffsetMinutes, timeZone) {
  return PRAYER_NAMES.map((name) => {
    const adhan = parseTime(timings[name], baseDate, utcOffsetMinutes, timeZone);
    const hasIqamah = name !== "Sunrise";
    const offset = IQAMAH_OFFSETS[name] || 0;

    return {
      name,
      adhan,
      iqamah: hasIqamah ? new Date(adhan.getTime() + offset * 60000) : null,
      hasIqamah,
    };
  });
}

function getDateKey(timeZone) {
  return formatApiDate(new Date(), timeZone);
}

export function usePrayerTimes(config = {}) {
  const prayerConfig = { ...ADDIS_ABABA_PRAYER_CONFIG, ...config };
  const [schedule, setSchedule] = useState(null);
  const [tomorrowSchedule, setTomorrowSchedule] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [headerDate, setHeaderDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateKey, setDateKey] = useState(() => getDateKey(prayerConfig.timeZone));

  useEffect(() => {
    setDateKey(getDateKey(prayerConfig.timeZone));
  }, [prayerConfig.timeZone]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextDateKey = getDateKey(prayerConfig.timeZone);
      setDateKey((currentDateKey) => (currentDateKey === nextDateKey ? currentDateKey : nextDateKey));
    }, 30000);

    return () => clearInterval(interval);
  }, [prayerConfig.timeZone]);

  useEffect(() => {
    let cancelled = false;

    async function loadPrayerTimes() {
      try {
        setLoading(true);
        setError(null);

        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const [todayResult, tomorrowResult] = await Promise.all([
          fetchPrayerData({ ...prayerConfig, date: now }),
          fetchPrayerData({ ...prayerConfig, date: tomorrow }),
        ]);

        if (cancelled) {
          return;
        }

        setSchedule(
          buildSchedule(todayResult.timings, now, prayerConfig.utcOffsetMinutes, prayerConfig.timeZone)
        );
        setTomorrowSchedule(
          buildSchedule(tomorrowResult.timings, tomorrow, prayerConfig.utcOffsetMinutes, prayerConfig.timeZone)
        );
        setHeaderDate(formatHeaderDate(now, prayerConfig.timeZone));
      } catch (err) {
        console.error("Failed to fetch prayer times:", err);
        if (!cancelled) {
          setError("Failed to load prayer times. Please check your internet connection.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPrayerTimes();

    return () => {
      cancelled = true;
    };
  }, [
    dateKey,
    prayerConfig.city,
    prayerConfig.country,
    prayerConfig.latitude,
    prayerConfig.longitude,
    prayerConfig.method,
    prayerConfig.timeZone,
    prayerConfig.utcOffsetMinutes,
  ]);

  useEffect(() => {
    if (!schedule || !tomorrowSchedule) {
      return undefined;
    }

    const updateNextPrayer = () => {
      const now = new Date();
      let upcoming = schedule.find((prayer) => prayer.hasIqamah && prayer.iqamah > now);

      if (!upcoming) {
        upcoming = tomorrowSchedule.find((prayer) => prayer.name === "Fajr") || tomorrowSchedule[0] || null;
      }

      setNextEvent(upcoming);
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 1000);

    return () => clearInterval(interval);
  }, [schedule, tomorrowSchedule]);

  return {
    schedule,
    nextEvent,
    headerDate,
    loading,
    error,
    locationLabel: `${prayerConfig.city}, ${prayerConfig.country}`,
    timeZone: prayerConfig.timeZone,
  };
}
