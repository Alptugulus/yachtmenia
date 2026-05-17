import type { ImgHTMLAttributes } from 'react'
import { rasterSources } from '@/utils/rasterSources'

type ResponsiveImageProps = {
  src: string
  alt: string
  /** <picture> üzerinde (örn. absolute inset-0) */
  pictureClassName?: string
  /** <img> üzerinde (örn. h-full w-full object-cover) */
  className?: string
} & Pick<
  ImgHTMLAttributes<HTMLImageElement>,
  'loading' | 'decoding' | 'fetchPriority' | 'width' | 'height' | 'sizes'
>

/**
 * AVIF + WebP + JPEG/PNG fallback. Kaynak yolları data’da .jpg kalır;
 * build öncesi `npm run optimize:media` ile .avif/.webp üretin.
 */
export function ResponsiveImage({
  src,
  alt,
  pictureClassName,
  className,
  loading,
  decoding,
  fetchPriority,
  width,
  height,
  sizes,
}: ResponsiveImageProps) {
  const { avif, webp, fallback } = rasterSources(src)

  return (
    <picture className={pictureClassName}>
      <source type="image/avif" srcSet={avif} />
      <source type="image/webp" srcSet={webp} />
      <img
        src={fallback}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        width={width}
        height={height}
        sizes={sizes}
        onError={(e) => {
          const img = e.currentTarget
          if (img.src !== fallback && !img.dataset.fallbackApplied) {
            img.dataset.fallbackApplied = '1'
            img.src = fallback
          }
        }}
      />
    </picture>
  )
}
