import React, { useState, useEffect } from 'react';
import { fetchMatchupsData } from '../services/api';
import { Swords, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Matchups() {
  const [matchups, setMatchups] = useState([]);
  const [selectedMatchup, setSelectedMatchup] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchMatchupsData();
      setMatchups(data);
      if (data.length > 0) setSelectedMatchup(data[0]);
    }
    load();
  }, []);

  const m = selectedMatchup || {
    batter_name: "Rohit Sharma",
    bowler_name: "Mitchell Starc",
    batter_team_name: "India",
    bowler_team_name: "Australia",
    balls: 142,
    runs: 138,
    dismissals: 3,
    strike_rate: 97.18,
    dot_ball_percentage: 52.1,
    boundary_percentage: 14.8
  };

  const isSmallSample = m.balls < 15;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Swords className="w-8 h-8 text-emerald-400" />
          <span>BATTER VS BOWLER MATCHUP ANALYTICS</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Historical head-to-head performance metrics between key top-order batters and pace/spin bowlers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Matchup List */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 lg:col-span-1">
          <h2 className="text-base font-extrabold text-white">Select Key Duel</h2>
          <div className="space-y-2 max-h-[450px] overflow-y-auto no-scrollbar pr-1">
            {matchups.map((item, idx) => (
              <button
                key={item.matchup_id || idx}
                onClick={() => setSelectedMatchup(item)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  (m.matchup_id === item.matchup_id || m.batter_name === item.batter_name)
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="font-extrabold text-white">{item.batter_name} vs {item.bowler_name}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{item.balls} balls • {item.dismissals} dismissals</div>
                </div>
                <span className="text-xs font-extrabold text-amber-400">{item.strike_rate} SR</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Duel Analytics Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 lg:col-span-2">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">{m.batter_team_name} vs {m.bowler_team_name}</span>
              <h2 className="text-2xl font-black text-white mt-0.5">{m.batter_name} vs {m.bowler_name}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block">Total Balls</span>
              <span className="text-2xl font-black text-emerald-400">{m.balls}</span>
            </div>
          </div>

          {/* Small Sample Size Warning Banner (Requirement #16) */}
          {isSmallSample ? (
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center space-x-3 text-amber-400 text-xs font-bold">
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <span>Insufficient historical sample (&lt; 15 balls). Do not draw high-confidence statistical conclusions from tiny sample sizes.</span>
            </div>
          ) : (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl flex items-center space-x-2 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Sufficient Sample Size ({m.balls} balls faced across major ODI tournaments).</span>
            </div>
          )}

          {/* Matchup Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Runs Scored</span>
              <span className="text-2xl font-black text-white mt-1 block">{m.runs} runs</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Dismissals</span>
              <span className="text-2xl font-black text-rose-400 mt-1 block">{m.dismissals} times</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Batting Strike Rate</span>
              <span className="text-2xl font-black text-emerald-400 mt-1 block">{m.strike_rate}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Dot Ball %</span>
              <span className="text-2xl font-black text-amber-400 mt-1 block">{m.dot_ball_percentage}%</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
