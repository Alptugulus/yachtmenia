import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'
import {
  BLUR_REVEAL_DURATION,
  REVEAL_VIEWPORT,
  revealInitial,
  revealTransition,
  revealWhileInView,
  type RevealVariant,
} from '@/utils/revealMotion'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  /** `blur-up` for section headings; `fade-up` (default) for body copy. */
  variant?: RevealVariant
}

export function FadeIn({ children, className = '', delay = 0, variant = 'fade-up' }: FadeInProps) {
  const motionAllowed = useMotionAllowed()

  return (
    <motion.div
      className={className}
      initial={revealInitial(motionAllowed, variant)}
      whileInView={revealWhileInView(motionAllowed, variant)}
      viewport={REVEAL_VIEWPORT}
      transition={revealTransition(motionAllowed, {
        delay,
        duration: variant === 'blur-up' ? BLUR_REVEAL_DURATION : 0.65,
      })}
    >
      {children}
    </motion.div>
  )
}
