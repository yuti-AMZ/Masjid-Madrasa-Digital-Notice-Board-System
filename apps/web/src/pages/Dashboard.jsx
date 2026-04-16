import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Clock, Megaphone, User, MapPin, 
  Phone, Mail, GraduationCap, Bell, Users, Search, ChevronRight 
} from 'lucide-react';
import Profile from './profile';
import NotFoundPage from './404';

const _motion = motion;


const NavItem = ({ icon, label, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <motion.div 
        whileHover={{ x: 5, backgroundColor: isActive ? "#E6F7F1" : "#f8fafb" }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive ? 'bg-[#E6F7F1] text-[#00B67A] font-bold shadow-sm' : 'text-slate-500'
        }`}
      >
        {icon}
        <span className="text-sm">{label}</span>
      </motion.div>
    </Link>
  );
};

const ActionCard = ({ icon, label }) => (
  <motion.div 
    whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 182, 122, 0.1)" }}
    whileTap={{ scale: 0.95 }}
    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center cursor-pointer group transition-colors hover:border-[#00B67A]/30"
  >
    <div className="p-4 bg-[#F8FAFB] rounded-full mb-3 group-hover:bg-[#E6F7F1] transition-colors">
      {React.cloneElement(icon, { size: 32, className: "group-hover:scale-110 transition-transform" })}
    </div>
    <span className="font-bold text-sm">{label}</span>
  </motion.div>
);

/**
 * DASHBOARD VIEW (The main UI from your image)
 */
const DashboardHome = () => {
  const prayerTimes = [
    { name: 'FAJR', time: '05:15', period: 'AM' },
    { name: 'SUNRISE', time: '06:45', period: 'AM' },
    { name: 'DHUHR', time: '01:15', period: 'PM', active: true },
    { name: 'ASR', time: '04:45', period: 'PM' },
    { name: 'MAGHRIB', time: '07:30', period: 'PM' },
    { name: 'ISHA', time: '09:00', period: 'PM' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="grid grid-cols-12 gap-8"
    >
      {/* LEFT COLUMN */}
      <div className="col-span-8 space-y-8">
        {/* Prayer Times Section */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-xl text-slate-800">Today's Prayer Times</h3>
            <div className="flex items-center text-[#00B67A] text-sm font-bold bg-[#E6F7F1] px-3 py-1 rounded-full">
              <MapPin size={14} className="mr-1" /> London, UK
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {prayerTimes.map((prayer) => (
              <motion.div 
                key={prayer.name}
                whileHover={{ y: -5 }}
                className={`relative p-4 rounded-2xl text-center cursor-default transition-all duration-300 ${
                  prayer.active 
                  ? 'bg-[#00D084] text-white shadow-xl shadow-green-200 z-10 scale-105' 
                  : 'bg-white border border-slate-100 hover:shadow-md'
                }`}
              >
                {prayer.active && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-[10px] px-3 py-1 rounded-full font-black tracking-widest text-white shadow-lg">
                    NEXT PRAYER
                  </span>
                )}
                <p className={`text-[10px] font-black mb-2 tracking-widest ${prayer.active ? 'text-white/80' : 'text-slate-300'}`}>{prayer.name}</p>
                <p className="text-xl font-black">{prayer.time}</p>
                <p className={`text-[10px] font-bold ${prayer.active ? 'text-white/80' : 'text-slate-300'}`}>{prayer.period}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Announcements Section */}
        <section>
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-xl text-slate-800">Latest Announcements</h3>
            <button className="text-[#00B67A] text-sm font-black hover:underline underline-offset-4">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { tag: 'EVENT', title: 'Community Dinner This Friday', color: 'text-[#00B67A] bg-[#E6F7F1]', img: '' },
              { tag: 'MADRASA', title: 'New Madrasa Enrollment Open', color: 'text-[#4A90E2] bg-[#E6F0FF]', img: '' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.01, backgroundColor: "#fff" }}
                className="bg-white p-4 rounded-3xl border border-slate-100 flex gap-6 shadow-sm cursor-pointer"
              >
                <img src={item.img} className="w-48 h-32 rounded-2xl object-cover" alt="img" />
                <div className="flex-1 py-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded ${item.color}`}>{item.tag}</span>
                    <span className="text-xs text-slate-400">Posted {idx === 0 ? '2 hours ago' : 'Yesterday'}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Join our community for a wonderful evening of food and conversation. Everyone is welcome to join...</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h3 className="font-bold text-xl text-slate-800 mb-5">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-6">
            <ActionCard icon={<GraduationCap className="text-[#00B67A]" />} label="Join Class" />
            <ActionCard icon={<Bell className="text-[#00B67A]" />} label="Set Reminders" />
            <ActionCard icon={<Users className="text-[#00B67A]" />} label="Volunteer" />
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-4 space-y-6">
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100">
          <div className="relative h-44">
            <img src="" className="w-full h-full object-cover" alt="Mosque" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute top-4 left-4 bg-[#00D084] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">OPEN FOR SALAH</span>
            <div className="absolute bottom-5 left-6">
              <h4 className="text-white font-bold text-2xl">Noor Masjid</h4>
              <p className="text-white/70 text-xs font-medium tracking-widest">ESTABLISHED 1994</p>
            </div>
          </div>
          <div className="p-8 space-y-5">
            <ContactRow icon={<MapPin size={18} />} label="ADDRESS" value="123 Islamic Center Dr, London, UK" />
            <ContactRow icon={<Phone size={18} />} label="PHONE" value="+44 20 7123 4567" />
            <ContactRow icon={<Mail size={18} />} label="EMAIL" value="contact@noormasjid.org" />
            <motion.button 
              whileHover={{ scale: 1.03, backgroundColor: "#00B67A", color: "#fff" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 bg-[#E6F7F1] text-[#00B67A] font-black rounded-2xl transition-colors shadow-sm"
            >
              Contact Admin
            </motion.button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h4 className="font-bold text-lg mb-4 text-slate-800">Masjid Location</h4>
          <div className="bg-[#EDF2F7] h-56 rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
             <div className="absolute inset-0 bg-[#00D084]/5 group-hover:bg-transparent transition-colors" />
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="z-10 bg-white p-3 rounded-full shadow-xl">
                <MapPin size={32} className="text-[#00B67A]" fill="#00B67A20" />
             </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ContactRow = ({ icon, label, value }) => (
  <div className="flex gap-4 group cursor-default">
    <div className="text-[#00B67A] group-hover:scale-110 transition-transform">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-300 tracking-[0.15em] mb-0.5">{label}</p>
      <p className="text-sm font-bold text-slate-600">{value}</p>
    </div>
  </div>
);

/**
 * UNDER MAINTENANCE COMPONENT (used for placeholder pages)
 */
const UnderMaintenance = ({ title = 'Under Maintenance', message }) => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20">
      <div className="bg-[#E6F7F1] p-12 rounded-full mb-8"><Search size={64} className="text-[#00B67A]" /></div>
      <h1 className="text-3xl font-black mb-4">{title}</h1>
      <p className="text-slate-400 mb-8 max-w-sm text-center font-medium">
        {message ?? "This section is currently being updated for the community. Please check back later!"}
      </p>
      <button onClick={() => navigate('/')} className="px-10 py-4 bg-[#00B67A] text-white font-black rounded-2xl shadow-xl shadow-green-100 hover:scale-105 transition-transform">Return Home</button>
    </motion.div>
  );
};

/**
 * MAIN APP ENTRY (ROUTING & SIDEBAR)
 */
export default function NoorMasjidApp() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#F8FAFB] font-sans">
        {/* SIDEBAR */}
        <aside className="w-72 bg-white border-r border-slate-100 flex flex-col fixed h-full z-50">
          <div className="p-8 flex items-center gap-4">
            <motion.div whileHover={{ rotate: 15 }} className="w-12 h-12 bg-[#00B67A] rounded-2xl flex items-center justify-center shadow-lg shadow-green-100">
              <LayoutDashboard size={28} className="text-white" />
            </motion.div>
            <div>
              <h1 className="font-black text-xl text-slate-800 leading-none">Noor Masjid</h1>
              <p className="text-[10px] font-bold text-slate-300 tracking-widest mt-1">COMMUNITY HUB</p>
            </div>
          </div>

          <nav className="mt-6 px-6 space-y-3">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
            <NavItem to="/prayer" icon={<Clock size={20} />} label="Prayer Times" />
            <NavItem to="/news" icon={<Megaphone size={20} />} label="Announcements" />
            <NavItem to="/profile" icon={<User size={20} />} label="Profile" />
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 ml-72 p-12">
          {/* TOP HEADER */}
          <header className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-800">Assalamu Alaikum, Ahmed Abdullah</h2>
              <p className="text-slate-400 font-bold mt-1 uppercase tracking-tighter opacity-70">Monday, October 23, 2023</p>
            </div>
            <div className="flex items-center gap-6">
              <motion.div whileHover={{ scale: 1.1 }} className="relative p-3 bg-white border border-slate-100 rounded-full cursor-pointer shadow-sm">
                <Bell size={22} className="text-[#00B67A]" />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </motion.div>
              <Link to="/profile" className="flex items-center gap-4 bg-white p-1.5 pr-6 rounded-full border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#FDE7D2] rounded-full overflow-hidden flex items-center justify-center">
                  <div className="w-7 h-10 bg-[#D4A373] rounded-t-full mt-5"></div>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-800 leading-none">Ahmed Abdullah</p>
                  <p className="text-[10px] font-bold text-[#00B67A] mt-1">PREMIUM MEMBER</p>
                </div>
              </Link>
            </div>
          </header>

          {/* PAGE ROUTING */}
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/prayer"
              element={<UnderMaintenance title="Prayer Times" />}
            />
            <Route
              path="/news"
              element={<UnderMaintenance title="Announcements" />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
