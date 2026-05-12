import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ResponsiveImage } from '@/components/common/ResponsiveImage'
import { intlLocaleForLanguage } from '@/i18n/intlLocale'
import type { BlogPost } from '@/types'

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  const { t, i18n } = useTranslation()
  const reduce = useReducedMotion()
  const dateLocale = intlLocaleForLanguage(i18n.resolvedLanguage ?? i18n.language)
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group overflow-hidden rounded-2xl border border-stone/50 bg-pearl shadow-card ring-1 ring-primary/[0.04] transition-[box-shadow,border-color] duration-300 ease-out hover:border-primary/25 hover:shadow-card-hover"
    >
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden">
          <ResponsiveImage
            src={post.coverImage}
            alt=""
            pictureClassName="block h-full w-full"
            className="h-full w-full origin-center object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
            {post.category}
          </div>
        </div>
        <div className="space-y-3 px-5 py-5">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-slate">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(dateLocale, {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <span className="inline-flex items-center gap-1 text-primary/75">
              <Clock className="h-3.5 w-3.5" />
              {t('common.minReadShort', { count: post.readMinutes })}
            </span>
          </div>
          <h3 className="font-display text-xl text-primary group-hover:text-primary/80">{post.title}</h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-slate">{post.excerpt}</p>
        </div>
      </Link>
    </motion.article>
  )
}
