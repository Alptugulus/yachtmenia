/**
 * Yatay yazılı lockup (yachting-vertical-*) → src/assets/brand + public/media/logos
 * Vite import ile hash’li URL; public kopyası SEO / preload için.
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

async function main() {
  const sharp = (await import('sharp')).default
  await fs.mkdir(brandDir, { recursive: true })

  for (const { src, out } of LOCKUPS) {
    const input = path.join(logosDir, src)
    const brand1x = path.join(brandDir, `${out}.png`)
    const brand2x = path.join(brandDir, `${out}@2x.png`)
    const public1x = path.join(logosDir, `${out}.png`)
    const public2x = path.join(logosDir, `${out}@2x.png`)

    const trimmed = sharp(input).trim({ threshold: 12 }).png({ compressionLevel: 9 })
    const meta = await trimmed.clone().metadata()

    await trimmed.toFile(brand1x)
    await fs.copyFile(brand1x, public1x)

    const targetW = Math.min(2400, (meta.width ?? 900) * 2)
    await sharp(brand1x)
      .resize({ width: targetW, withoutEnlargement: false })
      .png({ compressionLevel: 9 })
      .toFile(brand2x)
    await fs.copyFile(brand2x, public2x)

    console.log(`[trim-logos] ${src} → brand/${out}.png (${meta.width}×${meta.height})`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
