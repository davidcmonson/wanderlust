// =============================================================
// BoardsPage.jsx — Saved Trip Boards
// =============================================================
// Shows all trip boards. Each board card has a 2x2 thumbnail
// mosaic, name, count, and actions (share, rename, delete).
// Clicking a board shows its destinations inline.
// =============================================================

import { useState } from 'react'
import { useBoardsContext } from '../hooks/BoardsContext'
import { useDestinations } from '../hooks/useDestinations'
import MasonryGrid from '../components/MasonryGrid'
import ShareModal from '../components/ShareModal'

export default function BoardsPage() {
  const { boards, createBoard, deleteBoard, renameBoard } = useBoardsContext()
  const destinations = useDestinations()
  const [newName, setNewName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [expandedBoardId, setExpandedBoardId] = useState(null)
  const [sharingBoard, setSharingBoard] = useState(null)

  function handleCreate(e) {
    e.preventDefault()
    if (!newName.trim()) return
    createBoard(newName.trim())
    setNewName('')
    setIsCreating(false)
  }

  function getDestination(id) {
    return destinations.find((d) => d.id === id)
  }

  const expandedBoard = boards.find((b) => b.id === expandedBoardId)
  const expandedDestinations = expandedBoard
    ? expandedBoard.destinationIds.map(getDestination).filter(Boolean)
    : []

  return (
    <div className="max-w-[2520px] mx-auto px-6 md:px-10 xl:px-20 pt-8 pb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          {expandedBoard ? (
            <>
              <button
                onClick={() => setExpandedBoardId(null)}
                className="text-sm text-gray-500 hover:text-gray-900 mb-1 flex items-center gap-1 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                All boards
              </button>
              <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">
                {expandedBoard.name}
              </h1>
              <p className="text-gray-500 mt-1 text-[15px]">
                {expandedBoard.destinationIds.length} destination{expandedBoard.destinationIds.length !== 1 ? 's' : ''}
              </p>
            </>
          ) : (
            <h1 className="text-[32px] font-bold text-gray-900 tracking-tight">
              Saved
            </h1>
          )}
        </div>

        {!expandedBoard && !isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Create board
          </button>
        )}

        {expandedBoard && (
          <button
            onClick={() => setSharingBoard(expandedBoard)}
            className="px-4 py-2.5 text-sm font-medium border border-gray-300 rounded-lg hover:border-gray-900 transition-colors cursor-pointer"
          >
            Share
          </button>
        )}
      </div>

      {/* Create board form */}
      {isCreating && !expandedBoard && (
        <form onSubmit={handleCreate} className="mb-8 flex items-center gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Board name"
            className="px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-gray-900 w-64"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => { setIsCreating(false); setNewName('') }}
            className="px-4 py-2.5 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Expanded board view — show its destinations */}
      {expandedBoard ? (
        expandedDestinations.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No destinations yet
            </h3>
            <p className="text-sm text-gray-500">
              Go explore and save destinations to this board.
            </p>
          </div>
        ) : (
          <MasonryGrid destinations={expandedDestinations} />
        )
      ) : (
        /* Board grid — list of all boards */
        boards.length === 0 ? (
          <div className="text-center py-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No saved boards yet
            </h3>
            <p className="text-sm text-gray-500">
              Start exploring and save destinations you love.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
            {boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                destinations={board.destinationIds.map(getDestination).filter(Boolean)}
                onClick={() => setExpandedBoardId(board.id)}
                onDelete={() => deleteBoard(board.id)}
                onRename={(name) => renameBoard(board.id, name)}
                onShare={() => setSharingBoard(board)}
              />
            ))}
          </div>
        )
      )}

      {/* Share modal */}
      {sharingBoard && (
        <ShareModal board={sharingBoard} onClose={() => setSharingBoard(null)} />
      )}
    </div>
  )
}

function BoardCard({ board, destinations, onClick, onDelete, onRename, onShare }) {
  const [showMenu, setShowMenu] = useState(false)
  const thumbs = destinations.slice(0, 4)

  return (
    <div className="group cursor-pointer" onClick={onClick}>
      {/* 2x2 thumbnail mosaic */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 grid grid-cols-2 grid-rows-2 gap-0.5">
        {thumbs.map((dest) => (
          <img
            key={dest.id}
            src={dest.fallbackImageUrl}
            alt={dest.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        ))}
        {Array.from({ length: Math.max(0, 4 - thumbs.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="w-full h-full bg-gray-100" />
        ))}
      </div>

      {/* Board info */}
      <div className="mt-3 flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-[15px] text-gray-900">{board.name}</h3>
          <p className="text-sm text-gray-500">
            {board.destinationIds.length} saved
          </p>
        </div>

        {/* Menu */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-full hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
            </svg>
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-1 z-50">
              <button
                onClick={() => { onShare(); setShowMenu(false) }}
                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 text-gray-700 cursor-pointer"
              >
                Share
              </button>
              <button
                onClick={() => {
                  const name = prompt('Rename board:', board.name)
                  if (name?.trim()) onRename(name.trim())
                  setShowMenu(false)
                }}
                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 text-gray-700 cursor-pointer"
              >
                Rename
              </button>
              <button
                onClick={() => {
                  if (confirm('Delete this board?')) onDelete()
                  setShowMenu(false)
                }}
                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 text-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
