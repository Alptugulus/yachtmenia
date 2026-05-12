import type { Config } from 'tailwindcss'

/**
 * Tailwind v4 primary configuration lives in `src/styles/globals.css` (`@theme`).
 * This file remains for tooling compatibility and future `@config` extensions.
 */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
} satisfies Config
