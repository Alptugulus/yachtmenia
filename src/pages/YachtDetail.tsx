import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Anchor, ChevronLeft, MapPin, Ruler } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/common/Button'
import { FadeIn } from '@/components/common/FadeIn'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageHeader } from '@/components/layout/PageHeader'
import { getYachtBySlug } from '@/data'
import { useTranslatedYacht } from '@/i18n/dataT'
import { intlLocaleForLanguage } from '@/i18n/intlLocale'
import { SOCIAL } from '@/utils/constants'

function useFormatPrice() {
  const { i18n } = useTranslation()
  const locale = intlLocaleForLanguage(i18n.resolvedLanguage ?? i18n.language)
  return (eur: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(eur)
}

export function YachtDetail() {
  const { t } = useTranslation()
  const { slug } = useParams()
  const baseYacht = slug ? getYachtBySlug(slug) : undefined
  const yacht = useTranslatedYacht(baseYacht)
  const [active, setActive] = useState(0)
  const formatPrice = useFormatPrice()

  const gallery = useMemo(() => {
    if (!yacht) return []
    return [yacht.heroImage, ...yacht.gallery]
  }, [yacht])

  if (!yacht) {
    return <Navigate to="/yachts" replace />
  }

  const mainImage = gallery[active] ?? yacht.heroImage

  return (
    <>
      <Seo title={yacht.name} description={yacht.summary} path={`/yachts/${yacht.slug}`} />

      <PageHeader
        title={yacht.name}
        subtitle={`${yacht.manufacturer}${yacht.model ? ` · ${yacht.model}` : ''} · ${yacht.year}`}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('seo.titles.yachts'), to: '/yachts' },
          { label: yacht.name },
        ]}
        backgroundImage={yacht.heroImage}
      />

      <section className="mx-auto max-w-[1200px] space-y-10 px-4 py-12 sm:px-6 lg:px-10">
        <FadeIn>
          <Link
            to="/yachts"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/75"
          >
            <ChevronLeft className="h-4 w-4" />
            {t('yachtDetail.back')}
          </Link>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-stone/50 bg-pearl shadow-card ring-1 ring-primary/[0.04]">
              <img
                src={mainImage}
                alt={`${yacht.name} — yacht photography`}
                className="aspect-[16/10] w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {gallery.map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg ring-2 ring-transparent transition ${
                    idx === active ? 'ring-primary' : 'hover:ring-primary/35'
                  }`}
                  aria-label={t('yachtDetail.showImage', { index: idx + 1 })}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <aside className="space-y-6 rounded-2xl border border-stone/50 bg-pearl p-6 shadow-card ring-1 ring-primary/[0.04] lg:sticky lg:top-28">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">{yacht.location}</p>
                <p className="mt-2 font-display text-3xl text-primary">{yacht.name}</p>
              </div>
              <Anchor className="h-6 w-6 text-primary" strokeWidth={1.75} />
            </div>

            {typeof yacht.priceEUR === 'number' ? (
              <p className="text-2xl font-semibold tabular-nums text-primary">{formatPrice(yacht.priceEUR)}</p>
            ) : (
              <p className="text-lg font-semibold text-primary/85">{t('yachtDetail.priceOnRequest')}</p>
            )}

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-mist/70 px-3 py-3">
                <p className="text-xs uppercase tracking-wide text-slate">{t('yachtDetail.specs.length')}</p>
                <p className="mt-1 flex items-center gap-2 font-semibold text-primary">
                  <Ruler className="h-4 w-4 text-primary/75" />
                  {yacht.lengthM} m
                </p>
              </div>
              {yacht.beamM ? (
                <div className="rounded-xl bg-mist/70 px-3 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate">{t('yachtDetail.specs.beam')}</p>
                  <p className="mt-1 font-semibold text-primary">{yacht.beamM} m</p>
                </div>
              ) : null}
              {yacht.cabins ? (
                <div className="rounded-xl bg-mist/70 px-3 py-3">
                  <p className="text-xs uppercase tracking-wide text-slate">{t('yachtDetail.specs.cabins')}</p>
                  <p className="mt-1 font-semibold text-primary">{yacht.cabins}</p>
                </div>
              ) : null}
              <div className="rounded-xl bg-mist/70 px-3 py-3">
                <p className="text-xs uppercase tracking-wide text-slate">{t('yachtDetail.specs.year')}</p>
                <p className="mt-1 font-semibold text-primary">{yacht.year}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button to="/contact" variant="primary">
                {t('yachtDetail.requestDetails')}
              </Button>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg bg-[#25D366] px-4 py-3 text-center text-sm font-semibold text-white shadow-card transition hover:bg-[#1ebe57]"
              >
                {t('whatsapp.broker')}
              </a>
            </div>

            <p className="text-xs leading-relaxed text-slate">{t('yachtDetail.specsDisclaimer')}</p>
          </aside>
        </div>

        <FadeIn>
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-slate">
            <h2 className="font-display text-3xl text-primary">{t('yachtDetail.overview')}</h2>
            <p>{yacht.description}</p>
          </div>
        </FadeIn>

        {yacht.equipment?.length ? (
          <FadeIn>
            <div className="rounded-2xl border border-stone/50 bg-mist/60 p-8 shadow-[inset_0_1px_0_rgb(255_255_255/0.5)]">
              <h3 className="font-display text-3xl text-primary">{t('yachtDetail.equipment')}</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {yacht.equipment.map((item) => (
                  <li key={item} className="flex gap-3 text-charcoal">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ) : null}

        <FadeIn>
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-stone/50 bg-pearl px-6 py-5 text-sm text-slate shadow-[inset_0_1px_0_rgb(255_255_255/0.85)] ring-1 ring-primary/[0.03]">
            <MapPin className="h-5 w-5 text-primary/75" />
            <span className="font-semibold text-primary">
              {t('common.currentlyIn', { location: yacht.location })}
            </span>
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-stone/40 bg-pearl py-16">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/75">
              {t('yachtDetail.inquiryOverline')}
            </p>
            <h2 className="font-display text-4xl text-primary">{t('yachtDetail.inquiryTitle')}</h2>
            <p className="text-slate">{t('yachtDetail.inquiryBody', { name: yacht.name })}</p>
          </div>
          <ContactForm subjectPreset="brokerage" />
        </div>
      </section>
    </>
  )
}
