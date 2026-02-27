import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [region, setRegion] = useState('Ontario');
  const [grade, setGrade] = useState('8');
  const [track, setTrack] = useState('Regular');

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/practice'); // In a real app, you'd save the profile here first
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 selection:bg-blue-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Progress Indicator */}
        <div className="flex h-2 bg-slate-100">
          <div className={`bg-blue-600 transition-all duration-500 ease-in-out ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>

        <div className="p-10">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Let's personalize your learning.</h2>
              <p className="text-slate-500 mb-8 text-lg">We map exactly to your local school board's curriculum.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Region</label>
                  <select 
                    value={region} 
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50"
                  >
                    <option value="Ontario">Ontario, Canada</option>
                    <option value="Quebec">Quebec, Canada</option>
                    <option value="Texas">Texas, USA</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Grade Level</label>
                    <select 
                      value={grade} 
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 bg-slate-50"
                    >
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Program</label>
                    <select 
                      value={track} 
                      onChange={(e) => setTrack(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 bg-slate-50"
                    >
                      <option value="Regular">Regular</option>
                      <option value="AP">Advanced Placement (AP)</option>
                      <option value="IB">International Baccalaureate (IB)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                <span className="text-4xl">⏱️</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">The 15-Minute Rule</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Don't burn out. Just give us 15 focused minutes a day. Our AI dynamically targets weaknesses to ensure maximum retention in minimum time.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                <span className="text-4xl">🤝</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Learn Better Together</h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Your account is ready. Invite a classmate to practice with you, and you both get an extra month free when you subscribe!
              </p>
              <button className="w-full bg-[#1877f2] text-white font-bold py-4 px-4 rounded-xl hover:bg-blue-700 transition duration-200 shadow-lg flex items-center justify-center gap-3">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Share on Facebook
              </button>
            </div>
          )}

          <div className="mt-10 flex justify-end">
            <button 
              onClick={handleNext}
              className="bg-slate-900 text-white font-bold py-3 px-10 rounded-full hover:bg-slate-800 transition duration-200 shadow-md flex items-center gap-2"
            >
              {step === 3 ? "Enter Practice Arena" : "Continue"}
              {step < 3 && <span className="text-xl">→</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
