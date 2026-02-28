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
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A1A1A] tracking-tight mb-6 max-w-4xl mx-auto">
          {t('about.headline') || "We believe every child deserves an encouraging tutor"}
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('about.body') || "Founded by parents and educators who watched their own children struggle with generic AI tools. We built AI Tutor Pro to feel human — warm, patient, and perfectly matched to your local curriculum."}
        </p>
        
        {/* HERO IMAGE PLACEHOLDER (16:9, Ultra-realistic 13yo boy at modern desk) */}
        <div className="relative max-w-5xl mx-auto aspect-video rounded-[2rem] shadow-2xl overflow-hidden border-8 border-white bg-slate-200 flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 mix-blend-overlay"></div>
          <span className="text-slate-400 font-mono text-sm">Drop Hero_Desk_Shot.jpg here</span>
        </div>
      </section>

      {/* 2. Step-by-Step Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-16">How AI Tutor Pro Works</h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-full aspect-square bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center mb-6 overflow-hidden p-4">
               {/* IMAGE PLACEHOLDER: Clean flat 3D girl selecting curriculum */}
               <div className="w-full h-full bg-indigo-50 rounded-2xl border border-indigo-100 flex items-center justify-center border-dashed">
                 <span className="text-indigo-300 text-xs font-mono">Step1_Curriculum.png</span>
               </div>
            </div>
            <div className="w-10 h-10 bg-[#4338CA] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-md">1</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Choose Curriculum</h3>
            <p className="text-slate-600">Instantly align the AI to your exact province or state standards.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-full aspect-square bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center mb-6 overflow-hidden p-4">
               {/* IMAGE PLACEHOLDER: Split-screen Practice Session */}
               <div className="w-full h-full bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-center border-dashed">
                 <span className="text-purple-300 text-xs font-mono">Step2_Practice.png</span>
               </div>
            </div>
            <div className="w-10 h-10 bg-[#4338CA] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-md">2</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Practice Session</h3>
            <p className="text-slate-600">Solve sequential blocks of 10 exercises with warm, step-by-step guidance.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="w-full aspect-square bg-white rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center mb-6 overflow-hidden p-4">
               {/* IMAGE PLACEHOLDER: Mother and father looking at progress */}
               <div className="w-full h-full bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center border-dashed">
                 <span className="text-emerald-300 text-xs font-mono">Step3_Parents.png</span>
               </div>
            </div>
            <div className="w-10 h-10 bg-[#4338CA] text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-md">3</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Weekly Progress</h3>
            <p className="text-slate-600">Receive detailed PDF reports and track mastery without looking over their shoulder.</p>
          </div>
        </div>
      </section>

      {/* 3. Final Result CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1E1B4B] rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
          
          <div className="flex-1 z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
              Ready to see them succeed?
            </h2>
            <p className="text-indigo-200 mb-8 text-lg">
              Join thousands of families building confidence and mastering math, science, and languages.
            </p>
            <Link to="/register" className="inline-block bg-white text-[#1E1B4B] font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-50 transition text-lg">
              Start 14-Day Free Trial
            </Link>
          </div>
          
          <div className="flex-1 w-full z-10">
            {/* FINAL IMAGE PLACEHOLDER: Confident girl high-fiving AI */}
            <div className="aspect-video bg-white/10 rounded-2xl border border-white/20 backdrop-blur-sm flex items-center justify-center overflow-hidden">
               <span className="text-indigo-200 font-mono text-sm">Final_HighFive.jpg</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
