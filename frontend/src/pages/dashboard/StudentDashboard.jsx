import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Student Topbar */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-extrabold text-slate-900">AI Tutor Pro</h1>
        <div className="flex items-center gap-6">
          <div className="bg-orange-100 text-orange-700 font-bold px-4 py-1.5 rounded-full text-sm flex items-center gap-2">
            🔥 5 Day Streak!
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-lg">🏀</div>
            <span className="font-bold text-slate-700 text-sm hidden md:inline">Alexandre</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <Link to="#" className="text-slate-400 hover:text-slate-600 font-bold text-sm flex items-center gap-1 mb-6 transition">
          ← Back
        </Link>
        
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Grade 8 - Topic: Algebra & Fractions</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Quick Start Card */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center text-center hover:shadow-md transition">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Continue Daily Practice</h3>
            <p className="text-slate-500 mb-6 text-sm">You have 9 minutes left to reach your 15-minute goal today.</p>
            <Link to="/practice" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition">
              Start Exercise
            </Link>
          </div>

          {/* AI Feedback Summary Card */}
          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">Last Session Feedback</h3>
            <div className="text-4xl font-black text-emerald-600 mb-4">SCORE: 94%</div>
            <p className="text-emerald-800/80 mb-6 font-medium leading-relaxed">
              Amazing job on the free-throw percentage questions! You are showing great consistency in simplifying fractions. Let's push further today.
            </p>
            <Link to="/practice" className="bg-white text-emerald-700 border border-emerald-200 font-bold py-3 px-6 rounded-xl hover:bg-emerald-50 transition block text-center">
              Review Errors
            </Link>
          </div>
        </div>

        {/* Achievements */}
        <section>
          <h3 className="text-lg font-bold text-slate-700 mb-4">My Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">🚀</div>
              <div>
                <p className="font-bold text-slate-900 text-sm">First Step</p>
                <p className="text-xs text-emerald-500 font-bold">Unlocked</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-orange-200 bg-orange-50/50 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-xl">🔥</div>
              <div>
                <p className="font-bold text-orange-900 text-sm">On Fire</p>
                <p className="text-xs text-orange-600 font-bold">Unlocked</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 opacity-60 grayscale">
              <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-xl">🏆</div>
              <div>
                <p className="font-bold text-slate-500 text-sm">Math Whiz</p>
                <p className="text-xs text-slate-400 font-bold">Locked</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
