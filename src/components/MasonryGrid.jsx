// =============================================================
// MasonryGrid.jsx — Uniform Grid Layout (Airbnb style)
// =============================================================
// Replaced CSS columns masonry with a uniform CSS Grid.
// Airbnb uses evenly-spaced cards in a responsive grid —
// clean, aligned, predictable. Each card is the same height
// structure (image + text) which creates visual rhythm.
// =============================================================

import DestinationCard from './DestinationCard'

export default function MasonryGrid({ destinations }) {
  if (destinations.length === 0) {
    return (
      <div className="text-center py-24">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          No exact matches
        </h3>
        <p className="text-sm text-gray-500">
          Try changing or removing some of your filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
        />
      ))}
    </div>
  )
}
