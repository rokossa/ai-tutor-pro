import React, { useState, useEffect } from 'react';
import { Users, FileText, MessageCircle, User, ArrowUpRight, Clock, Target } from 'lucide-react';

export default function TutorDashboard() {
  const [students, setStudents] = useState([
    { id: 'alex_001', name: 'Alexandre King', grade: 'Grade 8', parent: 'David King', lastActivity: 'Just now', topic: 'Linear Equations', score: 92, trend: 'up' },
    { id: 'olivia_002', name: 'Olivia Wilson', grade: 'Grade 8', parent: 'Mr. Wilson', lastActivity: '2h ago', topic: 'Pythagorean Theorem', score: 88, trend: 'stable' }
  ]);

  return (
    <div className="min-h-screen bg-[#Eef0f4] flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white/80 backdrop-blur-md p-6 border-r border-white/50 hidden lg:flex flex-col gap-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-4">
           <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">D</div>
           <span className="font-black text-2xl text-slate-900 tracking-tighter">Didakt</span>
        </div>
        <nav className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-[#4338CA] font-bold bg-indigo-50 p-3 rounded-xl"><Users size={20}/> My Roster</div>
          <div className="flex items-center gap-3 text-slate-500 font-medium p-3 hover:bg-slate-50 rounded-xl cursor-pointer"><FileText size={20}/> Performance</div>
          <div className="flex items-center gap-3 text-slate-500 font-medium p-3 hover:bg-slate-50 rounded-xl cursor-pointer"><MessageCircle size={20}/> Messages</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-2">Didakt Horizon</h1>
            <p className="text-slate-500 font-medium">Monitoring {students.length} active students in Oakville.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-sm border border-white">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">MP</div>
            <span className="font-bold text-slate-700">Ms. Patel 😄</span>
          </div>
        </div>

        {/* Live Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1 group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-[#4338CA] transition-colors">
                    <User size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">{student.name}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{student.grade}</p>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-900 transition"><ArrowUpRight size={20}/></button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-600">
                  <Target size={18} className="text-slate-400" />
                  <span className="text-sm font-bold">{student.topic}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Clock size={18} className="text-slate-400" />
                  <span className="text-xs font-semibold">Active: {student.lastActivity}</span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-3xl p-5 flex justify-between items-center border border-slate-100">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">Avg Score</p>
                  <p className={`text-3xl font-black ${student.score > 90 ? 'text-[#14b8a6]' : 'text-amber-500'}`}>
                    {student.score}%
                  </p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-black uppercase ${
                    student.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {student.trend === 'up' ? '↑ Improving' : '• Stable'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
