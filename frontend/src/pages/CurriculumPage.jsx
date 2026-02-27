import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

export default function CurriculumPage() {
  const { regionId } = useParams();

  // Database of curriculum details
  const curriculumData = {
    ontario: {
      title: "Ontario Secondary School Diploma (OSSD)",
      description: "Our AI is strictly aligned with the Ontario Ministry of Education expectations. From Grade 9 EQAO prep to Grade 12 Advanced Functions (MHF4U) and Calculus (MCV4U), we generate practice questions that match the exact phrasing and difficulty of provincial exams.",
      features: ["EQAO Math & Literacy Prep", "Destreamed Grade 9 Support", "MHF4U & MCV4U Step-by-Step Checking"]
    },
    quebec: {
      title: "Quebec Education Program (QEP)",
      description: "Fully bilingual and aligned with the Ministère de l'Éducation. We cover everything from Cycle 1 foundational mathematics to Cycle 2 Secondary IV Science and History, ensuring your child is ready for their MEQ uniform examinations.",
      features: ["MEQ Exam Prep", "Bilingual Explanations (EN/FR)", "Secondary IV Science & Tech"]
    },
    texas: {
      title: "Texas Essential Knowledge and Skills (TEKS)",
      description: "Master the TEKS. Our platform generates STAAR-aligned practice questions to ensure your student is mastering the specific standards required for their exact grade level in Texas.",
      features: ["STAAR Test Readiness", "Algebra I & II EOC Prep", "TEKS-Aligned Biology"]
    },
    ib: {
      title: "International Baccalaureate (IB) Diploma",
      description: "The IB requires critical thinking, not just memorization. Our AI evaluates complex, multi-step problems for IB Math AA/AI, Sciences, and helps outline Theory of Knowledge (TOK) essays.",
      features: ["Math Analysis & Approaches", "Internal Assessment (IA) Guidance", "Higher Level (HL) Physics & Chem"]
    }
  };

  // Fallback if a region isn't fully defined yet
  const content = curriculumData[regionId] || {
    title: `${regionId.toUpperCase()} Curriculum Support`,
    description: "We dynamically generate AI practice questions mapped specifically to the educational standards of this region.",
    features: ["Standardized Test Prep", "Step-by-Step AI Grading", "Localized Word Problems"]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200">
          <div className="inline-block bg-blue-100 text-blue-800 font-bold px-4 py-1 rounded-full text-sm mb-6">
            Curriculum Deep Dive
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">{content.title}</h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            {content.description}
          </p>
          
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Core Focus Areas:</h3>
          <ul className="space-y-4 mb-12">
            {content.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-lg text-slate-700">
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
            <h4 className="text-xl font-bold text-slate-900 mb-2">Ready to master the {content.title.split(' ')[0]} curriculum?</h4>
            <p className="text-slate-500 mb-6">Start your 14-day free trial today.</p>
            <Link to="/onboarding" className="bg-blue-600 text-white font-bold py-4 px-8 rounded-full hover:bg-blue-700 transition shadow-lg">
              Start Free Trial
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
