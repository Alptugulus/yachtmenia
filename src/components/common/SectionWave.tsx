type SectionWaveTone = 'pearl' | 'mist' | 'brand'

const TONE_FILL: Record<SectionWaveTone, string> = {
  pearl: 'var(--color-pearl)',
  mist: 'var(--color-mist)',
  brand: 'var(--color-brand)',
}

type SectionWaveProps = {
  /** Background above the wave crest */
  topTone: SectionWaveTone
  /** Fill below the wave crest */
  bottomTone: SectionWaveTone
  className?: string
}

/**
 * Horizontal wave divider between page sections (lighter than hero wave).
 */
export function SectionWave({ topTone, bottomTone, className = '' }: SectionWaveProps) {
  const topFill = TONE_FILL[topTone]
  const bottomFill = TONE_FILL[bottomTone]
  const showFoam = topTone === 'brand' || bottomTone === 'brand'

  return (
    <div
      className={`relative -mt-px h-[clamp(2.75rem,6.5vw,4.25rem)] w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0" style={{ backgroundColor: topFill }} />

      {showFoam ? (
        <div className="absolute inset-0 will-change-transform animate-wave-drift-slow motion-reduce:animate-none">
          <svg
            className="absolute bottom-0 left-[-6%] h-[115%] w-[112%] min-w-[112%]"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,20 C240,44 480,8 720,28 C960,48 1200,12 1440,32 L1440,48 L0,48 Z"
              fill="#ffffff"
              fillOpacity={0.14}
            />
          </svg>
        </div>
      ) : null}

      <div className="absolute inset-0 will-change-transform animate-wave-drift-fast motion-reduce:animate-none motion-reduce:translate-x-0">
        <svg
          className="absolute bottom-0 left-[-5%] h-full w-[110%] min-w-[110%]"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,26 C200,8 400,38 600,18 C800,42 1000,10 1200,30 1440,22 L1440,48 L0,48 Z"
            fill={bottomFill}
          />
        </svg>
      </div>
    </div>
  )
}
