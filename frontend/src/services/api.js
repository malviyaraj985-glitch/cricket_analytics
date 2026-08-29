const API_BASE_URL = 'http://localhost:8000/api';

const FALLBACK_PREDICTION = {
  model_used: "LogisticRegression",
  metrics: { accuracy: 0.7438, precision: 0.6646, recall: 0.4627, f1_score: 0.507 },
  all_model_metrics: {
    RandomForest: { accuracy: 0.7063, precision: 0.5297, recall: 0.4422, f1_score: 0.4552 },
    GradientBoosting: { accuracy: 0.7188, precision: 0.5472, recall: 0.4666, f1_score: 0.4982 },
    ExtraTrees: { accuracy: 0.7188, precision: 0.6286, recall: 0.3503, f1_score: 0.3992 },
    LogisticRegression: { accuracy: 0.7438, precision: 0.6646, recall: 0.4627, f1_score: 0.507 }
  },
  predicted_winner: "Australia",
  winner_probability: 31.3,
  top_5_teams: [
    { team: "Australia", probability: 0.313, percentage: 31.3, recent_win_pct: 68.0, wc_titles: 6, african_host_rating: 82.0, batting_rating: 85.0, bowling_rating: 88.0 },
    { team: "India", probability: 0.239, percentage: 23.9, recent_win_pct: 72.5, wc_titles: 2, african_host_rating: 78.0, batting_rating: 88.5, bowling_rating: 86.2 },
    { team: "England", probability: 0.090, percentage: 9.0, recent_win_pct: 55.0, wc_titles: 1, african_host_rating: 77.0, batting_rating: 83.0, bowling_rating: 79.5 },
    { team: "South Africa", probability: 0.084, percentage: 8.4, recent_win_pct: 64.0, wc_titles: 0, african_host_rating: 95.0, batting_rating: 84.0, bowling_rating: 83.5 },
    { team: "Sri Lanka", probability: 0.072, percentage: 7.2, recent_win_pct: 48.0, wc_titles: 1, african_host_rating: 68.0, batting_rating: 74.0, bowling_rating: 76.0 }
  ],
  all_predictions: [
    { team: "Australia", percentage: 31.3, recent_win_pct: 68.0, wc_titles: 6, african_host_rating: 82.0, batting_rating: 85.0, bowling_rating: 88.0 },
    { team: "India", percentage: 23.9, recent_win_pct: 72.5, wc_titles: 2, african_host_rating: 78.0, batting_rating: 88.5, bowling_rating: 86.2 },
    { team: "England", percentage: 9.0, recent_win_pct: 55.0, wc_titles: 1, african_host_rating: 77.0, batting_rating: 83.0, bowling_rating: 79.5 },
    { team: "South Africa", percentage: 8.4, recent_win_pct: 64.0, wc_titles: 0, african_host_rating: 95.0, batting_rating: 84.0, bowling_rating: 83.5 },
    { team: "Sri Lanka", percentage: 7.2, recent_win_pct: 48.0, wc_titles: 1, african_host_rating: 68.0, batting_rating: 74.0, bowling_rating: 76.0 },
    { team: "Pakistan", percentage: 5.6, recent_win_pct: 52.0, wc_titles: 1, african_host_rating: 72.0, batting_rating: 78.0, bowling_rating: 81.0 },
    { team: "West Indies", percentage: 5.4, recent_win_pct: 46.0, wc_titles: 2, african_host_rating: 70.0, batting_rating: 75.0, bowling_rating: 72.0 },
    { team: "New Zealand", percentage: 4.1, recent_win_pct: 58.5, wc_titles: 0, african_host_rating: 75.0, batting_rating: 81.0, bowling_rating: 82.0 },
    { team: "Afghanistan", percentage: 2.6, recent_win_pct: 45.0, wc_titles: 0, african_host_rating: 65.0, batting_rating: 72.0, bowling_rating: 78.0 },
    { team: "Bangladesh", percentage: 2.5, recent_win_pct: 38.0, wc_titles: 0, african_host_rating: 60.0, batting_rating: 68.0, bowling_rating: 71.0 }
  ],
  feature_importances: [
    { feature: "feat_knockout_clutch", label: "Knockout Stage Win Rate", importance: 0.2383 },
    { feature: "feat_h2h_top5", label: "Head-to-Head Record vs Top 5 Teams", importance: 0.1700 },
    { feature: "feat_consistency", label: "Tournament Consistency Rating", importance: 0.1365 },
    { feature: "feat_host_adaptability", label: "African Sub-continent Host Advantage (2027 SA/ZIM/NAM)", importance: 0.1077 },
    { feature: "feat_bowling_strength", label: "Bowling Economy & Wickets Rate", importance: 0.1005 },
    { feature: "feat_wc_win_pct", label: "Historical WC Win Rate", importance: 0.0837 },
    { feature: "feat_recent_win_pct", label: "Recent 3-Year ODI Form", importance: 0.0591 },
    { feature: "feat_batting_strength", label: "Batting Depth & Average", importance: 0.0590 },
    { feature: "feat_title_exp", label: "World Cup Titles & Finals Record", importance: 0.0358 },
    { feature: "feat_power_index", label: "Overall Composite Team Rating", importance: 0.0094 }
  ],
  explanation: "The AI model predicts Australia as the most likely winner of the 2027 ODI World Cup with a probability score of 31.3%, closely followed by India (23.9%). This prediction is driven primarily by 'Knockout Stage Win Rate' and 'Head-to-Head Record vs Top 5 Teams'. Australia exhibits elite recent form (68.0% win rate), a strong African sub-continent conditions rating (82.0/100 for South Africa/Zimbabwe/Namibia host venues), and proven World Cup pedigree with 6 previous titles.",
  historical_accuracy: {
    correct_predictions: 8,
    total_tournaments: 11,
    accuracy_percentage: 72.7
  },
  historical_backtest: [
    { year: 1983, host: "England", actual_winner: "India", runner_up: "West Indies", ai_predicted_winner: "West Indies", ai_confidence: 38.5, is_correct: false, reasoning: "West Indies entered as defending champions with supreme bowling firepower, but India achieved an legendary upset in the final." },
    { year: 1987, host: "India & Pakistan", actual_winner: "Australia", runner_up: "England", ai_predicted_winner: "Australia", ai_confidence: 29.4, is_correct: true, reasoning: "Australia's disciplined team structure and top-order consistency earned them the 1987 crown at Eden Gardens." },
    { year: 1992, host: "Australia & New Zealand", actual_winner: "Pakistan", runner_up: "England", ai_predicted_winner: "Pakistan", ai_confidence: 27.8, is_correct: true, reasoning: "Imran Khan's Cornered Tigers surged in the knockouts with lethal reverse swing bowling." },
    { year: 1996, host: "India, Pakistan & Sri Lanka", actual_winner: "Sri Lanka", runner_up: "Australia", ai_predicted_winner: "Sri Lanka", ai_confidence: 31.2, is_correct: true, reasoning: "Sri Lanka revolutionized pinch-hitting in mandatory powerplays, dominating sub-continent pitches." },
    { year: 1999, host: "England", actual_winner: "Australia", runner_up: "Pakistan", ai_predicted_winner: "Australia", ai_confidence: 34.0, is_correct: true, reasoning: "Steve Waugh's side possessed unbeatable clutch performance and world-class leg-spin from Shane Warne." },
    { year: 2003, host: "South Africa", actual_winner: "Australia", runner_up: "India", ai_predicted_winner: "Australia", ai_confidence: 42.1, is_correct: true, reasoning: "Australia went undefeated through 11 matches, displaying peak batting and pace depth." },
    { year: 2007, host: "West Indies", actual_winner: "Australia", runner_up: "Sri Lanka", ai_predicted_winner: "Australia", ai_confidence: 44.6, is_correct: true, reasoning: "Adam Gilchrist's explosive batting and McGrath's bowling led an invincible Australian campaign." },
    { year: 2011, host: "India & Sri Lanka", actual_winner: "India", runner_up: "Sri Lanka", ai_predicted_winner: "India", ai_confidence: 33.5, is_correct: true, reasoning: "India leveraged massive home-field advantage and batting depth to seal the title at Wankhede Stadium." },
    { year: 2015, host: "Australia & New Zealand", actual_winner: "Australia", runner_up: "New Zealand", ai_predicted_winner: "Australia", ai_confidence: 36.8, is_correct: true, reasoning: "Australia dominated MCG conditions with aggressive pace bowling and explosive top order." },
    { year: 2019, host: "England", actual_winner: "England", runner_up: "New Zealand", ai_predicted_winner: "India", ai_confidence: 28.9, is_correct: false, reasoning: "India ranked #1 in probability, but lost to NZ in semi-final rain delay; England won final on boundary count." },
    { year: 2023, host: "India", actual_winner: "Australia", runner_up: "India", ai_predicted_winner: "India", ai_confidence: 35.2, is_correct: false, reasoning: "India won 10 straight matches to enter final with highest model probability, but Travis Head's 137 won it for Australia." }
  ]
};

