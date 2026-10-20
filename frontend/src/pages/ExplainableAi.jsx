import React, { useState, useEffect } from 'react';
import { postMatchPrediction } from '../services/api';
import { 
  Cpu, CheckCircle2, TrendingUp, TrendingDown, HelpCircle, 
  ArrowRight, RefreshCw, Scale, ShieldAlert, Sparkles 
} from 'lucide-react';

export default function ExplainableAi({ latestPrediction, onPredictionChange, onNavigate }) {
  const [teamA, setTeamA] = useState(latestPrediction?.team_a || "India");
  const [teamB, setTeamB] = useState(latestPrediction?.team_b || "Australia");
  const [venue, setVenue] = useState(latestPrediction?.venue || "The Wanderers Stadium");
  const [tossWinner, setTossWinner] = useState(latestPrediction?.team_a || "India");
  const [tossDecision, setTossDecision] = useState("Bat");
  const [pitchProfile, setPitchProfile] = useState("Balanced");
  const [weather, setWeather] = useState("Clear");

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(latestPrediction || null);
  const [explainedPerspective, setExplainedPerspective] = useState("teamA"); // "teamA" or "teamB"

  const teamsList = ["India", "Australia", "South Africa", "England", "New Zealand", "Pakistan", "Sri Lanka", "West Indies", "Afghanistan", "Bangladesh"];
  const venuesList = ["The Wanderers Stadium", "SuperSport Park", "Kingsmead Cricket Ground", "Narendra Modi Stadium", "Melbourne Cricket Ground", "Lord's Cricket Ground"];

  const runAnalysis = async (params) => {
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
      onPredictionChange?.(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!latestPrediction) {
      runAnalysis({ teamA, teamB, venue, tossWinner, tossDecision, pitchProfile, weather });
    }
  }, []);

  const handleRefresh = (e) => {
    e?.preventDefault();
    runAnalysis({ teamA, teamB, venue, tossWinner, tossDecision, pitchProfile, weather });
  };

  // Derive perspective-aware feature contributions
  const isTeamA = explainedPerspective === "teamA";
  const targetTeam = isTeamA ? teamA : teamB;
  const opponentTeam = isTeamA ? teamB : teamA;
  const targetProb = isTeamA ? (prediction?.team_a_probability ?? 50.0) : (prediction?.team_b_probability ?? 50.0);
  const opponentProb = isTeamA ? (prediction?.team_b_probability ?? 50.0) : (prediction?.team_a_probability ?? 50.0);

  const allContributions = prediction?.shap_explanation?.all_contributions || [];

  // If perspective is Team B, invert the SHAP signs because Delta(B, A) = -Delta(A, B)
  const perspectiveContributions = allContributions.map(c => {
    const adjustedShap = isTeamA ? c.shap_value : -c.shap_value;
    const adjustedRaw = isTeamA ? c.raw_value : -c.raw_value;
    return {
      ...c,
      perspective_shap: adjustedShap,
      perspective_raw: adjustedRaw,
      perspective_impact: `${adjustedShap >= 0 ? "+" : ""}${(adjustedShap * 100).toFixed(1)}%`,
      is_positive: adjustedShap >= 0,
      favored_team: adjustedShap >= 0 ? targetTeam : opponentTeam
    };
  });

  const positiveContributions = perspectiveContributions.filter(c => c.perspective_shap > 0);
  const negativeContributions = perspectiveContributions.filter(c => c.perspective_shap < 0);

  // Maximum SHAP value for scaling visual progress bars
  const maxAbsShap = Math.max(...perspectiveContributions.map(c => Math.abs(c.perspective_shap)), 0.05);

  const totalPositiveShift = positiveContributions.reduce((acc, c) => acc + c.perspective_shap, 0);
  const totalNegativeShift = negativeContributions.reduce((acc, c) => acc + c.perspective_shap, 0);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
            <Cpu className="w-8 h-8 text-emerald-400" />
            <span>EXPLAINABLE AI (SHAP ATTRIBUTION)</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Game-theoretic feature attribution breaking down how each parameter shifts win probabilities from the 50.0% neutral baseline.
          </p>
        </div>
        {onNavigate && (
          <button
            onClick={() => onNavigate('match-predictor')}
            className="self-start md:self-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 rounded-xl flex items-center space-x-2 transition-colors"
          >
            <span>Back to Match Predictor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Interactive Matchup Configuration Bar */}
      <form onSubmit={handleRefresh} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-extrabold text-white flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Configure Matchup to Explain</span>
          </span>
          <span className="text-[11px] text-slate-400 font-medium">Updates SHAP attributions dynamically</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Team A</label>
            <select
              value={teamA}
              onChange={(e) => {
                const newA = e.target.value;
                setTeamA(newA);
                if (tossWinner !== newA && tossWinner !== teamB) setTossWinner(newA);
              }}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-semibold focus:border-emerald-500 outline-none"
            >
              {teamsList.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Team B</label>
            <select
              value={teamB}
              onChange={(e) => {
                const newB = e.target.value;
                setTeamB(newB);
                if (tossWinner !== teamA && tossWinner !== newB) setTossWinner(newB);
              }}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-semibold focus:border-emerald-500 outline-none"
            >
              {teamsList.filter(t => t !== teamA).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Venue</label>
            <select
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2 text-xs font-semibold focus:border-emerald-500 outline-none"
            >
              {venuesList.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Toss Winner</label>
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
            <label className="text-[11px] font-bold text-slate-300 block mb-1">Pitch Profile</label>
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
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md shadow-emerald-500/20 transition-all flex items-center space-x-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? "Re-running Inference..." : "Recalculate SHAP Explanation"}</span>
          </button>
        </div>
      </form>

      {/* Matchup & Perspective Identity Card */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Currently Explaining</span>
            <div className="flex items-center space-x-3 mt-1">
              <h2 className="text-xl font-black text-white">
                {teamA} <span className="text-emerald-400 font-extrabold">({prediction?.team_a_probability}%)</span>
                <span className="text-slate-500 mx-2 font-medium">vs</span>
                {teamB} <span className="text-cyan-400 font-extrabold">({prediction?.team_b_probability}%)</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Predicted Winner: <strong className="text-emerald-400">{prediction?.predicted_winner}</strong> &bull; Confidence: <strong className="text-white">{prediction?.confidence}</strong>
            </p>
          </div>

          {/* Perspective Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <span className="text-[10px] text-slate-400 font-bold px-2 uppercase">Perspective:</span>
            <button
              type="button"
              onClick={() => setExplainedPerspective("teamA")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                isTeamA 
                  ? "bg-emerald-500 text-slate-950 shadow-sm" 
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {teamA} ({prediction?.team_a_probability}%)
            </button>
            <button
              type="button"
              onClick={() => setExplainedPerspective("teamB")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                !isTeamA 
                  ? "bg-cyan-500 text-slate-950 shadow-sm" 
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {teamB} ({prediction?.team_b_probability}%)
            </button>
          </div>
        </div>

        {/* Model Natural Language Explanation Banner */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>DYNAMIC NATURAL LANGUAGE SHAP EXPLANATION</span>
          </div>
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
            <p className="text-sm text-slate-200 leading-relaxed font-medium">
              "{prediction?.shap_explanation?.natural_explanation || "The model assigns probabilities based on composite squad strength, recent form, and venue adaptability."}"
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] text-slate-400">
              <span>Explaining perspective: <strong className="text-white">{targetTeam}</strong></span>
              <span>Baseline prior: <strong className="text-white">50.0%</strong> &bull; Predicted probability: <strong className="text-emerald-400">{targetProb}%</strong></span>
            </div>
          </div>
        </div>

        {/* Waterfall / Balance Overview Bar */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-300 flex items-center space-x-1.5">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span>Attribution Balance Equation for {targetTeam}</span>
            </span>
            <span className="text-white font-mono">
              50.0% (Base) {totalPositiveShift >= 0 ? `+ ${(totalPositiveShift * 100).toFixed(1)}%` : ""} {totalNegativeShift < 0 ? `- ${Math.abs(totalNegativeShift * 100).toFixed(1)}%` : ""} = <strong className="text-emerald-400">{targetProb}%</strong>
            </span>
          </div>
          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
            <div className="bg-slate-600 h-full" style={{ width: '50%' }} title="Neutral Baseline (50%)"></div>
            {targetProb >= 50.0 ? (
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full" 
                style={{ width: `${Math.min(targetProb - 50.0, 50)}%` }}
                title={`Positive Shift: +${(targetProb - 50.0).toFixed(1)}%`}
              ></div>
            ) : (
              <div 
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-full ml-auto" 
                style={{ width: `${Math.min(50.0 - targetProb, 50)}%` }}
                title={`Negative Deficit: -${(50.0 - targetProb).toFixed(1)}%`}
              ></div>
            )}
          </div>
        </div>
      </div>

      {/* Positive & Negative Feature Contribution Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Positive Drivers Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-extrabold text-white">Positive Drivers (Favoring {targetTeam})</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full">
              {positiveContributions.length} Features
            </span>
          </div>

          <div className="space-y-3">
            {positiveContributions.length > 0 ? (
              positiveContributions.map((item) => {
                const barWidth = Math.min(Math.round((item.perspective_shap / maxAbsShap) * 100), 100);
                return (
                  <div key={item.feature} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/90 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200">{item.label}</span>
                      <div className="text-right">
                        <span className="text-emerald-400 font-extrabold font-mono text-xs">{item.perspective_impact}</span>
                        <span className="text-[10px] text-slate-500 block">+{item.perspective_shap.toFixed(4)} SHAP</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.max(barWidth, 8)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>Advantage for {targetTeam}</span>
                      <span>Raw Delta: {item.perspective_raw > 0 ? `+${item.perspective_raw}` : item.perspective_raw}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No positive feature drivers for {targetTeam} in this matchup.</p>
            )}
          </div>
        </div>

        {/* Negative Drivers Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-extrabold text-white">Negative Deficits (Countered by {opponentTeam})</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full">
              {negativeContributions.length} Features
            </span>
          </div>

          <div className="space-y-3">
            {negativeContributions.length > 0 ? (
              negativeContributions.map((item) => {
                const barWidth = Math.min(Math.round((Math.abs(item.perspective_shap) / maxAbsShap) * 100), 100);
                return (
                  <div key={item.feature} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/90 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200">{item.label}</span>
                      <div className="text-right">
                        <span className="text-amber-400 font-extrabold font-mono text-xs">{item.perspective_impact}</span>
                        <span className="text-[10px] text-slate-500 block">{item.perspective_shap.toFixed(4)} SHAP</span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-amber-500 to-rose-400 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.max(barWidth, 8)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span>Advantage for {opponentTeam}</span>
                      <span>Raw Delta: {item.perspective_raw}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">No negative feature deficits for {targetTeam} in this matchup.</p>
            )}
          </div>
        </div>

      </div>

      {/* Transparent Methodology & Explainer Notice */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>SHAP Methodology & Explainer Specification</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          SHAP (SHapley Additive exPlanations) values allocate credit for a model's prediction among its input features using game-theoretic Shapley values. In this platform, each feature contribution <span className="font-mono text-emerald-400">&phi;<sub>i</sub></span> represents the exact probability shift above or below the 50.0% neutral expectation:
        </p>
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 text-center">
          P(Team) = 50.0% + &sum; &phi;<sub>i</sub>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          <strong>Explainer Specification:</strong> {prediction?.shap_explanation?.explainer_type || "Additive Feature Attribution (calibrated to trained model weights)"}. In static production mode on Netlify, feature contributions are derived directly from the trained scikit-learn classifier's calibrated parameter weights and anti-symmetric feature differences. In local Python backend mode, the official Python <code className="text-emerald-400 font-mono">shap</code> library (LinearExplainer / TreeExplainer) computes exact game-theoretic attributions.
        </p>
      </div>

    </div>
  );
}
