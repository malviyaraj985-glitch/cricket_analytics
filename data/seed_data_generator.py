import os
import json
import sqlite3
import pandas as pd
import numpy as np

DATA_DIR = os.path.dirname(os.path.abspath(__file__))
DB_FILE = os.path.join(DATA_DIR, "cricket_intelligence.db")

def generate_datasets():
    print("=== Generating Production Cricket Analytics & Intelligence Datasets ===")
    
    # 1. Teams
    teams_data = [
        {"team_id": 1, "team_name": "India", "short_name": "IND", "region": "Asia", "country": "India", "active_status": 1},
        {"team_id": 2, "team_name": "Australia", "short_name": "AUS", "region": "Oceania", "country": "Australia", "active_status": 1},
        {"team_id": 3, "team_name": "South Africa", "short_name": "SA", "region": "Africa", "country": "South Africa", "active_status": 1},
        {"team_id": 4, "team_name": "England", "short_name": "ENG", "region": "Europe", "country": "England", "active_status": 1},
        {"team_id": 5, "team_name": "New Zealand", "short_name": "NZ", "region": "Oceania", "country": "New Zealand", "active_status": 1},
        {"team_id": 6, "team_name": "Pakistan", "short_name": "PAK", "region": "Asia", "country": "Pakistan", "active_status": 1},
        {"team_id": 7, "team_name": "Sri Lanka", "short_name": "SL", "region": "Asia", "country": "Sri Lanka", "active_status": 1},
        {"team_id": 8, "team_name": "West Indies", "short_name": "WI", "region": "Americas", "country": "West Indies", "active_status": 1},
        {"team_id": 9, "team_name": "Afghanistan", "short_name": "AFG", "region": "Asia", "country": "Afghanistan", "active_status": 1},
        {"team_id": 10, "team_name": "Bangladesh", "short_name": "BAN", "region": "Asia", "country": "Bangladesh", "active_status": 1}
    ]
    teams_df = pd.DataFrame(teams_data)
    teams_df.to_csv(os.path.join(DATA_DIR, "teams.csv"), index=False)
    
    # 2. Venues
    venues_data = [
        {"venue_id": 1, "venue_name": "The Wanderers Stadium", "city": "Johannesburg", "country": "South Africa", "latitude": -26.1317, "longitude": 28.0569, "pitch_profile": "Pace-Friendly", "capacity": 34000},
        {"venue_id": 2, "venue_name": "SuperSport Park", "city": "Centurion", "country": "South Africa", "latitude": -25.8603, "longitude": 28.1894, "pitch_profile": "Pace-Friendly", "capacity": 22000},
        {"venue_id": 3, "venue_name": "Kingsmead Cricket Ground", "city": "Durban", "country": "South Africa", "latitude": -29.8517, "longitude": 31.0298, "pitch_profile": "Balanced", "capacity": 25000},
        {"venue_id": 4, "venue_name": "Narendra Modi Stadium", "city": "Ahmedabad", "country": "India", "latitude": 23.0917, "longitude": 72.5975, "pitch_profile": "Batting-Friendly", "capacity": 132000},
        {"venue_id": 5, "venue_name": "Melbourne Cricket Ground", "city": "Melbourne", "country": "Australia", "latitude": -37.8200, "longitude": 144.9834, "pitch_profile": "Balanced", "capacity": 100024},
        {"venue_id": 6, "venue_name": "Lord's Cricket Ground", "city": "London", "country": "England", "latitude": 51.5298, "longitude": -0.1726, "pitch_profile": "Balanced", "capacity": 31100},
        {"venue_id": 7, "venue_name": "Eden Gardens", "city": "Kolkata", "country": "India", "latitude": 22.5646, "longitude": 88.3433, "pitch_profile": "Spin-Friendly", "capacity": 68000},
        {"venue_id": 8, "venue_name": "Sydney Cricket Ground", "city": "Sydney", "country": "Australia", "latitude": -33.8916, "longitude": 151.2248, "pitch_profile": "Batting-Friendly", "capacity": 48000}
    ]
    venues_df = pd.DataFrame(venues_data)
    venues_df.to_csv(os.path.join(DATA_DIR, "venues.csv"), index=False)
    
    # 3. Players
    players_data = [
        {"player_id": 1, "player_name": "Rohit Sharma", "team_id": 1, "role": "Batter", "batting_style": "Right-hand bat", "bowling_style": "Right-arm offbreak", "active_status": 1},
        {"player_id": 2, "player_name": "Virat Kohli", "team_id": 1, "role": "Batter", "batting_style": "Right-hand bat", "bowling_style": "Right-arm medium", "active_status": 1},
        {"player_id": 3, "player_name": "Shubman Gill", "team_id": 1, "role": "Batter", "batting_style": "Right-hand bat", "bowling_style": "N/A", "active_status": 1},
        {"player_id": 4, "player_name": "Jasprit Bumrah", "team_id": 1, "role": "Bowler", "batting_style": "Right-hand bat", "bowling_style": "Right-arm fast", "active_status": 1},
        {"player_id": 5, "player_name": "Ravindra Jadeja", "team_id": 1, "role": "All-Rounder", "batting_style": "Left-hand bat", "bowling_style": "Slow left-arm orthodox", "active_status": 1},
        
        {"player_id": 6, "player_name": "Pat Cummins", "team_id": 2, "role": "Bowler", "batting_style": "Right-hand bat", "bowling_style": "Right-arm fast", "active_status": 1},
        {"player_id": 7, "player_name": "Travis Head", "team_id": 2, "role": "Batter", "batting_style": "Left-hand bat", "bowling_style": "Right-arm offbreak", "active_status": 1},
        {"player_id": 8, "player_name": "Steve Smith", "team_id": 2, "role": "Batter", "batting_style": "Right-hand bat", "bowling_style": "Right-arm legbreak", "active_status": 1},
        {"player_id": 9, "player_name": "Mitchell Starc", "team_id": 2, "role": "Bowler", "batting_style": "Left-hand bat", "bowling_style": "Left-arm fast", "active_status": 1},
        {"player_id": 10, "player_name": "Glenn Maxwell", "team_id": 2, "role": "All-Rounder", "batting_style": "Right-hand bat", "bowling_style": "Right-arm offbreak", "active_status": 1},
        
        {"player_id": 11, "player_name": "Kagiso Rabada", "team_id": 3, "role": "Bowler", "batting_style": "Left-hand bat", "bowling_style": "Right-arm fast", "active_status": 1},
        {"player_id": 12, "player_name": "Heinrich Klaasen", "team_id": 3, "role": "Wicket-Keeper", "batting_style": "Right-hand bat", "bowling_style": "Right-arm offbreak", "active_status": 1},
        {"player_id": 13, "player_name": "Quinton de Kock", "team_id": 3, "role": "Wicket-Keeper", "batting_style": "Left-hand bat", "bowling_style": "N/A", "active_status": 1},
        
        {"player_id": 14, "player_name": "Joe Root", "team_id": 4, "role": "Batter", "batting_style": "Right-hand bat", "bowling_style": "Right-arm offbreak", "active_status": 1},
        {"player_id": 15, "player_name": "Jos Buttler", "team_id": 4, "role": "Wicket-Keeper", "batting_style": "Right-hand bat", "bowling_style": "N/A", "active_status": 1},
        
        {"player_id": 16, "player_name": "Kane Williamson", "team_id": 5, "role": "Batter", "batting_style": "Right-hand bat", "bowling_style": "Right-arm offbreak", "active_status": 1},
        {"player_id": 17, "player_name": "Trent Boult", "team_id": 5, "role": "Bowler", "batting_style": "Right-hand bat", "bowling_style": "Left-arm fast-medium", "active_status": 1},
        
        {"player_id": 18, "player_name": "Babar Azam", "team_id": 6, "role": "Batter", "batting_style": "Right-hand bat", "bowling_style": "Right-arm offbreak", "active_status": 1},
        {"player_id": 19, "player_name": "Shaheen Afridi", "team_id": 6, "role": "Bowler", "batting_style": "Left-hand bat", "bowling_style": "Left-arm fast", "active_status": 1},
        
        {"player_id": 20, "player_name": "Wanindu Hasaranga", "team_id": 7, "role": "All-Rounder", "batting_style": "Right-hand bat", "bowling_style": "Right-arm legbreak", "active_status": 1}
    ]
    players_df = pd.DataFrame(players_data)
    players_df.to_csv(os.path.join(DATA_DIR, "players.csv"), index=False)
    
    # 4. Venue Stats
    venue_stats_data = [
        {"venue_id": 1, "year": 2024, "matches": 45, "avg_first_innings_score": 285, "avg_second_innings_score": 252, "chasing_success_pct": 46.6, "pace_wicket_rate": 68.5, "spin_wicket_rate": 31.5, "avg_run_rate": 5.72, "venue_balance_score": 78.5},
        {"venue_id": 2, "year": 2024, "matches": 38, "avg_first_innings_score": 278, "avg_second_innings_score": 245, "chasing_success_pct": 44.7, "pace_wicket_rate": 72.0, "spin_wicket_rate": 28.0, "avg_run_rate": 5.65, "venue_balance_score": 82.0},
        {"venue_id": 3, "year": 2024, "matches": 40, "avg_first_innings_score": 265, "avg_second_innings_score": 240, "chasing_success_pct": 52.5, "pace_wicket_rate": 64.0, "spin_wicket_rate": 36.0, "avg_run_rate": 5.40, "venue_balance_score": 80.0},
        {"venue_id": 4, "year": 2024, "matches": 32, "avg_first_innings_score": 298, "avg_second_innings_score": 270, "chasing_success_pct": 53.1, "pace_wicket_rate": 55.0, "spin_wicket_rate": 45.0, "avg_run_rate": 6.05, "venue_balance_score": 85.0},
        {"venue_id": 5, "year": 2024, "matches": 55, "avg_first_innings_score": 272, "avg_second_innings_score": 238, "chasing_success_pct": 41.8, "pace_wicket_rate": 70.5, "spin_wicket_rate": 29.5, "avg_run_rate": 5.48, "venue_balance_score": 79.0},
        {"venue_id": 6, "year": 2024, "matches": 68, "avg_first_innings_score": 262, "avg_second_innings_score": 225, "chasing_success_pct": 42.6, "pace_wicket_rate": 75.0, "spin_wicket_rate": 25.0, "avg_run_rate": 5.30, "venue_balance_score": 77.0},
        {"venue_id": 7, "year": 2024, "matches": 50, "avg_first_innings_score": 258, "avg_second_innings_score": 232, "chasing_success_pct": 48.0, "pace_wicket_rate": 48.0, "spin_wicket_rate": 52.0, "avg_run_rate": 5.25, "venue_balance_score": 83.0},
        {"venue_id": 8, "year": 2024, "matches": 52, "avg_first_innings_score": 282, "avg_second_innings_score": 258, "chasing_success_pct": 51.9, "pace_wicket_rate": 62.0, "spin_wicket_rate": 38.0, "avg_run_rate": 5.75, "venue_balance_score": 81.0}
    ]
    venue_stats_df = pd.DataFrame(venue_stats_data)
    venue_stats_df.to_csv(os.path.join(DATA_DIR, "venue_stats.csv"), index=False)

    # 5. Team Form
    team_form_data = [
        {"team_id": 1, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 12, "losses": 3, "no_results": 0, "win_percentage": 80.0, "avg_runs": 312.4, "avg_wickets": 8.8, "batting_strength": 92.5, "bowling_strength": 90.0, "run_rate": 6.25, "wicket_rate": 8.5, "overall_form": 91.25},
        {"team_id": 2, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 11, "losses": 4, "no_results": 0, "win_percentage": 73.3, "avg_runs": 298.5, "avg_wickets": 8.2, "batting_strength": 89.0, "bowling_strength": 88.5, "run_rate": 5.97, "wicket_rate": 8.2, "overall_form": 88.75},
        {"team_id": 3, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 10, "losses": 5, "no_results": 0, "win_percentage": 66.7, "avg_runs": 305.0, "avg_wickets": 7.9, "batting_strength": 87.5, "bowling_strength": 86.0, "run_rate": 6.10, "wicket_rate": 7.9, "overall_form": 86.75},
        {"team_id": 4, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 8, "losses": 7, "no_results": 0, "win_percentage": 53.3, "avg_runs": 284.2, "avg_wickets": 7.1, "batting_strength": 82.0, "bowling_strength": 80.0, "run_rate": 5.68, "wicket_rate": 7.1, "overall_form": 81.00},
        {"team_id": 5, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 9, "losses": 6, "no_results": 0, "win_percentage": 60.0, "avg_runs": 279.0, "avg_wickets": 7.6, "batting_strength": 81.5, "bowling_strength": 83.0, "run_rate": 5.58, "wicket_rate": 7.6, "overall_form": 82.25},
        {"team_id": 6, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 7, "losses": 8, "no_results": 0, "win_percentage": 46.7, "avg_runs": 268.0, "avg_wickets": 7.4, "batting_strength": 78.0, "bowling_strength": 82.5, "run_rate": 5.36, "wicket_rate": 7.4, "overall_form": 80.25},
        {"team_id": 7, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 6, "losses": 9, "no_results": 0, "win_percentage": 40.0, "avg_runs": 255.0, "avg_wickets": 6.8, "batting_strength": 74.0, "bowling_strength": 76.0, "run_rate": 5.10, "wicket_rate": 6.8, "overall_form": 75.00},
        {"team_id": 8, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 6, "losses": 9, "no_results": 0, "win_percentage": 40.0, "avg_runs": 260.5, "avg_wickets": 6.5, "batting_strength": 76.0, "bowling_strength": 73.0, "run_rate": 5.21, "wicket_rate": 6.5, "overall_form": 74.50},
        {"team_id": 9, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 7, "losses": 8, "no_results": 0, "win_percentage": 46.7, "avg_runs": 248.0, "avg_wickets": 7.8, "batting_strength": 72.0, "bowling_strength": 84.0, "run_rate": 4.96, "wicket_rate": 7.8, "overall_form": 78.00},
        {"team_id": 10, "as_of_date": "2026-10-01", "matches_window": 15, "wins": 5, "losses": 10, "no_results": 0, "win_percentage": 33.3, "avg_runs": 240.0, "avg_wickets": 6.2, "batting_strength": 70.0, "bowling_strength": 72.0, "run_rate": 4.80, "wicket_rate": 6.2, "overall_form": 71.00}
    ]
    team_form_df = pd.DataFrame(team_form_data)
    team_form_df.to_csv(os.path.join(DATA_DIR, "team_form.csv"), index=False)

    # 6. Player Form
    player_form_data = [
        {"player_id": 1, "as_of_date": "2026-10-01", "matches_window": 10, "runs": 580, "batting_average": 58.00, "strike_rate": 118.5, "fifties": 4, "hundreds": 2, "wickets": 1, "economy": 6.2, "recent_form_score": 92.0, "venue_form_score": 88.5},
        {"player_id": 2, "as_of_date": "2026-10-01", "matches_window": 10, "runs": 640, "batting_average": 71.11, "strike_rate": 95.2, "fifties": 5, "hundreds": 2, "wickets": 0, "economy": 0.0, "recent_form_score": 95.5, "venue_form_score": 91.0},
        {"player_id": 3, "as_of_date": "2026-10-01", "matches_window": 10, "runs": 510, "batting_average": 56.67, "strike_rate": 104.0, "fifties": 3, "hundreds": 1, "wickets": 0, "economy": 0.0, "recent_form_score": 88.0, "venue_form_score": 84.0},
        {"player_id": 4, "as_of_date": "2026-10-01", "matches_window": 10, "runs": 25, "batting_average": 8.33, "strike_rate": 75.0, "fifties": 0, "hundreds": 0, "wickets": 22, "economy": 4.45, "recent_form_score": 94.0, "venue_form_score": 92.0},
        {"player_id": 6, "as_of_date": "2026-10-01", "matches_window": 10, "runs": 110, "batting_average": 22.00, "strike_rate": 98.0, "fifties": 0, "hundreds": 0, "wickets": 19, "economy": 4.90, "recent_form_score": 90.0, "venue_form_score": 89.0},
        {"player_id": 7, "as_of_date": "2026-10-01", "matches_window": 10, "runs": 540, "batting_average": 54.00, "strike_rate": 125.4, "fifties": 3, "hundreds": 2, "wickets": 4, "economy": 5.8, "recent_form_score": 91.5, "venue_form_score": 86.0},
        {"player_id": 11, "as_of_date": "2026-10-01", "matches_window": 10, "runs": 45, "batting_average": 11.25, "strike_rate": 80.0, "fifties": 0, "hundreds": 0, "wickets": 20, "economy": 4.75, "recent_form_score": 89.0, "venue_form_score": 94.5},
        {"player_id": 12, "as_of_date": "2026-10-01", "matches_window": 10, "runs": 490, "batting_average": 61.25, "strike_rate": 138.2, "fifties": 3, "hundreds": 2, "wickets": 0, "economy": 0.0, "recent_form_score": 93.0, "venue_form_score": 96.0}
    ]
    player_form_df = pd.DataFrame(player_form_data)
    player_form_df.to_csv(os.path.join(DATA_DIR, "player_form.csv"), index=False)

    # 7. Matchups (Batter vs Bowler)
    matchups_data = [
        {"matchup_id": 1, "batter_id": 1, "bowler_id": 9, "batter_team": 1, "bowler_team": 2, "balls": 142, "runs": 138, "dismissals": 3, "strike_rate": 97.18, "dot_ball_percentage": 52.1, "boundary_percentage": 14.8},
        {"matchup_id": 2, "batter_id": 2, "bowler_id": 9, "batter_team": 1, "bowler_team": 2, "balls": 185, "runs": 162, "dismissals": 4, "strike_rate": 87.57, "dot_ball_percentage": 48.6, "boundary_percentage": 11.4},
        {"matchup_id": 3, "batter_id": 2, "bowler_id": 6, "batter_team": 1, "bowler_team": 2, "balls": 150, "runs": 125, "dismissals": 2, "strike_rate": 83.33, "dot_ball_percentage": 50.0, "boundary_percentage": 10.0},
        {"matchup_id": 4, "batter_id": 7, "bowler_id": 4, "batter_team": 2, "bowler_team": 1, "balls": 95, "runs": 82, "dismissals": 2, "strike_rate": 86.32, "dot_ball_percentage": 55.8, "boundary_percentage": 12.6},
        {"matchup_id": 5, "batter_id": 8, "bowler_id": 5, "batter_team": 2, "bowler_team": 1, "balls": 210, "runs": 155, "dismissals": 5, "strike_rate": 73.81, "dot_ball_percentage": 58.0, "boundary_percentage": 7.6},
        {"matchup_id": 6, "batter_id": 12, "bowler_id": 4, "batter_team": 3, "bowler_team": 1, "balls": 65, "runs": 78, "dismissals": 1, "strike_rate": 120.00, "dot_ball_percentage": 41.5, "boundary_percentage": 18.5},
        {"matchup_id": 7, "batter_id": 14, "bowler_id": 4, "batter_team": 4, "bowler_team": 1, "balls": 110, "runs": 88, "dismissals": 3, "strike_rate": 80.00, "dot_ball_percentage": 54.5, "boundary_percentage": 9.1},
        {"matchup_id": 8, "batter_id": 18, "bowler_id": 4, "batter_team": 6, "bowler_team": 1, "balls": 82, "runs": 64, "dismissals": 1, "strike_rate": 78.05, "dot_ball_percentage": 57.3, "boundary_percentage": 8.5}
    ]
    matchups_df = pd.DataFrame(matchups_data)
    matchups_df.to_csv(os.path.join(DATA_DIR, "matchups.csv"), index=False)

    # SQLite sync
    conn = sqlite3.connect(DB_FILE)
    teams_df.to_sql("teams", conn, if_exists="replace", index=False)
    venues_df.to_sql("venues", conn, if_exists="replace", index=False)
    players_df.to_sql("players", conn, if_exists="replace", index=False)
    venue_stats_df.to_sql("venue_stats", conn, if_exists="replace", index=False)
    team_form_df.to_sql("team_form", conn, if_exists="replace", index=False)
    player_form_df.to_sql("player_form", conn, if_exists="replace", index=False)
    matchups_df.to_sql("matchups", conn, if_exists="replace", index=False)
    conn.close()
    
    print(f"---> Generated all CSV & SQLite datasets in {DATA_DIR}")

if __name__ == "__main__":
    generate_datasets()
