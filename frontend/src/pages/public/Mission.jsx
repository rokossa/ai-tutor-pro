import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Mission() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 bg-white">
      <div className="max-w-3xl text-center">
        <Sparkles className="mx-auto text-amber-500 mb-6" size={48} />
        <h1 className="text-5xl font-black text-slate-900 mb-8 tracking-tight">The Patient Path to Mastery.</h1>
        <p className="text-2xl text-slate-600 leading-relaxed mb-10">Our mission is to replace frustration with curiosity. By using the <strong>Socratic Method</strong>, our AI Tutor guides students like Alexandre through critical thinking—never just handing over the answer, but helping them discover it themselves.</p>
        <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 italic text-slate-500 text-lg">
          "We believe every student is one 'Aha!' moment away from loving math. Our job is to be the world's most patient guide to that moment."
        </div>
      </div>
    </div>
  );
}
