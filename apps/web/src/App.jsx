import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import AnnouncementDetail from './pages/AnnouncementDetail';
import Announcements from './pages/Announcements';
import CalendarPage from './pages/CalendarPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import KitabDetail from './pages/KitabDetail';
import { KhutbahPage } from './pages/KhutbahPage';
import { LandingPage } from './pages/LandingPage';
import { MadrasaPage } from './pages/MadrasaPage';
import QuranRegistrationForm from './pages/QuranRegistrationForm';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';

function NoticeBoardLayout({ children }) {
  return (
    <div className="App">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/khutbahs" element={<KhutbahPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route
          path="/madrasa"
          element={
            <NoticeBoardLayout>
              <MadrasaPage />
            </NoticeBoardLayout>
          }
        />
        <Route
          path="/announcements"
          element={
            <NoticeBoardLayout>
              <Announcements />
            </NoticeBoardLayout>
          }
        />
        <Route
          path="/calendar"
          element={
            <NoticeBoardLayout>
              <CalendarPage />
            </NoticeBoardLayout>
          }
        />
        <Route
          path="/announcement/:announcementId"
          element={
            <NoticeBoardLayout>
              <AnnouncementDetail />
            </NoticeBoardLayout>
          }
        />
        <Route
          path="/announcement/:announcementId/register"
          element={
            <NoticeBoardLayout>
              <QuranRegistrationForm />
            </NoticeBoardLayout>
          }
        />
        <Route
          path="/announcement/:announcementId/kitaab/:kitabIndex"
          element={
            <NoticeBoardLayout>
              <KitabDetail />
            </NoticeBoardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
