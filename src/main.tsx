import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { initI18n } from '@/i18n'
import App from './App'
import 'lenis/dist/lenis.css'
import '@/styles/globals.css'

document.documentElement.classList.remove('dark')

await initI18n()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
