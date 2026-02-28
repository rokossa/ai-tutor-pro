import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CurriculumInfo() {
  const { t } = useTranslation();

  useEffect(() => { 
    document.title = "Curriculum - AI Tutor Pro"; 
  }, []);

  return (
    <div className="bg-[#F8F9FA] font-sans pb-24">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Tailored to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">their exact school.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          AI Tutor Pro dynamically aligns with 50 US States and 13 Canadian Provinces/Territories to ensure your child is practicing exactly what they will be tested on.
        </p>
        
        {/* HERO IMAGE PLACEHOLDER (Wide North America Map with glowing pins) */}
        <div className="w-full aspect-[21/9] bg-indigo-900 rounded-[2rem] shadow-2xl overflow-hidden relative flex items-center justify-center border-4 border-white">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <span className="text-indigo-200 font-mono text-sm z-10">Hero_NorthAmerica_Map.jpg</span>
        </div>
      </section>

      {/* 2. Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Dynamic Dropdown</h3>
            <p className="text-slate-600 mb-8 flex-grow">A seamless UI that lets students quickly select their exact grade and state/province to load the right standards instantly.</p>
            {/* IMAGE PLACEHOLDER */}
            <div className="w-full aspect-video bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center border-dashed">
              <span className="text-slate-400 font-mono text-sm">UI_Dropdown_Selector.png</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Chapter & Exercise View</h3>
            <p className="text-slate-600 mb-8 flex-grow">Structured learning paths. Students complete 10-exercise blocks to master specific concepts sequentially.</p>
            {/* IMAGE PLACEHOLDER */}
            <div className="w-full aspect-video bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center border-dashed">
              <span className="text-slate-400 font-mono text-sm">UI_Chapter_SplitView.png</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Difficulty Progression</h3>
            <p className="text-slate-600 mb-8 flex-grow">The AI automatically scales difficulty from Easy to Hard as the student demonstrates mastery, unlocking badges along the way.</p>
            {/* IMAGE PLACEHOLDER */}
            <div className="w-full aspect-video bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center border-dashed">
              <span className="text-slate-400 font-mono text-sm">Timeline_Difficulty.png</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-[#1E1B4B] p-8 rounded-3xl shadow-xl flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
            <h3 className="text-2xl font-bold text-white mb-3 z-10">Full Coverage</h3>
            <p className="text-indigo-200 mb-8 flex-grow z-10">Whether it's the Ontario OSSD or Texas TEKS, our AI generates highly accurate localized content.</p>
            {/* IMAGE PLACEHOLDER */}
            <div className="w-full aspect-video bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center border-dashed backdrop-blur-sm z-10">
              <span className="text-indigo-300 font-mono text-sm">Diverse_Students_Map.jpg</span>
            </div>
          </div>

        </div>
      </section>
      
      {/* Final CTA */}
      <div className="text-center pt-8">
         <Link to="/register" className="inline-block bg-[#4338CA] text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:bg-indigo-800 transition text-lg">
           Start 14-Day Free Trial
         </Link>
      </div>

    </div>
  );
}
