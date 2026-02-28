import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Pricing() {
  const { t } = useTranslation();

  useEffect(() => { document.title = t('pricing.seoTitle'); }, [t]);

  return (
    <div className="bg-[#F8F9FA] py-24 px-4 sm:px-6 lg:px-8 font-sans min-h-[80vh]">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-12">{t('pricing.headline')}</h1>
        
        <div className="bg-white rounded-[2rem] p-10 border-2 border-[#4338CA] shadow-2xl relative max-w-lg mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{t('pricing.planName')}</h3>
          <div className="text-4xl font-black text-[#4338CA] mb-8">{t('pricing.price')}</div>
          
          <ul className="space-y-4 mb-10 text-left text-slate-700 font-medium">
            {t('pricing.features', { returnObjects: true }).map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <Link to="/register" className="w-full block py-4 rounded-xl font-bold text-white bg-[#4338CA] hover:bg-indigo-800 transition shadow-lg text-lg">
            {t('pricing.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
