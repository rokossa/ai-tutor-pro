import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, FlaskConical, BookOpen, Globe, MessageCircle, 
  ChevronRight, ArrowLeft, Pause, Sparkles
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import 'mathlive';

const iconMap = {
  'Calculator': Calculator,
  'FlaskConical': FlaskConical,
  'BookOpen': BookOpen,
  'Globe': Globe,
  'MessageCircle': MessageCircle
};

export default function StudentJourney() {
  const [currentView, setCurrentView] = useState('dashboard'); 
  const [studentGrade, setStudentGrade] = useState('Grade 8'); // Locked for now until Settings page is built
  
  const [subjects, setSubjects] = useState([]);
  const [curriculumData, setCurriculumData] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  const [activeSubject, setActiveSubject] = useState(null);
  const [activeDomain, setActiveDomain] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);

  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [showSolution, setShowSolution] = useState(false);
  const mathFieldRef = useRef(null);

  const BACKEND_URL = "https://ai-tutor-pro-backend.onrender.com";

  useEffect(() => {
    const fetchCurriculum = async () => {
      setDataLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/curriculum?grade=${studentGrade}`);
        const result = await response.json();
        if (result.success) {
          setSubjects(result.data.subjects);
          setCurriculumData(result.data.curriculum);
        }
      } catch (err) {
        console.error("Failed to fetch curriculum");
      } finally {
        setDataLoading(false);
      }
    };
    fetchCurriculum();
  }, [studentGrade]);

  const activeDomains = activeSubject ? (curriculumData[activeSubject.name]?.domains || []) : [];
  const activeSkills = activeDomain ? (curriculumData[activeSubject?.name]?.skills?.[activeDomain.id] || []) : [];

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
    
    const requestSubject = activeSubject.name === 'Geography' ? 'Geography' : 
                           activeSubject.name === 'Sciences' ? 'Chemistry' : 'Calculus';

    try {
      const response = await fetch(`${BACKEND_URL}/api/exercise`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject: requestSubject, topic: skill.name })
      });
      const data = await response.json();
      if (data.success) {
        setExercise(data.exercise);
      } else {
        throw new Error("Backend failed");
      }
    } catch (err) {
      setExercise({
        problem_statement: `Practice Problem for ${skill.name}. (Backend disconnected)`,
        correct_answer_latex: "1",
        full_solution: "Type 1 to pass."
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
      const cleanStudent = studentAnswer.replace(/\s/g, '').replace(/\\cdot/g, '*');
      const cleanCorrect = exercise.correct_answer_latex.replace(/\s/g, '');
      setStatus(cleanStudent === cleanCorrect ? 'correct' : 'incorrect');
    }
  };

  if (dataLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-slate-500">Loading your curriculum...</p>
      </div>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
        <div className="max-w-5xl mx-auto">
          {/* 💡 REPLACED DROPDOWN WITH CLEAN STATIC PILL */}
          <div className="flex items-center justify-between mb-8">
            <div className="bg-indigo-600 text-white px-5 py-2 rounded-full font-bold text-sm shadow-sm">
              {studentGrade}
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-10 h-10 bg-slate-300 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=David" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-50 rounded-[32px] p-8 mb-10 flex justify-between items-center shadow-sm border border-indigo-50">
            <div>
              <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">Welcome back, David! <Sparkles className="text-amber-500" size={24}/></h1>
              <p className="text-slate-600 mt-2 font-medium">Ready for {studentGrade}? <span className="text-amber-600 font-bold ml-2">8-day streak ✨</span></p>
            </div>
            <div className="hidden md:block text-center bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-20 h-20 rounded-full border-[6px] border-indigo-600 flex items-center justify-center mx-auto">
                <span className="text-xl font-black text-indigo-900">68%</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Overall Mastery</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-6">Your Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {subjects.map(sub => {
              const IconComponent = iconMap[sub.iconName] || BookOpen;
              return (
                <div key={sub.id} className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:border-indigo-300 transition" 
                     onClick={() => { setActiveSubject(sub); setCurrentView('domains'); }}>
                  <div className={`w-14 h-14 ${sub.color} rounded-2xl flex items-center justify-center text-white mb-4 shadow-sm`}><IconComponent size={28} /></div>
                  <h3 className="font-bold text-slate-800 mb-1">{sub.name}</h3>
                  <div className="text-xs font-bold text-emerald-600 mt-1 mb-4 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {sub.progress}%
                  </div>
                  <button className="w-full py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm transition hover:bg-indigo-600 hover:text-white">Explore</button>
                </div>
              );
            })}
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
          <div className="text-sm font-bold text-slate-400 mb-2">{studentGrade} {'>'} {activeSubject?.name}</div>
          <h1 className="text-3xl font-black text-slate-900 mb-8">{activeSubject?.name} - Domains</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeDomains.map((dom) => (
              <div key={dom.id} onClick={() => { setActiveDomain(dom); setCurrentView('skills'); }} 
                   className={`rounded-[32px] p-8 cursor-pointer transition shadow-sm border ${dom.recommended ? 'bg-[#0f172a] text-white border-slate-800 hover:bg-slate-800' : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300'}`}>
                {dom.recommended && <div className="bg-white/10 text-slate-200 text-xs font-bold px-3 py-1.5 rounded-full w-fit mb-6">Recommended</div>}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-black mb-2">{dom.name}</h3>
                    <div className={`font-bold flex items-center gap-1 text-sm ${dom.recommended ? 'text-indigo-300' : 'text-slate-400'}`}>View Skills <ChevronRight size={16}/></div>
                  </div>
                  <div className="w-20 h-20 rounded-full border-[6px] flex items-center justify-center font-black text-xl bg-white/5" style={{ borderColor: '#14b8a6', color: dom.recommended ? '#fff' : '#0f172a' }}>{dom.progress}%</div>
                </div>
              </div>
            ))}
            {activeDomains.length === 0 && <p className="text-slate-500 font-bold">More domains coming soon!</p>}
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
          <div className="text-sm font-bold text-slate-400 mb-2">{studentGrade} {'>'} {activeSubject?.name} {'>'} {activeDomain?.name}</div>
          <h1 className="text-3xl font-black text-slate-900 mb-8">{activeDomain?.name} - Skills to Master</h1>
          
          <div className="bg-white rounded-[32px] p-4 border border-slate-200 shadow-sm space-y-2">
            {activeSkills.map(skill => (
              <div key={skill.id} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl transition border border-transparent hover:border-slate-100">
                <div className="w-full mr-6">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-lg font-bold text-slate-800">{skill.name}</h3>
                    <span className="text-xs font-bold text-emerald-600">{skill.mastery}% Mastered</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden"><div className="bg-[#14b8a6] h-full rounded-full transition-all duration-500" style={{ width: `${skill.mastery}%` }}></div></div>
                </div>
                <button onClick={() => startPractice(skill)} className="bg-indigo-600 hover:bg-indigo-700 transition shadow-md text-white font-bold py-3 px-6 rounded-xl shrink-0">Start Exercises</button>
              </div>
            ))}
            {activeSkills.length === 0 && <p className="p-4 text-slate-500 font-bold">No skills added to this domain yet.</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm font-bold text-slate-500 hidden md:block">{activeSubject?.name} {'>'} {activeDomain?.name} {'>'} <span className="text-slate-900">{activeSkill?.name}</span></div>
          <button onClick={() => setCurrentView('skills')} className="font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-xl transition"><Pause size={16} className="inline mr-2"/> Pause & Return</button>
        </div>
        
        {loading ? (
          <div className="bg-white rounded-[32px] p-16 text-center border border-slate-200 shadow-sm">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="font-bold text-slate-600 text-lg">Generating personalized exercise...</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white rounded-[32px] p-8 md:p-10 border border-slate-200 shadow-sm">
               <div className="text-2xl text-slate-900 mb-10"><Latex>{exercise?.problem_statement}</Latex></div>
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Your Answer</label>
               <div className={`flex items-center border-4 rounded-2xl p-2 bg-white transition-colors ${status === 'correct' ? 'border-[#14b8a6] bg-teal-50' : 'border-[#2D9CDB] focus-within:border-indigo-600'}`}>
                 <math-field ref={mathFieldRef} style={{ width: '100%', fontSize: '1.5rem', padding: '12px', border: 'none', outline: 'none' }}></math-field>
               </div>
               
               <div className="flex justify-between items-center mt-10">
                 <button onClick={() => setShowSolution(true)} className="text-slate-500 hover:bg-slate-100 font-bold px-5 py-3 rounded-xl transition">Show Solution</button>
                 <button onClick={checkAnswer} className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-black text-lg shadow-lg transition">Check Answer</button>
               </div>
               
               {showSolution && <div className="mt-8 bg-slate-900 text-white p-6 rounded-3xl"><Latex>{exercise?.full_solution}</Latex></div>}
               {status === 'incorrect' && <div className="mt-6 text-amber-600 font-bold text-center">Not quite right, try again!</div>}
               {status === 'correct' && <div className="mt-6 text-[#14b8a6] font-black text-2xl text-center animate-bounce">Brilliant work! 🎉</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
