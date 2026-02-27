import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function OnboardingFlow() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [region, setRegion] = useState('Ontario');

  const northAmericanRegions = [
    // Canada
    "Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
    // US (Major)
    "California", "Florida", "Illinois", "New York", "Texas"
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/practice');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 selection:bg-blue-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="flex h-2 bg-slate-100">
          <div className={`bg-blue-600 transition-all duration-500 ease-in-out ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>

        <div className="p-10">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{t('step1_title')}</h2>
              <p className="text-slate-500 mb-8 text-lg">We map exactly to your local school board's curriculum.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t('region')}</label>
                  <select 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 bg-slate-50"
                  >
                    {northAmericanRegions.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                {/* Grade and Program selectors remain here... */}
                <button onClick={handleNext} className="w-full bg-slate-900 text-white font-bold py-3 rounded-full hover:bg-slate-800 transition shadow-md mt-6">Continue →</button>
              </div>
            </div>
          )}
          
          {step === 2 && (
             <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h2 className="text-3xl font-extrabold text-slate-900 mb-4">The 15-Minute Rule</h2>
               <button onClick={handleNext} className="mt-8 bg-slate-900 text-white font-bold py-3 px-10 rounded-full hover:bg-slate-800 transition shadow-md">Continue →</button>
             </div>
          )}

          {step === 3 && (
             <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
               <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Enter Practice Arena</h2>
               <button onClick={handleNext} className="mt-8 bg-blue-600 text-white font-bold py-3 px-10 rounded-full hover:bg-blue-700 transition shadow-md">Start Learning</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
