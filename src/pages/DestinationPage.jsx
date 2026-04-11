// =============================================================
// DestinationPage.jsx — Destination Detail View
// =============================================================
// When a user clicks a destination card, they land here. Shows:
//   - Full-width hero image
//   - Destination overview (name, country, description)
//   - Cost breakdown table
//   - Highlights
//   - Day-by-day itinerary (if available)
//   - Save to board button
//
// REACT ROUTER CONCEPT: "useParams"
// The URL contains the destination ID (e.g., /destination/bali-indonesia).
// useParams() extracts that ID so we can look up the right destination.
// =============================================================

import { useParams, Link } from 'react-router'
import { useDestinations } from '../hooks/useDestinations'
import { useItineraries } from '../hooks/useItineraries'
import { useBoardsContext } from '../hooks/BoardsContext'
import SaveButton from '../components/SaveButton'
import ItineraryView from '../components/ItineraryView'

export default function DestinationPage() {
  const { id } = useParams()
  const destinations = useDestinations()
  const itineraries = useItineraries()
  const {
    boards,
    isSaved,
    addDestination,
    removeDestination,
    createBoard,
  } = useBoardsContext()

  // Find the destination by ID
  const destination = destinations.find((d) => d.id === id)

  // Find the itinerary for this destination (if one exists)
  const itinerary = itineraries.find((it) => it.destinationId === id)

  // 404 state
  if (!destination) {
    return (
      <div className="max-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Destination not found</h1>
        <p className="text-gray-500 mb-6">This destination doesn't exist or may have been removed.</p>
        <Link to="/" className="text-sm font-medium text-gray-900 underline underline-offset-2">
          Back to exploring
        </Link>
      </div>
    )
  }

  const {
    name,
    country,
    region,
    description,
    climate,
    bestMonths,
    budgetPerDayUSD,
    flightEstimateUSD,
    activities,
    travelStyle,
    highlights,
    fallbackImageUrl,
  } = destination

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div>
      {/* Hero image — full width, tall */}
      <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[60vh] bg-gray-200">
        <img
          src={fallbackImageUrl}
          alt={`${name}, ${country}`}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* Back button */}
        <Link
          to="/"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 p-2.5 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Save button */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white rounded-full shadow-md">
          <SaveButton
            destinationId={id}
            boards={boards}
            isSaved={isSaved(id)}
            onSave={addDestination}
            onRemove={removeDestination}
            onCreateBoard={createBoard}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-8 pb-16">

        {/* Title section */}
        <div className="mb-8">
          <h1 className="text-[28px] sm:text-[32px] font-bold text-gray-900 tracking-tight">
            {name}, {country}
          </h1>
          <p className="text-gray-500 mt-1">
            {formatRegion(region)} · {capitalize(climate)} climate
          </p>
          <p className="text-gray-700 mt-4 text-[16px] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Quick facts grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 pb-10 border-b border-gray-200">
          <Fact label="Budget" value={`$${budgetPerDayUSD.budget}/day`} />
          <Fact label="Mid-range" value={`$${budgetPerDayUSD.mid}/day`} />
          <Fact label="Luxury" value={`$${budgetPerDayUSD.luxury}/day`} />
          <Fact
            label="Best months"
            value={bestMonths.slice(0, 4).map((m) => monthNames[m - 1]).join(', ')}
          />
        </div>

        {/* What to do */}
        <Section title="What to do">
          <div className="flex flex-wrap gap-2">
            {activities.map((a) => (
              <span key={a} className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">
                {capitalize(a)}
              </span>
            ))}
          </div>
        </Section>

        {/* Travel style */}
        <Section title="Great for">
          <div className="flex flex-wrap gap-2">
            {travelStyle.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-lg bg-gray-100 text-sm text-gray-700">
                {capitalize(s)}
              </span>
            ))}
          </div>
        </Section>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <Section title="Highlights">
            <ul className="space-y-2">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-gray-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Flight estimates */}
        {flightEstimateUSD && (
          <Section title="Estimated flights (round trip)">
            <div className="grid grid-cols-3 gap-4">
              <Fact label="From US" value={`$${flightEstimateUSD.fromUS}`} />
              <Fact label="From Europe" value={`$${flightEstimateUSD.fromEurope}`} />
              <Fact label="From Asia" value={`$${flightEstimateUSD.fromAsia}`} />
            </div>
          </Section>
        )}

        {/* Itinerary */}
        {itinerary ? (
          <Section title={itinerary.title}>
            <ItineraryView itinerary={itinerary} />
          </Section>
        ) : (
          <Section title="Suggested itinerary">
            <p className="text-sm text-gray-500">
              A curated day-by-day itinerary for {name} is coming soon.
            </p>
          </Section>
        )}

      </div>
    </div>
  )
}

// Helper: section with title
function Section({ title, children }) {
  return (
    <div className="mb-10 pb-10 border-b border-gray-200 last:border-0">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  )
}

// Helper: quick fact display
function Fact({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-[15px] font-semibold text-gray-900 mt-0.5">{value}</p>
    </div>
  )
}

// Utility helpers
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function formatRegion(region) {
  return region.split('-').map(capitalize).join(' ')
}
