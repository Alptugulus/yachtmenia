/**
 * Yatay lockup (çapa + YACHTMENIA) — Vite asset import.
 * Dosyalar: `npm run trim:logos` → `src/assets/brand/lockup-*.png`
 */
import lockupDark from '@/assets/brand/lockup-dark.png'
import lockupDark2x from '@/assets/brand/lockup-dark@2x.png'
import lockupLight from '@/assets/brand/lockup-light.png'
import lockupLight2x from '@/assets/brand/lockup-light@2x.png'
import { publicAsset } from '@/utils/publicAsset'

const inLogos = (name: string) => publicAsset(`media/logos/${name}`)

/** Görüntüleme oranı (~918×340) */
export const BRAND_LOCKUP_ASPECT = 918 / 340

export const BRAND_LOGO = {
  navbarOnLight: lockupLight,
  navbarOnDark: lockupDark,
  footer: lockupDark,
} as const

export const BRAND_LOGO_2X = {
  navbarOnLight: lockupLight2x,
  navbarOnDark: lockupDark2x,
  footer: lockupDark2x,
} as const

/** JSON-LD / harici — sabit public URL */
export const BRAND_LOGO_PUBLIC_URL = inLogos('lockup-light.png')

export function brandLogoSrcSet(onDark: boolean): string {
  const x1 = onDark ? BRAND_LOGO.navbarOnDark : BRAND_LOGO.navbarOnLight
  const x2 = onDark ? BRAND_LOGO_2X.navbarOnDark : BRAND_LOGO_2X.navbarOnLight
  return `${x1} 1x, ${x2} 2x`
}

/** Eski public klasör referansları (brokerage / refit sayfaları vb.) */
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
