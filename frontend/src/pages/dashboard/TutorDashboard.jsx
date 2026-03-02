import React from 'react';
import { Users, FileText, Lock, MessageCircle, Settings, User, PlusCircle } from 'lucide-react';

export default function TutorDashboard() {
  const students = [
    { name: 'Alexandre King', grade: 'Grade 8', parent: 'David King', lastActivity: '13m ago', topic: 'Linear Equations', score: 72 },
    { name: 'Olivia Wilson', grade: 'Grade 8', parent: 'Mr. Wilson', lastActivity: '2h ago', topic: 'Quadratic Equations', score: 88 },
    { name: 'Liam Smith', grade: 'Grade 7', parent: 'Sarah Smith', lastActivity: 'Yesterday', topic: 'Fractions', score: 95 }
  ];

  return (
    <div className="min-h-screen bg-[#Eef0f4] flex font-sans">
      {/* Sidebar based on Mock */}
      <div className="w-64 bg-white/80 backdrop-blur-md p-6 border-r border-white/50 hidden lg:flex flex-col gap-8">
        <div className="font-black text-2xl text-slate-900">Didakt</div>
        <nav className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[#4338CA] font-bold bg-indigo-50 p-3 rounded-xl"><Users size={20}/> My Students</div>
          <div className="flex items-center gap-3 text-slate-500 font-medium p-3 hover:bg-slate-50 rounded-xl cursor-pointer"><FileText size={20}/> Reports</div>
          <div className="flex items-center gap-3 text-slate-500 font-medium p-3 hover:bg-slate-50 rounded-xl cursor-pointer"><Lock size={20}/> Private Notes</div>
          <div className="flex items-center gap-3 text-slate-500 font-medium p-3 hover:bg-slate-50 rounded-xl cursor-pointer"><MessageCircle size={20}/> Messages</div>
        </nav>
      </div>

      {/* Main Grid */}
      <div className="flex-1 p-8 sm:p-12">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-slate-900">Student Roster</h1>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-white">
            <span className="font-bold text-slate-700">Ms. Patel 😄</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, idx) => (
            <div key={idx} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 transition hover:shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><User size={24}/></div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800">{student.name}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase">{student.grade}</p>
                </div>
              </div>
              <div className="space-y-1 mb-6">
                <p className="text-sm text-slate-400 font-medium">Last Activity: {student.lastActivity}</p>
                <p className="text-sm text-slate-700 font-bold">{student.topic}</p>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Active Streak</span>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Score</p>
                  <p className="text-3xl font-black text-[#14b8a6]">{student.score}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-slate-200/50 rounded-[32px] p-6 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-200 transition">
            <PlusCircle size={40} className="text-slate-400 mb-2"/>
            <span className="font-bold text-slate-600">Invite Student</span>
          </div>
        </div>
      </div>
    </div>
  );
}
