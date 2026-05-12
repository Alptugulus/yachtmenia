import { useState } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FadeIn } from '@/components/common/FadeIn'
import { PageHeader } from '@/components/layout/PageHeader'
import { getGallery } from '@/data'
import { useTranslatedGallery } from '@/i18n/dataT'
import { COMPANY } from '@/utils/constants'
import { galleryCategorySlug } from '@/utils/galleryNav'

export function Gallery() {
  const { t } = useTranslation()
  const items = useTranslatedGallery(getGallery())
  const [openId, setOpenId] = useState<string | null>(null)
  const active = items.find((i) => i.id === openId)

  return (
    <>
      <Seo
        title={t('seo.titles.gallery')}
        description={t('seo.descriptions.gallery', { name: COMPANY.name })}
        path="/gallery"
      />

      <PageHeader
        title={t('galleryPage.header.title')}
        subtitle={t('galleryPage.header.subtitle')}
        crumbs={[{ label: t('breadcrumb.home'), to: '/' }, { label: t('seo.titles.gallery') }]}
        backgroundImage="/media/photo-1518834107812-67e0d7da4927.jpg"
      />

      <section className="mx-auto max-w-[1440px] space-y-12 px-4 py-16 sm:px-6 lg:px-10">
        <FadeIn>
          <SectionHeading
            title={t('galleryPage.section.title')}
            subtitle={t('galleryPage.section.subtitle')}
          />
        </FadeIn>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, idx) => {
            const prevCat = idx > 0 ? items[idx - 1]?.category : null
            const isFirstInCategory = item.category !== prevCat
            const catSlug = galleryCategorySlug(item.category)
            return (
            <button
              key={item.id}
              id={isFirstInCategory ? `gallery-${catSlug}` : undefined}
              type="button"
              onClick={() => setOpenId(item.id)}
              className={`group relative mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-2xl border border-stone/50 bg-pearl text-left shadow-card ring-1 ring-primary/[0.04] ${
                item.ratio === 'portrait' ? 'aspect-[3/4]' : item.ratio === 'square' ? 'aspect-square' : 'aspect-[4/3]'
              } ${isFirstInCategory ? 'scroll-mt-28' : ''}`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-3 left-3 right-3 text-left text-white opacity-0 transition group-hover:opacity-100">
                <p className="text-xs uppercase tracking-[0.2em] text-white/75">{item.category}</p>
                <p className="font-display text-xl text-white">{item.title}</p>
              </div>
            </button>
            )
          })}
        </div>
      </section>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-brand/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-white/10 shadow-soft"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand shadow-card"
                aria-label={t('galleryPage.close')}
                onClick={() => setOpenId(null)}
              >
                <X className="h-5 w-5" />
              </button>
              <img src={active.image} alt={active.title} className="max-h-[90vh] w-full object-contain" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand to-transparent p-6 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/75">{active.category}</p>
                <p className="font-display text-3xl text-white">{active.title}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
