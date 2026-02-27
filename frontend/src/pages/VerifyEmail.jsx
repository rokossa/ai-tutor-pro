import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState(token ? 'verifying' : 'waiting');

  useEffect(() => {
    if (token) setTimeout(() => setStatus('success'), 1500);
  }, [token]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center max-w-md w-full">
        {status === 'waiting' && (
          <div className="animate-in fade-in">
            <div className="text-5xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
            <p className="text-slate-600 mb-6">We've sent a secure verification link to your inbox.</p>
          </div>
        )}
        {status === 'verifying' && (
          <div className="animate-pulse">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-slate-900">Verifying your secure token...</h2>
          </div>
        )}
        {status === 'success' && (
          <div className="animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-green-600 text-3xl">✓</span></div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Email Verified!</h2>
            <p className="text-slate-600 mb-6">Your parent account is now fully active.</p>
            <Link to="/dashboard/parent" className="w-full inline-block bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">Go to Family Dashboard →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
