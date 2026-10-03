import React, { useState } from 'react';
import { 
  Trophy, Target, Cpu, Shield, Users, MapPin, Swords, 
  Sliders, Globe, Activity, History, BookOpen, Menu, X 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME', icon: Trophy },
    { id: 'match-predictor', label: 'MATCH PREDICTOR', icon: Target },
    { id: 'explainable-ai', label: 'EXPLAINABLE AI', icon: Cpu },
    { id: 'team-analytics', label: 'TEAM ANALYTICS', icon: Shield },
    { id: 'player-analytics', label: 'PLAYER ANALYTICS', icon: Users },
    { id: 'venue-intelligence', label: 'VENUE INTELLIGENCE', icon: MapPin },
    { id: 'matchups', label: 'MATCHUPS', icon: Swords },
    { id: 'ai-simulator', label: 'AI SIMULATOR', icon: Sliders },
    { id: 'world-cup-simulator', label: 'WORLD CUP SIMULATOR', icon: Globe },
    { id: 'model-performance', label: 'MODEL PERFORMANCE', icon: Activity },
    { id: 'backtesting', label: 'BACKTESTING', icon: History },
    { id: 'data-methodology', label: 'DATA & METHODOLOGY', icon: BookOpen },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30 group-hover:scale-105 transition-transform">
              <Trophy className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-sm sm:text-base font-extrabold text-white tracking-tight block">
                AI-Powered ODI Cricket Decision Intelligence Platform
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase block">
                ODI World Cup 2027 Analytics & AI Simulation
              </span>
            </div>
          </div>

          {/* Desktop Navigation (Scrollable or Grid wrapped) */}
          <nav className="hidden xl:flex items-center space-x-1 overflow-x-auto no-scrollbar py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-t border-slate-800 px-4 py-3 grid grid-cols-2 gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
