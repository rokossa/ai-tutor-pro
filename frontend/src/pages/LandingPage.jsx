import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeGrade, setActiveGrade] = useState('Grade 8');

  // Interactive Curriculum Data to showcase "The What" immediately
  const previewCurriculum = {
    'Grade 6': { math: ['Fractions & Decimals', 'Data Management', 'Basic Geometry', 'Ratios'], science: ['Biodiversity', 'Flight', 'Electricity', 'Space'] },
    'Grade 7': { math: ['Integers', 'Algebraic Expressions', 'Area & Perimeter', 'Probability'], science: ['Ecosystems', 'Pure Substances', 'Heat', 'Structures'] },
    'Grade 8': { math: ['Linear Equations', 'Pythagorean Theorem', 'Data Analysis', 'Geometry'], science: ['Cells & Systems', 'Fluids', 'Water Systems', 'Optics'] },
    'Grade 9': { math: ['Polynomials', 'Linear Relations', 'Analytic Geometry', 'Trigonometry'], science: ['Chemistry', 'Ecology', 'Physics', 'Space Exploration'] },
    'Grade 10': { math: ['Quadratics', 'Analytic Geometry', 'Trigonometry', 'Linear Systems'], science: ['Climate Change', 'Chemical Reactions', 'Light & Optics', 'Biology'] },
    'Grade 11': { math: ['Functions', 'Financial Math', 'Exponential Data', 'Trig Identities'], science: ['Kinematics', 'Dynamics', 'Cellular Biology', 'Chemical Bonding'] },
    'Grade 12': { math: ['Calculus', 'Vectors', 'Advanced Functions', 'Data Management'], science: ['Quantum Mechanics', 'Organic Chemistry', 'Metabolic Processes', 'Electric Fields'] }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* Hero Section */}
      <div className="bg-[#F8F9FA] pt-24 pb-16 px-6 border-b border-slate-200">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-[#4338CA] font-bold text-sm mb-6 border border-indigo-100">
            <BrainCircuit size={16} /> The World's Most Patient AI Tutor
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
            Stop giving them answers.<br/>Start giving them <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4338CA] to-[#14b8a6]">understanding.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Didakt covers complete North American curricula from Grade 6 to 12. We use the Socratic method to guide students to the "Aha!" moment, rather than just solving the problem for them.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate('/register')} className="bg-[#4338CA] text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition shadow-lg">
              Start Free Trial
            </button>
            <button onClick={() => navigate('/curriculum')} className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-4 rounded-2xl font-black text-lg hover:border-slate-300 transition">
              View Full Syllabus
            </button>
          </div>
        </div>
      </div>

      {/* The "What": Curriculum Explorer */}
      <div className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">Everything your child needs to know.</h2>
          <p className="text-lg text-slate-500">Select a grade to preview our curriculum-aligned practice modules.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-[32px] shadow-sm overflow-hidden flex flex-col md:flex-row">
          {/* Grade Selector */}
          <div className="md:w-1/3 bg-slate-50 p-6 border-r border-slate-200 flex flex-col gap-2 h-96 overflow-y-auto">
            {Object.keys(previewCurriculum).map(grade => (
              <button 
                key={grade}
                onClick={() => setActiveGrade(grade)}
                className={`text-left px-6 py-4 rounded-2xl font-bold transition flex justify-between items-center ${activeGrade === grade ? 'bg-white border border-slate-200 shadow-sm text-[#4338CA]' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                {grade}
                {activeGrade === grade && <ChevronRight size={18} />}
              </button>
            ))}
          </div>
          
          {/* Content Display */}
          <div className="p-8 md:p-12 flex-1">
            <h3 className="text-2xl font-black text-slate-900 mb-8 pb-4 border-b border-slate-100">{activeGrade} Topics</h3>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-[#4338CA] mb-4 flex items-center gap-2">📐 Mathematics</h4>
                <ul className="space-y-3">
                  {previewCurriculum[activeGrade].math.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                      <CheckCircle2 size={18} className="text-[#14b8a6] shrink-0 mt-0.5" /> {topic}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-[#14b8a6] mb-4 flex items-center gap-2">🔬 Sciences</h4>
                <ul className="space-y-3">
                  {previewCurriculum[activeGrade].science.map((topic, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 font-medium">
                      <CheckCircle2 size={18} className="text-[#14b8a6] shrink-0 mt-0.5" /> {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The "Why": The Didakt Difference */}
      <div className="bg-[#F8F9FA] py-24 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">How Didakt actually works.</h2>
            <p className="text-lg text-slate-500">We don't just grade tests. We guide the learning process.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative">
              <div className="w-12 h-12 bg-indigo-50 text-[#4338CA] rounded-2xl flex items-center justify-center font-black text-xl mb-6">1</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Adaptive Practice</h4>
              <p className="text-slate-600 leading-relaxed">Students enter the Practice Arena where problems adjust in real-time to their skill level, ensuring they stay appropriately challenged.</p>
            </div>
            
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-[#4338CA] relative ring-4 ring-indigo-50">
              <div className="w-12 h-12 bg-[#4338CA] text-white rounded-2xl flex items-center justify-center font-black text-xl mb-6">2</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Socratic AI Hinting</h4>
              <p className="text-slate-600 leading-relaxed">When a student gets stuck, our AI acts as a patient tutor. It asks leading questions to help them discover the next step entirely on their own.</p>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 relative">
              <div className="w-12 h-12 bg-teal-50 text-[#14b8a6] rounded-2xl flex items-center justify-center font-black text-xl mb-6">3</div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Parent Insights</h4>
              <p className="text-slate-600 leading-relaxed">You receive beautifully formatted weekly HTML reports highlighting their mastery, current streaks, and notes from connected human tutors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
