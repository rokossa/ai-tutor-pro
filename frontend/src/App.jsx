import React, { Suspense, useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AlertCircle, Clock } from 'lucide-react';
import GlobalNavbar from './components/GlobalNavbar';
import GlobalFooter from './components/GlobalFooter';

import './i18n'; 

// Lazy Loading Components
const ParentSignup = React.lazy(() => import('./pages/ParentSignup'));
const About = React.lazy(() => import('./pages/public/About'));
const ParentDashboard = React.lazy(() => import('./pages/dashboard/ParentDashboard'));
// ... other imports ...

function App() {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showWarning, setShowWarning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(60);
  
  const INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 Minutes
  const WARNING_THRESHOLD = 9 * 60 * 1000; // 9 Minutes (Start warning at 1 min left)

  const handleReset = useCallback(() => {
    setLastActivity(Date.now());
    setShowWarning(false);
    setRemainingSeconds(60);
  }, []);

  useEffect(() => {
    const handleActivity = () => { if (!showWarning) setLastActivity(Date.now()); };
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);

    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivity;
      
      if (elapsed > INACTIVITY_LIMIT) {
        localStorage.clear();
        window.location.href = '/login?reason=timeout';
      } else if (elapsed > WARNING_THRESHOLD) {
        setShowWarning(true);
        setRemainingSeconds(Math.floor((INACTIVITY_LIMIT - elapsed) / 1000));
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      clearInterval(interval);
    };
  }, [lastActivity, showWarning]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
        <GlobalNavbar />
        
        {/* Session Warning Modal */}
        {showWarning && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <div className="bg-white rounded-[32px] p-10 max-w-sm w-full shadow-2xl text-center border border-white">
              <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Session Expiring</h3>
              <p className="text-slate-500 font-medium mb-8">
                You've been inactive. You will be logged out in <span className="text-[#4338CA] font-black">{remainingSeconds}s</span> for security.
              </p>
              <button 
                onClick={handleReset}
                className="w-full bg-[#4338CA] text-white py-4 rounded-2xl font-black shadow-lg hover:bg-indigo-700 transition"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        )}

        <main className="flex-grow flex flex-col">
          <Suspense fallback={<div className="flex-grow flex items-center justify-center animate-pulse">Loading Didakt...</div>}>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/login" element={<ParentSignup />} />
              <Route path="/parent/dashboard" element={<ParentDashboard />} />
              {/* ... other routes ... */}
            </Routes>
          </Suspense>
        </main>
        <GlobalFooter />
      </div>
    </Router>
  );
}

export default App;
