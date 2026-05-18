/** Seamless sine shoreline: y(0) === y(width) for infinite horizontal scroll. */
export function sineWavePath(
  width: number,
  depth: number,
  baseline: number,
  amplitude: number,
  cycles: number,
  segments = 72,
): string {
  const parts: string[] = []
  for (let i = 0; i <= segments; i++) {
    const x = (width / segments) * i
    const y = baseline + amplitude * Math.sin((2 * Math.PI * cycles * x) / width)
    const cmd = i === 0 ? 'M' : 'L'
    parts.push(`${cmd}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return `${parts.join(' ')} L${width},${depth} L0,${depth} Z`
}
