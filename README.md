# 🏆 ODI World Cup 2027 – AI Winner Prediction & Cricket Analytics

A modern, full-stack AI-powered cricket analytics platform that analyzes historical ODI World Cup data from **1983 to 2023**, team performance metrics, recent 3-year international form (2024–2026), and venue compatibility metrics to predict the winner of the **2027 ODI World Cup** hosted in South Africa, Zimbabwe, and Namibia.

---

## 📌 Project Overview & Problem Statement

The ODI World Cup is the pinnacle of international cricket. Predicting the winner is a complex challenge influenced by historical tournament pedigree, recent bilateral form, knockout clutch ability, team balance (batting depth vs bowling efficiency), and sub-continent/African venue adaptability.

This project delivers a **data-driven Machine Learning pipeline** paired with an **interactive modern web application**. Rather than displaying static predictions, the AI explains **why** a particular team is predicted to win using feature importance rankings derived from empirical match data.

---

## ✨ Key Features

1. 🏠 **Home Dashboard**:
   - Visual hero card highlighting the AI Predicted Champion with win probability score meter.
   - Top 5 Contenders leaderboard.
   - Key statistics counters (11 World Cups, 556 matches, 6 unique champions).
   - Quick historical honor roll summary.

2. 🏆 **World Cup History (1983 – 2023)**:
   - Interactive data grid & tournament timeline.
   - Drill-down modal for every tournament edition displaying host country, champion, runner-up, final scorelines, top run-scorer, leading wicket-taker, and tournament summary.

3. ⚔️ **Team Analytics & Comparison**:
   - Side-by-side head-to-head comparison tool (compare 2 to 4 teams simultaneously).
   - Interactive **Multi-Dimensional Radar Chart** analyzing WC win %, recent form, batting rating, bowling rating, knockout clutch, and African host venue adaptability.

4. 🔮 **2027 AI Prediction & Explainable AI**:
   - Softmax win probability breakdown across all 10 major participating teams.
   - Machine Learning validation metrics (Accuracy: 74.4%, Precision: 66.5%, Recall: 46.3%, F1-Score: 50.7%).
   - **"Why does the AI predict this team?"** explainable AI narrative dynamically generated from feature importance weights.

5. 📊 **Interactive Data Visualizations**:
   - Bar Chart: World Cup Titles by Team.
   - Bar Chart: Historical WC Win % vs Recent 3-Year Form.
   - Scatter Plot: Batting vs Bowling Strength Matrix.
   - Doughnut Chart: 2027 Winner Probability Distribution.

6. 🤖 **"Can the AI Predict the Future?" Methodology**:
   - In-depth transparent documentation of dataset features, model architecture, host advantage factors, and non-deterministic limitations (injuries, toss factor, weather).

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Chart.js, Lucide Icons.
- **Backend API**: Python 3.10+, FastAPI, Uvicorn, Pydantic.
- **Machine Learning**: Scikit-Learn (Random Forest, Gradient Boosting, Extra Trees, Logistic Regression), Pandas, NumPy.
- **Storage/Data**: Structured JSON & CSV historical archives (`data/`, `models/`).

---

## 📁 Project Folder Structure

```
cricket-analytics-2027/
├── data/                             # Historical datasets
│   ├── world_cup_history.json        # 1983-2023 WC tournament details
│   ├── team_wc_performance.csv       # Cumulative World Cup metrics
│   └── recent_odi_stats.csv          # 2024-2026 ODI form & SA host factors
├── ml/                               # Machine Learning Pipeline
│   ├── feature_engineering.py        # Feature extraction & vector scaling
│   └── train_model.py                # CV training, evaluation & 2027 prediction
├── models/                           # Trained ML artifacts & results
│   ├── best_model.pkl
│   ├── scaler.pkl
│   └── prediction_2027.json
├── backend/                          # FastAPI REST Server
│   ├── main.py                       # REST API endpoints (/api/prediction/2027, /api/history, /api/teams)
│   └── requirements.txt
├── frontend/                         # Modern React + Vite Web Application
│   ├── src/
│   │   ├── components/               # Navbar, Footer
│   │   ├── pages/                    # Home, History, TeamAnalytics, Prediction, Visualizations, Methodology
│   │   ├── services/                 # API Client with fallback resilience
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md                         # Documentation
```

---

## ⚡ Quick Start & Execution Guide

### Prerequisites
- Python 3.10 or higher
- Node.js 18+ and npm

### 1. Install Backend & ML Dependencies
```bash
# From project root
pip install -r backend/requirements.txt
```

### 2. Train the Machine Learning Model
```bash
python3 ml/train_model.py
```
*Outputs cross-validation metrics, selects the best model (Logistic Regression / Ensemble), and exports prediction JSON to `models/prediction_2027.json`.*

### 3. Start the FastAPI Backend Server
```bash
python3 -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```
*API server will start at `http://localhost:8000`. Documentation available at `http://localhost:8000/docs`.*

### 4. Install & Start the React Frontend Application
```bash
# In a new terminal window
cd frontend
npm install
npm run dev
```
*Open `http://localhost:3000` in your web browser to view the live interactive application!*

---

## 📊 Machine Learning Model Evaluation Scores

| Algorithm | Validation Accuracy | Precision | Recall | F1-Score |
|---|---|---|---|---|
| **Logistic Regression (Selected)** | **74.38%** | **66.46%** | **46.27%** | **0.5070** |
| Gradient Boosting | 71.88% | 54.72% | 46.66% | 0.4982 |
| Random Forest | 70.63% | 52.97% | 44.22% | 0.4552 |
| Extra Trees | 71.88% | 62.86% | 35.03% | 0.3992 |

---

## 🔮 2027 World Cup Contender Probability Ranking

1. **Australia**: 31.3% *(6 WC Titles, 75% Knockout Win Rate, 82/100 African Host Rating)*
2. **India**: 23.9% *(2 WC Titles, 72.5% Recent Win Rate, 88.5 Batting Rating)*
3. **England**: 9.0% *(1 WC Title, 55.0% Recent Win Rate)*
4. **South Africa**: 8.4% *(0 WC Titles, 95/100 Home/Host Advantage for 2027)*
5. **Sri Lanka**: 7.2% *(1 WC Title, 57.1% Knockout Win Rate)*
6. **Pakistan**: 5.6% *(1 WC Title)*
7. **West Indies**: 5.4% *(2 WC Titles)*
8. **New Zealand**: 4.1% *(2 Finals Appearances)*
9. **Afghanistan**: 2.6%
10. **Bangladesh**: 2.5%

---

## 🔮 Future Scope & Roadmap

- **Live Ball-by-Ball Data Integration**: Connect live ICC API webhooks to dynamically update predictions during international series.
- **Player-Level Deep Learning Models**: Incorporate individual player Elo ratings, injury status, and pitch condition simulations.
- **Simulated Match Engine**: Monte Carlo 10,000-tournament simulation engine for tournament match fixtures.
