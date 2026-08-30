import React, { useState, useEffect } from 'react';
import { Trophy, Swords, CheckCircle, XCircle, Clock, ChevronRight, User, Cpu, Sparkles, RefreshCw } from 'lucide-react';

const WC_YEARS = [1983, 1987, 1992, 1996, 1999, 2003, 2007, 2011, 2015, 2019, 2023, 2027];

const TEAMS_LIST = [
  "Australia", "India", "England", "Pakistan", "Sri Lanka", 
  "West Indies", "South Africa", "New Zealand", "Afghanistan", "Bangladesh"
];

export default function RajVsAi({ predictionData, historyData }) {
  // LocalStorage state for Raj's predictions
  const [rajPredictions, setRajPredictions] = useState(() => {
    const saved = localStorage.getItem('raj_wc_predictions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    // Default initial predictions
    return {
      1983: "India",
      1987: "Australia",
      1992: "Pakistan",
      1996: "Sri Lanka",
      1999: "Australia",
      2003: "Australia",
      2007: "Australia",
      2011: "India",
      2015: "Australia",
      2019: "India",
      2023: "India",
      2027: "India"
    };
  });

  // Form State
  const [selectedYear, setSelectedYear] = useState(2027);
  const [selectedTeam, setSelectedTeam] = useState(rajPredictions[2027] || "India");
  const [activeDetailYear, setActiveDetailYear] = useState(null);

  // Sync selectedTeam when selectedYear changes in form
  useEffect(() => {
    setSelectedTeam(rajPredictions[selectedYear] || "India");
  }, [selectedYear, rajPredictions]);

  // Handle submitting Raj's prediction
  const handleSubmitPrediction = (e) => {
    e.preventDefault();
    const updated = { ...rajPredictions, [selectedYear]: selectedTeam };
    setRajPredictions(updated);
    localStorage.setItem('raj_wc_predictions', JSON.stringify(updated));
  };

  // Map AI Predictions per year from API predictionData or historyData
  const backtestData = predictionData?.historical_backtest || [];
  
  const getAiPredictionForYear = (yr) => {
    const found = backtestData.find(b => b.year === yr);
    if (found) return found.ai_predicted_winner;
    const hist = historyData.find(h => h.year === yr);
    if (hist && hist.ai_predicted_winner) return hist.ai_predicted_winner;
    return yr === 2027 ? (predictionData?.predicted_winner || "Australia") : "Australia";
  };

  const getActualWinnerForYear = (yr) => {
    if (yr === 2027) return "TBD";
    const hist = historyData.find(h => h.year === yr);
    return hist ? hist.winner : "TBD";
  };

  const getAiProbabilitiesForYear = (yr) => {
    const found = backtestData.find(b => b.year === yr);
    if (found && found.ai_team_probabilities) return found.ai_team_probabilities;
    if (yr === 2027 && predictionData?.all_predictions) {
      return predictionData.all_predictions.map(p => ({ team: p.team, probability: p.percentage }));
    }
    return [
      { team: "Australia", probability: 31.3 },
      { team: "India", probability: 23.9 },
      { team: "England", probability: 12.0 },
      { team: "South Africa", probability: 10.0 }
    ];
  };

  // Calculate Scores for 1983-2023 (excluding 2027)
  let rajCorrect = 0;
  let rajIncorrect = 0;
  let rajEvaluated = 0;

  let aiCorrect = 0;
  let aiIncorrect = 0;
  let aiEvaluated = 0;

  WC_YEARS.filter(y => y <= 2023).forEach(yr => {
    const actual = getActualWinnerForYear(yr);
    const aiPred = getAiPredictionForYear(yr);
    const rajPred = rajPredictions[yr];

    // AI evaluation
    if (aiPred === actual) aiCorrect++; else aiIncorrect++;
    aiEvaluated++;

    // Raj evaluation
    if (rajPred) {
      if (rajPred === actual) rajCorrect++; else rajIncorrect++;
      rajEvaluated++;
    }
  });

  const rajAccuracy = rajEvaluated > 0 ? ((rajCorrect / rajEvaluated) * 100).toFixed(1) : 0;
  const aiAccuracy = aiEvaluated > 0 ? ((aiCorrect / aiEvaluated) * 100).toFixed(1) : 0;

  // Determine Leader
  let leaderText = "It's a tie";
  let leaderColor = "text-slate-300";

  if (rajCorrect > aiCorrect) {
    leaderText = "Raj is currently leading!";
    leaderColor = "text-emerald-400";
  } else if (aiCorrect > rajCorrect) {
    leaderText = "AI is currently leading!";
    leaderColor = "text-amber-400";
  }

  // 2027 Specific Picks
  const raj2027Pick = rajPredictions[2027] || "Not Selected";
  const ai2027Pick = getAiPredictionForYear(2027);
  const do2027Agree = raj2027Pick === ai2027Pick;

  const detailItem = activeDetailYear ? {
    year: activeDetailYear,
    actualWinner: getActualWinnerForYear(activeDetailYear),
    rajPred: rajPredictions[activeDetailYear] || "Not Selected",
    aiPred: getAiPredictionForYear(activeDetailYear),
    probabilities: getAiProbabilitiesForYear(activeDetailYear)
  } : null;

  return (
    <div className="space-y-10 pb-12">
      
      {/* HEADER BANNER */}
      <div className="simple-card bg-slate-900 border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <Swords className="w-6 h-6 text-emerald-400" /> RAJ VS AI — ODI WORLD CUP PREDICTION HISTORY (1983–2027)
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Comparing Raj's manual predictions against the AI Machine Learning model for every World Cup from 1983 to 2027.
        </p>
      </div>

      {/* SCOREBOARD & WHO IS WINNING? */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Scoreboard Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Raj Scoreboard */}
          <div className="simple-card-accent">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <User className="w-4 h-4" /> Raj's Scoreboard (1983–2023)
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div>
                <div className="text-xs text-slate-400">Correct</div>
                <div className="text-2xl font-bold text-emerald-400">{rajCorrect}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Incorrect</div>
                <div className="text-2xl font-bold text-rose-400">{rajIncorrect}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Accuracy</div>
                <div className="text-2xl font-bold text-white">{rajAccuracy}%</div>
              </div>
            </div>
          </div>

          {/* AI Scoreboard */}
          <div className="simple-card">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4" /> AI Scoreboard (1983–2023)
            </div>
            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div>
                <div className="text-xs text-slate-400">Correct</div>
                <div className="text-2xl font-bold text-emerald-400">{aiCorrect}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Incorrect</div>
                <div className="text-2xl font-bold text-rose-400">{aiIncorrect}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Accuracy</div>
                <div className="text-2xl font-bold text-white">{aiAccuracy}%</div>
              </div>
            </div>
          </div>

        </div>

        {/* Who is Winning Section */}
        <div className="lg:col-span-4 simple-card flex flex-col justify-center text-center space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Raj vs AI Score Status</div>
          <div className="text-sm font-semibold text-slate-200">
            Raj: <span className="text-emerald-400 font-bold">{rajCorrect}</span> Correct | AI: <span className="text-amber-400 font-bold">{aiCorrect}</span> Correct
          </div>
          <div className={`text-xl font-extrabold ${leaderColor} pt-1`}>
            {leaderText}
          </div>
        </div>

      </div>

      {/* RAJ'S PREDICTION INPUT FORM */}
      <div className="simple-card space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-400" /> Enter / Update Raj's Prediction (1983 – 2027)
        </h2>

        <form onSubmit={handleSubmitPrediction} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Select World Cup Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              {WC_YEARS.map(yr => (
                <option key={yr} value={yr}>{yr} World Cup</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Raj's Predicted Team</label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
            >
              {TEAMS_LIST.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Submit Prediction</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2027 SPECIAL HIGHLIGHT SECTION */}
      <div className="simple-card bg-slate-900 border-amber-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> ODI World Cup 2027 — Raj vs AI
          </h2>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${do2027Agree ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'}`}>
            {do2027Agree ? 'Raj and AI agree' : 'Raj and AI disagree'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase">RAJ'S PICK (2027)</div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">{raj2027Pick}</div>
          </div>

          <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-xs font-semibold text-slate-400 uppercase">AI'S PICK (2027)</div>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">{ai2027Pick}</div>
          </div>
        </div>
      </div>

      {/* 1983–2027 COMPLETE PREDICTION COMPARISON TABLE */}
      <div className="simple-card overflow-hidden">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white">1983–2027 Complete World Cup Prediction Comparison</h2>
          <p className="text-xs text-slate-400">Click any row to inspect team probabilities and detailed stats for that year.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Raj's Prediction</th>
                <th className="py-3 px-4">AI Prediction</th>
                <th className="py-3 px-4">Actual Winner</th>
                <th className="py-3 px-4">Raj Result</th>
                <th className="py-3 px-4">AI Result</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {WC_YEARS.map(yr => {
                const actual = getActualWinnerForYear(yr);
                const aiPred = getAiPredictionForYear(yr);
                const rajPred = rajPredictions[yr] || "—";

                let rajRes = "Pending";
                let aiRes = "Pending";

                if (yr <= 2023) {
                  rajRes = rajPred === actual ? "Correct" : "Incorrect";
                  aiRes = aiPred === actual ? "Correct" : "Incorrect";
                }

                return (
                  <tr 
                    key={yr}
                    onClick={() => setActiveDetailYear(yr)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">{yr}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{rajPred}</td>
                    <td className="py-3.5 px-4 font-semibold text-amber-400">{aiPred}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-100">{actual}</td>
                    <td className="py-3.5 px-4">
                      {yr === 2027 ? (
                        <span className="text-slate-400 font-medium flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> Pending</span>
                      ) : rajRes === "Correct" ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Correct</span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Incorrect</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {yr === 2027 ? (
                        <span className="text-slate-400 font-medium flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> Pending</span>
                      ) : aiRes === "Correct" ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Correct</span>
                      ) : (
                        <span className="text-rose-400 font-bold flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Incorrect</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-xs text-emerald-400 hover:underline font-semibold">Inspect</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* YEAR-BY-YEAR DETAIL DRILL-DOWN MODAL */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="simple-card max-w-lg w-full bg-slate-900 border-slate-700 space-y-4 relative">
            <button
              onClick={() => setActiveDetailYear(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> ODI World Cup {detailItem.year}
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Actual Winner:</span>
                <strong className="text-amber-400 text-sm">{detailItem.actualWinner}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Raj's Prediction:</span>
                <strong className="text-emerald-400 text-sm">{detailItem.rajPred}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">AI Prediction:</span>
                <strong className="text-amber-400 text-sm">{detailItem.aiPred}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Result:</span>
                <strong className="text-slate-200 text-sm">
                  {detailItem.year === 2027 ? 'Pending' : (detailItem.aiPred === detailItem.actualWinner ? 'AI Correct' : 'AI Incorrect')}
                </strong>
              </div>
            </div>

            {/* AI Probabilities Table for this Year */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-300 uppercase">AI Team Probabilities ({detailItem.year}):</h4>
              <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
                {detailItem.probabilities.map(p => (
                  <div key={p.team} className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="font-semibold text-slate-200">{p.team}</span>
                    <span className="font-bold text-emerald-400">{p.probability}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
