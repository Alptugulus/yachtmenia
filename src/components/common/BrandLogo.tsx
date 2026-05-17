import { useState } from 'react'
import { COMPANY } from '@/utils/constants'
import { BRAND_LOCKUP_ASPECT, BRAND_LOGO, brandLogoSrcSet } from '@/utils/logos'

interface BrandLogoProps {
  variant: 'navbar' | 'footer'
  headerTone?: 'on-dark' | 'on-light'
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

  const lockupHeights =
    variant === 'navbar'
      ? 'h-[3rem] min-h-[48px] sm:h-[3.5rem] md:h-[3.85rem] lg:h-[4.15rem]'
      : 'h-[3.25rem] sm:h-[4rem]'

  const lockupMaxW =
    variant === 'navbar' ? 'max-w-[min(560px,94vw)]' : 'max-w-[min(440px,90vw)]'

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={
        variant === 'navbar'
          ? '(max-width: 640px) 92vw, (max-width: 1200px) 520px, 560px'
          : '(max-width: 640px) 85vw, 440px'
      }
      alt="Yachtmenia Yachting"
      width={LOCKUP_W}
      height={LOCKUP_H}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="sync"
      style={{ aspectRatio: BRAND_LOCKUP_ASPECT }}
      className={`block w-auto shrink-0 object-contain object-left ${lockupHeights} ${lockupMaxW} ${
        onDark ? '' : 'opacity-100'
      }`}
      onError={() => setFailed(true)}
    />
  )
}
