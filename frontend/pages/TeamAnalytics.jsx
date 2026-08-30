import React, { useState } from 'react';
import { Shield, Check } from 'lucide-react';

export default function TeamAnalytics({ teamsData }) {
  const [selectedTeams, setSelectedTeams] = useState(['India', 'Australia', 'South Africa']);

  const toggleTeam = (teamName) => {
    if (selectedTeams.includes(teamName)) {
      if (selectedTeams.length > 1) {
        setSelectedTeams(selectedTeams.filter(t => t !== teamName));
      }
    } else {
      if (selectedTeams.length < 4) {
        setSelectedTeams([...selectedTeams, teamName]);
      }
    }
  };

  const comparedTeams = teamsData.filter(t => selectedTeams.includes(t.Team));

  return (
    <div className="space-y-6 pb-8">
      
      {/* Banner */}
      <div className="simple-card space-y-2">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" /> Team Analysis &amp; Comparison
        </h1>
        <p className="text-slate-400 text-xs">
          Select teams below to compare World Cup records, win percentages, batting &amp; bowling strength.
        </p>
      </div>

      {/* Team Selector Pills */}
      <div className="simple-card space-y-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Select Teams (2 - 4 max):
        </span>
        <div className="flex flex-wrap gap-2">
          {teamsData.map((t) => {
            const isSelected = selectedTeams.includes(t.Team);
            return (
              <button
                key={t.Team}
                onClick={() => toggleTeam(t.Team)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-emerald-500/40'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{t.Team}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Comparison Table */}
      <div className="simple-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <th className="py-3 px-4">Metric</th>
                {comparedTeams.map(t => (
                  <th key={t.Team} className="py-3 px-4 text-emerald-400 font-bold">{t.Team}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-400">World Cup Titles</td>
                {comparedTeams.map(t => <td key={t.Team} className="py-2.5 px-4 font-bold text-amber-400">{t.Titles}</td>)}
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-400">Finals Appearances</td>
                {comparedTeams.map(t => <td key={t.Team} className="py-2.5 px-4">{t.Finals_Appearances}</td>)}
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-400">Semi-Finals Reached</td>
                {comparedTeams.map(t => <td key={t.Team} className="py-2.5 px-4">{t.Semi_Finals}</td>)}
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-400">WC Win Percentage</td>
                {comparedTeams.map(t => <td key={t.Team} className="py-2.5 px-4 font-bold text-emerald-400">{t.Win_Percentage}%</td>)}
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-400">Knockout Match Win %</td>
                {comparedTeams.map(t => <td key={t.Team} className="py-2.5 px-4 font-bold text-teal-400">{t.Knockout_Win_Pct}%</td>)}
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-400">Recent 3-Year Win %</td>
                {comparedTeams.map(t => <td key={t.Team} className="py-2.5 px-4">{t.Recent_Win_Pct}%</td>)}
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-400">Batting Rating</td>
                {comparedTeams.map(t => <td key={t.Team} className="py-2.5 px-4">{t.Batting_Rating}</td>)}
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-400">Bowling Rating</td>
                {comparedTeams.map(t => <td key={t.Team} className="py-2.5 px-4">{t.Bowling_Rating}</td>)}
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-slate-400">African Host Venue Rating</td>
                {comparedTeams.map(t => <td key={t.Team} className="py-2.5 px-4 font-bold text-cyan-400">{t.African_Host_Rating}/100</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
