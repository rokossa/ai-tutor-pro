import React from 'react';
import { Globe, CheckCircle, BookOpen } from 'lucide-react';

export default function CurriculumInfo() {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Adaptive Standards. Local Success.</h1>
        <p className="text-xl text-slate-600 leading-relaxed">Didakt isn't just a math app. It's a curriculum-aware engine that aligns with the specific requirements of your child's school, wherever they are in North America.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="bg-[#F8F9FA] p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <Globe className="text-[#4338CA] mb-6" size={40} />
          <h3 className="text-2xl font-bold mb-4">Canada</h3>
          <p className="text-slate-600 mb-6">Fully aligned with Provincial Ministries of Education, including Ontario (Grade 1-12), British Columbia, Alberta, and Quebec standards.</p>
          <ul className="space-y-3 text-sm font-bold text-slate-500">
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#14b8a6]"/> Ontario Curriculum</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#14b8a6]"/> WNCP (Western Canada)</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#14b8a6]"/> Quebec Progression of Learning</li>
          </ul>
        </div>

        <div className="bg-[#F8F9FA] p-10 rounded-[40px] border border-slate-100 shadow-sm">
          <BookOpen className="text-[#4338CA] mb-6" size={40} />
          <h3 className="text-2xl font-bold mb-4">United States</h3>
          <p className="text-slate-600 mb-6">Built to master Common Core State Standards (CCSS) and state-specific frameworks like Texas (TEKS) and Florida (B.E.S.T.).</p>
          <ul className="space-y-3 text-sm font-bold text-slate-500">
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#14b8a6]"/> Common Core Aligned</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#14b8a6]"/> Texas TEKS Support</li>
            <li className="flex items-center gap-2"><CheckCircle size={16} className="text-[#14b8a6]"/> Florida B.E.S.T. Standards</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
