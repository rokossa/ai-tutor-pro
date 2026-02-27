import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function TutorSignup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inviteCode = searchParams.get('code');
  
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', bio: '', subjects: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/tutor');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 font-sans">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Tutor Registration</h2>
          <p className="text-slate-500 mt-2">You've been invited to join a student's learning team.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Last Name" required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <input type="email" placeholder="Professional Email" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          <input type="text" placeholder="Subjects (e.g. Math, Physics)" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          <textarea placeholder="Short professional bio..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-800 italic">
            By registering, you agree to follow COPPA/PIPEDA guidelines regarding the privacy of the students assigned to you.
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg">
            {isSubmitting ? "Linking Account..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
