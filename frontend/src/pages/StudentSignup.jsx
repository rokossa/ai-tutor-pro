import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [inviteCode, setInviteCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [parentName, setParentName] = useState('');

  // Student Profile State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('🦊');

  const avatars = ['🦊', '🚀', '🏀', '🎸', '🎨', '💻', '🧪', '⚡️'];

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setIsValidating(true);
    
    // Simulate API call to verify the family invite code
    setTimeout(() => {
      setParentName("Sarah T."); // Mock parent name returned from DB
      setIsValidating(false);
      setStep(2);
    }, 1000);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Simulate API call to create user with role='student'
    console.log("Creating student:", { username, avatar, inviteCode });
    setStep(3);
  };

  const handleEnterArena = () => {
    navigate('/practice');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-blue-500 font-sans">
      
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
            <span className="text-white font-bold text-2xl">A</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">AI Tutor Pro</h1>
        </div>

        {/* STEP 1: Enter Invite Code */}
        {step === 1 && (
          <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Got an invite code?</h2>
            <p className="text-slate-400 text-center mb-6">Ask your parent or teacher for your 6-digit access code.</p>
            
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="e.g., X7B9TQ"
                  className="w-full bg-slate-900 border border-slate-600 text-white text-center text-3xl font-mono tracking-widest p-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none uppercase"
                  maxLength={6}
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={inviteCode.length < 6 || isValidating}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
              >
                {isValidating ? "Checking..." : "Verify Code"}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Create Profile (COPPA Compliant UI) */}
        {step === 2 && (
          <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-6 flex items-start gap-3">
              <span className="text-green-400 mt-0.5">✓</span>
              <div>
                <p className="text-green-400 font-bold text-sm">Code Accepted!</p>
                <p className="text-green-500/80 text-xs">Linked to Parent: {parentName}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">Pick your avatar</h2>
            
            <form onSubmit={handleCreateAccount} className="space-y-6">
              <div className="grid grid-cols-4 gap-3">
                {avatars.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setAvatar(emoji)}
                    className={`text-3xl p-3 rounded-xl border-2 transition ${avatar === emoji ? 'border-blue-500 bg-blue-500/10 scale-110' : 'border-slate-700 bg-slate-900 hover:border-slate-500'}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2">Create a Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g., MathNinja99"
                    className="w-full bg-slate-900 border border-slate-600 text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm font-bold mb-2">Secret Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-600 text-white p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition shadow-lg shadow-blue-600/20"
              >
                Create My Account
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Gamified Greeting */}
        {step === 3 && (
          <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700 text-center animate-in zoom-in duration-500">
            <div className="text-6xl mb-4 animate-bounce">{avatar}</div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome, {username}!</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Your AI Tutor is ready. Give us 15 minutes a day, and we'll help you crush your classes.
            </p>
            <button 
              onClick={handleEnterArena}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition shadow-lg shadow-indigo-500/25"
            >
              Enter the Practice Arena ⚡️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
