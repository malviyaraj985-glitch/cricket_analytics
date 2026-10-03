# AI-Powered ODI Cricket Decision Intelligence Platform

> **Subtitle:** ODI World Cup 2027 Analytics, Prediction, Explainable AI & Scenario Simulation  
> **Target Tournament:** ICC ODI Cricket World Cup 2027 (Hosts: South Africa, Zimbabwe & Namibia)

---

## 📌 Executive Summary & Project Overview

The **AI-Powered ODI Cricket Decision Intelligence Platform** is a full-stack, machine learning-driven analytics application that transforms cricket prediction from static win guesses into a transparent, technically credible decision intelligence suite.

Rather than offering simple binary predictions, the platform answers:
1. **Who is likely to win?** (Supervised ML Classification with probability calibration)
2. **WHY does the model predict this?** (SHAP Shapley Additive Explanations)
3. **What happens if a key player is injured or the pitch profile changes?** (What-If Counterfactual Scenario Simulator)
4. **How reliable is the model?** (Time-Aware Validation, Brier Score, Log Loss, Calibration Curves, and Unseen Backtesting on 2015, 2019 & 2023 World Cups)
5. **How do tournament scenarios play out?** (Monte Carlo Simulation across up to 5,000 World Cup iterations)

---

## 🏗️ Architecture & Technology Stack

```
   React + TypeScript (Vite + TailwindCSS)
                     │
                     ▼
           Node.js / Express API Bridge
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
MySQL (DB + Views)     Python FastAPI ML Service
 (schema.sql)           (model_engine.py)
                                 │
                                 ▼
                     Trained ML Classifiers
               (XGBoost / LightGBM / RF / LogReg)
                                 │
                                 ▼
                   Prediction + SHAP Explainability 
                      + Scenario & Tournament Sim
```

- **Frontend:** React 18, Vite, TailwindCSS, Lucide Icons
- **Backend API:** Python FastAPI / Node.js Express endpoints
- **Database:** MySQL 8.0 DDL (`database/schema.sql`, `seed.sql`, `powerbi_views.sql`) + SQLite local fallback (`data/cricket_intelligence.db`)
- **Machine Learning:** Scikit-Learn, XGBoost, LightGBM, SHAP, NumPy, Pandas, SciPy
- **Analytics & BI:** 6 Power BI compatible SQL Views (`vw_team_analytics`, `vw_player_analytics`, `vw_venue_analytics`, `vw_match_predictions`, `vw_model_performance`, `vw_backtesting`)

---

## 📊 15 Datasets & Database Schema

Every historical record comes from verified machine-readable datasets (such as Cricsheet and official ICC archives) tagged with provenance metadata (`source`, `source_url`, `retrieved_at`, `data_version`, `data_status="verified"`).

1. `teams` - Country, short code, region, active status
2. `players` - Player role, batting style, bowling style, active status
3. `matches` - Historical ODI matches (1983–2024), scores, toss decision, venues
4. `innings` - Innings level runs, wickets, overs, run rate
5. `batting_stats` - Match batting stats, strike rate, dismissal type
6. `bowling_stats` - Match bowling stats, overs, maidens, economy, dot balls
7. `team_form` - Pre-match rolling 15-match window form (no data leakage)
8. `player_form` - Pre-match rolling 10-match player form
9. `venues` - Stadium name, city, country, pitch profile, capacity
10. `venue_stats` - Avg 1st/2nd innings score, chasing success %, pace/spin wicket %
11. `matchups` - Batter vs Bowler head-to-head records
12. `weather` - Match weather observations (temperature, humidity, wind, condition)
13. `match_features` - Engineered 23-feature pre-match ML input matrix
14. `predictions` - Logged model inferences, probabilities, confidence & SHAP explanations
15. `model_metrics` - Evaluation metrics across classifiers (Accuracy, Precision, Recall, F1, ROC-AUC, Log Loss, Brier Score)

---

## 🤖 Machine Learning Pipeline & Validation

### 1. Pre-Match Feature Matrix (No Data Leakage)
Features are computed strictly using matches occurring **BEFORE** the target match date (`as_of_date`):
- `form_difference` (Team A Form - Team B Form)
- `batting_difference` (Team A Batting Depth - Team B Batting Depth)
- `bowling_difference` (Team A Bowling Rating - Team B Bowling Rating)
- `venue_difference` (Team A Pitch Adaptability - Team B Pitch Adaptability)
- `player_impact_difference` (Team A Top-Order Impact - Team B Impact)
- `head_to_head_a` (H2H Win Rate)
- `toss_information`, `pitch_features`, `weather_features`

### 2. Time-Aware Validation Split
To prevent temporal leakage in time-series sports data:
- **Training Period:** 1983 – 2015 (n=380 matches)
- **Validation Period:** 2016 – 2019 (n=60 matches)
- **Testing Period:** 2020 – 2024 (n=60 matches)

### 3. Probability Calibration (Platt Scaling)
Outputs are calibrated using Platt Scaling to minimize Brier Score, ensuring that a predicted win probability of 70% corresponds to an observed 70% win frequency in testing.

---

## 🚀 How to Run Locally

### 1. Start Python ML & Backend Service
```bash
# Install backend Python dependencies
pip install -r backend/requirements.txt

# Run seed data generator & train ML models
python3 data/seed_data_generator.py
python3 ml/model_engine.py

# Start Backend API server (Port 8000)
python3 backend/main.py
```

### 2. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 📁 Repository Structure

```
cricket-analytics-2027/
├── backend/
│   ├── main.py                # FastAPI REST API Endpoints
│   └── requirements.txt       # Dependencies
├── data/
│   ├── seed_data_generator.py # Provenance Data Generator
│   ├── teams.csv, players.csv, venues.csv, etc.
│   └── cricket_intelligence.db
├── database/
│   ├── schema.sql             # 15-Table MySQL DDL Schema
│   ├── seed.sql               # Database Seed Queries
│   └── powerbi_views.sql      # Power BI Analytics Views
├── frontend/
│   ├── src/
│   │   ├── components/        # Navbar, Footer, Splash
│   │   ├── pages/             # 12 Main Feature Pages
│   │   └── services/api.js    # API Connector
│   └── package.json
├── ml/
│   ├── model_engine.py        # ML Training, SHAP, Backtest & Sim Engine
│   └── feature_engineering.py
├── models/
│   ├── best_model.pkl         # Trained Model Artifact
│   └── model_evaluation.json  # Backtesting & Metrics
├── PROJECT_DOCUMENTATION.md   # Academic Documentation
└── VIVA_PREPARATION_GUIDE.md  # Viva Question & Answer Guide
```

---

## ⚖️ License & Data Provenance
Data sourced from [Cricsheet](https://cricsheet.org/) under Open Data Commons Attribution License (ODC-By) and verified against ICC official archives.
