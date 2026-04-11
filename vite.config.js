// =============================================================
// vite.config.js — Vite Configuration
// =============================================================
// "base" tells Vite the URL path the app will be served from.
// On GitHub Pages, the app lives at /wanderlust/ (repo name).
// Locally (dev server), it's just /.
// =============================================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/wanderlust/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
