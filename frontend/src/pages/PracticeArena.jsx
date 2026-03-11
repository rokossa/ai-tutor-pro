import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
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
  const [selectedSubject, setSelectedSubject] = useState('Calculus');
  const mathFieldRef = useRef(null);

  const BACKEND_URL = "https://ai-tutor-pro-backend.onrender.com";
  const SUBJECTS = ['Calculus', 'Algebra', 'Chemistry'];

  useEffect(() => {
    fetchExercise(selectedSubject);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const mf = mathFieldRef.current;
    if (mf && !loading) {
      mf.readOnly = (status === 'correct' || showSolution);
      const handleInput = () => {
        setStudentAnswer(mf.value);
        if (status !== 'correct') setStatus('idle');
      };
      mf.addEventListener('input', handleInput);
      return () => mf.removeEventListener('input', handleInput);
    }
  }, [loading, status, showSolution]);

  const fetchExercise = async (subjectToFetch) => {
    setLoading(true);
    setStatus('idle');
    setStudentAnswer('');
    setShowSolution(false);
    setDebugMsg('');
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/exercise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: subjectToFetch })
      });
      const data = await response.json();
      if (data.success) setExercise(data.exercise);
      else setDebugMsg("Error loading problem.");
    } catch (err) {
      setDebugMsg("Backend connection error.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = (newSubject) => {
    setSelectedSubject(newSubject);
    fetchExercise(newSubject);
  };

  const checkAnswer = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/evaluate`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ student_answer: studentAnswer, correct_answer: exercise.correct_answer_latex }) 
      });
      const data = await response.json();
      setStatus(data.is_correct ? 'correct' : 'incorrect');
    } catch (error) {
      setDebugMsg("Evaluation failed.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center font-sans bg-[#F8F9FA]">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      {/* 💡 THE NEW WELCOMING TEXT */}
      <p className="font-bold text-slate-500 text-lg">Getting your exercises ready...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* 💡 THE NEW SUBJECT SELECTOR */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {SUBJECTS.map(sub => (
            <button
              key={sub}
              onClick={() => handleSubjectChange(sub)}
              className={`px-6 py-2 rounded-xl font-black transition ${
                selectedSubject === sub 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-[32px] p-12 shadow-sm border border-slate-200 mb-6">
          <div className="text-2xl text-slate-900 mb-10 overflow-x-auto"><Latex>{exercise?.problem_statement || "Problem Error"}</Latex></div>
          <div className="space-y-4">
            <div className={`flex items-center border-2 rounded-2xl p-2 bg-white ${status === 'correct' ? 'border-[#14b8a6] bg-teal-50' : 'border-slate-200'}`}>
              <div className="px-4 py-4 font-serif italic text-slate-400 border-r border-slate-200">Ans =</div>
              <math-field ref={mathFieldRef} style={{ width: '100%', fontSize: '1.5rem', padding: '12px', border: 'none', outline: 'none' }}></math-field>
            </div>
          </div>
          {showSolution && <div className="mt-8 bg-slate-900 text-white p-8 rounded-3xl"><Latex>{exercise?.full_solution}</Latex></div>}
        </div>
        
        <div className="flex justify-between items-center mt-6">
          {status !== 'correct' && !showSolution ? (
            <div className="w-full flex justify-between gap-4">
              <button onClick={() => setShowSolution(true)} className="text-slate-500 font-bold px-4 py-2 hover:bg-slate-100 rounded-xl"><Eye size={18}/></button>
              <button onClick={checkAnswer} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-lg">Check Answer</button>
            </div>
          ) : (
            <button onClick={() => fetchExercise(selectedSubject)} className="w-full bg-[#14b8a6] text-white p-5 rounded-2xl shadow-lg font-black flex items-center justify-center gap-2">Next Challenge <ArrowRight size={20}/></button>
          )}
        </div>
        
        {status === 'incorrect' && <div className="mt-6 text-center text-amber-600 font-bold">Try again! {debugMsg}</div>}
        {status === 'correct' && <div className="mt-6 text-center text-[#14b8a6] font-black text-2xl animate-bounce">Brilliant work! 🎉</div>}
      </div>
    </div>
  );
}
