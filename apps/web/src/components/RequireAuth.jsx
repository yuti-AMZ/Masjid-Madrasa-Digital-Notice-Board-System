import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getSession } from '../lib/authStorage'

export function RequireAuth() {
  const location = useLocation()
  if (!getSession()) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <Outlet />
}
