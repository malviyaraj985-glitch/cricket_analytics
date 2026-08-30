import React, { useState } from 'react';
import { History as HistoryIcon, Trophy, MapPin, Search, X } from 'lucide-react';

export default function History({ historyData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState(null);

  const filtered = historyData.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      item.year.toString().includes(q) ||
      item.winner.toLowerCase().includes(q) ||
      item.runner_up.toLowerCase().includes(q) ||
      item.host.toLowerCase().includes(q)
    );
  });

  const selectedItem = historyData.find(i => i.year === selectedYear);

  return (
    <div className="space-y-6 pb-8">
      
      {/* Banner */}
      <div className="simple-card space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <HistoryIcon className="w-5 h-5 text-emerald-400" /> ODI World Cup History (1983 – 2027)
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Historical winners, hosts, and match statistics across all 12 World Cup editions.
            </p>
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search year, team, host..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="simple-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Host Country</th>
                <th className="py-3 px-4">Actual Winner</th>
                <th className="py-3 px-4">Runner-Up</th>
                <th className="py-3 px-4">Matches</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filtered.map(item => (
                <tr 
                  key={item.year}
                  onClick={() => setSelectedYear(item.year)}
                  className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-emerald-400 font-mono">{item.year}</td>
                  <td className="py-3 px-4 text-slate-300">{item.host}</td>
                  <td className="py-3 px-4 font-bold text-amber-400">{item.winner}</td>
                  <td className="py-3 px-4 text-slate-300">{item.runner_up}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{item.matches_played}</td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-xs text-emerald-400 hover:underline font-semibold">Inspect</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspection Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="simple-card max-w-lg w-full bg-slate-900 border-slate-700 space-y-4 relative">
            <button
              onClick={() => setSelectedYear(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> {selectedItem.year} ODI World Cup
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Actual Winner:</span>
                <strong className="text-amber-400 text-sm">{selectedItem.winner}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Runner-Up:</span>
                <strong className="text-slate-200 text-sm">{selectedItem.runner_up}</strong>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1 text-xs">
              <div><span className="text-slate-400">Host:</span> <strong className="text-white">{selectedItem.host}</strong></div>
              <div><span className="text-slate-400">Scoreline:</span> <strong className="text-emerald-400">{selectedItem.final_score}</strong></div>
              <div><span className="text-slate-400">Top Scorer:</span> <strong className="text-white">{selectedItem.top_scorer}</strong></div>
              <div><span className="text-slate-400">Top Wicket Taker:</span> <strong className="text-white">{selectedItem.top_wicket_taker}</strong></div>
            </div>

            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
              <span className="font-semibold text-slate-400 block mb-1">Tournament Summary:</span>
              {selectedItem.summary}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
