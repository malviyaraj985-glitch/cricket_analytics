import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-8 text-center text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 space-y-2">
        <p className="font-medium text-slate-300">
          Built with React, Vite, Tailwind CSS, Python FastAPI &amp; Scikit-learn.
        </p>
        <p className="font-bold text-emerald-400 text-sm">
          Built by Raj Malviya
        </p>
      </div>
    </footer>
  );
}
