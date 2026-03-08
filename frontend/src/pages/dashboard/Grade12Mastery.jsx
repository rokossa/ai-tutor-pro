import React, { useState } from 'react';
import { Network, Target, AlertCircle, CheckCircle2, Lock, Database, ServerCrash } from 'lucide-react';

export default function Grade12Mastery() {
  const [activeSubject, setActiveSubject] = useState('Mathematics');
  const [dbStatus, setDbStatus] = useState('idle'); // idle, loading, connected, error
  const [dbMessage, setDbMessage] = useState('');
  
  // Mocking the backend Graph response for Grade 12 Calculus
  const graphData = [
    { id: 'algebra_foundations', name: 'Algebra Foundations', status: 'mastered', score: 0.95, isUnlocked: true },
    { id: 'limits', name: 'Limits', status: 'mastered', score: 0.88, isUnlocked: true },
    { id: 'continuity', name: 'Continuity', status: 'in_progress', score: 0.65, isUnlocked: true },
    { id: 'derivative_def', name: 'Derivative Definition', status: 'unknown', score: 0.0, isUnlocked: false },
    { id: 'derivative_rules', name: 'Derivative Rules', status: 'unknown', score: 0.0, isUnlocked: false },
    { id: 'optimization', name: 'Optimization', status: 'unknown', score: 0.0, isUnlocked: false }
  ];

  const testDatabaseConnection = async () => {
    setDbStatus('loading');
    try {
      // This calls the backend API route we built earlier
      const response = await fetch('/api/test-db');
      const data = await response.json();
      
      if (data.success) {
        setDbStatus('connected');
        setDbMessage(`Connected: ${data.data.db_name}`);
      } else {
        setDbStatus('error');
        setDbMessage('Connection failed.');
      }
    } catch (error) {
      setDbStatus('error');
      setDbMessage('Backend unreachable.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Grade 12 Mastery</h1>
            <p className="text-slate-500 font-medium mt-2">Knowledge Graph & Dependency Engine</p>
          </div>
          
          <div className="flex gap-4">
            {/* New Database Health Check Widget */}
            <button 
              onClick={testDatabaseConnection}
              className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 border transition-all ${
                dbStatus === 'connected' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                dbStatus === 'error' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {dbStatus === 'loading' ? (
                <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
              ) : dbStatus === 'connected' ? (
                <Database size={20} />
              ) : dbStatus === 'error' ? (
                <ServerCrash size={20} />
              ) : (
                <Database size={20} />
              )}
              {dbStatus === 'idle' ? 'Test DB Connection' : dbMessage}
            </button>

            <div className="bg-indigo-50 text-[#4338CA] px-6 py-3 rounded-2xl font-bold flex items-center gap-2 border border-indigo-100">
              <Network size={20} /> Adaptive Mode Active
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Target size={24} className="text-[#14b8a6]" /> Learning Path: Calculus
            </h2>
            
            <div className="space-y-4 relative">
              <div className="absolute left-8 top-10 bottom-10 w-1 bg-slate-100 z-0 rounded-full"></div>
              
              {graphData.map((node, index) => (
                <div key={node.id} className="relative z-10 flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm
                    ${node.status === 'mastered' ? 'bg-teal-50 text-[#14b8a6]' : 
                      node.status === 'in_progress' ? 'bg-amber-50 text-amber-500' : 'bg-slate-100 text-slate-400'}`}
                  >
                    {node.status === 'mastered' ? <CheckCircle2 size={28} /> : 
                     node.status === 'in_progress' ? <Target size={28} /> : <Lock size={28} />}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{node.name}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${node.score >= 0.8 ? 'bg-[#14b8a6]' : 'bg-amber-500'}`}
                          style={{ width: `${node.score * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-black text-slate-400 w-12 text-right">
                        {Math.round(node.score * 100)}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <button 
                      disabled={!node.isUnlocked}
                      className={`px-6 py-3 rounded-xl font-bold text-sm transition
                        ${node.isUnlocked 
                          ? 'bg-slate-900 text-white hover:bg-slate-800' 
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                    >
                      {node.status === 'mastered' ? 'Review' : 'Practice'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#4338CA] rounded-[32px] p-8 shadow-lg text-white">
              <h3 className="text-xl font-bold mb-4">AI Recommendation</h3>
              <p className="text-indigo-100 leading-relaxed text-sm mb-6">
                You are currently stuck on <strong>Continuity</strong>. We recommend reviewing your soft prerequisite skills before attempting another exercise.
              </p>
              <button className="w-full bg-white text-[#4338CA] font-black py-4 rounded-2xl shadow-md hover:bg-indigo-50 transition">
                Start Remediation
              </button>
            </div>

            <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle size={20} className="text-amber-500" /> Detected Misconceptions
              </h3>
              <div className="bg-amber-50 text-amber-800 p-4 rounded-2xl text-sm font-medium">
                Limits: Frequently struggles with rationalizing the numerator.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
