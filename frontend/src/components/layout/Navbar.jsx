import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <Link to="/" className="text-xl font-bold text-slate-900 tracking-tight">AI Tutor Pro</Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition">Features</a>
            <a href="#curriculum" className="text-slate-600 hover:text-blue-600 font-medium transition">Curriculum</a>
            <a href="#pricing" className="text-slate-600 hover:text-blue-600 font-medium transition">Pricing</a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-slate-500 cursor-pointer hover:text-slate-900">EN / FR</span>
            <Link to="/onboarding" className="bg-slate-900 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-600 transition shadow-sm">
              Start Free Trial
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
