import { useEffect, useState } from 'react'
import { useLenis } from '@/contexts/LenisContext'

/** Current vertical scroll offset (Lenis-smoothed when active). */
export function useScrollY() {
  const lenis = useLenis()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const update = () => setScrollY(lenis?.scroll ?? window.scrollY)
    update()
    window.addEventListener('scroll', update, { passive: true })
    if (lenis) {
      lenis.on('scroll', update)
      return () => {
        window.removeEventListener('scroll', update)
        lenis.off('scroll', update)
      }
    }
    return () => window.removeEventListener('scroll', update)
  }, [lenis])

  return scrollY
}
