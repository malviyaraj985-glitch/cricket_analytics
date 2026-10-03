import React, { useState } from 'react';
import { Shield, Swords, BarChart2, CheckCircle2 } from 'lucide-react';

export default function TeamAnalytics({ teamsData }) {
  const [selectedTeam1, setSelectedTeam1] = useState("India");
  const [selectedTeam2, setSelectedTeam2] = useState("Australia");

  const teams = teamsData || [];
  const team1 = teams.find(t => (t.Team || t.team_name) === selectedTeam1) || teams[0] || {};
  const team2 = teams.find(t => (t.Team || t.team_name) === selectedTeam2) || teams[1] || {};

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <Shield className="w-8 h-8 text-emerald-400" />
          <span>TEAM INTELLIGENCE & ANALYTICS</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Historical World Cup records, 3-year rolling ODI form, batting/bowling ratings, and side-by-side team comparison.
        </p>
      </div>

      {/* Side-by-Side Team Comparator Controls */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
          <Swords className="w-5 h-5 text-emerald-400" />
          <span>Select Teams to Compare</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">First Team</label>
            <select 
              value={selectedTeam1}
              onChange={(e) => setSelectedTeam1(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-emerald-500 outline-none"
            >
              {teams.map(t => <option key={t.Team || t.team_name} value={t.Team || t.team_name}>{t.Team || t.team_name}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Second Team</label>
            <select 
              value={selectedTeam2}
              onChange={(e) => setSelectedTeam2(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 text-xs font-bold focus:border-emerald-500 outline-none"
            >
              {teams.map(t => <option key={t.Team || t.team_name} value={t.Team || t.team_name}>{t.Team || t.team_name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Team 1 Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Team Profile</span>
              <h3 className="text-2xl font-black text-emerald-400 mt-0.5">{team1.Team || team1.team_name || "India"}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block">World Cup Titles</span>
              <span className="text-xl font-black text-amber-400">{team1.Titles ?? team1.wc_titles ?? 2} 🏆</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">3-Year Win Percentage</span>
              <span className="text-white font-extrabold text-sm">{team1.Recent_Win_Pct ?? team1.win_percentage ?? 80.0}%</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">Batting Strength Rating</span>
              <span className="text-emerald-400 font-extrabold text-sm">{team1.Batting_Rating ?? team1.batting_strength ?? 92.5} / 100</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">Bowling Attack Rating</span>
              <span className="text-teal-400 font-extrabold text-sm">{team1.Bowling_Rating ?? team1.bowling_strength ?? 90.0} / 100</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">African Host Rating (2027)</span>
              <span className="text-cyan-400 font-extrabold text-sm">{team1.African_Host_Rating ?? 78.0} / 100</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">Average Runs / Innings</span>
              <span className="text-white font-extrabold text-sm">{team1.avg_runs ?? 312.4}</span>
            </div>
          </div>
        </div>

        {/* Team 2 Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">Team Profile</span>
              <h3 className="text-2xl font-black text-cyan-400 mt-0.5">{team2.Team || team2.team_name || "Australia"}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 block">World Cup Titles</span>
              <span className="text-xl font-black text-amber-400">{team2.Titles ?? team2.wc_titles ?? 6} 🏆</span>
            </div>
          </div>

          <div className="space-y-4 text-xs font-semibold">
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">3-Year Win Percentage</span>
              <span className="text-white font-extrabold text-sm">{team2.Recent_Win_Pct ?? team2.win_percentage ?? 73.3}%</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">Batting Strength Rating</span>
              <span className="text-emerald-400 font-extrabold text-sm">{team2.Batting_Rating ?? team2.batting_strength ?? 89.0} / 100</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">Bowling Attack Rating</span>
              <span className="text-teal-400 font-extrabold text-sm">{team2.Bowling_Rating ?? team2.bowling_strength ?? 88.5} / 100</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">African Host Rating (2027)</span>
              <span className="text-cyan-400 font-extrabold text-sm">{team2.African_Host_Rating ?? 82.0} / 100</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400">Average Runs / Innings</span>
              <span className="text-white font-extrabold text-sm">{team2.avg_runs ?? 298.5}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
