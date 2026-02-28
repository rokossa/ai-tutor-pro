import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ParentSignup() {
  const { t } = useTranslation();
  
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const handleGoogleLogin = () => {
    window.location.href = `${apiUrl}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${apiUrl}/auth/facebook`;
  };

  return (
    <div className="min-h-screen bg-[#F4F4F5] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 p-10">
        
        {/* Header matching your mockup */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center transform rotate-45">
              <div className="w-3 h-3 bg-white transform -rotate-45"></div>
            </div>
            <span className="text-xl font-bold text-slate-900">AI Tutor Pro</span>
          </div>
          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-lg overflow-hidden border border-indigo-200">
            👦🏽
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-[#1A1A1A] mb-8 text-center tracking-tight">
          Create your free parent account
        </h1>

        {/* Social Login Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button onClick={handleGoogleLogin} className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-300 rounded-xl py-3 px-4 hover:bg-slate-50 transition shadow-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            <span className="font-bold text-slate-700">Continue with Google</span>
          </button>
          
          <button onClick={handleFacebookLogin} className="flex-1 flex items-center justify-center gap-2 bg-[#4267B2] rounded-xl py-3 px-4 hover:bg-[#365899] transition shadow-sm">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            <span className="font-bold text-white">Continue with Facebook</span>
          </button>
        </div>

        <div className="text-center font-medium text-slate-500 mb-6">
          Sign up with Email
        </div>

        {/* Standard Email Form */}
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); window.location.href='/onboarding/welcome'; }}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Email address</label>
              <input type="email" required className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Password</label>
              <input type="password" required className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Country</label>
              <select className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white">
                <option>United States</option>
                <option>Canada</option>
              </select>
            </div>
            <div className="flex items-end">
               <button type="submit" className="w-full bg-[#2E2C4F] text-white font-bold py-3.5 rounded-xl hover:bg-[#1E1B4B] transition shadow-md">
                 Create Account
               </button>
            </div>
          </div>
        </form>

        <div className="mt-8 text-center text-slate-600 font-medium">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Log in</Link>
        </div>

      </div>
    </div>
  );
}
