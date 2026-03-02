import React, { useState, useEffect } from 'react';
import { Loader2, Save, CreditCard, ShieldCheck } from 'lucide-react';

export default function Settings() {
  const [user, setUser] = useState({ name: '', email: '', stripeCustomerId: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [billingLoading, setBillingLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "https://ai-tutor-pro-backend.onrender.com/api";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('ai_tutor_token');
        const response = await fetch(`${apiUrl}/auth/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) setUser(data);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [apiUrl]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const token = localStorage.getItem('ai_tutor_token');
      const response = await fetch(`${apiUrl}/auth/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ name: user.name, email: user.email })
      });
      
      if (response.ok) {
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
      } else {
        setMessage({ text: 'Failed to update profile.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Network error.', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleManageBilling = async () => {
    setBillingLoading(true);
    try {
      const token = localStorage.getItem('ai_tutor_token');
      const response = await fetch(`${apiUrl}/stripe/create-portal-session`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ stripeCustomerId: user.stripeCustomerId })
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Teleport to Stripe Portal
      } else {
        setMessage({ text: 'No active subscription found.', type: 'error' });
        setBillingLoading(false);
      }
    } catch (error) {
      setMessage({ text: 'Failed to securely connect to Stripe.', type: 'error' });
      setBillingLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#4338CA]" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans p-4 sm:p-8 pb-24">
      <div className="max-w-3xl mx-auto pt-8">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">Account Settings</h1>

        {message.text && (
          <div className={`p-4 rounded-xl mb-8 font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="text-[#4338CA]" size={24} /> Profile Information
          </h2>
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                value={user.name || ''} 
                onChange={(e) => setUser({...user, name: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#4338CA] focus:bg-white transition"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={user.email || ''} 
                onChange={(e) => setUser({...user, email: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#4338CA] focus:bg-white transition"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-[#4338CA] text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-indigo-800 transition flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Save Changes
            </button>
          </form>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <CreditCard className="text-[#4338CA]" size={24} /> Billing & Subscription
          </h2>
          <p className="text-slate-500 mb-6">Manage your payment methods, download invoices, or cancel your Pro plan.</p>
          
          <button 
            onClick={handleManageBilling}
            disabled={billingLoading}
            className="w-full sm:w-auto bg-slate-900 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-slate-800 transition flex items-center justify-center gap-2"
          >
            {billingLoading ? <Loader2 className="animate-spin" size={20} /> : 'Manage Subscription via Stripe'}
          </button>
        </div>
      </div>
    </div>
  );
}
