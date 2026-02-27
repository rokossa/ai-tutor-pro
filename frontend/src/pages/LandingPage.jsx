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
          {t('hero_title')}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t('hero_highlight')}</span>
          {t('hero_suffix')}
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
          {t('hero_sub')}
        </p>
        <Link to="/onboarding" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-600/20">
          {t('start_trial')}
        </Link>
      </main>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('curriculum_title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {['Ontario (OSSD)', 'Quebec (QEP)', 'Texas (TEKS)', 'California (CCSS)', 'IB Diploma', 'AP Program', 'New York (NYSED)', 'BC (Dogwood)'].map(curr => (
              <div key={curr} className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium shadow-sm hover:border-blue-400 transition cursor-default">
                {curr}
              </div>
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
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-left">
              <h3 className="text-xl font-bold text-slate-300">Monthly</h3>
              <div className="my-4"><span className="text-5xl font-extrabold">$19.99</span> <span className="text-slate-400">/mo</span></div>
              <ul className="space-y-3 mb-8 text-slate-300">
                <li>✓ 14-Day Free Trial</li>
                <li>✓ Unlimited AI Practice</li>
                <li>✓ Bilingual Feedback</li>
                <li>✓ Weekly Progress Emails</li>
              </ul>
              <Link to="/onboarding" className="block text-center bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-slate-200 transition">Start Free Trial</Link>
            </div>
            
            {/* Annual Tier */}
            <div className="bg-gradient-to-b from-blue-600 to-indigo-700 p-8 rounded-2xl border border-blue-500 text-left shadow-2xl relative">
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Save 25%</div>
              <h3 className="text-xl font-bold text-blue-100">Annual</h3>
              <div className="my-4"><span className="text-5xl font-extrabold text-white">$179</span> <span className="text-blue-200">/yr</span></div>
              <ul className="space-y-3 mb-8 text-blue-50">
                <li>✓ All Monthly Features</li>
                <li>✓ Z-Score Peer Ranking</li>
                <li>✓ Priority Support</li>
                <li>✓ Access to AP/IB Tracks</li>
              </ul>
              <Link to="/onboarding" className="block text-center bg-white text-blue-900 font-bold py-3 rounded-lg hover:bg-blue-50 transition shadow-lg">Start Free Trial</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
