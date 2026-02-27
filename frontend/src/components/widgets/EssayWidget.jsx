import React from 'react';

export default function EssayWidget({ question, onSubmit }) {
  return (
    <div className="p-4 border border-amber-200 rounded-lg bg-amber-50">
      <h3 className="font-bold text-amber-800 mb-2">Essay Response</h3>
      <p className="mb-4 text-slate-700">{question.questionText}</p>
      <button 
        onClick={() => onSubmit("This is a test essay response.")}
        className="bg-amber-600 text-white px-4 py-2 rounded shadow hover:bg-amber-700"
      >
        Submit Essay
      </button>
    </div>
  );
}
