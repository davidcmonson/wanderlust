// =============================================================
// constants.js — Shared Vocabulary
// =============================================================
// Defines the categories users can filter by. Every dropdown
// and filter chip in the app pulls from these arrays.
//   - value: internal ID used in code and data files
//   - label: human-readable name shown in the UI
// =============================================================

export const REGIONS = [
  { value: 'southeast-asia', label: 'Southeast Asia' },
  { value: 'east-asia', label: 'East Asia' },
  { value: 'south-asia', label: 'South Asia' },
  { value: 'europe', label: 'Europe' },
  { value: 'north-america', label: 'North America' },
  { value: 'central-america', label: 'Central America' },
  { value: 'south-america', label: 'South America' },
  { value: 'caribbean', label: 'Caribbean' },
  { value: 'middle-east', label: 'Middle East' },
  { value: 'africa', label: 'Africa' },
  { value: 'oceania', label: 'Oceania' },
]

export const ACTIVITIES = [
  { value: 'beach', label: 'Beach' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'culture', label: 'Culture' },
  { value: 'food', label: 'Food & Wine' },
  { value: 'nightlife', label: 'Nightlife' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'nature', label: 'Nature' },
  { value: 'history', label: 'History' },
]

export const CLIMATES = [
  { value: 'tropical', label: 'Tropical' },
  { value: 'dry', label: 'Dry & Sunny' },
  { value: 'mild', label: 'Mild' },
  { value: 'cold', label: 'Cold & Snowy' },
]

export const TRAVEL_STYLES = [
  { value: 'backpacker', label: 'Backpacker' },
  { value: 'couple', label: 'Couple' },
  { value: 'family', label: 'Family' },
  { value: 'solo', label: 'Solo' },
  { value: 'luxury', label: 'Luxury' },
]

// Default filter state — "show everything"
export const DEFAULT_FILTERS = {
  budgetPerDay: null,    // null = any budget
  month: null,           // null = any time
  activities: [],        // [] = any activities
  climate: null,         // null = any climate
  travelStyle: null,     // null = any style
  region: null,          // null = any region
}
