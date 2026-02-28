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
