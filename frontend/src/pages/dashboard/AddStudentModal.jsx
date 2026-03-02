import React, { useState } from 'react';
import { X, UserPlus, GraduationCap, Mail, Sparkles } from 'lucide-react';

export default function AddStudentModal({ isOpen, onClose, onAdded }) {
  const [formData, setFormData] = useState({ name: '', grade: '8', email: '', region: 'Ontario' });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Hits the refined backend controller that triggers the Welcome Email
      const response = await fetch('/api/parent/add-student', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('ai_tutor_token')}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const newStudent = await response.json();
        onAdded(newStudent);
        onClose();
      }
    } catch (err) {
      console.error("Error adding student:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[10000] flex items-center justify-center p-4">
      <div className="bg-white rounded-[40px] p-10 max-w-lg w-full shadow-2xl animate-in zoom-in duration-200 border border-white">
        <div className="flex justify-between items-center mb-8">
          <div className="w-12 h-12 bg-indigo-50 text-[#4338CA] rounded-2xl flex items-center justify-center shadow-sm">
            <UserPlus size={24} />
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-900 transition"><X size={24} /></button>
        </div>

        <h2 className="text-3xl font-black text-slate-900 mb-2">Add a Student</h2>
        <p className="text-slate-500 font-medium mb-8 text-sm">Create a profile for your child to begin their Socratic learning journey.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input 
              required
              type="text" 
              placeholder="Child's Full Name (e.g. Alexandre)"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#4338CA] transition"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <select 
                className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#4338CA]"
                value={formData.grade}
                onChange={(e) => setFormData({...formData, grade: e.target.value})}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i+1} value={i+1}>Grade {i+1}</option>
                ))}
              </select>
              <input 
                type="email" 
                placeholder="Child's Email"
                className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold outline-none focus:border-[#4338CA]"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-[24px] hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? 'Sending Onboarding Email...' : 'Add & Send Personalized Invite'}
          </button>
        </form>
      </div>
    </div>
  );
}
