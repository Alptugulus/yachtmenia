import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { ResponsiveImage } from '@/components/common/ResponsiveImage'
import { FadeIn } from '@/components/common/FadeIn'
import { PageHeader } from '@/components/layout/PageHeader'
import { COMPANY } from '@/utils/constants'

export function About() {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        title={t('seo.titles.about')}
        description={t('seo.descriptions.about', {
          name: COMPANY.name,
          year: COMPANY.founded,
          location: COMPANY.locationLine,
        })}
        path="/about"
      />

      <PageHeader
        title={t('about.header.title')}
        subtitle={t('about.header.subtitle')}
        crumbs={[{ label: t('breadcrumb.home'), to: '/' }, { label: t('seo.titles.about') }]}
        backgroundImage="/media/photo-1439405326854-014607f0d800.jpg"
      />

      <div className="mx-auto max-w-[900px] space-y-8 px-4 py-16 sm:px-6 lg:px-10">
        <FadeIn>
          <p className="font-display text-2xl text-primary">
            {t('about.lead', { name: COMPANY.name })}
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <p className="text-lg leading-relaxed text-slate">{t('about.p1')}</p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="text-lg leading-relaxed text-slate">
            {t('about.p2', { location: COMPANY.locationLine })}
          </p>
        </FadeIn>
      </div>

      <section id="about-pillars" className="scroll-mt-28 border-t border-stone/60 bg-mist/40 py-16">
        <div className="mx-auto max-w-[1440px] space-y-10 px-4 sm:px-6 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-3">
          {(['governance', 'craft', 'continuity'] as const).map((key) => (
            <FadeIn key={key}>
              <div className="rounded-2xl border border-stone/50 bg-pearl p-6 shadow-card ring-1 ring-primary/[0.04]">
                <h3 className="font-display text-2xl text-primary">{t(`about.pillars.${key}.title`)}</h3>
                <p className="mt-3 text-slate">{t(`about.pillars.${key}.body`)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        </div>
      </section>

      <ResponsiveImage
        src="/media/photo-1569256326873-7d3c885518d9.jpg"
        alt="Motor yacht exterior detail — craftsmanship and paint finish"
        pictureClassName="block h-[420px] w-full"
        className="h-[420px] w-full object-cover"
        loading="lazy"
        decoding="async"
        sizes="100vw"
      />
    </>
  )
}
