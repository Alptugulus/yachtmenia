import { useState } from 'react'
import { COMPANY } from '@/utils/constants'
import { BRAND_LOGO, BRAND_LOGO_2X, brandLogoSrcSet } from '@/utils/logos'

interface BrandLogoProps {
  variant: 'navbar' | 'footer'
  headerTone?: 'on-dark' | 'on-light'
  /** LCP / above-the-fold */
  priority?: boolean
}

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
      ? 'contrast-[1.14] saturate-[1.06] brightness-[0.98] drop-shadow-[0_1px_0_rgb(0_0_50/0.14)]'
      : onDark
        ? 'drop-shadow-[0_2px_8px_rgb(0_0_0/0.35)]'
        : ''

  if (variant === 'navbar') {
    return (
      <img
        src={src}
        srcSet={srcSet}
        sizes="(max-width: 640px) 72vw, (max-width: 1024px) 380px, 440px"
        alt="Yachtmenia Yachting"
        width={918}
        height={836}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={`block w-auto max-w-[min(440px,82vw)] object-contain object-left motion-safe:transition-[filter,transform] motion-safe:duration-200 motion-safe:group-hover:brightness-[1.02] h-[3.5rem] min-h-[56px] sm:h-[4rem] md:h-[4.35rem] lg:h-[4.65rem] ${enhanceOnLight}`}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <img
      src={BRAND_LOGO.footer}
      srcSet={`${BRAND_LOGO.footer} 1x, ${BRAND_LOGO_2X.footer} 2x`}
      sizes="(max-width: 640px) 65vw, 280px"
      alt="Yachtmenia Yachting"
      width={918}
      height={836}
      loading="lazy"
      decoding="async"
      className={`block h-28 w-auto max-w-[min(300px,72vw)] object-contain object-left sm:h-32 ${enhanceOnLight || 'drop-shadow-[0_2px_10px_rgb(0_0_0/0.3)]'}`}
      onError={() => setFailed(true)}
    />
  )
}
