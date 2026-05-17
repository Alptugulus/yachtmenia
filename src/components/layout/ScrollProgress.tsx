import { useEffect, useState } from 'react'
import { useLenis } from '@/contexts/LenisContext'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'

/**
 * Thin progress bar at the top of the viewport; syncs with Lenis or native scroll.
 */
export function ScrollProgress() {
  const lenis = useLenis()
  const motionAllowed = useMotionAllowed()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      if (lenis) {
        setProgress(lenis.progress)
        return
      }
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    if (lenis) {
      lenis.on('scroll', update)
      return () => {
        window.removeEventListener('scroll', update)
        window.removeEventListener('resize', update)
        lenis.off('scroll', update)
      }
    }

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [lenis])

  if (!motionAllowed) return null

  const pct = Math.min(100, Math.max(0, progress * 100))

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[101] h-[3px] origin-left bg-brand/10"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full bg-gradient-to-r from-brand via-brand-muted to-brand shadow-[0_0_12px_rgb(0_0_50/0.35)] transition-[width] duration-150 ease-out will-change-[width]"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
