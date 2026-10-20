import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, Target, Cpu, Shield, Users, MapPin, Swords, 
  Sliders, Globe, Activity, History, BookOpen, Menu, X, Check
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'HOME', icon: Trophy, category: 'Overview' },
    { id: 'match-predictor', label: 'MATCH PREDICTOR', icon: Target, category: 'Prediction' },
    { id: 'explainable-ai', label: 'EXPLAINABLE AI', icon: Cpu, category: 'Explainability' },
    { id: 'team-analytics', label: 'TEAM ANALYTICS', icon: Shield, category: 'Analytics' },
    { id: 'player-analytics', label: 'PLAYER ANALYTICS', icon: Users, category: 'Analytics' },
    { id: 'venue-intelligence', label: 'VENUE INTELLIGENCE', icon: MapPin, category: 'Analytics' },
    { id: 'matchups', label: 'MATCHUPS', icon: Swords, category: 'Intelligence' },
    { id: 'ai-simulator', label: 'AI SIMULATOR', icon: Sliders, category: 'Simulation' },
    { id: 'world-cup-simulator', label: 'WORLD CUP SIMULATOR', icon: Globe, category: 'Simulation' },
    { id: 'model-performance', label: 'MODEL PERFORMANCE', icon: Activity, category: 'Evaluation' },
    { id: 'backtesting', label: 'BACKTESTING', icon: History, category: 'Evaluation' },
    { id: 'data-methodology', label: 'DATA & METHODOLOGY', icon: BookOpen, category: 'Documentation' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        menuRef.current && 
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  const activeItem = navItems.find((item) => item.id === activeTab) || navItems[0];

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Compact Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
            title="ODI Cricket Intelligence - Go to Home"
          >
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30 group-hover:scale-105 group-hover:border-emerald-400 transition-all shadow-sm">
              <Trophy className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[17px] sm:text-[19px] font-extrabold text-white tracking-tight leading-tight group-hover:text-emerald-300 transition-colors">
                ODI Cricket Intelligence
              </span>
              <span className="text-[9.5px] sm:text-[10.5px] text-emerald-400 font-semibold tracking-wider uppercase block leading-tight mt-0.5">
                ODI WORLD CUP 2027 ANALYTICS & AI SIMULATION
              </span>
            </div>
          </div>

          {/* Compact Single Menu Button */}
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className={`flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                menuOpen 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20' 
                  : 'bg-slate-800/90 hover:bg-slate-800 text-white border-slate-700/80 hover:border-emerald-500/50 shadow-sm'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="navigation-dropdown-menu"
            >
              {menuOpen ? (
                <X className="w-4 h-4 text-slate-950" />
              ) : (
                <Menu className="w-4 h-4 text-emerald-400" />
              )}
              <span className="tracking-wide">Menu</span>
              
              {/* Active Tab indicator pill */}
              <span className={`hidden md:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider ${
                menuOpen 
                  ? 'bg-slate-950/20 text-slate-950' 
                  : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {activeItem.label}
              </span>
            </button>

            {/* Dropdown Navigation Panel */}
            {menuOpen && (
              <div
                ref={menuRef}
                id="navigation-dropdown-menu"
                className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-slate-900/98 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-fadeIn max-h-[calc(100vh-5rem)] overflow-y-auto"
                role="menu"
                aria-orientation="vertical"
              >
                {/* Menu Header with quick info */}
                <div className="px-3 py-2 border-b border-slate-800/80 flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                    Navigation Menu
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                    12 Modules
                  </span>
                </div>

                {/* Clean Vertical Navigation List */}
                <nav className="space-y-1 py-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        role="menuitem"
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-extrabold'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center space-x-3 truncate">
                          <div className={`p-1.5 rounded-lg ${
                            isActive 
                              ? 'bg-slate-950/20 text-slate-950' 
                              : 'bg-slate-800 text-emerald-400'
                          }`}>
                            <Icon className="w-4 h-4 shrink-0" />
                          </div>
                          <span className="truncate tracking-wide">{item.label}</span>
                        </div>

                        {isActive && (
                          <Check className="w-4 h-4 text-slate-950 shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </nav>

                {/* Menu Footer */}
                <div className="px-3 py-2 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between mt-1">
                  <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 font-mono text-[9px] text-slate-300 border border-slate-700">Esc</kbd> to close</span>
                  <span className="text-emerald-400 font-semibold">Active: {activeItem.label}</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Backdrop overlay to capture outside clicks */}
      {menuOpen && (
        <div 
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] transition-opacity"
          aria-hidden="true"
        />
      )}
    </header>
  );
}
