/**
 * Absolute site origin for canonicals, OG images, and JSON-LD.
 * Prefer runtime `window` in the browser; set `VITE_SITE_URL` for prerender/SSR builds.
 */
export function getSiteOrigin(): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  const fromEnv = (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/$/, '')
  return fromEnv
}
