import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const OnboardingFlow = React.lazy(() => import('./pages/OnboardingFlow'));
const PracticeArena = React.lazy(() => import('./pages/PracticeArena'));
const CurriculumPage = React.lazy(() => import('./pages/CurriculumPage'));
const ParentDashboard = React.lazy(() => import('./pages/dashboard/ParentDashboard'));
const AccountSettings = React.lazy(() => import('./pages/dashboard/AccountSettings'));
const StudentSignup = React.lazy(() => import('./pages/StudentSignup'));
const ParentSignup = React.lazy(() => import('./pages/ParentSignup'));
const VerifyEmail = React.lazy(() => import('./pages/VerifyEmail'));
const TutorSignup = React.lazy(() => import('./pages/TutorSignup'));

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
          <Route path="/dashboard/settings" element={<AccountSettings />} />
          <Route path="/student-join" element={<StudentSignup />} />
          <Route path="/signup/parent" element={<ParentSignup />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/tutor-join" element={<TutorSignup />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
