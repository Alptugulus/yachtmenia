import { publicAsset } from '@/utils/publicAsset'

const inLogos = (name: string) => publicAsset(`media/logos/${name}`)

const trim = (base: string) => inLogos(`${base}-trim.png`)
const trim2x = (base: string) => inLogos(`${base}-trim@2x.png`)

/**
 * Marka PNG’leri: `public/media/logos/`
 * - **Dark** → beyaz çizgi: koyu zemin, footer, koyu navbar.
 * - **Light** → lacivert: açık zemin (pearl navbar).
 * `-trim` dosyaları: boşluk kırpılmış, navbar’da daha büyük görünür.
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

const YACHTING_H = 'yachting-horizontal'

/** Üst şerit: kırpılmış yatay lockup + retina */
export const HEADER_HORIZONTAL_LOGO = {
  onDark: trim(`${YACHTING_H}-dark`),
  onLight: trim(`${YACHTING_H}-light`),
} as const

export const HEADER_HORIZONTAL_LOGO_2X = {
  onDark: trim2x(`${YACHTING_H}-dark`),
  onLight: trim2x(`${YACHTING_H}-light`),
} as const

export const HEADER_VERTICAL_LOGO = {
  onDark: LOGOS.yachting.verticalDark,
  onLight: LOGOS.yachting.verticalLight,
} as const

export const BRAND_LOGO = {
  navbarOnDark: HEADER_HORIZONTAL_LOGO.onDark,
  navbarOnLight: HEADER_HORIZONTAL_LOGO.onLight,
  footer: HEADER_HORIZONTAL_LOGO.onDark,
} as const

export const BRAND_LOGO_2X = {
  navbarOnDark: HEADER_HORIZONTAL_LOGO_2X.onDark,
  navbarOnLight: HEADER_HORIZONTAL_LOGO_2X.onLight,
  footer: HEADER_HORIZONTAL_LOGO_2X.onDark,
} as const

export function brandLogoSrcSet(onDark: boolean): string {
  const x1 = onDark ? BRAND_LOGO.navbarOnDark : BRAND_LOGO.navbarOnLight
  const x2 = onDark ? BRAND_LOGO_2X.navbarOnDark : BRAND_LOGO_2X.navbarOnLight
  return `${x1} 1x, ${x2} 2x`
}
