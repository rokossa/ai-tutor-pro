import React, { useState } from 'react';
import { Users, FileText, Lock, MessageCircle, User, PlusCircle, Link as LinkIcon, Check } from 'lucide-react';

export default function TutorDashboard() {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mocked Tutor ID - in production this comes from your Auth token
  const tutorId = "tutor_ms_patel_123"; 
  const inviteLink = `${window.location.origin}/register?ref=${tutorId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const students = [
    { name: 'Alexandre King', grade: 'Grade 8', parent: 'David King', lastActivity: '13m ago', topic: 'Linear Equations', score: 72 },
    { name: 'Olivia Wilson', grade: 'Grade 8', parent: 'Mr. Wilson', lastActivity: '2h ago', topic: 'Quadratic Equations', score: 88 }
  ];

  return (
    <div className="min-h-screen bg-[#Eef0f4] flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-white/80 backdrop-blur-md p-6 border-r border-white/50 hidden lg:flex flex-col gap-8">
        <div className="font-black text-2xl text-slate-900 tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-xs">D</div>
          Didakt
        </div>
        <nav className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-[#4338CA] font-bold bg-indigo-50 p-3 rounded-xl"><Users size={20}/> My Students</div>
          <div className="flex items-center gap-3 text-slate-500 font-medium p-3 hover:bg-slate-50 rounded-xl cursor-pointer"><FileText size={20}/> Reports</div>
          <div className="flex items-center gap-3 text-slate-500 font-medium p-3 hover:bg-slate-50 rounded-xl cursor-pointer"><MessageCircle size={20}/> Messages</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 sm:p-12 relative">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-slate-900">Student Roster</h1>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-white font-bold text-slate-700">
            Ms. Patel 😄
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, idx) => (
            <div key={idx} className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 transition hover:shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><User size={24}/></div>
                <div>
                  <h3 className="font-bold text-xl text-slate-800">{student.name}</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase">{student.grade}</p>
                </div>
              </div>
              <div className="space-y-1 mb-6">
                <p className="text-sm text-slate-400 font-medium italic">Parent: {student.parent}</p>
                <p className="text-sm text-slate-700 font-bold">{student.topic}</p>
              </div>
              <div className="flex justify-between items-end pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Connected</span>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Score</p>
                  <p className="text-3xl font-black text-[#14b8a6]">{student.score}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Action Button: Invite Parent */}
          <div 
            onClick={() => setShowInviteModal(true)}
            className="bg-slate-200/50 rounded-[32px] p-6 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-200 transition group"
          >
            <PlusCircle size={40} className="text-slate-400 mb-2 group-hover:text-[#4338CA] transition"/>
            <span className="font-bold text-slate-600 group-hover:text-slate-900">Invite a Parent</span>
            <p className="text-[10px] text-slate-400 mt-2 max-w-[150px]">Link to a new family and their students.</p>
          </div>
        </div>

        {/* Invite Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <h2 className="text-3xl font-black text-slate-900 mb-2 text-center">Grow your Roster</h2>
              <p className="text-slate-500 text-center mb-8">Send this link to a parent. Once they sign up, you'll be automatically assigned to their students.</p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between mb-8">
                <code className="text-xs text-[#4338CA] font-bold truncate mr-4">{inviteLink}</code>
                <button 
                  onClick={copyToClipboard}
                  className="bg-white border border-slate-200 p-2 rounded-xl hover:bg-slate-50 transition"
                >
                  {copied ? <Check size={20} className="text-emerald-500"/> : <LinkIcon size={20} className="text-slate-400"/>}
                </button>
              </div>

              <button 
                onClick={() => setShowInviteModal(false)}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
