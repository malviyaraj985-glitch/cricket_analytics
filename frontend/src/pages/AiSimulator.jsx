import React, { useState } from 'react';
import { postScenarioSimulate } from '../services/api';
import { Sliders, RefreshCw, ArrowRight, TrendingUp, TrendingDown, Cpu } from 'lucide-react';

export default function AiSimulator() {
  const [teamA, setTeamA] = useState("India");
  const [teamB, setTeamB] = useState("Australia");
  const [venue, setVenue] = useState("The Wanderers Stadium");
  const [pitch, setPitch] = useState("Pace-Friendly");
  const [weather, setWeather] = useState("Overcast");
  const [tossWinner, setTossWinner] = useState("Australia");
  const [missingA, setMissingA] = useState("Jasprit Bumrah");

  const [loading, setLoading] = useState(false);
  const [simResult, setSimResult] = useState(null);

  const handleSimulate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postScenarioSimulate({
        team_a: teamA,
        team_b: teamB,
        venue: venue,
        modified_features: {
          pitch_profile: pitch,
          weather: weather,
          toss_winner: tossWinner,
          player_missing_a: missingA
        }
      });
      setSimResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const b = simResult?.baseline || { team_a_probability: 63.8, team_b_probability: 36.2, predicted_winner: "India" };
  const s = simResult?.scenario || { team_a_probability: 54.2, team_b_probability: 45.8, predicted_winner: "India" };
  const c = simResult?.change || { team_a_probability_delta: -9.6, team_b_probability_delta: 9.6, explanation: "Modifying key player availability reduced India's probability by 9.6 percentage points." };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Sliders className="w-8 h-8 text-emerald-400" />
          <span>WHAT-IF AI SCENARIO SIMULATOR</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Counterfactual scenario testing: modify key player availability, pitch conditions, toss outcome, or weather to re-run model inference.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Scenario Controls */}
        <form onSubmit={handleSimulate} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 lg:col-span-1">
          <h2 className="text-base font-extrabold text-white pb-2 border-b border-slate-800">Counterfactual Modifiers</h2>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Target Match</label>
            <div className="grid grid-cols-2 gap-2">
              <select value={teamA} onChange={e => setTeamA(e.target.value)} className="bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-bold">
                <option value="India">India</option>
                <option value="South Africa">South Africa</option>
                <option value="England">England</option>
              </select>
              <select value={teamB} onChange={e => setTeamB(e.target.value)} className="bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-bold">
                <option value="Australia">Australia</option>
                <option value="New Zealand">New Zealand</option>
                <option value="Pakistan">Pakistan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Venue</label>
            <select value={venue} onChange={e => setVenue(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold">
              <option value="The Wanderers Stadium">The Wanderers Stadium (Johannesburg)</option>
              <option value="SuperSport Park">SuperSport Park (Centurion)</option>
              <option value="Narendra Modi Stadium">Narendra Modi Stadium (Ahmedabad)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Key Player Missing ({teamA})</label>
            <input 
              type="text" 
              value={missingA} 
              onChange={e => setMissingA(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-bold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Modified Pitch Condition</label>
            <select value={pitch} onChange={e => setPitch(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-bold">
              <option value="Pace-Friendly">Pace-Friendly (Heavy Grass)</option>
              <option value="Spin-Friendly">Spin-Friendly (Dry Dustbowl)</option>
              <option value="Batting-Friendly">Batting-Friendly (Flat Track)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Toss Winner Shift</label>
            <select value={tossWinner} onChange={e => setTossWinner(e.target.value)} className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-bold">
              <option value={teamA}>{teamA} Wins Toss & Bats</option>
              <option value={teamB}>{teamB} Wins Toss & Bowls</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2 mt-4"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Re-Run Model Inference</span>
          </button>
        </form>

        {/* Baseline vs Scenario Result Display */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 lg:col-span-2">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="text-lg font-extrabold text-white">Baseline vs Modified Scenario Comparison</h2>
            <span className="text-xs text-emerald-400 font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
              Delta: {c.team_a_probability_delta >= 0 ? `+${c.team_a_probability_delta}` : c.team_a_probability_delta}%
            </span>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* BASELINE */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <span className="text-xs text-slate-400 font-extrabold block uppercase tracking-wider">BASELINE MATCH STATE</span>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-white mb-1">
                    <span>{teamA}</span>
                    <span className="text-emerald-400">{b.team_a_probability}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${b.team_a_probability}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-white mb-1">
                    <span>{teamB}</span>
                    <span className="text-cyan-400">{b.team_b_probability}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${b.team_b_probability}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* SCENARIO */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <span className="text-xs text-amber-400 font-extrabold block uppercase tracking-wider">MODIFIED SCENARIO STATE</span>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-white mb-1">
                    <span>{teamA}</span>
                    <span className="text-emerald-400">{s.team_a_probability}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${s.team_a_probability}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-white mb-1">
                    <span>{teamB}</span>
                    <span className="text-cyan-400">{s.team_b_probability}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${s.team_b_probability}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Probability Shift & SHAP Feature Explanation */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">SHAP PROBABILITY SHIFT EXPLANATION</h3>
            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {c.explanation}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
