import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Announcements from './pages/Announcements';
import AnnouncementDetail from './pages/AnnouncementDetail';
import KitabDetail from './pages/KitabDetail';
import CalendarPage from './pages/CalendarPage';
import QuranRegistrationForm from './pages/QuranRegistrationForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<Announcements />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/announcement/:announcementId" element={<AnnouncementDetail />} />
            <Route path="/announcement/:announcementId/register" element={<QuranRegistrationForm />} />
            <Route path="/announcement/:announcementId/kitaab/:kitabIndex" element={<KitabDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;