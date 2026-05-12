import { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { buildRootJsonLd } from '@/utils/structuredData'
import { getSiteOrigin } from '@/utils/siteUrl'

/** Global Organization + WebSite JSON-LD (once per app shell). */
export function OrganizationJsonLd() {
  const json = useMemo(() => {
    const origin = getSiteOrigin()
    if (!origin) return ''
    return JSON.stringify(buildRootJsonLd(origin))
  }, [])

  if (!json) return null

  return (
    <Helmet>
      <script type="application/ld+json">{json}</script>
    </Helmet>
  )
}
