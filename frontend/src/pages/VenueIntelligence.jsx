import React, { useState, useEffect } from 'react';
import { fetchVenuesData } from '../services/api';
import { MapPin, Compass, Wind, PieChart } from 'lucide-react';

export default function VenueIntelligence() {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await fetchVenuesData();
      setVenues(data);
      if (data.length > 0) setSelectedVenue(data[0]);
    }
    load();
  }, []);

  const v = selectedVenue || {
    venue_name: "The Wanderers Stadium",
    city: "Johannesburg",
    country: "South Africa",
    pitch_profile: "Pace-Friendly",
    capacity: 34000,
    avg_first_innings_score: 285,
    avg_second_innings_score: 252,
    chasing_success_pct: 46.6,
    pace_wicket_rate: 68.5,
    spin_wicket_rate: 31.5,
    avg_run_rate: 5.72,
    venue_balance_score: 78.5
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center space-x-3">
          <MapPin className="w-8 h-8 text-emerald-400" />
          <span>VENUE INTELLIGENCE & PITCH ANALYTICS</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Historical venue pitch profiles, first vs second innings scores, pace vs spin breakdown, and team adaptability ratings for World Cup 2027 host venues.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Venue Selector */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 lg:col-span-1">
          <h2 className="text-base font-extrabold text-white">Select Host Stadium</h2>
          <div className="space-y-2 max-h-[450px] overflow-y-auto no-scrollbar pr-1">
            {venues.map(item => (
              <button
                key={item.venue_id || item.venue_name}
                onClick={() => setSelectedVenue(item)}
                className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                  (v.venue_name === item.venue_name)
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div>
                  <div className="font-extrabold text-white">{item.venue_name}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{item.city}, {item.country}</div>
                </div>
                <span className="text-[11px] font-extrabold text-cyan-400 px-2 py-0.5 bg-slate-900 border border-slate-700 rounded-md">
                  {item.pitch_profile}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Venue Analytics Card */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 lg:col-span-2">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs text-emerald-400 font-bold block">{v.city}, {v.country}</span>
              <h2 className="text-2xl font-black text-white mt-0.5">{v.venue_name}</h2>
              <span className="text-xs text-slate-400 font-medium">Capacity: {v.capacity ? v.capacity.toLocaleString() : "34,000"} seats</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold block">PITCH PROFILE</span>
              <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold rounded-full inline-block mt-1">
                {v.pitch_profile}
              </span>
            </div>
          </div>

          {/* Innings & Scores Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Avg 1st Innings</span>
              <span className="text-2xl font-black text-white mt-1 block">{v.avg_first_innings_score}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Avg 2nd Innings</span>
              <span className="text-2xl font-black text-slate-300 mt-1 block">{v.avg_second_innings_score}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Chasing Win %</span>
              <span className="text-2xl font-black text-emerald-400 mt-1 block">{v.chasing_success_pct}%</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold block">Avg Run Rate</span>
              <span className="text-2xl font-black text-cyan-400 mt-1 block">{v.avg_run_rate} rpo</span>
            </div>
          </div>

          {/* Pace vs Spin Wicket Distribution */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-white">Pace vs Spin Wicket Distribution</span>
              <span className="text-xs font-bold text-slate-400">Venue Balance Score: {v.venue_balance_score}/100</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-teal-400">Fast Bowlers / Pace ({v.pace_wicket_rate}%)</span>
                <span className="text-cyan-400">Spin Bowlers ({v.spin_wicket_rate}%)</span>
              </div>
              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden flex">
                <div className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full" style={{ width: `${v.pace_wicket_rate}%` }}></div>
                <div className="bg-gradient-to-r from-cyan-500 to-blue-400 h-full" style={{ width: `${v.spin_wicket_rate}%` }}></div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
