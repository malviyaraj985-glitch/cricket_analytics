import React from 'react';
import { BarChart3, PieChart, ScatterChart, TrendingUp, Award, Layers } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Scatter, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Visualizations({ predictionData, teamsData, historyData }) {
  
  // 1. World Cup Titles Bar Chart
  const titlesData = {
    labels: teamsData.filter(t => t.Titles > 0).map(t => t.Team),
    datasets: [
      {
        label: 'World Cup Titles Won (1983-2023)',
        data: teamsData.filter(t => t.Titles > 0).map(t => t.Titles),
        backgroundColor: [
          '#f59e0b', // Australia (Gold)
          '#10b981', // India (Emerald)
          '#06b6d4', // West Indies (Cyan)
          '#6366f1', // England (Indigo)
          '#ec4899', // Pakistan (Pink)
          '#8b5cf6'  // Sri Lanka (Purple)
        ],
        borderRadius: 8
      }
    ]
  };

  const titlesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} World Cup Title(s)`
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { weight: 'bold' } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8', stepSize: 1 } }
    }
  };

  // 2. Win Percentage Comparison Chart
  const winPctData = {
    labels: teamsData.map(t => t.Team),
    datasets: [
      {
        label: 'World Cup Win %',
        data: teamsData.map(t => t.Win_Percentage),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: '#10b981',
        borderWidth: 2,
        borderRadius: 6
      },
      {
        label: 'Recent 3-Yr Win %',
        data: teamsData.map(t => t.Recent_Win_Pct),
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderColor: '#f59e0b',
        borderWidth: 2,
        borderRadius: 6
      }
    ]
  };

  const winPctOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#cbd5e1', font: { size: 12, weight: 'bold' } } }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { size: 11 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } }
    }
  };

  // 3. Batting vs Bowling Scatter Plot
  const scatterDatasets = teamsData.map((t, idx) => {
    const colors = ['#f59e0b', '#10b981', '#14b8a6', '#0284c7', '#ec4899', '#8b5cf6', '#eab308', '#f97316', '#a855f7', '#64748b'];
    return {
      label: t.Team,
      data: [{ x: t.Batting_Rating, y: t.Bowling_Rating }],
      backgroundColor: colors[idx % colors.length],
      pointRadius: 9,
      pointHoverRadius: 12
    };
  });

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#cbd5e1', font: { size: 11 } } },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: Batting ${ctx.raw.x} / Bowling ${ctx.raw.y}`
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Batting Rating', color: '#10b981', font: { weight: 'bold' } },
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8' }
      },
      y: {
        title: { display: true, text: 'Bowling Rating', color: '#f59e0b', font: { weight: 'bold' } },
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  // 4. 2027 Winner Probability Doughnut Chart
  const predictions = predictionData?.all_predictions || [];
  const doughnutData = {
    labels: predictions.map(p => p.team),
    datasets: [
      {
        data: predictions.map(p => p.percentage),
        backgroundColor: [
          '#f59e0b', '#10b981', '#6366f1', '#14b8a6', '#8b5cf6',
          '#ec4899', '#0284c7', '#eab308', '#a855f7', '#64748b'
        ],
        borderWidth: 2,
        borderColor: '#090d0b'
      }
    ]
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: { color: '#cbd5e1', font: { size: 12, weight: 'bold' } }
      }
    }
  };

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-[#0c1611] to-[#0a140f]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30 mb-3">
          <BarChart3 className="w-4 h-4 text-emerald-400" /> Interactive Cricket Analytics
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
          Data Visualizations & Trend Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl">
          Visual exploration of World Cup titles, historical vs recent win percentages, batting vs bowling strength matrix, and AI 2027 prediction probability distribution.
        </p>
      </div>

      {/* CHART ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Titles Bar Chart */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> World Cup Titles by Team (1983-2023)
          </h2>
          <div className="h-[300px] w-full relative">
            <Bar data={titlesData} options={titlesOptions} />
          </div>
        </div>

        {/* 2027 Probability Doughnut Chart */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-400" /> 2027 Winner Probability Distribution
          </h2>
          <div className="h-[300px] w-full relative">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>

      </div>

      {/* CHART ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Win Percentage Comparison */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-400" /> Historical WC Win % vs Recent Form (3-Yr)
          </h2>
          <div className="h-[320px] w-full relative">
            <Bar data={winPctData} options={winPctOptions} />
          </div>
        </div>

        {/* Scatter Matrix */}
        <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
          <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <ScatterChart className="w-5 h-5 text-cyan-400" /> Batting vs Bowling Strength Matrix
          </h2>
          <div className="h-[320px] w-full relative">
            <Scatter data={{ datasets: scatterDatasets }} options={scatterOptions} />
          </div>
        </div>

      </div>

    </div>
  );
}
