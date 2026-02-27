import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/layout/Navbar';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <Navbar />
      
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
          Master your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">local curriculum</span> with AI.
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
          Stop struggling with generic tutorials. Our multimodal AI instantly generates practice problems mapped exactly to your school board's standards.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/onboarding" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-200 shadow-xl shadow-blue-600/20">
            {t('start_trial')}
          </Link>
          <button className="bg-white text-slate-700 font-bold py-4 px-8 rounded-full text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition duration-200 shadow-sm">
            See How It Works
          </button>
        </div>
      </main>

      {/* Feature Section with UI Mockup */}
      <section id="features" className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Personalized to their passions.</h2>
              <p className="text-lg text-slate-600 mb-6">
                If your child struggles to focus on standard textbook questions, we change the game. Our AI dynamically rewrites complex concepts using their interests. 
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">✓</div>
                  Master Grade 8 Math through basketball word problems.
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">✓</div>
                  Prep for university sciences with interactive diagrams.
                </li>
              </ul>
            </div>
            
            {/* Fake UI Element for Visual Appeal */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-lg relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
               <div className="flex justify-between items-center mb-4">
                 <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Ontario • Grade 8 Math</span>
                 <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">The 15-Min Rule</span>
               </div>
               <p className="text-slate-800 font-medium mb-4">
                 Alexandre is practicing free throws. If he makes 18 out of 24 shots, what is his shooting percentage? Express your answer as a simplified fraction.
               </p>
               <div className="w-full bg-white border border-slate-300 rounded p-3 text-slate-500 font-mono text-sm">
                 <span className="text-blue-500">3/4</span> = 75%
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Trusted by parents who want results.</h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative">
            <p className="text-xl text-slate-700 italic mb-6">
              "My son used to dread homework. Now he logs in for his 15 minutes of AI practice right before basketball. His grades have completely turned around, and the Friday progress emails give me total peace of mind."
            </p>
            <div className="font-bold text-slate-900">Sarah T.</div>
            <div className="text-slate-500 text-sm">Parent from Oakville, ON</div>
          </div>
        </div>
      </section>
    </div>
  );
}
