// =============================================================
// useSearch.js — Search & Filter Hook
// =============================================================
// A custom React hook that manages filter state and returns
// filtered/scored destinations. Components use this hook to:
//   1. Read the current filters
//   2. Update filters (which triggers re-filtering)
//   3. Get the filtered results
//
// REACT CONCEPT: "Custom Hooks"
// A custom hook is a function that starts with "use" and can
// call other hooks (like useState). It lets you extract reusable
// logic out of components. Think of it as a recipe that any
// component can follow — the hook handles the logic, the
// component handles the display.
//
// REACT CONCEPT: "useMemo"
// useMemo caches the result of an expensive calculation. The
// filter function only re-runs when the destinations or filters
// change — not on every render. This keeps the app fast.
// =============================================================

import { useState, useMemo } from 'react'
import { DEFAULT_FILTERS } from '../utils/constants'
import { filterDestinations } from '../utils/filters'

export default function useSearch(destinations) {
  // The current filter state — starts with "show everything"
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  // Filter the destinations whenever filters or data change.
  // useMemo ensures we don't re-run this on every render.
  const results = useMemo(
    () => filterDestinations(destinations, filters),
    [destinations, filters]
  )

  return {
    filters,       // Current filter values (for the SearchForm)
    setFilters,    // Function to update filters
    results,       // Filtered & scored destinations (for the grid)
    totalCount: destinations.length,  // Total before filtering
  }
}