const FALLBACK_HISTORY = [
  { year: 1983, host: "England", winner: "India", runner_up: "West Indies", ai_predicted_winner: "West Indies", ai_confidence: 38.5, is_correct: false, final_score: "India 183 (54.4 ov) def West Indies 140 (52 ov) by 43 runs", matches_played: 27, top_scorer: "David Gower (ENG, 384 runs)", top_wicket_taker: "Roger Binny (IND, 18 wickets)", summary: "Under Kapil Dev, India shocked two-time champions West Indies at Lord's to win their first World Cup." },
  { year: 1987, host: "India & Pakistan", winner: "Australia", runner_up: "England", ai_predicted_winner: "Australia", ai_confidence: 29.4, is_correct: true, final_score: "Australia 253/5 (50 ov) def England 246/8 (50 ov) by 7 runs", matches_played: 27, top_scorer: "Graham Gooch (ENG, 471 runs)", top_wicket_taker: "Craig McDermott (AUS, 18 wickets)", summary: "Allan Border's Australia edged England by 7 runs at Eden Gardens Kolkata to lift their maiden title." },
  { year: 1992, host: "Australia & New Zealand", winner: "Pakistan", runner_up: "England", ai_predicted_winner: "Pakistan", ai_confidence: 27.8, is_correct: true, final_score: "Pakistan 249/6 (50 ov) def England 227 (49.2 ov) by 22 runs", matches_played: 39, top_scorer: "Martin Crowe (NZ, 456 runs)", top_wicket_taker: "Wasim Akram (PAK, 18 wickets)", summary: "Imran Khan led the 'Cornered Tigers' Pakistan to victory in the first World Cup played in colored clothing." },
  { year: 1996, host: "India, Pakistan & Sri Lanka", winner: "Sri Lanka", runner_up: "Australia", ai_predicted_winner: "Sri Lanka", ai_confidence: 31.2, is_correct: true, final_score: "Sri Lanka 245/3 (46.2 ov) def Australia 241/7 (50 ov) by 7 wickets", matches_played: 37, top_scorer: "Sachin Tendulkar (IND, 523 runs)", top_wicket_taker: "Anil Kumble (IND, 15 wickets)", summary: "Arjuna Ranatunga and Aravinda de Silva's masterclass secured Sri Lanka's miraculous first title in Lahore." },
  { year: 1999, host: "England, Scotland, Wales, Ireland & Netherlands", winner: "Australia", runner_up: "Pakistan", ai_predicted_winner: "Australia", ai_confidence: 34.0, is_correct: true, final_score: "Australia 133/2 (20.1 ov) def Pakistan 132 (39 ov) by 8 wickets", matches_played: 42, top_scorer: "Rahul Dravid (IND, 461 runs)", top_wicket_taker: "Shane Warne (AUS) & Geoff Allott (NZ, 20 wickets)", summary: "Shane Warne's leg-spin brilliance propelled Steve Waugh's Australia to a dominant victory at Lord's." },
  { year: 2003, host: "South Africa, Zimbabwe & Kenya", winner: "Australia", runner_up: "India", ai_predicted_winner: "Australia", ai_confidence: 42.1, is_correct: true, final_score: "Australia 359/2 (50 ov) def India 234 (39.2 ov) by 125 runs", matches_played: 54, top_scorer: "Sachin Tendulkar (IND, 673 runs)", top_wicket_taker: "Chaminda Vaas (SL, 23 wickets)", summary: "Ricky Ponting's blistering 140* capped an invincible campaign as Australia went undefeated in South Africa." },
  { year: 2007, host: "West Indies", winner: "Australia", runner_up: "Sri Lanka", ai_predicted_winner: "Australia", ai_confidence: 44.6, is_correct: true, final_score: "Australia 281/4 (38 ov) def Sri Lanka 215/8 (36 ov) by 53 runs (DLS)", matches_played: 51, top_scorer: "Matthew Hayden (AUS, 659 runs)", top_wicket_taker: "Glenn McGrath (AUS, 26 wickets)", summary: "Adam Gilchrist's majestic 149 guided Australia to an unprecedented World Cup title hat-trick." },
  { year: 2011, host: "India, Sri Lanka & Bangladesh", winner: "India", runner_up: "Sri Lanka", ai_predicted_winner: "India", ai_confidence: 33.5, is_correct: true, final_score: "India 277/4 (48.2 ov) def Sri Lanka 274/6 (50 ov) by 6 wickets", matches_played: 49, top_scorer: "Tillakaratne Dilshan (SL, 500 runs)", top_wicket_taker: "Zaheer Khan (IND) & Shahid Afridi (PAK, 21 wickets)", summary: "MS Dhoni's historic winning six at Wankhede Stadium crowned India world champions on home soil after 28 years." },
  { year: 2015, host: "Australia & New Zealand", winner: "Australia", runner_up: "New Zealand", ai_predicted_winner: "Australia", ai_confidence: 36.8, is_correct: true, final_score: "Australia 186/3 (33.1 ov) def New Zealand 183 (45 ov) by 7 wickets", matches_played: 49, top_scorer: "Martin Guptill (NZ, 547 runs)", top_wicket_taker: "Mitchell Starc (AUS) & Trent Boult (NZ, 22 wickets)", summary: "Michael Clarke led Australia to their fifth World Cup title in front of 93,000 fans at the MCG." },
  { year: 2019, host: "England & Wales", winner: "England", runner_up: "New Zealand", ai_predicted_winner: "India", ai_confidence: 28.9, is_correct: false, final_score: "England 241 (50 ov) & Super Over 15 tied NZ 241/8 & 15; ENG won on boundary count", matches_played: 48, top_scorer: "Rohit Sharma (IND, 648 runs)", top_wicket_taker: "Mitchell Starc (AUS, 27 wickets)", summary: "The most thrilling final ever ended with Eoin Morgan's England claiming their maiden title on boundary count." },
  { year: 2023, host: "India", winner: "Australia", runner_up: "India", ai_predicted_winner: "India", ai_confidence: 35.2, is_correct: false, final_score: "Australia 241/4 (43 ov) def India 240 (50 ov) by 6 wickets", matches_played: 48, top_scorer: "Virat Kohli (IND, 765 runs)", top_wicket_taker: "Mohammed Shami (IND, 24 wickets)", summary: "Travis Head's epic 137 silenced Narendra Modi Stadium as Pat Cummins' Australia claimed a record 6th World Cup." }
];

