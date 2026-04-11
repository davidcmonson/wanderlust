// =============================================================
// useDestinations.js — Shared Destination Data
// =============================================================
// Imports the curated destination database and makes it available
// to any component. Currently loads from a static JSON file.
// In V2, this could fetch from an API or merge in AI results.
// =============================================================

import destinations from '../data/destinations.json'

export function useDestinations() {
  return destinations
}
