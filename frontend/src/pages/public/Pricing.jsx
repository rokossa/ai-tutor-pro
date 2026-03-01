import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Loader2 } from 'lucide-react';

export default function Pricing() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      // In a production environment, we would decode your JWT token here 
      // to pass the real logged-in parent's email and MongoDB ID to Stripe.
      // We are passing a test payload so you can see the checkout immediately.
      const response = await fetch(`${apiUrl}/stripe/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          parentEmail: 'test-parent@example.com', 
          parentId: 'mock_mongo_id_123' 
        })
      });
      
      const { url } = await response.json();
      
      if (url) {
        // This is where the magic happens: teleporting to Stripe!
        window.location.href = url; 
      } else {
        alert("Oops! Make sure your Stripe API keys are saved in Render.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Invest in their confidence.
        </h1>
        <p className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto">
          Get unlimited access to the AI Tutor, weekly progress reports, and province-specific curriculums. Cancel anytime.
        </p>

        <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-[#1E1B4B] p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Pro Family Plan</h2>
            <p className="text-indigo-200 mb-6">Everything you need for up to 3 children</p>
            <div className="flex items-center justify-center text-white">
              <span className="text-5xl font-extrabold">$14.99</span>
              <span className="text-xl text-indigo-200 ml-2">/ month</span>
            </div>
          </div>
          
          <div className="p-8">
            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-center text-slate-700">
                <Check className="text-emerald-500 mr-3 shrink-0" size={20} /> 
                <span className="font-medium">Unlimited Gemini AI practice sessions</span>
              </li>
              <li className="flex items-center text-slate-700">
                <Check className="text-emerald-500 mr-3 shrink-0" size={20} /> 
                <span className="font-medium">Aligned to Canadian & US Curriculums</span>
              </li>
              <li className="flex items-center text-slate-700">
                <Check className="text-emerald-500 mr-3 shrink-0" size={20} /> 
                <span className="font-medium">Detailed weekly PDF progress reports</span>
              </li>
              <li className="flex items-center text-slate-700">
                <Check className="text-emerald-500 mr-3 shrink-0" size={20} /> 
                <span className="font-medium">Profiles for up to 3 students</span>
              </li>
            </ul>

            <button 
              onClick={handleSubscribe} 
              disabled={isLoading}
              className="w-full bg-[#4338CA] text-white font-bold py-4 rounded-xl shadow-md hover:bg-indigo-800 transition flex items-center justify-center gap-2 text-lg"
            >
              {isLoading ? (
                <><Loader2 className="animate-spin" size={24} /> Securing Checkout...</>
              ) : (
                "Start 14-Day Free Trial"
              )}
            </button>
            <p className="text-center text-sm text-slate-500 mt-4">
              You won't be charged until your trial ends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
