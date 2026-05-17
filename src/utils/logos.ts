/**
 * Orijinal marka PNG’leri — işlenmemiş trim, public footer dosyası.
 */
import navbarLockupDark from '@/assets/brand/navbar-lockup-dark.png'
import navbarLockupLight from '@/assets/brand/navbar-lockup-light.png'
import { publicAsset } from '@/utils/publicAsset'

const inLogos = (name: string) => publicAsset(`media/logos/${name}`)

/** yachting-vertical-light trim sonrası (~918×340) */
export const BRAND_LOCKUP_ASPECT = 918 / 340

export const BRAND_LOGO = {
  navbarOnLight: navbarLockupLight,
  navbarOnDark: navbarLockupDark,
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
