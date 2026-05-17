import { useState } from 'react'
import { COMPANY } from '@/utils/constants'
import { BRAND_LOCKUP_ASPECT, BRAND_LOGO } from '@/utils/logos'

interface BrandLogoProps {
  variant: 'navbar' | 'footer' | 'loader'
  headerTone?: 'on-dark' | 'on-light'
  priority?: boolean
}

const FOOTER_ASPECT = 300 / 120

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
    ? 'h-[48px] sm:h-[52px]'
    : variant === 'loader'
      ? 'h-[56px] sm:h-[64px] md:h-[68px]'
      : 'h-[56px] sm:h-[64px] md:h-[68px] lg:h-[72px]'

  const aspect = isFooter ? FOOTER_ASPECT : BRAND_LOCKUP_ASPECT
  const width = isFooter ? 300 : 918
  const height = isFooter ? 120 : 340

  return (
    <img
      src={src}
      alt="Yachtmenia Yachting"
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      style={{ aspectRatio: aspect }}
      className={`block w-auto max-w-[min(560px,94vw)] object-contain object-left ${heights}`}
      onError={() => setFailed(true)}
    />
  )
}
