import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Download, Trophy, Flame, Target, Star } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export default function ChildProfile() {
  const { t } = useTranslation();
  const { childId } = useParams(); // In a real app, use this to fetch data

  // Mock Data for a Grade 8 Student
  const student = {
    name: "Alexandre",
    grade: "Grade 8",
    province: "Ontario",
    age: 13,
    streak: 4,
    averageScore: 82,
    totalExercises: 145
  };

  // Chart Configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
    scales: {
      y: { min: 40, max: 100, grid: { borderDash: [5, 5], color: '#f1f5f9' }, ticks: { stepSize: 10, callback: (value) => value + '%' } },
      x: { grid: { display: false } }
    },
    interaction: { mode: 'nearest', axis: 'x', intersect: false },
  };

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'This Week'],
    datasets: [
      {
        fill: true,
        label: 'Average Score',
        data: [65, 72, 78, 85, 82],
        borderColor: '#4338CA',
        backgroundColor: 'rgba(67, 56, 202, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4338CA',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      },
    ],
  };

  const recentActivity = [
    { id: 1, date: 'Today', topic: 'Linear Equations', score: 90, feedback: 'Amazing effort! You solved the variable isolation perfectly.' },
    { id: 2, date: 'Yesterday', topic: 'Fractions & Decimals', score: 85, feedback: 'Great job converting these. Just watch the negative signs.' },
    { id: 3, date: '2 days ago', topic: 'Geometry: Area', score: 70, feedback: 'Good start. Let\'s review the formula for the area of a triangle next time.' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pb-24">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/parent/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-[#4338CA] font-bold transition">
            <ChevronLeft size={20} /> Back to Dashboard
          </Link>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 py-2 px-4 rounded-lg transition">
            <Download size={16} /> {t('common.downloadPDF', 'Download PDF Report')}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl border-2 border-indigo-200 shadow-sm">
            👦🏽
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{student.name}</h1>
            <p className="text-lg text-slate-500 font-medium flex items-center justify-center md:justify-start gap-2">
              <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-sm">{student.grade}</span>
              <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-sm">{student.province}</span>
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center"><Target size={24} /></div>
            <div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Average Score</div>
              <div className="text-3xl font-black text-slate-900">{student.averageScore}%</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center"><Flame size={24} /></div>
            <div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Current Streak</div>
              <div className="text-3xl font-black text-slate-900">{student.streak} Days</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center"><Star size={24} /></div>
            <div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Exercises</div>
              <div className="text-3xl font-black text-slate-900">{student.totalExercises}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Section (Takes up 2/3 of grid) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance Trend (Last 30 Days)</h2>
            <div className="h-72 w-full">
              <Line options={chartOptions} data={chartData} />
            </div>
          </div>

          {/* Gamification / Badges Section (Takes up 1/3 of grid) */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Trophy size={20} className="text-amber-500"/> Recent Badges</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <div className="text-3xl">🏅</div>
                <div>
                  <div className="font-bold text-amber-900">Algebra Novice</div>
                  <div className="text-sm text-amber-700">Completed 50 math exercises</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                <div className="text-3xl">🔥</div>
                <div>
                  <div className="font-bold text-indigo-900">Weekend Warrior</div>
                  <div className="text-sm text-indigo-700">Practiced on a Saturday</div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 opacity-60">
                <div className="text-3xl grayscale">🎯</div>
                <div>
                  <div className="font-bold text-slate-700">Perfect 10</div>
                  <div className="text-sm text-slate-500">Score 100% on a block (Locked)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Activity Feed */}
        <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-100 transition">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center font-black text-xl shadow-sm ${activity.score >= 80 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {activity.score}%
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-bold text-slate-900">{activity.topic}</h3>
                    <span className="text-sm font-medium text-slate-400">{activity.date}</span>
                  </div>
                  <p className="text-slate-600 italic">"{activity.feedback}"</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full py-4 rounded-xl font-bold text-[#4338CA] border-2 border-[#4338CA] hover:bg-indigo-50 transition">
            View Full History
          </button>
        </div>

      </div>
    </div>
  );
}
