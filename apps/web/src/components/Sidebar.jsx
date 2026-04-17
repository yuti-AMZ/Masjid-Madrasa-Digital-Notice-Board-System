import { NavLink, useNavigate } from 'react-router-dom'
import {
  Bell,
  Clock3,
  Landmark,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from 'lucide-react'
import { clearSession } from '../lib/authStorage'
import './Sidebar.css'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/prayer-time', label: 'Prayer Times', icon: Clock3 },
  { to: '/announcements', label: 'Announcements', icon: Bell },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const navigate = useNavigate()

  function handleLogout() {
    clearSession()
    navigate('/', { replace: true })
  }

  return (
    <aside className="portal-sidebar" aria-label="Main navigation">
      <div className="portal-sidebar__brand">
        <div className="portal-sidebar__brand-icon" aria-hidden>
          <Landmark size={22} strokeWidth={2} />
        </div>
        <div>
          <div className="portal-sidebar__title">Noor Masjid</div>
          <div className="portal-sidebar__subtitle">Community Portal</div>
        </div>
      </div>

      <nav className="portal-sidebar__nav">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              ['portal-sidebar__link', isActive ? 'portal-sidebar__link--active' : '']
                .filter(Boolean)
                .join(' ')
            }
            end={to === '/dashboard'}
          >
            <Icon className="portal-sidebar__icon" size={20} strokeWidth={2} aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="portal-sidebar__spacer" aria-hidden />
      <button type="button" className="portal-sidebar__logout" onClick={handleLogout}>
        <LogOut className="portal-sidebar__logout-icon" size={20} strokeWidth={2} aria-hidden />
        Logout
      </button>
    </aside>
  )
}
