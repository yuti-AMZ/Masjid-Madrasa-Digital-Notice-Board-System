import { Link } from "react-router-dom";
import {
  Bell,
  BookOpen,
  Clock3,
  Compass,
  Home,
  Settings,
  User,
} from "lucide-react";

function BrandMark() {
  return (
    <svg className="sidebar__logo-svg" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="#064E3B" />
      <g fill="#FFFFFF">
        <circle cx="10" cy="17.5" r="2.1" />
        <rect x="8.5" y="19.2" width="3" height="11.8" rx="0.4" />
        <circle cx="30" cy="17.5" r="2.1" />
        <rect x="28.5" y="19.2" width="3" height="11.8" rx="0.4" />
        <path d="M14.8 31V24.2Q20 11.5 25.2 24.2V31H14.8z" />
      </g>
    </svg>
  );
}

function NavItem({ icon, label, to, active = false, disabled = false }) {
  const className = `nav-link${active ? " nav-link--active" : ""}`;

  if (disabled || !to) {
    return (
      <a
        href={to || "#"}
        className={className}
        onClick={(event) => event.preventDefault()}
      >
        <span className="nav-link__icon" aria-hidden="true">
          {icon}
        </span>
        {label}
      </a>
    );
  }

  return (
    <Link to={to} className={className}>
      <span className="nav-link__icon" aria-hidden="true">
        {icon}
      </span>
      {label}
    </Link>
  );
}

export default function Sidebar({ activeKey = "prayer" }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo" aria-hidden="true">
          <BrandMark />
        </div>
        <div>
          <div className="sidebar__title">Noor Masjid</div>
          <div className="sidebar__subtitle">Islamic Center</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        <NavItem icon={<Home size={18} strokeWidth={2} />} label="Dashboard" to="/" active={activeKey === "dashboard"} disabled />
        <NavItem icon={<Clock3 size={18} strokeWidth={2} />} label="Prayer Times" to="/prayer-time" active={activeKey === "prayer"} />
        <NavItem icon={<Bell size={18} strokeWidth={2} />} label="Announcements" active={activeKey === "announcements"} />
        <NavItem icon={<BookOpen size={18} strokeWidth={2} />} label="Madrasa" active={activeKey === "madrasa"} />
        <NavItem icon={<User size={18} strokeWidth={2} />} label="Profile" active={activeKey === "profile"} />
        <NavItem icon={<Settings size={18} strokeWidth={2} />} label="Settings" to="/settings" active={activeKey === "settings"} />
      </nav>

      <div className="sidebar__qibla">
        <div className="sidebar__qibla-head">
          <span className="sidebar__qibla-compass" aria-hidden="true">
            <Compass size={18} strokeWidth={2} />
          </span>
          <span className="sidebar__qibla-label">Qibla Direction</span>
        </div>
        <div className="sidebar__qibla-value">34.6° NE</div>
      </div>
    </aside>
  );
}
