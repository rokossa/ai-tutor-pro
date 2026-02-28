import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, MessageSquare, Sparkles, Settings, ArrowLeft, Download, Send } from 'lucide-react';
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function TutorDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPromptBuilder, setShowPromptBuilder] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedExercises, setGeneratedExercises] = useState([]);
  
  const handleGenerate = async () => {
    if (!customPrompt) return;
    setIsGenerating(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/ai/generate-exercise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: customPrompt,
          studentName: selectedStudent?.name,
          grade: selectedStudent?.grade
        })
      });
      const data = await response.json();
      if (data.success) setGeneratedExercises(data.exercises);
    } catch (error) {
      console.error("Failed to generate:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Mock Data mapped to your family
  const students = [
    { id: 1, name: 'Alexandre', grade: 'Grade 8 Ontario', parent: 'David & Elena', avg: 92, lastActive: 'Yesterday - 92% on Linear Equations', avatar: '👦🏽', trend: 'up' },
    { id: 2, name: 'Liam Thompson', grade: 'Grade 8 Ontario', parent: 'Sarah Thompson', avg: 88, lastActive: 'Today - 85% on Fractions', avatar: '👨🏻', trend: 'up' },
    { id: 3, name: 'Emma Patel', grade: 'Grade 9 Ontario', parent: 'Raj Patel', avg: 74, lastActive: '2 days ago - 70% on Geometry', avatar: '👧🏽', trend: 'down' }
  ];

  const chartData = [
    { day: '1', score: 65 }, { day: '4', score: 70 }, { day: '8', score: 75 }, 
    { day: '12', score: 82 }, { day: '18', score: 88 }, { day: '22', score: 92 }
  ];

  const renderGrid = () => (
    <div className="animate-in fade-in">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Good evening, Ms. Patel ✨</h1>
          <p className="text-slate-500 font-medium mt-1">My Students ({students.length} active)</p>
        </div>
        <button className="bg-[#6D28D9] text-white font-bold py-3 px-6 rounded-xl hover:bg-purple-700 transition shadow-md">
          Invite New Student
        </button>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <div 
            key={student.id} 
            onClick={() => setSelectedStudent(student)}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-purple-300 transition cursor-pointer flex flex-col justify-between h-56"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl border border-slate-200">
                {student.avatar}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 leading-tight">{student.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{student.grade}</p>
                <p className="text-xs text-slate-400 mt-1">Parent: {student.parent}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-auto">
              <div className="flex-1 pr-4">
                <p className="text-xs text-slate-500 font-bold mb-1">Last Activity:</p>
                <p className="text-xs text-slate-600 leading-snug">{student.lastActive}</p>
              </div>
              
              {/* Circular Progress Indicator */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="175" strokeDashoffset={175 - (175 * student.avg) / 100} className={student.trend === 'up' ? "text-emerald-500" : "text-amber-500"} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase leading-none">Avg</span>
                  <span className="text-sm font-black text-slate-800 leading-none">{student.avg}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetail = () => (
    <div className="animate-in slide-in-from-right-8 duration-300 flex flex-col md:flex-row gap-8">
      
      {/* Detail Sidebar */}
      <aside className="w-full md:w-64 flex flex-col gap-3">
        <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-6 transition">
          <ArrowLeft size={18} /> Back to Grid
        </button>
        
        <div className="bg-[#2E1065] text-white p-6 rounded-2xl shadow-xl mb-4">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-3xl mb-4 border border-white/20">
            {selectedStudent.avatar}
          </div>
          <h2 className="font-bold text-xl mb-1">{selectedStudent.name}</h2>
          <p className="text-purple-200 text-sm mb-6">{selectedStudent.grade}</p>
          
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl text-sm font-bold transition border border-white/5">
              <Download size={16} /> PDF Report
            </button>
            <button className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl text-sm font-bold transition border border-white/5">
              <MessageSquare size={16} /> Message Parent
            </button>
            <button onClick={() => setShowPromptBuilder(true)} className="w-full flex items-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 px-4 py-3 rounded-xl text-sm font-bold transition shadow-lg mt-4 border border-purple-400">
              <Sparkles size={16} /> Custom Exercise
            </button>
          </div>
        </div>
      </aside>

      {/* Detail Main Content */}
      <div className="flex-1 space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-900 text-lg">Score History (Last 30 days)</h3>
            <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-lg text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Improving
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="score" stroke="#6D28D9" strokeWidth={4} dot={{r: 4, fill: '#6D28D9', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-slate-900">Activity Feed</h3>
            <div className="flex gap-2">
              <select className="bg-white border border-slate-200 text-sm font-bold text-slate-600 px-3 py-1.5 rounded-lg outline-none"><option>All Subjects</option></select>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { topic: 'Math - Algebra Basics', score: 91, note: 'Great job on isolating variables!' },
              { topic: 'Science - Physics Concepts', score: 88, note: 'Excellent understanding of velocity.' },
              { topic: 'English - Reading Comp.', score: 93, note: 'Strong summary skills.' }
            ].map((activity, i) => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition">
                <div>
                  <h4 className="font-bold text-slate-800">{activity.topic}</h4>
                  <p className="text-sm text-slate-500 mt-1">Score: {activity.score}%</p>
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hidden md:block w-1/2">
                  {activity.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#F4F4F5] font-sans overflow-hidden">
      {/* Global Tutor Sidebar */}
      <aside className="w-20 lg:w-64 bg-white border-r border-slate-200 flex flex-col justify-between py-6 z-20">
        <div>
          <div className="px-6 mb-10 hidden lg:flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xl">A</span></div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">AI Tutor Pro</h1>
          </div>
          <nav className="space-y-2 px-4">
            <button onClick={() => setSelectedStudent(null)} className="w-full flex items-center gap-3 bg-purple-50 text-purple-700 px-4 py-3 rounded-xl font-bold transition">
              <Users size={20} /> <span className="hidden lg:inline">My Students</span>
            </button>
            <Link to="#" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition">
              <FileText size={20} /> <span className="hidden lg:inline">Assignments</span>
            </Link>
          </nav>
        </div>
        <div className="px-4">
          <Link to="/dashboard/settings" className="flex items-center gap-3 text-slate-500 hover:bg-slate-50 px-4 py-3 rounded-xl font-medium transition">
            <Settings size={20} /> <span className="hidden lg:inline">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        {!selectedStudent ? renderGrid() : renderDetail()}

        {/* Gemini Prompt Builder Modal */}
        {showPromptBuilder && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#292929] w-full max-w-lg rounded-3xl shadow-2xl border border-[#3f3f3f] overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-[#3f3f3f] flex justify-between items-center">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Sparkles size={18} className="text-purple-400" /> Gemini Prompt Builder
                </div>
                <button onClick={() => { setShowPromptBuilder(false); setGeneratedExercises([]); setCustomPrompt(""); }} className="text-slate-400 hover:text-white transition">✕</button>
              </div>
              <div className="p-6">
                <p className="text-slate-300 text-sm mb-4">Command the AI to generate a highly targeted exercise block for <strong className="text-white">{selectedStudent?.name}</strong>.</p>
                {generatedExercises.length > 0 ? (
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                    {generatedExercises.map((ex, idx) => (
                      <div key={idx} className="bg-[#1e1e1e] p-4 rounded-xl border border-[#3f3f3f]">
                        <p className="text-white text-sm mb-2 font-medium">Q: {ex.question}</p>
                        <p className="text-emerald-400 text-xs font-mono">A: {ex.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <textarea 
                    value={customPrompt} 
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder={`Create 3 algebra word problems for ${selectedStudent?.name}...`}
                    className="w-full h-32 bg-[#1e1e1e] border border-[#3f3f3f] rounded-xl p-4 text-white font-mono text-sm outline-none focus:border-purple-500 resize-none mb-6"
                  ></textarea>
                )}
                <div className="flex justify-end gap-3">
                  <button onClick={() => { setShowPromptBuilder(false); setGeneratedExercises([]); setCustomPrompt(""); }} className="px-5 py-2.5 rounded-xl font-bold text-slate-300 hover:bg-[#3f3f3f] transition">Cancel</button>
                  <button onClick={handleGenerate} disabled={isGenerating || (!customPrompt && generatedExercises.length === 0)} className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-6 py-2.5 rounded-xl transition shadow-lg flex items-center gap-2">
                    <Sparkles size={16} /> {isGenerating ? "Thinking..." : generatedExercises.length > 0 ? "Assign to Student" : "Generate Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
