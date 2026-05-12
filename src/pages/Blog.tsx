import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FadeIn } from '@/components/common/FadeIn'
import { BlogCard } from '@/components/cards/BlogCard'
import { PageHeader } from '@/components/layout/PageHeader'
import { getAllPosts } from '@/data'
import { useTranslatedPosts } from '@/i18n/dataT'
import { COMPANY } from '@/utils/constants'

export function Blog() {
  const { t } = useTranslation()
  const posts = useTranslatedPosts(getAllPosts())

  return (
    <>
      <Seo
        title={t('seo.titles.blog')}
        description={t('seo.descriptions.blog', { name: COMPANY.name })}
        path="/blog"
      />

      <PageHeader
        title={t('blogPage.header.title')}
        subtitle={t('blogPage.header.subtitle')}
        crumbs={[{ label: t('breadcrumb.home'), to: '/' }, { label: t('seo.titles.blog') }]}
        backgroundImage="/media/photo-1583212292454-1fe62296039b.jpg"
      />

      <section className="mx-auto max-w-[1440px] space-y-12 px-4 py-16 sm:px-6 lg:px-10">
        <FadeIn>
          <SectionHeading
            title={t('blogPage.section.title')}
            subtitle={t('blogPage.section.subtitle')}
          />
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <BlogCard key={p.id} post={p} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
