import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["twilio-video"],  // Ensure Twilio Video is bundled properly
  },
})
