import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, FlaskConical, BookOpen, Globe, MessageCircle, 
  ChevronRight, ArrowLeft, Pause, CheckCircle2, XCircle, ArrowRight, Eye, Sparkles
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import 'mathlive';

export default function StudentJourney() {
  // Navigation State
  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, domains, skills, practice
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeDomain, setActiveDomain] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);

  // Practice State
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [showSolution, setShowSolution] = useState(false);
  const mathFieldRef = useRef(null);

  const BACKEND_URL = "https://ai-tutor-pro-backend.onrender.com";

  // --- MOCK DATA FOR UI ---
  const subjects = [
    { id: 'math', name: 'Mathematics', icon: Calculator, color: 'bg-indigo-600', progress: 52 },
    { id: 'science', name: 'Sciences', icon: FlaskConical, color: 'bg-teal-500', progress: 65 },
    { id: 'english', name: 'English', icon: BookOpen, color: 'bg-amber-500', progress: 78 },
    { id: 'french', name: 'French', icon: MessageCircle, color: 'bg-pink-500', progress: 42 },
    { id: 'geo', name: 'Geography', icon: Globe, color: 'bg-blue-500', progress: 31 },
  ];

  const mathDomains = [
    { id: 'algebra', name: 'Algebra & Equations', progress: 78, recommended: true },
    { id: 'geometry', name: 'Geometry', progress: 45 },
    { id: 'data', name: 'Data Analysis', progress: 30 },
    { id: 'numbers', name: 'Number Systems', progress: 65 },
  ];

  const algebraSkills = [
    { id: 'linear', name: 'Linear Equations', mastery: 100 },
    { id: 'quad', name: 'Quadratic Functions', mastery: 100 },
    { id: 'ineq', name: 'Graphing Inequalities', mastery: 65 },
    { id: 'sys', name: 'Systems of Equations', mastery: 65 },
    { id: 'deriv', name: 'Product Rule (Calculus)', mastery: 40 }, // Added to match our working math engine
  ];

  // --- PRACTICE LOGIC ---
  useEffect(() => {
    if (currentView === 'practice') {
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
    }
  }, [currentView, loading, status, showSolution]);

  const startPractice = async (skill) => {
    setActiveSkill(skill);
    setCurrentView('practice');
    setLoading(true);
    setStatus('idle');
    setStudentAnswer('');
    setShowSolution(false);
    
    try {
      const response = await fetch(`${BACKEND_URL}/api/exercise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: activeSubject.name, topic: skill.id })
      });
      const data = await response.json();
      if (data.success) {
        setExercise(data.exercise);
      } else {
        throw new Error("Backend failed");
      }
    } catch (err) {
      // 💡 FAILSAFE: If backend sleeps, load this instantly so the UI never breaks.
      setExercise({
        problem_statement: "Find the derivative of $f(x) = 2x e^{-3x}$",
        correct_answer_latex: "2e^{-3x}-6xe^{-3x}",
        full_solution: "Apply the product rule: f'(x) = 2e^{-3x} - 6xe^{-3x}"
      });
    } finally {
      setLoading(false);
    }
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
      // Failsafe string matching if backend is down
      const cleanStudent = studentAnswer.replace(/\s/g, '').replace(/\\cdot/g, '*');
      const cleanCorrect = exercise.correct_answer_latex.replace(/\s/g, '');
      setStatus(cleanStudent === cleanCorrect ? 'correct' : 'incorrect');
    }
  };

  // --- RENDER VIEWS ---

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full font-bold text-sm">Grade 8</div>
            <div className="flex gap-4 items-center">
              <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-50 rounded-[32px] p-8 mb-10 border border-indigo-50 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">Welcome back, David! <Sparkles className="text-amber-500"/></h1>
              <p className="text-slate-600 mt-2 font-medium">Ready for Grade 8? <span className="text-amber-600 font-bold ml-2">8-day streak ✨</span></p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full border-8 border-indigo-600 flex items-center justify-center bg-white shadow-inner">
                <span className="text-2xl font-black text-indigo-900">68%</span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wide">Overall Mastery</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-6">Your Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {subjects.map(sub => (
              <div key={sub.id} className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center transition hover:shadow-md cursor-pointer" onClick={() => { setActiveSubject(sub); setCurrentView('domains'); }}>
                <div className={`w-14 h-14 ${sub.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm`}><sub.icon size={28} /></div>
                <h3 className="font-bold text-slate-800 mb-1">{sub.name}</h3>
                <div className="flex items-center gap-2 text-emerald-600 font-black text-lg mb-4"><CheckCircle2 size={18}/> {sub.progress}%</div>
                <button className="w-full py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm hover:bg-indigo-600 hover:text-white transition">Explore</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'domains') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setCurrentView('dashboard')} className="flex items-center gap-2 text-slate-500 font-bold mb-6 hover:text-slate-800 transition"><ArrowLeft size={18}/> Back to Dashboard</button>
          <div className="text-sm font-bold text-slate-400 mb-2">Grade 8 {'>'} {activeSubject?.name}</div>
          <h1 className="text-3xl font-black text-slate-900 mb-8">{activeSubject?.name} - Domains</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mathDomains.map((dom, i) => (
              <div key={dom.id} onClick={() => { setActiveDomain(dom); setCurrentView('skills'); }} className={`rounded-[32px] p-8 cursor-pointer transition shadow-sm border ${dom.recommended ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300'}`}>
                {dom.recommended && <div className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">Recommended</div>}
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black">{dom.name}</h3>
                  <div className="w-20 h-20 rounded-full border-8 flex items-center justify-center font-black text-xl" style={{ borderColor: dom.recommended ? '#14b8a6' : '#14b8a6' }}>{dom.progress}%</div>
                </div>
                <div className={`mt-6 font-bold flex items-center gap-2 ${dom.recommended ? 'text-indigo-200' : 'text-slate-400'}`}>View Skills <ChevronRight size={18}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'skills') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setCurrentView('domains')} className="flex items-center gap-2 text-slate-500 font-bold mb-6 hover:text-slate-800 transition"><ArrowLeft size={18}/> Back to Domains</button>
          <div className="text-sm font-bold text-slate-400 mb-2">Grade 8 {'>'} {activeSubject?.name} {'>'} {activeDomain?.name}</div>
          <h1 className="text-3xl font-black text-slate-900 mb-8">{activeDomain?.name} - Skills to Master</h1>
          
          <div className="bg-white rounded-[32px] p-4 border border-slate-200 shadow-sm space-y-2">
            {algebraSkills.map(skill => (
              <div key={skill.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800">{skill.name}</h3>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 max-w-md overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${skill.mastery}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-emerald-600">{skill.mastery}% Mastered</span>
                  <button onClick={() => startPractice(skill)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md">Start Exercises</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- PRACTICE VIEW ---
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-bold text-slate-500">
            Grade 8 <span className="mx-2">•</span> {activeSubject?.name} <span className="mx-2">•</span> {activeDomain?.name} <span className="mx-2">•</span> <span className="text-slate-900">{activeSkill?.name}</span>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 font-bold text-slate-600 hover:text-slate-900"><Pause size={18}/> Pause</button>
            <button onClick={() => setCurrentView('skills')} className="font-bold text-indigo-600 hover:text-indigo-800">Back to Dashboard</button>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-bold text-slate-500 mb-2">Skill Mastery: Level 2/5 • 40%</p>
          <div className="w-64 bg-slate-200 h-2 rounded-full overflow-hidden"><div className="bg-indigo-600 h-full w-[40%]"></div></div>
        </div>

        {loading ? (
          <div className="bg-white rounded-[32px] p-12 shadow-sm border border-slate-200 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-bold text-slate-500 text-lg">Generating personalized exercise...</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Math Area */}
            <div className="flex-1 bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">
              <div className="text-xl text-slate-900 mb-8"><Latex>{exercise?.problem_statement}</Latex></div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Answer</label>
              <div className={`flex items-center border-4 rounded-2xl p-2 bg-white transition-colors ${status === 'correct' ? 'border-[#14b8a6] bg-teal-50' : 'border-[#2D9CDB] focus-within:border-indigo-600'}`}>
                <math-field ref={mathFieldRef} style={{ width: '100%', fontSize: '1.5rem', padding: '8px', border: 'none', outline: 'none' }}></math-field>
              </div>
              
              <div className="flex justify-between items-center mt-12">
                <button onClick={() => setShowSolution(true)} className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl transition">Show Solution</button>
                <button onClick={checkAnswer} className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-black text-lg transition shadow-lg">Check Answer</button>
              </div>

              {showSolution && <div className="mt-8 bg-slate-900 text-white p-6 rounded-3xl"><Latex>{exercise?.full_solution}</Latex></div>}
              {status === 'incorrect' && <div className="mt-6 text-amber-600 font-bold text-center">Not quite right, try again!</div>}
              {status === 'correct' && <div className="mt-6 text-[#14b8a6] font-black text-2xl text-center animate-bounce">Brilliant work! 🎉</div>}
            </div>

            {/* AI Socratic Sidebar */}
            <div className="w-full md:w-80 flex flex-col gap-4">
              <div className="bg-slate-100 rounded-[24px] p-6 border border-slate-200">
                <div className="flex items-center gap-2 font-black text-emerald-700 mb-4">
                  <div className="bg-emerald-200 p-1.5 rounded-lg"><Sparkles size={16}/></div> Socratic AI Guide
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-slate-700 font-medium text-sm">
                  Great start! Which rule did you use for the <Latex>{"$x^2$"}</Latex> part? (Product rule?)
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 rounded-lg text-sm transition">Hint</button>
                  <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 rounded-lg text-sm transition">Show Solution</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
