import type { ReactNode } from 'react'

type WaveMarqueeProps = {
  viewBox: string
  children: ReactNode
  /** Tailwind animation utility, e.g. animate-wave-flow-slow */
  animateClass?: string
  className?: string
  tileClassName?: string
}

function WaveTile({
  viewBox,
  children,
  className = '',
}: {
  viewBox: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`wave-marquee__tile ${className}`}>
      <svg
        className="wave-marquee__svg"
        viewBox={viewBox}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {children}
      </svg>
    </div>
  )
}

/**
 * Seamless horizontal wave scroll. Motion on/off is CSS-only
 * (@media prefers-reduced-motion) so devtools always show the track.
 */
export function WaveMarquee({
  viewBox,
  children,
  animateClass = 'animate-wave-flow',
  className = '',
  tileClassName = '',
}: WaveMarqueeProps) {
  return (
    <div className={`wave-marquee ${className}`}>
      <div className={`wave-marquee__track ${animateClass}`}>
        <WaveTile viewBox={viewBox} className={tileClassName}>
          {children}
        </WaveTile>
        <WaveTile viewBox={viewBox} className={tileClassName}>
          {children}
        </WaveTile>
      </div>
    </div>
  )
}
