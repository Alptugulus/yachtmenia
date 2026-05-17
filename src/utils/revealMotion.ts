import type { Target, Transition } from 'framer-motion'

export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const

export type RevealVariant = 'fade-up' | 'blur-up'

/** Scroll-in motion strength (tuned for clearly visible movement). */
export const CARD_REVEAL_DURATION = 0.9
export const CARD_STAGGER_STEP = 0.12
export const BLUR_REVEAL_DURATION = 0.95

const HIDDEN: Record<RevealVariant, Target> = {
  'fade-up': { opacity: 0, y: 32 },
  'blur-up': { opacity: 0, y: 52, filter: 'blur(20px)', scale: 0.9 },
}

const VISIBLE: Record<RevealVariant, Target> = {
  'fade-up': { opacity: 1, y: 0 },
  'blur-up': { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 },
}

export const REVEAL_VIEWPORT = { once: true, margin: '-40px' } as const
export const CARD_REVEAL_VIEWPORT = { once: true, margin: '0px' } as const

export function revealInitial(motionAllowed: boolean, variant: RevealVariant = 'fade-up'): false | Target {
  if (!motionAllowed) return false
  return HIDDEN[variant]
}

export function revealWhileInView(motionAllowed: boolean, variant: RevealVariant = 'fade-up'): Target | undefined {
  if (!motionAllowed) return undefined
  return VISIBLE[variant]
}

export function revealTransition(
  motionAllowed: boolean,
  opts?: { delay?: number; duration?: number },
): Transition {
  const { delay = 0, duration = 0.55 } = opts ?? {}
  return {
    duration: motionAllowed ? duration : 0,
    ease: [...REVEAL_EASE],
    delay: motionAllowed ? delay : 0,
  }
}

/** Stagger delay for grid cards (index × step). */
export function cardStaggerDelay(index: number, step = CARD_STAGGER_STEP) {
  return index * step
}
