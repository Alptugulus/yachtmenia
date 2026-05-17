/**
 * Orijinal lockup → src/assets/brand (sadece trim, işleme yok).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const logosDir = path.join(root, 'public', 'media', 'logos')
const brandDir = path.join(root, 'src', 'assets', 'brand')

const PAIRS = [
  { src: 'yachting-vertical-light.png', out: 'navbar-lockup-light.png' },
  { src: 'yachting-vertical-dark.png', out: 'navbar-lockup-dark.png' },
]

async function main() {
  const sharp = (await import('sharp')).default
  await fs.mkdir(brandDir, { recursive: true })

  for (const { src, out } of PAIRS) {
    const input = path.join(logosDir, src)
    const dest = path.join(brandDir, out)
    const meta = await sharp(input)
      .trim({ threshold: 12 })
      .png({ compressionLevel: 6 })
      .toFile(dest)
    console.log(`[trim-logos] ${src} → brand/${out} (${meta.width}×${meta.height})`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
