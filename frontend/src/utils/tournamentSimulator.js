/**
 * Authentic Monte Carlo Tournament Simulation Engine for ICC ODI World Cup 2027
 * 
 * Simulates complete tournament iterations:
 * - 10 ICC Teams
 * - 45 Round-robin group matches per iteration
 * - Points (2 for win, 0 for loss) + simulated Net Run Rate (NRR) for realistic tie-breaks
 * - Top 6 qualify for Super Six / Knockout contention
 * - Top 4 advance to Semi-Finals (SF1: 1st vs 4th, SF2: 2nd vs 3rd)
 * - Winners advance to Grand Final
 * - Final match produces the World Champion
 * 
 * Win probabilities are derived dynamically from calibrated team strength, recent form,
 * African venue suitability, batting/bowling ratings, and player impact deltas.
 */

export const SIMULATION_TEAMS = [
  "India",
  "Australia",
  "South Africa",
  "England",
  "New Zealand",
  "Pakistan",
  "Sri Lanka",
  "West Indies",
  "Afghanistan",
  "Bangladesh"
];

export const TEAM_ATTRIBUTES = {
  "India": { rating: 121, win_pct: 72.5, batting: 88.5, bowling: 86.2, consistency: 87.0, african_host: 78.0, spin_rating: 90.0, pace_rating: 86.0, form: 91.25, impact: 95.0 },
  "Australia": { rating: 118, win_pct: 68.0, batting: 85.0, bowling: 88.0, consistency: 89.0, african_host: 82.0, spin_rating: 80.0, pace_rating: 92.0, form: 88.75, impact: 92.0 },
  "South Africa": { rating: 112, win_pct: 64.0, batting: 84.0, bowling: 83.5, consistency: 76.0, african_host: 95.0, spin_rating: 78.0, pace_rating: 90.0, form: 86.75, impact: 89.0 },
  "New Zealand": { rating: 106, win_pct: 58.5, batting: 81.0, bowling: 82.0, consistency: 84.0, african_host: 75.0, spin_rating: 80.0, pace_rating: 84.0, form: 82.25, impact: 85.0 },
  "England": { rating: 104, win_pct: 55.0, batting: 83.0, bowling: 79.5, consistency: 74.0, african_host: 77.0, spin_rating: 78.0, pace_rating: 82.0, form: 81.00, impact: 84.0 },
  "Pakistan": { rating: 98, win_pct: 52.0, batting: 78.0, bowling: 82.5, consistency: 70.0, african_host: 72.0, spin_rating: 82.0, pace_rating: 86.0, form: 80.25, impact: 82.0 },
  "Sri Lanka": { rating: 92, win_pct: 48.0, batting: 74.0, bowling: 76.0, consistency: 68.0, african_host: 68.0, spin_rating: 85.0, pace_rating: 72.0, form: 75.00, impact: 76.0 },
  "West Indies": { rating: 88, win_pct: 46.0, batting: 75.0, bowling: 72.0, consistency: 65.0, african_host: 70.0, spin_rating: 74.0, pace_rating: 78.0, form: 74.50, impact: 75.0 },
  "Afghanistan": { rating: 84, win_pct: 45.0, batting: 72.0, bowling: 84.0, consistency: 72.0, african_host: 65.0, spin_rating: 92.0, pace_rating: 76.0, form: 78.00, impact: 78.0 },
  "Bangladesh": { rating: 78, win_pct: 38.0, batting: 68.0, bowling: 71.0, consistency: 62.0, african_host: 60.0, spin_rating: 82.0, pace_rating: 70.0, form: 71.00, impact: 70.0 }
};

/**
 * Calculates head-to-head match win probability for Team A vs Team B in African World Cup conditions.
 * Symmetrical: P(A vs B) = 1 - P(B vs A).
 */
export function calculateMatchProbability(teamA, teamB) {
  const sA = TEAM_ATTRIBUTES[teamA] || { rating: 90, form: 75, batting: 75, bowling: 75, african_host: 70, impact: 75 };
  const sB = TEAM_ATTRIBUTES[teamB] || { rating: 90, form: 75, batting: 75, bowling: 75, african_host: 70, impact: 75 };

  const ratingDiff = sA.rating - sB.rating;
  const formDiff = sA.form - sB.form;
  const battingDiff = sA.batting - sB.batting;
  const bowlingDiff = sA.bowling - sB.bowling;
  const hostDiff = sA.african_host - sB.african_host;
  const impactDiff = sA.impact - sB.impact;

  const totalDelta = (
    0.35 * ratingDiff +
    0.25 * formDiff +
    0.20 * battingDiff +
    0.20 * bowlingDiff +
    0.15 * hostDiff +
    0.10 * impactDiff
  );

  // Logistic sigmoid mapping centered at 0.50
  const rawProbA = 1.0 / (1.0 + Math.exp(-0.046 * totalDelta));
  // Bound probability between 8% and 92% to reflect one-day cricket match variance
  return Math.max(0.08, Math.min(0.92, rawProbA));
}

// Pre-compute pairwise win probabilities for efficiency
const PAIRWISE_PROBABILITIES = {};
for (let i = 0; i < SIMULATION_TEAMS.length; i++) {
  for (let j = 0; j < SIMULATION_TEAMS.length; j++) {
    if (i !== j) {
      const tA = SIMULATION_TEAMS[i];
      const tB = SIMULATION_TEAMS[j];
      PAIRWISE_PROBABILITIES[`${tA}__${tB}`] = calculateMatchProbability(tA, tB);
    }
  }
}

