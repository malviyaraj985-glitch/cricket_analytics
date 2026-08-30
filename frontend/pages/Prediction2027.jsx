import React from 'react';
import { Trophy, User, Cpu, Sparkles, Layers } from 'lucide-react';

export default function Prediction2027({ predictionData }) {
  const rajPredictions = (() => {
    const saved = localStorage.getItem('raj_wc_predictions');
    if (saved) { try { return JSON.parse(saved); } catch (e) {} }
    return { 2027: "India" };
  })();

  const rajPick = rajPredictions[2027] || "Not Selected";
  const aiPick = predictionData?.predicted_winner || "Australia";
  const winnerProb = predictionData?.winner_probability || 31.3;
  const allPredictions = predictionData?.all_predictions || [];

  const doAgree = rajPick === aiPick;

  return (
    <div className="space-y-6 pb-8">
      
      {/* Banner */}
      <div className="simple-card space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> ODI World Cup 2027 — Raj vs AI Prediction
        </h1>
        <p className="text-slate-400 text-xs">
          Direct comparison between Raj's selected pick and the AI machine learning model's top prediction for the 2027 World Cup.
        </p>
      </div>

      {/* 2027 Special Highlight Cards */}
      <div className="simple-card-accent space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-amber-400 tracking-wider">
            2027 World Cup Contenders Comparison
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${doAgree ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}`}>
            {doAgree ? 'Raj and AI agree' : 'Raj and AI disagree'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase flex items-center justify-center gap-1">
              <User className="w-4 h-4 text-emerald-400" /> RAJ'S PICK
            </div>
            <div className="text-3xl font-black text-emerald-400 mt-2">{rajPick}</div>
          </div>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase flex items-center justify-center gap-1">
              <Cpu className="w-4 h-4 text-amber-400" /> AI'S PICK
            </div>
            <div className="text-3xl font-black text-amber-400 mt-2">{aiPick}</div>
            <div className="text-xs text-slate-400 mt-1">({winnerProb}% Model Probability)</div>
          </div>
        </div>
      </div>

      {/* Prominent 2027 AI Team Probabilities Table */}
      <div className="simple-card space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" /> 2027 AI Team Win Probabilities
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <th className="py-2.5 px-4">Rank</th>
                <th className="py-2.5 px-4">Team</th>
                <th className="py-2.5 px-4 text-right">AI Probability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {allPredictions.map((t, idx) => (
                <tr key={t.team}>
                  <td className="py-2.5 px-4 font-bold text-slate-400">#{idx + 1}</td>
                  <td className="py-2.5 px-4 font-bold text-white">{t.team}</td>
                  <td className="py-2.5 px-4 text-right font-extrabold text-emerald-400">{t.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
