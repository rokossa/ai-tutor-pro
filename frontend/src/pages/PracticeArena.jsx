import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, FlaskConical, BookOpen, Globe, MessageCircle, 
  ChevronRight, ArrowLeft, Pause, Sparkles
} from 'lucide-react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import 'mathlive';

// Map string names from backend to actual Lucide React components
const iconMap = {
  'Calculator': Calculator,
  'FlaskConical': FlaskConical,
  'BookOpen': BookOpen,
  'Globe': Globe,
  'MessageCircle': MessageCircle
};

export default function StudentJourney() {
  const [currentView, setCurrentView] = useState('dashboard'); 
  const [studentGrade, setStudentGrade] = useState('Grade 8'); // This will eventually come from user login
  
  // Dynamic Data States
  const [subjects, setSubjects] = useState([]);
  const [curriculumData, setCurriculumData] = useState({});
  const [dataLoading, setDataLoading] = useState(true);

  // Active Selections
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeDomain, setActiveDomain] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);

  // Practice States
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentAnswer, setStudentAnswer] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [showSolution, setShowSolution] = useState(false);
  const mathFieldRef = useRef(null);

  const BACKEND_URL = "https://ai-tutor-pro-backend.onrender.com";

  // 💡 FETCH CURRICULUM ON LOAD
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
        console.error("Failed to fetch curriculum from backend");
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
          <div className="flex items-center justify-between mb-8">
            <select 
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold outline-none cursor-pointer"
              value={studentGrade}
              onChange={(e) => setStudentGrade(e.target.value)}
            >
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 9">Grade 9</option>
            </select>
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-50 rounded-[32px] p-8 mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-slate-900 flex items-center gap-2">Welcome back, David! <Sparkles className="text-amber-500"/></h1>
              <p className="text-slate-600 mt-2 font-medium">Ready for {studentGrade}? <span className="text-amber-600 font-bold ml-2">8-day streak ✨</span></p>
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-6">Your Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {subjects.map(sub => {
              const IconComponent = iconMap[sub.iconName] || BookOpen;
              return (
                <div key={sub.id} className="bg-white rounded-[24px] p-6 border shadow-sm flex flex-col items-center text-center cursor-pointer hover:shadow-md transition" 
                     onClick={() => { setActiveSubject(sub); setCurrentView('domains'); }}>
                  <div className={`w-14 h-14 ${sub.color} rounded-2xl flex items-center justify-center text-white mb-4`}><IconComponent size={28} /></div>
                  <h3 className="font-bold text-slate-800 mb-1">{sub.name}</h3>
                  <button className="mt-4 w-full py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl text-sm">Explore</button>
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
                   className={`rounded-[32px] p-8 cursor-pointer transition shadow-sm border ${dom.recommended ? 'bg-[#0f172a] text-white border-slate-800' : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300'}`}>
                {dom.recommended && <div className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">Recommended</div>}
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black">{dom.name}</h3>
                  <div className="w-20 h-20 rounded-full border-8 flex items-center justify-center font-black text-xl" style={{ borderColor: '#14b8a6' }}>{dom.progress}%</div>
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
          <button onClick={() => setCurrentView('domains')} className="flex items-center gap-2 text-slate-500 font-bold mb-6"><ArrowLeft size={18}/> Back to Domains</button>
          <div className="text-sm font-bold text-slate-400 mb-2">{studentGrade} {'>'} {activeSubject?.name} {'>'} {activeDomain?.name}</div>
          <h1 className="text-3xl font-black text-slate-900 mb-8">{activeDomain?.name} - Skills to Master</h1>
          
          <div className="bg-white rounded-[32px] p-4 border shadow-sm space-y-2">
            {activeSkills.map(skill => (
              <div key={skill.id} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl transition">
                <div className="w-full mr-4">
                  <h3 className="text-lg font-bold text-slate-800">{skill.name}</h3>
                  <div className="w-full max-w-sm bg-slate-100 h-2 rounded-full mt-2"><div className="bg-[#14b8a6] h-full rounded-full" style={{ width: `${skill.mastery}%` }}></div></div>
                </div>
                <button onClick={() => startPractice(skill)} className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-bold py-3 px-6 rounded-xl shrink-0">Start Exercises</button>
              </div>
            ))}
            {activeSkills.length === 0 && <p className="p-4 text-slate-500 font-bold">No skills added to this domain yet.</p>}
          </div>
        </div>
      </div>
    );
  }

  // Practice View omitted for brevity (unchanged logic)
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between mb-6">
          <div className="text-sm font-bold text-slate-500">{activeSubject?.name} {'>'} {activeSkill?.name}</div>
          <button onClick={() => setCurrentView('skills')} className="font-bold text-indigo-600"><Pause size={18} className="inline mr-1"/> Pause</button>
        </div>
        {loading ? (
          <div className="bg-white rounded-[32px] p-12 text-center border border-slate-200"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>Generating...</div>
        ) : (
          <div className="bg-white rounded-[32px] p-8 border border-slate-200">
             <div className="text-xl mb-8"><Latex>{exercise?.problem_statement}</Latex></div>
             <math-field ref={mathFieldRef} style={{ width: '100%', fontSize: '1.5rem', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '12px' }}></math-field>
             <div className="flex justify-end mt-8"><button onClick={checkAnswer} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Check Answer</button></div>
             {status === 'incorrect' && <div className="mt-4 text-amber-600 font-bold">Try again!</div>}
             {status === 'correct' && <div className="mt-4 text-[#14b8a6] font-bold text-xl">Brilliant work!</div>}
          </div>
        )}
      </div>
    </div>
  );
}
