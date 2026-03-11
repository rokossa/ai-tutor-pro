import React, { useState, useEffect } from 'react';
import { Settings, Award, Clock, BookOpen, CreditCard, Users, BookMarked, BarChart3, ChevronRight, Edit2 } from 'lucide-react';

export default function Profile() {
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'parent', 'teacher'
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = "https://ai-tutor-pro-backend.onrender.com";

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/api/profile?role=${activeRole}`);
        const result = await response.json();
        if (result.success) setProfileData(result.data);
      } catch (err) {
        console.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [activeRole]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]"><div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-4 md:p-8 font-sans pb-24">
      <div className="max-w-4xl mx-auto">
        
        {/* DEV ONLY: Persona Switcher */}
        <div className="flex justify-center gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-200 w-fit mx-auto">
          {['student', 'parent', 'teacher'].map(role => (
            <button key={role} onClick={() => setActiveRole(role)} className={`px-4 py-2 rounded-xl font-bold text-sm capitalize transition ${activeRole === role ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
              {role} View
            </button>
          ))}
        </div>

        {/* --- STUDENT PROFILE --- */}
        {activeRole === 'student' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-24 h-24 bg-indigo-100 rounded-full border-4 border-white shadow-md overflow-hidden"><img src={profileData?.avatar} alt="Avatar" className="w-full h-full object-cover" /></div>
              <div>
                <h1 className="text-4xl font-black text-slate-900">Hi, {profileData?.name}!</h1>
                <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold w-fit mt-2">{profileData?.grade}</div>
              </div>
            </div>
            
            <h2 className="text-xl font-black text-slate-900 mb-4">Your Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col items-center">
                <Clock className="text-blue-500 mb-2" size={32}/>
                <span className="text-2xl font-black">{profileData?.stats?.learningTime}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Learning Time</span>
              </div>
              <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col items-center">
                <BookOpen className="text-emerald-500 mb-2" size={32}/>
                <span className="text-2xl font-black">{profileData?.stats?.completedExercises}</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Exercises Done</span>
              </div>
              <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col items-center">
                <Award className="text-amber-500 mb-2" size={32}/>
                <span className="text-2xl font-black">{profileData?.stats?.streak} Days</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Streak</span>
              </div>
            </div>

            <h2 className="text-xl font-black text-slate-900 mb-4">Badges Earned</h2>
            <div className="flex gap-4">
              {profileData?.badges?.map((badge, i) => (
                <div key={i} className="bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm font-bold text-slate-700 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500"/> {badge}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- PARENT PROFILE --- */}
        {activeRole === 'parent' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-pink-100 rounded-full border-4 border-white shadow-md overflow-hidden"><img src={profileData?.avatar} alt="Avatar" className="w-full h-full object-cover" /></div>
                <h1 className="text-4xl font-black text-slate-900">Hi, {profileData?.name}!</h1>
              </div>
              <button className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm text-slate-500 hover:text-indigo-600 transition"><Settings size={24}/></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 mb-4">Linked Students</h2>
                {profileData?.linkedStudents?.map((student, i) => (
                  <div key={i} className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Kid"/></div>
                        <div>
                          <h3 className="font-black text-lg text-slate-900">{student.name}</h3>
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{student.grade}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black text-emerald-600">{student.mastery}</div>
                        <div className="text-xs font-bold text-slate-400">Mastery</div>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recent Activity</p>
                      <p className="font-medium text-slate-700">{student.recentActivity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900 mb-4">Account & Billing</h2>
                <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3 font-bold text-slate-700"><CreditCard className="text-slate-400"/> Subscription</div>
                    <div className="font-medium bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-sm">{profileData?.subscription}</div>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3 font-bold text-slate-700"><Clock className="text-slate-400"/> Next Billing</div>
                    <div className="font-medium text-slate-600">{profileData?.billingDate}</div>
                  </div>
                  <button className="w-full mt-2 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition">Manage Subscription</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TEACHER PROFILE --- */}
        {activeRole === 'teacher' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-24 h-24 bg-purple-100 rounded-full border-4 border-white shadow-md overflow-hidden"><img src={profileData?.avatar} alt="Avatar" className="w-full h-full object-cover" /></div>
              <h1 className="text-4xl font-black text-slate-900">Hi, {profileData?.name.split(' ')[0]}!</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Col 1 */}
              <div className="md:col-span-1 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
                  <h3 className="font-black text-lg mb-4 flex items-center justify-between">Educator Profile <Edit2 size={16} className="text-slate-400"/></h3>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-400 uppercase">Name</label>
                    <div className="font-medium bg-slate-50 p-2 rounded-lg mt-1">{profileData?.name}</div>
                  </div>
                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-400 uppercase">Specialized Credentials</label>
                    {profileData?.credentials?.map((cred, i) => <div key={i} className="font-medium bg-slate-50 p-2 rounded-lg mt-2 text-sm border border-slate-100">{cred}</div>)}
                  </div>
                </div>
              </div>

              {/* Col 2 */}
              <div className="md:col-span-1 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
                  <h3 className="font-black text-lg mb-4">My Students</h3>
                  {profileData?.students?.map((stu, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Student"/></div>
                      <div>
                        <div className="font-bold text-slate-800">{stu.name}</div>
                        <div className="text-xs font-bold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-md w-fit">{stu.grade}</div>
                      </div>
                    </div>
                  ))}
                  <div className="text-sm font-medium text-slate-600 border-t border-slate-100 pt-3">Active assignments: <span className="font-black text-indigo-600">{profileData?.analytics?.assignmentsActive}</span></div>
                </div>
              </div>

              {/* Col 3 */}
              <div className="md:col-span-1 flex flex-col gap-6">
                <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
                  <h3 className="font-black text-lg mb-4">Facilitation Tools</h3>
                  <div className="flex flex-col gap-3">
                    <button className="flex justify-between items-center p-3 bg-slate-50 hover:bg-slate-100 transition rounded-xl font-bold text-slate-700 text-sm">Lesson Planner <ChevronRight size={16}/></button>
                    <button className="flex justify-between items-center p-3 bg-slate-50 hover:bg-slate-100 transition rounded-xl font-bold text-slate-700 text-sm">Assignments Dashboard <ChevronRight size={16}/></button>
                    <button className="flex justify-between items-center p-3 bg-slate-50 hover:bg-slate-100 transition rounded-xl font-bold text-slate-700 text-sm">Teacher Resources <ChevronRight size={16}/></button>
                  </div>
                </div>
              </div>

              {/* Analytics Span */}
              <div className="md:col-span-3 bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-wrap justify-around items-center gap-4">
                 <div className="text-center">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Group Mastery Avg.</p>
                   <p className="text-3xl font-black text-indigo-600">{profileData?.analytics?.groupMastery}</p>
                 </div>
                 <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
                 <div className="text-center">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Classroom Progress</p>
                   <p className="text-3xl font-black text-emerald-600">{profileData?.analytics?.classProgress}</p>
                 </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
