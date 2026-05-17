import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/common/Button'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FadeIn } from '@/components/common/FadeIn'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { getAllServices } from '@/data'
import { useTranslatedServices } from '@/i18n/dataT'
import { COMPANY } from '@/utils/constants'
import { PAGE_HERO_IMAGES } from '@/utils/heroMedia'

export function Services() {
  const { t } = useTranslation()
  const services = useTranslatedServices(getAllServices())

  return (
    <>
      <Seo
        title={t('seo.titles.services')}
        description={t('seo.descriptions.services', { name: COMPANY.name })}
        path="/services"
      />

      <PageHeader
        title={t('servicesPage.header.title')}
        subtitle={t('servicesPage.header.subtitle')}
        crumbs={[{ label: t('breadcrumb.home'), to: '/' }, { label: t('seo.titles.services') }]}
        backgroundImage={PAGE_HERO_IMAGES.services}
      />

      <section className="mx-auto max-w-[1440px] space-y-12 px-4 py-16 sm:px-6 lg:px-10">
        <FadeIn variant="blur-up">
          <SectionHeading
            title={t('servicesPage.section.title')}
            subtitle={t('servicesPage.section.subtitle')}
          />
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          <Button to="/contact" variant="primary">
            {t('servicesPage.ctaPrimary')}
          </Button>
          <Button to="/references" variant="outline">
            {t('servicesPage.ctaSecondary')}
          </Button>
        </div>
      </section>
    </>
  )
}
