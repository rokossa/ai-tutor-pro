import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import WidgetFactory from '../components/widgets/WidgetFactory';

export default function PracticeArena() {
  const [currentExercise] = useState({
    exerciseType: 'symbolic_math',
    courseCode: 'ON-GR8-MATH',
    questionText: 'Alexandre is practicing free throws. If he makes 18 out of 24 shots, what is his shooting percentage? Express your answer as a simplified fraction first, then as a percentage.',
  });

  const [feedback, setFeedback] = useState(null);
  const [isGrading, setIsGrading] = useState(false);

  const handleAnswerSubmit = (studentAnswer) => {
    setIsGrading(true);
    // Mocking the AI network delay
    setTimeout(() => {
      setFeedback({
        isCorrect: true,
        score: 100,
        feedbackEn: "Excellent work! 18/24 simplifies to 3/4, which is exactly 75%. You are building great momentum."
      });
      setIsGrading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* The 15-Minute Rule Tracker UI */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center bg-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-700">
          <div className="mb-4 md:mb-0">
            <h2 className="font-bold text-xl text-blue-400">Daily Goal: The 15-Minute Rule</h2>
            <p className="text-slate-400 text-sm mt-1">Consistency beats intensity.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-1/2">
            <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <div className="w-2/5 h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"></div>
            </div>
            <span className="font-bold text-lg whitespace-nowrap">6 / 15 mins</span>
          </div>
        </div>

        {/* Dynamic Widget Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-100 border-b border-slate-200 px-6 py-3 flex justify-between items-center">
             <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{currentExercise.courseCode}</span>
             <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">Active Session</span>
          </div>
          <div className="p-6 md:p-10">
            <WidgetFactory 
              exerciseType={currentExercise.exerciseType} 
              questionData={currentExercise} 
              onAnswerSubmit={handleAnswerSubmit} 
            />
          </div>
        </div>

        {/* Evaluation Feedback */}
        {isGrading && (
           <div className="mt-8 text-center animate-pulse">
             <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-slate-500 font-medium">Gemini AI is analyzing your answer...</p>
           </div>
        )}
        
        {feedback && (
          <div className="mt-8 p-8 rounded-2xl border bg-green-50 border-green-200 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">✓</div>
              <h3 className="text-2xl font-bold text-green-800">Excellent!</h3>
            </div>
            <div className="inline-block bg-white border border-green-200 rounded px-3 py-1 font-mono font-bold text-green-700 mb-4">Score: {feedback.score}/100</div>
            <p className="text-slate-700 text-lg leading-relaxed">{feedback.feedbackEn}</p>
            <button className="mt-6 bg-slate-900 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-800 transition">Next Question →</button>
          </div>
        )}
      </div>
    </div>
  );
}
