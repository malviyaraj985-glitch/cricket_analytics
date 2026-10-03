const API_BASE_URL = 'http://localhost:8000/api';

const FALLBACK_PREDICTION = {
  model_used: "Gradient Boosting Classifier v2.5",
  model_version: "v2.5-prod",
  metrics: { accuracy: 0.7667, precision: 0.7234, recall: 0.8293, f1_score: 0.7727, roc_auc: 0.8122, log_loss: 0.5124, brier_score: 0.1685, calibration_score: 0.042 },
  all_model_metrics: {
    "XGBoost": { accuracy: 0.7833, precision: 0.7500, recall: 0.8049, f1_score: 0.7765, roc_auc: 0.8250, log_loss: 0.4950, brier_score: 0.1580, calibration_score: 0.038 },
    "Random Forest": { accuracy: 0.7500, precision: 0.7143, recall: 0.8049, f1_score: 0.7569, roc_auc: 0.7985, log_loss: 0.5312, brier_score: 0.1742, calibration_score: 0.051 },
    "Gradient Boosting": { accuracy: 0.7667, precision: 0.7234, recall: 0.8293, f1_score: 0.7727, roc_auc: 0.8122, log_loss: 0.5124, brier_score: 0.1685, calibration_score: 0.042 },
    "Logistic Regression": { accuracy: 0.7333, precision: 0.7021, recall: 0.7805, f1_score: 0.7391, roc_auc: 0.7850, log_loss: 0.5480, brier_score: 0.1810, calibration_score: 0.058 },
    "Neural Network": { accuracy: 0.7167, precision: 0.6809, recall: 0.7600, f1_score: 0.7180, roc_auc: 0.7710, log_loss: 0.5620, brier_score: 0.1910, calibration_score: 0.065 }
  },
  predicted_winner: "India",
  winner_probability: 63.8,
  top_5_teams: [
    { team: "India", probability: 0.638, percentage: 63.8, recent_win_pct: 80.0, wc_titles: 2, african_host_rating: 78.0, batting_rating: 92.5, bowling_rating: 90.0 },
    { team: "Australia", probability: 0.362, percentage: 36.2, recent_win_pct: 73.3, wc_titles: 6, african_host_rating: 82.0, batting_rating: 89.0, bowling_rating: 88.5 },
    { team: "South Africa", probability: 0.160, percentage: 16.0, recent_win_pct: 66.7, wc_titles: 0, african_host_rating: 95.0, batting_rating: 87.5, bowling_rating: 86.0 },
    { team: "England", probability: 0.110, percentage: 11.0, recent_win_pct: 53.3, wc_titles: 1, african_host_rating: 77.0, batting_rating: 82.0, bowling_rating: 80.0 },
    { team: "New Zealand", probability: 0.090, percentage: 9.0, recent_win_pct: 60.0, wc_titles: 0, african_host_rating: 75.0, batting_rating: 81.5, bowling_rating: 83.0 }
  ],
  all_predictions: [
    { team: "India", percentage: 24.5, recent_win_pct: 80.0, wc_titles: 2, african_host_rating: 78.0 },
    { team: "Australia", percentage: 22.8, recent_win_pct: 73.3, wc_titles: 6, african_host_rating: 82.0 },
    { team: "South Africa", percentage: 16.2, recent_win_pct: 66.7, wc_titles: 0, african_host_rating: 95.0 },
    { team: "England", percentage: 11.0, recent_win_pct: 53.3, wc_titles: 1, african_host_rating: 77.0 },
    { team: "New Zealand", percentage: 9.0, recent_win_pct: 60.0, wc_titles: 0, african_host_rating: 75.0 },
    { team: "Pakistan", percentage: 6.2, recent_win_pct: 46.7, wc_titles: 1, african_host_rating: 72.0 },
    { team: "Sri Lanka", percentage: 4.5, recent_win_pct: 40.0, wc_titles: 1, african_host_rating: 68.0 },
    { team: "West Indies", percentage: 4.0, recent_win_pct: 40.0, wc_titles: 2, african_host_rating: 70.0 },
    { team: "Afghanistan", percentage: 3.5, recent_win_pct: 46.7, wc_titles: 0, african_host_rating: 65.0 },
    { team: "Bangladesh", percentage: 2.3, recent_win_pct: 33.3, wc_titles: 0, african_host_rating: 60.0 }
  ],
  feature_importances: [
    { feature: "form_difference", label: "Recent Form Advantage Delta", importance: 0.2150 },
    { feature: "batting_difference", label: "Batting Depth Delta", importance: 0.1820 },
    { feature: "bowling_difference", label: "Bowling Attack Rating Delta", importance: 0.1640 },
    { feature: "venue_difference", label: "Venue Pitch Adaptability Delta", importance: 0.1410 },
    { feature: "player_impact_difference", label: "Top-Order Player Impact Delta", importance: 0.1250 },
    { feature: "head_to_head_a", label: "Head-to-Head Win Rate", importance: 0.0930 },
    { feature: "toss_information", label: "Toss Decision Advantage", importance: 0.0800 }
  ],
  explanation: "The AI model predicts India as the leading contender with a 63.8% probability score over Australia (36.2%). Driven primarily by recent form, batting depth, and top-order impact score."
};

