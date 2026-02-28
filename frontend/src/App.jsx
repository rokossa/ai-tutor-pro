import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './i18n';

// Layouts
import PublicLayout from './components/layout/PublicLayout';

// 1. Public Pages
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Pricing = React.lazy(() => import('./pages/public/Pricing'));
const About = React.lazy(() => import('./pages/public/About'));
const Mission = React.lazy(() => import('./pages/public/Mission'));
const FAQ = React.lazy(() => import('./pages/public/FAQ'));
const Privacy = React.lazy(() => import('./pages/public/Privacy'));
const Terms = React.lazy(() => import('./pages/public/Terms'));
const Contact = React.lazy(() => import('./pages/public/Contact'));
const NotFound = React.lazy(() => import('./pages/errors/NotFound'));

// 2. Auth Pages
const ParentSignup = React.lazy(() => import('./pages/ParentSignup'));
const VerifyEmail = React.lazy(() => import('./pages/VerifyEmail'));
const AuthSuccess = React.lazy(() => import('./pages/AuthSuccess'));
const StudentSignup = React.lazy(() => import('./pages/StudentSignup'));
const TutorSignup = React.lazy(() => import('./pages/TutorSignup'));

// 3. Onboarding
const OnboardingFlow = React.lazy(() => import('./pages/OnboardingFlow'));

// 4. Dashboards & Core App (These provide their own sidebars/layouts)
const ParentDashboard = React.lazy(() => import('./pages/dashboard/ParentDashboard'));
const StudentDashboard = React.lazy(() => import('./pages/dashboard/StudentDashboard'));
const TutorDashboard = React.lazy(() => import('./pages/dashboard/TutorDashboard'));
const CourseView = React.lazy(() => import('./pages/CourseView'));
const PracticeArena = React.lazy(() => import('./pages/PracticeArena'));
const AccountSettings = React.lazy(() => import('./pages/dashboard/AccountSettings'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center text-indigo-600 font-bold text-xl animate-pulse">Loading Platform...</div>}>
        <Routes>
          
          {/* --- PUBLIC MARKETING ROUTES (Wrapped in PublicLayout for Navbar & Footer) --- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Catch-all 404 inside the layout so it still has nav/footer */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* --- AUTHENTICATION ROUTES --- */}
          <Route path="/login" element={<ParentSignup />} /> {/* Merged into signup for now */}
          <Route path="/register" element={<ParentSignup />} />
          <Route path="/signup/parent" element={<Navigate to="/register" replace />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          
          <Route path="/auth/magic/:token" element={<StudentSignup />} />
          <Route path="/student-join" element={<Navigate to="/auth/magic/demo" replace />} />
          <Route path="/tutor-join" element={<TutorSignup />} />

          {/* --- ONBOARDING FLOW --- */}
          <Route path="/onboarding/*" element={<OnboardingFlow />} />

          {/* --- PARENT ROUTES --- */}
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/dashboard/parent" element={<Navigate to="/parent/dashboard" replace />} />
          <Route path="/parent/children" element={<ParentDashboard />} />
          <Route path="/parent/billing" element={<AccountSettings />} />
          <Route path="/settings" element={<AccountSettings />} />

          {/* --- STUDENT ROUTES --- */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/dashboard/student" element={<Navigate to="/student/dashboard" replace />} />
          <Route path="/practice/courses" element={<StudentDashboard />} />
          <Route path="/practice/:course/chapters" element={<CourseView />} />
          <Route path="/course/:courseId" element={<Navigate to="/practice/math/chapters" replace />} />
          <Route path="/practice/:course/:chapter" element={<PracticeArena />} />
          <Route path="/practice" element={<Navigate to="/practice/math/linear-equations" replace />} />

          {/* --- TUTOR ROUTES --- */}
          <Route path="/tutor/dashboard" element={<TutorDashboard />} />
          <Route path="/dashboard/tutor" element={<Navigate to="/tutor/dashboard" replace />} />
          <Route path="/tutor/students" element={<TutorDashboard />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
