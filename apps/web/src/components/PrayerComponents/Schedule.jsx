const ICON_CLASS_BY_PRAYER = {
  Fajr: "prayer-cell__icon prayer-cell__icon--sun",
  Sunrise: "prayer-cell__icon prayer-cell__icon--sunrise",
  Dhuhr: "prayer-cell__icon prayer-cell__icon--noon",
  Asr: "prayer-cell__icon prayer-cell__icon--afternoon",
  Maghrib: "prayer-cell__icon prayer-cell__icon--sunset",
  Isha: "prayer-cell__icon prayer-cell__icon--night",
};

function formatTime(date, timeZone) {
  return date?.toLocaleTimeString([], {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }) ?? "—";
}

export default function Schedule({ schedule, nextEvent, timeZone }) {
  if (!schedule || schedule.length === 0) {
    return <section className="schedule">Loading prayer schedule...</section>;
  }

  return (
    <section className="schedule">
      <div className="schedule__head">
        <h2 className="schedule__title">Daily Schedule</h2>
        <div className="schedule__legend">
          <span className="schedule__dot" aria-hidden="true"></span>
          Current Prayer
        </div>
      </div>

      <div className="schedule__table-wrap">
        <table className="schedule__table">
          <thead>
            <tr>
              <th scope="col">PRAYER</th>
              <th scope="col">
                BEGINS <span className="th-sub">(ADHAN)</span>
              </th>
              <th scope="col">IQAMAH</th>
              <th scope="col">NOTIFICATION</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((prayer) => {
              const rowClassName = [
                nextEvent?.name === prayer.name ? "schedule__row--current" : "",
                prayer.name === "Sunrise" ? "schedule__row--muted" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <tr key={prayer.name} className={rowClassName}>
                  <td>
                    <span className="prayer-cell">
                      <span className={ICON_CLASS_BY_PRAYER[prayer.name]} aria-hidden="true"></span>
                      <span>{prayer.name}</span>
                    </span>
                  </td>
                  <td>{formatTime(prayer.adhan, timeZone)}</td>
                  <td>
                    {prayer.hasIqamah ? (
                      <strong className="iqamah-strong">{formatTime(prayer.iqamah, timeZone)}</strong>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <label className="toggle" aria-label={`Notifications for ${prayer.name}`}>
                      <input type="checkbox" defaultChecked={prayer.name !== "Sunrise"} />
                      <span className="toggle__ui"></span>
                    </label>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
