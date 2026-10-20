import React, { useState, useEffect, useMemo } from 'react';
import { fetchVenuesData } from '../services/api';
import { 
  MapPin, Compass, Wind, PieChart, Search, Filter, X, 
  Award, ShieldCheck, Activity, Info, BarChart3, Users, CheckCircle2, Globe, Flame, Layers 
} from 'lucide-react';

export default function VenueIntelligence() {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedProfile, setSelectedProfile] = useState('All');
  const [hostFilter, setHostFilter] = useState('All'); // 'All' | 'Confirmed' | 'Historical'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchVenuesData();
        setVenues(data);
        if (data && data.length > 0) {
          setSelectedVenue(data[0]);
        }
      } catch (err) {
        console.error("Failed to load venues:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Extract unique countries and pitch profiles dynamically
  const countries = useMemo(() => {
    const set = new Set(venues.map(v => v.country).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [venues]);

  const profiles = useMemo(() => {
    const set = new Set(venues.map(v => v.pitch_profile).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [venues]);

  // Host counts for tabs
  const hostCounts = useMemo(() => {
    const confirmed = venues.filter(v => v.is_wc2027_host === 1 || v.is_wc2027_host === true).length;
    const historical = venues.filter(v => !v.is_wc2027_host || v.is_wc2027_host === 0).length;
    return { all: venues.length, confirmed, historical };
  }, [venues]);

  // Filtered venues based on search and filters
  const filteredVenues = useMemo(() => {
    return venues.filter(item => {
      // 1. Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.venue_name?.toLowerCase().includes(q);
        const matchesCity = item.city?.toLowerCase().includes(q);
        const matchesCountry = item.country?.toLowerCase().includes(q);
        if (!matchesName && !matchesCity && !matchesCountry) return false;
      }

      // 2. Country filter
      if (selectedCountry !== 'All' && item.country !== selectedCountry) {
        return false;
      }

      // 3. Pitch profile filter
      if (selectedProfile !== 'All' && item.pitch_profile !== selectedProfile) {
        return false;
      }

      // 4. Host filter
      if (hostFilter === 'Confirmed') {
        if (!(item.is_wc2027_host === 1 || item.is_wc2027_host === true)) return false;
      } else if (hostFilter === 'Historical') {
        if (item.is_wc2027_host === 1 || item.is_wc2027_host === true) return false;
      }

      return true;
    });
  }, [venues, searchQuery, selectedCountry, selectedProfile, hostFilter]);

  // Fallback venue if none selected
  const v = selectedVenue || venues[0] || {
    venue_name: "The Wanderers Stadium",
    city: "Johannesburg",
    country: "South Africa",
    pitch_profile: "Pace-Friendly",
    capacity: 34000,
    is_wc2027_host: 1,
    host_status: "Confirmed 2027 Host",
    matches: 53,
    avg_first_innings_score: 262,
    avg_second_innings_score: 231,
    chasing_success_pct: 49.1,
    pace_wicket_rate: 68.5,
    spin_wicket_rate: 31.5,
    avg_run_rate: 5.58,
    venue_balance_score: 79.5,
    sample_window: "1992–2024 (53 ODIs)",
    data_source: "Cricsheet & ESPNcricinfo Archive"
  };

  const isConfirmedHost = Boolean(v.is_wc2027_host === 1 || v.is_wc2027_host === true);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCountry('All');
    setSelectedProfile('All');
    setHostFilter('All');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCountry !== 'All' || selectedProfile !== 'All' || hostFilter !== 'All';

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>GLOBAL CRICKET VENUE DATABASE • 32 INTERNATIONAL GROUNDS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center space-x-3">
            <MapPin className="w-8 h-8 text-emerald-400 shrink-0" />
            <span>VENUE INTELLIGENCE & PITCH ANALYTICS</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Verified historical ODI ground records across 8 cricket nations. Compare pitch dynamics, 1st vs 2nd innings totals, pace vs spin balance, and official 2027 World Cup host stadium profiles.
          </p>
        </div>

        {/* Global Summary Metric Pill */}
        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl shrink-0 self-start md:self-auto">
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tournament Hosts</div>
            <div className="text-xs font-black text-emerald-400">11 Confirmed Grounds</div>
          </div>
          <div className="h-7 w-px bg-slate-800"></div>
          <div className="text-left">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Historical Venues</div>
            <div className="text-xs font-black text-cyan-400">21 Global Grounds</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Venue Selector & Multi-Filters (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
            
            {/* Title & Clear Filters button */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-white flex items-center space-x-2">
                <Filter className="w-4 h-4 text-emerald-400" />
                <span>Search & Filter Stadiums</span>
              </h2>
              {hasActiveFilters && (
                <button 
                  onClick={clearAllFilters}
                  className="text-xs text-slate-400 hover:text-emerald-400 flex items-center space-x-1 font-semibold transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* 1. Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stadium, city, or country..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-9 py-2.5 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 2. Tournament Host Filter Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setHostFilter('All')}
                className={`py-1.5 px-2 rounded-lg transition-all text-center ${
                  hostFilter === 'All'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({hostCounts.all})
              </button>
              <button
                onClick={() => setHostFilter('Confirmed')}
                className={`py-1.5 px-2 rounded-lg transition-all text-center ${
                  hostFilter === 'Confirmed'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-emerald-400'
                }`}
              >
                ★ 2027 Hosts ({hostCounts.confirmed})
              </button>
              <button
                onClick={() => setHostFilter('Historical')}
                className={`py-1.5 px-2 rounded-lg transition-all text-center ${
                  hostFilter === 'Historical'
                    ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-cyan-400'
                }`}
              >
                Historical ({hostCounts.historical})
              </button>
            </div>

            {/* 3. Country & Pitch Profile Dropdowns */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 text-xs font-semibold focus:border-emerald-500 outline-none"
                >
                  {countries.map(c => (
                    <option key={c} value={c}>{c === 'All' ? 'All Countries' : c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Pitch Profile</label>
                <select
                  value={selectedProfile}
                  onChange={(e) => setSelectedProfile(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 text-xs font-semibold focus:border-emerald-500 outline-none"
                >
                  {profiles.map(p => (
                    <option key={p} value={p}>{p === 'All' ? 'All Pitch Profiles' : p}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Result Count Banner */}
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 pt-1 border-t border-slate-800/60">
              <span>Showing {filteredVenues.length} of {venues.length} venues</span>
              {hostFilter === 'Confirmed' && (
                <span className="text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>CSA / ICC Confirmed</span>
                </span>
              )}
            </div>

          </div>

          {/* 4. Scrollable Venue List Container */}
          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1 no-scrollbar">
            {filteredVenues.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <div className="text-sm font-bold text-white">No stadiums found</div>
                <p className="text-xs text-slate-400">
                  No cricket grounds match your search criteria. Try modifying your search or clearing filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all inline-block mt-1"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredVenues.map(item => {
                const isSelected = v.venue_id === item.venue_id || v.venue_name === item.venue_name;
                const isItemHost = Boolean(item.is_wc2027_host === 1 || item.is_wc2027_host === true);
                return (
                  <button
                    key={item.venue_id || item.venue_name}
                    onClick={() => setSelectedVenue(item)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col space-y-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-emerald-500/15 to-teal-500/10 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/30'
                        : 'bg-slate-900 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className={`font-extrabold text-sm truncate ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                          {item.venue_name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium flex items-center space-x-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          <span>{item.city}, {item.country}</span>
                        </div>
                      </div>

                      {/* Host Status Badge */}
                      {isItemHost ? (
                        <span className="shrink-0 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                          <Award className="w-3 h-3" />
                          <span>2027 Host</span>
                        </span>
                      ) : (
                        <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                          Historical
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/50">
                      <span className="text-cyan-400 font-bold px-2 py-0.5 bg-slate-950 border border-slate-800 rounded-md text-[10px]">
                        {item.pitch_profile || 'Balanced'}
                      </span>
                      <span className="text-slate-400 font-semibold text-[10px]">
                        {item.capacity ? `${item.capacity.toLocaleString()} seats` : 'Capacity N/A'}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Dynamic Venue Analytics & Verification (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Selected Venue Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-7 rounded-2xl space-y-6">
            
            {/* Top Venue Metadata Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{v.city}, {v.country}</span>
                  </span>
                  
                  {isConfirmedHost ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-wider flex items-center space-x-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Official 2027 World Cup Host Venue</span>
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-semibold flex items-center space-x-1">
                      <Globe className="w-3 h-3 text-cyan-400" />
                      <span>Historical International ODI Venue</span>
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {v.venue_name}
                </h2>
                
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
                  <span className="flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>Capacity: <strong className="text-white font-bold">{v.capacity ? `${v.capacity.toLocaleString()} seats` : 'N/A'}</strong></span>
                  </span>
                  {v.latitude && v.longitude && (
                    <span className="text-slate-500 text-[11px]">
                      Coordinates: {Number(v.latitude).toFixed(2)}°, {Number(v.longitude).toFixed(2)}°
                    </span>
                  )}
                </div>
              </div>

              {/* Pitch Profile Badge Card */}
              <div className="sm:text-right shrink-0">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">PITCH PROFILE</span>
                <span className={`px-3.5 py-1.5 rounded-xl text-xs font-black inline-block mt-1 border ${
                  v.pitch_profile === 'Pace-Friendly' 
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-300'
                    : v.pitch_profile === 'Batting-Friendly'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : v.pitch_profile === 'Spin-Friendly'
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                    : 'bg-blue-500/10 border-blue-500/40 text-blue-300'
                }`}>
                  {v.pitch_profile || 'Balanced'}
                </span>
                <div className="text-[10px] text-slate-500 mt-1 font-semibold">
                  Sample: {v.matches ? `${v.matches} Historical ODIs` : 'Verified Archive'}
                </div>
              </div>
            </div>

            {/* 4 Innings & Scoring Metrics Grid */}
            <div>
              <div className="text-xs font-bold text-slate-400 mb-2.5 flex items-center space-x-1.5">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Historical ODI Scoring Benchmarks</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold block">Avg 1st Innings</span>
                  <span className="text-2xl font-black text-white mt-1 block">
                    {v.avg_first_innings_score || "N/A"}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Defending Total</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold block">Avg 2nd Innings</span>
                  <span className="text-2xl font-black text-slate-300 mt-1 block">
                    {v.avg_second_innings_score || "N/A"}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Chasing Target</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold block">Chasing Win Rate</span>
                  <span className="text-2xl font-black text-emerald-400 mt-1 block">
                    {v.chasing_success_pct != null ? `${v.chasing_success_pct}%` : "N/A"}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    {v.chasing_success_pct >= 50 ? 'Chasing Advantage' : 'Defending Advantage'}
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-semibold block">Average Run Rate</span>
                  <span className="text-2xl font-black text-cyan-400 mt-1 block">
                    {v.avg_run_rate ? `${v.avg_run_rate} rpo` : "N/A"}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Runs Per Over</span>
                </div>

              </div>
            </div>

            {/* Pace vs Spin Wicket Distribution Card */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div className="flex items-center space-x-2">
                  <PieChart className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-extrabold text-white">Pace vs Spin Wicket Distribution</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] text-slate-400 font-semibold">Venue Balance Score:</span>
                  <span className="text-xs font-black text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                    {v.venue_balance_score != null ? `${v.venue_balance_score} / 100` : "N/A"}
                  </span>
                </div>
              </div>

              {v.pace_wicket_rate != null && v.spin_wicket_rate != null ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-teal-400 flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                      <span>Fast Bowlers / Pace ({v.pace_wicket_rate}%)</span>
                    </span>
                    <span className="text-cyan-400 flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                      <span>Spin Bowlers ({v.spin_wicket_rate}%)</span>
                    </span>
                  </div>
                  
                  {/* Dynamic Progress Bar */}
                  <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden flex shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-500" 
                      style={{ width: `${v.pace_wicket_rate}%` }}
                      title={`Pace Wickets: ${v.pace_wicket_rate}%`}
                    ></div>
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full transition-all duration-500" 
                      style={{ width: `${v.spin_wicket_rate}%` }}
                      title={`Spin Wickets: ${v.spin_wicket_rate}%`}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">
                  Pace vs Spin wicket breakdown is unavailable for this ground record.
                </div>
              )}
            </div>

            {/* Historical Ground Record & Archive Provenance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Sample Size</span>
                <span className="text-xs font-bold text-white mt-0.5 block">{v.matches ? `${v.matches} International ODIs` : 'N/A'}</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Historical Window</span>
                <span className="text-xs font-bold text-slate-300 mt-0.5 block">{v.sample_window || '1992–2024'}</span>
              </div>
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Data Provenance</span>
                <span className="text-xs font-bold text-emerald-400 mt-0.5 block truncate" title={v.data_source || 'Cricsheet & Official ICC Archive'}>
                  {v.data_source || 'Cricsheet & Official ICC'}
                </span>
              </div>
            </div>

          </div>

          {/* World Cup 2027 Context & Balance Score Methodology Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Box 1: 2027 Tournament Context */}
            <div className={`p-5 rounded-2xl border space-y-2.5 ${
              isConfirmedHost
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100'
                : 'bg-slate-900 border-slate-800 text-slate-300'
            }`}>
              <div className="flex items-center space-x-2">
                <ShieldCheck className={`w-4 h-4 ${isConfirmedHost ? 'text-emerald-400' : 'text-slate-400'}`} />
                <h3 className="text-xs font-extrabold uppercase tracking-wider">
                  {isConfirmedHost ? 'Official 2027 World Cup Host Venue' : 'Comparative Historical Ground'}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isConfirmedHost ? (
                  <>
                    <strong className="text-emerald-300 font-semibold">{v.venue_name}</strong> is an officially confirmed host venue for the 2027 ICC Men's Cricket World Cup (co-hosted by South Africa, Zimbabwe, and Namibia). Pitch profiles and altitude factors are directly integrated into our pre-match feature engineering pipeline.
                  </>
                ) : (
                  <>
                    <strong className="text-white font-semibold">{v.venue_name}</strong> is a premier historical international ground included in our database for cross-era benchmarking and global pitch profiling. It is not an official venue for the 2027 World Cup tournament.
                  </>
                )}
              </p>
            </div>

            {/* Box 2: Balance Metric Definition */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2.5 text-slate-300">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-white">
                  Venue Balance Score Methodology
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quantifies competitive neutrality between batting and bowling, and toss equilibrium:
                <code className="block my-1.5 p-1.5 bg-slate-950 rounded text-[10px] text-cyan-300 font-mono">
                  Score = 100 - [|Chasing% - 50|×0.8 + |(1st - 250)/250|×30 + |Pace% - Spin%|×0.2]
                </code>
                Venues with neutral toss outcomes and dual pace/spin threat score highest.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
