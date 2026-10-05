import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs so the same build works at a domain root
  // (Hostinger) and in a subfolder (XAMPP: /udyam).
  base: './',
  plugins: [react(), tailwindcss()],
})
