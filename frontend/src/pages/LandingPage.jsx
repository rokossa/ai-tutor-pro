import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A1A1A] tracking-tight mb-6 leading-tight">
            Your child's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">personal AI tutor</span> that actually cares
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
            Instant practice questions from their exact local curriculum. Warm, step-by-step feedback. Weekly parent reports.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/signup/parent" className="bg-[#1E1B4B] text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-indigo-900 transition shadow-lg">
              Start 14-day free trial
            </Link>
            <button className="text-[#1E1B4B] font-bold py-4 px-8 rounded-xl text-lg hover:bg-slate-100 transition flex items-center gap-2">
              Watch demo <span className="text-xl">›</span>
            </button>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 text-sm font-medium text-slate-600">
            <span className="text-amber-400">⭐ 4.98/5</span> Trusted by 4,872 families across US & Canada
          </div>
        </div>
        <div className="flex-1 w-full max-w-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" alt="Student learning" className="rounded-2xl shadow-2xl border-4 border-white" />
        </div>
      </main>
    </div>
  );
}
