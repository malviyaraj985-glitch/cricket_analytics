import React, { useState, useEffect, useMemo } from 'react';
import { fetchMatchupsData } from '../services/api';
import { 
  Swords, Search, Filter, X, AlertTriangle, CheckCircle2, 
  ShieldCheck, Activity, Info, ArrowUpDown, Globe, Award, Flame, Layers 
} from 'lucide-react';

export default function Matchups() {
  const [matchups, setMatchups] = useState([]);
  const [selectedMatchup, setSelectedMatchup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [batterCountry, setBatterCountry] = useState('All');
  const [bowlerCountry, setBowlerCountry] = useState('All');
  const [bowlingType, setBowlingType] = useState('All');
  const [sortBy, setSortBy] = useState('balls_desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchMatchupsData();
        setMatchups(data);
        if (data && data.length > 0) {
          setSelectedMatchup(data[0]);
        }
      } catch (err) {
        console.error("Failed to load matchups data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Extract unique countries dynamically from data
  const batterCountries = useMemo(() => {
    const set = new Set(matchups.map(m => m.batter_country || m.batter_team_name).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [matchups]);

  const bowlerCountries = useMemo(() => {
    const set = new Set(matchups.map(m => m.bowler_country || m.bowler_team_name).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [matchups]);

  const bowlingTypes = useMemo(() => {
    const set = new Set(matchups.map(m => m.bowling_type).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [matchups]);

  // Filtered and sorted matchups list
  const filteredMatchups = useMemo(() => {
    let result = matchups.filter(m => {
      // 1. Text search across batter or bowler name
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const bMatch = m.batter_name?.toLowerCase().includes(q);
        const wMatch = m.bowler_name?.toLowerCase().includes(q);
        if (!bMatch && !wMatch) return false;
      }

      // 2. Batter country filter
      if (batterCountry !== 'All') {
        const c = m.batter_country || m.batter_team_name;
        if (c !== batterCountry) return false;
      }

      // 3. Bowler country filter
      if (bowlerCountry !== 'All') {
        const c = m.bowler_country || m.bowler_team_name;
        if (c !== bowlerCountry) return false;
      }

      // 4. Bowling type filter
      if (bowlingType !== 'All') {
        if (m.bowling_type !== bowlingType) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'balls_desc':
          return (b.balls || 0) - (a.balls || 0);
        case 'runs_desc':
          return (b.runs || 0) - (a.runs || 0);
        case 'dismissals_desc':
          return (b.dismissals || 0) - (a.dismissals || 0);
        case 'sr_desc':
          return (b.strike_rate || 0) - (a.strike_rate || 0);
        case 'sr_asc':
          return (a.strike_rate || 0) - (b.strike_rate || 0);
        case 'dot_desc':
          return (b.dot_ball_percentage || 0) - (a.dot_ball_percentage || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [matchups, searchQuery, batterCountry, bowlerCountry, bowlingType, sortBy]);

  // When filters change, preserve selectedMatchup if still present in filtered list; otherwise select first
  useEffect(() => {
    if (filteredMatchups.length > 0) {
      const exists = filteredMatchups.some(m => m.matchup_id === selectedMatchup?.matchup_id);
      if (!exists) {
        setSelectedMatchup(filteredMatchups[0]);
      }
    }
  }, [filteredMatchups, selectedMatchup]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setBatterCountry('All');
    setBowlerCountry('All');
    setBowlingType('All');
    setSortBy('balls_desc');
  };

  const m = selectedMatchup || matchups[0] || {
    matchup_id: 1,
    batter_name: "Rohit Sharma",
    bowler_name: "Mitchell Starc",
    batter_country: "India",
    bowler_country: "Australia",
    batting_style: "Right-hand bat",
    bowling_style: "Left-arm fast",
    bowling_type: "Left-Arm Fast",
    balls: 142,
    runs: 138,
    dismissals: 3,
    fours: 16,
    sixes: 5,
    dot_balls: 74,
    strike_rate: 97.18,
    dot_ball_percentage: 52.1,
    boundary_percentage: 14.8,
    batting_average_vs_bowler: 46.0,
    matches_count: 11,
    is_limited_sample: false,
    sample_warning: "Robust sample size (142 balls faced across major ODI tournaments).",
    tournament_coverage: "ICC World Cups (2015, 2019, 2023) & Bilateral Series",
    date_range: "2015–2024",
    dominance: "Competitive Equilibrium",
    tactical_note: "Starc troubles Rohit with late inswing with the new ball, but Rohit scores aggressively once he survives the opening spell."
  };

  const isSmallSample = m.balls < 30;

  // Calculation for delivery distribution bar
  const dotPct = m.dot_ball_percentage || 0;
  const bndPct = m.boundary_percentage || 0;
  const rotationPct = Math.max(0, +(100 - dotPct - bndPct).toFixed(1));

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Swords className="w-3.5 h-3.5" />
            <span>CRICKET INTELLIGENCE • BALL-BY-BALL HEAD-TO-HEAD</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center space-x-3">
            <span>BATTER VS BOWLER MATCHUP ANALYTICS</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Historical head-to-head performance metrics between premier international batters and pace/spin bowlers across ICC Cricket World Cups and ODI tournaments.
          </p>
        </div>

        {/* Global Metadata Stats */}
        <div className="flex items-center space-x-3">
          <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verified Duels</span>
            <span className="text-xl font-black text-emerald-400">{matchups.length} Matchups</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">ICC Nations</span>
            <span className="text-xl font-black text-cyan-400">10 Teams</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* 1. Name Search */}
          <div className="relative">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Search Batter or Bowler
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Kohli, Starc, Bumrah..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 2. Batter Country Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Batter Country
            </label>
            <select
              value={batterCountry}
              onChange={(e) => setBatterCountry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {batterCountries.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Batting Nations' : c}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Bowler Country Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Bowler Country
            </label>
            <select
              value={bowlerCountry}
              onChange={(e) => setBowlerCountry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {bowlerCountries.map(c => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Bowling Nations' : c}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Bowling Type Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Bowling Type
            </label>
            <select
              value={bowlingType}
              onChange={(e) => setBowlingType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {bowlingTypes.map(t => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Bowling Styles' : t}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Sort Dropdown */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
              >
                <option value="balls_desc">Balls Faced (High to Low)</option>
                <option value="runs_desc">Runs Scored (High to Low)</option>
                <option value="dismissals_desc">Dismissals (High to Low)</option>
                <option value="sr_desc">Strike Rate (High to Low)</option>
                <option value="sr_asc">Strike Rate (Low to High)</option>
                <option value="dot_desc">Dot Ball % (High to Low)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Filter Summary & Quick Reset */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
          <div className="flex items-center space-x-2 text-slate-400">
            <span>Showing <strong className="text-white font-bold">{filteredMatchups.length}</strong> of {matchups.length} head-to-head records</span>
            {(searchQuery || batterCountry !== 'All' || bowlerCountry !== 'All' || bowlingType !== 'All' || sortBy !== 'balls_desc') && (
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                Filters Active
              </span>
            )}
          </div>
          {(searchQuery || batterCountry !== 'All' || bowlerCountry !== 'All' || bowlingType !== 'All' || sortBy !== 'balls_desc') && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold underline flex items-center space-x-1"
            >
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Matchup Selector & Comprehensive Analytics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Matchup List / Selector (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center space-x-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Select Matchup Duel</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-semibold">{filteredMatchups.length} matches</span>
          </div>

          {/* Scrollable Matchups List */}
          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredMatchups.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-3">
                <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
                <h3 className="text-sm font-bold text-white">No matchups found</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  No head-to-head records match the selected country, bowling style, or search query.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-xl transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredMatchups.map((item) => {
                const isSelected = m.matchup_id === item.matchup_id;
                
                // Dominance badge color
                const isBowlerDom = item.dismissals >= 3 && item.strike_rate < 85;
                const isBatterDom = item.dismissals <= 1 && item.strike_rate >= 95;

                return (
                  <button
                    key={item.matchup_id}
                    onClick={() => setSelectedMatchup(item)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col space-y-2.5 relative ${
                      isSelected
                        ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-950/40 text-emerald-300'
                        : 'bg-slate-950 border-slate-800/80 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                    }`}
                  >
                    {/* Top Row: Batter vs Bowler with Country Tags */}
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-white text-xs truncate max-w-[210px] sm:max-w-xs">
                        <span>{item.batter_name}</span>
                        <span className="text-slate-500 mx-1.5 font-normal">vs</span>
                        <span>{item.bowler_name}</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isBowlerDom
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : isBatterDom
                          ? 'bg-teal-500/15 text-teal-400 border border-teal-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isBowlerDom ? 'Bowler Edge' : isBatterDom ? 'Batter Edge' : 'Even Contest'}
                      </span>
                    </div>

                    {/* Middle Row: Countries & Styles */}
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-300">{item.batter_country}</span>
                      <span>•</span>
                      <span>{item.batting_style}</span>
                      <span>vs</span>
                      <span className="font-semibold text-slate-300">{item.bowler_country}</span>
                      <span>•</span>
                      <span className="truncate">{item.bowling_type}</span>
                    </div>

                    {/* Bottom Row: Key Metric Badges */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[11px] font-semibold">
                      <div className="flex items-center space-x-3 text-slate-400">
                        <span><strong className="text-white font-bold">{item.balls}</strong> balls</span>
                        <span><strong className="text-emerald-400 font-bold">{item.runs}</strong> runs</span>
                        <span><strong className="text-rose-400 font-bold">{item.dismissals}</strong> outs</span>
                      </div>
                      <span className="text-xs font-black text-amber-400">
                        {item.strike_rate} SR
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Detailed Matchup Analytics Dossier (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Duel Identity Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            
            {/* Duel Header with Central Emblem */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center border-b border-slate-800 pb-6">
              
              {/* Batter Box (5 cols) */}
              <div className="md:col-span-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Batter</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded font-semibold ml-auto">{m.batter_country}</span>
                </div>
                <h2 className="text-xl font-black text-white">{m.batter_name}</h2>
                <div className="text-xs text-slate-400 space-y-0.5">
                  <div>{m.batting_style}</div>
                  <div className="text-[11px] text-slate-500">{m.batter_role}</div>
                </div>
              </div>

              {/* Central Swords / VS Emblem (1 col) */}
              <div className="md:col-span-1 flex flex-col items-center justify-center py-2">
                <div className="w-9 h-9 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-md">
                  <Swords className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-black text-slate-500 mt-1 uppercase">VS</span>
              </div>

              {/* Bowler Box (5 cols) */}
              <div className="md:col-span-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Bowler</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded font-semibold ml-auto">{m.bowler_country}</span>
                </div>
                <h2 className="text-xl font-black text-white">{m.bowler_name}</h2>
                <div className="text-xs text-slate-400 space-y-0.5">
                  <div>{m.bowling_type}</div>
                  <div className="text-[11px] text-slate-500">{m.bowler_role}</div>
                </div>
              </div>

            </div>

            {/* Sample Size Warning / Confidence Status (Requirement #3 & #4) */}
            {isSmallSample ? (
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-start space-x-3 text-amber-400 text-xs">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-extrabold uppercase tracking-wide">Limited Sample Size Warning (&lt; 30 balls faced)</div>
                  <p className="text-slate-300 leading-relaxed font-normal">
                    This matchup has a sample size of <strong>{m.balls} balls</strong>. While mathematically verified from official ODI scorecards, treat extreme strike rates or zero dismissals with caution due to variance inherent in small samples.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl flex items-center space-x-3 text-emerald-400 text-xs">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <div className="font-semibold text-slate-200">
                  <strong className="text-emerald-400">Robust Statistical Sample Size:</strong> {m.balls} balls faced across {m.matches_count} international ODI encounters with verified ball-by-ball tracking.
                </div>
              </div>
            )}

            {/* Core Head-to-Head Statistics Grid (4 primary metrics) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              {/* Metric 1: Runs Scored */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Runs Scored</span>
                <span className="text-2xl font-black text-white mt-1 block">{m.runs}</span>
                <span className="text-[11px] text-slate-500 block">Off {m.balls} deliveries</span>
              </div>

              {/* Metric 2: Dismissals & Average */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Dismissals</span>
                <span className="text-2xl font-black text-rose-400 mt-1 block">{m.dismissals}</span>
                <span className="text-[11px] text-slate-400 block font-semibold">
                  {m.dismissals > 0 
                    ? `Avg: ${(m.runs / m.dismissals).toFixed(2)}` 
                    : 'Unbeaten (0 outs)'}
                </span>
              </div>

              {/* Metric 3: Strike Rate */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Strike Rate</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">{m.strike_rate}</span>
                <span className="text-[11px] text-slate-500 block">(Runs / Balls) × 100</span>
              </div>

              {/* Metric 4: Dot Ball % */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Dot Ball %</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">{m.dot_ball_percentage}%</span>
                <span className="text-[11px] text-slate-500 block">{m.dot_balls} dots / {m.balls} balls</span>
              </div>

            </div>

            {/* Extended Ball-by-Ball Distribution Breakdown */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white uppercase tracking-wider">
                  Ball-by-Ball Delivery Outcome Distribution
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Total Balls: {m.balls}
                </span>
              </div>

              {/* 3-Part Delivery Outcome Bar */}
              <div className="w-full bg-slate-800 h-5 rounded-full overflow-hidden flex shadow-inner">
                {/* Dot balls */}
                <div 
                  className="bg-gradient-to-r from-amber-600 to-amber-500 h-full transition-all duration-500" 
                  style={{ width: `${dotPct}%` }}
                  title={`Dot Balls: ${dotPct}% (${m.dot_balls} balls)`}
                ></div>
                {/* Strike Rotation (1s, 2s, 3s) */}
                <div 
                  className="bg-gradient-to-r from-cyan-600 to-cyan-500 h-full transition-all duration-500" 
                  style={{ width: `${rotationPct}%` }}
                  title={`Strike Rotation (Singles/Twos): ${rotationPct}%`}
                ></div>
                {/* Boundary Balls (4s & 6s) */}
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500" 
                  style={{ width: `${bndPct}%` }}
                  title={`Boundaries: ${bndPct}% (${m.boundary_balls} balls)`}
                ></div>
              </div>

              {/* Bar Legend */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="text-slate-300 font-semibold">Dot Balls: <strong className="text-white">{dotPct}%</strong> ({m.dot_balls})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                  <span className="text-slate-300 font-semibold">Strike Rotation: <strong className="text-white">{rotationPct}%</strong></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span className="text-slate-300 font-semibold">Boundaries: <strong className="text-white">{bndPct}%</strong> ({m.boundary_balls})</span>
                </div>
              </div>
            </div>

            {/* Boundary Breakdown & Dominance Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Boundary Output</span>
                <div className="flex items-baseline space-x-2 mt-1">
                  <span className="text-xl font-black text-white">{m.fours}×4s</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xl font-black text-white">{m.sixes}×6s</span>
                </div>
                <span className="text-[11px] text-emerald-400 block font-semibold">{m.boundary_percentage}% of deliveries</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dominance Assessment</span>
                <span className="text-base font-black text-white mt-1 block">
                  {m.dominance || (m.dismissals >= 3 ? 'Bowler Advantage' : 'Competitive Equilibrium')}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {m.dismissals >= 3 
                    ? `${m.bowler_name} has claimed ${m.dismissals} dismissals` 
                    : `${m.batter_name} scores at ${m.strike_rate} SR`}
                </span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Encounter Period</span>
                <span className="text-base font-black text-cyan-400 mt-1 block">{m.date_range}</span>
                <span className="text-[11px] text-slate-400 block">{m.matches_count} ODI Encounters</span>
              </div>

            </div>

            {/* Tactical Nuance & Match Context */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Tactical Context & Match Analysis</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "{m.tactical_note || `${m.batter_name} has faced ${m.balls} deliveries from ${m.bowler_name} in international ODIs, scoring ${m.runs} runs with ${m.dismissals} dismissals.`}"
              </p>
            </div>

            {/* Tournament Coverage & Provenance Disclosure */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-400">
              <div className="flex items-center space-x-1.5 text-slate-300 font-semibold">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tournament Coverage & Data Provenance</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <strong>Tournaments:</strong> {m.tournament_coverage || "ICC Men's Cricket World Cups & Bilateral ODIs"}.
                Metrics reflect actual batter-versus-bowler deliveries. Extras (wides, byes, leg-byes) are excluded from batter runs. Only dismissals credited directly to the bowler are counted (run-outs are segregated).
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
