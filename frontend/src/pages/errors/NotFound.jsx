import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center font-sans">
      <div className="text-9xl mb-4">🛸</div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4">404 - Lost in Space</h1>
      <p className="text-slate-500 text-lg mb-8 max-w-md">We couldn't find the page you're looking for. It might have been moved or doesn't exist.</p>
      <Link to="/" className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition">
        Take me home
      </Link>
    </div>
  );
}
