import React from 'react';
import { Database, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function DataSources() {
  return (
    <div className="space-y-6 pb-8">
      
      {/* Banner */}
      <div className="simple-card space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" /> Data Sources &amp; Prediction Disclaimer
        </h1>
        <p className="text-slate-400 text-xs">
          Official references, data compilation sources, and machine learning model disclaimers.
        </p>
      </div>

      {/* Data Sources List */}
      <div className="simple-card space-y-3">
        <h2 className="text-base font-bold text-white">Data Citations &amp; References</h2>
        <ul className="text-xs text-slate-300 space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Official ICC Men's ODI World Cup Match Archives (1983 – 2023)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ESPNcricinfo Statsguru Team &amp; Player Records
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Recent 3-Year International ODI Rankings &amp; Results (2024 – 2026)
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sub-continent and African Host Condition Performance Metrics
          </li>
        </ul>
      </div>

      {/* Short Disclaimer */}
      <div className="simple-card bg-slate-900 border-slate-800 space-y-2 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <ShieldAlert className="w-4 h-4" /> Statistical ML Prediction Disclaimer
        </div>
        <p className="text-slate-400 leading-relaxed">
          This platform generates statistical machine learning predictions based on historical match metrics, team consistency, and host venue performance. Predictions are calculated probabilities for educational and analytical purposes and do not guarantee future tournament results.
        </p>
      </div>

    </div>
  );
}
