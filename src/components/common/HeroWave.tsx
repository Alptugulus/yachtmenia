type HeroWaveTone = 'pearl' | 'mist'

const TONE_FILL: Record<HeroWaveTone, string> = {
  pearl: 'var(--color-pearl)',
  mist: 'var(--color-mist)',
}

/** Gentle crest — duplicated for seamless horizontal loop */
const FOAM_PATH =
  'M0,54 C280,76 560,38 840,56 C1120,74 1320,46 1440,58 L1440,96 L0,96 Z'

/** Static shoreline into the next section (does not move) */
const SHORE_PATH =
  'M0,66 C300,48 600,78 900,56 C1200,34 1440,60 L1440,96 L0,96 Z'

type HeroWaveProps = {
  tone?: HeroWaveTone
  className?: string
}

function SeamlessFoam({
  opacity,
  speedClass,
  delay,
}: {
  opacity: number
  speedClass: 'animate-wave-flow' | 'animate-wave-flow-slow'
  delay?: string
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={`flex h-full w-[200%] will-change-transform ${speedClass} motion-reduce:animate-none motion-reduce:translate-x-0`}
        style={delay ? { animationDelay: delay } : undefined}
      >
        <svg
          className="h-full w-1/2 min-w-[50%] shrink-0"
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={FOAM_PATH} fill="#ffffff" fillOpacity={opacity} />
        </svg>
        <svg
          className="h-full w-1/2 min-w-[50%] shrink-0"
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={FOAM_PATH} fill="#ffffff" fillOpacity={opacity} />
        </svg>
      </div>
    </div>
  )
}

/**
 * Hero wave: static color shore + slow seamless foam current on the photo.
 * Avoids animating the solid fill (that reads artificial).
 */
export function HeroWave({ tone = 'mist', className = '' }: HeroWaveProps) {
  const fill = TONE_FILL[tone]

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[clamp(5rem,14vw,8.5rem)] ${className}`}
      aria-hidden
    >
      {/* Subtle moving foam over the hero image */}
      <SeamlessFoam opacity={0.22} speedClass="animate-wave-flow-slow" />
      <SeamlessFoam opacity={0.14} speedClass="animate-wave-flow" delay="-18s" />

      {/* Fixed wave edge into mist / pearl — no sliding color block */}
      <svg
        className="absolute -bottom-px left-0 h-full w-full"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={SHORE_PATH} fill={fill} />
      </svg>
    </div>
  )
}
