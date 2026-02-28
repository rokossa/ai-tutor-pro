import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-24 px-4 max-w-md mx-auto min-h-[80vh] font-sans">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8 text-center">{t('contact.headline')}</h1>
      
      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center animate-in zoom-in">
          <div className="text-4xl mb-4">💚</div>
          <p className="text-lg font-bold text-emerald-800">{t('contact.success')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
          <input type="text" placeholder={t('contact.formName')} required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#4338CA]" />
          <input type="email" placeholder={t('contact.formEmail')} required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#4338CA]" />
          <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#4338CA]">
            <option value="">{t('contact.formRole')}</option>
            <option value="parent">{t('contact.roleParent')}</option>
            <option value="student">{t('contact.roleStudent')}</option>
            <option value="tutor">{t('contact.roleTutor')}</option>
          </select>
          <textarea placeholder={t('contact.formMessage')} required className="w-full p-4 h-32 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#4338CA] resize-none"></textarea>
          <button type="submit" className="w-full bg-[#1E1B4B] text-white font-bold py-4 rounded-xl hover:bg-indigo-900 transition shadow-md">
            {t('contact.submit')}
          </button>
        </form>
      )}
    </div>
  );
}
