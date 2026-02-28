import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PracticeArena() {
  const [exerciseNum, setExerciseNum] = useState(1);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('answering'); // answering, graded, block_complete
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('graded');
  };

  const handleNext = () => {
    if (exerciseNum < 10) {
      setExerciseNum(prev => prev + 1);
      setAnswer('');
      setStatus('answering');
    } else {
      setStatus('block_complete');
    }
  };

  if (status === 'block_complete') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Confetti effect placeholder */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
        
        <div className="bg-white/95 backdrop-blur-md p-10 rounded-[2rem] shadow-2xl max-w-lg w-full text-center z-10 border border-amber-200">
          <h2 className="text-3xl font-extrabold text-amber-700 mb-6">Chapter Block Complete! ✨</h2>
          
          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Average</p>
              <p className="text-5xl font-black text-slate-900">91%</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              <div className="text-left">
                <p className="font-bold text-slate-900">Linear Equations</p>
                <p className="text-amber-700 text-sm font-medium">Novice</p>
              </div>
            </div>
          </div>

          <p className="text-slate-700 font-medium mb-8 leading-relaxed">
            You just completed 10 exercises - difficulty will now increase to <strong>Medium</strong> for the next block!
          </p>

          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition">
              Start Next 10 Exercises (Medium)
            </button>
            <Link to="/course/math" className="block w-full bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition border border-slate-200">
              Choose Another Chapter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F4F5] flex items-center justify-center p-4 font-sans selection:bg-indigo-200">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row min-h-[550px]">
        
        {/* Left Panel: The Question */}
        <div className="flex-1 p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-bold text-slate-800 text-lg">Exercise {exerciseNum}/10 • Linear Equations</h2>
          </div>

          <div className="flex-1">
            <p className="text-slate-900 text-xl font-medium mb-4">
              Solve for x: <span className="font-mono text-indigo-600 bg-indigo-50 px-2 rounded">3x + 12 = 27</span>. Show every step.
            </p>
            <p className="text-slate-500 text-lg italic mb-8">
              Résous pour x: 3x + 12 = 27. Montre tous les pas.
            </p>
            
            {status === 'answering' ? (
              <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                autoFocus
                className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-lg text-slate-800 font-mono shadow-inner"
              ></textarea>
            ) : (
              <div className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-lg text-slate-800 font-mono">
                {answer || "x = 5"}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: AI Companion & Feedback */}
        <div className="flex-1 p-8 md:p-10 bg-[#F8FAFC] flex flex-col relative">
          <div className="flex justify-between items-center w-full mb-8">
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden ml-4">
              <div className="bg-[#4338CA] h-full transition-all duration-300" style={{ width: `${(exerciseNum/10)*100}%` }}></div>
            </div>
            <span className="ml-4 font-bold text-slate-700 whitespace-nowrap">🔥 {exerciseNum}/10</span>
          </div>

          {status === 'answering' ? (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in">
              <div className="bg-white px-6 py-3 rounded-2xl rounded-br-sm shadow-sm border border-slate-200 mb-6 relative">
                <p className="font-medium text-slate-700">Take your time, I'm here to help!</p>
              </div>
              {/* Cute Robot SVG */}
              <div className="w-40 h-40 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center text-7xl mb-8 relative">
                 🤖
                 <div className="absolute top-2 right-4 w-4 h-4 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <button 
                onClick={handleSubmit}
                disabled={!answer}
                className="w-full bg-gradient-to-r from-[#5B45A8] to-[#7C3AED] text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col animate-in slide-in-from-right-8 duration-500">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-full border-[6px] border-emerald-400 flex items-center justify-center flex-shrink-0 bg-white">
                  <span className="text-2xl font-black text-emerald-600">100%</span>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Amazing job, Alexandre! 🧡</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Great job! You got 6 out of 6 points for showing all your steps. Keep it up!
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mt-auto mb-6">
                <h4 className="font-bold text-slate-800 text-sm mb-2">Explanation / Explication</h4>
                <ol className="text-slate-600 text-sm space-y-2">
                  <li><strong>1.</strong> $3x + 12 = 27$</li>
                  <li><strong>2.</strong> Subtract 12: $3x = 15$</li>
                  <li><strong>3.</strong> Divide by 3: $x = 5$</li>
                </ol>
              </div>

              <div className="flex gap-4">
                <button onClick={handleNext} className="flex-1 bg-[#10B981] text-white font-bold py-4 rounded-xl shadow-md hover:bg-emerald-600 transition flex items-center justify-center gap-2">
                  Next Exercise {exerciseNum + 1} <span className="text-xl">→</span>
                </button>
                <button className="px-6 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300 transition">
                  Review
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
