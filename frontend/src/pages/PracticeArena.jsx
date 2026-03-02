import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Sparkles, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PracticeArena() {
  const { course, chapter } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState({ type: 'hint', message: "Hi Alexandre! Let's look at this linear equation. What's our first step to isolate x?" });

  // Mocked problem data
  const problem = {
    title: "Linear Equations",
    question: "Solve for x: 3x + 12 = 36",
    difficulty: "Grade 8"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer === '8') {
      setFeedback({ type: 'success', message: "Spot on! 3(8) is 24, and 24 + 12 = 36. Ready for the next one?" });
    } else {
      setFeedback({ type: 'error', message: "Not quite. Try subtracting 12 from both sides first. What do you get?" });
    }
  };

  return (
    <div className="min-h-screen bg-[#Eef0f4] flex flex-col font-sans">
      
      {/* Top Header & Progress Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate('/student/dashboard')} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition">
          <ChevronLeft size={20} /> Exit
        </button>
        
        <div className="flex flex-col items-center flex-grow max-w-md px-8">
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-1">
            <div className="bg-[#4338CA] h-full transition-all duration-500" style={{ width: `${(currentStep / 10) * 100}%` }}></div>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exercise {currentStep} of 10</span>
        </div>

        <div className="flex items-center gap-2 bg-[#14b8a6]/10 text-[#14b8a6] px-4 py-1.5 rounded-full font-black text-xs border border-[#14b8a6]/20">
          7 DAY STREAK 🔥
        </div>
      </div>

      {/* Main Arena Content */}
      <div className="flex-grow flex flex-col lg:flex-row p-4 sm:p-6 gap-6">
        
        {/* Left: AI Tutor Side */}
        <div className="lg:w-1/3 bg-white/80 backdrop-blur-md rounded-[32px] p-8 shadow-sm border border-white flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="font-black text-slate-900 leading-tight">AI Tutor</h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Your patient guide</p>
            </div>
          </div>

          <div className={`p-6 rounded-[24px] mb-8 text-lg font-medium leading-relaxed shadow-sm border ${
            feedback.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 
            feedback.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-100' : 'bg-slate-50 text-slate-700 border-slate-100'
          }`}>
            {feedback.message}
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100 flex items-center gap-4 text-slate-400 font-bold text-xs uppercase italic">
            Focus: Isolating Variables
          </div>
        </div>

        {/* Right: Workspace Side */}
        <div className="flex-1 bg-white rounded-[40px] p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col">
          <div className="mb-12">
            <span className="text-xs font-black text-[#4338CA] bg-indigo-50 px-3 py-1 rounded-full uppercase mb-4 inline-block tracking-widest">
              {course} • {problem.difficulty}
            </span>
            <h1 className="text-4xl font-black text-slate-900 mb-6">{problem.title}</h1>
            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100 text-3xl font-mono text-center text-slate-800 shadow-inner">
              {problem.question}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-auto">
            <div className="relative">
              <input 
                type="text" 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full bg-[#F8F9FA] border-2 border-slate-200 rounded-[28px] py-6 px-8 text-xl font-bold text-slate-800 focus:border-[#4338CA] focus:ring-0 transition-all outline-none"
              />
              <button 
                type="submit"
                className="absolute right-3 top-3 bottom-3 bg-[#4338CA] text-white px-8 rounded-2xl font-black hover:bg-indigo-700 transition flex items-center gap-2 shadow-lg"
              >
                Submit <Send size={20} />
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
