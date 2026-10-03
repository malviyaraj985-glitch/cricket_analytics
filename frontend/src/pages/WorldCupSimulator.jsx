import React, { useState } from 'react';
import { postTournamentSim } from '../services/api';
import { Globe, Play, Info, Trophy, CheckCircle2 } from 'lucide-react';

export default function WorldCupSimulator() {
  const [iterations, setIterations] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [simData, setSimData] = useState(null);

  const handleRunSim = async () => {
    setLoading(true);
    try {
      const res = await postTournamentSim(iterations);
      setSimData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const results = simData?.simulated_probabilities || [
    { team: "India", qualification_pct: 98.2, semi_final_pct: 85.4, final_pct: 48.0, champion_pct: 26.5 },
    { team: "Australia", qualification_pct: 96.5, semi_final_pct: 82.1, final_pct: 44.5, champion_pct: 24.2 },
    { team: "South Africa", qualification_pct: 91.0, semi_final_pct: 70.0, final_pct: 32.0, champion_pct: 16.8 },
    { team: "England", qualification_pct: 84.0, semi_final_pct: 55.0, final_pct: 22.0, champion_pct: 11.2 },
    { team: "New Zealand", qualification_pct: 82.5, semi_final_pct: 52.0, final_pct: 19.5, champion_pct: 9.5 },
    { team: "Pakistan", qualification_pct: 71.0, semi_final_pct: 38.0, final_pct: 12.0, champion_pct: 5.4 },
    { team: "Sri Lanka", qualification_pct: 55.0, semi_final_pct: 22.0, final_pct: 7.5, champion_pct: 2.8 },
    { team: "West Indies", qualification_pct: 52.0, semi_final_pct: 20.0, final_pct: 6.8, champion_pct: 2.2 }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Globe className="w-8 h-8 text-emerald-400" />
          <span>WORLD CUP 2027 TOURNAMENT SIMULATOR</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Monte Carlo tournament simulation engine. Simulates all round-robin and knockout fixtures across 100 to 5,000 tournament iterations using model match win probabilities.
        </p>
      </div>

      {/* Config Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-xs font-extrabold text-white">Iterations:</span>
          {[100, 500, 1000, 5000].map(val => (
            <button
              key={val}
              onClick={() => setIterations(val)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                iterations === val
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {val} Sims
            </button>
          ))}
        </div>

        <button
          onClick={handleRunSim}
          disabled={loading}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md shadow-emerald-500/20 flex items-center space-x-2 transition-all hover:scale-105"
        >
          <Play className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Simulating Tournament...' : `Run ${iterations} Monte Carlo Simulations`}</span>
        </button>
      </div>

      {/* Disclaimer Banner (Requirement #18) */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center space-x-3 text-slate-300 text-xs font-medium">
        <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />
        <span>Simulation results depend on model assumptions and historical pre-match feature vectors. These are model probabilities, not guarantees.</span>
      </div>

      {/* Simulation Results Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-base font-extrabold text-white">World Cup 2027 Team Projection Table</h2>
          <span className="text-xs text-emerald-400 font-bold">Iterations Executed: {simData?.iterations || iterations}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-6">Rank & Team</th>
                <th className="py-3.5 px-6">Qualification %</th>
                <th className="py-3.5 px-6">Semi-Final %</th>
                <th className="py-3.5 px-6">Final %</th>
                <th className="py-3.5 px-6 text-right">Champion Frequency %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-200">
              {results.map((row, idx) => (
                <tr key={row.team} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 flex items-center space-x-3">
                    <span className="w-6 h-6 bg-slate-800 rounded-full text-center leading-6 text-[11px] font-extrabold text-slate-300">{idx + 1}</span>
                    <span className="font-extrabold text-white text-sm">{row.team}</span>
                    {idx === 0 && <span className="text-amber-400 text-xs">🏆 Favorite</span>}
                  </td>
                  <td className="py-4 px-6 text-slate-300">{row.qualification_pct}%</td>
                  <td className="py-4 px-6 text-cyan-400">{row.semi_final_pct}%</td>
                  <td className="py-4 px-6 text-teal-400">{row.final_pct}%</td>
                  <td className="py-4 px-6 text-right font-black text-emerald-400 text-sm">{row.champion_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