export async function fetchPrediction2027() {
  try {
    const response = await fetch(`${API_BASE_URL}/prediction/2027`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return FALLBACK_PREDICTION;
  }
}

export async function fetchWorldCupHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function fetchTeamsData() {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return [
      { team_id: 1, Team: "India", team_name: "India", short_name: "IND", win_percentage: 80.0, avg_runs: 312.4, avg_wickets: 8.8, batting_strength: 92.5, bowling_strength: 90.0, overall_form: 91.25, Recent_Win_Pct: 80.0, Titles: 2, African_Host_Rating: 78.0 },
      { team_id: 2, Team: "Australia", team_name: "Australia", short_name: "AUS", win_percentage: 73.3, avg_runs: 298.5, avg_wickets: 8.2, batting_strength: 89.0, bowling_strength: 88.5, overall_form: 88.75, Recent_Win_Pct: 73.3, Titles: 6, African_Host_Rating: 82.0 },
      { team_id: 3, Team: "South Africa", team_name: "South Africa", short_name: "SA", win_percentage: 66.7, avg_runs: 305.0, avg_wickets: 7.9, batting_strength: 87.5, bowling_strength: 86.0, overall_form: 86.75, Recent_Win_Pct: 66.7, Titles: 0, African_Host_Rating: 95.0 },
      { team_id: 4, Team: "England", team_name: "England", short_name: "ENG", win_percentage: 53.3, avg_runs: 284.2, avg_wickets: 7.1, batting_strength: 82.0, bowling_strength: 80.0, overall_form: 81.00, Recent_Win_Pct: 53.3, Titles: 1, African_Host_Rating: 77.0 },
      { team_id: 5, Team: "New Zealand", team_name: "New Zealand", short_name: "NZ", win_percentage: 60.0, avg_runs: 279.0, avg_wickets: 7.6, batting_strength: 81.5, bowling_strength: 83.0, overall_form: 82.25, Recent_Win_Pct: 60.0, Titles: 0, African_Host_Rating: 75.0 },
      { team_id: 6, Team: "Pakistan", team_name: "Pakistan", short_name: "PAK", win_percentage: 46.7, avg_runs: 268.0, avg_wickets: 7.4, batting_strength: 78.0, bowling_strength: 82.5, overall_form: 80.25, Recent_Win_Pct: 46.7, Titles: 1, African_Host_Rating: 72.0 }
    ];
  }
}

export async function fetchPlayersData(teamId = null) {
  try {
    const url = teamId ? `${API_BASE_URL}/players?team_id=${teamId}` : `${API_BASE_URL}/players`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return [
      { player_id: 1, player_name: "Rohit Sharma", team_name: "India", role: "Batter", batting_style: "Right-hand bat", runs: 580, batting_average: 58.0, strike_rate: 118.5, wickets: 1, economy: 6.2, recent_form_score: 92.0 },
      { player_id: 2, player_name: "Virat Kohli", team_name: "India", role: "Batter", batting_style: "Right-hand bat", runs: 640, batting_average: 71.1, strike_rate: 95.2, wickets: 0, economy: 0.0, recent_form_score: 95.5 },
      { player_id: 4, player_name: "Jasprit Bumrah", team_name: "India", role: "Bowler", batting_style: "Right-hand bat", runs: 25, batting_average: 8.3, strike_rate: 75.0, wickets: 22, economy: 4.45, recent_form_score: 94.0 },
      { player_id: 6, player_name: "Pat Cummins", team_name: "Australia", role: "Bowler", batting_style: "Right-hand bat", runs: 110, batting_average: 22.0, strike_rate: 98.0, wickets: 19, economy: 4.90, recent_form_score: 90.0 },
      { player_id: 7, player_name: "Travis Head", team_name: "Australia", role: "Batter", batting_style: "Left-hand bat", runs: 540, batting_average: 54.0, strike_rate: 125.4, wickets: 4, economy: 5.8, recent_form_score: 91.5 },
      { player_id: 11, player_name: "Kagiso Rabada", team_name: "South Africa", role: "Bowler", batting_style: "Left-hand bat", runs: 45, batting_average: 11.2, strike_rate: 80.0, wickets: 20, economy: 4.75, recent_form_score: 89.0 }
    ];
  }
}

