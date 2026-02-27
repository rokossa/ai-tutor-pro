import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ParentSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', region: 'Ontario' });
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); navigate('/verify-email'); }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"><span className="text-white font-bold text-2xl">A</span></div>
        <h2 className="text-3xl font-extrabold text-slate-900">Create your Parent Account</h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-slate-200">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-slate-700">First Name</label><input type="text" required onChange={e => setFormData({...formData, firstName: e.target.value})} className="mt-1 w-full border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50" /></div>
              <div><label className="block text-sm font-medium text-slate-700">Last Name</label><input type="text" required onChange={e => setFormData({...formData, lastName: e.target.value})} className="mt-1 w-full border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50" /></div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700">Email address</label><input type="email" required onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 w-full border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50" /></div>
            <div><label className="block text-sm font-medium text-slate-700">Password</label><input type="password" required onChange={e => setFormData({...formData, password: e.target.value})} className="mt-1 w-full border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50" /></div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Province / State</label>
              <select onChange={e => setFormData({...formData, region: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-slate-800 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50">
                <option value="Ontario">Ontario</option><option value="Quebec">Quebec</option><option value="Texas">Texas</option><option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5"><input type="checkbox" required checked={agreed} onChange={() => setAgreed(!agreed)} className="w-4 h-4 text-blue-600 border-slate-300 rounded" /></div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-slate-700">I agree to the Terms of Service & Privacy Policy.</label>
                <p className="text-slate-500 text-xs mt-1">Includes COPPA (US) and PIPEDA (Canada) compliance notices.</p>
              </div>
            </div>
            <button type="submit" disabled={!agreed || isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50 transition">
              {isSubmitting ? "Creating Account..." : "Sign Up Securely"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
