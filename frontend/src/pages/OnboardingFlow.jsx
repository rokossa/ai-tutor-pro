import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [childData, setChildData] = useState({
    name: 'Alexandre', // Defaulting to your son for the demo!
    email: '',
    country: 'Canada',
    region: 'Ontario',
    grade: '8th Grade'
  });

  const handleNext = () => setStep(step + 1);
  
  const finishOnboarding = () => {
    navigate('/dashboard/parent');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col items-center justify-center p-4 font-sans">
      
      {/* Brand Header */}
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <span className="text-xl font-bold text-slate-900">AI Tutor Pro</span>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative">
        
        {/* Progress Bar (Visible on Steps 1 & 2) */}
        {step <= 2 && (
          <div className="px-10 pt-10">
            <div className="flex justify-between text-sm font-bold text-slate-800 mb-2">
              <span>Step {step} of 3 {step === 2 && "- Add your child"}</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full bg-[#4F46E5] transition-all duration-500 ${step === 1 ? 'w-1/3' : 'w-2/3'}`}></div>
            </div>
          </div>
        )}

        <div className="p-10">
          
          {/* STEP 1: Welcome & Trial Setup */}
          {step === 1 && (
            <div className="text-center animate-in fade-in slide-in-from-bottom-4">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Welcome to AI Tutor Pro, David! ✨</h2>
              <p className="text-slate-500 text-lg mb-8">In 60 seconds we'll set up your child's personal AI tutor that actually cares</p>
              
              <div className="w-48 h-48 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-8 border-8 border-white shadow-inner">
                <span className="text-7xl">🤖</span>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <p className="text-slate-700 font-medium mb-6">Your child deserves an encouraging tutor who knows their exact local curriculum.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={handleNext} className="bg-[#4338CA] text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-800 transition shadow-md">
                    Subscribe now - 14 days free
                  </button>
                  <button onClick={handleNext} className="bg-white text-slate-600 border border-slate-200 font-bold py-3 px-8 rounded-xl hover:bg-slate-50 transition">
                    Skip for now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Add Child Details */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Let's create your child's AI Tutor account 🤩</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Child's Name</label>
                  <input type="text" value={childData.name} onChange={e => setChildData({...childData, name: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Child's Email (Optional)</label>
                  <input type="email" placeholder="child@email.com" className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Country</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="country" checked={childData.country === 'United States'} onChange={() => setChildData({...childData, country: 'United States'})} className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium">United States</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="country" checked={childData.country === 'Canada'} onChange={() => setChildData({...childData, country: 'Canada'})} className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium">Canada</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">State/Province</label>
                    <select value={childData.region} onChange={e => setChildData({...childData, region: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 outline-none bg-white">
                      <option>Ontario</option><option>Quebec</option><option>British Columbia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Grade Level</label>
                    <select value={childData.grade} onChange={e => setChildData({...childData, grade: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 outline-none bg-white">
                      <option>6th Grade</option><option>7th Grade</option><option>8th Grade</option><option>9th Grade</option>
                    </select>
                  </div>
                </div>

                <button onClick={handleNext} className="w-full bg-[#4338CA] text-white font-bold py-4 mt-4 rounded-xl hover:bg-indigo-800 transition shadow-lg">
                  Add Child & Continue
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === 3 && (
            <div className="text-center animate-in zoom-in duration-300 py-8">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-8">{childData.name} is now ready for his AI Tutor! 🤩</h2>
              
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-lg">
                <span className="text-green-500 text-5xl font-black">✓</span>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm max-w-sm mx-auto mb-8 relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-xl border-4 border-white">
                  👦🏽
                </div>
                <h3 className="font-bold text-xl text-slate-900 mt-4">{childData.name}</h3>
                <p className="text-slate-500 text-sm">{childData.grade} • {childData.region}</p>
                <div className="mt-6">
                  <button onClick={handleNext} className="w-full bg-[#2E3192] text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-indigo-900 transition">
                    Next: Invite {childData.name} to start
                  </button>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="text-slate-500 font-bold hover:text-slate-800 transition">
                Add another child
              </button>
            </div>
          )}

          {/* STEP 4: Invite Link / Magic Link */}
          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 py-4 text-center">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Invite AI Tutor</h2>
              <p className="text-slate-500 mb-8">Invite {childData.name} to meet his personal AI Tutor</p>

              <div className="bg-slate-50 p-2 rounded-xl flex mb-6 border border-slate-200 max-w-md mx-auto">
                <button className="flex-1 bg-white text-indigo-700 font-bold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 border border-slate-200">
                  <span className="w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs">✓</span> Send invitation email
                </button>
                <button className="flex-1 text-slate-500 font-bold py-2 flex items-center justify-center gap-2 hover:text-slate-700">
                  Copy magic link
                </button>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl text-left max-w-md mx-auto shadow-sm mb-8">
                <p className="font-medium text-slate-900 mb-2">Hi {childData.name}, I signed you up for AI Tutor Pro!</p>
                <div className="p-3 border border-slate-200 rounded-lg text-slate-600 text-sm mb-4">
                  Click here to start practicing math with your encouraging AI tutor 🤩<br/>
                  <span className="text-blue-600">[magic link]</span>
                </div>
                <button onClick={finishOnboarding} className="w-full bg-[#4338CA] text-white font-bold py-3 rounded-xl shadow-md hover:bg-indigo-800 transition">
                  Send Invitation Now
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
