import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, Heart, Globe, MessageSquare, HelpCircle, 
  ChevronRight, Camera, UserCircle, Sliders, LifeBuoy 
} from 'lucide-react';

const Profile = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="max-w-4xl mx-auto space-y-8 pb-10"
    >
      {/* Profile Header Card */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#E6F7F1]">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-1 right-1 bg-[#00D084] p-2 rounded-full border-4 border-white text-white shadow-lg"
            >
              <Camera size={16} />
            </motion.button>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-800">Ahmed Abdullah</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-[#E6F7F1] text-[#00B67A] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Premium Member
              </span>
            </div>
            <p className="text-slate-400 text-sm font-medium mt-2">ahmed.abdullah@email.com</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#00D084] text-white font-black px-8 py-3 rounded-2xl shadow-lg shadow-green-100"
        >
          Edit Profile
        </motion.button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-10">
        <SettingsSection icon={<UserCircle size={20} />} title="Account Settings">
          <SettingsItem icon={<Settings size={20} />} label="General Settings" />
          <SettingsItem icon={<Heart size={20} />} label="Favorites & Bookmarks" />
        </SettingsSection>

        <SettingsSection icon={<Sliders size={20} />} title="Preferences">
          <SettingsItem 
            icon={<Globe size={20} />} 
            label="Language" 
            sublabel="English (United Kingdom)" 
          />
          <SettingsItem icon={<MessageSquare size={20} />} label="App Feedback" />
        </SettingsSection>

        <SettingsSection icon={<LifeBuoy size={20} />} title="Support">
          <SettingsItem icon={<HelpCircle size={20} />} label="Help and Support" last />
        </SettingsSection>
      </div>
    </motion.div>
  );
};

// Sub-components for clean structure
const SettingsSection = ({ icon, title, children }) => (
  <section>
    <div className="flex items-center gap-2 mb-4 px-2 text-[#00B67A]">
      {icon}
      <h3 className="font-black text-lg text-slate-800">{title}</h3>
    </div>
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      {children}
    </div>
  </section>
);

const SettingsItem = ({ icon, label, sublabel, last }) => (
  <motion.div 
    whileHover={{ backgroundColor: "#F8FAFB" }}
    className={`flex items-center justify-between p-6 cursor-pointer transition-colors ${!last ? 'border-b border-slate-50' : ''}`}
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-slate-50 rounded-xl text-slate-500 group-hover:text-[#00B67A]">
        {icon}
      </div>
      <div>
        <p className="font-bold text-slate-700">{label}</p>
        {sublabel && <p className="text-xs text-slate-400 font-medium">{sublabel}</p>}
      </div>
    </div>
    <ChevronRight size={20} className="text-slate-300" />
  </motion.div>
);

export default Profile;