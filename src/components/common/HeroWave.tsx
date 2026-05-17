type HeroWaveTone = 'pearl' | 'mist'

const TONE_FILL: Record<HeroWaveTone, string> = {
  pearl: 'var(--color-pearl)',
  mist: 'var(--color-mist)',
}

type HeroWaveProps = {
  /** Fill matches the section directly below the hero for a seamless handoff. */
  tone?: HeroWaveTone
  className?: string
}

/**
 * Hero bottom wave: white crest on dark hero + solid fill into the next section.
 * Uses plain `animate-*` utilities (reduced-motion handled in globals.css).
 */
export function HeroWave({ tone = 'mist', className = '' }: HeroWaveProps) {
  const fill = TONE_FILL[tone]

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[clamp(5rem,14vw,8.5rem)] ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 will-change-transform animate-wave-drift-slow motion-reduce:animate-none motion-reduce:translate-x-0">
          <svg
            className="absolute -bottom-px left-[-12%] h-[130%] w-[125%] min-w-[125%]"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,44 C200,112 400,8 620,40 C840,72 1060,16 1280,52 C1360,68 1400,52 1440,60 L1440,120 L0,120 Z"
              fill="#ffffff"
              fillOpacity={0.58}
            />
          </svg>
        </div>
        <div className="absolute inset-0 will-change-transform animate-wave-drift-reverse motion-reduce:animate-none motion-reduce:translate-x-0">
          <svg
            className="absolute -bottom-px left-[-10%] h-[115%] w-[120%] min-w-[120%]"
            viewBox="0 0 1440 96"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,64 C220,24 440,78 660,48 C880,18 1100,72 1440,40 L1440,96 L0,96 Z"
              fill="#ffffff"
              fillOpacity={0.35}
            />
          </svg>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 will-change-transform animate-wave-drift-fast motion-reduce:animate-none motion-reduce:translate-x-0">
          <svg
            className="absolute -bottom-px left-[-10%] h-full w-[120%] min-w-[120%]"
            viewBox="0 0 1440 96"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,66 C260,28 520,86 720,52 C920,18 1180,76 1440,46 L1440,96 L0,96 Z"
              fill={fill}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
