import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, ArrowRight, BrainCircuit, Eye } from 'lucide-react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import 'mathlive';

export default function PracticeArena() {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [showSolution, setShowSolution] = useState(false);
  const [debugMsg, setDebugMsg] = useState('');
  const mathFieldRef = useRef(null);

  const BACKEND_URL = "https://ai-tutor-pro-backend.onrender.com";

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
    setShowSolution(false);
    setDebugMsg('');
    
    try {
      // 💡 CALLING LIVE GEMINI BACKEND
      const response = await fetch(`${BACKEND_URL}/api/exercise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          subject: "calculus", 
          topic: "product_rule", 
          grade_level: "12th Grade" 
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setExercise(data.exercise);
      } else {
        setDebugMsg("Gemini failed to generate a problem. Using backup.");
      }
    } catch (err) {
      setDebugMsg("Connection to Gemini failed.");
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/evaluate`, { 
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
        if (data.debug) setDebugMsg(`Debug Info: ${data.debug}`);
      }
    } catch (error) {
      setStatus('incorrect');
      setDebugMsg(`Engine Error: ${error.message}`);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-slate-600">Gemini is crafting a new problem...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-200 mb-6">
          <div className="text-2xl text-slate-900 mb-10 overflow-x-auto">
             <Latex>{exercise?.problem_statement || "No problem loaded"}</Latex>
          </div>
          <div className="space-y-4">
            <div className={`flex items-center border-2 rounded-2xl p-2 bg-white ${status === 'correct' ? 'border-[#14b8a6] bg-teal-50' : 'border-slate-200'}`}>
              <div className="px-4 py-4 font-serif italic text-slate-400 border-r border-slate-200">Ans =</div>
              <math-field ref={mathFieldRef} style={{ width: '100%', fontSize: '1.5rem', padding: '12px', border: 'none', outline: 'none' }}></math-field>
            </div>
          </div>
          {showSolution && (
            <div className="mt-8 bg-slate-900 text-white p-8 rounded-3xl animate-in slide-in-from-top-4">
              <Latex>{exercise?.full_solution || "No solution available"}</Latex>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6">
          {status !== 'correct' && !showSolution ? (
            <div className="w-full flex justify-between items-center">
              <button onClick={() => setShowSolution(true)} className="text-slate-500 font-bold px-4 py-2 hover:bg-slate-100 rounded-xl flex items-center gap-2"><Eye size={18}/> Show Solution</button>
              <button onClick={checkAnswer} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg">Check Answer</button>
            </div>
          ) : (
            <button onClick={fetchExercise} className="w-full bg-[#14b8a6] text-white p-5 rounded-2xl shadow-lg font-black text-xl flex items-center justify-center gap-2">
              Next Challenge <ArrowRight size={20} />
            </button>
          )}
        </div>

        {status === 'incorrect' && <div className="mt-6 text-center text-amber-600 font-bold">{debugMsg || "Not quite right!"}</div>}
        {status === 'correct' && <div className="mt-6 text-center text-[#14b8a6] font-black text-2xl animate-bounce">Brilliant work! 🎉</div>}
      </div>
    </div>
  );
}
