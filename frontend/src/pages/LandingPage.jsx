import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('marketing.seoTitle');
  }, [t]);

  return (
    <div className="bg-[#F8F9FA] font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A1A1A] tracking-tight mb-6 leading-tight">
            {t('marketing.heroHeadline')}
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0">
            {t('marketing.heroSub')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
            <Link to="/register" className="bg-[#1E1B4B] text-white font-bold py-4 px-8 rounded-xl text-lg hover:bg-indigo-900 transition shadow-lg w-full sm:w-auto text-center">
              {t('marketing.startTrial')}
            </Link>
            <button className="text-[#1E1B4B] font-bold py-4 px-8 rounded-xl text-lg hover:bg-slate-100 transition flex items-center justify-center gap-2 w-full sm:w-auto">
              {t('marketing.watchDemo')} <span className="text-xl">›</span>
            </button>
          </div>
          <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100 text-sm font-medium text-slate-600 inline-block text-left">
            <div className="flex items-center gap-2 mb-2"><span className="text-amber-400">⭐ 4.98/5</span> {t('marketing.trusted')}</div>
            <div className="text-xs text-slate-500 italic">{t('marketing.testimonial')}</div>
          </div>
          <p className="text-xs text-slate-400 mt-6 uppercase tracking-widest font-bold">{t('marketing.curriculum')}</p>
        </div>
        <div className="flex-1 w-full max-w-2xl relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 to-purple-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" alt="Student learning" className="rounded-2xl shadow-2xl border-4 border-white" />
        </div>
      </main>
    </div>
  );
}
