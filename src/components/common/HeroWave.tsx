type HeroWaveTone = 'pearl' | 'mist'

const TONE_FILL: Record<HeroWaveTone, string> = {
  pearl: 'var(--color-pearl)',
  mist: 'var(--color-mist)',
}

type HeroWaveProps = {
  /** Fill matches the section directly below the hero */
  tone?: HeroWaveTone
  className?: string
}

/**
 * Static hero shoreline — no animation (avoids distorted / “needle” artifacts).
 */
export function HeroWave({ tone = 'mist', className = '' }: HeroWaveProps) {
  const fill = TONE_FILL[tone]

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[clamp(3.5rem,9vw,5.75rem)] ${className}`}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 block h-full w-full"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,52 C200,96 400,28 600,56 C800,84 1000,36 1200,64 1320,48 1440,58 L1440,120 L0,120 Z"
          fill="#ffffff"
          fillOpacity={0.32}
        />
        <path
          d="M0,68 C260,46 520,82 780,58 C1040,34 1300,70 1440,54 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
