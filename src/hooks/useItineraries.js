// =============================================================
// useItineraries.js — Itinerary Data
// =============================================================
// Loads pre-written itineraries from a JSON file.
// Destinations without an itinerary show "coming soon."
// =============================================================

import itineraries from '../data/itineraries.json'

export function useItineraries() {
  return itineraries
}
