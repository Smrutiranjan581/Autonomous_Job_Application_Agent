import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/chat':           'http://localhost:8000',
      '/health':         'http://localhost:8000',
      '/report':         'http://localhost:8000',
      '/upload-resume':  'http://localhost:8000',
      '/upload-job':     'http://localhost:8000',
      '/generate-pdf':   'http://localhost:8000',
      '/download-pdf':   'http://localhost:8000',
    }
  }
})
