import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  
  useEffect(() => { document.title = t('about.seoTitle'); }, [t]);

  return (
    <div className="py-24 px-8 max-w-3xl mx-auto min-h-[70vh] font-sans text-center">
      <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-8">👨‍👩‍👦</div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{t('about.headline')}</h1>
      <p className="text-xl text-slate-600 leading-relaxed">{t('about.body')}</p>
    </div>
  );
}
