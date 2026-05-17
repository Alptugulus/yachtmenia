import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

/**
 * Smooth wheel scrolling when motion is allowed; falls back to native scroll otherwise.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const motionAllowed = useMotionAllowed()
  const location = useLocation()
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const pathnameRef = useRef(location.pathname)

  useEffect(() => {
    if (!motionAllowed) {
      setLenis(null)
      return
    }

    const instance = new Lenis({
      duration: 1.12,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })
    setLenis(instance)

    let rafId = 0
    const raf = (time: number) => {
      instance.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      instance.destroy()
      setLenis(null)
    }
  }, [motionAllowed])

  useEffect(() => {
    if (pathnameRef.current === location.pathname) return
    pathnameRef.current = location.pathname

    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
