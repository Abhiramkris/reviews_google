import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/clientReview/',
  server: {
    port: 5182,
  },
  plugins: [react()],
})
