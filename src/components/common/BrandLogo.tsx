import { useState } from 'react'
import { COMPANY } from '@/utils/constants'
import { BRAND_LOGO } from '@/utils/logos'

const NAVBAR_LOGO_DARK_SRC = BRAND_LOGO.navbarOnDark
const NAVBAR_LOGO_LIGHT_SRC = BRAND_LOGO.navbarOnLight
const FOOTER_LOGO_SRC = BRAND_LOGO.footer

interface BrandLogoProps {
  variant: 'navbar' | 'footer'
  /** Navbar: hero bar (dark translucent) vs scrolled / inner pages (light bar) */
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
              ? 'text-lg text-white sm:text-xl'
              : 'text-lg text-primary sm:text-xl'
            : 'text-2xl text-white'
        }`}
      >
        {COMPANY.name}
      </span>
    )
  }

  /* Koyu üst barda çerçeve (ring) kullanma — PNG küçük kalıyor ve köşeler çirkin görünüyor. */
  const shell = 'inline-flex shrink-0 items-center'

  const imgClass =
    variant === 'navbar'
      ? headerTone === 'on-dark'
        ? 'block h-16 w-auto max-w-[min(360px,78vw)] object-contain object-left sm:h-[4.25rem] md:h-[4.5rem]'
        : 'block h-[4.25rem] w-auto max-w-[min(360px,78vw)] object-contain object-left sm:h-[4.5rem] md:h-[4.75rem]'
      : 'block h-24 w-auto max-w-[min(360px,92vw)] object-contain object-left sm:h-28 md:h-32'

  const src =
    variant === 'footer'
      ? FOOTER_LOGO_SRC
      : headerTone === 'on-dark'
        ? NAVBAR_LOGO_DARK_SRC
        : NAVBAR_LOGO_LIGHT_SRC

  return (
    <span className={shell}>
      <img
        src={src}
        alt="Yachtmenia Yachting"
        width={400}
        height={104}
        loading={variant === 'navbar' ? 'eager' : 'lazy'}
        decoding="async"
        className={imgClass}
        onError={() => setFailed(true)}
      />
    </span>
  )
}
