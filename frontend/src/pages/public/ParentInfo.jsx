import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ParentInfo() {
  const { t } = useTranslation();

  useEffect(() => { 
    document.title = "For Parents - AI Tutor Pro"; 
  }, []);

  return (
    <div className="bg-[#F8F9FA] font-sans pb-24 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Stay in the loop, <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">without hovering.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Get weekly insights, monitor emotional well-being, and collaborate with real tutors—all from one beautiful dashboard.
            </p>
            <Link to="/register" className="inline-block bg-[#1E1B4B] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-900 transition text-lg">
              Start 14-Day Free Trial
            </Link>
          </div>
          <div className="flex-1 w-full z-10">
            {/* HERO IMAGE PLACEHOLDER (16:9, Mother hugging son looking at dashboard) */}
            <div className="aspect-video bg-indigo-50 rounded-3xl border-8 border-white shadow-2xl flex items-center justify-center border-dashed relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10"></div>
               <span className="text-indigo-400 font-mono text-sm font-bold z-10">Parent_Hero_Hug.jpg</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Alternating Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-32">
        
        {/* Benefit 1: Weekly Reports */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 order-2 md:order-1 w-full">
            {/* IMAGE PLACEHOLDER: Phone showing HTML email on desk */}
            <div className="aspect-square md:aspect-video bg-white rounded-3xl border border-slate-200 shadow-xl flex items-center justify-center p-4">
              <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center border-dashed">
                <span className="text-slate-400 font-mono text-sm">Weekly_Report_Phone.jpg</span>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Detailed Weekly Reports</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Every Friday afternoon, receive a beautifully formatted PDF directly to your inbox. Track exactly which concepts they mastered, where they struggled, and how their confidence is growing.
            </p>
          </div>
        </div>

        {/* Benefit 2: Peace of Mind */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Total Peace of Mind</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Stop fighting over homework. AI Tutor Pro uses empathetic, encouraging language that never makes a child feel "wrong." You get to relax on the couch knowing the learning is actually happening.
            </p>
          </div>
          <div className="flex-1 w-full">
            {/* IMAGE PLACEHOLDER: Relaxed dad on couch holding phone */}
            <div className="aspect-square md:aspect-video bg-white rounded-3xl border border-slate-200 shadow-xl flex items-center justify-center p-4">
              <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center border-dashed">
                <span className="text-slate-400 font-mono text-sm">Relaxed_Dad_Couch.jpg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefit 3: Real Tutor Collaboration */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 order-2 md:order-1 w-full">
            {/* IMAGE PLACEHOLDER: Tutor and parent looking at laptop */}
            <div className="aspect-square md:aspect-video bg-white rounded-3xl border border-slate-200 shadow-xl flex items-center justify-center p-4">
              <div className="w-full h-full bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center border-dashed">
                <span className="text-slate-400 font-mono text-sm">Tutor_Collaboration.jpg</span>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Real Tutor Collaboration</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Already have a human tutor? Perfect. Invite them to your child's dashboard with one click. They can view progress, leave private notes, and use Gemini AI to generate custom curriculum targeted at your child's exact weaknesses.
            </p>
          </div>
        </div>

      </section>

      {/* 3. Trust Badge Section */}
      <section className="bg-white border-y border-slate-200 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-10">Trusted by families everywhere</h3>
          {/* IMAGE PLACEHOLDER: Collage of diverse happy parents */}
          <div className="w-full max-w-4xl mx-auto h-64 bg-slate-50 rounded-3xl border border-slate-200 flex items-center justify-center border-dashed">
             <span className="text-slate-400 font-mono text-sm">Parents_Trust_Collage.jpg</span>
          </div>
        </div>
      </section>

    </div>
  );
}
