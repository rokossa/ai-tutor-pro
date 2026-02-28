import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  
  useEffect(() => { 
    document.title = t('about.seoTitle') || "How it Works - AI Tutor Pro"; 
  }, [t]);

  return (
    <div className="bg-[#F8F9FA] font-sans pb-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A1A1A] tracking-tight mb-6 max-w-4xl mx-auto">
          {t('about.headline')}
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('about.body')}
        </p>
        <div className="relative max-w-5xl mx-auto aspect-video rounded-[2rem] shadow-2xl overflow-hidden border-8 border-white bg-slate-200">
          <img src="/images/hero-desk.jpg" alt="Student learning with AI" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/1200x675?text=hero-desk.jpg'} />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-16">How AI Tutor Pro Works</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-full aspect-square bg-white rounded-3xl shadow-lg border border-slate-100 mb-6 overflow-hidden">
               <img src="/images/step1-curriculum.png" alt="Choose Curriculum" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/600x600?text=step1-curriculum.png'} />
            </div>
            <div className="w-10 h-10 bg-[#4338CA] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-md">1</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Choose Curriculum</h3>
            <p className="text-slate-600">Instantly align the AI to your exact province or state standards.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-full aspect-square bg-white rounded-3xl shadow-lg border border-slate-100 mb-6 overflow-hidden">
               <img src="/images/step2-practice.png" alt="Practice Session" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/600x600?text=step2-practice.png'} />
            </div>
            <div className="w-10 h-10 bg-[#4338CA] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-md">2</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Practice Session</h3>
            <p className="text-slate-600">Solve sequential blocks of 10 exercises with warm, step-by-step guidance.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-full aspect-square bg-white rounded-3xl shadow-lg border border-slate-100 mb-6 overflow-hidden">
               <img src="/images/step3-parents.png" alt="Weekly Progress" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/600x600?text=step3-parents.png'} />
            </div>
            <div className="w-10 h-10 bg-[#4338CA] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-md">3</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Weekly Progress</h3>
            <p className="text-slate-600">Receive detailed PDF reports and track mastery without looking over their shoulder.</p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1E1B4B] rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
          <div className="flex-1 z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">Ready to see them succeed?</h2>
            <p className="text-indigo-200 mb-8 text-lg">Join thousands of families building confidence and mastering math, science, and languages.</p>
            <Link to="/register" className="inline-block bg-white text-[#1E1B4B] font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-50 transition text-lg">Start 14-Day Free Trial</Link>
          </div>
          <div className="flex-1 w-full z-10">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-white/20">
               <img src="/images/final-highfive.jpg" alt="Student success" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://placehold.co/800x450?text=final-highfive.jpg'} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
