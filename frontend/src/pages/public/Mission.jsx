import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Mission() {
  const { t } = useTranslation();

  return (
    <div className="py-24 px-8 max-w-3xl mx-auto min-h-[70vh] font-sans text-center">
      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-8">🚀</div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{t('mission.headline')}</h1>
      <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl text-2xl font-medium text-slate-700 leading-relaxed shadow-sm">
        "{t('mission.core')}"
      </div>
    </div>
  );
}
