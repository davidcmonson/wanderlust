// =============================================================
// unsplash.js — Unsplash API Client with Caching
// =============================================================
// Fetches beautiful photos from Unsplash's free API. The free
// tier allows 50 requests per hour, so we cache aggressively:
//
// Layer 1: In-memory Map — fastest, lost on page navigation
// Layer 2: sessionStorage — survives page refreshes
// Layer 3: fallbackImageUrl — always available, zero API calls
//
// If the API is rate-limited (HTTP 429), we silently fall back
// to the destination's pre-seeded fallback image. The user
// never sees an error.
// =============================================================

// In-memory cache — a Map object that stores results during
// the current page session. Fastest lookup, but lost on refresh.
const memoryCache = new Map()

// The session storage key prefix
const CACHE_PREFIX = 'unsplash_'

/**
 * Fetch a photo URL for a destination from Unsplash.
 * Returns the fallback URL if anything goes wrong.
 *
 * @param {string} query - Search term (e.g., "bali indonesia temple")
 * @param {string} fallbackUrl - Pre-seeded image URL to use if API fails
 * @returns {Promise<string>} The image URL to display
 */
export async function fetchDestinationImage(query, fallbackUrl) {
  // Check memory cache first (instant)
  if (memoryCache.has(query)) {
    return memoryCache.get(query)
  }

  // Check sessionStorage next (fast, survives refresh)
  try {
    const cached = sessionStorage.getItem(CACHE_PREFIX + query)
    if (cached) {
      memoryCache.set(query, cached) // Promote to memory cache
      return cached
    }
  } catch {
    // sessionStorage might be unavailable (private browsing, etc.)
  }

  // No API key configured — use fallback
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    return fallbackUrl
  }

  // Fetch from Unsplash API
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    )

    // Rate limited — fall back silently
    if (response.status === 429) {
      return fallbackUrl
    }

    if (!response.ok) {
      return fallbackUrl
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      // Get the "regular" size — good quality without being huge
      const imageUrl = data.results[0].urls.regular
      // Cache it at both layers
      memoryCache.set(query, imageUrl)
      try {
        sessionStorage.setItem(CACHE_PREFIX + query, imageUrl)
      } catch {
        // Storage full or unavailable — that's okay
      }
      return imageUrl
    }

    return fallbackUrl
  } catch {
    // Network error — fall back silently
    return fallbackUrl
  }
}

/**
 * Prefetch images for multiple destinations at once.
 * Useful when search results change — fetch all visible images
 * in parallel to fill the cache.
 *
 * @param {Array} destinations - Array of destination objects
 */
export async function prefetchImages(destinations) {
  const uncached = destinations.filter(
    (d) => !memoryCache.has(d.unsplashQuery)
  )

  // Fetch up to 10 at a time to avoid hammering the API
  const batch = uncached.slice(0, 10)
  await Promise.allSettled(
    batch.map((d) => fetchDestinationImage(d.unsplashQuery, d.fallbackImageUrl))
  )
}
