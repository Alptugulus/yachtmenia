const RASTER_EXT = /\.(jpe?g|png)$/i

/** /media/foo.jpg → modern format yolları (optimize-media betiği ile üretilir). */
export function rasterSources(fallbackPath: string): { avif: string; webp: string; fallback: string } {
  const base = fallbackPath.replace(RASTER_EXT, '')
  return {
    avif: `${base}.avif`,
    webp: `${base}.webp`,
    fallback: fallbackPath,
  }
}
