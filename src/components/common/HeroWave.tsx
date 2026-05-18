import { WaveMarquee } from '@/components/common/WaveMarquee'
import { sineWavePath } from '@/utils/wavePath'

type HeroWaveTone = 'pearl' | 'mist'

const TONE_FILL: Record<HeroWaveTone, string> = {
  pearl: 'var(--color-pearl)',
  mist: 'var(--color-mist)',
}

const VIEW = '0 0 1440 120'

/** Seamless sine tiles — three depths, different speeds (ocean parallax). */
const FOAM = sineWavePath(1440, 120, 54, 14, 2)
const CREST = sineWavePath(1440, 120, 60, 11, 2.65)
const BODY = sineWavePath(1440, 120, 68, 18, 1.85)

type HeroWaveProps = {
  tone?: HeroWaveTone
  className?: string
}

export function HeroWave({ tone = 'mist', className = '' }: HeroWaveProps) {
  const fill = TONE_FILL[tone]

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[clamp(3.5rem,9vw,5.75rem)] overflow-hidden ${className}`}
      aria-hidden
    >
      <WaveMarquee
        viewBox={VIEW}
        animateClass="animate-wave-flow-slow"
        className="wave-layer absolute inset-0"
      >
        <path d={FOAM} fill="#ffffff" fillOpacity={0.28} />
      </WaveMarquee>

      <WaveMarquee
        viewBox={VIEW}
        animateClass="animate-wave-flow-reverse"
        className="wave-layer wave-layer--bob wave-layer--offset absolute inset-0"
      >
        <path d={CREST} fill="#ffffff" fillOpacity={0.42} />
      </WaveMarquee>

      <WaveMarquee viewBox={VIEW} className="wave-layer absolute inset-0">
        <path d={BODY} fill={fill} />
      </WaveMarquee>
    </div>
  )
}
