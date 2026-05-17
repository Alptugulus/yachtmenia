import { useState } from 'react'
import { COMPANY } from '@/utils/constants'
import { BRAND_LOCKUP_ASPECT, BRAND_LOGO } from '@/utils/logos'

interface BrandLogoProps {
  variant: 'navbar' | 'footer' | 'loader'
  headerTone?: 'on-dark' | 'on-light'
  priority?: boolean
}

const LOCKUP_W = 300
const LOCKUP_H = 120

export function BrandLogo({ variant, priority = false }: BrandLogoProps) {
  const [failed, setFailed] = useState(false)
  const isFooter = variant === 'footer'

  if (failed) {
    return (
      <span
        className={`font-display text-2xl font-semibold tracking-tight ${
          isFooter ? 'text-white' : 'text-brand'
        } sm:text-3xl`}
      >
        {COMPANY.name}
      </span>
    )
  }

  const src = isFooter ? BRAND_LOGO.footer : BRAND_LOGO.navbarOnLight

  const heights = isFooter
    ? 'h-[40px] sm:h-[44px] md:h-[48px]'
    : 'h-[44px] sm:h-[48px] md:h-[52px] lg:h-[56px]'

  return (
    <img
      src={src}
      alt="Yachtmenia Yachting"
      width={LOCKUP_W}
      height={LOCKUP_H}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ aspectRatio: BRAND_LOCKUP_ASPECT }}
      className={`block w-auto max-w-[min(280px,78vw)] object-contain object-left ${heights}`}
      onError={() => setFailed(true)}
    />
  )
}
