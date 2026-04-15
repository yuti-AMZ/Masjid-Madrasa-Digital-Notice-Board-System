import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // This allows Vite to pull files from the root /services folder 
      // even though it's outside of the /src folder.
      allow: ['../../..'] 
    }
  }
})
