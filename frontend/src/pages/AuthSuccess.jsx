import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      localStorage.setItem('ai_tutor_token', token);
      setTimeout(() => navigate('/dashboard/parent'), 1000);
    } else {
      navigate('/signup/parent');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="text-center animate-in zoom-in">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Authenticating Securely...</h2>
        <p className="text-slate-400">Loading your family dashboard.</p>
      </div>
    </div>
  );
}
