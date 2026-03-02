import React from 'react';
import { Link } from 'react-router-dom';

export default function SmartHome() {
  const isLoggedIn = !!localStorage.getItem('ai_tutor_token');

  return (
    <div className="bg-[#F8F9FA] flex-grow flex flex-col items-center justify-center text-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-sm mb-8 shadow-sm">
        ✨ Powered by Gemini AI
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight max-w-4xl">
        The world's most patient <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4338CA] to-purple-600">AI Tutor.</span>
      </h1>
      
      <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
        Boost confidence and grades with personalized math practice, real-time feedback, and comprehensive parent insights.
      </p>
      
      {isLoggedIn ? (
        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link to="/parent/dashboard" className="bg-[#4338CA] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-800 transition">
            Go to your Dashboard &rarr;
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link to="/login" className="bg-[#4338CA] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-indigo-800 transition">
            Start Free Trial
          </Link>
          <Link to="/pricing" className="bg-white text-slate-700 border border-slate-200 font-bold text-lg px-8 py-4 rounded-xl shadow-sm hover:bg-slate-50 transition">
            View Pricing
          </Link>
        </div>
      )}
    </div>
  );
}
