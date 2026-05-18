import { WaveMarquee } from '@/components/common/WaveMarquee'
import { sineWavePath } from '@/utils/wavePath'

type SectionWaveTone = 'pearl' | 'mist' | 'brand'

const TONE_FILL: Record<SectionWaveTone, string> = {
  pearl: 'var(--color-pearl)',
  mist: 'var(--color-mist)',
  brand: 'var(--color-brand)',
}

const VIEW = '0 0 1440 48'
const EDGE = sineWavePath(1440, 48, 22, 10, 2.25)

type SectionWaveProps = {
  topTone: SectionWaveTone
  bottomTone: SectionWaveTone
  className?: string
}

export function SectionWave({ topTone, bottomTone, className = '' }: SectionWaveProps) {
  const topFill = TONE_FILL[topTone]
  const bottomFill = TONE_FILL[bottomTone]

  return (
    <div
      className={`relative -mt-px h-10 w-full overflow-hidden sm:h-12 ${className}`}
      style={{ backgroundColor: topFill }}
      aria-hidden
    >
      <WaveMarquee
        viewBox={VIEW}
        animateClass="animate-wave-flow-slow"
        className="absolute bottom-0 left-0 h-[58%] w-full"
      >
        <path d={EDGE} fill={bottomFill} />
      </WaveMarquee>
    </div>
  )
}
