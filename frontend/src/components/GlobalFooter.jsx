import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function GlobalFooter() {
  const location = useLocation();
  
  // Hide the footer when in the immersive Practice Arena
  if (location.pathname.includes('/practice/')) return null;

  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <div className="font-medium">&copy; {new Date().getFullYear()} AI Tutor Pro. All rights reserved.</div>
        <div className="flex gap-6 font-medium">
          <Link to="/pricing" className="hover:text-[#4338CA] transition">Pricing</Link>
          <Link to="#" className="hover:text-[#4338CA] transition">Terms</Link>
          <Link to="#" className="hover:text-[#4338CA] transition">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
