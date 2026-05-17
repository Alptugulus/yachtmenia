import { createElement } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'
import { useTranslation } from 'react-i18next'
import type { Service } from '@/types'
import { getServiceIcon } from '@/utils/serviceIcon'
import {
  CARD_REVEAL_DURATION,
  CARD_REVEAL_VIEWPORT,
  cardStaggerDelay,
  revealInitial,
  revealTransition,
  revealWhileInView,
} from '@/utils/revealMotion'

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const { t } = useTranslation()
  const motionAllowed = useMotionAllowed()
  return (
    <motion.div
      initial={revealInitial(motionAllowed, 'blur-up')}
      whileInView={revealWhileInView(motionAllowed, 'blur-up')}
      viewport={CARD_REVEAL_VIEWPORT}
      transition={revealTransition(motionAllowed, { delay: cardStaggerDelay(index), duration: CARD_REVEAL_DURATION })}
      className="group flex h-full flex-col rounded-2xl border border-stone/50 bg-pearl p-6 shadow-card ring-1 ring-primary/[0.04] transition-[box-shadow,border-color] duration-300 ease-out hover:border-primary/35 hover:shadow-card-hover motion-reduce:hover:shadow-card"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] ring-1 ring-white/10 transition-transform duration-300 ease-out group-hover:scale-[1.04] motion-reduce:group-hover:scale-100">
        {createElement(getServiceIcon(service.icon), { className: 'h-6 w-6', strokeWidth: 1.75 })}
      </div>
      <h3 className="font-display text-2xl text-primary">{service.shortTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{service.excerpt}</p>
      <ul className="mt-4 space-y-2 text-sm text-charcoal/90">
        {service.highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-t border-stone/60 pt-4">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/75"
        >
          {t('serviceCard.explore')}
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  )
}
