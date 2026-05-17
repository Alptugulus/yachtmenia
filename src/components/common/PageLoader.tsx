import { useTranslation } from 'react-i18next'
import { BrandLogo } from '@/components/common/BrandLogo'

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
      <BrandLogo variant="loader" headerTone="on-light" />
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
