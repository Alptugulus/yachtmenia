import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ogLocaleForLanguage } from '@/i18n/intlLocale'
import { COMPANY } from '@/utils/constants'
import { absoluteUrl, DEFAULT_OG_IMAGE_PATH } from '@/utils/structuredData'
import { defaultDescription, pageTitle } from '@/utils/seo'
import { getSiteOrigin } from '@/utils/siteUrl'

interface SeoProps {
  title: string
  description?: string
  /** Override pathname for canonical/OG when needed */
  path?: string
}

export function Seo({ title, description, path }: SeoProps) {
  const location = useLocation()
  const { i18n } = useTranslation()
  const pathname = path ?? location.pathname
  const siteUrl = getSiteOrigin()
  const url = siteUrl ? `${siteUrl}${pathname}` : pathname
  const ogImage = siteUrl ? absoluteUrl(siteUrl, DEFAULT_OG_IMAGE_PATH) : ''
  const lang = (i18n.resolvedLanguage ?? i18n.language ?? 'en').split('-')[0]
  const fullTitle = pageTitle(title)
  const finalDescription = description ?? defaultDescription()

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      {siteUrl ? <link rel="canonical" href={url} /> : null}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      {siteUrl ? <meta property="og:url" content={url} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={ogLocaleForLanguage(i18n.resolvedLanguage ?? i18n.language)} />
      <meta property="og:site_name" content={COMPANY.name} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      {ogImage ? <meta property="og:image:alt" content={fullTitle} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
    </Helmet>
  )
}
