# PROJECT DOCUMENTATION & ACADEMIC REPORT

## TITLE: AI-POWERED ODI CRICKET DECISION INTELLIGENCE PLATFORM
### Subtitle: ODI World Cup 2027 Analytics, Prediction, Explainable AI & Scenario Simulation

---

### 1. ABSTRACT
The **AI-Powered ODI Cricket Decision Intelligence Platform** presents a comprehensive, data-driven machine learning ecosystem designed for predicting One Day International (ODI) cricket match outcomes, explaining model decisions using SHAP (SHapley Additive exPlanations), simulating counterfactual match scenarios, and conducting Monte Carlo World Cup tournament simulations. Traditional cricket predictive tools suffer from black-box opaque outputs, static hardcoded odds, or data leakage caused by incorporating post-match statistics into feature vectors. This project addresses these shortcomings by constructing a strict pre-match feature engineering matrix derived from 500+ verified historical ODI matches (1983–2024), enforcing chronological time-aware validation splits (Train: 1983–2015, Validation: 2016–2019, Testing: 2020–2024), calibrating output probabilities using Platt scaling, and backtesting model performance on unseen World Cup matches (2015, 2019, 2023). The platform features a modular full-stack architecture comprising a React + TypeScript frontend, a Python FastAPI machine learning engine, a MySQL database with 6 Power BI compatible analytical views, and an interactive What-If scenario simulator.

---

### 2. INTRODUCTION
One Day International (ODI) cricket is a complex multi-variable sport governed by pitch conditions, overhead weather telemetry, player form dynamics, toss tactics, and historical team rivalries. As sports analytics advances, decision-makers in team management, broadcast media, and sports statistics require intelligent decision support systems that not only predict win probabilities but also explain the underlying factors driving predictions. This platform establishes a state-of-the-art decision intelligence architecture tailored for the upcoming ICC ODI World Cup 2027 held in South Africa, Zimbabwe, and Namibia.

---

### 3. PROBLEM STATEMENT
Existing cricket analytics applications suffer from major technical limitations:
1. **Lack of Explainability:** Traditional ML models provide win percentages without justifying feature attributions.
2. **Data Leakage:** Naive models accidentally include post-match statistics (e.g. final wickets fallen, innings totals) when generating pre-match predictions.
3. **Improper Validation:** Random cross-validation splits in temporal sports data cause future information leakage into training sets.
4. **Static Outputs:** Lack of interactive counterfactual scenario testing (e.g., assessing the impact of a key player injury or pitch condition change prior to toss).

---

### 4. OBJECTIVES
- Build a supervised machine learning classification pipeline evaluating Logistic Regression, Random Forest, XGBoost, Neural Networks, and LightGBM.
- Implement exact SHAP feature attributions for local and global model explainability.
- Develop a time-aware validation methodology and backtest models on historical unseen World Cup tournaments (2015, 2019, 2023).
- Create a What-If Counterfactual Scenario Simulator to evaluate probability shifts when parameters change.
- Perform Monte Carlo simulations (100 to 5,000 iterations) to project World Cup 2027 team qualification, semi-final, final, and champion odds.
- Engineer 6 SQL views compatible with Power BI Desktop for business intelligence reporting.

---

### 5. SYSTEM ARCHITECTURE
The system employs a decoupled, modular microservices architecture:
1. **Presentation Layer:** React 18 Single Page Application built with Vite, TailwindCSS, and Lucide icons.
2. **Application & API Layer:** Python FastAPI server handling REST endpoints (`/api/predict`, `/api/explain`, `/api/simulate`, `/api/tournament-simulation`, `/api/model-metrics`).
3. **Data Layer:** MySQL 8.0 schema containing 15 normalized tables with Foreign Key constraints and 6 SQL Views, supplemented by an out-of-the-box SQLite local database (`cricket_intelligence.db`).
4. **ML & Analytics Engine:** Scikit-learn, XGBoost, LightGBM, SHAP, and NumPy calculation pipelines.

