import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import History from './pages/History';
import RajVsAi from './pages/RajVsAi';
import TeamAnalytics from './pages/TeamAnalytics';
import AiAnalysis from './pages/AiAnalysis';
import Prediction2027 from './pages/Prediction2027';
import DataSources from './pages/DataSources';
import CricketSplashScreen from './components/CricketSplashScreen';
import { fetchPrediction2027, fetchWorldCupHistory, fetchTeamsData } from './services/api';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [predictionData, setPredictionData] = useState(null);
  const [historyData, setHistoryData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    async function loadAllData() {
      try {
        const [pred, hist, teams] = await Promise.all([
          fetchPrediction2027(),
          fetchWorldCupHistory(),
          fetchTeamsData()
        ]);
        setPredictionData(pred);
        setHistoryData(hist);
        setTeamsData(teams);
      } catch (err) {
        console.error("Failed to load analytics data:", err);
      } finally {
        setDataLoading(false);
      }
    }
    loadAllData();
  }, []);

  // Guarantee that ONLY the solid black splash screen is rendered during loading phase
  if (showSplash) {
    return <CricketSplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {dataLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
            <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-xs font-semibold text-emerald-400">Loading Cricket Analytics Data...</p>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <Home 
                predictionData={predictionData} 
                historyData={historyData} 
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'history' && (
              <History historyData={historyData} />
            )}

            {activeTab === 'rajvsai' && (
              <RajVsAi 
                predictionData={predictionData} 
                historyData={historyData} 
              />
            )}

            {activeTab === 'teams' && (
              <TeamAnalytics teamsData={teamsData} />
            )}

            {activeTab === 'aianalysis' && (
              <AiAnalysis predictionData={predictionData} />
            )}

            {activeTab === 'prediction2027' && (
              <Prediction2027 predictionData={predictionData} />
            )}

            {activeTab === 'datasources' && (
              <DataSources />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
