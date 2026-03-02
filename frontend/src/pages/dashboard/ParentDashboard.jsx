import React, { useState } from 'react';
import { User, Download, Users, GraduationCap, Star } from 'lucide-react';

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const children = [
    { name: 'Alexandre', grade: '8th Grade', streak: '5 days', score: '92%' }
  ];

  const assignedTutors = [
    { name: 'Ms. Patel', specialty: 'Mathematics & Physics', rating: 4.9, students: ['Alexandre'] }
  ];

  return (
    <div className="min-h-screen bg-[#Eef0f4] p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-[#F4F6FA] rounded-[40px] p-8 sm:p-12 shadow-xl border border-white/50">
        
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-10 bg-white/50 p-2 rounded-2xl w-fit border border-white">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-xl font-bold transition ${activeTab === 'overview' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('tutors')}
            className={`px-6 py-2 rounded-xl font-bold transition ${activeTab === 'tutors' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
          >
            My Tutors
          </button>
        </div>

        {activeTab === 'overview' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Child Cards from Mock */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {children.map((child, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><User size={28} /></div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800">{child.name}</h3>
                      <p className="text-sm text-slate-500 font-medium">{child.grade}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 font-bold uppercase mb-1">
                    <span>Streak</span>
                    <span>Avg Score</span>
                  </div>
                  <div className="flex justify-between text-lg text-slate-800 font-black">
                    <span>{child.streak}</span>
                    <span className="text-[#14b8a6]">{child.score}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Activity & Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 min-h-[300px] flex items-center justify-center text-slate-400">
                 [ Family Progress Chart ]
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="bg-slate-50 p-3 rounded-xl text-sm font-semibold text-slate-600">Alexandre finished Algebra block</div>
                  <div className="bg-slate-50 p-3 rounded-xl text-sm font-semibold text-slate-600">Weekly report generated</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Assigned Tutors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assignedTutors.map((tutor, idx) => (
                <div key={idx} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center text-[#4338CA] shadow-inner">
                    <GraduationCap size={40} />
                  </div>
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{tutor.name}</h3>
                    <p className="text-sm text-slate-500 font-medium mb-4">{tutor.specialty}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 font-bold text-sm">
                      <Star size={16} fill="currentColor" /> {tutor.rating} <span className="text-slate-300 ml-2 font-medium">| Managing: {tutor.students.join(', ')}</span>
                    </div>
                  </div>
                  <button className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-slate-800 transition">
                    Message
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <button className="bg-[#5B4FE9] text-white font-bold py-4 px-10 rounded-2xl shadow-lg hover:scale-105 transition transform duration-200">
            Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
}
