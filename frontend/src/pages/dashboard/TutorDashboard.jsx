import React from 'react';
import { Users, FileText, Lock, MessageCircle, Settings, MoreHorizontal, User } from 'lucide-react';

export default function TutorDashboard() {
  return (
    <div className="min-h-screen bg-[#Eef0f4] p-4 sm:p-8 font-sans flex justify-center">
      <div className="max-w-7xl w-full flex gap-8">
        
        {/* Sidebar */}
        <div className="w-64 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border border-white hidden lg:flex flex-col h-[calc(100vh-4rem)] sticky top-8">
          <div className="flex items-center gap-3 mb-10">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">D</div>
             <span className="font-extrabold text-xl text-slate-900 tracking-tight">Didakt</span>
          </div>
          
          <nav className="flex flex-col gap-2 flex-grow">
            <a href="#" className="flex items-center gap-3 bg-indigo-50 text-[#4338CA] font-bold px-4 py-3 rounded-xl transition">
              <Users size={20} /> My Students
            </a>
            <a href="#" className="flex items-center gap-3 text-slate-500 font-semibold px-4 py-3 rounded-xl hover:bg-slate-50 transition">
              <FileText size={20} /> Progress Reports
            </a>
            <a href="#" className="flex items-center gap-3 text-slate-500 font-semibold px-4 py-3 rounded-xl hover:bg-slate-50 transition">
              <Lock size={20} /> Private Notes
            </a>
            <a href="#" className="flex items-center gap-3 text-slate-500 font-semibold px-4 py-3 rounded-xl hover:bg-slate-50 transition">
              <MessageCircle size={20} /> Message Parents
            </a>
            <a href="#" className="flex items-center gap-3 text-slate-500 font-semibold px-4 py-3 rounded-xl hover:bg-slate-50 transition">
              <Settings size={20} /> Custom Exercises
            </a>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#F4F6FA] rounded-[40px] p-8 sm:p-10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.6),0_10px_30px_rgba(0,0,0,0.05)] border border-white/50">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-10 border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-bold text-slate-800">Tutor Dashboard</h1>
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
              <span className="font-semibold text-slate-700">Good morning, Ms. Patel 😄</span>
              <span className="text-xs">▼</span>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Didakt Horizon</h2>
            <span className="text-sm font-semibold text-slate-500">3 Students</span>
          </div>

          {/* Student Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Mocked Student Cards */}
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <User size={20} />
                    </div>
                    <span className="font-bold text-lg text-slate-800">Olivia Wilson</span>
                  </div>
                  <MoreHorizontal className="text-slate-400 cursor-pointer" size={20} />
                </div>
                
                <div className="text-sm font-semibold text-slate-700 mb-1">Grade 8</div>
                <div className="text-sm font-medium text-slate-500 mb-4">Parent: Mr. Wilson</div>
                
                <div className="text-xs font-semibold text-slate-500 mb-1">Last Activity 13.0m</div>
                <div className="text-sm text-slate-600 mb-6 truncate">Yesterday - Linear Equations</div>
                
                <div className="flex justify-between items-end mt-auto pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1 font-bold text-slate-700">
                    🔥 Streak
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-semibold text-slate-500">Average</div>
                    <div className="text-3xl font-black text-[#14b8a6]">72</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State / Add Student Card */}
            <div className="bg-[#Eef0f4] rounded-3xl p-6 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 transition min-h-[300px]">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-slate-400 mb-4 shadow-sm">
                <Users size={24} />
              </div>
              <span className="font-bold text-slate-600">Invite New Student</span>
              <p className="text-xs text-slate-500 mt-2 max-w-[150px]">Link a student profile to track their progress.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
