import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function GlobalNavbar() {
  const [user, setUser] = useState({ loggedIn: false, role: null });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ai_tutor_token');
    // For now, we simulate role detection. In production, this comes from the JWT.
    let role = localStorage.getItem('user_role') || 'parent'; 
    if (location.pathname.includes('/student') || location.pathname.includes('/magic-login')) role = 'student';
    if (location.pathname.includes('/tutor')) role = 'tutor';

    setUser({ loggedIn: !!token, role: token ? role : null });
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; 
  };

  if (location.pathname.includes('/practice/')) return null;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4338CA] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">AI</div>
          <span className="font-extrabold text-xl text-slate-900 tracking-tight">Tutor Pro</span>
        </Link>

        <div className="flex items-center gap-6">
          {!user.loggedIn ? (
            <>
              <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-[#4338CA]">Pricing</Link>
              <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-[#4338CA]">Log in</Link>
              <Link to="/register" className="bg-[#4338CA] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-indigo-800 transition shadow-md">Start Free Trial</Link>
            </>
          ) : (
            <>
              {/* Parent Menu */}
              {user.role === 'parent' && (
                <>
                  <Link to="/parent/dashboard" className="text-sm font-bold text-[#4338CA]">Family View</Link>
                  <Link to="/parent/settings" className="text-sm font-bold text-slate-500 hover:text-[#4338CA]">Billing</Link>
                </>
              )}
              {/* Student Menu */}
              {user.role === 'student' && (
                <Link to="/student/dashboard" className="text-sm font-bold text-[#14b8a6]">My Lessons</Link>
              )}
              {/* Tutor Menu */}
              {user.role === 'tutor' && (
                <Link to="/tutor/dashboard" className="text-sm font-bold text-purple-600">Student Roster</Link>
              )}
              <button onClick={handleLogout} className="text-sm font-medium text-slate-500 hover:text-red-600 transition">Sign Out</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
