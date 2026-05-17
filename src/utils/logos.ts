/**
 * Navbar = footer ile aynı export (yachtmenia-logo-footer), lacivert renk.
 * Footer = beyaz orijinal public dosyası.
 */
import footerLockup from '@/assets/brand/footer-lockup.png'
import navbarLockupLight from '@/assets/brand/navbar-lockup-light.png'
import { publicAsset } from '@/utils/publicAsset'

const inLogos = (name: string) => publicAsset(`media/logos/${name}`)

/** yachtmenia-logo-footer oranı 300×120 */
export const BRAND_LOCKUP_ASPECT = 300 / 120

export const BRAND_LOGO = {
  navbarOnLight: navbarLockupLight,
  navbarOnDark: navbarLockupLight,
  footer: footerLockup,
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
