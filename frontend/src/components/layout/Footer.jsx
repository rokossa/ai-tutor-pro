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
