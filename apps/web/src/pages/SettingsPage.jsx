import { useEffect, useState } from "react";
import {
  Bell,
  ChevronRight,
  FileText,
  Lock,
  LogOut,
  Search,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import Sidebar from "../components/PrayerComponents/Sidebar";
import "../styles/PrayerTimePage.css";
import "../styles/SettingsPage.css";

const THEME_STORAGE_KEY = "noor-masjid-theme";

function applyTheme(mode) {
  document.documentElement.classList.toggle("noor-theme-dark", mode === "dark");
}

function SettingToggleRow({ title, description, checked, onChange }) {
  return (
    <label className="settings-screen__panel settings-screen__panel--toggle">
      <span className="settings-screen__panel-copy">
        <span className="settings-screen__panel-title">{title}</span>
        <span className="settings-screen__panel-description">{description}</span>
      </span>
      <span className="toggle settings-screen__toggle">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="toggle__ui"></span>
      </span>
    </label>
  );
}

function SettingActionRow({ icon, title, description }) {
  return (
    <button type="button" className="settings-screen__panel settings-screen__panel--action">
      <span className="settings-screen__action-left">
        <span className="settings-screen__action-icon" aria-hidden="true">
          {icon}
        </span>
        <span className="settings-screen__panel-copy">
          <span className="settings-screen__panel-title">{title}</span>
          <span className="settings-screen__panel-description">{description}</span>
        </span>
      </span>
      <ChevronRight size={20} strokeWidth={2} className="settings-screen__chevron" aria-hidden="true" />
    </button>
  );
}

export default function SettingsPage() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === "dark";
    } catch {
      return false;
    }
  });
  const [prayerReminders, setPrayerReminders] = useState(true);

  useEffect(() => {
    const nextMode = darkMode ? "dark" : "light";
    applyTheme(nextMode);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextMode);
    } catch {
      // Ignore storage access errors and keep the in-memory theme state.
    }
  }, [darkMode]);

  return (
    <div className="prayer-page settings-page">
      <div className="app">
        <Sidebar activeKey="settings" />

        <main className="main settings-screen">
          <header className="settings-screen__topbar">
            <div className="settings-screen__search">
              <Search size={18} strokeWidth={2} aria-hidden="true" />
              <input type="text" placeholder="Search settings" aria-label="Search settings" />
            </div>
            <button type="button" className="settings-screen__icon-button" aria-label="Notifications">
              <Bell size={18} strokeWidth={2} />
            </button>
            <button type="button" className="settings-screen__avatar" aria-label="Profile">
              <span>NM</span>
            </button>
          </header>

          <section className="settings-screen__hero">
            <h1 className="settings-screen__title">Settings</h1>
            <p className="settings-screen__subtitle">
              Manage your account preferences and application notifications.
            </p>
          </section>

          <section className="settings-screen__section">
            <div className="settings-screen__section-head">
              <SlidersHorizontal size={20} strokeWidth={2} aria-hidden="true" />
              <h2>Preferences</h2>
            </div>

            <div className="settings-screen__stack">
              <SettingToggleRow
                title="Push Notifications"
                description="Receive real-time alerts for news and mosque updates."
                checked={pushNotifications}
                onChange={() => setPushNotifications((value) => !value)}
              />
              <SettingToggleRow
                title="Dark Mode"
                description="Switch between light and dark visual themes."
                checked={darkMode}
                onChange={() => setDarkMode((value) => !value)}
              />
              <SettingToggleRow
                title="Prayer Reminders"
                description="Get notified 15 minutes before each prayer time."
                checked={prayerReminders}
                onChange={() => setPrayerReminders((value) => !value)}
              />
            </div>
          </section>

          <section className="settings-screen__section">
            <div className="settings-screen__section-head">
              <Shield size={20} strokeWidth={2} aria-hidden="true" />
              <h2>Account &amp; Security</h2>
            </div>

            <div className="settings-screen__stack">
              <SettingActionRow
                icon={<Lock size={18} strokeWidth={2} />}
                title="Change Password"
                description="Update your account credentials."
              />
              <SettingActionRow
                icon={<FileText size={18} strokeWidth={2} />}
                title="Privacy Policy"
                description="Review how we handle your data."
              />
            </div>
          </section>

          <section className="settings-screen__footer-panel">
            <button type="button" className="settings-screen__signout">
              <LogOut size={18} strokeWidth={2} />
              Sign Out
            </button>
          </section>

          <footer className="settings-screen__footer">
            <p>© 2024 Noor Masjid. All rights reserved.</p>
            <div className="settings-screen__footer-links">
              <a href="#">Terms of Service</a>
              <a href="#">Contact Support</a>
              <a href="#">About Us</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
