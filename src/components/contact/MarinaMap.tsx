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
        <div className="marina-map relative h-[400px] w-full sm:h-[480px] lg:h-[520px]">
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

          <div className="absolute bottom-0 left-0 z-[2] w-full p-4 sm:bottom-6 sm:left-6 sm:w-auto sm:max-w-2xl sm:p-0">
            <div
              data-marina-map-overlay
              className="rounded-2xl border border-white/60 bg-white/94 p-5 shadow-[0_16px_48px_-16px_rgb(0_0_50/0.28)] backdrop-blur-md sm:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                {t('contact.map.overline')}
              </p>
              <p className="mt-1 font-display text-2xl text-primary sm:text-3xl">{COMPANY.locationShort}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{COMPANY.locationLine}</p>

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
                    className="inline-flex items-center gap-2 rounded-lg border border-stone/45 bg-pearl px-4 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/20 hover:bg-mist"
                  >
                    {label}
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute right-4 top-4 z-[2] hidden items-center gap-2 rounded-full border border-white/60 bg-white/92 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary/80 shadow-sm backdrop-blur-md sm:flex"
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
