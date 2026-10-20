import React, { useState, useEffect } from 'react';
import { postMatchPrediction } from '../services/api';
import { Target, Cpu, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';

export default function MatchPredictor({ onNavigate }) {
  const [teamA, setTeamA] = useState("India");
  const [teamB, setTeamB] = useState("Australia");
  const [venue, setVenue] = useState("The Wanderers Stadium");
  const [tossWinner, setTossWinner] = useState("India");
  const [tossDecision, setTossDecision] = useState("Bat");
  const [pitchProfile, setPitchProfile] = useState("Balanced");
  const [weather, setWeather] = useState("Clear");

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const teamsList = ["India", "Australia", "South Africa", "England", "New Zealand", "Pakistan", "Sri Lanka", "West Indies", "Afghanistan", "Bangladesh"];
  const venuesList = ["The Wanderers Stadium", "SuperSport Park", "Kingsmead Cricket Ground", "Narendra Modi Stadium", "Melbourne Cricket Ground", "Lord's Cricket Ground"];

  const runPrediction = async (params) => {
    setLoading(true);
    try {
      const res = await postMatchPrediction({
        team_a: params.teamA,
        team_b: params.teamB,
        venue: params.venue,
        toss_winner: params.tossWinner,
        toss_decision: params.tossDecision,
        pitch_profile: params.pitchProfile,
        weather: params.weather
      });
      setPrediction(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runPrediction({ teamA, teamB, venue, tossWinner, tossDecision, pitchProfile, weather });
  }, []);

  const handlePredict = async (e) => {
    e.preventDefault();
    runPrediction({ teamA, teamB, venue, tossWinner, tossDecision, pitchProfile, weather });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Target className="w-8 h-8 text-emerald-400" />
          <span>MATCH PREDICTOR</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Supervised machine learning win probability, confidence scoring, model metadata, and SHAP explainability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Configuration Form */}
        <form onSubmit={handlePredict} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 lg:col-span-1">
          <h2 className="text-base font-extrabold text-white pb-2 border-b border-slate-800">Match Parameters</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Team A</label>
              <select 
                value={teamA} 
                onChange={(e) => {
                  const newA = e.target.value;
                  setTeamA(newA);
                  if (tossWinner !== newA && tossWinner !== teamB) setTossWinner(newA);
                }}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-semibold focus:border-emerald-500 outline-none"
              >
                {teamsList.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Team B</label>
              <select 
                value={teamB} 
                onChange={(e) => {
                  const newB = e.target.value;
                  setTeamB(newB);
                  if (tossWinner !== teamA && tossWinner !== newB) setTossWinner(newB);
                }}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-semibold focus:border-emerald-500 outline-none"
              >
                {teamsList.filter(t => t !== teamA).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Venue</label>
            <select 
              value={venue} 
              onChange={(e) => setVenue(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-semibold focus:border-emerald-500 outline-none"
            >
              {venuesList.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Toss Winner</label>
              <select 
                value={tossWinner} 
                onChange={(e) => setTossWinner(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-semibold focus:border-emerald-500 outline-none"
              >
                <option value={teamA}>{teamA}</option>
                <option value={teamB}>{teamB}</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Toss Decision</label>
              <select 
                value={tossDecision} 
                onChange={(e) => setTossDecision(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-semibold focus:border-emerald-500 outline-none"
              >
                <option value="Bat">Bat</option>
                <option value="Field">Field</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Pitch Profile</label>
              <select 
                value={pitchProfile} 
                onChange={(e) => setPitchProfile(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-semibold focus:border-emerald-500 outline-none"
              >
                <option value="Balanced">Balanced</option>
                <option value="Batting-Friendly">Batting-Friendly</option>
                <option value="Pace-Friendly">Pace-Friendly</option>
                <option value="Spin-Friendly">Spin-Friendly</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Weather</label>
              <select 
                value={weather} 
                onChange={(e) => setWeather(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-semibold focus:border-emerald-500 outline-none"
              >
                <option value="Clear">Clear / Sunny</option>
                <option value="Overcast">Overcast</option>
                <option value="Humid">Humid</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2 mt-4"
          >
            {loading ? (
              <span>Calculating Model Inference...</span>
            ) : (
              <>
                <Cpu className="w-4 h-4" />
                <span>Run ML Match Prediction</span>
              </>
            )}
          </button>
        </form>

        {/* Prediction Results Display Card (Requirement #29) */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 lg:col-span-2">
          {prediction ? (
            <div className="space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold block">Predicted Winner</span>
                  <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{prediction.predicted_winner}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">MODEL CONFIDENCE</span>
                  <span className={`px-3 py-1 border text-xs font-extrabold rounded-full inline-block mt-1 ${
                    prediction.confidence === "High" 
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                      : prediction.confidence === "Medium"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                  }`}>
                    {prediction.confidence} Confidence
                  </span>
                </div>
              </div>

              {/* Match Probability Bars */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-extrabold text-white">
                    <span>{prediction.team_a}</span>
                    <span className="text-emerald-400 text-lg">{prediction.team_a_probability}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700" style={{ width: `${prediction.team_a_probability}%` }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-extrabold text-white">
                    <span>{prediction.team_b}</span>
                    <span className="text-cyan-400 text-lg">{prediction.team_b_probability}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full rounded-full transition-all duration-700" style={{ width: `${prediction.team_b_probability}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Model Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Model Used</span>
                  <span className="text-white font-bold">{prediction.model_used}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Model Version</span>
                  <span className="text-white font-bold">{prediction.model_version}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Feature Count</span>
                  <span className="text-emerald-400 font-bold">{prediction.feature_count} Features</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Timestamp</span>
                  <span className="text-white font-bold text-[11px]">{new Date(prediction.prediction_timestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              {/* WHY? Natural Language Explanation */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">WHY DOES THE MODEL PREDICT THIS?</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {prediction.shap_explanation?.natural_explanation}
                </p>
              </div>

              {/* WHAT IF? Button */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <span className="text-xs text-slate-400">Want to test player injuries or pitch changes?</span>
                <button
                  onClick={() => onNavigate('ai-simulator')}
                  className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold rounded-lg flex items-center space-x-1.5 transition-colors"
                >
                  <span>Open What-If Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[350px] space-y-3 text-center">
              <Cpu className="w-12 h-12 text-slate-700 animate-pulse" />
              <p className="text-slate-400 text-xs font-semibold">Select match parameters and click "Run ML Match Prediction"</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
