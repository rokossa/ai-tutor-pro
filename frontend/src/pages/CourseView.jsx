import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function CourseView() {
  const { courseId } = useParams();
  
  const chapters = [
    { id: 1, title: 'Number Sense & Operations', icon: '➗', time: '~25 min', status: 'active' },
    { id: 2, title: 'Algebra Basics', icon: '𝑥', time: '~25 min', status: 'locked' },
    { id: 3, title: 'Fractions & Decimals', icon: '⅘', time: '~25 min', status: 'locked' },
    { id: 4, title: 'Geometry', icon: '📐', time: '~25 min', status: 'locked' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] font-sans">
      <header className="px-8 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-slate-900 capitalize">{courseId} • Grade 8 Ontario</h1>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
          <h2 className="text-xl font-medium text-slate-700">Choose a Chapter</h2>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800 mb-1">2/8 chapters completed</p>
            <div className="w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-1/4 h-full bg-gradient-to-r from-orange-400 to-indigo-500"></div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-8">
          {chapters.map((chap, idx) => (
            <div key={chap.id} className={`min-w-[220px] p-6 rounded-3xl border ${chap.status === 'active' ? 'bg-white border-indigo-200 shadow-xl shadow-indigo-100' : 'bg-white/50 border-slate-200 opacity-70'} flex flex-col h-[320px] justify-between`}>
              <div className="text-center">
                <div className="text-4xl mb-4">{chap.icon}</div>
                <h3 className="font-bold text-lg text-slate-900 leading-tight mb-2">{chap.title}</h3>
                <p className="text-slate-500 text-sm font-medium">Easy • 10 exercises</p>
              </div>
              
              <div className="text-center mt-auto">
                <p className="text-slate-600 font-medium mb-4">{chap.time}</p>
                {chap.status === 'active' ? (
                  <Link to="/practice" className="block w-full bg-[#5B45A8] text-white font-bold py-3 px-4 rounded-xl hover:bg-indigo-800 transition shadow-md">
                    Start 10-Exercise Block
                  </Link>
                ) : (
                  <button disabled className="w-full bg-slate-200 text-slate-500 font-bold py-3 px-4 rounded-xl cursor-not-allowed">
                    Easy
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
