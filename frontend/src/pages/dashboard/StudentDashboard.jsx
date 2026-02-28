import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function StudentDashboard() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const courses = [
    { id: 'math', name: 'Math', icon: '🧮', desc: 'Algebra, Geometry, Trigonometry', frDesc: 'Algèbre, Géométrie, Trigonométrie', color: 'text-blue-600' },
    { id: 'science', name: 'Science', icon: '🧪', desc: 'Physics, Chemistry, Biology', frDesc: 'Physique, Chimie, Biologie', color: 'text-emerald-600' },
    { id: 'english', name: 'English', icon: '📖', desc: 'Grammar, Writing, Literature', frDesc: 'Grammaire, Écriture, Littérature', color: 'text-indigo-600' },
    { id: 'french', name: 'French / Français', icon: '🇫🇷', desc: 'Vocabulary, Conversation', frDesc: 'Vocabulaire, Conversation', color: 'text-red-600' },
    { id: 'history', name: 'History', icon: '🏛️', desc: 'World History, Canadian History', frDesc: 'Histoire mondiale et canadienne', color: 'text-amber-600' },
    { id: 'geography', name: 'Geography', icon: '🌍', desc: 'World Geography, Mapping', frDesc: 'Géographie mondiale, Cartographie', color: 'text-teal-600' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-slate-800">Hi <strong>Alexandre</strong> 💥 • Grade 8 Ontario</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleLanguage} className="bg-slate-100 w-12 h-6 rounded-full relative flex items-center px-1 cursor-pointer">
             <div className={`w-4 h-4 bg-indigo-600 rounded-full transition-transform ${i18n.language === 'fr' ? 'translate-x-6' : ''}`}></div>
             <span className="absolute left-7 text-[10px] font-bold text-slate-500">{i18n.language === 'fr' ? 'FR' : 'EN'}</span>
          </button>
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-lg">👦🏽</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-10 text-center">
          {i18n.language === 'en' ? 'Choose your Course' : 'Choisis ton Cours'}
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {courses.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col items-center text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">{course.icon}</span>
                <h2 className="text-2xl font-bold text-slate-900">{course.name}</h2>
              </div>
              <p className="text-slate-500 text-sm mb-6 h-10">
                {i18n.language === 'en' ? course.desc : course.frDesc}
              </p>
              <Link to={`/course/${course.id}`} className="bg-[#1E1B4B] text-white font-bold py-2.5 px-8 rounded-xl hover:bg-indigo-900 transition shadow-sm w-3/4">
                {i18n.language === 'en' ? 'Start' : 'Commencer'}
              </Link>
              <p className="text-slate-400 text-xs mt-3 font-medium">10+ exercises</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
