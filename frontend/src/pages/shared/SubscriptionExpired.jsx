import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SubscriptionExpired() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 text-center font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 max-w-md w-full">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">🔒</div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{t('errors.paywallHeadline')}</h1>
        <p className="text-slate-600 mb-8">{t('errors.paywallBody')}</p>
        <button className="w-full bg-[#4338CA] text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-800 transition shadow-lg text-lg">
          {t('pricing.cta')}
        </button>
      </div>
    </div>
  );
}
