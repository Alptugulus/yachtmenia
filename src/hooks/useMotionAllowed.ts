import { useSyncExternalStore } from 'react'

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getSnapshot() {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** SSR / first paint: allow motion until we know otherwise. */
function getServerSnapshot() {
  return true
}

/**
 * True when the OS has not requested reduced motion.
 * Uses matchMedia directly (more reliable than Framer's hook alone).
 */
export function useMotionAllowed() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
