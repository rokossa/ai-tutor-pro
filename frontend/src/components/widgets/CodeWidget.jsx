import React from 'react';

export default function CodeWidget({ question, onSubmit }) {
  return (
    <div className="p-4 border border-slate-700 rounded-lg bg-slate-900 text-white">
      <h3 className="font-bold text-green-400 mb-2">Code Editor</h3>
      <p className="mb-4 text-slate-300">{question.questionText}</p>
      <button 
        onClick={() => onSubmit("console.log('Hello World');")}
        className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
      >
        Submit Code
      </button>
    </div>
  );
}
