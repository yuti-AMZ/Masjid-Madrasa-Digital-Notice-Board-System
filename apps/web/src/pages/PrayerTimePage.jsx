import { useState } from "react";
import { MapPin } from "lucide-react";
import Sidebar from "../components/PrayerComponents/Sidebar";
import Header from "../components/PrayerComponents/Header";
import Upcoming from "../components/PrayerComponents/Upcoming";
import Schedule from "../components/PrayerComponents/Schedule";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import "../styles/PrayerTimePage.css";

const METHOD_OPTIONS = {
  isna: {
    method: 2,
    label: "Islamic Society of North America (ISNA)",
    description: "Prayer times are configured for Addis Ababa using the ISNA method.",
  },
  mwl: {
    method: 3,
    label: "Muslim World League",
    description: "Prayer times are configured for Addis Ababa using the Muslim World League method.",
  },
  umm_al_qura: {
    method: 4,
    label: "Umm al-Qura (Makkah)",
    description: "Prayer times are configured for Addis Ababa using the Umm al-Qura method.",
  },
};

export default function PrayerTimePage() {
  const [methodKey, setMethodKey] = useState("mwl");
  const activeMethod = METHOD_OPTIONS[methodKey];
  const { schedule, nextEvent, loading, error, headerDate, locationLabel, timeZone } = usePrayerTimes({
    method: activeMethod.method,
  });

  if (loading) {
    return (
      <div className="prayer-page">
        <div className="app">
          <Sidebar activeKey="prayer" />
          <main className="main">
            <div className="loading-screen">Loading prayer times for Addis Ababa...</div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prayer-page">
        <div className="app">
          <Sidebar activeKey="prayer" />
          <main className="main">
            <div className="error-message">{error}</div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="prayer-page">
      <div className="app">
        <Sidebar activeKey="prayer" />

        <main className="main">
          <Header locationLabel={locationLabel} headerDate={headerDate} />

          <div className="layout">
            <div className="layout__primary">
              <Upcoming nextEvent={nextEvent} loading={loading} timeZone={timeZone} />
              <Schedule schedule={schedule} nextEvent={nextEvent} timeZone={timeZone} />
            </div>

            <aside className="layout__side">
              <section className="card card--mint friday">
                <h3 className="card__title friday__title">Friday Prayer</h3>
                <p className="settings__mosque-area prayer-side-copy">
                  Join us for the weekly Jumu&apos;ah congregation at Noor Masjid.
                </p>
                <div className="friday__grid">
                  <div className="friday__slot">
                    <span className="friday__label">1st Khutbah</span>
                    <span className="friday__time">01:15 PM</span>
                  </div>
                  <div className="friday__slot">
                    <span className="friday__label">2nd Khutbah</span>
                    <span className="friday__time">02:00 PM</span>
                  </div>
                </div>
              </section>

              <section className="card settings">
                <h3 className="card__title">Prayer Settings</h3>

                <div className="settings__block">
                  <div className="settings__row-head">
                    <span className="settings__label">Mosque Location</span>
                    <a href="#" className="settings__link">
                      Change
                    </a>
                  </div>
                  <div className="settings__mosque-name">Noor Masjid Addis Ababa</div>
                  <div className="settings__mosque-area">Kilinto, Addis Ababa, Ethiopia</div>
                  <div className="settings__map">
                    <div className="settings__map-fallback">
                      <p className="settings__map-fallback-text">{activeMethod.description}</p>
                      <a
                        className="settings__map-link"
                        href="https://www.google.com/maps/search/?api=1&query=Kilinto%2C%20Addis%20Ababa%2C%20Ethiopia"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </div>

                <div className="settings__block">
                  <label className="settings__label" htmlFor="calc-method">
                    Calculation Method
                  </label>
                  <div className="select-wrap">
                    <select
                      id="calc-method"
                      className="select"
                      value={methodKey}
                      onChange={(event) => setMethodKey(event.target.value)}
                    >
                      {Object.entries(METHOD_OPTIONS).map(([value, option]) => (
                        <option key={value} value={value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="settings__block">
                  <span className="settings__label">
                    Manual Adjustments <span className="settings__hint">(Minutes (+))</span>
                  </span>
                  <div className="adjust-grid">
                    {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((label) => (
                      <div className="adjust-row" key={label}>
                        <span>{label}</span>
                        <span className="adjust-val">0</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button type="button" className="btn btn--save">
                  Save Configuration
                </button>
              </section>

              <div className="app-promo">
                <div className="app-promo__content">
                  <h4 className="app-promo__title">Noor Masjid App</h4>
                  <p className="app-promo__text">
                    Get prayer alerts directly on your phone and stay connected with the community.
                  </p>
                  <div className="app-promo__stores">
                    <a href="#" className="store-badge">
                      iOS
                    </a>
                    <a href="#" className="store-badge">
                      Android
                    </a>
                  </div>
                </div>
                <div className="app-promo__art" aria-hidden="true">
                  <MapPin size={64} strokeWidth={1.75} />
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
