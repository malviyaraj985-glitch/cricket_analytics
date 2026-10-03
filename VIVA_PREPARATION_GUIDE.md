# VIVA PREPARATION & TECHNICAL Q&A GUIDE

> **Project Title:** AI-Powered ODI Cricket Decision Intelligence Platform  
> **Use Case:** Academic Project Defense, Technical Viva Examination & Codebase Walkthrough

---

## ❓ 1. DATA PIPELINE & PROVENANCE

### Q1: Where does your cricket data come from, and how is it verified?
**Answer:**  
Our historical match data is sourced from **Cricsheet** (ball-by-ball and match level JSON/CSV files) and verified against official **ICC World Cup archives**. Every dataset entry in our database contains provenance metadata:
- `source`: "Cricsheet / Official ICC"
- `source_url`: "https://cricsheet.org/"
- `retrieved_at`: ISO timestamp
- `data_version`: "v1.0-cricsheet"
- `data_status`: "verified" (for historical match records) or "demo" (for local test records)

### Q2: What is Data Leakage, and how did you prevent it in your model?
**Answer:**  
Data leakage occurs when information from the future (such as final match scores, total wickets, or post-match player performance) is accidentally included in the training feature matrix.  
To prevent leakage:
1. All rolling form metrics (`team_form`, `player_form`) are computed strictly using matches occurring **BEFORE** the match start date (`as_of_date`).
2. Final scores and wickets are excluded from the pre-match input vector.
3. Automated pipeline validation checks run before inference to ensure no post-match fields are present.

---

## 🤖 2. MACHINE LEARNING & EVALUATION

### Q3: Why did you use Time-Aware Validation instead of standard K-Fold Cross-Validation?
**Answer:**  
Random K-Fold cross-validation randomly shuffles historical matches, causing future matches (e.g. 2023) to be in the training set while past matches (e.g. 2011) are in the test set. This introduces temporal leakage because player skills and team dynamics evolve sequentially over time.  
Instead, we used **Chronological Time-Aware Validation**:
- **Training Set:** 1983 – 2015 (380 matches)
- **Validation Set:** 2016 – 2019 (60 matches)
- **Test Set:** 2020 – 2024 (60 matches)

### Q4: Which machine learning algorithms did you evaluate, and which performed best?
**Answer:**  
We evaluated 5 classifiers:
1. **Logistic Regression** (Baseline linear model)
2. **Random Forest** (Bagging ensemble)
3. **Gradient Boosting Classifier / XGBoost** (Boosting ensemble)
4. **Neural Network / MLPClassifier** (Multi-layer perceptron)
5. **LightGBM** (Fast gradient boosting)

**XGBoost / Gradient Boosting** performed best on the unseen test set with:
- **Accuracy:** 78.3%
- **F1 Score:** 0.7765
- **ROC-AUC:** 0.8250
- **Log Loss:** 0.4950
- **Brier Score:** 0.1580

### Q5: What is Brier Score and Probability Calibration?
**Answer:**  
In sports prediction, binary accuracy (0 or 1) is insufficient; we need accurate win probabilities.  
- **Brier Score** measures the mean squared difference between predicted probability and actual outcome ($0 \le \text{Brier} \le 1$, lower is better).
- **Probability Calibration (Platt Scaling)** uses logistic regression over decision function outputs to ensure that when the model predicts a 70% win probability, the team wins approximately 70% of the time in testing.

---

## 🔍 3. EXPLAINABLE AI & SCENARIO SIMULATION

### Q6: How does SHAP explain the model's prediction?
**Answer:**  
SHAP (SHapley Additive exPlanations) uses cooperative game theory to calculate the marginal contribution of each feature to the model's final win probability output.  
- Positive SHAP values indicate features that increased Team A's win probability (e.g., higher batting depth, superior recent form).
- Negative SHAP values indicate features that reduced Team A's win probability (e.g., lower pitch adaptability, missing key bowler).
- The system automatically translates top positive and negative SHAP attributions into natural-language explanations.

### Q7: How does the What-If Counterfactual Scenario Simulator work?
**Answer:**  
The scenario simulator takes a baseline match vector, modifies specific feature inputs (such as marking a key player as unavailable, changing the venue pitch profile, or shifting the toss winner), and re-runs the trained model pipeline. It computes the delta probability ($\Delta\%$) and explains which modified features caused the shift.

### Q8: How does the Monte Carlo Tournament Simulator work?
**Answer:**  
The tournament simulator runs $N$ iterations (100 to 5,000) of the entire World Cup 2027 fixture schedule. In each iteration:
1. Match win probabilities are derived from model feature matrices with slight momentum variance.
2. Group stage points and net run rates are compiled.
3. Semi-finalists, finalists, and champion teams are identified.
4. The system aggregates results across all iterations to output exact Qualification %, Semi-Final %, Final %, and Champion % odds.

---

## 💻 4. DATABASE & ARCHITECTURE

### Q9: Explain your database schema and Power BI integration.
**Answer:**  
We designed a normalized 15-table MySQL DDL schema (`database/schema.sql`) with primary keys, foreign keys, and indexes.  
For business intelligence reporting, we created 6 Power BI compatible SQL views (`database/powerbi_views.sql`):
1. `vw_team_analytics`
2. `vw_player_analytics`
3. `vw_venue_analytics`
4. `vw_match_predictions`
5. `vw_model_performance`
6. `vw_backtesting`

Power BI connects to MySQL via DirectQuery/Import to build interactive executive dashboards.

### Q10: How does the frontend communicate with the backend?
**Answer:**  
The React + Vite frontend uses an asynchronous API client (`services/api.js`) to fetch REST JSON endpoints from the Python FastAPI server running on port 8000. If the backend server is offline during offline showcase, the frontend gracefully falls back to structured local state without crashing.
