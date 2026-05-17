import { useState } from 'react'
import { COMPANY } from '@/utils/constants'
import { BRAND_LOGO } from '@/utils/logos'

const NAVBAR_LOGO_DARK_SRC = BRAND_LOGO.navbarOnDark
const NAVBAR_LOGO_LIGHT_SRC = BRAND_LOGO.navbarOnLight
const FOOTER_LOGO_SRC = BRAND_LOGO.footer

interface BrandLogoProps {
  variant: 'navbar' | 'footer'
  headerTone?: 'on-dark' | 'on-light'
}

export function BrandLogo({ variant, headerTone = 'on-light' }: BrandLogoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={`font-display font-semibold tracking-tight ${
          variant === 'navbar'
            ? headerTone === 'on-dark'
              ? 'text-xl text-white sm:text-2xl'
              : 'text-2xl text-primary sm:text-3xl'
            : 'text-3xl text-white sm:text-4xl'
        }`}
      >
        {COMPANY.name}
      </span>
    )
  }

  const src =
    variant === 'footer'
      ? FOOTER_LOGO_SRC
      : headerTone === 'on-dark'
        ? NAVBAR_LOGO_DARK_SRC
        : NAVBAR_LOGO_LIGHT_SRC

  if (variant === 'navbar') {
    return (
      <img
        src={src}
        alt="Yachtmenia Yachting"
        width={480}
        height={128}
        loading="eager"
        decoding="async"
        className="block h-14 w-auto max-w-[min(340px,78vw)] object-contain object-left sm:h-16 md:h-[4.25rem] lg:h-[4.75rem]"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <img
      src={src}
      alt="Yachtmenia Yachting"
      width={280}
      height={360}
      loading="lazy"
      decoding="async"
      className="block h-24 w-auto max-w-[min(220px,58vw)] object-contain object-left sm:h-28"
      onError={() => setFailed(true)}
    />
  )
}
