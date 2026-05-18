import { lazy, Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Anchor, ExternalLink } from 'lucide-react'
import { COMPANY } from '@/utils/constants'
import { MAP_LINKS } from '@/utils/mapLinks'

const MarinaMapLeaflet = lazy(() =>
  import('@/components/contact/MarinaMapLeaflet').then((m) => ({ default: m.MarinaMapLeaflet })),
)

/** Sayfa geçiş animasyonu (transform) bitince Leaflet mount et — karo hizası bozulmasın. */
function useMapMountDelay(ms = 450) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), ms)
    return () => window.clearTimeout(id)
  }, [ms])
  return mounted
}

export function MarinaMap() {
  const { t } = useTranslation()
  const mounted = useMapMountDelay()

  return (
    <section
      className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-10"
      aria-label={t('contact.map.iframeTitle')}
    >
      <div className="overflow-hidden rounded-3xl border border-stone/50 bg-primary shadow-card ring-1 ring-primary/[0.06]">
        <div className="marina-map relative h-[320px] w-full sm:h-[400px]">
          <div className="absolute inset-0 z-0 overflow-hidden">
            {mounted ? (
              <Suspense
                fallback={<div className="h-full w-full animate-pulse bg-[#0a0a3d]" aria-hidden />}
              >
                <MarinaMapLeaflet />
              </Suspense>
            ) : (
              <div className="h-full w-full animate-pulse bg-[#0a0a3d]" aria-hidden />
            )}
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#000032]/90 via-[#000032]/18 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#000032]/40 via-transparent to-transparent"
            aria-hidden
          />

          <div className="absolute bottom-0 left-0 right-0 z-[2] p-5 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {t('contact.map.overline')}
            </p>
            <p className="mt-1 font-display text-2xl text-white sm:text-3xl">{COMPANY.locationShort}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">{COMPANY.locationLine}</p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {(
                [
                  { key: 'google', href: MAP_LINKS.google, label: t('contact.map.google') },
                  { key: 'apple', href: MAP_LINKS.apple, label: t('contact.map.apple') },
                  { key: 'waze', href: MAP_LINKS.waze, label: t('contact.map.waze') },
                ] as const
              ).map(({ key, href, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/18"
                >
                  {label}
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </a>
              ))}
            </div>
          </div>

          <div
            className="pointer-events-none absolute right-4 top-4 z-[2] hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md sm:flex"
            aria-hidden
          >
            <Anchor className="h-3.5 w-3.5" />
            {t('contact.map.badge')}
          </div>
        </div>

        <p className="border-t border-white/10 px-4 py-2.5 text-center text-[10px] text-white/45 sm:text-xs">
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white/65"
          >
            © OpenStreetMap
          </a>
          {' · '}
          <a href="https://carto.com/attributions" target="_blank" rel="noreferrer" className="hover:text-white/65">
            CARTO
          </a>
        </p>
      </div>
    </section>
  )
}
