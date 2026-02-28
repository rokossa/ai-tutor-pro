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
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4338CA] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">AI Tutor Pro</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-slate-600 hover:text-[#4338CA] font-medium transition">How it works</Link>
            <Link to="/pricing" className="text-slate-600 hover:text-[#4338CA] font-medium transition">Pricing</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleLanguage} className="text-sm font-bold text-slate-500 hover:text-[#4338CA] transition px-2">
              {i18n.language === 'en' ? 'FR' : 'EN'}
            </button>
            <Link to="/login" className="text-slate-600 hover:text-[#4338CA] font-medium transition hidden sm:block">
              {t('common.login')}
            </Link>
            <Link to="/register" className="bg-[#1E1B4B] text-white px-5 py-2 rounded-xl font-bold hover:bg-indigo-900 transition shadow-sm">
              {t('common.register')}
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}
