/** `public/` kökündeki dosyalar; deploy için `BASE_URL` ile birleştirilir. */
export function publicAsset(filename: string): string {
  const base = import.meta.env.BASE_URL
  const path = filename.startsWith('/') ? filename.slice(1) : filename
  return `${base}${path}`
}
