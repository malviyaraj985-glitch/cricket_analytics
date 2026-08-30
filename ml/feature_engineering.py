import os
import json
import pandas as pd
import numpy as np

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data")

def load_raw_data():
    wc_perf_path = os.path.join(DATA_DIR, "team_wc_performance.csv")
    recent_stats_path = os.path.join(DATA_DIR, "recent_odi_stats.csv")
    
    wc_df = pd.read_csv(wc_perf_path)
    recent_df = pd.read_csv(recent_stats_path)
    
    merged_df = pd.merge(wc_df, recent_df, on="Team")
    return merged_df

def engineer_features(df):
    """
    Computes 10 normalized features for ML model training and prediction:
    1. wc_win_pct: Historical WC Win Percentage
    2. title_experience: Scaled count of titles and finals appearances
    3. knockout_clutch: Knockout match win percentage
    4. recent_win_pct: Recent 3-year ODI win percentage
    5. batting_strength: Composite batting average and rating
    6. bowling_strength: Composite bowling efficiency and rating
    7. team_consistency: Performance consistency score
    8. african_host_adaptability: Rating in African sub-continent conditions (2027 host: SA/ZIM/NAM)
    9. h2h_top5_pct: Win % against Top 5 ranked teams
    10. overall_power_index: Weighted composite index
    """
    df = df.copy()
    
    # Feature 1: WC Win %
    df['feat_wc_win_pct'] = df['Win_Percentage'] / 100.0
    
    # Feature 2: Title Experience (Titles * 2 + Finals * 1) normalized
    df['feat_title_exp'] = (df['Titles'] * 2.0 + df['Finals_Appearances'] * 1.0) / 20.0
    
    # Feature 3: Knockout Clutch Rate
    df['feat_knockout_clutch'] = df['Knockout_Win_Pct'] / 100.0
    
    # Feature 4: Recent Win %
    df['feat_recent_win_pct'] = df['Recent_Win_Pct'] / 100.0
    
    # Feature 5: Batting Strength (Batting Avg + Batting Rating normalized)
    df['feat_batting_strength'] = (df['Batting_Avg'] * 0.4 + df['Batting_Rating'] * 0.6) / 100.0
    
    # Feature 6: Bowling Strength (Inverse Bowling Avg + Bowling Rating)
    # Lower bowling avg is better -> convert to score: (50 - Bowling_Avg) * 1.5 + Bowling_Rating * 0.5
    df['feat_bowling_strength'] = ((50 - df['Bowling_Avg']) * 1.5 + df['Bowling_Rating'] * 0.5) / 100.0
    
    # Feature 7: Consistency Score
    df['feat_consistency'] = df['Consistency_Score'] / 100.0
    
    # Feature 8: African Host Adaptability (Crucial for 2027 South Africa/Zimbabwe/Namibia host venues)
    df['feat_host_adaptability'] = df['African_Host_Rating'] / 100.0
    
    # Feature 9: Head to Head against Top 5
    df['feat_h2h_top5'] = df['H2H_Top5_Win_Pct'] / 100.0
    
    # Feature 10: Power Index
    df['feat_power_index'] = (
        df['feat_recent_win_pct'] * 0.25 +
        df['feat_wc_win_pct'] * 0.20 +
        df['feat_batting_strength'] * 0.15 +
        df['feat_bowling_strength'] * 0.15 +
        df['feat_host_adaptability'] * 0.15 +
        df['feat_knockout_clutch'] * 0.10
    )
    
    feature_cols = [
        'feat_wc_win_pct',
        'feat_title_exp',
        'feat_knockout_clutch',
        'feat_recent_win_pct',
        'feat_batting_strength',
        'feat_bowling_strength',
        'feat_consistency',
        'feat_host_adaptability',
        'feat_h2h_top5',
        'feat_power_index'
    ]
    
    return df, feature_cols

if __name__ == "__main__":
    raw_df = load_raw_data()
    processed_df, cols = engineer_features(raw_df)
    print("Engineered dataset preview:")
    print(processed_df[['Team'] + cols].head())
