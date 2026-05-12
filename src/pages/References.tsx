import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FadeIn } from '@/components/common/FadeIn'
import { ReferenceCard } from '@/components/cards/ReferenceCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { getAllReferences } from '@/data'
import { useTranslatedReferences } from '@/i18n/dataT'
import { COMPANY } from '@/utils/constants'

export function References() {
  const { t } = useTranslation()
  const projects = useTranslatedReferences(getAllReferences())

  return (
    <>
      <Seo
        title={t('seo.titles.references')}
        description={t('seo.descriptions.references', { name: COMPANY.name })}
        path="/references"
      />

      <PageHeader
        title={t('referencesPage.header.title')}
        subtitle={t('referencesPage.header.subtitle')}
        crumbs={[{ label: t('breadcrumb.home'), to: '/' }, { label: t('seo.titles.references') }]}
        backgroundImage="/media/photo-1449844908441-8829872d5227.jpg"
      />

      <section className="mx-auto max-w-[1440px] space-y-12 px-4 py-16 sm:px-6 lg:px-10">
        <FadeIn>
          <SectionHeading
            title={t('referencesPage.section.title')}
            subtitle={t('referencesPage.section.subtitle')}
          />
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <ReferenceCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
