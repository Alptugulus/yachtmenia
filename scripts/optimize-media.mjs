/**
 * public/media içindeki JPEG’leri okuyup yanına .webp ve .avif üretir.
 * `public/media/logos` atlanır (PNG markalar).
 * Çıktı: max 1920px uzun kenar, withoutEnlargement.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const mediaDir = path.join(root, 'public', 'media')

async function main() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.warn('[optimize-media] sharp yüklü değil; atlanıyor.')
    process.exit(0)
  }

  try {
    await fs.access(mediaDir)
  } catch {
    console.warn('[optimize-media] public/media yok; atlanıyor.')
    return
  }

  const files = await collectRasterFiles(mediaDir)
  if (files.length === 0) {
    console.warn('[optimize-media] işlenecek görsel yok.')
    return
  }

  let done = 0
  for (const abs of files) {
    const rel = path.relative(mediaDir, abs)
    const base = abs.replace(/\.(jpe?g|png)$/i, '')
    const outWebp = `${base}.webp`
    const outAvif = `${base}.avif`

    const input = sharp(abs).rotate().resize({
      width: 1920,
      height: 1920,
      fit: 'inside',
      withoutEnlargement: true,
    })

    await input.clone().webp({ quality: 82, effort: 5 }).toFile(outWebp)
    await input.clone().avif({ quality: 48, effort: 5 }).toFile(outAvif)
    done += 1
    console.log(`[optimize-media] ${rel} → .webp + .avif`)
  }

  console.log(`[optimize-media] tamam: ${done} kaynak.`)
}

/**
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function collectRasterFiles(dir) {
  /** @type {string[]} */
  const out = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === 'logos') continue
      out.push(...(await collectRasterFiles(full)))
      continue
    }
    if (!/\.(jpe?g|png)$/i.test(ent.name)) continue
    if (/\.(webp|avif)$/i.test(ent.name)) continue
    out.push(full)
  }
  return out
}

await main()
