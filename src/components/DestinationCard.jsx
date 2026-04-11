// =============================================================
// DestinationCard.jsx — Destination Card (Airbnb style)
// =============================================================
// Photography-forward card. Clicking anywhere navigates to the
// detail page. Heart save button in top-right on hover.
// =============================================================

import { Link } from 'react-router'
import SaveButton from './SaveButton'
import { useBoardsContext } from '../hooks/BoardsContext'

export default function DestinationCard({ destination }) {
  const {
    id,
    name,
    country,
    climate,
    activities,
    budgetPerDayUSD,
    fallbackImageUrl,
  } = destination

  const {
    boards,
    isSaved,
    addDestination,
    removeDestination,
    createBoard,
  } = useBoardsContext()

  return (
    <div className="group">
      {/* Image container — clickable link to detail page */}
      <Link to={`/destination/${id}`} className="block relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200">
        <img
          src={fallbackImageUrl}
          alt={`${name}, ${country}`}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none' }}
        />

        {/* Heart button — positioned over the image, stops click propagation */}
        <div
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          style={isSaved(id) ? { opacity: 1 } : {}}
          onClick={(e) => e.preventDefault()}
        >
          <SaveButton
            destinationId={id}
            boards={boards}
            isSaved={isSaved(id)}
            onSave={addDestination}
            onRemove={removeDestination}
            onCreateBoard={createBoard}
          />
        </div>
      </Link>

      {/* Card text — also links to detail page */}
      <Link to={`/destination/${id}`} className="block mt-3">
        <h3 className="font-semibold text-[15px] text-gray-900 leading-tight">
          {name}, {country}
        </h3>

        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
          {activities.slice(0, 3).map((a, i) => (
            <span key={a}>
              {a.charAt(0).toUpperCase() + a.slice(1)}
              {i < Math.min(activities.length, 3) - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>

        <p className="text-sm text-gray-500 mt-0.5">
          {climate.charAt(0).toUpperCase() + climate.slice(1)} climate
        </p>

        <p className="mt-1.5 text-[15px] text-gray-900">
          <span className="font-semibold">${budgetPerDayUSD.budget}&ndash;${budgetPerDayUSD.mid}</span>
          <span className="text-gray-500 font-normal"> / day</span>
        </p>
      </Link>
    </div>
  )
}
