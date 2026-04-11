// =============================================================
// main.jsx — The Very First File That Runs
// =============================================================
// This file is the "entry point" — the starting line of the app.
// It does two things:
//   1. Finds the <div id="root"> in index.html
//   2. Tells React to render our App component inside it
//
// REACT CONCEPT: "StrictMode"
// StrictMode is a development tool that warns you about potential
// problems in your code. It doesn't affect the production app —
// think of it as training wheels that highlight mistakes early.
//
// REACT CONCEPT: "createRoot"
// This is how React "takes control" of a piece of the HTML page.
// After this runs, React manages everything inside the #root div.
// =============================================================

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Find the #root div in index.html and render our React app inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
