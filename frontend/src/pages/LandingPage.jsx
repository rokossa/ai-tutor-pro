import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">{t('welcome')}</h1>
        <p className="text-xl text-slate-600 mb-8">
          Personalized AI tutoring for your exact local curriculum. Practice smarter, not harder.
        </p>
        <Link 
          to="/onboarding" 
          className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-200 shadow-lg"
        >
          {t('start_trial')}
        </Link>
      </div>
    </div>
  );
}
