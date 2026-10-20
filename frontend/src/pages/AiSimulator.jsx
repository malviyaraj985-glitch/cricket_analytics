import React, { useState, useEffect } from 'react';
import { postScenarioSimulate, fetchVenuesData } from '../services/api';
import { PLAYERS_DATABASE } from '../data/playersData';
import { 
  Sliders, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  Sparkles
} from 'lucide-react';

const TEAMS_LIST = [
  "India",
  "Australia",
  "South Africa",
  "England",
  "New Zealand",
  "Pakistan",
  "Sri Lanka",
  "West Indies",
  "Afghanistan",
  "Bangladesh"
];

export default function AiSimulator() {
  const [teamA, setTeamA] = useState("India");
  const [teamB, setTeamB] = useState("Australia");
  const [venue, setVenue] = useState("The Wanderers Stadium");
  const [venuesList, setVenuesList] = useState([]);
  
  // Counterfactual Modifiers
  const [pitch, setPitch] = useState("Pace-friendly");
  const [tossWinner, setTossWinner] = useState("Australia");
  const [tossDecision, setTossDecision] = useState("Bowl");
  const [missingPlayerA, setMissingPlayerA] = useState("Jasprit Bumrah");
  const [missingPlayerB, setMissingPlayerB] = useState("None");

  const [loading, setLoading] = useState(false);
  const [simResult, setSimResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load venues on mount
  useEffect(() => {
    async function loadVenues() {
      try {
        const vData = await fetchVenuesData();
        if (Array.isArray(vData) && vData.length > 0) {
          setVenuesList(vData);
        }
      } catch (err) {
        console.error("Error loading venues:", err);
      }
    }
    loadVenues();
  }, []);

  // Filter available players for each team
  const playersForTeamA = PLAYERS_DATABASE.filter(p => p.team_name === teamA);
  const playersForTeamB = PLAYERS_DATABASE.filter(p => p.team_name === teamB);

  // Validate missing player if teams change
  useEffect(() => {
    if (missingPlayerA !== "None") {
      const match = playersForTeamA.some(p => p.player_name === missingPlayerA);
      if (!match) setMissingPlayerA("None");
    }
  }, [teamA, playersForTeamA]);

  useEffect(() => {
    if (missingPlayerB !== "None") {
      const match = playersForTeamB.some(p => p.player_name === missingPlayerB);
      if (!match) setMissingPlayerB("None");
    }
  }, [teamB, playersForTeamB]);

  // Adjust toss winner if teams change
  useEffect(() => {
    if (tossWinner !== "neutral" && tossWinner !== teamA && tossWinner !== teamB) {
      setTossWinner("neutral");
    }
  }, [teamA, teamB, tossWinner]);

  // Run simulation
  const runSimulation = async (overrideTeamA, overrideTeamB, overrideMods) => {
    const curA = overrideTeamA || teamA;
    const curB = overrideTeamB || teamB;

    if (curA === curB) {
      setErrorMsg("Team A and Team B cannot be the same nation. Please select different teams.");
      return;
    }
    setErrorMsg("");
    setLoading(true);

    try {
      const mods = overrideMods || {
        pitch_profile: pitch,
        toss_winner: tossWinner === "neutral" ? "" : tossWinner,
        toss_decision: tossDecision,
        player_missing_a: missingPlayerA,
        player_missing_b: missingPlayerB,
        venue: venue
      };

      const res = await postScenarioSimulate({
        team_a: curA,
        team_b: curB,
        venue: venue,
        modified_features: mods
      });

      setSimResult(res);
      setSuccessMsg("Scenario comparison updated via model inference.");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error("Simulation error:", err);
      setErrorMsg("Failed to complete simulation. Please verify inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  // Run initial simulation on mount
  useEffect(() => {
    runSimulation("India", "Australia", {
      pitch_profile: "Pace-friendly",
      toss_winner: "Australia",
      toss_decision: "Bowl",
      player_missing_a: "Jasprit Bumrah",
      player_missing_b: "None",
      venue: "The Wanderers Stadium"
    });
  }, []);

  const handleSwapTeams = () => {
    const nextA = teamB;
    const nextB = teamA;
    setTeamA(nextA);
    setTeamB(nextB);
    setMissingPlayerA("None");
    setMissingPlayerB("None");
    setTossWinner("neutral");
    runSimulation(nextA, nextB, {
      pitch_profile: pitch,
      toss_winner: "",
      toss_decision: tossDecision,
      player_missing_a: "None",
      player_missing_b: "None",
      venue: venue
    });
  };

  const handleResetToBaseline = () => {
    setPitch("Balanced");
    setTossWinner("neutral");
    setTossDecision("Bat");
    setMissingPlayerA("None");
    setMissingPlayerB("None");
    runSimulation(teamA, teamB, {
      pitch_profile: "Balanced",
      toss_winner: "",
      toss_decision: "Bat",
      player_missing_a: "None",
      player_missing_b: "None",
      venue: venue
    });
  };

  const b = simResult?.baseline || { 
    team_a_probability: 50.0, 
    team_b_probability: 50.0, 
    predicted_winner: teamA,
    shap_explanation: null
  };
  const s = simResult?.scenario || { 
    team_a_probability: 50.0, 
    team_b_probability: 50.0, 
    predicted_winner: teamA,
    shap_explanation: null
  };
  const c = simResult?.change || { 
    target_team: teamA,
    team_a_probability_delta: 0.0, 
    team_b_probability_delta: 0.0, 
    absolute_delta_percentage_points: 0.0,
    relative_change_pct: 0.0,
    winner_flipped: false,
    changed_factors: [],
    explanation: "Evaluating counterfactual scenarios..." 
  };

  const deltaA = c.team_a_probability_delta ?? 0.0;
  const relChange = c.relative_change_pct ?? 0.0;
  const isZeroDelta = Math.abs(deltaA) < 0.05;

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <Sliders className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                WHAT-IF AI SCENARIO SIMULATOR
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Counterfactual inference engine: stress-test match predictions against player absences, pitch conditions, and toss outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Quick status badge */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-300">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dual-Pass Inference: Baseline vs Counterfactual</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center space-x-3 text-rose-300 text-xs font-bold animate-fadeIn">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center space-x-2.5 text-emerald-300 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Scenario Controls Panel (Left, 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <form 
            onSubmit={(e) => { e.preventDefault(); runSimulation(); }}
            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-5 shadow-xl shadow-slate-950/40"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <span>Counterfactual Modifiers</span>
              </h2>
              <button
                type="button"
                onClick={handleResetToBaseline}
                title="Reset all modifiers to baseline state (0.0 pp delta)"
                className="text-[11px] font-bold text-slate-400 hover:text-emerald-400 flex items-center space-x-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Baseline</span>
              </button>
            </div>

            {/* GROUP 1: TARGET MATCH & VENUE */}
            <div className="space-y-3">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                1. Target Match & Venue
              </span>

              {/* Team Selectors with Swap */}
              <div className="grid grid-cols-11 gap-2 items-center">
                <div className="col-span-5">
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">TEAM A (REFERENCE)</label>
                  <select 
                    value={teamA} 
                    onChange={e => {
                      const nextA = e.target.value;
                      if (nextA === teamB) {
                        const fallback = TEAMS_LIST.find(t => t !== nextA && t !== teamB) || "Australia";
                        setTeamB(fallback);
                      }
                      setTeamA(nextA);
                    }} 
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-emerald-500 focus:outline-none transition-colors"
                  >
                    {TEAMS_LIST.map(t => (
                      <option key={`a-${t}`} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1 flex justify-center pt-5">
                  <button
                    type="button"
                    onClick={handleSwapTeams}
                    title="Swap Team A and Team B"
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700/60"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="col-span-5">
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">TEAM B (OPPONENT)</label>
                  <select 
                    value={teamB} 
                    onChange={e => {
                      const nextB = e.target.value;
                      if (nextB === teamA) {
                        const fallback = TEAMS_LIST.find(t => t !== nextB && t !== teamA) || "India";
                        setTeamA(fallback);
                      }
                      setTeamB(nextB);
                    }} 
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-cyan-500 focus:outline-none transition-colors"
                  >
                    {TEAMS_LIST.map(t => (
                      <option key={`b-${t}`} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Venue Selector */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">MATCH VENUE</label>
                <select 
                  value={venue} 
                  onChange={e => setVenue(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <optgroup label="2027 World Cup Confirmed Host Venues (SA, ZIM & NAM)">
                    <option value="The Wanderers Stadium">The Wanderers Stadium (Johannesburg, SA)</option>
                    <option value="SuperSport Park">SuperSport Park (Centurion, SA)</option>
                    <option value="Kingsmead Cricket Ground">Kingsmead Cricket Ground (Durban, SA)</option>
                    <option value="St George's Park">St George's Park (Gqeberha, SA)</option>
                    <option value="Newlands Cricket Ground">Newlands Cricket Ground (Cape Town, SA)</option>
                    <option value="Boland Park">Boland Park (Paarl, SA)</option>
                    <option value="Mangaung Oval">Mangaung Oval (Bloemfontein, SA)</option>
                    <option value="Buffalo Park">Buffalo Park (East London, SA)</option>
                    <option value="Harare Sports Club">Harare Sports Club (Harare, Zimbabwe)</option>
                    <option value="Queens Sports Club">Queens Sports Club (Bulawayo, Zimbabwe)</option>
                    <option value="Wanderers Cricket Ground">Wanderers Cricket Ground (Windhoek, Namibia)</option>
                  </optgroup>
                  <optgroup label="India International Venues">
                    <option value="Narendra Modi Stadium">Narendra Modi Stadium (Ahmedabad)</option>
                    <option value="Wankhede Stadium">Wankhede Stadium (Mumbai)</option>
                    <option value="Eden Gardens">Eden Gardens (Kolkata)</option>
                    <option value="M. Chinnaswamy Stadium">M. Chinnaswamy Stadium (Bengaluru)</option>
                    <option value="MA Chidambaram Stadium">MA Chidambaram Stadium (Chennai)</option>
                    <option value="Arun Jaitley Stadium">Arun Jaitley Stadium (Delhi)</option>
                    <option value="Rajiv Gandhi International Cricket Stadium">Rajiv Gandhi Stadium (Hyderabad)</option>
                  </optgroup>
                  <optgroup label="Australia International Venues">
                    <option value="Melbourne Cricket Ground">Melbourne Cricket Ground (MCG)</option>
                    <option value="Sydney Cricket Ground">Sydney Cricket Ground (SCG)</option>
                    <option value="Adelaide Oval">Adelaide Oval</option>
                    <option value="Perth Stadium">Perth Stadium (Optus Stadium)</option>
                  </optgroup>
                  <optgroup label="England International Venues">
                    <option value="Lord's Cricket Ground">Lord's Cricket Ground (London)</option>
                    <option value="The Oval">The Oval (London)</option>
                    <option value="Edgbaston">Edgbaston (Birmingham)</option>
                    <option value="Trent Bridge">Trent Bridge (Nottingham)</option>
                  </optgroup>
                  <optgroup label="Other International Venues">
                    <option value="Eden Park">Eden Park (Auckland, NZ)</option>
                    <option value="Hagley Oval">Hagley Oval (Christchurch, NZ)</option>
                    <option value="Gaddafi Stadium">Gaddafi Stadium (Lahore, Pakistan)</option>
                    <option value="R. Premadasa Stadium">R. Premadasa Stadium (Colombo, Sri Lanka)</option>
                    <option value="Dubai International Cricket Stadium">Dubai International Stadium (UAE)</option>
                    <option value="Kensington Oval">Kensington Oval (Bridgetown, West Indies)</option>
                  </optgroup>
                </select>
              </div>
            </div>

            {/* GROUP 2: SQUAD AVAILABILITY */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                2. Squad Availability (Key Missing Players)
              </span>

              {/* Missing Player Team A */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">
                  KEY PLAYER MISSING — {teamA.toUpperCase()}
                </label>
                <select
                  value={missingPlayerA}
                  onChange={e => setMissingPlayerA(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="None">No key player missing (Full Strength)</option>
                  {playersForTeamA.map(p => (
                    <option key={`missing-a-${p.player_id}`} value={p.player_name}>
                      {p.player_name} ({p.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Missing Player Team B */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">
                  KEY PLAYER MISSING — {teamB.toUpperCase()}
                </label>
                <select
                  value={missingPlayerB}
                  onChange={e => setMissingPlayerB(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="None">No key player missing (Full Strength)</option>
                  {playersForTeamB.map(p => (
                    <option key={`missing-b-${p.player_id}`} value={p.player_name}>
                      {p.player_name} ({p.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-start space-x-2 p-2.5 bg-slate-950/60 border border-slate-800/60 rounded-lg text-[11px] text-slate-400">
                <Info className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  Missing key players triggers defensible top-order and bowling/batting depth rating adjustments calibrated from historical player impact ratings.
                </span>
              </div>
            </div>

            {/* GROUP 3: CONDITIONS & TOSS */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
                3. Modified Conditions & Toss
              </span>

              {/* Pitch Condition */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1">
                  MODIFIED PITCH CONDITION
                </label>
                <select 
                  value={pitch} 
                  onChange={e => setPitch(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-emerald-500 focus:outline-none transition-colors"
                >
                  <option value="Balanced">Balanced (Standard Pitch Profile)</option>
                  <option value="Batting-friendly">Batting-friendly (Flat Track, High Scoring)</option>
                  <option value="Pace-friendly">Pace-friendly (Green Grass, Seam & Bounce)</option>
                  <option value="Spin-friendly">Spin-friendly (Dry Dustbowl, Turn & Grip)</option>
                </select>
              </div>

              {/* Toss Winner & Decision */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">TOSS WINNER</label>
                  <select 
                    value={tossWinner} 
                    onChange={e => setTossWinner(e.target.value)} 
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-emerald-500 focus:outline-none transition-colors"
                  >
                    <option value="neutral">Neutral / Standard (No Advantage)</option>
                    <option value={teamA}>{teamA} Wins Toss</option>
                    <option value={teamB}>{teamB} Wins Toss</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">TOSS DECISION</label>
                  <select 
                    value={tossDecision} 
                    onChange={e => setTossDecision(e.target.value)} 
                    disabled={tossWinner === "neutral"}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-emerald-500 focus:outline-none transition-colors disabled:opacity-50"
                  >
                    <option value="Bat">Elected to Bat First</option>
                    <option value="Bowl">Elected to Bowl First (Chasing)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? "Calculating Scenario Inference..." : "Re-Run Model Inference"}</span>
            </button>
          </form>
        </div>

        {/* Results Panel (Right, 7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Comparison Container */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-xl shadow-slate-950/40">
            
            {/* Results Header with Explicit Delta Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-white tracking-tight">
                  Baseline vs Modified Scenario Comparison
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Controlled counterfactual test across identical trained ML feature weights
                </p>
              </div>

              {/* Unambiguous Delta Badge explicitly naming the team and units */}
              <div className="flex items-center space-x-2">
                <div className={`px-3 py-1.5 rounded-xl border text-xs font-black flex items-center space-x-1.5 ${
                  isZeroDelta 
                    ? 'bg-slate-800/80 border-slate-700 text-slate-300' 
                    : deltaA > 0 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  {isZeroDelta ? (
                    <span className="w-2 h-2 rounded-full bg-slate-400 inline-block"></span>
                  ) : deltaA > 0 ? (
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
                  )}
                  <span>
                    {teamA}: {deltaA >= 0 ? `+${deltaA}` : deltaA} pp
                  </span>
                </div>

                {!isZeroDelta && (
                  <span className="text-[11px] font-bold text-slate-400 px-2 py-1 bg-slate-950 border border-slate-800 rounded-lg">
                    {relChange >= 0 ? `+${relChange}` : relChange}% rel
                  </span>
                )}
              </div>
            </div>

            {/* Side-by-Side Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* BASELINE CARD */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/90 space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    <span className="text-[11px] text-slate-300 font-black uppercase tracking-wider">
                      BASELINE STATE
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Standard Match
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Team A Baseline Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-white flex items-center space-x-1.5">
                        <span>{teamA}</span>
                        {b.predicted_winner === teamA && (
                          <Trophy className="w-3.5 h-3.5 text-amber-400 inline" />
                        )}
                      </span>
                      <span className="text-emerald-400 font-black text-sm">{b.team_a_probability}%</span>
                    </div>
                    <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${b.team_a_probability}%` }}
                      />
                    </div>
                  </div>

                  {/* Team B Baseline Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-white flex items-center space-x-1.5">
                        <span>{teamB}</span>
                        {b.predicted_winner === teamB && (
                          <Trophy className="w-3.5 h-3.5 text-amber-400 inline" />
                        )}
                      </span>
                      <span className="text-cyan-400 font-black text-sm">{b.team_b_probability}%</span>
                    </div>
                    <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-cyan-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${b.team_b_probability}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Predicted Winner:</span>
                  <span className="font-black text-emerald-400">{b.predicted_winner}</span>
                </div>
              </div>

              {/* MODIFIED SCENARIO CARD */}
              <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30 space-y-4 relative overflow-hidden shadow-lg shadow-emerald-950/20">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] text-emerald-400 font-black uppercase tracking-wider">
                      MODIFIED SCENARIO
                    </span>
                  </div>
                  {c.winner_flipped ? (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                      WINNER FLIPPED!
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Inference Output
                    </span>
                  )}
                </div>

                <div className="space-y-3.5">
                  {/* Team A Scenario Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-white flex items-center space-x-1.5">
                        <span>{teamA}</span>
                        {s.predicted_winner === teamA && (
                          <Trophy className="w-3.5 h-3.5 text-amber-400 inline" />
                        )}
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-emerald-400 font-black text-sm">{s.team_a_probability}%</span>
                        <span className={`text-[10px] font-bold ${
                          deltaA > 0 ? 'text-emerald-400' : deltaA < 0 ? 'text-rose-400' : 'text-slate-400'
                        }`}>
                          ({deltaA >= 0 ? `+${deltaA}` : deltaA} pp)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-400 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${s.team_a_probability}%` }}
                      />
                    </div>
                  </div>

                  {/* Team B Scenario Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-white flex items-center space-x-1.5">
                        <span>{teamB}</span>
                        {s.predicted_winner === teamB && (
                          <Trophy className="w-3.5 h-3.5 text-amber-400 inline" />
                        )}
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <span className="text-cyan-400 font-black text-sm">{s.team_b_probability}%</span>
                        <span className={`text-[10px] font-bold ${
                          c.team_b_probability_delta > 0 ? 'text-cyan-400' : c.team_b_probability_delta < 0 ? 'text-rose-400' : 'text-slate-400'
                        }`}>
                          ({c.team_b_probability_delta >= 0 ? `+${c.team_b_probability_delta}` : c.team_b_probability_delta} pp)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-cyan-400 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${s.team_b_probability}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Updated Predicted Winner:</span>
                  <span className={`font-black ${c.winner_flipped ? 'text-amber-300' : 'text-emerald-400'}`}>
                    {s.predicted_winner}
                  </span>
                </div>
              </div>

            </div>

            {/* Active Counterfactual Modifiers Summary Strip */}
            {c.changed_factors && c.changed_factors.length > 0 ? (
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  APPLIED COUNTERFACTUAL MODIFIERS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {c.changed_factors.map((f, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-semibold text-slate-200 flex items-center space-x-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-950/60 border border-slate-800/60 rounded-xl text-xs text-slate-400 flex items-center space-x-2">
                <Info className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>
                  No counterfactual modifiers active. All model features match baseline conditions, producing an identical 0.0 percentage point delta.
                </span>
              </div>
            )}

            {/* Dynamic Model Reasoning & SHAP Feature Attribution Explanation */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DYNAMIC SHAP PROBABILITY SHIFT EXPLANATION</span>
                </h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Dual-Inference Attribution
                </span>
              </div>

              <p className="text-xs text-slate-200 font-medium leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800/60">
                {c.explanation}
              </p>

              {/* Attribution Delta Breakdown */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                  MODEL FEATURE WEIGHT DELTAS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-900/40 border border-slate-800/80 rounded-lg flex justify-between items-center">
                    <span className="text-slate-400">Top-Order Player Impact:</span>
                    <span className={`font-bold ${missingPlayerA !== "None" ? "text-rose-400" : missingPlayerB !== "None" ? "text-emerald-400" : "text-slate-300"}`}>
                      {missingPlayerA !== "None" ? "-9.0 pts" : missingPlayerB !== "None" ? "+9.0 pts" : "0.0 pts"}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-900/40 border border-slate-800/80 rounded-lg flex justify-between items-center">
                    <span className="text-slate-400">Pitch Condition Bias:</span>
                    <span className={`font-bold ${pitch !== "Balanced" ? "text-cyan-400" : "text-slate-300"}`}>
                      {pitch === "Balanced" ? "Neutral (0.0)" : pitch}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-900/40 border border-slate-800/80 rounded-lg flex justify-between items-center">
                    <span className="text-slate-400">Toss Decision Effect:</span>
                    <span className={`font-bold ${tossWinner !== "neutral" ? "text-emerald-400" : "text-slate-300"}`}>
                      {tossWinner === "neutral" ? "Neutral (0.0)" : `${tossWinner} (${tossDecision})`}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-900/40 border border-slate-800/80 rounded-lg flex justify-between items-center">
                    <span className="text-slate-400">Total Net Delta:</span>
                    <span className={`font-black ${deltaA > 0 ? "text-emerald-400" : deltaA < 0 ? "text-rose-400" : "text-slate-300"}`}>
                      {deltaA >= 0 ? `+${deltaA}` : deltaA} pp ({teamA})
                    </span>
                  </div>
                </div>
              </div>

              {/* Transparent Methodology & Causal Disclaimer */}
              <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-900 leading-normal flex items-start space-x-2">
                <Info className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                <p>
                  <strong className="text-slate-300">Methodological Note:</strong> These probability shifts represent statistical additive feature attributions calculated by re-evaluating the trained Gradient Boosting model under counterfactual feature states. They distinguish statistical model-based feature sensitivity from absolute causal certainty in real-world sporting environments.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
