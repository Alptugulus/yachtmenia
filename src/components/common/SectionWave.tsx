type SectionWaveTone = 'pearl' | 'mist' | 'brand'

const TONE_FILL: Record<SectionWaveTone, string> = {
  pearl: 'var(--color-pearl)',
  mist: 'var(--color-mist)',
  brand: 'var(--color-brand)',
}

const WAVE_PATH =
  'M0,28 C240,10 480,36 720,20 C960,40 1200,14 1440,26 L1440,48 L0,48 Z'

type SectionWaveProps = {
  topTone: SectionWaveTone
  bottomTone: SectionWaveTone
  className?: string
}

/**
 * Static wave divider between sections — no animation (reads as real layout, not FX).
 */
export function SectionWave({ topTone, bottomTone, className = '' }: SectionWaveProps) {
  const topFill = TONE_FILL[topTone]
  const bottomFill = TONE_FILL[bottomTone]
  const showFoam = topTone === 'brand' || bottomTone === 'brand'

  return (
    <div
      className={`relative -mt-px h-[clamp(2.5rem,5.5vw,3.5rem)] w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0" style={{ backgroundColor: topFill }} />

      {showFoam ? (
        <svg
          className="absolute bottom-0 left-0 h-full w-full"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={WAVE_PATH} fill="#ffffff" fillOpacity={0.1} />
        </svg>
      ) : null}

      <svg
        className="absolute bottom-0 left-0 h-full w-full"
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={WAVE_PATH} fill={bottomFill} />
      </svg>
    </div>
  )
}
