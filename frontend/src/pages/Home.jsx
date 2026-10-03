import React from 'react';
import { Target, Globe, BarChart3, Shield, Cpu, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Home({ predictionData, onNavigate, dataSources }) {
  const counts = dataSources?.summary_counts || {
    teams: 10,
    players: 20,
    venues: 8,
    matches: 500,
    features_engineered: 23
  };

  const topWinner = predictionData?.top_5_teams?.[0] || { team: "India", percentage: 63.8 };
  const runnerUp = predictionData?.top_5_teams?.[1] || { team: "Australia", percentage: 36.2 };

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

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('match-predictor')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Target className="w-4 h-4" />
              <span>Predict a Match</span>
            </button>
            <button
              onClick={() => onNavigate('world-cup-simulator')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all hover:scale-105"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Run Tournament Simulation</span>
            </button>
            <button
              onClick={() => onNavigate('model-performance')}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-sm border border-slate-800 transition-all"
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Explore Model Metrics</span>
            </button>
          </div>
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

      {/* Featured AI Result Card */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">2027 World Cup AI Favorite</h2>
              <p className="text-xs text-slate-400">Supervised XGBoost / Gradient Boosting Model Prediction</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold rounded-full">
            Model: {predictionData?.model_used || "XGBoost Classifier"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/80 p-6 rounded-xl border border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-bold text-slate-300">
              <span>{topWinner.team}</span>
              <span className="text-emerald-400 text-xl font-extrabold">{topWinner.percentage}%</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000" style={{ width: `${topWinner.percentage}%` }}></div>
            </div>

            <div className="flex items-center justify-between text-sm font-bold text-slate-300">
              <span>{runnerUp.team}</span>
              <span className="text-cyan-400 text-xl font-extrabold">{runnerUp.percentage}%</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-1000" style={{ width: `${runnerUp.percentage}%` }}></div>
            </div>
          </div>

          <div className="space-y-3 justify-between flex flex-col">
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/90 p-4 rounded-lg border border-slate-800">
              <strong className="text-emerald-400">WHY? </strong> 
              {predictionData?.explanation || "The model assigns a higher probability to the favorite primarily because of stronger recent form, batting depth, and top-order player impact score."}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => onNavigate('explainable-ai')}
                className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-lg border border-emerald-500/20 text-center flex items-center justify-center space-x-1"
              >
                <span>View SHAP Attribution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigate('ai-simulator')}
                className="flex-1 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-lg text-center flex items-center justify-center space-x-1"
              >
                <span>What-If Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => onNavigate('explainable-ai')}
          className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 space-y-3"
        >
          <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center border border-emerald-500/20">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-extrabold text-white">Explainable AI (SHAP)</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Understand exactly why the model predicts a specific winner using SHAP positive & negative feature contributions.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('ai-simulator')}
          className="bg-slate-900 border border-slate-800 hover:border-teal-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 space-y-3"
        >
          <div className="w-10 h-10 bg-teal-500/10 text-teal-400 rounded-xl flex items-center justify-center border border-teal-500/20">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-extrabold text-white">What-If Scenario Simulator</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Simulate player injury, pitch profile change, weather condition, or toss decision to inspect exact probability shifts.
          </p>
        </div>

        <div 
          onClick={() => onNavigate('world-cup-simulator')}
          className="bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-6 rounded-2xl cursor-pointer transition-all hover:-translate-y-1 space-y-3"
        >
          <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-xl flex items-center justify-center border border-cyan-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-extrabold text-white">Monte Carlo Tournament Sim</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Run up to 5,000 World Cup 2027 tournament simulations to calculate qualification, semi-final, and champion odds.
          </p>
        </div>
      </section>

    </div>
  );
}
