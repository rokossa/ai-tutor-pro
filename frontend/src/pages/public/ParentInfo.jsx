import React from 'react';
import { Mail, ShieldCheck, Users } from 'lucide-react';

export default function ParentInfo() {
  return (
    <div className="min-h-screen bg-[#F4F6FA] py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-black text-slate-900 mb-12 text-center">Built for Busy Parents in Oakville and Beyond.</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[32px] shadow-sm">
            <Mail className="text-[#4338CA] mb-4" size={32} />
            <h4 className="font-bold text-xl mb-2">Smart HTML Reports</h4>
            <p className="text-sm text-slate-500 leading-relaxed">No more PDF attachments. Receive beautiful, mobile-friendly HTML reports directly in your inbox to see Alexandre's progress instantly.</p>
          </div>
          
          <div className="bg-white p-8 rounded-[32px] shadow-sm">
            <Users className="text-[#4338CA] mb-4" size={32} />
            <h4 className="font-bold text-xl mb-2">Tutor Handshake</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Easily link your child to a professional tutor. Your tutor can monitor scores and provide personalized guidance through the platform.</p>
          </div>

          <div className="bg-white p-8 rounded-[32px] shadow-sm">
            <ShieldCheck className="text-[#4338CA] mb-4" size={32} />
            <h4 className="font-bold text-xl mb-2">Safe & Secure</h4>
            <p className="text-sm text-slate-500 leading-relaxed">Parent-controlled accounts mean you handle the billing and student access. Your data is protected and never sold.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
