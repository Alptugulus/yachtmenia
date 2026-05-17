// ---------------------------------------------------------------------------
//  Page-level helper utilities — navigation, waiting, scrolling,
//  screenshot-on-failure, and human-like interaction patterns.
// ---------------------------------------------------------------------------

import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Page, BrowserContext } from 'playwright'
import { createLogger } from './logger'
import { withRetry, withTimeout, humanDelay, sleep } from './retry'
import type { RetryOptions } from './retry'

const log = createLogger('page')

// ── Configuration ──────────────────────────────────────────────────────────

export interface NavigationOptions {
  /** Playwright load-state to wait for. */
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle'
  /** Navigation timeout in ms. */
  timeoutMs?: number
  /** Retry config for the navigation itself. */
  retry?: RetryOptions
  /** Wait for a specific selector after load. */
  waitForSelector?: string
  /** Selector wait timeout in ms. */
  selectorTimeoutMs?: number
}

export interface ScrollOptions {
  /** Target distance in pixels (0 = full page). */
  distance?: number
  /** Pixels per scroll step. */
  step?: number
  /** Delay between steps in ms. */
  delayMs?: number
}

export interface ScreenshotOptions {
  dir?: string
  prefix?: string
  fullPage?: boolean
}

const NAV_DEFAULTS: Required<Omit<NavigationOptions, 'waitForSelector' | 'selectorTimeoutMs' | 'retry'>> = {
  waitUntil: 'domcontentloaded',
  timeoutMs: 45_000,
}

// ── Navigation ─────────────────────────────────────────────────────────────

/** Navigate to URL with retry, timeout, optional selector wait. */
export async function navigateTo(
  page: Page,
  url: string,
  opts: NavigationOptions = {},
): Promise<void> {
  const { waitUntil, timeoutMs } = { ...NAV_DEFAULTS, ...opts }

  await withRetry(
    async (attempt) => {
      log.info(`Navigating to ${url}`, { attempt, waitUntil })
      await withTimeout(
        () => page.goto(url, { waitUntil, timeout: timeoutMs }),
        { ms: timeoutMs + 5_000, message: `Navigation to ${url} timed out` },
      )
    },
    { maxAttempts: 3, baseDelayMs: 2_000, label: `navigate(${url})`, ...opts.retry },
  )

  if (opts.waitForSelector) {
    log.debug(`Waiting for selector: ${opts.waitForSelector}`)
    await page.waitForSelector(opts.waitForSelector, {
      timeout: opts.selectorTimeoutMs ?? 15_000,
    })
  }
}

/** Wait for network to become idle (custom implementation for tricky SPAs). */
export async function waitForNetworkSettled(
  page: Page,
  idleMs = 1500,
  timeoutMs = 30_000,
): Promise<void> {
  await withTimeout(
    () =>
      new Promise<void>((resolve) => {
        let inflight = 0
        let timer: ReturnType<typeof setTimeout> | null = null

        const check = () => {
          if (inflight <= 0) {
            timer = setTimeout(resolve, idleMs)
          }
        }

        page.on('request', () => {
          inflight++
          if (timer) { clearTimeout(timer); timer = null }
        })
        page.on('requestfinished', () => { inflight--; check() })
        page.on('requestfailed', () => { inflight--; check() })

        check()
      }),
    { ms: timeoutMs, message: 'Network did not settle' },
  )
}

// ── Scrolling (triggers lazy-load) ─────────────────────────────────────────

/** Scroll down incrementally to trigger lazy-loaded content / images. */
export async function scrollPage(page: Page, opts: ScrollOptions = {}): Promise<void> {
  const { step = 400, delayMs = 250 } = opts

  const totalHeight = await page.evaluate(() => document.body.scrollHeight)
  const target = opts.distance && opts.distance > 0 ? Math.min(opts.distance, totalHeight) : totalHeight

  let scrolled = 0
  while (scrolled < target) {
    await page.evaluate((s) => window.scrollBy(0, s), step)
    scrolled += step
    await sleep(delayMs)
  }

  log.debug(`Scrolled ${scrolled}px / ${totalHeight}px total`)
}

/** Scroll to bottom then back to top — ensures all lazy images fire. */
export async function fullPageScroll(page: Page): Promise<void> {
  await scrollPage(page)
  await sleep(500)
  await page.evaluate(() => window.scrollTo(0, 0))
  await sleep(300)
}

// ── Screenshot ─────────────────────────────────────────────────────────────

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

