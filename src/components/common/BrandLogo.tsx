import { useState } from 'react'
import { COMPANY } from '@/utils/constants'
import { BRAND_LOCKUP_ASPECT, BRAND_LOGO } from '@/utils/logos'

interface BrandLogoProps {
  variant: 'navbar' | 'footer' | 'loader'
  headerTone?: 'on-dark' | 'on-light'
  priority?: boolean
}

const FOOTER_W = 300
const FOOTER_H = 120
const LOCKUP_W = 918
const LOCKUP_H = 340

export function BrandLogo({ variant, priority = false }: BrandLogoProps) {
  const [failed, setFailed] = useState(false)
  const isFooter = variant === 'footer'

  if (failed) {
    return (
      <span className="font-display text-2xl font-semibold tracking-tight text-brand sm:text-3xl">
        {COMPANY.name}
      </span>
    )
  }

  const src = isFooter ? BRAND_LOGO.footer : BRAND_LOGO.navbarOnLight

  const heights = isFooter
    ? 'h-[40px] sm:h-[44px] md:h-[48px]'
    : 'h-[52px] sm:h-[58px] md:h-[62px] lg:h-[66px]'

  return (
    <img
      src={src}
      alt="Yachtmenia Yachting"
      width={isFooter ? FOOTER_W : LOCKUP_W}
      height={isFooter ? FOOTER_H : LOCKUP_H}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ aspectRatio: isFooter ? FOOTER_W / FOOTER_H : BRAND_LOCKUP_ASPECT }}
      className={`block w-auto max-w-[min(520px,92vw)] object-contain object-left ${heights}`}
      onError={() => setFailed(true)}
    />
  )
}
