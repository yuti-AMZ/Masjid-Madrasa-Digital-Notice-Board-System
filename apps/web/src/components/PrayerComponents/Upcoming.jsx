import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

function formatTime(date, timeZone) {
  return date?.toLocaleTimeString([], {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }) ?? "—";
}

export default function Upcoming({ nextEvent, loading, timeZone }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !nextEvent) {
    return <section className="upcoming">Loading...</section>;
  }

  const iqamahTime = nextEvent.iqamah?.getTime?.() ?? 0;
  const msLeft = Math.max(0, iqamahTime - now);
  const hours = String(Math.floor(msLeft / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((msLeft % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((msLeft % 60000) / 1000)).padStart(2, "0");

  return (
    <section className="upcoming">
      <div className="upcoming__main">
        <span className="upcoming__badge">UPCOMING</span>
        <h2 className="upcoming__prayer">{nextEvent.name} Prayer</h2>
        <p className="upcoming__hint">Next congregation (Iqamah) in:</p>
        <div className="upcoming__countdown" role="timer" aria-live="polite">
          <span className="upcoming__clock-group">{hours}</span>
          <span className="upcoming__clock-colon" aria-hidden="true">
            :
          </span>
          <span className="upcoming__clock-group">{minutes}</span>
          <span className="upcoming__clock-colon" aria-hidden="true">
            :
          </span>
          <span className="upcoming__clock-group">{seconds}</span>
        </div>
        <div className="upcoming__times">
          <div className="upcoming__time-box">
            <span className="upcoming__time-label">BEGINS</span>
            <span className="upcoming__time-val">{formatTime(nextEvent.adhan, timeZone)}</span>
          </div>
          <div className="upcoming__time-box">
            <span className="upcoming__time-label">IQAMAH</span>
            <span className="upcoming__time-val">{formatTime(nextEvent.iqamah, timeZone)}</span>
          </div>
        </div>
      </div>

      <div className="upcoming__notify">
        <div className="upcoming__notify-icon" aria-hidden="true">
          <Bell size={28} strokeWidth={2} />
        </div>
        <p className="upcoming__notify-text">Notifications are ON for this prayer time.</p>
        <button type="button" className="btn btn--notify">
          Manage Alerts
        </button>
      </div>
    </section>
  );
}
