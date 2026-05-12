import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/common/Button'
import { COMPANY } from '@/utils/constants'

export function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        title={t('seo.titles.notFound')}
        description={t('seo.descriptions.notFound')}
        path="/404"
      />

      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-mist px-4 py-24 text-center">
        <p className="mb-6 font-display text-sm font-semibold uppercase tracking-[0.35em] text-primary/80">
          {COMPANY.name}
        </p>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary/75">{t('notFound.code')}</p>
        <h1 className="mt-4 font-display text-5xl text-primary">{t('notFound.title')}</h1>
        <p className="mt-4 max-w-lg text-lg text-slate">{t('notFound.body')}</p>
        <div className="mt-10 flex flex-col flex-wrap justify-center gap-3 sm:flex-row">
          <Button to="/" variant="primary">
            {t('notFound.ctaHome')}
          </Button>
          <Button to="/yachts" variant="secondary">
            {t('notFound.ctaYachts')}
          </Button>
          <Button to="/contact" variant="outline">
            {t('notFound.ctaContact')}
          </Button>
        </div>
        <p className="mt-10 text-sm text-slate">
          {t('notFound.needHelp')}{' '}
          <a href={`tel:+${COMPANY.phoneE164}`} className="font-semibold text-primary hover:text-primary/75">
            {COMPANY.phoneDisplay}
          </a>
        </p>
      </section>
    </>
  )
}
