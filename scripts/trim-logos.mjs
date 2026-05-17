/**
 * Navbar lockup = footer PNG’nin lacivert kopyası (aynı kalite).
 * yachting-vertical ince çizgili master — navbar’da bozuluyordu.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const footerSrc = path.join(root, 'public', 'yachtmenia-logo-footer.png')
const brandOut = path.join(root, 'src', 'assets', 'brand', 'navbar-lockup-light.png')
const publicOut = path.join(root, 'public', 'yachtmenia-logo-navbar.png')

const NAVY = { r: 0, g: 0, b: 50 }
const OUT_W = 600
const OUT_H = 240

async function footerToNavbarLockup(sharp, input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const out = Buffer.alloc(data.length)
  for (let i = 0; i < info.width * info.height; i++) {
    const o = i * 4
    const a = data[o + 3] / 255
    if (a < 0.04) {
      out[o + 3] = 0
      continue
    }
    out[o] = NAVY.r
    out[o + 1] = NAVY.g
    out[o + 2] = NAVY.b
    out[o + 3] = Math.round(a * 255)
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } }).resize({
    width: OUT_W,
    height: OUT_H,
    kernel: sharp.kernel.lanczos3,
  })
}

async function main() {
  const sharp = (await import('sharp')).default
  const pipeline = await footerToNavbarLockup(sharp, footerSrc)
  await pipeline.clone().png({ compressionLevel: 6 }).toFile(brandOut)
  await pipeline.clone().png({ compressionLevel: 6 }).toFile(publicOut)
  console.log(`[trim-logos] footer → navbar lockup ${OUT_W}×${OUT_H} (lacivert)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
