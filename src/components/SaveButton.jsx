// =============================================================
// SaveButton.jsx — Heart Icon Save Button
// =============================================================
// A small heart button overlaid on each destination card.
// Clicking it opens a dropdown where users can:
//   - Save to an existing board
//   - Create a new board and save to it
//   - Remove from a board
//
// DESIGN: Airbnb uses a heart icon in the top-right corner of
// listing cards. Filled = saved, outlined = not saved.
// =============================================================

import { useState, useRef, useEffect } from 'react'

export default function SaveButton({
  destinationId,
  boards,
  isSaved,
  onSave,
  onRemove,
  onCreateBoard,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [newBoardName, setNewBoardName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const ref = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
        setIsCreating(false)
        setNewBoardName('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleCreateAndSave(e) {
    e.preventDefault()
    if (!newBoardName.trim()) return
    const board = onCreateBoard(newBoardName.trim())
    onSave(board.id, destinationId)
    setNewBoardName('')
    setIsCreating(false)
    setIsOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      {/* Heart button */}
      <button
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen) }}
        className="p-2 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
        aria-label={isSaved ? 'Saved' : 'Save'}
      >
        {isSaved ? (
          // Filled heart
          <svg className="w-6 h-6 text-[#FF385C]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        ) : (
          // Outlined heart
          <svg className="w-6 h-6 text-gray-600 hover:text-gray-900" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {/* Existing boards */}
          {boards.length > 0 && (
            <div className="pb-1 mb-1 border-b border-gray-100">
              {boards.map((board) => {
                const isInBoard = board.destinationIds.includes(destinationId)
                return (
                  <button
                    key={board.id}
                    onClick={() => {
                      if (isInBoard) {
                        onRemove(board.id, destinationId)
                      } else {
                        onSave(board.id, destinationId)
                      }
                      setIsOpen(false)
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className={isInBoard ? 'font-medium text-gray-900' : 'text-gray-700'}>
                      {board.name}
                    </span>
                    {isInBoard && (
                      <svg className="w-4 h-4 text-[#FF385C]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* Create new board */}
          {isCreating ? (
            <form onSubmit={handleCreateAndSave} className="px-3 py-2">
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="Board name"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900"
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setNewBoardName('') }}
                  className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              Create new board
            </button>
          )}
        </div>
      )}
    </div>
  )
}
