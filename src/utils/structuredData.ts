import { COMPANY } from '@/utils/constants'

/** Default share image (exists in `public/media`). */
export const DEFAULT_OG_IMAGE_PATH = '/media/page-home-hero.jpg'

export function absoluteUrl(origin: string, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`
  return `${origin.replace(/\/$/, '')}${p}`
}

export function buildRootJsonLd(origin: string) {
  const orgId = `${origin}/#organization`
  const webId = `${origin}/#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': orgId,
        name: COMPANY.name,
        url: origin,
        email: COMPANY.email,
        telephone: `+${COMPANY.phoneE164}`,
        foundingDate: String(COMPANY.founded),
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Çamlık Mah. 5027 Sok. NO:2/8 F',
          addressLocality: 'Didim',
          addressRegion: 'Aydın',
          addressCountry: 'TR',
        },
        description: `${COMPANY.name} — yacht brokerage, refit, management and marine consultancy in Didim, Aydın since ${COMPANY.founded}.`,
        areaServed: { '@type': 'Country', name: 'Turkey' },
        logo: absoluteUrl(origin, '/yachtmenia-logo-footer.png'),
        image: absoluteUrl(origin, DEFAULT_OG_IMAGE_PATH),
      },
      {
        '@type': 'WebSite',
        '@id': webId,
        url: origin,
        name: COMPANY.name,
        inLanguage: ['en', 'de', 'tr'],
        publisher: { '@id': orgId },
      },
    ],
  }
}
