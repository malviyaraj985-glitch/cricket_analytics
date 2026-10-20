-- =============================================================================
-- AI-POWERED ODI CRICKET DECISION INTELLIGENCE PLATFORM
-- POWER BI ANALYTICS VIEWS
-- =============================================================================

USE `cricket_intelligence_db`;

-- VIEW 1: vw_team_analytics
CREATE OR REPLACE VIEW `vw_team_analytics` AS
SELECT 
    t.team_id,
    t.team_name,
    t.short_name,
    t.region,
    t.country,
    tf.win_percentage,
    tf.avg_runs,
    tf.avg_wickets,
    tf.batting_strength,
    tf.bowling_strength,
    tf.run_rate,
    tf.wicket_rate,
    tf.overall_form,
    tf.as_of_date
FROM teams t
LEFT JOIN (
    SELECT tf1.* 
    FROM team_form tf1
    INNER JOIN (
        SELECT team_id, MAX(as_of_date) AS max_date 
        FROM team_form 
        GROUP BY team_id
    ) tf2 ON tf1.team_id = tf2.team_id AND tf1.as_of_date = tf2.max_date
) tf ON t.team_id = tf.team_id;

-- VIEW 2: vw_player_analytics
CREATE OR REPLACE VIEW `vw_player_analytics` AS
SELECT 
    p.player_id,
    p.player_name,
    t.team_name,
    p.role,
    p.batting_style,
    p.bowling_style,
    pf.runs,
    pf.batting_average,
    pf.strike_rate,
    pf.fifties,
    pf.hundreds,
    pf.wickets,
    pf.economy,
    pf.recent_form_score,
    pf.venue_form_score,
    ROUND((pf.batting_average * 0.4 + pf.strike_rate * 0.3 + (10 - pf.economy) * 10 * 0.3), 2) AS player_impact_score
FROM players p
JOIN teams t ON p.team_id = t.team_id
LEFT JOIN (
    SELECT pf1.* 
    FROM player_form pf1
    INNER JOIN (
        SELECT player_id, MAX(as_of_date) AS max_date 
        FROM player_form 
        GROUP BY player_id
    ) pf2 ON pf1.player_id = pf2.player_id AND pf1.as_of_date = pf2.max_date
) pf ON p.player_id = pf.player_id;

-- VIEW 3: vw_venue_analytics
CREATE OR REPLACE VIEW `vw_venue_analytics` AS
SELECT 
    v.venue_id,
    v.venue_name,
    v.city,
    v.country,
    v.pitch_profile,
    v.capacity,
    v.is_wc2027_host,
    v.host_status,
    vs.matches,
    vs.avg_first_innings_score,
    vs.avg_second_innings_score,
    vs.chasing_success_pct,
    vs.pace_wicket_rate,
    vs.spin_wicket_rate,
    vs.avg_run_rate,
    vs.venue_balance_score,
    vs.sample_window,
    vs.data_source
FROM venues v
LEFT JOIN (
    SELECT vs1.* 
    FROM venue_stats vs1
    INNER JOIN (
        SELECT venue_id, MAX(year) AS max_year 
        FROM venue_stats 
        GROUP BY venue_id
    ) vs2 ON vs1.venue_id = vs2.venue_id AND vs1.year = vs2.max_year
) vs ON v.venue_id = vs.venue_id;

-- VIEW 4: vw_match_predictions
CREATE OR REPLACE VIEW `vw_match_predictions` AS
SELECT 
    p.prediction_id,
    p.prediction_timestamp,
    p.model_name,
    p.model_version,
    p.team_a_name,
    p.team_b_name,
    p.team_a_probability,
    p.team_b_probability,
    p.predicted_winner,
    p.confidence,
    p.actual_winner,
    p.correct_prediction,
    p.explanation
FROM predictions p;

-- VIEW 5: vw_model_performance
CREATE OR REPLACE VIEW `vw_model_performance` AS
SELECT 
    m.metric_id,
    m.model_name,
    m.model_version,
    m.dataset_version,
    m.train_period,
    m.validation_period,
    m.test_period,
    m.accuracy,
    m.precision,
    m.recall,
    m.f1_score,
    m.roc_auc,
    m.log_loss,
    m.brier_score,
    m.calibration_score
FROM model_metrics m;

-- VIEW 6: vw_backtesting
CREATE OR REPLACE VIEW `vw_backtesting` AS
SELECT 
    m.match_id,
    m.year,
    m.world_cup_year,
    ta.team_name AS team_a,
    tb.team_name AS team_b,
    v.venue_name,
    tw.team_name AS actual_winner,
    p.predicted_winner,
    p.team_a_probability,
    p.team_b_probability,
    p.correct_prediction,
    p.model_name
FROM matches m
JOIN teams ta ON m.team_a = ta.team_id
JOIN teams tb ON m.team_b = tb.team_id
JOIN venues v ON m.venue_id = v.venue_id
LEFT JOIN teams tw ON m.winner = tw.team_id
LEFT JOIN predictions p ON m.match_id = p.match_id;