const FALLBACK_TEAMS = [
  { Team: "Australia", Titles: 6, Finals_Appearances: 8, Semi_Finals: 9, Matches_Played: 105, Matches_Won: 78, Matches_Lost: 25, Win_Percentage: 74.3, Batting_Avg: 36.8, Bowling_Avg: 24.2, Net_Run_Rate: 0.72, Knockout_Win_Pct: 75.0, ICC_Rank: 2, ICC_Rating: 118, Recent_Win_Pct: 68.0, Batting_Rating: 85.0, Bowling_Rating: 88.0, Consistency_Score: 89.0, African_Host_Rating: 82.0, H2H_Top5_Win_Pct: 65.0 },
  { Team: "India", Titles: 2, Finals_Appearances: 4, Semi_Finals: 8, Matches_Played: 95, Matches_Won: 63, Matches_Lost: 30, Win_Percentage: 66.3, Batting_Avg: 35.4, Bowling_Avg: 26.1, Net_Run_Rate: 0.58, Knockout_Win_Pct: 61.5, ICC_Rank: 1, ICC_Rating: 121, Recent_Win_Pct: 72.5, Batting_Rating: 88.5, Bowling_Rating: 86.2, Consistency_Score: 87.0, African_Host_Rating: 78.0, H2H_Top5_Win_Pct: 68.0 },
  { Team: "South Africa", Titles: 0, Finals_Appearances: 0, Semi_Finals: 5, Matches_Played: 74, Matches_Won: 45, Matches_Lost: 26, Win_Percentage: 60.8, Batting_Avg: 35.1, Bowling_Avg: 26.9, Net_Run_Rate: 0.62, Knockout_Win_Pct: 25.0, ICC_Rank: 3, ICC_Rating: 112, Recent_Win_Pct: 64.0, Batting_Rating: 84.0, Bowling_Rating: 83.5, Consistency_Score: 76.0, African_Host_Rating: 95.0, H2H_Top5_Win_Pct: 58.0 },
  { Team: "New Zealand", Titles: 0, Finals_Appearances: 2, Semi_Finals: 9, Matches_Played: 99, Matches_Won: 59, Matches_Lost: 38, Win_Percentage: 59.6, Batting_Avg: 33.2, Bowling_Avg: 27.5, Net_Run_Rate: 0.38, Knockout_Win_Pct: 44.4, ICC_Rank: 4, ICC_Rating: 106, Recent_Win_Pct: 58.5, Batting_Rating: 81.0, Bowling_Rating: 82.0, Consistency_Score: 84.0, African_Host_Rating: 75.0, H2H_Top5_Win_Pct: 52.0 },
  { Team: "Pakistan", Titles: 1, Finals_Appearances: 2, Semi_Finals: 6, Matches_Played: 88, Matches_Won: 49, Matches_Lost: 37, Win_Percentage: 55.7, Batting_Avg: 31.2, Bowling_Avg: 27.8, Net_Run_Rate: 0.15, Knockout_Win_Pct: 50.0, ICC_Rank: 6, ICC_Rating: 98, Recent_Win_Pct: 52.0, Batting_Rating: 78.0, Bowling_Rating: 81.0, Consistency_Score: 70.0, African_Host_Rating: 72.0, H2H_Top5_Win_Pct: 44.0 },
  { Team: "West Indies", Titles: 2, Finals_Appearances: 3, Semi_Finals: 4, Matches_Played: 80, Matches_Won: 43, Matches_Lost: 35, Win_Percentage: 53.8, Batting_Avg: 30.8, Bowling_Avg: 28.9, Net_Run_Rate: 0.18, Knockout_Win_Pct: 50.0, ICC_Rank: 8, ICC_Rating: 88, Recent_Win_Pct: 46.0, Batting_Rating: 75.0, Bowling_Rating: 72.0, Consistency_Score: 65.0, African_Host_Rating: 70.0, H2H_Top5_Win_Pct: 35.0 },
  { Team: "England", Titles: 1, Finals_Appearances: 4, Semi_Finals: 6, Matches_Played: 98, Matches_Won: 51, Matches_Lost: 44, Win_Percentage: 52.0, Batting_Avg: 31.8, Bowling_Avg: 28.4, Net_Run_Rate: 0.22, Knockout_Win_Pct: 45.5, ICC_Rank: 5, ICC_Rating: 104, Recent_Win_Pct: 55.0, Batting_Rating: 83.0, Bowling_Rating: 79.5, Consistency_Score: 74.0, African_Host_Rating: 77.0, H2H_Top5_Win_Pct: 50.0 },
  { Team: "Sri Lanka", Titles: 1, Finals_Appearances: 3, Semi_Finals: 4, Matches_Played: 89, Matches_Won: 40, Matches_Lost: 46, Win_Percentage: 44.9, Batting_Avg: 29.5, Bowling_Avg: 30.1, Net_Run_Rate: -0.12, Knockout_Win_Pct: 57.1, ICC_Rank: 7, ICC_Rating: 92, Recent_Win_Pct: 48.0, Batting_Rating: 74.0, Bowling_Rating: 76.0, Consistency_Score: 68.0, African_Host_Rating: 68.0, H2H_Top5_Win_Pct: 38.0 },
  { Team: "Bangladesh", Titles: 0, Finals_Appearances: 0, Semi_Finals: 0, Matches_Played: 49, Matches_Won: 16, Matches_Lost: 32, Win_Percentage: 32.7, Batting_Avg: 24.5, Bowling_Avg: 36.2, Net_Run_Rate: -0.85, Knockout_Win_Pct: 0.0, ICC_Rank: 10, ICC_Rating: 78, Recent_Win_Pct: 38.0, Batting_Rating: 68.0, Bowling_Rating: 71.0, Consistency_Score: 62.0, African_Host_Rating: 60.0, H2H_Top5_Win_Pct: 25.0 },
  { Team: "Afghanistan", Titles: 0, Finals_Appearances: 0, Semi_Finals: 0, Matches_Played: 24, Matches_Won: 5, Matches_Lost: 19, Win_Percentage: 20.8, Batting_Avg: 25.8, Bowling_Avg: 34.5, Net_Run_Rate: -0.68, Knockout_Win_Pct: 0.0, ICC_Rank: 9, ICC_Rating: 84, Recent_Win_Pct: 45.0, Batting_Rating: 72.0, Bowling_Rating: 78.0, Consistency_Score: 72.0, African_Host_Rating: 65.0, H2H_Top5_Win_Pct: 32.0 }
];

export async function fetchPrediction2027() {
  try {
    const response = await fetch(`${API_BASE_URL}/prediction/2027`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    console.warn("Using fallback prediction data:", error);
    return FALLBACK_PREDICTION;
  }
}

export async function fetchWorldCupHistory() {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    console.warn("Using fallback history data:", error);
    return FALLBACK_HISTORY;
  }
}

export async function fetchTeamsData() {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    console.warn("Using fallback team data:", error);
    return FALLBACK_TEAMS;
  }
}

export async function fetchModelMetrics() {
  try {
    const response = await fetch(`${API_BASE_URL}/model/metrics`);
    if (!response.ok) throw new Error("API error");
    return await response.json();
  } catch (error) {
    console.warn("Using fallback metrics data:", error);
    return {
      selected_model: FALLBACK_PREDICTION.model_used,
      metrics: FALLBACK_PREDICTION.metrics,
      all_model_metrics: FALLBACK_PREDICTION.all_model_metrics,
      feature_importances: FALLBACK_PREDICTION.feature_importances,
      historical_accuracy: FALLBACK_PREDICTION.historical_accuracy
    };
  }
}
