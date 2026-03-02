import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function GlobalFooter() {
  const location = useLocation();
  
  // Hide footer during practice sessions
  if (location.pathname.includes('/practice/')) return null;

  return (
    <footer className="bg-slate-900 py-16 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#4338CA] rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">D</div>
            <span className="text-white text-xl font-black">Didakt</span>
          </div>
          <p className="text-sm leading-relaxed">The world's most patient AI Tutor, built for Alexandre and students across North America.</p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/about" className="hover:text-[#4338CA] transition">About Us</Link></li>
            <li><Link to="/mission" className="hover:text-[#4338CA] transition">Our Mission</Link></li>
            <li><Link to="/contact" className="hover:text-[#4338CA] transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Resources</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/for-parents" className="hover:text-[#4338CA] transition">For Parents</Link></li>
            <li><Link to="/curriculum" className="hover:text-[#4338CA] transition">Curriculum</Link></li>
            <li><Link to="/faq" className="hover:text-[#4338CA] transition">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/pricing" className="hover:text-[#4338CA] transition">Pricing</Link></li>
            <li><Link to="/privacy" className="hover:text-[#4338CA] transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-[#4338CA] transition">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 mt-12 border-t border-slate-800 text-center text-xs font-semibold uppercase tracking-widest text-slate-600">
        &copy; 2026 AI Tutor Pro • Oakville, Ontario
      </div>
    </footer>
  );
}
