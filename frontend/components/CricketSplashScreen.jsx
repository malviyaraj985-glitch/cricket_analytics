import React, { useState, useEffect } from 'react';

export default function CricketSplashScreen({ onComplete }) {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 0.3s: Ball bowling animation starts
    const t0 = setTimeout(() => setStep(1), 300);
    // 0.8s: "ODI WORLD CUP 2027" text appears
    const t1 = setTimeout(() => setStep(2), 800);
    // 1.4s: "AI ANALYTICS • RAJ VS AI" appears
    const t2 = setTimeout(() => setStep(3), 1400);
    // 1.9s: Progress indicator fills
    const t3 = setTimeout(() => setStep(4), 1900);
    // 2.2s: Fade out starts
    const t4 = setTimeout(() => setFadeOut(true), 2200);
    // 2.5s: Complete splash screen and reveal main app
    const t5 = setTimeout(() => onComplete(), 2500);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 w-screen h-screen z-[999999] bg-black text-white overflow-hidden flex flex-col items-center justify-center select-none transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#000000', margin: 0, padding: 0 }}
    >
      <style>{`
        @keyframes bowlBall {
          0% { transform: translate(-120px, -60px) scale(0.4); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translate(0px, 0px) scale(1); opacity: 1; }
        }
        @keyframes swingBat {
          0% { transform: rotate(-45deg) translate(-10px, -10px); }
          50% { transform: rotate(15deg) translate(5px, 5px); }
          100% { transform: rotate(0deg) translate(0px, 0px); }
        }
        .animate-bowl {
          animation: bowlBall 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-bat {
          animation: swingBat 0.6s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center text-center space-y-8 px-4 max-w-md w-full">
        
        {/* CRICKET ANIMATION SCENE */}
        <div className="relative w-36 h-28 flex items-center justify-center">
          
          {/* 3 Stumps / Wickets */}
          <svg className="w-16 h-20 text-amber-500/90 z-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5">
            <line x1="30" y1="25" x2="30" y2="90" />
            <line x1="50" y1="25" x2="50" y2="90" />
            <line x1="70" y1="25" x2="70" y2="90" />
            <line x1="24" y1="22" x2="54" y2="22" strokeWidth="4" />
            <line x1="46" y1="22" x2="76" y2="22" strokeWidth="4" />
          </svg>

          {/* Cricket Bat */}
          <div className="absolute right-2 top-2 z-20 animate-bat">
            <svg className="w-16 h-20 text-amber-200" viewBox="0 0 100 100" fill="currentColor">
              {/* Handle */}
              <rect x="25" y="10" width="6" height="30" rx="3" fill="#e2e8f0" />
              {/* Blade */}
              <path d="M 22,40 L 34,40 L 32,90 Q 28,95 24,90 Z" fill="#d97706" />
            </svg>
          </div>

          {/* Cricket Ball Bowled Toward Stumps */}
          {step >= 1 && (
            <div className="absolute z-30 animate-bowl">
              <svg className="w-10 h-10 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="#dc2626" stroke="#991b1b" strokeWidth="3" />
                <path d="M 15,50 Q 50,20 85,50" fill="none" stroke="#ffffff" strokeWidth="4" strokeDasharray="4,4" />
                <path d="M 15,50 Q 50,80 85,50" fill="none" stroke="#ffffff" strokeWidth="4" strokeDasharray="4,4" />
              </svg>
            </div>
          )}

        </div>

        {/* SEQUENTIAL TEXT ANIMATION */}
        <div className="space-y-3">
          
          {/* Step 2: ODI WORLD CUP 2027 */}
          <div className={`transition-all duration-400 ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
              ODI WORLD CUP
            </h1>
            <div className="text-2xl font-black text-emerald-400 tracking-widest mt-1">
              2027
            </div>
          </div>

          {/* Step 3: AI ANALYTICS • RAJ VS AI */}
          <div className={`space-y-1 transition-all duration-400 ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}>
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              AI ANALYTICS
            </div>
            <div className="text-sm font-extrabold text-amber-400 uppercase tracking-wider">
              RAJ VS AI
            </div>
          </div>

        </div>

        {/* Step 4: Loading Bar */}
        <div className={`w-40 h-1 bg-slate-900 rounded-full overflow-hidden transition-opacity duration-300 ${
          step >= 1 ? 'opacity-100' : 'opacity-0'
        }`}>
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: step === 1 ? '20%' : step === 2 ? '50%' : step === 3 ? '80%' : '100%' }}
          ></div>
        </div>

      </div>
    </div>
  );
}
