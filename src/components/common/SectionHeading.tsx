import type { ReactNode } from 'react'

interface SectionHeadingProps {
  overline?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  action?: ReactNode
}

export function SectionHeading({
  overline,
  title,
  subtitle,
  align = 'left',
  light = false,
  action,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const textMuted = light ? 'text-white/80' : 'text-slate'

  return (
    <div
      className={`flex flex-col gap-4 ${align === 'center' ? 'items-center' : ''} md:flex-row md:items-end md:justify-between`}
    >
      <div className={`max-w-3xl space-y-3 ${alignClass}`}>
        {overline ? (
          <div
            className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${light ? 'text-white' : 'text-primary/75'}`}
          >
            <span
              className={`h-px shrink-0 bg-current ${align === 'center' ? 'w-6 opacity-40 sm:w-10' : 'w-8 opacity-35 sm:w-10'}`}
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">{overline}</p>
            {align === 'center' ? (
              <span className="h-px w-6 shrink-0 bg-current opacity-40 sm:w-10" aria-hidden />
            ) : null}
          </div>
        ) : null}
        <h2
          className={`font-display text-balance text-3xl sm:text-4xl md:text-[2.75rem] ${light ? 'text-white' : 'text-primary'}`}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`max-w-2xl text-lg leading-relaxed ${textMuted} ${align === 'center' ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
