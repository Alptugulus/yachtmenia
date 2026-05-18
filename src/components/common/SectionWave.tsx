type SectionWaveTone = 'pearl' | 'mist' | 'brand'

const TONE_FILL: Record<SectionWaveTone, string> = {
  pearl: 'var(--color-pearl)',
  mist: 'var(--color-mist)',
  brand: 'var(--color-brand)',
}

type SectionWaveProps = {
  topTone: SectionWaveTone
  bottomTone: SectionWaveTone
  className?: string
}

/**
 * Static section divider — single SVG wave edge, no animation.
 */
export function SectionWave({ topTone, bottomTone, className = '' }: SectionWaveProps) {
  const topFill = TONE_FILL[topTone]
  const bottomFill = TONE_FILL[bottomTone]

  return (
    <div
      className={`relative -mt-px h-10 w-full overflow-hidden sm:h-12 ${className}`}
      style={{ backgroundColor: topFill }}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 left-0 block h-[55%] w-full"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,22 C240,6 480,32 720,14 C960,36 1200,10 1440,24 L1440,48 L0,48 Z"
          fill={bottomFill}
        />
      </svg>
    </div>
  )
}
