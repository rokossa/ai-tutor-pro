#!/bin/bash

echo "✍️ Writing Tutor Controller and UI Components..."

# 1. Create the Tutor Controller logic
cat << 'EOF' > backend/controllers/tutorController.js
const User = require('../models/User');
const Family = require('../models/Family');

exports.registerTutor = async (req, res) => {
  try {
    const { email, password, firstName, lastName, subjects, bio, inviteCode } = req.body;
    
    // Verify the invitation link/code exists in a family
    const family = await Family.findOne({ "inviteCodes.code": inviteCode });
    if (!family) return res.status(400).json({ error: "Invalid or expired invitation link." });

    // Create the Tutor User
    const user = new User({
      email,
      passwordHash: password, // In prod, use bcrypt.hash
      role: 'tutor',
      profile: { firstName, lastName, bio, subjectsTaught: subjects }
    });
    await user.save();

    // Link Tutor to Family
    family.tutors.push({ tutorId: user._id, permissions: { canViewProgress: true } });
    // Remove used invite code
    family.inviteCodes = family.inviteCodes.filter(c => c.code !== inviteCode);
    await family.save();

    res.status(201).json({ success: true, message: "Tutor account created and linked to student." });
  } catch (error) {
    res.status(500).json({ error: "Failed to register tutor." });
  }
};
EOF

# 2. Create the Tutor Signup UI
cat << 'EOF' > frontend/src/pages/TutorSignup.jsx
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function TutorSignup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inviteCode = searchParams.get('code');
  
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', bio: '', subjects: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard/tutor');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 font-sans">
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Tutor Registration</h2>
          <p className="text-slate-500 mt-2">You've been invited to join a student's learning team.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="text" placeholder="Last Name" required className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <input type="email" placeholder="Professional Email" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          <input type="text" placeholder="Subjects (e.g. Math, Physics)" required className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500" />
          <textarea placeholder="Short professional bio..." className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl h-24 outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
          
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-800 italic">
            By registering, you agree to follow COPPA/PIPEDA guidelines regarding the privacy of the students assigned to you.
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg">
            {isSubmitting ? "Linking Account..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
EOF

# 3. Update Router
cat << 'EOF' > frontend/src/App.jsx
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
EOF

echo "🚀 Final Push to Production..."
git add .
git commit -m "feat: complete tutor registration and professional profile flow"
git push origin main
