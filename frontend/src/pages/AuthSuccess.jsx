import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // 1. Save the token to local storage so the user stays logged in
      localStorage.setItem('ai_tutor_token', token);
      
      // 2. Redirect them to the Dashboard (or Onboarding flow)
      setTimeout(() => navigate('/parent/dashboard'), 1500); 
    } else {
      navigate('/login');
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] font-sans">
      <div className="w-16 h-16 border-4 border-[#4338CA] border-t-transparent rounded-full animate-spin mb-6 shadow-lg"></div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Authenticating...</h2>
      <p className="text-slate-500 font-medium">Preparing your personalized dashboard.</p>
    </div>
  );
}
