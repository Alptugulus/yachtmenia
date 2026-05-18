import { ResponsiveImage } from '@/components/common/ResponsiveImage'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'
import { useScrollY } from '@/hooks/useScrollY'

type HeroBackdropProps = {
  src: string
  alt: string
  /** Tam ekran ana sayfa vs. iç sayfa başlığı */
  variant?: 'home' | 'page'
  priority?: boolean
  /** Subtle scroll parallax on the photo layer */
  parallax?: boolean
}

/**
 * Hero arka planı: görsel z-0’da tam kaplar; metin için hafif soldan scrim, sağ taraf aydınlık kalır.
 */
export function HeroBackdrop({
  src,
  alt,
  variant = 'page',
  priority = false,
  parallax = false,
}: HeroBackdropProps) {
  const isHome = variant === 'home'
  const motionAllowed = useMotionAllowed()
  const scrollY = useScrollY()

  const parallaxActive = parallax && motionAllowed
  const offset = parallaxActive ? scrollY * 0.38 : 0
  const scale = parallaxActive ? 1.12 : 1

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 will-change-transform"
        style={
          parallaxActive
            ? { transform: `translate3d(0, ${offset}px, 0) scale(${scale})` }
            : undefined
        }
      >
        <ResponsiveImage
          src={src}
          alt={alt}
          pictureClassName="absolute inset-0 block h-full min-h-full w-full"
          className="h-full min-h-full w-full object-cover object-center brightness-[1.08] contrast-[1.02] saturate-[1.12]"
          width={1920}
          height={1080}
          sizes="100vw"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
        />
      </div>
      <div
        className={
          isHome
            ? 'absolute inset-0 bg-gradient-to-r from-brand/62 via-brand/30 to-brand/5'
            : 'absolute inset-0 bg-gradient-to-r from-brand/48 via-brand/18 to-transparent'
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand/35 via-transparent to-transparent" />
    </div>
  )
}
