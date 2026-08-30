import React, { useState, useEffect } from 'react';

export default function CricketLoader({ onComplete }) {
  const [step, setStep] = useState(1);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Step 2: "AI ANALYTICS" at 500ms
    const t1 = setTimeout(() => setStep(2), 500);
    // Step 3: "Raj vs AI" at 1000ms
    const t2 = setTimeout(() => setStep(3), 1000);
    // Step 4: Loading progress complete at 1500ms
    const t3 = setTimeout(() => setStep(4), 1500);
    // Start Fade Out at 2000ms
    const t4 = setTimeout(() => setFadeOut(true), 2000);
    // Complete and unmount loader at 2300ms
    const t5 = setTimeout(() => onComplete(), 2300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060c08] text-white transition-opacity duration-300 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Pitch Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex justify-center">
        <div className="w-64 h-full border-x-2 border-white/20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-4">
        
        {/* Cricket Ball & Stumps Visual Animation */}
        <div className="relative flex items-center justify-center h-24 w-24">
          
          {/* Stumps SVG */}
          <svg className="w-16 h-16 text-amber-500/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4">
            {/* 3 Stumps */}
            <line x1="35" y1="30" x2="35" y2="85" />
            <line x1="50" y1="30" x2="50" y2="85" />
            <line x1="65" y1="30" x2="65" y2="85" />
            {/* Bails */}
            <line x1="30" y1="28" x2="52" y2="28" strokeWidth="3" />
            <line x1="48" y1="28" x2="70" y2="28" strokeWidth="3" />
          </svg>

          {/* Rotating Cricket Ball SVG */}
          <div className="absolute animate-spin" style={{ animationDuration: '3s' }}>
            <svg className="w-14 h-14 text-rose-600 drop-shadow-[0_0_8px_rgba(225,29,72,0.6)]" viewBox="0 0 100 100">
              {/* Ball Circle */}
              <circle cx="50" cy="50" r="44" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
              {/* Seam Stitching */}
              <path d="M 15,50 Q 50,20 85,50" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="3,3" />
              <path d="M 15,50 Q 50,80 85,50" fill="none" stroke="#ffffff" strokeWidth="3" strokeDasharray="3,3" />
            </svg>
          </div>

        </div>

        {/* Text Sequence */}
        <div className="space-y-2 max-w-sm">
          
          {/* Step 1: Main Title */}
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight transition-all duration-300 font-display ${
            step >= 1 ? 'opacity-100 translate-y-0 text-white' : 'opacity-0 translate-y-2'
          }`}>
            ODI WORLD CUP <span className="text-emerald-400">2027</span>
          </h1>

          {/* Step 2: Subtitle */}
          <div className={`text-xs font-bold uppercase tracking-widest text-emerald-400 transition-all duration-300 ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            AI ANALYTICS &amp; PREDICTION
          </div>

          {/* Step 3: Feature Tag */}
          <div className={`text-xs font-semibold text-amber-400 transition-all duration-300 ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            ⚔️ Raj vs AI Prediction Engine
          </div>

        </div>

        {/* Step 4: Loading Progress Indicator */}
        <div className="w-48 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-700 ease-out rounded-full"
            style={{ width: step === 1 ? '25%' : step === 2 ? '55%' : step === 3 ? '85%' : '100%' }}
          ></div>
        </div>

        <div className="text-[10px] text-slate-400 font-medium">
          A cricket tournament is about to begin...
        </div>

      </div>
    </div>
  );
}
