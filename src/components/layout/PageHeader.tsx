import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { HeroBackdrop } from '@/components/common/HeroBackdrop'
import { HeroWave } from '@/components/common/HeroWave'

interface Crumb {
  label: string
  to?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  crumbs?: Crumb[]
  backgroundImage?: string
  badge?: ReactNode
}

export function PageHeader({ title, subtitle, crumbs, backgroundImage, badge }: PageHeaderProps) {
  return (
    <section className="relative isolate min-h-[min(520px,52vh)] overflow-hidden pt-28">
      {backgroundImage ? (
        <HeroBackdrop src={backgroundImage} alt="" variant="page" priority parallax />
      ) : (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand via-brand-muted to-brand" />
      )}

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 pb-24 pt-10 animate-page-in motion-reduce:animate-none sm:px-6 lg:px-10 lg:pb-28 lg:pt-14">
        {crumbs?.length ? (
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/75">
            {crumbs.map((c, idx) => (
              <span key={`${c.label}-${idx}`} className="flex items-center gap-2">
                {idx > 0 ? <ChevronRight className="h-3 w-3 text-white/90" /> : null}
                {c.to ? (
                  <Link to={c.to} className="transition hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        {badge ? <div className="mb-4">{badge}</div> : null}

        <div className="max-w-3xl space-y-4">
          <h1 className="font-display text-balance text-4xl leading-tight text-white drop-shadow-sm sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-2xl text-lg leading-relaxed text-white/90 drop-shadow-sm">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <HeroWave tone="mist" />
    </section>
  )
}
