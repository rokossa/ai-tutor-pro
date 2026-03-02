import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalNavbar from './components/GlobalNavbar';
import GlobalFooter from './components/GlobalFooter';

import './i18n'; 

// Lazy Loading Dashboard & Auth
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ParentSignup = React.lazy(() => import('./pages/ParentSignup'));
const AuthSuccess = React.lazy(() => import('./pages/AuthSuccess'));
const MagicLogin = React.lazy(() => import('./pages/auth/MagicLogin'));
const OnboardingFlow = React.lazy(() => import('./pages/OnboardingFlow'));
const ParentDashboard = React.lazy(() => import('./pages/dashboard/ParentDashboard'));
const StudentDashboard = React.lazy(() => import('./pages/dashboard/StudentDashboard'));
const TutorDashboard = React.lazy(() => import('./pages/dashboard/TutorDashboard'));
const Settings = React.lazy(() => import('./pages/dashboard/Settings'));
const PracticeArena = React.lazy(() => import('./pages/PracticeArena'));
const PracticeSummary = React.lazy(() => import('./pages/PracticeSummary'));
const NotFound = React.lazy(() => import('./pages/errors/NotFound'));

// Lazy Loading PUBLIC/FOOTER PAGES (Restoring these)
const About = React.lazy(() => import('./pages/public/About'));
const Contact = React.lazy(() => import('./pages/public/Contact'));
const CurriculumInfo = React.lazy(() => import('./pages/public/CurriculumInfo'));
const FAQ = React.lazy(() => import('./pages/public/FAQ'));
const Mission = React.lazy(() => import('./pages/public/Mission'));
const ParentInfo = React.lazy(() => import('./pages/public/ParentInfo'));
const Pricing = React.lazy(() => import('./pages/public/Pricing'));
const Privacy = React.lazy(() => import('./pages/public/Privacy'));
const Terms = React.lazy(() => import('./pages/public/Terms'));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
        <GlobalNavbar />
        <main className="flex-grow flex flex-col">
          <Suspense fallback={
            <div className="flex-grow flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-[#4338CA] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              {/* Marketing & Public Pages */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/curriculum" element={<CurriculumInfo />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/for-parents" element={<ParentInfo />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Auth Routes */}
              <Route path="/login" element={<ParentSignup />} />
              <Route path="/register" element={<ParentSignup />} />
              <Route path="/auth-success" element={<AuthSuccess />} />
              <Route path="/magic-login" element={<MagicLogin />} />
              
              {/* Dashboard & Practice */}
              <Route path="/onboarding/*" element={<OnboardingFlow />} />
              <Route path="/parent/dashboard" element={<ParentDashboard />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/tutor/dashboard" element={<TutorDashboard />} />
              <Route path="/parent/settings" element={<Settings />} />
              <Route path="/practice/:course/:chapter" element={<PracticeArena />} />
              <Route path="/practice/summary" element={<PracticeSummary />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <GlobalFooter />
      </div>
    </Router>
  );
}

export default App;
