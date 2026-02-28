import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CurriculumInfo() {
  useEffect(() => { document.title = "Curriculum - AI Tutor Pro"; }, []);

  return (
    <div className="bg-[#F8F9FA] font-sans pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          Tailored to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">their exact school.</span>
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          AI Tutor Pro dynamically aligns with 50 US States and 13 Canadian Provinces/Territories to ensure your child is practicing exactly what they will be tested on.
        </p>
        <div className="w-full aspect-[21/9] rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white bg-indigo-900 relative">
          <img src="/images/hero-northamerica-map.jpg" alt="North America Curriculum Map" className="w-full h-full object-cover absolute inset-0 mix-blend-screen opacity-80" onError={(e) => e.target.src = 'https://placehold.co/1600x700?text=hero-northamerica-map.jpg'} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B]/80 to-transparent"></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Dynamic Dropdown</h3>
            <p className="text-slate-600 mb-8 flex-grow">A seamless UI that lets students quickly select their exact grade and state/province to load the right standards instantly.</p>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <img src="/images/ui-dropdown-selector.png" alt="Curriculum Selector" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/800x450?text=ui-dropdown-selector.png'} />
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Chapter & Exercise View</h3>
            <p className="text-slate-600 mb-8 flex-grow">Structured learning paths. Students complete 10-exercise blocks to master specific concepts sequentially.</p>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <img src="/images/ui-chapter-splitview.png" alt="Chapter Selection" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/800x450?text=ui-chapter-splitview.png'} />
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col h-full">
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Difficulty Progression</h3>
            <p className="text-slate-600 mb-8 flex-grow">The AI automatically scales difficulty from Easy to Hard as the student demonstrates mastery, unlocking badges along the way.</p>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <img src="/images/timeline-difficulty.png" alt="Difficulty Timeline" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/800x450?text=timeline-difficulty.png'} />
            </div>
          </div>
          <div className="bg-[#1E1B4B] p-8 rounded-3xl shadow-xl flex flex-col h-full relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-3 z-10">Full Coverage</h3>
            <p className="text-indigo-200 mb-8 flex-grow z-10">Whether it's the Ontario OSSD or Texas TEKS, our AI generates highly accurate localized content.</p>
            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-lg z-10">
              <img src="/images/diverse-students-map.jpg" alt="Students studying" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/800x450?text=diverse-students-map.jpg'} />
            </div>
          </div>
        </div>
      </section>
      
      <div className="text-center pt-8">
         <Link to="/register" className="inline-block bg-[#4338CA] text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:bg-indigo-800 transition text-lg">
           Start 14-Day Free Trial
         </Link>
      </div>
    </div>
  );
}
