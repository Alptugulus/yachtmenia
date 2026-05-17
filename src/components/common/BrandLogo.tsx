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
    ? 'h-[52px] sm:h-[56px] md:h-[60px] lg:h-[64px]'
    : 'h-[52px] sm:h-[58px] md:h-[64px] lg:h-[72px]'

  const maxW = isFooter ? 'max-w-[min(300px,92vw)]' : 'max-w-[min(340px,88vw)]'

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
      className={`block w-auto object-contain object-left ${maxW} ${heights}`}
      onError={() => setFailed(true)}
    />
  )
}
