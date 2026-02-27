import React from 'react';

export default function MultipleChoiceWidget({ question, onSubmit }) {
  return (
    <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
      <h3 className="font-bold text-purple-800 mb-2">Multiple Choice</h3>
      <p className="mb-4 text-slate-700">{question.questionText}</p>
      <button 
        onClick={() => onSubmit("Option B")}
        className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
      >
        Submit Choice
      </button>
    </div>
  );
}
