import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['clima.rifeeh.com'],
    host: '0.0.0.0',
    port: 3000
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
