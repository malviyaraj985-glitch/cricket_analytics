import React from 'react';
import { HelpCircle, Database, Cpu, ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, BrainCircuit } from 'lucide-react';

export default function Methodology({ onNavigate }) {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-[#0c1812] to-[#09110d]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-3">
          <HelpCircle className="w-4 h-4 text-emerald-400" /> AI Methodology & Limitations
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-white">
          Can the AI Predict the Future?
        </h1>
        <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          An honest, transparent examination of the statistical data, machine learning algorithms, engineered features, model limitations, and non-deterministic factors governing the 2027 ODI World Cup prediction.
        </p>
      </div>

      {/* CORE EXPLANATION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Data Source */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="p-3 w-fit rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
            <Database className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">1. What Data Was Used?</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our machine learning model is trained on 40 years of complete ICC ODI World Cup data from <strong>1983 to 2023</strong> (11 editions, 556 matches), alongside recent 3-year international ODI statistics (2024–2026).
          </p>
          <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800/80">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tournament wins, finals, semi-finals appearances</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Knockout stage win percentage (Clutch Conversion)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Batting depth, team bowling economy, and NRR</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sub-continent & African venue performance ratings</li>
          </ul>
        </div>

        {/* Card 2: How Model Works */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <div className="p-3 w-fit rounded-2xl bg-teal-500/10 border border-teal-500/30">
            <Cpu className="w-6 h-6 text-teal-400" />
          </div>
          <h2 className="text-xl font-bold font-display text-white">2. How the AI Model Works</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            We evaluate multiple algorithms (Random Forest, Gradient Boosting, Extra Trees, and Logistic Regression) using K-Fold cross-validation. The highest-performing model is fitted on 10 normalized features and yields a Softmax probability distribution for 2027.
          </p>
          <ul className="text-xs text-slate-400 space-y-2 pt-2 border-t border-slate-800/80">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> 10-Feature Vector Standardization (StandardScaler)</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> 5-Fold Stratified Cross-Validation</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Softmax Temperature Scaling for Probability Distribution</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-400" /> Explainable Feature Importance Calculation</li>
          </ul>
        </div>

      </div>

      {/* HOST ADVANTAGE & FEATURE INFLUENCE */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-amber-400" /> Key Features Influencing the 2027 Prediction
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="font-bold text-amber-400 font-display text-sm">Knockout Stage Clutch Rate</div>
            <p className="text-slate-400 leading-relaxed">
              Teams with a historical track record of winning semi-finals and finals (e.g. Australia 75%) receive strong model weight.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="font-bold text-emerald-400 font-display text-sm">African Host Venue Factor</div>
            <p className="text-slate-400 leading-relaxed">
              The 2027 World Cup will be hosted in <strong>South Africa, Zimbabwe, and Namibia</strong>. Host condition adaptability is explicitly factored into the feature vector.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="font-bold text-teal-400 font-display text-sm">Recent 3-Year ODI Form</div>
            <p className="text-slate-400 leading-relaxed">
              Teams maintaining win rates over 65% in recent bilateral series and ICC tournaments (2024-2026) are heavily weighted.
            </p>
          </div>

        </div>
      </div>

      {/* MODEL LIMITATIONS & DISCLAIMER */}
      <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-500/40 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display text-white">Model Limitations & Why Predictions Evolve</h2>
            <p className="text-xs text-amber-300/80">Understanding non-deterministic factors in sports analytics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <strong className="text-amber-400 block mb-1">1. Player Injuries & Squad Availability</strong>
            Key player availability, sudden injuries to star bowlers/batters, or squad transitions right before the 2027 tournament cannot be fully anticipated years in advance.
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <strong className="text-amber-400 block mb-1">2. Match Day Conditions & Toss Factor</strong>
            Overcast weather, dew effect, pitch behavior in Johannesburg/Durban, or crucial toss decisions in knockout matches introduce high single-game variance.
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <strong className="text-amber-400 block mb-1">3. Dynamic Recent Form Updates</strong>
            As teams play bilateral series and the 2025 Champions Trophy, recent win rates will fluctuate, changing the AI model's probability inputs.
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <strong className="text-amber-400 block mb-1">4. Statistical Probability vs Outcome</strong>
            A 31.3% probability means Australia has the highest statistical chance, but it also means there is a ~68.7% probability that another team will win!
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onNavigate('prediction')}
            className="px-6 py-3 rounded-2xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-all flex items-center space-x-2"
          >
            <span>View Live 2027 Winner Predictions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
