import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './i18n/i18n';

import PublicLayout from './components/layout/PublicLayout';

// 1. Public Pages
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const About = React.lazy(() => import('./pages/public/About'));
const CurriculumInfo = React.lazy(() => import('./pages/public/CurriculumInfo'));
const ParentInfo = React.lazy(() => import('./pages/public/ParentInfo'));
const Mission = React.lazy(() => import('./pages/public/Mission'));
const Pricing = React.lazy(() => import('./pages/public/Pricing'));
const Contact = React.lazy(() => import('./pages/public/Contact'));
const FAQ = React.lazy(() => import('./pages/public/FAQ'));
const Privacy = React.lazy(() => import('./pages/public/Privacy'));
const Terms = React.lazy(() => import('./pages/public/Terms'));
const NotFound = React.lazy(() => import('./pages/errors/NotFound'));

// 2. Auth Pages
const ParentSignup = React.lazy(() => import('./pages/ParentSignup'));
const AuthSuccess = React.lazy(() => import('./pages/AuthSuccess'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));
const MagicLogin = React.lazy(() => import('./pages/auth/MagicLogin'));
const StudentSignup = React.lazy(() => import('./pages/StudentSignup'));

// 3. Onboarding
const OnboardingFlow = React.lazy(() => import('./pages/OnboardingFlow'));

// 4. Dashboards & Core Views
const ParentDashboard = React.lazy(() => import('./pages/dashboard/ParentDashboard'));
const ChildProfile = React.lazy(() => import('./pages/dashboard/ChildProfile'));
const WeeklyReports = React.lazy(() => import('./pages/dashboard/WeeklyReports'));
const Billing = React.lazy(() => import('./pages/dashboard/Billing'));

const StudentDashboard = React.lazy(() => import('./pages/dashboard/StudentDashboard'));
const CourseView = React.lazy(() => import('./pages/CourseView'));
const PracticeArena = React.lazy(() => import('./pages/PracticeArena'));

const TutorDashboard = React.lazy(() => import('./pages/dashboard/TutorDashboard'));

const AccountSettings = React.lazy(() => import('./pages/dashboard/AccountSettings'));
const Notifications = React.lazy(() => import('./pages/shared/Notifications'));
const SubscriptionExpired = React.lazy(() => import('./pages/shared/SubscriptionExpired'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex h-screen items-center justify-center text-[#4338CA] font-bold text-xl animate-pulse">Loading Platform...</div>}>
        <Routes>
          
          {/* 1. PUBLIC MARKETING ROUTES (Uses Navbar/Footer) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/curriculum" element={<CurriculumInfo />} />
            <Route path="/parent-info" element={<ParentInfo />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/fbl" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* 2. AUTHENTICATION ROUTES */}
          <Route path="/login" element={<ParentSignup />} /> 
          <Route path="/register" element={<ParentSignup />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/auth/magic/:token" element={<MagicLogin />} />
          
          {/* 3. ONBOARDING FLOW */}
          <Route path="/onboarding/*" element={<OnboardingFlow />} />

          {/* 4. PARENT EXPERIENCE */}
          <Route path="/parent/dashboard" element={<ParentDashboard />} />
          <Route path="/parent/children" element={<ParentDashboard />} />
          <Route path="/parent/child/:childId" element={<ChildProfile />} />
          <Route path="/parent/reports" element={<WeeklyReports />} />
          <Route path="/parent/billing" element={<Billing />} />

          {/* 5. STUDENT EXPERIENCE */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/practice/courses" element={<StudentDashboard />} />
          <Route path="/practice/:course/chapters" element={<CourseView />} />
          <Route path="/practice/:course/:chapter" element={<PracticeArena />} />
          <Route path="/student/progress" element={<StudentDashboard />} />

          {/* 6. TUTOR EXPERIENCE */}
          <Route path="/tutor/dashboard" element={<TutorDashboard />} />
          <Route path="/tutor/students" element={<TutorDashboard />} />
          <Route path="/tutor/student/:childId" element={<ChildProfile />} />

          {/* 7. SHARED PAGES */}
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/subscription-required" element={<SubscriptionExpired />} />

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
