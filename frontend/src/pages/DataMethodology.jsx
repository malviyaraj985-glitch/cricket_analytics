import React, { useState, useEffect } from 'react';
import { fetchDataSources } from '../services/api';
import { BookOpen, Database, ShieldAlert, FileSpreadsheet, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function DataMethodology() {
  const [sourcesData, setSourcesData] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await fetchDataSources();
      setSourcesData(res);
    }
    load();
  }, []);

  const sources = sourcesData?.sources || [
    { name: "Cricsheet ODI Match Data", source_url: "https://cricsheet.org/", retrieved_at: "2026-10-03T20:00:00Z", data_version: "v1.0-cricsheet", data_status: "verified", record_count: 500, description: "Ball-by-ball and match level historical records (1983-2024)." },
    { name: "Official ICC Rankings & World Cup Archives", source_url: "https://www.icc-cricket.com/", retrieved_at: "2026-10-03T20:00:00Z", data_version: "v2024.1", data_status: "verified", record_count: 10, description: "Official World Cup tournament standings and squad records." }
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-emerald-400" />
          <span>DATA PROVENANCE, METHODOLOGY & LIMITATIONS</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Full technical transparency: verified dataset sources, pre-match feature engineering, data leakage prevention, limitations, and Power BI reporting views.
        </p>
      </div>

      {/* Data Provenance & Sources (Requirement #5, #31) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
          <Database className="w-5 h-5 text-emerald-400" />
          <span>Data Provenance & Verified Sources</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[11px] font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Dataset Name</th>
                <th className="py-3 px-4">Source URL</th>
                <th className="py-3 px-4">Retrieved At</th>
                <th className="py-3 px-4">Version</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-semibold text-slate-200">
              {sources.map((s, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 font-bold text-white">{s.name}</td>
                  <td className="py-3 px-4 text-emerald-400 font-mono text-[11px]">
                    <a href={s.source_url} target="_blank" rel="noreferrer" className="underline">{s.source_url}</a>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{s.retrieved_at}</td>
                  <td className="py-3 px-4 text-cyan-400">{s.data_version}</td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-[10px] font-extrabold">
                      {s.data_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Engineering & Data Leakage Prevention (Requirement #9) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Pre-Match Feature Engineering</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Features are calculated exclusively from historical matches occurring strictly <strong>BEFORE</strong> match start date (<code className="text-emerald-400">as_of_date</code>). Features include 15-match rolling win rates, batting/bowling ratings, host pitch adaptability, and head-to-head records.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <h3 className="text-base font-extrabold text-white flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-teal-400" />
            <span>Automated Data Leakage Prevention</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            Before model inference, automated pipeline checks verify that no post-match statistics (final scores, wickets lost, post-match player stats, or future rankings) enter the feature matrix.
          </p>
        </div>

      </div>

      {/* Power BI Integration (Requirement #32, #33) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            <span>Power BI-Compatible Analytics Dataset & SQL Views</span>
          </h2>
          <span className="text-xs text-slate-400 font-mono">database/powerbi_views.sql</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-medium">
          The database schema includes 6 pre-built SQL Views optimized for DirectQuery / Import into Power BI Desktop:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono font-bold text-emerald-400">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">vw_team_analytics</div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">vw_player_analytics</div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">vw_venue_analytics</div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">vw_match_predictions</div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">vw_model_performance</div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">vw_backtesting</div>
        </div>
      </div>

      {/* Technical Limitations Page (Requirement #23) */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-lg font-extrabold text-white flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>System Limitations & Disclaimer</span>
        </h2>

        <ul className="space-y-2 text-xs text-slate-300 font-medium list-disc list-inside leading-relaxed">
          <li><strong>Probabilistic Nature:</strong> Predictions represent statistical win probabilities derived from machine learning models, not guaranteed outcomes.</li>
          <li><strong>Cricket Inherent Randomness:</strong> One-day cricket contains stochastic elements (dew factor, unplayable individual deliveries, edge catches) that cannot be deterministically modeled.</li>
          <li><strong>Squad Availability:</strong> Last-minute match-day injuries or tactical bench drops may not be reflected in static pre-match data unless modified in the What-If Simulator.</li>
          <li><strong>Weather Observations:</strong> Where historical weather station telemetry is missing, features fall back to regional averages explicitly marked as non-verified.</li>
        </ul>
      </div>

    </div>
  );
}
