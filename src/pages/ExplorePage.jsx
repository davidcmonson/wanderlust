// =============================================================
// ExplorePage.jsx — Home Page
// =============================================================
// Wires together: SearchForm (filters) → useSearch (scoring) →
// MasonryGrid (display). Uses the full 95-destination database.
// =============================================================

import MasonryGrid from '../components/MasonryGrid'
import SearchForm from '../components/SearchForm'
import useSearch from '../hooks/useSearch'
import { useDestinations } from '../hooks/useDestinations'

export default function ExplorePage() {
  const destinations = useDestinations()
  const { filters, setFilters, results, totalCount } = useSearch(destinations)

  return (
    <div>
      {/* Header */}
      <div className="max-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 pt-8 pb-2">
        <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">
          Find your next trip
        </h1>
        <p className="text-gray-500 mt-1 text-[15px]">
          {results.length === totalCount
            ? `${totalCount} destinations`
            : `${results.length} of ${totalCount} destinations`
          }
        </p>
      </div>

      {/* Filter bar — sticky below nav */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200">
        <div className="max-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 py-3">
          <SearchForm filters={filters} onFilterChange={setFilters} />
        </div>
      </div>

      {/* Destination grid */}
      <div className="max-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 pt-6 pb-16">
        <MasonryGrid destinations={results} />
      </div>
    </div>
  )
}
