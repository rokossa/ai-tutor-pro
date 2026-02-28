#!/bin/bash

echo "🚀 Creating necessary directories..."
mkdir -p frontend/src/components/layout
mkdir -p frontend/src/pages/public
mkdir -p frontend/src/pages/errors

echo "✍️ Building the Global Footer..."
cat << 'EOF' > frontend/src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">AI Tutor Pro</span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm mb-6">
            Master your local school curriculum with an empathetic AI tutor. Bilingual, accessible, and designed for student success.
          </p>
          <div className="text-sm">© {new Date().getFullYear()} AI Tutor Pro. All rights reserved.</div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link to="/mission" className="hover:text-white transition">Our Mission</Link></li>
            <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
EOF

echo "✍️ Building the Public Layout Wrapper..."
cat << 'EOF' > frontend/src/components/layout/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        {/* The current route's page content will be injected here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
EOF

echo "✍️ Scaffolding the Pricing Page..."
cat << 'EOF' > frontend/src/pages/public/Pricing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <div className="bg-[#F8F9FA] py-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl mb-4">Simple, transparent pricing.</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-16">Everything your child needs to master their local curriculum, for less than the cost of one hour with a private tutor.</p>
        
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <div className="flex-1 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Basic</h3>
            <div className="text-slate-500 mb-6">For exploring the platform</div>
            <div className="text-5xl font-black text-slate-900 mb-6">$0<span className="text-lg text-slate-500 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8 text-left text-slate-600 flex-1">
              <li className="flex items-center gap-3"><span className="text-emerald-500">✓</span> Localized Content</li>
              <li className="flex items-center gap-3"><span className="text-emerald-500">✓</span> Instant AI Grading</li>
              <li className="flex items-center gap-3"><span className="text-emerald-500">✓</span> Gamified Learning (Limited)</li>
            </ul>
            <Link to="/signup/parent" className="w-full block py-4 rounded-xl font-bold text-slate-600 border border-slate-300 hover:bg-slate-50 transition">Get Started Free</Link>
          </div>

          {/* Pro Plan */}
          <div className="flex-1 bg-white rounded-3xl p-8 border-2 border-indigo-600 shadow-xl relative flex flex-col transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Most Popular</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Pro Subscription</h3>
            <div className="text-slate-500 mb-6">Unlock full curriculum mastery</div>
            <div className="text-5xl font-black text-indigo-600 mb-6">$14.99<span className="text-lg text-slate-500 font-medium">/mo</span></div>
            <ul className="space-y-4 mb-8 text-left text-slate-600 flex-1 font-medium">
              <li className="flex items-center gap-3"><span className="text-indigo-600 font-bold">✓</span> Unlimited Exercises</li>
              <li className="flex items-center gap-3"><span className="text-indigo-600 font-bold">✓</span> Full Parent PDF Reports</li>
              <li className="flex items-center gap-3"><span className="text-indigo-600 font-bold">✓</span> AI Companion Explanations</li>
              <li className="flex items-center gap-3"><span className="text-indigo-600 font-bold">✓</span> Monitor with Real Tutors</li>
            </ul>
            <Link to="/signup/parent" className="w-full block py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">Start 14-Day Free Trial</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
EOF

echo "✍️ Scaffolding the 404 Page..."
cat << 'EOF' > frontend/src/pages/errors/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center font-sans">
      <div className="text-9xl mb-4">🛸</div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">404 - Lost in Space</h1>
      <p className="text-slate-500 text-lg mb-8 max-w-md">We couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
      <Link to="/" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition">
        Take me home
      </Link>
    </div>
  );
}
EOF

echo "✍️ Generating Placeholder Content Pages to prevent blank screens..."
for page in About FAQ Mission Privacy Terms Contact; do
cat << EOF > frontend/src/pages/public/${page}.jsx
import React from 'react';

export default function ${page}() {
  return (
    <div className="py-24 px-8 max-w-4xl mx-auto min-h-[60vh] font-sans">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">${page}</h1>
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-slate-500">
        Content for the ${page} page will go here.
      </div>
    </div>
  );
}
EOF
done

echo "✍️ Rewriting App.jsx to use the Master Routing Table..."
cat << 'EOF' > frontend/src/App.jsx
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
EOF

echo "🚀 Committing and Pushing to Render..."
git add frontend/
git commit -m "feat: implement definitive routing table, public layout wrapper, footer, and pricing page"
git push origin main
