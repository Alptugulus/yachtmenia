import { publicAsset } from '@/utils/publicAsset'

const inLogos = (name: string) => publicAsset(`media/logos/${name}`)

/**
 * Marka PNG’leri: `public/media/logos/`
 * - **Dark** soneki → beyaz çizgi (W / W-L): koyu zemin, footer, koyu navbar.
 * - **Light** soneki → lacivert (C / C-L): açık zemin, açık navbar.
 */
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

/** Üst şerit (Navbar): yatay lockup — dikey PNG 1024 kare tuvalde minicik kalıyordu. */
export const HEADER_HORIZONTAL_LOGO = {
  onDark: LOGOS.yachting.horizontalDark,
  onLight: LOGOS.yachting.horizontalLight,
} as const

export const HEADER_VERTICAL_LOGO = {
  onDark: LOGOS.yachting.verticalDark,
  onLight: LOGOS.yachting.verticalLight,
} as const

/** Footer + navbar: yatay lockup (daha compact). */
export const BRAND_LOGO = {
  navbarOnDark: HEADER_HORIZONTAL_LOGO.onDark,
  navbarOnLight: HEADER_HORIZONTAL_LOGO.onLight,
  footer: HEADER_HORIZONTAL_LOGO.onDark,
} as const