/** Take a screenshot, returns the file path. */
export async function takeScreenshot(
  page: Page,
  opts: ScreenshotOptions = {},
): Promise<string> {
  const dir = opts.dir ?? 'screenshots'
  ensureDir(dir)

  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const prefix = opts.prefix ?? 'page'
  const filename = `${prefix}-${stamp}.png`
  const filepath = join(dir, filename)

  await page.screenshot({ path: filepath, fullPage: opts.fullPage ?? true })
  log.info(`Screenshot saved: ${filepath}`)
  return filepath
}

/** Wrapper: run a callback and screenshot on failure. */
export async function withScreenshotOnError<T>(
  page: Page,
  label: string,
  fn: () => Promise<T>,
  screenshotDir?: string,
): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    log.error(`${label} failed — taking screenshot`, { error: String(err) })
    await takeScreenshot(page, {
      dir: screenshotDir ?? 'screenshots',
      prefix: `error-${label.replace(/\W+/g, '-')}`,
    }).catch(() => {})
    throw err
  }
}

// ── Human-like interactions ────────────────────────────────────────────────

/** Click with a realistic human delay before and after. */
export async function humanClick(page: Page, selector: string): Promise<void> {
  await humanDelay(200, 600)
  await page.click(selector, { delay: Math.random() * 80 + 30 })
  await humanDelay(300, 800)
}

/** Type text character-by-character with random per-key delay. */
export async function humanType(
  page: Page,
  selector: string,
  text: string,
): Promise<void> {
  await page.click(selector)
  await humanDelay(100, 300)
  for (const char of text) {
    await page.keyboard.type(char, { delay: Math.random() * 120 + 40 })
  }
}

/** Random mouse movement to simulate real browsing. */
export async function jiggleMouse(page: Page): Promise<void> {
  const vp = page.viewportSize() ?? { width: 1440, height: 900 }
  const x = Math.round(Math.random() * vp.width * 0.8 + vp.width * 0.1)
  const y = Math.round(Math.random() * vp.height * 0.6 + vp.height * 0.1)
  await page.mouse.move(x, y, { steps: Math.round(Math.random() * 5 + 3) })
  await humanDelay(100, 400)
}

// ── Content extraction ─────────────────────────────────────────────────────

/** Wait for images to finish loading (handles lazy-load). */
export async function waitForImages(page: Page, timeoutMs = 15_000): Promise<void> {
  await withTimeout(
    () =>
      page.evaluate(() =>
        Promise.all(
          Array.from(document.images)
            .filter((img) => !img.complete)
            .map(
              (img) =>
                new Promise<void>((resolve) => {
                  img.addEventListener('load', () => resolve())
                  img.addEventListener('error', () => resolve())
                }),
            ),
        ),
      ),
    { ms: timeoutMs, message: 'Images did not finish loading' },
  ).catch(() => log.warn('Some images did not load within timeout'))
}

/** Extract all image URLs from the page. */
export async function collectImageUrls(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const urls = new Set<string>()

    document.querySelectorAll('img[src]').forEach((img) => {
      const src = (img as HTMLImageElement).src
      if (src && !src.startsWith('data:')) urls.add(src)
    })

    document.querySelectorAll('[data-src]').forEach((el) => {
      const ds = el.getAttribute('data-src')
      if (ds) urls.add(ds)
    })

    document.querySelectorAll('source[srcset]').forEach((s) => {
      const srcset = s.getAttribute('srcset') ?? ''
      srcset.split(',').forEach((entry) => {
        const url = entry.trim().split(/\s+/)[0]
        if (url && !url.startsWith('data:')) urls.add(url)
      })
    })

    return [...urls]
  })
}

/** Extract text content from a selector, returns undefined if missing. */
export async function safeTextContent(
  page: Page,
  selector: string,
): Promise<string | undefined> {
  const el = await page.$(selector)
  if (!el) return undefined
  const text = await el.textContent()
  return text?.trim() || undefined
}

/** Extract attribute value, returns undefined if missing. */
export async function safeAttribute(
  page: Page,
  selector: string,
  attr: string,
): Promise<string | undefined> {
  const el = await page.$(selector)
  if (!el) return undefined
  return (await el.getAttribute(attr)) ?? undefined
}

// ── Context / page factory ─────────────────────────────────────────────────

/** Open a fresh page inside a context with stealth defaults applied. */
export async function createStealthPage(context: BrowserContext): Promise<Page> {
  const page = await context.newPage()

  await page.route('**/*.{png,jpg,jpeg,gif,svg,woff,woff2,ttf,eot}', (route) => {
    const resourceType = route.request().resourceType()
    if (resourceType === 'font') return route.abort()
    return route.continue()
  })

  return page
}

/** Open a fresh page that loads ALL resources (needed when collecting images). */
export async function createFullPage(context: BrowserContext): Promise<Page> {
  return context.newPage()
}
