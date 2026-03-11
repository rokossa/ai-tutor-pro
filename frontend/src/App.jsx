import React, { useState } from 'react';
import PracticeArena from './pages/PracticeArena';
import Profile from './pages/Profile';
import { Home, Edit3, LayoutDashboard, User } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('practice'); // 'practice', 'profile'

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative">
      
      {/* Content Area */}
      {activeTab === 'practice' ? <PracticeArena /> : <Profile />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-md mx-auto flex justify-between items-center px-6 py-4">
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-900 transition">
            <Home size={24} />
            <span className="text-[10px] font-bold">Home</span>
          </button>
          <button onClick={() => setActiveTab('practice')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'practice' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-900'}`}>
            <LayoutDashboard size={24} />
            <span className="text-[10px] font-bold">Dashboard</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-900 transition">
            <Edit3 size={24} />
            <span className="text-[10px] font-bold">Practice</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center gap-1 transition ${activeTab === 'profile' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-900'}`}>
            <User size={24} />
            <span className="text-[10px] font-bold">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
