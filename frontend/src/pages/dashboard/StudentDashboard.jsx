import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ChevronRight, GraduationCap, Atom, Languages, Calculator, History } from 'lucide-react';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState('subjects'); // 'subjects' or 'chapters'
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Structured Grade 8 Curriculum Map
  const curriculum = {
    mathematics: {
      icon: <Calculator className="text-blue-500" size={40} />,
      chapters: ["Linear Equations", "Square Roots & Pythagoras", "Fractions & Decimals", "Probability", "Geometry"]
    },
    sciences: {
      icon: <Atom className="text-emerald-500" size={40} />,
      chapters: ["Cells & Systems", "Fluids", "Water Systems", "Optics"]
    },
    french: {
      icon: <Languages className="text-rose-500" size={40} />,
      chapters: ["Grammaire", "Vocabulaire", "Compréhension de lecture", "Expression Écrite"]
    },
    history: {
      icon: <History className="text-amber-500" size={40} />,
      chapters: ["Confederation", "The Development of Western Canada", "Canada's Changing Society"]
    }
  };

  const handleSubjectClick = (subKey) => {
    setSelectedSubject({ key: subKey, ...curriculum[subKey] });
    setView('chapters');
  };

  return (
    <div className="min-h-screen bg-[#Eef0f4] p-4 sm:p-8 font-sans flex justify-center">
      <div className="max-w-5xl w-full bg-[#F4F6FA] rounded-[40px] p-8 sm:p-12 shadow-2xl border border-white/50">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">D</div>
             <span className="font-black text-2xl text-slate-900 tracking-tighter">Didakt</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-slate-800">Hi Alexandre ✨</span>
            <div className="bg-[#14b8a6] text-white font-bold px-4 py-1.5 rounded-full shadow-sm text-sm uppercase tracking-widest">
              7 Day Streak
            </div>
          </div>
        </div>

        {view === 'subjects' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Grade 8 Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {Object.keys(curriculum).map((key) => (
                <div 
                  key={key} 
                  onClick={() => handleSubjectClick(key)}
                  className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer hover:-translate-y-1 hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white transition">
                      {curriculum[key].icon}
                    </div>
                    <span className="text-2xl font-bold text-slate-800 capitalize">{key}</span>
                  </div>
                  <ChevronRight className="text-slate-300 group-hover:text-slate-900 transition" size={28} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <button 
              onClick={() => setView('subjects')}
              className="mb-6 text-slate-400 font-bold flex items-center gap-2 hover:text-slate-900 transition"
            >
              &larr; Back to Topics
            </button>
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                 {selectedSubject.icon}
               </div>
               <h2 className="text-3xl font-black text-slate-900 capitalize">{selectedSubject.key} Curriculum</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {selectedSubject.chapters.map((chapter, idx) => (
                <div 
                  key={idx}
                  onClick={() => navigate(`/practice/${selectedSubject.key}/${chapter.toLowerCase().replace(/ /g, '-')}`)}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between cursor-pointer hover:border-[#4338CA] transition group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-indigo-50 text-[#4338CA] rounded-full flex items-center justify-center text-xs font-black">
                      {idx + 1}
                    </div>
                    <span className="font-bold text-slate-700 text-lg">{chapter}</span>
                  </div>
                  <button className="bg-[#4338CA] text-white font-bold px-6 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition shadow-md">
                    Start Exercise
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
