/**
 * Trims logo PNGs to content bounds and exports 1x + @2x for crisp navbar/footer display.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const logosDir = path.join(__dirname, '..', 'public', 'media', 'logos')

/** Navbar lockup: çapa + yazı yatay (dosya adı `vertical`). */
const NAV_LOCKUP = [
  'yachting-vertical-light.png',
  'yachting-vertical-dark.png',
]

/** İkon-üstü lockup (dosya adı `horizontal`). */
const STACKED = [
  'yachting-horizontal-light.png',
  'yachting-horizontal-dark.png',
  'brokerage-horizontal-light.png',
  'brokerage-horizontal-dark.png',
  'refit-horizontal-light.png',
  'refit-horizontal-dark.png',
]

const HORIZONTAL = [...NAV_LOCKUP, ...STACKED]

async function main() {
  const sharp = (await import('sharp')).default

  for (const file of HORIZONTAL) {
    const input = path.join(logosDir, file)
    const base = file.replace(/\.png$/i, '')
    const out1x = path.join(logosDir, `${base}-trim.png`)
    const out2x = path.join(logosDir, `${base}-trim@2x.png`)

    const trimmed = sharp(input).trim({ threshold: 12 }).png({ compressionLevel: 9 })
    const meta = await trimmed.clone().metadata()

    await trimmed.toFile(out1x)

    const targetW = Math.min(2400, (meta.width ?? 900) * 2)
    await sharp(out1x)
      .resize({ width: targetW, withoutEnlargement: false })
      .png({ compressionLevel: 9 })
      .toFile(out2x)

    console.log(`[trim-logos] ${file} → ${base}-trim.png (${meta.width}×${meta.height}) + @2x`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
