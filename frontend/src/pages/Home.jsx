import React from 'react';
import { Sparkles } from 'lucide-react';
import WorldCupLegacy from '../components/WorldCupLegacy';

export default function Home({ onNavigate, dataSources }) {
  const counts = dataSources?.summary_counts || {
    teams: 10,
    players: 94,
    venues: 32,
    matches: 500,
    features_engineered: 23
  };

  return (
    <div className="space-y-10 pb-12">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 p-8 sm:p-12">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI-POWERED ODI CRICKET DECISION INTELLIGENCE PLATFORM</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            ODI World Cup 2027 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Explainable AI & Scenario Simulation
            </span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
            Analyze team strength, venue pitch conditions, player impact, head-to-head matchups, and simulate match scenarios using real supervised machine learning, SHAP explainability, and Monte Carlo simulations.
          </p>
        </div>

        {/* Dynamic Verified Statistics Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-10 border-t border-slate-800/80 mt-8">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-semibold text-slate-400">World Cup Editions</div>
            <div className="text-2xl font-black text-white mt-1">11</div>
            <div className="text-[10px] text-emerald-400 mt-0.5">1983 – 2023</div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Verified Matches</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{counts.matches}+</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Cricsheet Data</div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-semibold text-slate-400">Active Players</div>
            <div className="text-2xl font-black text-teal-400 mt-1">{counts.players}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Top ODI Rosters</div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-xs font-semibold text-slate-400">WC Teams</div>
            <div className="text-2xl font-black text-cyan-400 mt-1">{counts.teams}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">ICC Ranked</div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
            <div className="text-xs font-semibold text-slate-400">Engineered Features</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{counts.features_engineered}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Pre-Match Matrix</div>
          </div>
        </div>
      </section>

      {/* ICC Men's ODI Cricket World Cup Legacy & History Section */}
      <WorldCupLegacy onNavigate={onNavigate} />

    </div>
  );
}
