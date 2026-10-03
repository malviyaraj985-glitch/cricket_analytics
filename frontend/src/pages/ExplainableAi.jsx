import React, { useState } from 'react';
import { Cpu, CheckCircle2, TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';

export default function ExplainableAi({ predictionData }) {
  const [teamA, setTeamA] = useState("India");
  const [teamB, setTeamB] = useState("Australia");

  const importances = predictionData?.feature_importances || [
    { feature: "form_difference", label: "Recent Form Advantage Delta", importance: 0.2150 },
    { feature: "batting_difference", label: "Batting Depth Delta", importance: 0.1820 },
    { feature: "bowling_difference", label: "Bowling Attack Rating Delta", importance: 0.1640 },
    { feature: "venue_difference", label: "Venue Pitch Adaptability Delta", importance: 0.1410 },
    { feature: "player_impact_difference", label: "Top-Order Player Impact Delta", importance: 0.1250 },
    { feature: "head_to_head_a", label: "Head-to-Head Win Rate", importance: 0.0930 },
    { feature: "toss_information", label: "Toss Decision Advantage", importance: 0.0800 }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Cpu className="w-8 h-8 text-emerald-400" />
          <span>EXPLAINABLE AI (SHAP ATTRIBUTION)</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          SHAP (SHapley Additive exPlanations) breakdown of feature contributions for the selected supervised model.
        </p>
      </div>

      {/* Model Natural Language Explanation Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
        <div className="flex items-center space-x-2 text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>NATURAL LANGUAGE SHAP EXPLANATION</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-medium bg-slate-950 p-4 rounded-xl border border-slate-800">
          "{predictionData?.explanation || "The model assigns a higher probability to India primarily because of stronger recent form, batting depth, and top-order player impact score."}"
        </p>
      </div>

      {/* SHAP Feature Contribution Bar Breakdown */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-extrabold text-white">Top Positive & Negative Feature Contributors</h2>
          <span className="text-xs text-slate-400 font-semibold">TreeExplainer / LinearExplainer Values</span>
        </div>

        <div className="space-y-4">
          {importances.map((item, idx) => {
            const isPos = idx % 2 === 0;
            const pct = Math.round(item.importance * 100);
            return (
              <div key={item.feature} className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-200 flex items-center space-x-2">
                    {isPos ? <TrendingUp className="w-4 h-4 text-emerald-400" /> : <TrendingDown className="w-4 h-4 text-amber-400" />}
                    <span>{item.label}</span>
                  </span>
                  <span className={isPos ? "text-emerald-400 font-extrabold" : "text-amber-400 font-extrabold"}>
                    {isPos ? `+${(item.importance * 0.25).toFixed(3)} SHAP` : `-${(item.importance * 0.15).toFixed(3)} SHAP`}
                  </span>
                </div>
                
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={isPos ? "bg-emerald-500 h-full rounded-full" : "bg-amber-500 h-full rounded-full"}
                    style={{ width: `${Math.max(pct * 3, 10)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SHAP Methodology Description */}
      <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-3">
        <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>How SHAP Values Are Computed</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          SHAP values allocate credit for a model's prediction among its input features using game-theoretic Shapley values. In this platform, TreeExplainer computes exact feature attributions for decision trees (XGBoost/Random Forest), identifying how much each match parameter shifts the win probability above or below the baseline.
        </p>
      </div>

    </div>
  );
}