/**
 * Normal (Gaussian) random number generator for realistic match margins
 */
function randomGaussian(mean = 0, stdev = 1) {
  let u1 = Math.random();
  let u2 = Math.random();
  while (u1 === 0) u1 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdev + mean;
}

/**
 * Runs a complete stochastic Monte Carlo tournament simulation over N iterations.
 */
export function runClientMonteCarloSimulation(iterations = 1000) {
  const startTime = performance.now();
  const N = Math.min(Math.max(Number(iterations) || 1000, 100), 5000);

  const quals = {};
  const semis = {};
  const finals = {};
  const champs = {};

  SIMULATION_TEAMS.forEach(t => {
    quals[t] = 0;
    semis[t] = 0;
    finals[t] = 0;
    champs[t] = 0;
  });

  // Execute N complete tournaments
  for (let iter = 0; iter < N; iter++) {
    const points = {};
    const nrr = {};
    SIMULATION_TEAMS.forEach(t => {
      points[t] = 0;
      nrr[t] = 0.0;
    });

    // 1. Group Stage: Complete 45 round-robin matches
    for (let i = 0; i < SIMULATION_TEAMS.length; i++) {
      for (let j = i + 1; j < SIMULATION_TEAMS.length; j++) {
        const teamA = SIMULATION_TEAMS[i];
        const teamB = SIMULATION_TEAMS[j];
        const probA = PAIRWISE_PROBABILITIES[`${teamA}__${teamB}`];

        // Stochastic match outcome
        const aWon = Math.random() < probA;
        // Simulated margin of victory (differential runs)
        const runMargin = Math.max(1, Math.abs(randomGaussian((probA - 0.5) * 60, 28)));
        const nrrDelta = runMargin / 50.0;

        if (aWon) {
          points[teamA] += 2;
          nrr[teamA] += nrrDelta;
          nrr[teamB] -= nrrDelta;
        } else {
          points[teamB] += 2;
          nrr[teamB] += nrrDelta;
          nrr[teamA] -= nrrDelta;
        }
      }
    }

    // 2. Round-Robin Standings (Ranked by Points, then NRR)
    const ranked = [...SIMULATION_TEAMS].sort((a, b) => {
      if (points[b] !== points[a]) {
        return points[b] - points[a];
      }
      return nrr[b] - nrr[a];
    });

    // 3. Stage Advancement
    // Top 6 qualify for the Super Six stage
    for (let r = 0; r < 6; r++) {
      quals[ranked[r]] += 1;
    }

    // Top 4 advance to the Knockout Semi-Finals
    for (let r = 0; r < 4; r++) {
      semis[ranked[r]] += 1;
    }

    // 4. Knockout Semi-Finals
    // SF 1: 1st place vs 4th place
    const sf1Prob = PAIRWISE_PROBABILITIES[`${ranked[0]}__${ranked[3]}`];
    const finalist1 = Math.random() < sf1Prob ? ranked[0] : ranked[3];

    // SF 2: 2nd place vs 3rd place
    const sf2Prob = PAIRWISE_PROBABILITIES[`${ranked[1]}__${ranked[2]}`];
    const finalist2 = Math.random() < sf2Prob ? ranked[1] : ranked[2];

    finals[finalist1] += 1;
    finals[finalist2] += 1;

    // 5. Grand Final
    const finalProb = PAIRWISE_PROBABILITIES[`${finalist1}__${finalist2}`];
    const champion = Math.random() < finalProb ? finalist1 : finalist2;
    champs[champion] += 1;
  }

  // 6. Aggregate results into sorted projection records
  const results = SIMULATION_TEAMS.map(team => {
    const qPct = +((quals[team] / N) * 100).toFixed(1);
    const sPct = +((semis[team] / N) * 100).toFixed(1);
    const fPct = +((finals[team] / N) * 100).toFixed(1);
    const cPct = +((champs[team] / N) * 100).toFixed(1);

    return {
      team,
      qualification_pct: qPct,
      semi_final_pct: sPct,
      final_pct: fPct,
      champion_pct: cPct,
      raw_champions: champs[team],
      raw_finals: finals[team],
      raw_semis: semis[team],
      raw_quals: quals[team]
    };
  });

  // Sort by Champion Frequency descending, then Final appearance, then Semi-Final
  results.sort((a, b) => {
    if (b.champion_pct !== a.champion_pct) return b.champion_pct - a.champion_pct;
    if (b.final_pct !== a.final_pct) return b.final_pct - a.final_pct;
    return b.semi_final_pct - a.semi_final_pct;
  });

  const durationMs = Math.round(performance.now() - startTime);

  return {
    tournament: "ODI World Cup 2027 (South Africa, Zimbabwe & Namibia)",
    iterations: N,
    simulated_probabilities: results,
    execution_time_ms: durationMs,
    simulation_timestamp: new Date().toISOString(),
    run_id: `mc_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
    tournament_format: "10-Team Complete Round-Robin (45 fixtures) + Super Six Qualification + Semi-Finals & Final",
    tournament_assumption: "Simulated using the 10-team round-robin + Super Six benchmark structure with South African/African pitch conditions. Official 14-team 2027 qualification schedule remains unfinalized by ICC."
  };
}
