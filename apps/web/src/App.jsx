import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { LandingPage } from './pages/LandingPage'
import PrayerTimePage from './pages/PrayerTimePage'
import { SignInPage } from './pages/SignInPage'
import { SignUpPage } from './pages/SignUpPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/prayer-time" element={<PrayerTimePage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
