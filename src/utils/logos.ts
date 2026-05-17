import { publicAsset } from '@/utils/publicAsset'

const inLogos = (name: string) => publicAsset(`media/logos/${name}`)

const trim = (base: string) => inLogos(`${base}-trim.png`)
const trim2x = (base: string) => inLogos(`${base}-trim@2x.png`)

/**
 * Marka PNG’leri: `public/media/logos/`
 * - **Dark** → beyaz çizgi: koyu zemin, footer.
 * - **Light** → lacivert: açık zemin (pearl navbar).
 *
 * Navbar / footer için **yatay lockup** (çapa solda + YACHTMENIA yazısı):
 * dosya adı `yachting-vertical-*` (layout yatay, isim tarihsel).
 *
 * `yachting-horizontal-*` = çapa ortada, yazı üstünde (ikon lockup).
 */
export const LOGOS = {
  refit: {
    verticalLight: inLogos('refit-vertical-light.png'),
    verticalDark: inLogos('refit-vertical-dark.png'),
    horizontalLight: inLogos('refit-horizontal-light.png'),
    horizontalDark: inLogos('refit-horizontal-dark.png'),
  },
  yachting: {
    /** Yatay yazılı lockup — navbar / footer */
    lockupLight: trim('yachting-vertical-light'),
    lockupDark: trim('yachting-vertical-dark'),
    lockupLight2x: trim2x('yachting-vertical-light'),
    lockupDark2x: trim2x('yachting-vertical-dark'),
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

/** Üst şerit + footer: yatay yazılı lockup */
export const HEADER_LOCKUP_LOGO = {
  onDark: LOGOS.yachting.lockupDark,
  onLight: LOGOS.yachting.lockupLight,
} as const

export const HEADER_LOCKUP_LOGO_2X = {
  onDark: LOGOS.yachting.lockupDark2x,
  onLight: LOGOS.yachting.lockupLight2x,
} as const

/** @deprecated İkon-üstü lockup; navbar’da kullanılmıyor */
export const HEADER_HORIZONTAL_LOGO = {
  onDark: trim('yachting-horizontal-dark'),
  onLight: trim('yachting-horizontal-light'),
} as const

export const HEADER_VERTICAL_LOGO = {
  onDark: LOGOS.yachting.verticalDark,
  onLight: LOGOS.yachting.verticalLight,
} as const

export const BRAND_LOGO = {
  navbarOnDark: HEADER_LOCKUP_LOGO.onDark,
  navbarOnLight: HEADER_LOCKUP_LOGO.onLight,
  footer: HEADER_LOCKUP_LOGO.onDark,
} as const

export const BRAND_LOGO_2X = {
  navbarOnDark: HEADER_LOCKUP_LOGO_2X.onDark,
  navbarOnLight: HEADER_LOCKUP_LOGO_2X.onLight,
  footer: HEADER_LOCKUP_LOGO_2X.onDark,
} as const

/** Görüntüleme oranı (~918×340 içerik) */
export const BRAND_LOCKUP_ASPECT = 918 / 340

export function brandLogoSrcSet(onDark: boolean): string {
  const x1 = onDark ? BRAND_LOGO.navbarOnDark : BRAND_LOGO.navbarOnLight
  const x2 = onDark ? BRAND_LOGO_2X.navbarOnDark : BRAND_LOGO_2X.navbarOnLight
  return `${x1} 1x, ${x2} 2x`
}
