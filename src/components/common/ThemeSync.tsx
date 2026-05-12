import { useEffect } from 'react'
import { useThemeStore } from '@/store/theme'

/** Applies `dark` on `<html>` and keeps `meta[name=theme-color]` in sync. */
export function ThemeSync() {
  const mode = useThemeStore((s) => s.mode)

  useEffect(() => {
    const apply = () => {
      const dark =
        mode === 'dark' ||
        (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
      document.documentElement.classList.toggle('dark', dark)
      const meta = document.querySelector('meta[name="theme-color"]')
      if (meta) {
        meta.setAttribute('content', dark ? '#060812' : '#000032')
      }
    }
    apply()
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [mode])

  return null
}