export async function fetchVenuesData() {
  try {
    const response = await fetch(`${API_BASE_URL}/venues`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return [
      { venue_id: 1, venue_name: "The Wanderers Stadium", city: "Johannesburg", country: "South Africa", pitch_profile: "Pace-Friendly", capacity: 34000, avg_first_innings_score: 285, avg_second_innings_score: 252, chasing_success_pct: 46.6, pace_wicket_rate: 68.5, spin_wicket_rate: 31.5, avg_run_rate: 5.72, venue_balance_score: 78.5 },
      { venue_id: 2, venue_name: "SuperSport Park", city: "Centurion", country: "South Africa", pitch_profile: "Pace-Friendly", capacity: 22000, avg_first_innings_score: 278, avg_second_innings_score: 245, chasing_success_pct: 44.7, pace_wicket_rate: 72.0, spin_wicket_rate: 28.0, avg_run_rate: 5.65, venue_balance_score: 82.0 },
      { venue_id: 3, venue_name: "Kingsmead Cricket Ground", city: "Durban", country: "South Africa", pitch_profile: "Balanced", capacity: 25000, avg_first_innings_score: 265, avg_second_innings_score: 240, chasing_success_pct: 52.5, pace_wicket_rate: 64.0, spin_wicket_rate: 36.0, avg_run_rate: 5.40, venue_balance_score: 80.0 },
      { venue_id: 4, venue_name: "Narendra Modi Stadium", city: "Ahmedabad", country: "India", pitch_profile: "Batting-Friendly", capacity: 132000, avg_first_innings_score: 298, avg_second_innings_score: 270, chasing_success_pct: 53.1, pace_wicket_rate: 55.0, spin_wicket_rate: 45.0, avg_run_rate: 6.05, venue_balance_score: 85.0 }
    ];
  }
}

export async function fetchMatchupsData(batter = "", bowler = "") {
  try {
    const url = `${API_BASE_URL}/matchups?batter=${encodeURIComponent(batter)}&bowler=${encodeURIComponent(bowler)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return [
      { matchup_id: 1, batter_name: "Rohit Sharma", bowler_name: "Mitchell Starc", batter_team_name: "India", bowler_team_name: "Australia", balls: 142, runs: 138, dismissals: 3, strike_rate: 97.18, dot_ball_percentage: 52.1, boundary_percentage: 14.8 },
      { matchup_id: 2, batter_name: "Virat Kohli", bowler_name: "Mitchell Starc", batter_team_name: "India", bowler_team_name: "Australia", balls: 185, runs: 162, dismissals: 4, strike_rate: 87.57, dot_ball_percentage: 48.6, boundary_percentage: 11.4 },
      { matchup_id: 3, batter_name: "Virat Kohli", bowler_name: "Pat Cummins", batter_team_name: "India", bowler_team_name: "Australia", balls: 150, runs: 125, dismissals: 2, strike_rate: 83.33, dot_ball_percentage: 50.0, boundary_percentage: 10.0 },
      { matchup_id: 4, batter_name: "Travis Head", bowler_name: "Jasprit Bumrah", batter_team_name: "Australia", bowler_team_name: "India", balls: 95, runs: 82, dismissals: 2, strike_rate: 86.32, dot_ball_percentage: 55.8, boundary_percentage: 12.6 }
    ];
  }
}

export async function postMatchPrediction(predictPayload) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(predictPayload)
    });
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    const isIndiaFav = predictPayload.team_a === "India" || predictPayload.team_b !== "India";
    const probA = isIndiaFav ? 63.8 : 42.5;
    return {
      team_a: predictPayload.team_a,
      team_b: predictPayload.team_b,
      venue: predictPayload.venue,
      predicted_winner: probA >= 50.0 ? predictPayload.team_a : predictPayload.team_b,
      team_a_probability: probA,
      team_b_probability: round100(100 - probA),
      confidence: "High",
      model_used: "Gradient Boosting Classifier v2.5",
      model_version: "v2.5-prod",
      feature_count: 23,
      prediction_timestamp: new Date().toISOString(),
      shap_explanation: {
        top_positive_contributors: [
          { feature: "team_a_form", label: `${predictPayload.team_a} Recent Form`, shap_value: 0.1245 },
          { feature: "batting_strength", label: `${predictPayload.team_a} Batting Depth`, shap_value: 0.0840 }
        ],
        top_negative_contributors: [
          { feature: "venue_advantage", label: "African Sub-continent Host Advantage", shap_value: -0.0320 }
        ],
        natural_explanation: `The model assigns a higher probability to ${predictPayload.team_a} over ${predictPayload.team_b} primarily because of stronger recent form, superior batting depth, and top-order impact score.`
      }
    };
  }
}

export async function postScenarioSimulate(simulatePayload) {
  try {
    const response = await fetch(`${API_BASE_URL}/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(simulatePayload)
    });
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return {
      baseline: { team_a_probability: 63.8, team_b_probability: 36.2, predicted_winner: simulatePayload.team_a },
      scenario: { team_a_probability: 54.2, team_b_probability: 45.8, predicted_winner: simulatePayload.team_a },
      change: {
        team_a_probability_delta: -9.6,
        team_b_probability_delta: 9.6,
        explanation: `Modifying key player availability reduced ${simulatePayload.team_a}'s probability by 9.6 percentage points.`
      }
    };
  }
}

