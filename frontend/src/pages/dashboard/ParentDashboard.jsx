import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ParentDashboard() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('ai_tutor_token');
        const response = await fetch(`${apiUrl}/family/students`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success) setStudents(data.students);
      } catch (error) {
        console.error("Failed to load students", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStudents();
  }, [apiUrl]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans p-4 sm:p-8">
      <div className="max-w-7xl mx-auto pt-8">
        <header className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Parent Dashboard</h1>
            <p className="text-slate-500 text-lg">Here’s how your children are doing this week.</p>
          </div>
          <Link to="/onboarding/welcome" className="bg-[#4338CA] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-indigo-800 transition">
            + Add Another Child
          </Link>
        </header>

        {isLoading ? (
          <div className="w-12 h-12 border-4 border-[#4338CA] border-t-transparent rounded-full animate-spin"></div>
        ) : students.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">No children added yet</h3>
            <p className="text-slate-500 mb-6">Set up a profile to start tracking their progress.</p>
            <Link to="/onboarding/welcome" className="text-[#4338CA] font-bold hover:underline">Get Started &rarr;</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div key={student._id} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10"></div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-3xl border border-indigo-200 shadow-inner">👦🏽</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
                    <p className="text-slate-500 font-medium">{student.grade} • {student.province}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Current Streak</div>
                    <div className="text-2xl font-black text-orange-500">🔥 {student.streak} Days</div>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Math Avg</div>
                    <div className="text-2xl font-black text-emerald-500">82%</div>
                  </div>
                </div>

                <Link to={`/parent/child/${student._id}`} onClick={() => localStorage.setItem('active_student_id', student._id)} className="block w-full text-center bg-slate-50 border border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-100 transition">
                  View Detailed Progress
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
