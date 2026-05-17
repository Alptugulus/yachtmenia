import { BrandAnchorSvg } from '@/components/common/BrandAnchorSvg'

interface BrandLogoProps {
  variant: 'navbar' | 'footer' | 'loader'
  headerTone?: 'on-dark' | 'on-light'
  /** @deprecated PNG kaldırıldı; API uyumluluğu */
  priority?: boolean
}

export function BrandLogo({ variant, headerTone = 'on-light' }: BrandLogoProps) {
  const onDark = variant === 'footer' || headerTone === 'on-dark'
  const ink = onDark ? 'text-white' : 'text-brand'

  const shellHeights =
    variant === 'loader'
      ? 'h-[56px] sm:h-[64px] md:h-[68px]'
      : variant === 'navbar'
        ? 'h-[56px] sm:h-[64px] md:h-[68px] lg:h-[72px]'
        : 'h-[56px] sm:h-[64px]'

  const titleSize =
    variant === 'loader'
      ? 'text-[1.2rem] sm:text-[1.35rem] md:text-[1.45rem]'
      : variant === 'navbar'
        ? 'text-[1.15rem] sm:text-[1.3rem] md:text-[1.42rem] lg:text-[1.52rem]'
        : 'text-[1.15rem] sm:text-[1.3rem]'

  const tagSize =
    variant === 'loader'
      ? 'text-[0.48rem] sm:text-[0.52rem]'
      : 'text-[0.46rem] sm:text-[0.5rem] md:text-[0.52rem]'

  return (
    <div
      role="img"
      aria-label="Yachtmenia Yachting"
      className={`flex min-w-0 max-w-[min(580px,96vw)] items-stretch gap-2 sm:gap-2.5 ${shellHeights} ${ink}`}
    >
      <BrandAnchorSvg className="h-full w-auto shrink-0" />
      <div className="flex min-w-0 flex-col justify-center leading-none">
        <span
          className={`font-display font-semibold tracking-[0.04em] ${titleSize}`}
          style={{ fontFeatureSettings: '"liga" 1' }}
        >
          YACHTMENIA
        </span>
        <span
          className={`mt-1 font-sans font-semibold uppercase tracking-[0.34em] opacity-90 ${tagSize}`}
        >
          YACHTING
        </span>
      </div>
    </div>
  )
}
