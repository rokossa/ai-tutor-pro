import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/layout/Navbar';

export default function LandingPage() {
  const { t } = useTranslation();

  const curriculums = [
    { name: 'Ontario (OSSD)', id: 'ontario' },
    { name: 'Quebec (QEP)', id: 'quebec' },
    { name: 'Texas (TEKS)', id: 'texas' },
    { name: 'IB Diploma', id: 'ib' },
    { name: 'AP Program', id: 'ap' },
    { name: 'California (CCSS)', id: 'california' },
    { name: 'New York (NYSED)', id: 'newyork' },
    { name: 'BC (Dogwood)', id: 'bc' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <Navbar />
      
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
          {t('hero_title')}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t('hero_highlight')}</span>
          {t('hero_suffix')}
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
          {t('hero_sub')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/onboarding" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-600/20">
            {t('start_trial')}
          </Link>
          <a href="#pricing" className="bg-white text-slate-700 font-bold py-4 px-8 rounded-full text-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition shadow-sm">
            View Pricing
          </a>
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
                  Master Grade 8 Math through real-world scenarios.
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">✓</div>
                  Prep for university sciences with step-by-step logic.
                </li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-lg relative overflow-hidden transform hover:-translate-y-1 transition duration-300">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
               <div className="flex justify-between items-center mb-4">
                 <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Ontario • Grade 8 Math</span>
                 <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">The 15-Min Rule</span>
               </div>
               <p className="text-slate-800 font-medium mb-4">
                 You are practicing free throws. If you make 18 out of 24 shots, what is your shooting percentage? Express your answer as a simplified fraction.
               </p>
               <div className="w-full bg-white border border-slate-300 rounded p-3 text-slate-500 font-mono text-sm">
                 <span className="text-blue-500">3/4</span> = 75%
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('curriculum_title')}</h2>
          <p className="text-slate-600 mb-10 max-w-2xl mx-auto">Click on your region to see exactly how our AI evaluates and grades according to your local school board's standards.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {curriculums.map(curr => (
              <Link 
                key={curr.id} 
                to={`/curriculum/${curr.id}`} 
                className="p-5 bg-white border border-slate-200 rounded-xl text-slate-800 font-bold shadow-sm hover:border-blue-500 hover:shadow-md hover:text-blue-600 transition block"
              >
                {curr.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('pricing_title')}</h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto">{t('pricing_sub')}</p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Tier */}
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-left hover:border-slate-600 transition">
              <h3 className="text-xl font-bold text-slate-300">Monthly</h3>
              <div className="my-4"><span className="text-5xl font-extrabold">$19.99</span> <span className="text-slate-400">/mo</span></div>
              <ul className="space-y-3 mb-8 text-slate-300">
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 14-Day Free Trial</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Unlimited AI Practice</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Bilingual Feedback (EN/FR)</li>
                <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Weekly Progress Emails</li>
              </ul>
              <Link to="/onboarding" className="block text-center bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-slate-200 transition">Start Free Trial</Link>
            </div>
            
            {/* Annual Tier */}
            <div className="bg-gradient-to-b from-blue-600 to-indigo-700 p-8 rounded-2xl border border-blue-400 text-left shadow-2xl relative transform md:-translate-y-4">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Save 25%</div>
              <h3 className="text-xl font-bold text-blue-100">Annual</h3>
              <div className="my-4"><span className="text-5xl font-extrabold text-white">$179</span> <span className="text-blue-200">/yr</span></div>
              <ul className="space-y-3 mb-8 text-blue-50">
                <li className="flex items-center gap-2"><span className="text-blue-300">✓</span> All Monthly Features</li>
                <li className="flex items-center gap-2"><span className="text-blue-300">✓</span> Z-Score Peer Ranking</li>
                <li className="flex items-center gap-2"><span className="text-blue-300">✓</span> Priority Support</li>
                <li className="flex items-center gap-2"><span className="text-blue-300">✓</span> Access to AP/IB Tracks</li>
              </ul>
              <Link to="/onboarding" className="block text-center bg-white text-blue-900 font-bold py-3 rounded-lg hover:bg-blue-50 transition shadow-lg">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Simple Footer */}
      <footer className="bg-slate-950 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 AI Tutor Pro. All rights reserved.</p>
      </footer>
    </div>
  );
}
