import React, { useState } from 'react';
import { 
  Trophy, 
  History, 
  Calendar, 
  Compass, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Clock, 
  MapPin, 
  Flame,
  ChevronRight,
  TrendingUp,
  Layers
} from 'lucide-react';

export default function WorldCupLegacy({ onNavigate }) {
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const milestones = [
    {
      year: '1975',
      era: 'Inaugural',
      title: 'The Beginning',
      description: "First Men's Cricket World Cup in England; West Indies won the title.",
      details: "Eight teams competed in 60-over matches with traditional red balls and white clothing. Clive Lloyd's West Indies defeated Australia by 17 runs at Lord's.",
      host: 'England',
      champion: 'West Indies',
      format: '60 Overs • Red Ball',
      category: 'origins',
      badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10'
    },
    {
      year: '1983',
      era: 'Historic Upset',
      title: "India's First Triumph",
      description: "India defeated the West Indies to win its first World Cup.",
      details: "Kapil Dev's underdog Indian side defended 183 against the mighty two-time champions West Indies at Lord's, transforming cricket's popularity across South Asia.",
      host: 'England',
      champion: 'India',
      format: '60 Overs • Lord’s Final',
      category: 'classic',
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
    },
    {
      year: '1987',
      era: 'Format Shift',
      title: 'The 50-Over Era',
      description: "The tournament moved to the 50-over format, with India and Pakistan as co-hosts.",
      details: "Marked the first World Cup staged outside England. Reduced to 50 overs per side to adapt to shorter daylight hours in the subcontinent, establishing the modern ODI standard.",
      host: 'India & Pakistan',
      champion: 'Australia',
      format: '50 Overs Standardized',
      category: 'classic',
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10'
    },
    {
      year: '1992',
      era: 'Modernization',
      title: 'A New Era',
      description: "Coloured clothing, white balls, and day-night matches became notable innovations.",
      details: "Staged across Australia and New Zealand, this edition revolutionized broadcast cricket with colored kits, white cricket balls under floodlights, and Imran Khan leading Pakistan to victory.",
      host: 'Australia & New Zealand',
      champion: 'Pakistan',
      format: 'Day/Night • White Ball',
      category: 'evolution',
      badgeColor: 'border-teal-500/40 text-teal-400 bg-teal-500/10'
    },
    {
      year: '2011',
      era: 'Subcontinent Glory',
      title: 'Home Glory',
      description: "India won the World Cup on home soil.",
      details: "India became the first nation to lift the ODI World Cup on home turf, capped off by MS Dhoni's iconic winning six at the Wankhede Stadium in Mumbai.",
      host: 'India, Sri Lanka & Bangladesh',
      champion: 'India',
      format: '50 Overs • Wankhede Climax',
      category: 'modern',
      badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10'
    },
    {
      year: '2019',
      era: 'Unforgettable Drama',
      title: 'A Historic Final',
      description: "England won its first Men's ODI World Cup after a dramatic final against New Zealand.",
      details: "Tied at 241 runs after 50 overs and tied again in an electrifying Super Over at Lord's, England claimed their maiden title on boundary countback in one of cricket's greatest finals.",
      host: 'England & Wales',
      champion: 'England',
      format: 'Super Over Decider',
      category: 'modern',
      badgeColor: 'border-violet-500/40 text-violet-400 bg-violet-500/10'
    },
    {
      year: '2023',
      era: 'Dominance',
      title: "Australia's Sixth Title",
      description: "Australia defeated India in the final to win its sixth Men's ODI World Cup.",
      details: "A record-setting tournament in India witnessed Travis Head's final century seal Australia's unprecedented 6th Men's ODI World Cup trophy in front of 100,000+ fans in Ahmedabad.",
      host: 'India',
      champion: 'Australia',
      format: '10-Team Round Robin',
      category: 'modern',
      badgeColor: 'border-amber-400/50 text-amber-300 bg-amber-400/10'
    },
    {
      year: '2027',
      era: 'Next Frontier',
      title: 'The Next Chapter',
      description: "The next Men's ODI World Cup is scheduled to be hosted by South Africa, Zimbabwe, and Namibia.",
      details: "Expanding to 14 teams and returning to southern Africa for the first time since 2003. Highveld pace, spin variations, and multi-nation logistics will define the tournament our AI models analyze.",
      host: 'South Africa, Zimbabwe & Namibia',
      champion: 'To be determined (AI Contenders)',
      format: '14 Teams • African Venues',
      category: 'future',
      badgeColor: 'border-emerald-400 text-emerald-300 bg-emerald-500/20'
    }
  ];

  const filteredMilestones = activeFilter === 'all' 
    ? milestones 
    : milestones.filter(m => m.category === activeFilter);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 space-y-10 shadow-2xl backdrop-blur-md">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header & Introduction */}
      <div className="relative z-10 space-y-4 max-w-4xl">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Cricket's Ultimate Pinnacle</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          The Legacy of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-300">ODI Cricket World Cup</span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
          The ICC Men's Cricket World Cup is one of the most prestigious tournaments in international cricket. It brings together top cricketing nations to compete for the world championship in One Day International (ODI) cricket.
        </p>

        {/* Quick Facts Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <History className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Inaugural Year</div>
              <div className="text-sm font-bold text-white">1975 (England)</div>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Frequency</div>
              <div className="text-sm font-bold text-white">Every 4 Years</div>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Current Format</div>
              <div className="text-sm font-bold text-white">50 Overs (ODI)</div>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Next Host (2027)</div>
              <div className="text-sm font-bold text-emerald-400">RSA, ZIM, NAM</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Knowledge Pillars */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Card 1: When Did It Start? */}
        <div className="group bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Origin & Launch</span>
                  <h3 className="text-lg font-bold text-white">When Did It Start?</h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-300">
                June 1975
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              The first Men's Cricket World Cup was held in England in 1975. Eight teams participated, and the West Indies became the inaugural champions by defeating Australia in the final.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
            <span>Inaugural Champions:</span>
            <strong className="text-amber-400 font-semibold">West Indies (Clive Lloyd)</strong>
          </div>
        </div>

        {/* Card 2: How Often Is It Held? */}
        <div className="group bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">Cycle & Over Format</span>
                  <h3 className="text-lg font-bold text-white">How Often Is It Held?</h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-300">
                4-Year Cycle
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              The Men's ODI Cricket World Cup is generally held every four years. It is played in the 50-over ODI format today, although the first three editions featured 60 overs per innings.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
            <span>Overs Evolution:</span>
            <strong className="text-emerald-400 font-semibold">60 Overs (1975–83) → 50 Overs (1987–Present)</strong>
          </div>
        </div>

        {/* Card 3: Why Was It Introduced? */}
        <div className="group bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-teal-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider block">Historical Context</span>
                  <h3 className="text-lg font-bold text-white">Why Was It Introduced?</h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-300">
                Global Title
              </span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              The tournament was introduced to create an international championship for one-day cricket, allowing national teams to compete for a world title. The growing popularity of limited-overs cricket helped establish the World Cup as a major global sporting event.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
            <span>Primary Driver:</span>
            <strong className="text-teal-400 font-semibold">Limited-Overs Explosion & Global Crown</strong>
          </div>
        </div>

        {/* Card 4: Why Is It Important? */}
        <div className="group bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition-transform">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">Significance & Analytics</span>
                  <h3 className="text-lg font-bold text-white">Why Is It Important?</h3>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-300">
                Peak Prestige
              </span>
            </div>
            
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">World Championship:</strong> Determines the world champion in men's ODI cricket.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Global Stage:</strong> Brings together leading international cricket teams.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Historic Moments:</strong> Creates memorable performances, rivalries, and sporting drama.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong className="text-white">Data Foundation:</strong> Provides valuable historical data for analyzing teams, players, venues, and match outcomes.</span>
              </li>
            </ul>
          </div>
          <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-xs text-slate-400">
            <span>Analytics Role:</span>
            <strong className="text-cyan-400 font-semibold">Core Baseline for AI Prediction Engine</strong>
          </div>
        </div>

      </div>

      {/* World Cup Evolution Timeline */}
      <div className="relative z-10 space-y-6 pt-4 border-t border-slate-800/80">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Historical Milestones</span>
            </div>
            <h3 className="text-2xl font-black text-white">World Cup Timeline & Tournament Evolution</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              From 60-over red-ball beginnings at Lord's in 1975 to day-night innovations and the upcoming 14-team African showdown in 2027.
            </p>
          </div>

          {/* Era Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeFilter === 'all' 
                  ? 'bg-emerald-500 text-slate-950 shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Milestones
            </button>
            <button
              onClick={() => setActiveFilter('origins')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeFilter === 'origins' 
                  ? 'bg-emerald-500 text-slate-950 shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1970s Origins
            </button>
            <button
              onClick={() => setActiveFilter('classic')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeFilter === 'classic' 
                  ? 'bg-emerald-500 text-slate-950 shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1980s 50-Over
            </button>
            <button
              onClick={() => setActiveFilter('evolution')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeFilter === 'evolution' 
                  ? 'bg-emerald-500 text-slate-950 shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1990s Coloured
            </button>
            <button
              onClick={() => setActiveFilter('modern')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeFilter === 'modern' 
                  ? 'bg-emerald-500 text-slate-950 shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2010s–2020s
            </button>
            <button
              onClick={() => setActiveFilter('future')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                activeFilter === 'future' 
                  ? 'bg-emerald-500 text-slate-950 shadow' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2027 Next
            </button>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredMilestones.map((item) => {
            const isSelected = selectedMilestone?.year === item.year;
            return (
              <div
                key={item.year}
                onClick={() => setSelectedMilestone(isSelected ? null : item)}
                className={`relative group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/10 scale-[1.02]'
                    : 'bg-slate-950/70 hover:bg-slate-950 border-slate-800 hover:border-slate-700 hover:-translate-y-1'
                }`}
              >
                {/* Year Badge and Era */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-wide font-mono border ${item.badgeColor}`}>
                    {item.year}
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                    {item.era}
                  </span>
                </div>

                {/* Title & Core Description */}
                <div>
                  <h4 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                    {item.year} — {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Additional context & host badge */}
                <div className="pt-2 border-t border-slate-900/90 flex flex-col space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{item.host}</span>
                    </span>
                    <span className="font-semibold text-slate-300">
                      {item.format}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="mt-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 animate-fadeIn space-y-1">
                      <p className="leading-snug">{item.details}</p>
                      <div className="text-emerald-400 font-bold flex items-center justify-between pt-1">
                        <span>Outcome / Champion:</span>
                        <span>{item.champion}</span>
                      </div>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 font-semibold group-hover:text-emerald-400 transition-colors">
                    <span>{isSelected ? 'Click to collapse' : 'Click for tactical story'}</span>
                    <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? 'rotate-90 text-emerald-400' : ''}`} />
                  </div>
                </div>

                {/* 2027 Pulsing Accent Indicator */}
                {item.year === '2027' && (
                  <div className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Milestone Expanded Spotlight Banner */}
        {selectedMilestone && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {selectedMilestone.year}
                </span>
                <span className="text-sm font-extrabold text-white">{selectedMilestone.title}</span>
                <span className="text-xs text-slate-400">({selectedMilestone.host})</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {selectedMilestone.details}
              </p>
            </div>
            <div className="shrink-0 flex items-center space-x-2">
              <button
                onClick={() => setSelectedMilestone(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Analytics Bridge Banner: Connecting History to Predictive AI */}
      <div className="relative z-10 p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              From 1975 Heritage to 2027 Machine Learning
            </h4>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Every World Cup edition provides vital historical match data, head-to-head records, and venue conditions. Our supervised machine learning model incorporates these historical patterns to forecast 2027 match outcomes.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => {
              if (onNavigate) onNavigate('match-predictor');
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <span>Launch Match Predictor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              if (onNavigate) onNavigate('data-methodology');
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
          >
            <span>Data Methodology</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>

    </section>
  );
}
