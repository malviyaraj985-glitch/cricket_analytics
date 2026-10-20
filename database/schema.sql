-- =============================================================================
-- AI-POWERED ODI CRICKET DECISION INTELLIGENCE PLATFORM
-- DATABASE SCHEMA (MySQL 8.0+)
-- =============================================================================

CREATE DATABASE IF NOT EXISTS `cricket_intelligence_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `cricket_intelligence_db`;

-- TABLE 1: teams
CREATE TABLE IF NOT EXISTS `teams` (
    `team_id` INT AUTO_INCREMENT PRIMARY KEY,
    `team_name` VARCHAR(100) NOT NULL UNIQUE,
    `short_name` VARCHAR(10) NOT NULL UNIQUE,
    `region` VARCHAR(50) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `active_status` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 2: players
CREATE TABLE IF NOT EXISTS `players` (
    `player_id` INT AUTO_INCREMENT PRIMARY KEY,
    `player_name` VARCHAR(120) NOT NULL,
    `team_id` INT NOT NULL,
    `role` ENUM('Batter', 'Bowler', 'All-Rounder', 'Wicket-Keeper') NOT NULL,
    `batting_style` VARCHAR(50) NOT NULL,
    `bowling_style` VARCHAR(50) DEFAULT 'N/A',
    `active_status` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`team_id`) REFERENCES `teams`(`team_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 9: venues (Defined before matches due to FK)
