import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
//export default defineConfig({
// plugins: [
//    react(),
//    tailwindcss()
//  ],
//})


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      // qualquer requisição que comece com /api vai ser redirecionada para a API real
      '/api': {
        target: 'http://52.202.29.119:9090', // URL do seu backend
        changeOrigin: true,                   // garante que o host seja alterado
        rewrite: (path) => path.replace(/^\/api/, ''), // remove o prefixo /api
      },
    },
  },
})
