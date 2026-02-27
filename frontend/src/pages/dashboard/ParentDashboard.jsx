import React, { useState } from 'react';
import Navbar from '../../components/layout/Navbar';

export default function ParentDashboard() {
  const [inviteCode, setInviteCode] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const family = {
    children: [{ id: 1, name: 'Alexandre', grade: 'Grade 8', avatar: '🏀' }],
    tutors: []
  };

  const handleGenerateStudentInvite = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setInviteCode("X7B9TQ");
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Family Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">My Students</h2>
                <button onClick={handleGenerateStudentInvite} disabled={isGenerating} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                  {isGenerating ? "Generating..." : "+ Add Child"}
                </button>
              </div>
              {inviteCode && (
                <div className="mb-6 bg-blue-50 border border-blue-200 p-4 rounded-xl flex justify-between items-center animate-in fade-in">
                  <div>
                    <p className="text-sm text-blue-800 font-bold">Student Invite Code</p>
                    <p className="text-xs text-blue-600">Give this to your child to create their account. Expires in 48 hours.</p>
                  </div>
                  <div className="text-3xl font-mono font-black text-blue-900 tracking-widest bg-white px-4 py-2 rounded shadow-sm">{inviteCode}</div>
                </div>
              )}
              <div className="space-y-4">
                {family.children.map(child => (
                  <div key={child.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm border border-slate-200">{child.avatar}</div>
                      <div>
                        <h3 className="font-bold text-slate-900">{child.name}</h3>
                        <p className="text-sm text-slate-500">{child.grade}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-blue-600 font-medium text-sm">View Progress →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Learning Team</h2>
              <p className="text-sm text-slate-500 mb-4">Invite co-parents or tutors to help manage your children's progress.</p>
              <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">Invite Tutor / Teacher</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
