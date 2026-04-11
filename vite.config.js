// =============================================================
// vite.config.js — Vite Configuration
// =============================================================
// This file tells Vite (our build tool) how to process our code.
// "Plugins" are add-ons that give Vite extra abilities.
// - react(): Lets Vite understand React's JSX syntax
// - tailwindcss(): Lets Vite process Tailwind CSS utility classes
// =============================================================

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // Enables React support (JSX, fast refresh)
    tailwindcss(),  // Enables Tailwind CSS utility classes
  ],
})
