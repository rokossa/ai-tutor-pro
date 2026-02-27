import React from 'react';

export default function MathWidget({ question, onSubmit }) {
  return (
    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
      <h3 className="font-bold text-blue-800 mb-2">Math / Chemistry Input</h3>
      <p className="mb-4 text-slate-700">{question.questionText}</p>
      <button 
        onClick={() => onSubmit("x = 42")}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
      >
        Submit Test Answer
      </button>
    </div>
  );
}
