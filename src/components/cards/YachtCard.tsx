import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Anchor, MapPin, Ruler } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ResponsiveImage } from '@/components/common/ResponsiveImage'
import { intlLocaleForLanguage } from '@/i18n/intlLocale'
import type { Yacht } from '@/types'

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

export function YachtCard({ yacht, index = 0 }: { yacht: Yacht; index?: number }) {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const formatPrice = useFormatPrice()
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group overflow-hidden rounded-2xl border border-stone/50 bg-pearl shadow-card ring-1 ring-primary/[0.04] transition-[box-shadow,border-color] duration-300 ease-out hover:border-primary/30 hover:shadow-card-hover"
    >
      <Link to={`/yachts/${yacht.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <ResponsiveImage
            src={yacht.heroImage}
            alt=""
            pictureClassName="block h-full w-full"
            className="h-full w-full origin-center object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/85 via-brand/10 to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
              {t(`yachtCard.status.${yacht.status}`, { defaultValue: t('yachtCard.status.available') })}
            </span>
            {yacht.featured ? (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand ring-1 ring-brand/15">
                {t('yachtCard.featured')}
              </span>
            ) : null}
          </div>
          {typeof yacht.priceEUR === 'number' ? (
            <div className="absolute bottom-4 left-4 rounded-lg bg-white/95 px-3 py-2 text-sm font-semibold tabular-nums text-brand shadow-card">
              {formatPrice(yacht.priceEUR)}
            </div>
          ) : null}
        </div>

        <div className="space-y-3 px-5 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl text-primary">{yacht.name}</h3>
              <p className="text-sm text-slate">
                {yacht.manufacturer}
                {yacht.model ? ` · ${yacht.model}` : ''} · {yacht.year}
              </p>
            </div>
            <Anchor className="mt-1 h-5 w-5 shrink-0 text-primary" strokeWidth={1.75} />
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate">{yacht.summary}</p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wide text-primary/75">
            <span className="inline-flex items-center gap-1.5">
              <Ruler className="h-4 w-4" strokeWidth={2} />
              {yacht.lengthM} m
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" strokeWidth={2} />
              {yacht.location}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
