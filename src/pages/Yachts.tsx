import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FadeIn } from '@/components/common/FadeIn'
import { YachtCard } from '@/components/cards/YachtCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { getAllYachts } from '@/data'
import { useTranslatedYachts } from '@/i18n/dataT'
import { COMPANY } from '@/utils/constants'

export function Yachts() {
  const { t } = useTranslation()
  const yachts = useTranslatedYachts(getAllYachts())

  return (
    <>
      <Seo
        title={t('seo.titles.yachts')}
        description={t('seo.descriptions.yachts', { name: COMPANY.name })}
        path="/yachts"
      />

      <PageHeader
        title={t('yachtsPage.header.title')}
        subtitle={t('yachtsPage.header.subtitle')}
        crumbs={[{ label: t('breadcrumb.home'), to: '/' }, { label: t('seo.titles.yachts') }]}
        backgroundImage="/media/photo-1569263979104-865ab7cd8d13.jpg"
      />

      <section className="mx-auto max-w-[1440px] space-y-12 px-4 py-16 sm:px-6 lg:px-10">
        <FadeIn>
          <SectionHeading
            title={t('yachtsPage.section.title')}
            subtitle={t('yachtsPage.section.subtitle')}
          />
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {yachts.map((y, i) => (
            <YachtCard key={y.id} yacht={y} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
