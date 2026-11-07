/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seo } from './seo'

export default defineConfig({
  plugins: [react(), seo()],
  test: {
    environment: 'node',
  },
})
