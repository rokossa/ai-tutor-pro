import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, ArrowRight, Home, RefreshCcw, Star } from 'lucide-react';

export default function PracticeSummary() {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, subject, chapter, streak } = location.state || { score: 90, subject: 'Math', chapter: 'Linear Equations', streak: 7 };

  return (
    <div className="min-h-screen bg-[#Eef0f4] flex items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full bg-[#F4F6FA] rounded-[40px] p-12 text-center shadow-2xl border border-white/50 animate-in zoom-in duration-300">
        
        {/* Celebration Icon */}
        <div className="w-24 h-24 bg-amber-100 rounded-[32px] flex items-center justify-center text-amber-500 mx-auto mb-8 shadow-inner">
          <Trophy size={48} fill="currentColor" />
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-2">Awesome Job, Alexandre!</h1>
        <p className="text-slate-500 font-bold mb-10 capitalize text-lg tracking-tight">
          You just mastered {chapter} in {subject}!
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
            <p className="text-4xl font-black text-[#14b8a6]">{score}%</p>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Current Streak</p>
            <p className="text-4xl font-black text-indigo-600">{streak} Days</p>
          </div>
        </div>

        {/* Level Progress Simulation */}
        <div className="bg-white rounded-3xl p-8 mb-10 shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-3">
            <span className="text-sm font-black text-slate-700">Level 8 Explorer</span>
            <span className="text-xs font-bold text-slate-400">450 / 500 XP</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-[90%] shadow-lg"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/student/dashboard')}
            className="flex-1 bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition shadow-lg"
          >
            <Home size={20} /> Dashboard
          </button>
          <button 
            onClick={() => navigate(-1)}
            className="flex-1 bg-[#4338CA] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition shadow-lg"
          >
            Next Lesson <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
