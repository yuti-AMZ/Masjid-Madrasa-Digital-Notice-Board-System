import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export function PortalLayout() {
  return (
    <div className="App">
      <Sidebar />
      <main className="portal-outlet">
        <Outlet />
      </main>
    </div>
  )
}
