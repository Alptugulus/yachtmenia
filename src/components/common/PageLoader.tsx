import { useTranslation } from 'react-i18next'
import { BrandLogo } from '@/components/common/BrandLogo'

/**
 * Shown while lazy route chunks load. CSS-only motion; reduced-motion handled in globals.
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
      <div className="flex w-full max-w-[260px] flex-col items-center gap-3" aria-hidden>
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-brand/12">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand/25 to-transparent animate-shine motion-reduce:animate-none" />
          <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-brand via-brand-muted to-brand animate-loading-indeterminate motion-reduce:animate-none" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate">
          {t('common.loading')}
        </p>
      </div>
    </div>
  )
}
