import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function MagicLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. Grab the secure token out of the URL string
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // 2. Save it to the browser, officially logging the student in
      localStorage.setItem('ai_tutor_token', token);
      
      // 3. Teleport them directly into the learning arena after a short loading animation
      setTimeout(() => {
        // Force a hard redirect so the Global Navbar updates to the "Connected" state
        window.location.href = '/practice/math/start'; 
      }, 2000);
    } else {
      setError('Invalid or expired magic link. Please ask your parent to generate a new one from the dashboard!');
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-4 text-center">
      {error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 max-w-md shadow-sm">
          <h2 className="font-bold text-xl mb-2">Oops!</h2>
          <p className="font-medium">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-16 h-16 bg-[#4338CA] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mb-6">
            <Loader2 className="animate-spin" size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Unlocking your AI Tutor...</h1>
          <p className="text-slate-500 font-medium text-lg">Loading your personalized learning path.</p>
        </div>
      )}
    </div>
  );
}
