import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, CheckCircle2, XCircle, ArrowRight, BrainCircuit, Eye } from 'lucide-react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import 'mathlive';

export default function PracticeArena() {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [visibleHints, setVisibleHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const mathFieldRef = useRef(null);

  useEffect(() => {
    fetchExercise();
  }, []);

  // 💡 THE FIX: Safely control the MathLive element via its JavaScript reference
  useEffect(() => {
    const mf = mathFieldRef.current;
    if (mf) {
      // Set the readOnly property directly instead of using a buggy HTML attribute
      mf.readOnly = (status === 'correct' || showSolution);

      const handleInput = () => {
        setStudentAnswer(mf.value);
        if (status !== 'correct') setStatus('idle');
      };
      
      mf.addEventListener('input', handleInput);
      return () => mf.removeEventListener('input', handleInput);
    }
  }, [loading, status, showSolution]);

  const fetchExercise = async () => {
    setLoading(true);
    setStatus('idle');
    setStudentAnswer('');
    setVisibleHints(0);
    setShowSolution(false);
    
    try {
      setTimeout(() => {
        setExercise({
          problem_statement: "Find the derivative of the function $f(x) = x^2 e^{-3x}$ with respect to $x$.",
          correct_answer_latex: "2xe^{-3x} - 3x^2e^{-3x}",
          hints: [
            "Hint 1: This function is a product of two terms, $u(x) = x^2$ and $v(x) = e^{-3x}$. Which rule should you use?",
            "Hint 2: The product rule states that $\\frac{d}{dx}[u(x)v(x)] = u'(x)v(x) + u(x)v'(x)$. Find $u'(x)$ and $v'(x)$.",
            "Hint 3: Be careful with the chain rule when finding $v'(x)$. The derivative of $e^{-3x}$ is $-3e^{-3x}$."
          ],
          full_solution: "Applying the product rule:\n\n1. Let $u(x) = x^2 \\implies u'(x) = 2x$\n2. Let $v(x) = e^{-3x} \\implies v'(x) = -3e^{-3x}$\n3. $f'(x) = u'(x)v(x) + u(x)v'(x)$\n4. $f'(x) = (2x)(e^{-3x}) + (x^2)(-3e^{-3x})$\n5. $f'(x) = 2xe^{-3x} - 3x^2e^{-3x}$"
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to fetch exercise");
    }
  };

  const checkAnswer = async () => {
    try {
      const response = await fetch("/api/evaluate", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          student_answer: studentAnswer, 
          correct_answer: exercise.correct_answer_latex 
        }) 
      });
      const data = await response.json(); 
      if (data.is_correct) {
        setStatus('correct');
      } else {
        setStatus('incorrect');
      }
    } catch (error) {
      console.error("Evaluation failed", error);
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
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Calculus: Derivative Rules</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Skill ID: calc_product_rule</p>
          </div>
          <div className="bg-indigo-50 text-[#4338CA] px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm border border-indigo-100">
            <BrainCircuit size={16} /> Adaptive Mastery
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-200 mb-6">
          <h2 className="text-lg font-bold text-slate-500 mb-6">Solve the following:</h2>
          <div className="text-2xl text-slate-900 mb-10 overflow-x-auto">
            <Latex>{exercise.problem_statement}</Latex>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Your Answer</label>
            <div className={`flex items-center border-2 rounded-2xl overflow-hidden transition p-2 bg-white ${status === 'correct' ? 'border-[#14b8a6] bg-teal-50' : status === 'incorrect' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 focus-within:border-[#4338CA]'}`}>
              <div className="px-4 py-4 font-serif italic text-slate-400 border-r border-slate-200">f'(x) =</div>
              
              {/* Removed the buggy HTML read-only attribute entirely! */}
              <math-field 
                ref={mathFieldRef}
                style={{ width: '100%', fontSize: '1.5rem', padding: '12px', backgroundColor: 'transparent', border: 'none', outline: 'none' }}
              ></math-field>

            </div>
          </div>

          {showSolution && (
            <div className="mt-8 bg-slate-900 text-white p-8 rounded-3xl animate-in slide-in-from-top-4">
              <h3 className="text-lg font-black text-indigo-400 mb-4 flex items-center gap-2">
                <BrainCircuit size={20} /> Step-by-Step Solution
              </h3>
              <div className="prose prose-invert max-w-none text-lg leading-relaxed whitespace-pre-line">
                <Latex>{exercise.full_solution}</Latex>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-4">
            {exercise.hints.slice(0, visibleHints).map((hint, idx) => (
              <div key={idx} className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3 text-amber-900 animate-in slide-in-from-top-2">
                <Lightbulb className="shrink-0 text-amber-500" size={20} />
                <div className="text-sm font-medium"><Latex>{hint}</Latex></div>
              </div>
            ))}
            
            {visibleHints < exercise.hints.length && status !== 'correct' && !showSolution && (
              <button 
                onClick={revealHint}
                className="text-sm font-bold text-[#4338CA] hover:text-indigo-800 transition flex items-center gap-1"
              >
                + Need a hint? ({exercise.hints.length - visibleHints} remaining)
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          {status !== 'correct' && !showSolution ? (
            <div className="w-full flex justify-between items-center gap-4">
              <button 
                onClick={() => setShowSolution(true)}
                className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-2 transition px-4 py-2 rounded-xl hover:bg-slate-100"
              >
                <Eye size={18} /> Show Solution
              </button>
              
              <button 
                onClick={checkAnswer}
                disabled={!studentAnswer.trim()}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-800 transition shadow-lg disabled:opacity-50"
              >
                Check Answer
              </button>
            </div>
          ) : (
            <div className={`w-full flex items-center justify-between p-4 pl-6 rounded-2xl shadow-lg animate-in fade-in ${status === 'correct' ? 'bg-[#14b8a6] text-white' : 'bg-slate-800 text-white'}`}>
              <div className="flex items-center gap-3 font-bold text-lg">
                {status === 'correct' ? <><CheckCircle2 size={24} /> Brilliant work!</> : <><Eye size={24} /> Review the solution carefully.</>}
              </div>
              <button 
                onClick={fetchExercise}
                className={`px-6 py-2 rounded-xl font-black transition flex items-center gap-2 ${status === 'correct' ? 'bg-white text-[#14b8a6] hover:bg-teal-50' : 'bg-[#4338CA] text-white hover:bg-indigo-600'}`}
              >
                Next Challenge <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {status === 'incorrect' && !showSolution && (
          <div className="mt-6 flex items-center justify-center gap-2 text-amber-600 font-bold animate-in zoom-in">
            <XCircle size={20} /> Not quite right. Try a hint or view the solution!
          </div>
        )}

      </div>
    </div>
  );
}
