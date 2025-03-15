// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     include: ["twilio-video"],  // Ensure Twilio Video is bundled properly
//   },
//   publicDir: 'public',
//   server: {
//     fs: {
//       // Allow serving files from one level up to the project root
//       allow: ['..']
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["twilio-video"],  // Ensure Twilio Video is bundled properly
  },
  publicDir: 'public',
  server: {
    proxy: {
      "/api": {  // Redirect API calls to backend
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..']
    }
  }
})
