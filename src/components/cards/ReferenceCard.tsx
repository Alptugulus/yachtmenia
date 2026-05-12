import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { ReferenceProject } from '@/types'

export function ReferenceCard({ project, index = 0 }: { project: ReferenceProject; index?: number }) {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  return (
    <motion.article
      id={`ref-${project.slug}`}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-muted shadow-soft transition-[box-shadow,border-color] duration-300 ease-out hover:border-white/25 hover:shadow-[0_28px_70px_-20px_rgb(0_0_0/0.45)]"
    >
      <Link to="/references" className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt=""
            className="h-full w-full origin-center object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/40 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand">
            {project.category}
          </div>
          <div className="absolute bottom-0 left-0 right-0 space-y-2 p-5 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/75">{project.year}</p>
            <h3 className="font-display text-2xl leading-snug text-white">{project.title}</h3>
            <p className="text-sm text-white/85">{project.excerpt}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              {t('referenceCard.view')}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
