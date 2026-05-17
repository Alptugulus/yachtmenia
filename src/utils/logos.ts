/**
 * Orijinal marka dosyaları — public/ ve yüksek çözünürlüklü lockup.
 */
import lockupDark from '@/assets/brand/lockup-dark@2x.png'
import lockupLight from '@/assets/brand/lockup-light@2x.png'
import { publicAsset } from '@/utils/publicAsset'

const inLogos = (name: string) => publicAsset(`media/logos/${name}`)

export const BRAND_LOCKUP_ASPECT = 918 / 340

/** Navbar / loader — lacivert yatay lockup (yachting-vertical) */
export const BRAND_LOGO = {
  navbarOnLight: lockupLight,
  navbarOnDark: lockupDark,
  footer: publicAsset('yachtmenia-logo-footer.png'),
} as const

export const BRAND_LOGO_PUBLIC_URL = publicAsset('yachtmenia-logo-footer.png')

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
