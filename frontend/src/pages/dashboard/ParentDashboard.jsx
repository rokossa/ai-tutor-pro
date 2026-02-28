import React from 'react';
import { Link } from 'react-router-dom';
import { Home, LayoutDashboard, FileText, LogOut, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ParentDashboard() {
  // Mock Data
  const chartData = [
    { name: 'Week 1', score: 65, avg: 70 },
    { name: 'Week 2', score: 72, avg: 72 },
    { name: 'Week 3', score: 85, avg: 75 },
    { name: 'Week 4', score: 94, avg: 78 },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col justify-between py-6">
        <div>
          <div className="px-6 mb-10 hidden md:block">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Tutor Pro</h1>
          </div>
          <nav className="space-y-2 px-4">
            <Link to="/dashboard/parent" className="flex items-center gap-3 bg-indigo-50 text-indigo-700 px-4 py-3 rounded-xl font-bold">
              <Home size={20} /> <span className="hidden md:inline">Home</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition">
              <LayoutDashboard size={20} /> <span className="hidden md:inline">Curriculum</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition">
              <FileText size={20} /> <span className="hidden md:inline">Reports</span>
            </Link>
          </nav>
        </div>
        <div className="px-4">
          <Link to="/dashboard/settings" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition">
            <LogOut size={20} /> <span className="hidden md:inline">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900">Welcome back, David ✨</h2>
          <div className="bg-slate-900 text-white px-5 py-2 rounded-full font-bold text-sm shadow-md cursor-pointer hover:bg-slate-800 transition">
            + Register New Child
          </div>
        </header>

        {/* Children Progress Cards */}
        <section className="mb-10">
          <h3 className="text-lg font-bold text-slate-700 mb-4">Your children's progress this week</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Child Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🏀</div>
                <span className="text-slate-400">•••</span>
              </div>
              <h4 className="font-bold text-lg text-slate-900">Alexandre • Grade 8</h4>
              <p className="text-sm text-slate-500 mb-4">Ontario (OSSD)</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[92%] h-full bg-emerald-500 rounded-full"></div>
                </div>
                <span className="font-bold text-slate-700">92%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Score History Chart */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">Alexandre's Score History</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm font-bold text-slate-600 px-4 py-2 rounded-lg outline-none">
              <option>Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barSize={20}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="avg" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <button className="absolute bottom-8 left-8 flex items-center gap-2 bg-white/90 backdrop-blur border border-slate-200 text-slate-800 font-bold px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 transition">
            <Download size={16} /> Download Full PDF Report
          </button>
        </section>
      </main>
    </div>
  );
}
