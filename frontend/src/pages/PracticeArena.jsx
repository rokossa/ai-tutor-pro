import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PracticeArena() {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-200/50 flex items-center justify-center p-4 font-sans selection:bg-indigo-200">
      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[500px]">
        
        {/* Left Side: Question Area */}
        <div className="flex-1 p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-8">
              <div className="bg-orange-100 text-orange-700 font-bold px-4 py-1.5 rounded-full text-sm flex items-center gap-2">
                ⭐ 7-day streak
              </div>
              <div className="bg-slate-100 text-slate-500 font-mono text-xs px-3 py-1 rounded border border-slate-200">
                Grade 8 • Math
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Question</h2>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
              <p className="text-slate-800 text-lg font-medium mb-4">
                Solve for x: <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">3x + 12 = 27</span>. Show all steps.
              </p>
              <p className="text-slate-500 text-sm italic">
                Résous pour x: 3x + 12 = 27. Montre tous les pas.
              </p>
            </div>

            <textarea 
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your answer here..."
              className="w-full h-32 p-4 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-6"
            ></textarea>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-lg shadow-indigo-500/30 text-lg"
          >
            Submit Answer →
          </button>
        </div>

        {/* Right Side: AI Feedback Area (Reveals on submit) */}
        <div className="flex-1 p-8 md:p-12 bg-slate-50/50 relative">
          {!isSubmitted ? (
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
               <svg className="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
               <p className="font-medium text-lg">Awaiting your submission...</p>
             </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full border-4 border-emerald-400 flex items-center justify-center">
                  <span className="text-2xl font-black text-emerald-500">94%</span>
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900">Amazing job, Alexandre! 🧡</h2>
              </div>
              
              <p className="text-slate-700 text-lg mb-8 leading-relaxed">
                Your isolation of the variable was perfect. You correctly subtracted 12 from both sides to get <span className="font-mono bg-white px-1 border border-slate-200 rounded">3x = 15</span>, and then divided by 3. 
              </p>

              <div className="bg-slate-200/50 p-6 rounded-2xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Explanation / Explication</h3>
                <ol className="space-y-3 text-slate-700 text-sm">
                  <li><strong>1.</strong> $3x + 12 = 27$</li>
                  <li><strong>2.</strong> Subtract 12: $3x = 27 - 12$</li>
                  <li><strong>3.</strong> Simplify: $3x = 15$</li>
                  <li><strong>4.</strong> Divide by 3: $x = 5$</li>
                </ol>
              </div>

              <div className="mt-8 flex justify-end">
                <Link to="/dashboard/student" className="text-indigo-600 font-bold hover:text-indigo-800 transition">
                  Return to Dashboard →
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
