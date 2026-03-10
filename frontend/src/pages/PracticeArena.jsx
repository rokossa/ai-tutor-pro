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
    
    setTimeout(() => {
      setExercise({
        problem_statement: "Find the derivative of the function $f(x) = x^2 e^{-3x}$ with respect to $x$.",
        correct_answer_latex: "2xe^{-3x}-3x^2e^{-3x}",
        hints: ["Product rule: (uv)' = u'v + uv'", "u = x^2, v = e^-3x", "v' = -3e^-3x"],
        full_solution: "f'(x) = 2xe^{-3x} - 3x^2e^{-3x}"
      });
      setLoading(false);
    }, 500);
  };

  const checkAnswer = async () => {
    try {
      const response = await fetch("https://ai-tutor-pro-backend.onrender.com/api/evaluate", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ 
          student_answer: studentAnswer, 
          correct_answer: exercise.correct_answer_latex 
        }) 
      });
      
      const rawText = await response.text();
      const data = JSON.parse(rawText);
      
      if (data.is_correct) {
        setStatus('correct');
      } else {
        setStatus('incorrect');
        if (data.debug) setDebugMsg(`Debug: ${data.debug}`);
      }
    } catch (error) {
      setStatus('incorrect');
      setDebugMsg(`Connection Error: ${error.message}`);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-white rounded-[32px] p-12 shadow-sm border border-slate-200 mb-6 text-left">
          <div className="text-2xl text-slate-900 mb-10"><Latex>{exercise.problem_statement}</Latex></div>
          <div className={`flex items-center border-2 rounded-2xl p-2 bg-white ${status === 'correct' ? 'border-[#14b8a6] bg-teal-50' : status === 'incorrect' ? 'border-amber-500 bg-amber-50' : 'border-slate-200'}`}>
            <div className="px-4 py-4 font-serif italic text-slate-400 border-r border-slate-200">f'(x) =</div>
            <math-field ref={mathFieldRef} style={{ width: '100%', fontSize: '1.5rem', padding: '12px', border: 'none', outline: 'none' }}></math-field>
          </div>
          {showSolution && <div className="mt-8 bg-slate-900 text-white p-8 rounded-3xl"><Latex>{exercise.full_solution}</Latex></div>}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={() => setShowSolution(true)} className="text-slate-500 font-bold px-4 py-2 hover:bg-slate-100 rounded-xl">Show Solution</button>
          <button onClick={checkAnswer} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg">Check Answer</button>
        </div>

        {status === 'incorrect' && <div className="mt-6 text-amber-600 font-bold">{debugMsg || "Not quite right!"}</div>}
        {status === 'correct' && <div className="mt-6 text-[#14b8a6] font-bold text-2xl animate-bounce text-center">Brilliant work! 🎉</div>}
      </div>
    </div>
  );
}
