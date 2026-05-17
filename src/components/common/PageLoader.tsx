import { useTranslation } from 'react-i18next'
import { BRAND_LOGO, BRAND_LOGO_2X } from '@/utils/logos'

/**
 * Shown while lazy route chunks load. CSS-only motion on a transform bar;
 * respects prefers-reduced-motion via `animate-loading-indeterminate` in globals.
 */
export function PageLoader() {
  const { t } = useTranslation()

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-[min(70vh,520px)] w-full flex-col items-center justify-center gap-8 px-6"
    >
      <span className="sr-only">{t('common.loading')}</span>
      <img
        src={BRAND_LOGO.navbarOnLight}
        srcSet={`${BRAND_LOGO.navbarOnLight} 1x, ${BRAND_LOGO_2X.navbarOnLight} 2x`}
        sizes="(max-width: 640px) 80vw, 420px"
        alt="Yachtmenia Yachting"
        width={918}
        height={836}
        decoding="async"
        className="block h-44 w-auto max-w-[min(420px,85vw)] object-contain contrast-[1.12] saturate-[1.05] sm:h-48 md:h-52"
        aria-hidden
      />
      <div className="flex w-full max-w-[240px] flex-col items-center gap-3" aria-hidden>
        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-brand/15">
          <div className="h-full w-[36%] rounded-full bg-brand motion-safe:animate-loading-indeterminate" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate">
          {t('common.loading')}
        </p>
      </div>
    </div>
  )
}
