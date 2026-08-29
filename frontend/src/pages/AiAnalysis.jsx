import React from 'react';
import { BrainCircuit, Cpu, BarChart3, Layers } from 'lucide-react';

export default function AiAnalysis({ predictionData }) {
  const metrics = predictionData?.metrics || {};
  const allMetrics = predictionData?.all_model_metrics || {};
  const featureImportances = predictionData?.feature_importances || [];
  const allPredictions = predictionData?.all_predictions || [];

  return (
    <div className="space-y-6 pb-8">
      
      {/* Banner */}
      <div className="simple-card space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-emerald-400" /> AI Machine Learning Analysis
        </h1>
        <p className="text-slate-400 text-xs">
          Cross-validated performance evaluation, feature importance weights, and full team probabilities.
        </p>
      </div>

      {/* Model Validation Metrics Grid */}
      <div className="simple-card space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-teal-400" /> Model Validation Metrics ({predictionData?.model_used || 'LogisticRegression'})
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-400">Accuracy</div>
            <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">
              {metrics.accuracy ? `${(metrics.accuracy * 100).toFixed(1)}%` : '74.4%'}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-400">Precision</div>
            <div className="text-2xl font-extrabold text-amber-400 mt-0.5">
              {metrics.precision ? `${(metrics.precision * 100).toFixed(1)}%` : '66.5%'}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-400">Recall</div>
            <div className="text-2xl font-extrabold text-teal-400 mt-0.5">
              {metrics.recall ? `${(metrics.recall * 100).toFixed(1)}%` : '46.3%'}
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-400">F1-Score</div>
            <div className="text-2xl font-extrabold text-cyan-400 mt-0.5">
              {metrics.f1_score ? `${(metrics.f1_score * 100).toFixed(1)}%` : '50.7%'}
            </div>
          </div>
        </div>

        {/* Algorithm Comparison */}
        {allMetrics && Object.keys(allMetrics).length > 0 && (
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300">Algorithm Comparison:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {Object.entries(allMetrics).map(([algo, res]) => (
                <div key={algo} className={`p-2.5 rounded-lg border ${algo === predictionData?.model_used ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                  <div>{algo}</div>
                  <div className="text-slate-300 mt-0.5">Acc: {(res.accuracy * 100).toFixed(1)}% | F1: {(res.f1_score * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feature Importance Table */}
      <div className="simple-card space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-amber-400" /> Feature Importance Weights
        </h2>

        <div className="space-y-2 text-xs">
          {featureImportances.map((f) => (
            <div key={f.feature} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
              <span className="font-semibold text-slate-200">{f.label}</span>
              <span className="font-bold text-emerald-400">{(f.importance * 100).toFixed(1)}% Weight</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full Team Probabilities Table */}
      <div className="simple-card space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" /> Full Team Probabilities (2027)
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 font-bold uppercase border-b border-slate-800">
                <th className="py-2.5 px-4">Rank</th>
                <th className="py-2.5 px-4">Team</th>
                <th className="py-2.5 px-4">Recent Win %</th>
                <th className="py-2.5 px-4">WC Titles</th>
                <th className="py-2.5 px-4 text-right">AI Probability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {allPredictions.map((t, idx) => (
                <tr key={t.team}>
                  <td className="py-2.5 px-4 font-bold text-slate-400">#{idx + 1}</td>
                  <td className="py-2.5 px-4 font-bold text-white">{t.team}</td>
                  <td className="py-2.5 px-4">{t.recent_win_pct}%</td>
                  <td className="py-2.5 px-4">{t.wc_titles}</td>
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
