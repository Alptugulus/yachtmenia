import { createElement } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { ResponsiveImage } from '@/components/common/ResponsiveImage'
import { FadeIn } from '@/components/common/FadeIn'
import { PageHeader } from '@/components/layout/PageHeader'
import { ContactForm } from '@/components/forms/ContactForm'
import { getServiceBySlug } from '@/data'
import { useTranslatedService } from '@/i18n/dataT'
import { getServiceIcon } from '@/utils/serviceIcon'

export function ServiceDetail() {
  const { t } = useTranslation()
  const { slug } = useParams()
  const baseService = slug ? getServiceBySlug(slug) : undefined
  const service = useTranslatedService(baseService)

  if (!service) {
    return <Navigate to="/services" replace />
  }

  return (
    <>
      <Seo
        title={service.title}
        description={service.excerpt}
        path={`/services/${service.slug}`}
      />

      <PageHeader
        title={service.title}
        subtitle={service.tagline}
        crumbs={[
          { label: t('breadcrumb.home'), to: '/' },
          { label: t('seo.titles.services'), to: '/services' },
          { label: service.shortTitle },
        ]}
        backgroundImage={service.heroImage}
        badge={
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {createElement(getServiceIcon(service.icon), { className: 'h-4 w-4 text-white', strokeWidth: 1.75 })}
            {service.shortTitle}
          </span>
        }
      />

      <section className="mx-auto max-w-[1100px] space-y-10 px-4 py-16 sm:px-6 lg:px-10">
        {service.body.map((para, idx) => (
          <FadeIn key={idx} delay={idx * 0.05}>
            <p className="text-lg leading-relaxed text-slate">{para}</p>
          </FadeIn>
        ))}

        <FadeIn>
          <div className="rounded-2xl border border-stone/50 bg-mist/60 p-8 shadow-[inset_0_1px_0_rgb(255_255_255/0.5)]">
            <h2 className="font-display text-3xl text-primary">{t('serviceDetail.deliveryFocus')}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-charcoal">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="overflow-hidden rounded-2xl border border-stone/50 bg-pearl shadow-card ring-1 ring-primary/[0.04]">
            <ResponsiveImage
              src={service.heroImage}
              alt=""
              pictureClassName="block h-72 w-full sm:h-96"
              className="h-72 w-full object-cover sm:h-96"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 1100px) 100vw, 1100px"
            />
          </div>
        </FadeIn>
      </section>

      <section className="border-t border-stone/40 bg-pearl py-16">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/75">
              {t('serviceDetail.discussOverline')}
            </p>
            <h2 className="font-display text-4xl text-primary">{t('serviceDetail.discussTitle')}</h2>
            <p className="text-slate">{t('serviceDetail.discussBody')}</p>
          </div>
          <ContactForm subjectPreset={service.slug} />
        </div>
      </section>
    </>
  )
}
