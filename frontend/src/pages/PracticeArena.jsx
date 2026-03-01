import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Send, Lightbulb, Sparkles, Flame, Loader2 } from 'lucide-react';

export default function PracticeArena() {
  const { course, chapter } = useParams();
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
  
  // Interactive State
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [aiFeedback, setAiFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  // Mock Question (Later, this will be fetched from your DB based on the chapter)
  const currentQuestion = {
    text: "Solve for x:  3x + 5 = 20",
    hint: "Think about what you need to do to get 3x by itself first. What happens if you subtract 5 from both sides?",
    correctAnswer: "5"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) return;
    
    setIsLoading(true);
    setIsSubmitted(true);

    try {
      const response = await fetch(`${apiUrl}/ai/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion.text,
          answer: answer,
          correctAnswer: currentQuestion.correctAnswer
        })
      });

      const data = await response.json();
      setIsCorrect(data.isCorrect);
      setAiFeedback(data.feedback);
    } catch (error) {
      setIsCorrect(false);
      setAiFeedback("Whoops, my connection dropped for a second! Mind hitting submit again?");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setAnswer('');
    setIsSubmitted(false);
    setIsCorrect(null);
    setAiFeedback('');
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F5] font-sans">
      
      {/* Top Header / Progress Bar */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center px-4 sm:px-8 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/parent/dashboard" className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-900 capitalize">{course || 'Math'} • {chapter?.replace('-', ' ') || 'Linear Equations'}</h1>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Exercise {currentStep} of {totalSteps}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-48 h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4338CA] to-purple-500 transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1.5 rounded-xl font-bold text-sm">
            <Flame size={16} className="fill-current" /> 4 Days
          </div>
        </div>
      </header>

      {/* Split Screen Workspace */}
      <main className="flex-grow flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT: The Question Workspace */}
        <div className="flex-1 p-6 sm:p-12 overflow-y-auto flex flex-col justify-center">
          <div className="max-w-2xl mx-auto w-full">
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200 mb-8">
              <h2 className="text-2xl font-medium text-slate-700 mb-8 leading-relaxed">
                {currentQuestion.text}
              </h2>
              
              <form onSubmit={handleSubmit} className="relative">
                <input 
                  type="text" 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  disabled={isSubmitted && (isCorrect || isLoading)}
                  placeholder="Type your answer here..."
                  className={`w-full text-2xl p-6 rounded-2xl outline-none border-2 transition-all ${
                    isSubmitted && !isLoading
                      ? isCorrect 
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-800' 
                        : 'border-amber-400 bg-amber-50 text-amber-800'
                      : 'border-slate-200 bg-slate-50 focus:border-[#4338CA] focus:bg-white'
                  }`}
                />
                
                {!isSubmitted && (
                  <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-[#4338CA] text-white rounded-xl flex items-center justify-center hover:bg-indigo-800 transition shadow-md">
                    <Send size={20} />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT: The AI Tutor Companion */}
        <div className="lg:w-[450px] bg-white border-l border-slate-200 p-8 flex flex-col relative z-10 shadow-2xl lg:shadow-none">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">AI Tutor</h3>
              <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
              </p>
            </div>
          </div>

          <div className="flex-grow flex flex-col gap-6 overflow-y-auto pb-24">
            
            {/* Default Greeting */}
            {!isSubmitted && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xl shrink-0">🤖</div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-600">
                  Take your time with this one. Remember the golden rule of algebra: whatever you do to one side, you must do to the other. Let me know what you get!
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="flex gap-4 animate-in fade-in duration-300">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xl shrink-0">🤖</div>
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl rounded-tl-none text-indigo-800 flex items-center gap-3">
                  <Loader2 className="animate-spin" size={20} /> Evaluating your answer...
                </div>
              </div>
            )}

            {/* Real Gemini AI Feedback State */}
            {isSubmitted && !isLoading && (
              <div className="flex gap-4 animate-in slide-in-from-bottom-4 fade-in duration-300">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xl shrink-0">🤖</div>
                <div className={`p-5 rounded-3xl rounded-tl-none border ${isCorrect ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-amber-50 border-amber-100 text-amber-800'}`}>
                   {aiFeedback}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          {isSubmitted && !isLoading && (
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white to-transparent">
              {isCorrect ? (
                <button onClick={handleNext} className="w-full bg-[#4338CA] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-indigo-800 transition text-lg flex justify-center items-center gap-2 animate-in zoom-in duration-300">
                  Next Exercise <ChevronLeft size={20} className="transform rotate-180" />
                </button>
              ) : (
                <button onClick={() => setIsSubmitted(false)} className="w-full bg-white border-2 border-[#4338CA] text-[#4338CA] font-bold py-4 rounded-xl shadow-sm hover:bg-indigo-50 transition text-lg flex justify-center items-center gap-2 animate-in zoom-in duration-300">
                  Try Again
                </button>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
