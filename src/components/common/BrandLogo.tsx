import { useState } from 'react'
import { COMPANY } from '@/utils/constants'
import { BRAND_LOCKUP_ASPECT, BRAND_LOGO, brandLogoSrcSet } from '@/utils/logos'

interface BrandLogoProps {
  variant: 'navbar' | 'footer'
  headerTone?: 'on-dark' | 'on-light'
  /** LCP / above-the-fold */
  priority?: boolean
}

const LOCKUP_W = 918
const LOCKUP_H = 340

export function BrandLogo({ variant, headerTone = 'on-light', priority = false }: BrandLogoProps) {
  const [failed, setFailed] = useState(false)
  const onDark = variant === 'footer' || headerTone === 'on-dark'

  if (failed) {
    return (
      <span
        className={`font-display font-semibold tracking-tight ${
          variant === 'navbar'
            ? onDark
              ? 'text-2xl text-white sm:text-3xl'
              : 'text-2xl text-brand sm:text-3xl'
            : 'text-3xl text-white sm:text-4xl'
        }`}
      >
        {COMPANY.name}
      </span>
    )
  }

  const src = onDark ? BRAND_LOGO.navbarOnDark : BRAND_LOGO.navbarOnLight
  const srcSet = brandLogoSrcSet(onDark)

  const enhanceOnLight =
    variant === 'navbar' && !onDark
      ? 'contrast-[1.12] saturate-[1.05] drop-shadow-[0_1px_0_rgb(0_0_50/0.12)]'
      : onDark
        ? 'drop-shadow-[0_2px_8px_rgb(0_0_0/0.35)]'
        : ''

  /** Yatay lockup: yükseklik sabit, genişlik orana göre — yazı okunaklı kalır */
  const lockupHeights =
    variant === 'navbar'
      ? 'h-[2.85rem] min-h-[46px] sm:h-[3.35rem] md:h-[3.65rem] lg:h-[4rem]'
      : 'h-16 sm:h-[4.25rem]'

  const lockupMaxW =
    variant === 'navbar'
      ? 'max-w-[min(520px,92vw)]'
      : 'max-w-[min(400px,88vw)]'

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={
        variant === 'navbar'
          ? '(max-width: 640px) 88vw, (max-width: 1024px) 480px, 520px'
          : '(max-width: 640px) 80vw, 400px'
      }
      alt="Yachtmenia Yachting"
      width={LOCKUP_W}
      height={LOCKUP_H}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ aspectRatio: BRAND_LOCKUP_ASPECT }}
      className={`block w-auto object-contain object-left ${lockupHeights} ${lockupMaxW} motion-safe:transition-[filter,transform] motion-safe:duration-200 motion-safe:group-hover:brightness-[1.02] ${enhanceOnLight}`}
      onError={() => setFailed(true)}
    />
  )
}
