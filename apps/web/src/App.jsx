import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { PortalLayout } from './components/PortalLayout';
import { RequireAuth } from './components/RequireAuth';
import { AnnouncementsLayout } from './components/AnnouncementsLayout';
import AnnouncementDetail from './pages/AnnouncementDetail';
import Announcements from './pages/Announcements';
import CalendarPage from './pages/CalendarPage';
import { DashboardPage } from './pages/DashboardPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import KitabDetail from './pages/KitabDetail';
import { KhutbahPage } from './pages/KhutbahPage';
import { LandingPage } from './pages/LandingPage';
import { MadrasaPage } from './pages/MadrasaPage';
import { CommunityEventsPage } from './pages/CommunityEventsPage';
import { DonatePage } from './pages/DonatePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ServicesPage } from './pages/ServicesPage';
import PrayerTimePage from './pages/PrayerTimePage';
import { EditProfilePage } from './pages/EditProfilePage';
import { FeedbackPage } from './pages/FeedbackPage';
import { ProfilePage } from './pages/ProfilePage';
import QuranRegistrationForm from './pages/QuranRegistrationForm';
import SettingsPage from './pages/SettingsPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/khutbahs" element={<KhutbahPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<PortalLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/announcements" element={<AnnouncementsLayout />}>
            <Route index element={<Announcements />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="donate" element={<DonatePage />} />
            <Route path="events" element={<CommunityEventsPage />} />
          </Route>
          <Route path="/prayer-time" element={<PrayerTimePage />} />
          <Route path="/madrasa" element={<MadrasaPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/announcement/:announcementId" element={<AnnouncementDetail />} />
          <Route
            path="/announcement/:announcementId/register"
            element={<QuranRegistrationForm />}
          />
          <Route
            path="/announcement/:announcementId/kitaab/:kitabIndex"
            element={<KitabDetail />}
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
