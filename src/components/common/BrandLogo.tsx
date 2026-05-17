import { useState } from 'react'
import { COMPANY } from '@/utils/constants'
import { BRAND_LOCKUP_ASPECT, BRAND_LOGO } from '@/utils/logos'

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

  /** Tam piksel yükseklik — kesirli rem subpixel tırtıklığı önlenir */
  const lockupHeights =
    variant === 'navbar'
      ? 'h-[56px] sm:h-[64px] md:h-[68px] lg:h-[72px]'
      : 'h-[56px] sm:h-[64px]'

  const lockupMaxW =
    variant === 'navbar' ? 'max-w-[min(580px,96vw)]' : 'max-w-[min(460px,92vw)]'

  return (
    <img
      src={src}
      alt="Yachtmenia Yachting"
      width={LOCKUP_W}
      height={LOCKUP_H}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="sync"
      style={{ aspectRatio: BRAND_LOCKUP_ASPECT }}
      className={`brand-lockup block w-auto shrink-0 object-contain object-left ${lockupHeights} ${lockupMaxW}`}
      onError={() => setFailed(true)}
    />
  )
}
