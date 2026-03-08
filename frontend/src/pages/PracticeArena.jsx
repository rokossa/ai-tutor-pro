import React, { useState, useEffect } from 'react';
import { Lightbulb, CheckCircle2, XCircle, ArrowRight, BrainCircuit } from 'lucide-react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

export default function PracticeArena() {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [status, setStatus] = useState('idle'); // idle, correct, incorrect
  const [visibleHints, setVisibleHints] = useState(0);

  // Fetch the dynamically generated exercise from our new backend service
  useEffect(() => {
    fetchExercise();
  }, []);

  const fetchExercise = async () => {
    setLoading(true);
    setStatus('idle');
    setStudentAnswer('');
    setVisibleHints(0);
    
    try {
      // In production, this targets your /api/exercise endpoint
      // Mocking the successful Gemini JSON response for UI testing
      setTimeout(() => {
        setExercise({
          problem_statement: "Find the derivative of the function $f(x) = x^2 e^{-3x}$ with respect to $x$.",
          correct_answer_latex: "2xe^{-3x} - 3x^2e^{-3x}",
          hints: [
            "Hint 1: This function is a product of two terms, $u(x) = x^2$ and $v(x) = e^{-3x}$. Which rule should you use?",
            "Hint 2: The product rule states that $\\frac{d}{dx}[u(x)v(x)] = u'(x)v(x) + u(x)v'(x)$. Find $u'(x)$ and $v'(x)$.",
            "Hint 3: Be careful with the chain rule when finding $v'(x)$. The derivative of $e^{-3x}$ is $-3e^{-3x}$."
          ],
          full_solution: "Applying the product rule:\n1. $u(x) = x^2 \\implies u'(x) = 2x$\n2. $v(x) = e^{-3x} \\implies v'(x) = -3e^{-3x}$\n3. $f'(x) = (2x)(e^{-3x}) + (x^2)(-3e^{-3x}) = 2xe^{-3x} - 3x^2e^{-3x}$"
        });
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to fetch exercise");
    }
  };

  const checkAnswer = () => {
    // Basic string comparison for the MVP. In production, this uses SymPy via the backend.
    const normalizedStudent = studentAnswer.replace(/\s/g, '');
    const normalizedCorrect = exercise.correct_answer_latex.replace(/\s/g, '');
    
    if (normalizedStudent === normalizedCorrect) {
      setStatus('correct');
    } else {
      setStatus('incorrect');
    }
  };

  const revealHint = () => {
    if (visibleHints < exercise.hints.length) {
      setVisibleHints(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center font-sans">
        <div className="w-16 h-16 border-4 border-[#4338CA] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-bold">Gemini is generating your personalized exercise...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Calculus: Derivative Rules</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Skill ID: calc_product_rule</p>
          </div>
          <div className="bg-indigo-50 text-[#4338CA] px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm border border-indigo-100">
            <BrainCircuit size={16} /> Adaptive Mastery
          </div>
        </div>

        {/* The Problem Card */}
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-lg font-bold text-slate-500 mb-6">Solve the following:</h2>
          <div className="text-2xl text-slate-900 mb-10 overflow-x-auto">
            <Latex>{exercise.problem_statement}</Latex>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Your Answer</label>
            <div className={`flex items-center border-2 rounded-2xl overflow-hidden transition ${status === 'correct' ? 'border-[#14b8a6] bg-teal-50' : status === 'incorrect' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50 focus-within:border-[#4338CA]'}`}>
              <div className="px-6 py-4 font-serif italic text-slate-400 border-r border-slate-200">f'(x) =</div>
              <input 
                type="text" 
                className="w-full bg-transparent py-4 px-6 font-mono text-lg outline-none text-slate-900"
                placeholder="e.g., 2xe^{-3x} - 3x^2e^{-3x}"
                value={studentAnswer}
                onChange={(e) => { setStudentAnswer(e.target.value); setStatus('idle'); }}
                disabled={status === 'correct'}
              />
            </div>
          </div>

          {/* Socratic Hints Section */}
          <div className="mt-8 space-y-4">
            {exercise.hints.slice(0, visibleHints).map((hint, idx) => (
              <div key={idx} className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 text-amber-900 animate-in slide-in-from-top-2">
                <Lightbulb className="shrink-0 text-amber-500" size={20} />
                <div className="text-sm font-medium"><Latex>{hint}</Latex></div>
              </div>
            ))}
            
            {visibleHints < exercise.hints.length && status !== 'correct' && (
              <button 
                onClick={revealHint}
                className="text-sm font-bold text-[#4338CA] hover:text-indigo-800 transition flex items-center gap-1"
              >
                + Need a hint? ({exercise.hints.length - visibleHints} remaining)
              </button>
            )}
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex justify-between items-center">
          {status === 'idle' || status === 'incorrect' ? (
            <button 
              onClick={checkAnswer}
              disabled={!studentAnswer.trim()}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition shadow-lg disabled:opacity-50 flex items-center gap-2 ml-auto"
            >
              Check Answer
            </button>
          ) : (
            <div className="w-full flex items-center justify-between bg-[#14b8a6] text-white p-4 pl-6 rounded-2xl shadow-lg animate-in fade-in">
              <div className="flex items-center gap-3 font-bold text-lg">
                <CheckCircle2 size={24} /> Brilliant work!
              </div>
              <button 
                onClick={fetchExercise}
                className="bg-white text-[#14b8a6] px-6 py-2 rounded-xl font-black hover:bg-teal-50 transition flex items-center gap-2"
              >
                Next Challenge <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Incorrect State Feedback */}
        {status === 'incorrect' && (
          <div className="mt-6 flex items-center justify-center gap-2 text-amber-600 font-bold animate-in zoom-in">
            <XCircle size={20} /> Not quite right. Try using a hint!
          </div>
        )}

      </div>
    </div>
  );
}
