import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ParentInfo() {
  const { t } = useTranslation();
  return (
    <div className="py-24 px-8 max-w-4xl mx-auto min-h-[60vh] font-sans text-center">
      <div className="text-6xl mb-6">👨‍👩‍👦</div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">{t('common.forParents')}</h1>
      <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        Stay fully in the loop with weekly PDF reports, detailed skill breakdown dashboards, and total control over your child's learning journey.
      </p>
      <Link to="/register" className="bg-[#4338CA] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-800 transition">
        {t('common.startFreeTrial')}
      </Link>
    </div>
  );
}
