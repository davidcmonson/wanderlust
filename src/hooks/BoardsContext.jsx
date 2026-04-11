// =============================================================
// BoardsContext.jsx — Shared Board State
// =============================================================
// React Context lets you share data across many components
// without passing it through every level of the component tree.
//
// REACT CONCEPT: "Context"
// Think of Context like a radio broadcast. The Provider is the
// radio station (it broadcasts data), and any component can tune
// in with useContext to receive that data. Without Context,
// you'd have to pass boards as a prop through every component
// between App and DestinationCard — messy and fragile.
//
// REACT CONCEPT: "Provider pattern"
// We wrap the app in <BoardsProvider>, which creates the boards
// state and makes it available to all child components via
// the useBoardsContext() hook.
// =============================================================

import { createContext, useContext } from 'react'
import useBoards from './useBoards'

// Create the context (the "radio frequency")
const BoardsContext = createContext(null)

// The Provider component (the "radio station")
export function BoardsProvider({ children }) {
  // useBoards creates all the board state and operations
  const boardsData = useBoards()

  return (
    <BoardsContext.Provider value={boardsData}>
      {children}
    </BoardsContext.Provider>
  )
}

// The consumer hook (the "radio receiver")
// Any component can call useBoardsContext() to access boards
export function useBoardsContext() {
  const context = useContext(BoardsContext)
  if (!context) {
    throw new Error('useBoardsContext must be used within a BoardsProvider')
  }
  return context
}
