#!/bin/bash

echo "✍️ Creating the missing AuthSuccess page..."
cat << 'EOF' > frontend/src/pages/AuthSuccess.jsx
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
EOF

echo "✍️ Resetting App.jsx to guarantee clean routing..."
cat << 'EOF' > frontend/src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const OnboardingFlow = React.lazy(() => import('./pages/OnboardingFlow'));
const PracticeArena = React.lazy(() => import('./pages/PracticeArena'));
const CurriculumPage = React.lazy(() => import('./pages/CurriculumPage'));
const ParentDashboard = React.lazy(() => import('./pages/dashboard/ParentDashboard'));
const StudentDashboard = React.lazy(() => import('./pages/dashboard/StudentDashboard'));
const AccountSettings = React.lazy(() => import('./pages/dashboard/AccountSettings'));
const StudentSignup = React.lazy(() => import('./pages/StudentSignup'));
const ParentSignup = React.lazy(() => import('./pages/ParentSignup'));
const VerifyEmail = React.lazy(() => import('./pages/VerifyEmail'));
const TutorSignup = React.lazy(() => import('./pages/TutorSignup'));
const AuthSuccess = React.lazy(() => import('./pages/AuthSuccess'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center text-blue-600 font-bold text-xl animate-pulse">Loading Platform...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route path="/practice" element={<PracticeArena />} />
          <Route path="/curriculum/:regionId" element={<CurriculumPage />} />
          <Route path="/dashboard/parent" element={<ParentDashboard />} />
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/settings" element={<AccountSettings />} />
          <Route path="/student-join" element={<StudentSignup />} />
          <Route path="/signup/parent" element={<ParentSignup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/tutor-join" element={<TutorSignup />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
EOF

echo "🚀 Pushing the fix to Render..."
git add frontend/src/pages/AuthSuccess.jsx frontend/src/App.jsx
git commit -m "fix: guarantee AuthSuccess exists and App.jsx routing is clean"
git push origin main