CREATE TABLE IF NOT EXISTS `venues` (
    `venue_id` INT AUTO_INCREMENT PRIMARY KEY,
    `venue_name` VARCHAR(150) NOT NULL UNIQUE,
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `latitude` DECIMAL(9,6),
    `longitude` DECIMAL(9,6),
    `pitch_profile` ENUM('Batting-Friendly', 'Bowling-Friendly', 'Balanced', 'Pace-Friendly', 'Spin-Friendly') DEFAULT 'Balanced',
    `capacity` INT,
    `is_wc2027_host` BOOLEAN DEFAULT FALSE,
    `host_status` VARCHAR(50) DEFAULT 'Historical International',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 3: matches
CREATE TABLE IF NOT EXISTS `matches` (
    `match_id` INT AUTO_INCREMENT PRIMARY KEY,
    `date` DATE NOT NULL,
    `year` INT NOT NULL,
    `world_cup_year` INT DEFAULT NULL,
    `team_a` INT NOT NULL,
    `team_b` INT NOT NULL,
    `venue_id` INT NOT NULL,
    `city` VARCHAR(100),
    `country` VARCHAR(100),
    `toss_winner` INT,
    `toss_decision` ENUM('Bat', 'Field'),
    `team_a_score` INT DEFAULT 0,
    `team_a_wickets` INT DEFAULT 0,
    `team_b_score` INT DEFAULT 0,
    `team_b_wickets` INT DEFAULT 0,
    `winner` INT,
    `win_margin` VARCHAR(50),
    `match_result` ENUM('Normal', 'Tie', 'No Result') DEFAULT 'Normal',
    `player_of_match` VARCHAR(120),
    `source` VARCHAR(100) DEFAULT 'Cricsheet / Official ICC',
    `source_url` VARCHAR(255) DEFAULT 'https://cricsheet.org/',
    `data_status` ENUM('verified', 'demo') DEFAULT 'verified',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`team_a`) REFERENCES `teams`(`team_id`),
    FOREIGN KEY (`team_b`) REFERENCES `teams`(`team_id`),
    FOREIGN KEY (`venue_id`) REFERENCES `venues`(`venue_id`),
    FOREIGN KEY (`toss_winner`) REFERENCES `teams`(`team_id`),
    FOREIGN KEY (`winner`) REFERENCES `teams`(`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 4: innings
CREATE TABLE IF NOT EXISTS `innings` (
    `innings_id` INT AUTO_INCREMENT PRIMARY KEY,
    `match_id` INT NOT NULL,
    `innings_number` INT NOT NULL,
    `batting_team` INT NOT NULL,
    `bowling_team` INT NOT NULL,
    `runs` INT NOT NULL DEFAULT 0,
    `wickets` INT NOT NULL DEFAULT 0,
    `overs` DECIMAL(4,1) NOT NULL DEFAULT 0.0,
    `run_rate` DECIMAL(4,2) NOT NULL DEFAULT 0.0,
    FOREIGN KEY (`match_id`) REFERENCES `matches`(`match_id`) ON DELETE CASCADE,
    FOREIGN KEY (`batting_team`) REFERENCES `teams`(`team_id`),
    FOREIGN KEY (`bowling_team`) REFERENCES `teams`(`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 5: batting_stats
CREATE TABLE IF NOT EXISTS `batting_stats` (
    `stat_id` INT AUTO_INCREMENT PRIMARY KEY,
    `match_id` INT NOT NULL,
    `player_id` INT NOT NULL,
    `team_id` INT NOT NULL,
    `runs` INT NOT NULL DEFAULT 0,
    `balls` INT NOT NULL DEFAULT 0,
    `fours` INT NOT NULL DEFAULT 0,
    `sixes` INT NOT NULL DEFAULT 0,
    `strike_rate` DECIMAL(6,2) NOT NULL DEFAULT 0.0,
    `dismissed` BOOLEAN DEFAULT TRUE,
    `dismissal_type` VARCHAR(50) DEFAULT 'N/A',
    FOREIGN KEY (`match_id`) REFERENCES `matches`(`match_id`) ON DELETE CASCADE,
    FOREIGN KEY (`player_id`) REFERENCES `players`(`player_id`),
    FOREIGN KEY (`team_id`) REFERENCES `teams`(`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 6: bowling_stats
CREATE TABLE IF NOT EXISTS `bowling_stats` (
    `stat_id` INT AUTO_INCREMENT PRIMARY KEY,
    `match_id` INT NOT NULL,
    `player_id` INT NOT NULL,
    `team_id` INT NOT NULL,
    `overs` DECIMAL(4,1) NOT NULL DEFAULT 0.0,
    `maidens` INT NOT NULL DEFAULT 0,
    `runs_conceded` INT NOT NULL DEFAULT 0,
    `wickets` INT NOT NULL DEFAULT 0,
    `economy` DECIMAL(5,2) NOT NULL DEFAULT 0.0,
    `dot_balls` INT NOT NULL DEFAULT 0,
    FOREIGN KEY (`match_id`) REFERENCES `matches`(`match_id`) ON DELETE CASCADE,
    FOREIGN KEY (`player_id`) REFERENCES `players`(`player_id`),
    FOREIGN KEY (`team_id`) REFERENCES `teams`(`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 7: team_form (Rolling pre-match window metrics)
CREATE TABLE IF NOT EXISTS `team_form` (
    `form_id` INT AUTO_INCREMENT PRIMARY KEY,
    `team_id` INT NOT NULL,
    `as_of_date` DATE NOT NULL,
    `matches_window` INT DEFAULT 10,
    `wins` INT DEFAULT 0,
    `losses` INT DEFAULT 0,
    `no_results` INT DEFAULT 0,
    `win_percentage` DECIMAL(5,2) DEFAULT 0.0,
    `avg_runs` DECIMAL(6,2) DEFAULT 0.0,
    `avg_wickets` DECIMAL(4,2) DEFAULT 0.0,
    `batting_strength` DECIMAL(5,2) DEFAULT 0.0,
    `bowling_strength` DECIMAL(5,2) DEFAULT 0.0,
    `run_rate` DECIMAL(4,2) DEFAULT 0.0,
    `wicket_rate` DECIMAL(4,2) DEFAULT 0.0,
    `overall_form` DECIMAL(5,2) DEFAULT 0.0,
    FOREIGN KEY (`team_id`) REFERENCES `teams`(`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 8: player_form (Pre-match rolling player performance)
CREATE TABLE IF NOT EXISTS `player_form` (
    `form_id` INT AUTO_INCREMENT PRIMARY KEY,
    `player_id` INT NOT NULL,
    `as_of_date` DATE NOT NULL,
    `matches_window` INT DEFAULT 10,
    `matches` INT DEFAULT 0,
    `innings` INT DEFAULT 0,
    `runs` INT DEFAULT 0,
    `batting_average` DECIMAL(5,2) DEFAULT 0.0,
    `strike_rate` DECIMAL(6,2) DEFAULT 0.0,
    `fifties` INT DEFAULT 0,
    `hundreds` INT DEFAULT 0,
    `high_score` VARCHAR(15) DEFAULT '0',
    `wickets` INT DEFAULT 0,
    `bowling_average` DECIMAL(5,2) DEFAULT NULL,
    `economy` DECIMAL(4,2) DEFAULT NULL,
    `bowling_strike_rate` DECIMAL(5,2) DEFAULT NULL,
    `best_bowling` VARCHAR(20) DEFAULT 'N/A',
    `catches` INT DEFAULT 0,
    `stumpings` INT DEFAULT 0,
    `dismissals` INT DEFAULT 0,
    `recent_form_score` DECIMAL(5,2) DEFAULT 0.0,
    `venue_form_score` DECIMAL(5,2) DEFAULT 0.0,
    FOREIGN KEY (`player_id`) REFERENCES `players`(`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 10: venue_stats
CREATE TABLE IF NOT EXISTS `venue_stats` (
    `stat_id` INT AUTO_INCREMENT PRIMARY KEY,
    `venue_id` INT NOT NULL,
    `year` INT NOT NULL,
    `matches` INT DEFAULT 0,
    `avg_first_innings_score` INT DEFAULT 0,
    `avg_second_innings_score` INT DEFAULT 0,
    `chasing_success_pct` DECIMAL(5,2) DEFAULT 0.0,
    `pace_wicket_rate` DECIMAL(5,2) DEFAULT 0.0,
    `spin_wicket_rate` DECIMAL(5,2) DEFAULT 0.0,
    `avg_run_rate` DECIMAL(4,2) DEFAULT 0.0,
    `venue_balance_score` DECIMAL(5,2) DEFAULT 0.0,
    `sample_window` VARCHAR(100) DEFAULT 'Historical ODI Records',
    `data_source` VARCHAR(150) DEFAULT 'Official ICC / ESPNcricinfo Records',
    FOREIGN KEY (`venue_id`) REFERENCES `venues`(`venue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 11: matchups (Batter vs Bowler Head-to-Head)
CREATE TABLE IF NOT EXISTS `matchups` (
    `matchup_id` INT AUTO_INCREMENT PRIMARY KEY,
    `batter_id` INT NOT NULL,
    `bowler_id` INT NOT NULL,
    `batter_team` INT NOT NULL,
    `bowler_team` INT NOT NULL,
    `balls` INT DEFAULT 0,
    `runs` INT DEFAULT 0,
    `dismissals` INT DEFAULT 0,
    `strike_rate` DECIMAL(6,2) DEFAULT 0.0,
    `dot_ball_percentage` DECIMAL(5,2) DEFAULT 0.0,
    `boundary_percentage` DECIMAL(5,2) DEFAULT 0.0,
    FOREIGN KEY (`batter_id`) REFERENCES `players`(`player_id`),
    FOREIGN KEY (`bowler_id`) REFERENCES `players`(`player_id`),
    FOREIGN KEY (`batter_team`) REFERENCES `teams`(`team_id`),
    FOREIGN KEY (`bowler_team`) REFERENCES `teams`(`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 12: weather
CREATE TABLE IF NOT EXISTS `weather` (
    `weather_id` INT AUTO_INCREMENT PRIMARY KEY,
    `match_id` INT NOT NULL,
    `venue_id` INT NOT NULL,
    `date` DATE NOT NULL,
    `temperature` DECIMAL(4,1),
    `humidity` DECIMAL(4,1),
    `wind_speed` DECIMAL(4,1),
    `precipitation_probability` DECIMAL(4,1),
    `weather_condition` VARCHAR(50),
    `source` VARCHAR(100) DEFAULT 'Open-Meteo / Historical Station',
    `data_status` ENUM('verified', 'demo', 'missing') DEFAULT 'verified',
    FOREIGN KEY (`match_id`) REFERENCES `matches`(`match_id`) ON DELETE CASCADE,
    FOREIGN KEY (`venue_id`) REFERENCES `venues`(`venue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 13: match_features (Final ML Feature Matrix)
CREATE TABLE IF NOT EXISTS `match_features` (
    `feature_id` INT AUTO_INCREMENT PRIMARY KEY,
    `match_id` INT NOT NULL UNIQUE,
    `team_a_form` DECIMAL(5,2),
    `team_b_form` DECIMAL(5,2),
    `team_a_batting_strength` DECIMAL(5,2),
    `team_b_batting_strength` DECIMAL(5,2),
    `team_a_bowling_strength` DECIMAL(5,2),
    `team_b_bowling_strength` DECIMAL(5,2),
    `team_a_win_percentage` DECIMAL(5,2),
    `team_b_win_percentage` DECIMAL(5,2),
    `venue_advantage_a` DECIMAL(5,2),
    `venue_advantage_b` DECIMAL(5,2),
    `recent_player_impact_a` DECIMAL(5,2),
    `recent_player_impact_b` DECIMAL(5,2),
    `head_to_head_a` DECIMAL(5,2),
    `head_to_head_b` DECIMAL(5,2),
    `toss_information` INT DEFAULT 0,
    `weather_features` DECIMAL(5,2) DEFAULT 0.0,
    `pitch_features` DECIMAL(5,2) DEFAULT 0.0,
    `form_difference` DECIMAL(5,2),
    `batting_difference` DECIMAL(5,2),
    `bowling_difference` DECIMAL(5,2),
    `venue_difference` DECIMAL(5,2),
    `player_impact_difference` DECIMAL(5,2),
    `overall_strength_difference` DECIMAL(5,2),
    FOREIGN KEY (`match_id`) REFERENCES `matches`(`match_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 14: predictions
CREATE TABLE IF NOT EXISTS `predictions` (
    `prediction_id` INT AUTO_INCREMENT PRIMARY KEY,
    `match_id` INT DEFAULT NULL,
    `prediction_timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `model_name` VARCHAR(100) NOT NULL,
    `model_version` VARCHAR(20) NOT NULL,
    `team_a_name` VARCHAR(100) NOT NULL,
    `team_b_name` VARCHAR(100) NOT NULL,
    `team_a_probability` DECIMAL(5,2) NOT NULL,
    `team_b_probability` DECIMAL(5,2) NOT NULL,
    `predicted_winner` VARCHAR(100) NOT NULL,
    `confidence` ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
    `top_features` JSON,
    `explanation` TEXT,
    `actual_winner` VARCHAR(100) DEFAULT NULL,
    `correct_prediction` BOOLEAN DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- TABLE 15: model_metrics
CREATE TABLE IF NOT EXISTS `model_metrics` (
    `metric_id` INT AUTO_INCREMENT PRIMARY KEY,
    `model_name` VARCHAR(100) NOT NULL,
    `model_version` VARCHAR(20) NOT NULL,
    `dataset_version` VARCHAR(20) DEFAULT 'v1.0-cricsheet',
    `train_period` VARCHAR(50) NOT NULL,
    `validation_period` VARCHAR(50) NOT NULL,
    `test_period` VARCHAR(50) NOT NULL,
    `accuracy` DECIMAL(5,4) NOT NULL,
    `precision` DECIMAL(5,4) NOT NULL,
    `recall` DECIMAL(5,4) NOT NULL,
    `f1_score` DECIMAL(5,4) NOT NULL,
    `roc_auc` DECIMAL(5,4) NOT NULL,
    `log_loss` DECIMAL(5,4) NOT NULL,
    `brier_score` DECIMAL(5,4) NOT NULL,
    `calibration_score` DECIMAL(5,4) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
