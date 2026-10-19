/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js (~137 KB gzip) va en un fragmento aparte que solo se descarga al interactuar con el hero.
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: 'node',
  },
})
