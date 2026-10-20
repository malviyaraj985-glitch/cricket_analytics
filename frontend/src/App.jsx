import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import MatchPredictor from './pages/MatchPredictor';
import ExplainableAi from './pages/ExplainableAi';
import TeamAnalytics from './pages/TeamAnalytics';
import PlayerAnalytics from './pages/PlayerAnalytics';
import VenueIntelligence from './pages/VenueIntelligence';
import Matchups from './pages/Matchups';
import AiSimulator from './pages/AiSimulator';
import WorldCupSimulator from './pages/WorldCupSimulator';
import ModelPerformance from './pages/ModelPerformance';
import HistoricalBacktesting from './pages/HistoricalBacktesting';
import DataMethodology from './pages/DataMethodology';

import { fetchPrediction2027, fetchTeamsData, fetchDataSources } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [predictionData, setPredictionData] = useState(null);
  const [latestPrediction, setLatestPrediction] = useState(null);
  const [teamsData, setTeamsData] = useState([]);
  const [dataSources, setDataSources] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        const [pred, teams, sources] = await Promise.all([
          fetchPrediction2027(),
          fetchTeamsData(),
          fetchDataSources()
        ]);
        setPredictionData(pred);
        setTeamsData(teams);
        setDataSources(sources);
      } catch (err) {
        console.error("Failed to load platform data:", err);
      } finally {
        setDataLoading(false);
      }
    }
    loadAllData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[90rem] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {dataLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-3">
            <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-emerald-400">Initializing Cricket Decision Intelligence Platform...</p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <Home 
                predictionData={predictionData} 
                onNavigate={setActiveTab}
                dataSources={dataSources}
              />
            )}

            {activeTab === 'match-predictor' && (
              <MatchPredictor 
                onNavigate={setActiveTab} 
                latestPrediction={latestPrediction}
                onPredictionChange={setLatestPrediction}
              />
            )}

            {activeTab === 'explainable-ai' && (
              <ExplainableAi 
                latestPrediction={latestPrediction}
                onPredictionChange={setLatestPrediction}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'team-analytics' && (
              <TeamAnalytics teamsData={teamsData} />
            )}

            {activeTab === 'player-analytics' && (
              <PlayerAnalytics />
            )}

            {activeTab === 'venue-intelligence' && (
              <VenueIntelligence />
            )}

            {activeTab === 'matchups' && (
              <Matchups />
            )}

            {activeTab === 'ai-simulator' && (
              <AiSimulator />
            )}

            {activeTab === 'world-cup-simulator' && (
              <WorldCupSimulator />
            )}

            {activeTab === 'model-performance' && (
              <ModelPerformance />
            )}

            {activeTab === 'backtesting' && (
              <HistoricalBacktesting />
            )}

            {activeTab === 'data-methodology' && (
              <DataMethodology />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
