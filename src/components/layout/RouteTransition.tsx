import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'

/**
 * Brief brand-tinted flash on route change (CSS transition, no Framer dependency).
 */
export function RouteTransition() {
  const { pathname } = useLocation()
  const motionAllowed = useMotionAllowed()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!motionAllowed) return

    setVisible(true)
    const hide = window.setTimeout(() => setVisible(false), 320)
    return () => window.clearTimeout(hide)
  }, [pathname, motionAllowed])

  if (!motionAllowed) return null

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[95] bg-brand transition-opacity duration-300 ease-out motion-reduce:hidden ${
        visible ? 'opacity-[0.07]' : 'opacity-0'
      }`}
    />
  )
}
