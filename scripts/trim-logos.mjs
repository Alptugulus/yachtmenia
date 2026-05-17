/**
 * Yatay yazılı lockup (yachting-vertical-*) → src/assets/brand + public/media/logos
 * 2x/3x + hafif sharpen: ince çapa çizgileri navbar boyutunda net kalır.
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

/** İnce çizgiler için hafif keskinleştirme (aşırı hale getirmez) */
function sharpenLogo(pipeline) {
  return pipeline.sharpen({ sigma: 0.65, m1: 1.05, m2: 0.85, x1: 2, y2: 8, y3: 18 })
}

async function main() {
  const sharp = (await import('sharp')).default
  await fs.mkdir(brandDir, { recursive: true })

  for (const { src, out } of LOCKUPS) {
    const input = path.join(logosDir, src)
    const brand1x = path.join(brandDir, `${out}.png`)
    const brand2x = path.join(brandDir, `${out}@2x.png`)
    const brand3x = path.join(brandDir, `${out}@3x.png`)
    const public1x = path.join(logosDir, `${out}.png`)
    const public2x = path.join(logosDir, `${out}@2x.png`)

    const trimmed = sharp(input).trim({ threshold: 12 })
    const trimmedBuf = await trimmed.png({ compressionLevel: 9 }).toBuffer()
    const meta = await sharp(trimmedBuf).metadata()
    const baseW = meta.width ?? 918

    await sharpenLogo(sharp(trimmedBuf)).png({ compressionLevel: 9 }).toFile(brand1x)
    await fs.copyFile(brand1x, public1x)

    const w2 = Math.min(2400, baseW * 2)
    await sharpenLogo(
      sharp(trimmedBuf).resize({ width: w2, kernel: sharp.kernel.lanczos3 }),
    )
      .png({ compressionLevel: 9 })
      .toFile(brand2x)
    await fs.copyFile(brand2x, public2x)

    const w3 = Math.min(3600, baseW * 3)
    await sharpenLogo(
      sharp(trimmedBuf).resize({ width: w3, kernel: sharp.kernel.lanczos3 }),
    )
      .png({ compressionLevel: 9 })
      .toFile(brand3x)

    console.log(
      `[trim-logos] ${src} → ${out} (${baseW}×${meta.height}) 1x/2x/${w3}px`,
    )
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
