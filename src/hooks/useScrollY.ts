import { useEffect, useState } from 'react'

/** Current vertical scroll offset (native window scroll). */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const update = () => setScrollY(window.scrollY)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return scrollY
}
