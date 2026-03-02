import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalNavbar from './components/GlobalNavbar';
import GlobalFooter from './components/GlobalFooter';
import SmartHome from './components/SmartHome';

// Lazy load pages for performance
const Login = React.lazy(() => import('./pages/auth/Login'));
const AuthSuccess = React.lazy(() => import('./pages/auth/AuthSuccess'));
const Welcome = React.lazy(() => import('./pages/onboarding/Welcome'));
const AddChild = React.lazy(() => import('./pages/onboarding/AddChild'));
const AddCurriculum = React.lazy(() => import('./pages/onboarding/AddCurriculum'));
const InviteTutor = React.lazy(() => import('./pages/onboarding/InviteTutor'));
const Pricing = React.lazy(() => import('./pages/public/Pricing'));
const ParentDashboard = React.lazy(() => import('./pages/dashboard/ParentDashboard'));
const PracticeArena = React.lazy(() => import('./pages/PracticeArena'));

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
              {/* Public Routes */}
              <Route path="/" element={<SmartHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/auth-success" element={<AuthSuccess />} />
              
              {/* Onboarding Flow */}
              <Route path="/onboarding/welcome" element={<Welcome />} />
              <Route path="/onboarding/add-child" element={<AddChild />} />
              <Route path="/onboarding/curriculum" element={<AddCurriculum />} />
              <Route path="/onboarding/invite-tutor" element={<InviteTutor />} />
              
              {/* Dashboard & Practice */}
              <Route path="/parent/dashboard" element={<ParentDashboard />} />
              <Route path="/practice/:course/:chapter" element={<PracticeArena />} />
            </Routes>
          </Suspense>
        </main>
        <GlobalFooter />
      </div>
    </Router>
  );
}

export default App;
