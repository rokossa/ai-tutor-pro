import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Sparkles, ChevronLeft, Loader2, User } from 'lucide-react';

export default function PracticeArena() {
  const { course, chapter } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [problemData, setProblemData] = useState(null);
  const [answer, setAnswer] = useState('');
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // 1. Fetch the AI-generated problem on load
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('ai_tutor_token')}`
          },
          body: JSON.stringify({ subject: course, grade: 'Grade 8', topic: course, chapter: chapter })
        });
        const data = await res.json();
        setProblemData(data);
        setChat([{ role: 'ai', message: data.initialHint }]);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load problem:", err);
      }
    };
    fetchProblem();
  }, [course, chapter]);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [chat]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newChat = [...chat, { role: 'user', message: userInput }];
    setChat(newChat);
    setUserInput('');
    setIsTyping(true);

    // In a real production app, this hits a /api/ai/chat endpoint
    // For now, we simulate the Socratic response logic
    setTimeout(() => {
      setChat([...newChat, { 
        role: 'ai', 
        message: "That's a great question, Alexandre. Remember our goal is to keep the equation balanced. If we do something to one side, what must we do to the other?" 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#Eef0f4] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#4338CA]" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#Eef0f4] flex flex-col font-sans">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <button onClick={() => navigate('/student/dashboard')} className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 transition">
          <ChevronLeft size={20} /> Exit
        </button>
        <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
          {course} • {chapter}
        </div>
        <div className="bg-[#14b8a6]/10 text-[#14b8a6] px-4 py-1.5 rounded-full font-black text-xs border border-[#14b8a6]/20">
          7 DAY STREAK 🔥
        </div>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row p-4 sm:p-6 gap-6 overflow-hidden">
        {/* Left: Socratic Chat Sidebar */}
        <div className="lg:w-1/3 bg-white/80 backdrop-blur-md rounded-[32px] shadow-sm border border-white flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg"><Sparkles size={20} /></div>
            <h2 className="font-black text-slate-900">Step-by-Step Help</h2>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium shadow-sm ${
                  msg.role === 'ai' ? 'bg-white text-slate-700 border border-slate-100' : 'bg-[#4338CA] text-white'
                }`}>
                  {msg.message}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-slate-400 text-xs font-bold animate-pulse">AI is thinking...</div>}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleChatSubmit} className="p-4 bg-slate-50 border-t border-slate-100">
            <div className="relative">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Ask for a hint..."
                className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 pr-12 text-sm font-medium focus:border-[#4338CA] outline-none"
              />
              <button type="submit" className="absolute right-2 top-2 bottom-2 text-[#4338CA] hover:scale-110 transition">
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Right: Problem Workspace */}
        <div className="flex-1 bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 flex flex-col">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-slate-900 mb-8">Current Exercise</h1>
            <div className="bg-slate-50 rounded-3xl p-12 border border-slate-100 text-4xl font-mono text-center text-slate-800 shadow-inner">
              {problemData.problem}
            </div>
          </div>

          <div className="mt-auto max-w-xl mx-auto w-full">
            <input 
              type="text" 
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Your final answer..."
              className="w-full bg-[#F8F9FA] border-2 border-slate-200 rounded-[28px] py-6 px-8 text-2xl font-bold text-center mb-4 focus:border-[#4338CA] outline-none"
            />
            <button className="w-full bg-[#4338CA] text-white py-5 rounded-[28px] font-black text-xl shadow-lg hover:bg-indigo-700 transition">
              Check Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
