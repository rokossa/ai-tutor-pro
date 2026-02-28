import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CurriculumInfo() {
  const { t } = useTranslation();
  return (
    <div className="py-24 px-8 max-w-4xl mx-auto min-h-[60vh] font-sans text-center">
      <div className="text-6xl mb-6">📚</div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">{t('common.curriculum')}</h1>
      <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        AI Tutor Pro dynamically adapts to 50 US States and 13 Canadian Provinces to ensure your child is learning exactly what they need for school.
      </p>
      <Link to="/register" className="bg-[#4338CA] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-indigo-800 transition">
        {t('common.startFreeTrial')}
      </Link>
    </div>
  );
}
