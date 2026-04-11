// =============================================================
// ScrollToTop.jsx — Reset Scroll on Navigation
// =============================================================
// When the user navigates to a new page (e.g., clicks a card),
// the browser keeps the scroll position from the previous page.
// This component resets the scroll to the top on every route change.
// =============================================================

import { useEffect } from 'react'
import { useLocation } from 'react-router'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null // This component doesn't render anything
}
