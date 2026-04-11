// =============================================================
// useBoards.js — Trip Board Management Hook
// =============================================================
// Provides CRUD operations for trip boards, backed by localStorage.
// A "board" is a named collection of saved destinations — like
// a Pinterest board but for travel.
//
// CRUD = Create, Read, Update, Delete — the four basic operations
// any data management system needs.
//
// JAVASCRIPT CONCEPT: "Immutable Updates"
// We never modify the boards array directly. Instead, we create
// a new array with the change applied. This is important in React
// because it can detect changes by comparing references — if we
// mutated the same array, React wouldn't know to re-render.
// =============================================================

import useLocalStorage from './useLocalStorage'

export default function useBoards() {
  const [boards, setBoards] = useLocalStorage('wanderlust-boards', [])

  // Create a new board with a name
  function createBoard(name) {
    const newBoard = {
      id: `board-${Date.now()}`, // Unique ID using timestamp
      name,
      createdAt: new Date().toISOString(),
      destinationIds: [],
      notes: '',
    }
    setBoards([newBoard, ...boards]) // Add to the beginning
    return newBoard
  }

  // Add a destination to a board
  function addDestination(boardId, destinationId) {
    setBoards(boards.map((board) =>
      board.id === boardId && !board.destinationIds.includes(destinationId)
        ? { ...board, destinationIds: [...board.destinationIds, destinationId] }
        : board
    ))
  }

  // Remove a destination from a board
  function removeDestination(boardId, destinationId) {
    setBoards(boards.map((board) =>
      board.id === boardId
        ? { ...board, destinationIds: board.destinationIds.filter((id) => id !== destinationId) }
        : board
    ))
  }

  // Check if a destination is saved to any board
  function isSaved(destinationId) {
    return boards.some((board) => board.destinationIds.includes(destinationId))
  }

  // Get all boards that contain a specific destination
  function getBoardsForDestination(destinationId) {
    return boards.filter((board) => board.destinationIds.includes(destinationId))
  }

  // Rename a board
  function renameBoard(boardId, newName) {
    setBoards(boards.map((board) =>
      board.id === boardId ? { ...board, name: newName } : board
    ))
  }

  // Update board notes
  function updateNotes(boardId, notes) {
    setBoards(boards.map((board) =>
      board.id === boardId ? { ...board, notes } : board
    ))
  }

  // Delete a board
  function deleteBoard(boardId) {
    setBoards(boards.filter((board) => board.id !== boardId))
  }

  return {
    boards,
    createBoard,
    addDestination,
    removeDestination,
    isSaved,
    getBoardsForDestination,
    renameBoard,
    updateNotes,
    deleteBoard,
  }
}
