/**
 * Yatay lockup — @2x kaynak (lanczos küçültme, sharpen yok).
 */
import lockupDark from '@/assets/brand/lockup-dark@2x.png'
import lockupLight from '@/assets/brand/lockup-light@2x.png'
import { publicAsset } from '@/utils/publicAsset'

const inLogos = (name: string) => publicAsset(`media/logos/${name}`)

export const BRAND_LOCKUP_ASPECT = 918 / 340

export const BRAND_LOGO = {
  navbarOnLight: lockupLight,
  navbarOnDark: lockupDark,
  footer: lockupDark,
} as const

export const BRAND_LOGO_PUBLIC_URL = inLogos('lockup-light.png')

export const LOGOS = {
  refit: {
    verticalLight: inLogos('refit-vertical-light.png'),
    verticalDark: inLogos('refit-vertical-dark.png'),
    horizontalLight: inLogos('refit-horizontal-light.png'),
    horizontalDark: inLogos('refit-horizontal-dark.png'),
  },
  yachting: {
    verticalLight: inLogos('yachting-vertical-light.png'),
    verticalDark: inLogos('yachting-vertical-dark.png'),
    horizontalLight: inLogos('yachting-horizontal-light.png'),
    horizontalDark: inLogos('yachting-horizontal-dark.png'),
  },
  brokerage: {
    verticalLight: inLogos('brokerage-vertical-light.png'),
    verticalDark: inLogos('brokerage-vertical-dark.png'),
    horizontalLight: inLogos('brokerage-horizontal-light.png'),
    horizontalDark: inLogos('brokerage-horizontal-dark.png'),
  },
} as const