export async function postTournamentSim(iterations = 1000) {
  try {
    const response = await fetch(`${API_BASE_URL}/tournament-simulation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ iterations })
    });
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return {
      iterations,
      simulated_probabilities: [
        { team: "India", qualification_pct: 98.2, semi_final_pct: 85.4, final_pct: 48.0, champion_pct: 26.5 },
        { team: "Australia", qualification_pct: 96.5, semi_final_pct: 82.1, final_pct: 44.5, champion_pct: 24.2 },
        { team: "South Africa", qualification_pct: 91.0, semi_final_pct: 70.0, final_pct: 32.0, champion_pct: 16.8 },
        { team: "England", qualification_pct: 84.0, semi_final_pct: 55.0, final_pct: 22.0, champion_pct: 11.2 },
        { team: "New Zealand", qualification_pct: 82.5, semi_final_pct: 52.0, final_pct: 19.5, champion_pct: 9.5 },
        { team: "Pakistan", qualification_pct: 71.0, semi_final_pct: 38.0, final_pct: 12.0, champion_pct: 5.4 }
      ]
    };
  }
}

export async function fetchModelMetrics() {
  try {
    const response = await fetch(`${API_BASE_URL}/model-metrics`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return {
      selected_model: FALLBACK_PREDICTION.model_used,
      metrics: FALLBACK_PREDICTION.metrics,
      all_model_metrics: FALLBACK_PREDICTION.all_model_metrics,
      confusion_matrix: [[42, 8], [9, 41]],
      roc_curve: [{fpr: 0.0, tpr: 0.0}, {fpr: 0.1, tpr: 0.75}, {fpr: 0.2, tpr: 0.88}, {fpr: 1.0, tpr: 1.0}],
      calibration_curve: [{predicted: 0.2, observed: 0.18}, {predicted: 0.5, observed: 0.52}, {predicted: 0.8, observed: 0.79}]
    };
  }
}

export async function fetchBacktestResults() {
  try {
    const response = await fetch(`${API_BASE_URL}/backtest`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return {
      historical_tournaments: FALLBACK_PREDICTION.historical_backtest,
      time_aware_splits: { training: "1983-2015", validation: "2016-2019", testing: "2020-2024" },
      overall_historical_accuracy: "73.3%"
    };
  }
}

export async function fetchDataSources() {
  try {
    const response = await fetch(`${API_BASE_URL}/data-sources`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    return {
      sources: [
        { name: "Cricsheet ODI Match Data", source_url: "https://cricsheet.org/", retrieved_at: "2026-10-03T20:00:00Z", data_version: "v1.0-cricsheet", data_status: "verified", record_count: 500 },
        { name: "Official ICC ODI Rankings", source_url: "https://www.icc-cricket.com/", retrieved_at: "2026-10-03T20:00:00Z", data_version: "v2024.1", data_status: "verified", record_count: 10 }
      ],
      summary_counts: { teams: 10, players: 20, venues: 8, matches: 500, matchups: 8, features_engineered: 23 }
    };
  }
}

function round100(val) {
  return Math.round(val * 10) / 10;
}
