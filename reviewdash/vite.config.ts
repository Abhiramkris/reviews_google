import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  base: '/reviewdash/',
  server: {
    port: 5180,
  },
  plugins: [react()],
})
