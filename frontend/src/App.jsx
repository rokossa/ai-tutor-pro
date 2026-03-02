import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalNavbar from './components/GlobalNavbar';
import GlobalFooter from './components/GlobalFooter';
import './i18n'; // Ensuring translations stay perfectly intact!

// Lazy loading all exact files
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ParentSignup = React.lazy(() => import('./pages/ParentSignup'));
const AuthSuccess = React.lazy(() => import('./pages/AuthSuccess'));
const MagicLogin = React.lazy(() => import('./pages/auth/MagicLogin')); // <-- The new interceptor
const OnboardingFlow = React.lazy(() => import('./pages/OnboardingFlow'));
const Pricing = React.lazy(() => import('./pages/public/Pricing'));
const ParentDashboard = React.lazy(() => import('./pages/dashboard/ParentDashboard'));
const Settings = React.lazy(() => import('./pages/dashboard/Settings'));
const PracticeArena = React.lazy(() => import('./pages/PracticeArena'));
const NotFound = React.lazy(() => import('./pages/errors/NotFound'));

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
              {/* Core Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<ParentSignup />} />
              <Route path="/auth-success" element={<AuthSuccess />} />
              <Route path="/magic-login" element={<MagicLogin />} /> {/* <-- The new route */}
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Authenticated Routes */}
              <Route path="/onboarding/*" element={<OnboardingFlow />} />
              <Route path="/parent/dashboard" element={<ParentDashboard />} />
              <Route path="/parent/settings" element={<Settings />} />
              <Route path="/practice/:course/:chapter" element={<PracticeArena />} />
              
              {/* Fallback */}
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
