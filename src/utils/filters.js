// =============================================================
// filters.js — Destination Scoring & Filtering
// =============================================================
// This is the "recommendation engine" — it replaces AI in V1.
// Instead of calling an AI API, we score each destination based
// on how well it matches the user's preferences, then sort by
// score descending. High-scoring destinations appear first.
//
// HOW SCORING WORKS:
// Each filter the user sets adds points to matching destinations.
// A destination that matches on budget, climate, AND activities
// will score higher than one that only matches on climate.
// Destinations that don't match a hard filter (like region) are
// excluded entirely.
//
// WHY SCORING > SIMPLE FILTERING:
// Simple filtering (include/exclude) often returns 0 results
// when the user selects multiple criteria. Scoring is forgiving —
// it always returns results, just ranked by relevance.
// =============================================================

/**
 * Score and filter destinations based on user preferences.
 *
 * @param {Array} destinations - The full destination database
 * @param {Object} filters - The user's current filter selections
 * @returns {Array} Destinations sorted by relevance score (highest first)
 */
export function filterDestinations(destinations, filters) {
  const {
    budgetPerDay,
    month,
    activities,
    climate,
    travelStyle,
    region,
  } = filters

  // Step 1: Score every destination
  const scored = destinations.map((dest) => {
    let score = 0

    // --- HARD FILTERS (exclude if no match) ---

    // Region: if user selected a region, exclude non-matching destinations
    if (region && dest.region !== region) {
      return { dest, score: -1 }
    }

    // --- SOFT FILTERS (add points for matches) ---

    // Budget: does the destination fit the user's daily budget?
    // We check if their budget falls within the destination's range
    if (budgetPerDay) {
      if (budgetPerDay >= dest.budgetPerDayUSD.budget) {
        score += 30 // Can afford at least budget-tier
        if (budgetPerDay >= dest.budgetPerDayUSD.mid) {
          score += 10 // Can afford mid-tier — even better fit
        }
      } else {
        score -= 20 // Over budget — penalize but don't exclude
      }
    }

    // Climate: exact match is a strong signal
    if (climate && dest.climate === climate) {
      score += 25
    }

    // Activities: more overlapping activities = better match
    if (activities && activities.length > 0) {
      const matchCount = activities.filter((a) =>
        dest.activities.includes(a)
      ).length
      score += matchCount * 10 // 10 points per matching activity
    }

    // Travel style: does this destination suit the user's travel style?
    if (travelStyle && dest.travelStyle.includes(travelStyle)) {
      score += 15
    }

    // Best months: is the user's travel month ideal for this destination?
    if (month && dest.bestMonths.includes(month)) {
      score += 20
    }

    // Baseline: every destination gets a small random offset
    // so equally-scored results appear in varying order
    score += Math.random() * 3

    return { dest, score }
  })

  // Step 2: Remove hard-filtered destinations (score === -1)
  // Step 3: Sort by score descending (best matches first)
  return scored
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.dest)
}
