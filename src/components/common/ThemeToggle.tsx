import { Monitor, Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeStore, type ThemeMode } from '@/store/theme'

const cycle: ThemeMode[] = ['light', 'dark', 'system']

export function ThemeToggle({
  tone = 'on-light',
  /** Koyu header’da dil seçiciyle tek çerçevede; daha sakin görünüm */
  embedded = false,
}: {
  tone?: 'on-dark' | 'on-light'
  embedded?: boolean
}) {
  const { t } = useTranslation()
  const mode = useThemeStore((s) => s.mode)
  const setMode = useThemeStore((s) => s.setMode)

  const next = () => {
    const i = cycle.indexOf(mode)
    setMode(cycle[(i + 1) % cycle.length]!)
  }

  const Icon = mode === 'dark' ? Moon : mode === 'light' ? Sun : Monitor
  const label =
    mode === 'light' ? t('theme.ariaLight') : mode === 'dark' ? t('theme.ariaDark') : t('theme.ariaSystem')

  const shell =
    tone === 'on-dark'
      ? embedded
        ? 'border-y-0 border-l-0 border-r border-white/[0.08] bg-transparent text-white/75 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent'
        : 'border border-white/12 bg-white/[0.04] text-white/80 hover:border-white/18 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent'
      : 'border border-stone/55 bg-pearl/90 text-primary hover:bg-mist/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-0 dark:border-white/12 dark:bg-[#141824]/90 dark:text-[#e4e8f5] dark:hover:bg-[#1a2030] dark:focus-visible:ring-white/20'

  const radius =
    tone === 'on-dark' && embedded
      ? 'rounded-none rounded-l-md'
      : 'rounded-lg'

  const size = tone === 'on-dark' && embedded ? 'h-9 w-9' : 'h-10 w-10'

  return (
    <button
      type="button"
      onClick={next}
      className={`inline-flex ${size} shrink-0 items-center justify-center transition ${radius} ${shell}`}
      aria-label={label}
      title={label}
    >
      <Icon
        className={`${tone === 'on-dark' && embedded ? 'h-[17px] w-[17px] opacity-90' : 'h-[18px] w-[18px]'}`}
        strokeWidth={tone === 'on-dark' && embedded ? 1.85 : 2}
        aria-hidden
      />
    </button>
  )
}
