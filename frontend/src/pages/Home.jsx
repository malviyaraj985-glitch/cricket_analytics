import React from 'react';
import { Trophy, Flame, ChevronRight, Swords, BrainCircuit, BarChart2 } from 'lucide-react';

export default function Home({ predictionData, historyData, onNavigate }) {
  const winner = predictionData?.predicted_winner || 'Australia';
  const winnerProb = predictionData?.winner_probability || 31.3;
  const top5 = predictionData?.top_5_teams || [];

  return (
    <div className="space-y-8 pb-8">
      
      {/* Overview Banner */}
      <div className="simple-card bg-slate-900 border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              ODI World Cup 2027 AI Analytics Platform
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              An AI-powered cricket analytics website that analyzes historical ODI World Cup data from 1983 to 2023 to predict the 2027 ODI World Cup winner.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('rajvsai')}
              className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-2 transition-colors"
            >
              <Swords className="w-4 h-4" />
              <span>Raj vs AI Predictions</span>
            </button>

            <button
              onClick={() => onNavigate('prediction2027')}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center space-x-2 transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>View 2027 Prediction</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2027 AI Winner Highlight Card */}
      <div className="simple-card-accent space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4" /> 2027 AI Predicted Champion
          </span>
          <span className="text-xs text-slate-400 font-medium">Model Probability: {winnerProb}%</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h2 className="text-3xl font-extrabold text-white">{winner}</h2>
            <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed">
              Based on historical knockout conversion (75%), recent 3-year form, and South Africa 2027 venue adaptability.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 min-w-[180px] text-center">
            <div className="text-xs text-slate-400">Win Probability</div>
            <div className="text-3xl font-extrabold text-amber-400 mt-0.5">{winnerProb}%</div>
          </div>
        </div>
      </div>

      {/* Top 5 Contenders */}
      <div className="simple-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" /> Top 5 Contenders (2027 World Cup)
          </h2>
          <button
            onClick={() => onNavigate('aianalysis')}
            className="text-xs text-emerald-400 hover:underline font-semibold"
          >
            View Full Model Analysis &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {top5.map((item, idx) => (
            <div key={item.team} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-bold">#{idx + 1}</div>
              <div className="text-sm font-bold text-white mt-1">{item.team}</div>
              <div className="text-xs font-bold text-emerald-400 mt-1">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick History Preview */}
      <div className="simple-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-emerald-400" /> World Cup Champions (1983–2023)
          </h2>
          <button
            onClick={() => onNavigate('history')}
            className="text-xs text-emerald-400 hover:underline font-semibold"
          >
            View All Winners &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-xs">
          {historyData?.slice(0, 11).map(h => (
            <div key={h.year} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
              <div className="font-bold text-emerald-400">{h.year}</div>
              <div className="font-semibold text-white mt-0.5">{h.winner}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
