import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <Link to="/" className="text-xl font-bold text-slate-900 tracking-tight">AI Tutor Pro</Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition">{t('nav_features')}</a>
            <a href="#curriculum" className="text-slate-600 hover:text-blue-600 font-medium transition">{t('nav_curriculum')}</a>
            <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium transition">{t('nav_pricing')}</a>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="text-sm font-bold text-slate-500 hover:text-blue-600 transition px-2"
            >
              {i18n.language === 'en' ? 'FR' : 'EN'}
            </button>
            <Link to="/onboarding" className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition shadow-sm">
              {t('start_trial')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
