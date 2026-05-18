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

/** Dev: public/ medya ve logo değişince tam sayfa yenile; tarayıcı önbelleğini kapat. */
function devFreshAssets(): Plugin {
  const publicDir = path.resolve(__dirname, 'public')
  return {
    name: 'dev-fresh-assets',
    apply: 'serve',
    configureServer(server) {
      const reloadIfPublic = (file: string) => {
        if (file.startsWith(publicDir)) {
          server.ws.send({ type: 'full-reload', path: '*' })
        }
      }
      server.watcher.on('change', reloadIfPublic)
      server.watcher.on('add', reloadIfPublic)

      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] ?? ''
        if (
          url.startsWith('/media/') ||
          url.includes('logo') ||
          /\.(?:avif|webp|jpe?g|png|svg)$/i.test(url)
        ) {
          res.setHeader('Cache-Control', 'no-store, must-revalidate')
          res.setHeader('Pragma', 'no-cache')
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), devFreshAssets(), spaFallback404Html()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: 'localhost',
    hmr: {
      host: 'localhost',
      port: 5173,
      clientPort: 5173,
    },
    headers: {
      'Cache-Control': 'no-store',
    },
    watch: {
      // macOS + IDE kaydetme: native fs events bazen düşer; polling ile HMR güvenilir kalır
      usePolling: true,
      interval: 100,
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