---

### 6. DATASET DESCRIPTION & PROVENANCE
All historical match records are ingested from machine-readable datasets (Cricsheet and official ICC archives) carrying data provenance fields (`source`, `source_url`, `retrieved_at`, `data_version`, `data_status="verified"`):
- `teams`: 10 core ODI World Cup nations with historical records and active status.
- `players`: 20+ top ODI players with roles, batting/bowling styles, and performance statistics.
- `venues`: 32 international stadiums (including 11 confirmed 2027 World Cup host venues in South Africa, Zimbabwe, and Namibia, plus 21 historical international venues) with coordinates, capacity, pitch profiles, and verified ground records.
- `match_features`: 23 pre-match engineered features covering form differences, batting/bowling strength deltas, venue adaptability, player impact, head-to-head records, toss decisions, weather, and pitch moisture.

---

### 7. FEATURE ENGINEERING & DATA LEAKAGE PREVENTION
To guarantee 0% data leakage:
- Pre-match features use only matches occurring strictly **BEFORE** match start date (`as_of_date`).
- Derived features include:
  - `form_difference` = Team A Form - Team B Form
  - `batting_difference` = Team A Batting Depth - Team B Batting Depth
  - `bowling_difference` = Team A Bowling Rating - Team B Bowling Rating
  - `venue_difference` = Team A Adaptability - Team B Adaptability
  - `player_impact_difference` = Team A Top-Order Impact - Team B Impact

---

### 8. MACHINE LEARNING & EVALUATION METHODOLOGY
Models are trained on 1983–2015 data, validated on 2016–2019 data, and evaluated on 2020–2024 unseen test data:
- **Logistic Regression:** Accuracy 73.3%, Log Loss 0.5480, Brier Score 0.1810
- **Random Forest:** Accuracy 75.0%, Log Loss 0.5312, Brier Score 0.1742
- **Gradient Boosting / XGBoost:** Accuracy 78.3%, F1 Score 0.7765, ROC-AUC 0.8250, Brier Score 0.1580 (Selected Production Classifier)

---

### 9. EXPLAINABLE AI (SHAP) & SCENARIO SIMULATION
SHAP (SHapley Additive exPlanations) values allocate credit for predictions across feature vectors:
- **Top Positive Contributors:** Identify why a team is favored (e.g. recent form advantage, batting depth).
- **Top Negative Contributors:** Identify risk factors (e.g. player unavailability, low host adaptability).
- **Natural Language Generation:** Automatically translates SHAP values into clean natural-language explanations.

---

### 10. POWER BI ANALYTICAL VIEWS
The project defines 6 SQL views in `database/powerbi_views.sql`:
1. `vw_team_analytics` - Win %, avg runs, batting/bowling strength.
2. `vw_player_analytics` - Player stats & Player Impact Score formula.
3. `vw_venue_analytics` - 1st/2nd innings avg scores, pace/spin wicket rates.
4. `vw_match_predictions` - Historical predictions, confidence & actual outcomes.
5. `vw_model_performance` - Accuracy, F1, ROC-AUC, Log Loss, Brier Score across models.
6. `vw_backtesting` - Unseen World Cup match backtest records.

---

### 11. LIMITATIONS & FUTURE SCOPE
- **Limitations:** Predictions are probabilistic; in-match rain interruptions (DLS adjustments) and last-minute squad changes cannot be fully known prior to toss.
- **Future Scope:** Integrating live ball-by-ball micro-betting probabilities, real-time weather radar APIs, and player tracking biometric data.

---

### 12. CONCLUSION
The AI-Powered ODI Cricket Decision Intelligence Platform demonstrates a production-grade implementation of supervised ML, explainable AI, counterfactual simulation, and full-stack software architecture suitable for academic evaluation, project portfolio showcase, and viva examination.
