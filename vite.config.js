import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' hace que las rutas de los archivos sean relativas,
// así el sitio funciona dentro de la carpeta del repositorio en GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
