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

/** Ana wordmark: yalnızca navbar + footer (`BrandLogo`). */
export const BRAND_LOGO = {
  navbarOnDark: LOGOS.yachting.horizontalDark,
  navbarOnLight: LOGOS.yachting.horizontalLight,
  footer: LOGOS.yachting.horizontalDark,
} as const
