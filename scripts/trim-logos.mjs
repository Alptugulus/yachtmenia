/**
 * Yatay lockup → src/assets/brand
 * - Alpha 1px kalınlaştırma (çapa çizgisi kopmasın)
 * - Sharpen YOK (ince çizgide kesik / tırtıklı yapar)
 * - @2x kaynak: tam piksel ölçek için yeterli, yumuşak küçültme
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const logosDir = path.join(root, 'public', 'media', 'logos')
const brandDir = path.join(root, 'src', 'assets', 'brand')

const LOCKUPS = [
  { src: 'yachting-vertical-light.png', out: 'lockup-light' },
  { src: 'yachting-vertical-dark.png', out: 'lockup-dark' },
]

/** Alpha kanalında 1px genişlet — ince çapa kopuk görünmesin */
function thickenAlpha(raw, width, height, channels, radius = 1) {
  const out = Buffer.from(raw)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      let maxA = raw[i + 3]
      let ri = raw[i]
      let gi = raw[i + 1]
      let bi = raw[i + 2]
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (dx === 0 && dy === 0) continue
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue
          const ni = (ny * width + nx) * channels
          const a = raw[ni + 3]
          if (a > maxA) {
            maxA = a
            ri = raw[ni]
            gi = raw[ni + 1]
            bi = raw[ni + 2]
          }
        }
      }
      out[i] = ri
      out[i + 1] = gi
      out[i + 2] = bi
      out[i + 3] = maxA
    }
  }
  return out
}

async function processLockup(sharp, inputPath) {
  const trimmedBuf = await sharp(inputPath)
    .trim({ threshold: 12 })
    .png({ compressionLevel: 6 })
    .toBuffer()

  const { data, info } = await sharp(trimmedBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const thickened = thickenAlpha(data, info.width, info.height, info.channels, 1)

  return sharp(thickened, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  }).png({ compressionLevel: 6 })
}

async function main() {
  const sharp = (await import('sharp')).default
  await fs.mkdir(brandDir, { recursive: true })

  for (const { src, out } of LOCKUPS) {
    const input = path.join(logosDir, src)
    const brand1x = path.join(brandDir, `${out}.png`)
    const brand2x = path.join(brandDir, `${out}@2x.png`)
    const public1x = path.join(logosDir, `${out}.png`)
    const public2x = path.join(logosDir, `${out}@2x.png`)

    const base = await processLockup(sharp, input)
    const meta = await base.clone().metadata()
    const baseW = meta.width ?? 918

    await base.clone().toFile(brand1x)
    await fs.copyFile(brand1x, public1x)

    const w2 = Math.min(2400, baseW * 2)
    await base
      .clone()
      .resize({ width: w2, kernel: sharp.kernel.lanczos3 })
      .toFile(brand2x)
    await fs.copyFile(brand2x, public2x)

    console.log(`[trim-logos] ${src} → ${out} (${baseW}×${meta.height}), display @2x ${w2}px`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
