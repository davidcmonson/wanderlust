// =============================================================
// sharing.js — Board Sharing via URL
// =============================================================
// Encodes a board's data into a URL-safe string so users can
// share boards by copying a link. The recipient opens the link
// and sees the board in read-only mode.
//
// HOW IT WORKS:
// 1. Board data (name + destination IDs) → JSON string
// 2. JSON string → Base64 encoded string
// 3. Base64 string → embedded in URL hash (#)
//
// JAVASCRIPT CONCEPT: "Base64 encoding"
// Base64 converts binary/text data into a limited set of ASCII
// characters that are safe to put in URLs. It's not encryption —
// anyone can decode it — but it makes the data URL-friendly.
//
// WHY URL HASH (not query params)?
// The hash (#) portion of a URL is never sent to the server.
// This means shared board data stays entirely client-side —
// no backend needed. React Router reads it on the client.
// =============================================================

/**
 * Encode a board into a shareable URL string.
 *
 * @param {Object} board - The board object from localStorage
 * @returns {string} A URL-safe encoded string
 */
export function encodeBoard(board) {
  const payload = {
    n: board.name,               // Board name
    d: board.destinationIds,     // Destination IDs array
  }
  const json = JSON.stringify(payload)
  // btoa() converts a string to Base64
  return btoa(encodeURIComponent(json))
}

/**
 * Decode a shared board URL string back into board data.
 *
 * @param {string} encoded - The Base64-encoded string from the URL
 * @returns {Object|null} The decoded board data, or null if invalid
 */
export function decodeBoard(encoded) {
  try {
    const json = decodeURIComponent(atob(encoded))
    const payload = JSON.parse(json)
    return {
      name: payload.n || 'Shared Board',
      destinationIds: payload.d || [],
    }
  } catch {
    return null
  }
}

/**
 * Generate a full shareable URL for a board.
 *
 * @param {Object} board - The board object
 * @returns {string} The full URL to share
 */
export function getShareUrl(board) {
  const encoded = encodeBoard(board)
  return `${window.location.origin}/shared/${encoded}`
}

/**
 * Copy text to the clipboard.
 * Returns true if successful, false otherwise.
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    try {
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      return true
    } catch {
      return false
    }
  }
}
