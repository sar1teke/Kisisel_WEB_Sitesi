import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base : "/Kisisel_WEB_Sitesi",
  plugins: [react()],
})
