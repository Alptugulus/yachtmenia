import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** Tüm client-side yollar için: build çıktısına 404.html kopyası (GitHub Pages). Netlify: public/_redirects; Apache: public/.htaccess; Vercel: vercel.json */
function spaFallback404Html(): Plugin {
  let outDirAbs = ''
  return {
    name: 'spa-fallback-404-html',
    configResolved(config) {
      outDirAbs = path.resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const indexHtml = path.join(outDirAbs, 'index.html')
      const notFoundHtml = path.join(outDirAbs, '404.html')
      if (fs.existsSync(indexHtml)) {
        fs.copyFileSync(indexHtml, notFoundHtml)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback404Html()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('react-dom') || id.includes('/react/')) return 'vendor-react'
          if (id.includes('react-router')) return 'vendor-router'
          if (id.includes('i18next') || id.includes('react-i18next')) return 'vendor-i18n'
          if (id.includes('lucide-react')) return 'vendor-icons'
        },
      },
    },
  },
})
