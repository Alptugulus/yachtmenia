import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'

type CountUpProps = {
  value: number
  className?: string
  duration?: number
}

/**
 * Animates a number when scrolled into view (respects reduced motion).
 */
export function CountUp({ value, className = '', duration = 1.1 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionAllowed = useMotionAllowed()
  const inView = useInView(ref, { once: true, margin: '-30px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 })
  const [display, setDisplay] = useState(() => (motionAllowed ? '0' : String(value)))

  useEffect(() => {
    if (!motionAllowed) {
      setDisplay(String(value))
      return
    }
    if (!inView) return
    motionValue.set(value)
  }, [inView, value, motionAllowed, motionValue])

  useEffect(() => {
    if (!motionAllowed) return
    return spring.on('change', (latest) => {
      setDisplay(String(Math.round(latest)))
    })
  }, [spring, motionAllowed])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
