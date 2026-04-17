import { NavLink, Outlet } from 'react-router-dom'
import './AnnouncementsLayout.css'

export function AnnouncementsLayout() {
  return (
    <div className="announcements-layout">
      <nav className="announcements-layout__subnav" aria-label="Announcements sections">
        <NavLink
          to="/announcements"
          end
          className={({ isActive }) =>
            ['announcements-layout__tab', isActive ? 'announcements-layout__tab--active' : '']
              .filter(Boolean)
              .join(' ')
          }
        >
          Announcements
        </NavLink>
        <NavLink
          to="/announcements/notifications"
          className={({ isActive }) =>
            ['announcements-layout__tab', isActive ? 'announcements-layout__tab--active' : '']
              .filter(Boolean)
              .join(' ')
          }
        >
          Notifications
        </NavLink>
        <NavLink
          to="/announcements/services"
          className={({ isActive }) =>
            ['announcements-layout__tab', isActive ? 'announcements-layout__tab--active' : '']
              .filter(Boolean)
              .join(' ')
          }
        >
          Services
        </NavLink>
        <NavLink
          to="/announcements/donate"
          className={({ isActive }) =>
            ['announcements-layout__tab', isActive ? 'announcements-layout__tab--active' : '']
              .filter(Boolean)
              .join(' ')
          }
        >
          Donate
        </NavLink>
        <NavLink
          to="/announcements/events"
          className={({ isActive }) =>
            ['announcements-layout__tab', isActive ? 'announcements-layout__tab--active' : '']
              .filter(Boolean)
              .join(' ')
          }
        >
          Community Events
        </NavLink>
      </nav>
      <div className="announcements-layout__outlet">
        <Outlet />
      </div>
    </div>
  )
}
