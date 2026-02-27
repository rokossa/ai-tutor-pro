import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const OnboardingFlow = React.lazy(() => import('./pages/OnboardingFlow'));
const PracticeArena = React.lazy(() => import('./pages/PracticeArena'));
const CurriculumPage = React.lazy(() => import('./pages/CurriculumPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center text-blue-600 font-bold text-xl animate-pulse">Loading Platform...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<OnboardingFlow />} />
          <Route path="/practice" element={<PracticeArena />} />
          <Route path="/curriculum/:regionId" element={<CurriculumPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
