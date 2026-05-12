import { useTranslation } from 'react-i18next'
import { ChevronDown, Globe } from 'lucide-react'
import { SUPPORTED_LANGUAGES, type LanguageCode } from '@/i18n'

interface LanguageSwitcherProps {
  /** Color treatment for placement on dark vs light surfaces */
  tone?: 'on-dark' | 'on-light'
  /** Koyu header’da tek çerçeve; daha az “kutu” hissi */
  embedded?: boolean
  /** @deprecated Ignored — tek açılır liste kullanılıyor. */
  layout?: 'inline' | 'block'
  className?: string
}

export function LanguageSwitcher({
  tone = 'on-light',
  embedded = false,
  className = '',
}: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation()
  const current = (i18n.resolvedLanguage ?? i18n.language ?? 'en').split('-')[0] as LanguageCode
  const currentMeta = SUPPORTED_LANGUAGES.find((l) => l.code === current) ?? SUPPORTED_LANGUAGES[0]
  const selectAriaLabel = `${t('language.switchTo')}: ${currentMeta.label} (${currentMeta.short})`

  const shell =
    tone === 'on-dark'
      ? embedded
        ? 'border-0 bg-transparent text-white/80 shadow-none hover:bg-white/[0.05] hover:text-white focus-visible:ring-white/20'
        : 'border border-white/12 bg-white/[0.04] text-white/85 hover:border-white/18 hover:bg-white/[0.08] focus-visible:border-white/25 focus-visible:ring-white/20'
      : 'border border-stone/50 bg-pearl text-charcoal shadow-[inset_0_1px_0_rgb(255_255_255/0.85)] hover:border-stone/70 focus-visible:border-primary/40 focus-visible:ring-primary/20'

  const iconMuted =
    tone === 'on-dark'
      ? embedded
        ? 'text-white/45'
        : 'text-white/55'
      : 'text-slate'

  const selectRadius =
    tone === 'on-dark' && embedded ? 'rounded-none rounded-r-md' : 'rounded-lg'

  return (
    <div className={`relative inline-flex min-w-0 items-stretch ${className}`}>
      <Globe
        className={`pointer-events-none absolute left-2 top-1/2 z-[1] h-3.5 w-3.5 -translate-y-1/2 ${iconMuted}`}
        aria-hidden
      />
      <ChevronDown
        className={`pointer-events-none absolute right-1.5 top-1/2 z-[1] h-3.5 w-3.5 -translate-y-1/2 ${
          tone === 'on-dark' && embedded ? 'opacity-40' : 'opacity-55'
        } ${iconMuted}`}
        strokeWidth={2.25}
        aria-hidden
      />
      <select
        value={current}
        aria-label={selectAriaLabel}
        onChange={(e) => {
          const v = e.target.value as LanguageCode
          if (v !== current) void i18n.changeLanguage(v)
        }}
        className={`h-9 w-full min-w-[4.75rem] max-w-[8rem] cursor-pointer appearance-none py-1.5 pl-8 pr-7 text-left text-xs font-semibold tabular-nums tracking-wide outline-none transition focus-visible:ring-2 focus-visible:ring-offset-0 sm:h-9 sm:min-h-0 ${selectRadius} ${shell}`}
      >
        {SUPPORTED_LANGUAGES.map((lng) => (
          <option key={lng.code} value={lng.code} title={lng.label}>
            {lng.short}
          </option>
        ))}
      </select>
    </div>
  )
}
