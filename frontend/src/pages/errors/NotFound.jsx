import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center font-sans">
      <div className="text-8xl mb-6">🛸</div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{t('errors.404Headline')}</h1>
      <p className="text-slate-500 text-lg mb-8 max-w-md">{t('errors.404Body')}</p>
      <Link to="/" className="bg-[#4338CA] text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-800 transition shadow-md">
        Take me home
      </Link>
    </div>
  );
}
