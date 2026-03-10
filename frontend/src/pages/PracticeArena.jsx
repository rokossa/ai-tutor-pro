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
  const [debugMsg, setDebugMsg] = useState('');
  const mathFieldRef = useRef(null);

  useEffect(() => {
    fetchExercise();
  }, []);

  useEffect(() => {
    const mf = mathFieldRef.current;
    if (mf) {
      mf.readOnly = (status === 'correct' || showSolution);
      const handleInput = () => {
        setStudentAnswer(mf.value);
        if (status !== 'correct') {
            setStatus('idle');
            setDebugMsg('');
        }
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
    setDebugMsg('');
    
    try {
      setTimeout(() => {
        setExercise({
          problem_statement: "Find the derivative of the function $f(x) = x^2 e^{-3x}$ with respect to $x$.",
          correct_answer_latex: "2xe^{-3x}-3x^2e^{-3x}", // Normalized base format
          hints: [
            "Hint 1: This function is a product of two terms.",
            "Hint 2: The product rule states that $\\frac{d}{dx}[u(x)v(x)] = u'(x)v(x) + u(x)v'(x)$.",
            "Hint 3: Be careful with the chain rule when finding $v'(x)$."
          ],
          full_solution: "Applying the product rule:\n\n1. Let $u(x) = x^2 \\implies u'(x) = 2x$\n2. Let $v(x) = e^{-3x} \\implies v'(x) = -3e^{-3x}$\n3. $f'(x) = u'(x)v(x) + u(x)v'(x)$\n4. $f'(x) = 2xe^{-3x} - 3x^2e^{-3x}$"
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
        body: JSON.stringify({ student_answer: studentAnswer, correct_answer: exercise.correct_answer_latex }) 
      });
      
      const rawText = await response.text();
      
      if (!rawText) {
         setStatus('incorrect');
         // THE FIX: An accurate, non-Python generic crash message
         setDebugMsg("CRITICAL: Server returned a blank response. The Node backend crashed internally (likely an import/module error). Check Render Logs.");
         return;
      }

      let data;
      try {
         data = JSON.parse(rawText);
      } catch (e) {
         setStatus('incorrect');
         setDebugMsg(`CRITICAL: Server returned non-JSON data: ${rawText.substring(0, 80)}...`);
         return;
      }
      
      if (data.is_correct) {
        setStatus('correct');
        setDebugMsg('');
      } else {
        setStatus('incorrect');
        if (data.error) setDebugMsg(`Engine Error: ${data.error}`);
        else if (data.debug) setDebugMsg(`Debug Info: ${data.debug}`);
      }
    } catch (error) {
      setStatus('incorrect');
      setDebugMsg(`Network/Fetch Error: ${error.message}`);
    }
  };

  const revealHint = () => { if (visibleHints < exercise.hints.length) setVisibleHints(prev => prev + 1); };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-sans"><div className="w-16 h-16 border-4 border-[#4338CA] border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h1 className="text-2xl font-black text-slate-900">Calculus: Derivative Rules</h1></div>
          <div className="bg-indigo-50 text-[#4338CA] px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm border border-indigo-100"><BrainCircuit size={16} /> Adaptive Mastery</div>
        </div>

        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-200 mb-6">
          <div className="text-2xl text-slate-900 mb-10 overflow-x-auto"><Latex>{exercise.problem_statement}</Latex></div>
          <div className="space-y-4">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest px-1">Your Answer</label>
            <div className={`flex items-center border-2 rounded-2xl p-2 bg-white ${status === 'correct' ? 'border-[#14b8a6] bg-teal-50' : status === 'incorrect' ? 'border-amber-500 bg-amber-50' : 'border-slate-200'}`}>
              <div className="px-4 py-4 font-serif italic text-slate-400 border-r border-slate-200">f'(x) =</div>
              <math-field ref={mathFieldRef} style={{ width: '100%', fontSize: '1.5rem', padding: '12px', backgroundColor: 'transparent', border: 'none', outline: 'none' }}></math-field>
            </div>
          </div>
          {showSolution && <div className="mt-8 bg-slate-900 text-white p-8 rounded-3xl"><Latex>{exercise.full_solution}</Latex></div>}
        </div>

        <div className="flex justify-between items-center mt-6">
          {status !== 'correct' && !showSolution ? (
            <div className="w-full flex justify-between items-center gap-4">
              <button onClick={() => setShowSolution(true)} className="text-slate-500 font-bold flex items-center gap-2 hover:bg-slate-100 px-4 py-2 rounded-xl"><Eye size={18} /> Show Solution</button>
              <button onClick={checkAnswer} disabled={!studentAnswer.trim()} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-lg disabled:opacity-50">Check Answer</button>
            </div>
          ) : (
            <button onClick={fetchExercise} className="w-full bg-[#14b8a6] text-white p-4 rounded-2xl shadow-lg font-bold flex items-center justify-center gap-2">Next Challenge <ArrowRight size={18} /></button>
          )}
        </div>

        {status === 'incorrect' && !showSolution && (
          <div className="mt-6 flex flex-col items-center justify-center gap-2 animate-in zoom-in">
            <div className="flex items-center gap-2 text-amber-600 font-bold"><XCircle size={20} /> Not quite right.</div>
            {debugMsg && <div className="mt-2 p-3 bg-slate-900 text-amber-400 font-mono text-xs rounded-xl max-w-lg text-center break-words border border-slate-700">{debugMsg}</div>}
          </div>
        )}
      </div>
    </div>
  );
}
