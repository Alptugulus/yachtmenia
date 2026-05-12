import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { ResponsiveImage } from '@/components/common/ResponsiveImage'

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
    <section className="relative isolate overflow-hidden pt-28 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/25 after:to-transparent">
      {backgroundImage ? (
        <>
          <ResponsiveImage
            src={backgroundImage}
            alt=""
            pictureClassName="absolute inset-0 block h-full w-full"
            className="h-full w-full object-cover"
            loading="eager"
            decoding="async"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/85 to-brand/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand/95 via-brand/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-muted to-brand" />
      )}

      <div className="relative mx-auto max-w-[1440px] px-4 pb-16 pt-10 motion-safe:animate-page-in sm:px-6 lg:px-10 lg:pb-20 lg:pt-14">
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
          <h1 className="font-display text-balance text-4xl leading-tight text-white sm:text-5xl">{title}</h1>
          {subtitle ? <p className="max-w-2xl text-lg leading-relaxed text-white/85">{subtitle}</p> : null}
        </div>
      </div>
    </section>
  )
}
