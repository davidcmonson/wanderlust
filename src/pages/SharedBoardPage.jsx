// =============================================================
// SharedBoardPage.jsx — Read-Only Shared Board View
// =============================================================
// When someone opens a shared board link, they land here.
// The board data is decoded from the URL parameter.
// Shows the board name and destination cards in read-only mode.
// =============================================================

import { useParams, Link } from 'react-router'
import { decodeBoard } from '../utils/sharing'
import { useDestinations } from '../hooks/useDestinations'
import MasonryGrid from '../components/MasonryGrid'

export default function SharedBoardPage() {
  const { data } = useParams()
  const allDestinations = useDestinations()
  const boardData = decodeBoard(data)

  // Invalid or corrupted link
  if (!boardData) {
    return (
      <div className="max-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid share link</h1>
        <p className="text-gray-500 mb-6">This link appears to be broken or expired.</p>
        <Link to="/" className="text-sm font-medium text-gray-900 underline underline-offset-2">
          Explore destinations
        </Link>
      </div>
    )
  }

  // Look up the actual destination objects
  const destinations = boardData.destinationIds
    .map((id) => allDestinations.find((d) => d.id === id))
    .filter(Boolean)

  return (
    <div className="max-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 pt-8 pb-16">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-gray-500 mb-1">Shared board</p>
        <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">
          {boardData.name}
        </h1>
        <p className="text-gray-500 mt-1">
          {destinations.length} destination{destinations.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Destination grid */}
      <MasonryGrid destinations={destinations} />

      {/* CTA */}
      <div className="text-center mt-16 py-10 border-t border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Plan your own adventure
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Create boards, save destinations, and share with friends.
        </p>
        <Link
          to="/"
          className="inline-flex px-6 py-3 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Start exploring
        </Link>
      </div>
    </div>
  )
}
