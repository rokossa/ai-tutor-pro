import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function GlobalNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ai_tutor_token');
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('ai_tutor_token');
    localStorage.removeItem('active_student_id');
    setIsLoggedIn(false);
    // Force a hard browser redirect to flush all React state and boot the user
    window.location.href = '/login'; 
  };

  // Hide this generic nav on your custom Landing Page and Practice Arena
  if (location.pathname === '/' || location.pathname.includes('/practice/')) return null;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-[#4338CA] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">AI</div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">Tutor Pro</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-[#4338CA] hidden sm:block transition">Pricing</Link>
          {isLoggedIn ? (
            <>
              <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Connected</span>
              </div>
              <Link to="/parent/dashboard" className="text-sm font-bold text-[#4338CA] hover:text-indigo-800 transition">Dashboard</Link>
              <Link to="/parent/settings" className="text-sm font-bold text-slate-500 hover:text-[#4338CA] transition">Settings</Link>
              <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-red-600 transition">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-[#4338CA] transition">Log in</Link>
              <Link to="/login" className="bg-[#4338CA] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-indigo-800 transition shadow-md">Start Free Trial</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
