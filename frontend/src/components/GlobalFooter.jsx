import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function GlobalFooter() {
  const location = useLocation();
  
  if (location.pathname.includes('/practice/')) return null;

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 mt-auto text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4338CA] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">AI</div>
          <span className="text-white text-lg font-bold">Tutor Pro</span>
        </div>
        
        <div className="flex gap-8">
          <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link to="#" className="hover:text-white transition">Terms of Service</Link>
          <Link to="#" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition">Contact Us</Link>
        </div>
        
        <div className="text-slate-500">
          &copy; {new Date().getFullYear()} AI Tutor Pro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
