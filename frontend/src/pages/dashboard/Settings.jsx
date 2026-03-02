import React, { useState, useEffect } from 'react';
import { User, Lock, Trash2, UserMinus, Save, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [role, setRole] = useState(localStorage.getItem('user_role') || 'parent');
  
  // Mocked list of connected parents for the Tutor view
  const [connections, setConnections] = useState([
    { id: 'parent_david_123', name: 'David King', students: ['Alexandre'] }
  ]);

  const handleDecouple = (parentId) => {
    if (window.confirm("Are you sure? You will lose visibility of all students belonging to this parent.")) {
      setConnections(connections.filter(c => c.id !== parentId));
      // Logic to hit /api/tutor/decouple would go here
    }
  };

  return (
    <div className="min-h-screen bg-[#Eef0f4] p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row min-h-[650px]">
        
        {/* Sidebar */}
        <div className="w-full md:w-72 bg-slate-50 border-r border-slate-100 p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tighter">Settings</h2>
          <nav className="space-y-2">
            <button onClick={() => setActiveSection('profile')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeSection === 'profile' ? 'bg-white text-[#4338CA] shadow-sm' : 'text-slate-500 hover:bg-white'}`}><User size={18}/> Profile</button>
            <button onClick={() => setActiveSection('security')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeSection === 'security' ? 'bg-white text-[#4338CA] shadow-sm' : 'text-slate-500 hover:bg-white'}`}><Lock size={18}/> Security</button>
            {role === 'tutor' && (
              <button onClick={() => setActiveSection('connections')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeSection === 'connections' ? 'bg-white text-[#4338CA] shadow-sm' : 'text-slate-500 hover:bg-white'}`}><UserMinus size={18}/> Connections</button>
            )}
            {role !== 'student' && (
              <button onClick={() => setActiveSection('danger')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeSection === 'danger' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:bg-white'}`}><Trash2 size={18}/> Delete Account</button>
            )}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 md:p-12">
          {activeSection === 'connections' && role === 'tutor' && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <h3 className="text-xl font-black text-slate-900 mb-2">Managed Families</h3>
              <p className="text-sm text-slate-500 mb-8 font-medium">Decouple from a parent to remove visibility of their students' progress.</p>
              <div className="space-y-4">
                {connections.map(parent => (
                  <div key={parent.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div>
                      <p className="font-bold text-slate-800">{parent.name}</p>
                      <p className="text-xs text-slate-400 font-bold uppercase">Students: {parent.students.join(', ')}</p>
                    </div>
                    <button onClick={() => handleDecouple(parent.id)} className="flex items-center gap-2 text-xs font-black text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition">
                      Decouple
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'danger' && role !== 'student' && (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex gap-4 mb-8">
                <AlertTriangle className="text-red-600 shrink-0" size={24} />
                <p className="text-sm text-red-800 font-medium">Warning: Deleting your account will permanently erase your data and all linked student records. This cannot be undone.</p>
              </div>
              <button className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-red-700 transition">
                Permanently Delete My Account
              </button>
            </div>
          )}
          
          {/* Profile and Security sections remain as defined previously... */}
        </div>
      </div>
    </div>
  );
}
