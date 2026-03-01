import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ParentDashboard() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto pt-8">
        <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Parent Dashboard</h1>
            <p className="text-slate-500 text-lg">Here’s how your children are doing this week.</p>
          </div>
          <button className="bg-[#4338CA] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-indigo-800 transition">
            + Add Another Child
          </button>
        </header>

        {/* Student Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl border border-indigo-200 shadow-inner">
              👦🏽
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Student Profile</h2>
              <p className="text-slate-500 font-medium">Grade 8 • Ontario</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Current Streak</div>
              <div className="text-2xl font-black text-orange-500">🔥 1 Day</div>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Math Avg</div>
              <div className="text-2xl font-black text-emerald-500">--%</div>
            </div>
          </div>

          <Link to="/parent/child/1" className="block w-full text-center bg-slate-50 border border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-100 transition">
            View Detailed Progress
          </Link>
        </div>
      </div>
    </div>
  );
}
