// =============================================================
// useLocalStorage.js — Persistent State Hook
// =============================================================
// Works exactly like React's useState, but the value is saved
// to the browser's localStorage. This means the data survives
// page refreshes and even closing the browser.
//
// HOW IT WORKS:
// 1. On first load, reads from localStorage (or uses the default)
// 2. Every time the value changes, writes it to localStorage
// 3. Components use it just like useState — they don't need to
//    know the data is persisted
//
// JAVASCRIPT CONCEPT: "JSON.stringify / JSON.parse"
// localStorage can only store strings. We convert JavaScript
// objects to JSON strings for storage, and parse them back
// when reading. This is called "serialization."
// =============================================================

import { useState, useEffect } from 'react'

export default function useLocalStorage(key, defaultValue) {
  // Initialize state: try to read from localStorage, fall back to default
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : defaultValue
    } catch {
      // If JSON parsing fails, use the default
      return defaultValue
    }
  })

  // Whenever the value changes, save it to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage might be full or unavailable
    }
  }, [key, value])

  return [value, setValue]
}
