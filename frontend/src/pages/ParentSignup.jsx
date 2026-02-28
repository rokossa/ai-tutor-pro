import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ParentSignup() {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    username: '', 
    password: '', 
    country: 'Canada',
    region: 'Ontario' 
  });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Region Data
  const regionMap = {
    "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick", "PEI", "Newfoundland"],
    "United States": ["Texas", "California", "New York", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"]
  };

  const handleCountryChange = (e) => {
    const newCountry = e.target.value;
    setFormData({
      ...formData,
      country: newCountry,
      region: regionMap[newCountry][0] // Reset region to the first item of the new country
    });
  };

  const handleStandardSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API Call to backend /api/auth/register
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/verify-email');
    }, 1000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Initiating ${provider} OAuth flow...`);
    // In production, this redirects to your backend Passport.js routes:
    // window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-white font-bold text-2xl">A</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Create your Account</h2>
        <p className="text-slate-500 mt-2">Manage your family's AI tutoring experience.</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-200">
          
          {/* Social Auth Buttons */}
          <div className="space-y-3 mb-8">
            <button 
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button 
              onClick={() => handleSocialLogin('facebook')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm bg-[#1877F2] text-sm font-bold text-white hover:bg-[#166FE5] transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-300"></div></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500 font-medium">Or register with email</span></div>
          </div>

          {/* Standard Form */}
          <form className="space-y-5" onSubmit={handleStandardSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">First Name</label>
                <input type="text" required onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Last Name</label>
                <input type="text" required onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Username <span className="text-slate-400 font-normal">(Optional)</span></label>
                <input type="text" onChange={e => setFormData({...formData, username: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Email address</label>
                <input type="email" required onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
              <input type="password" required onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50" />
            </div>

            {/* Dynamic Country/Region Selectors */}
            <div className="grid grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Country</label>
                <select value={formData.country} onChange={handleCountryChange} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                  <option value="Canada">Canada</option>
                  <option value="United States">United States</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Province / State</label>
                <select value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-600 outline-none bg-white">
                  {regionMap[formData.country].map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Compliance */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input type="checkbox" required checked={agreed} onChange={() => setAgreed(!agreed)} className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-bold text-slate-700">I agree to the Terms of Service & Privacy Policy.</label>
                <p className="text-slate-500 text-xs mt-1">By proceeding, you agree to our COPPA (US) and PIPEDA (Canada) compliance notices regarding the management of minor data.</p>
              </div>
            </div>

            <button type="submit" disabled={!agreed || isSubmitting} className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition mt-6">
              {isSubmitting ? "Creating Account..." : "Sign Up Securely"}
            </button>
          </form>
          
          <div className="mt-8 text-center text-sm text-slate-600">
            Already have an account? <Link to="/login" className="font-bold text-blue-600 hover:text-blue-500">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
