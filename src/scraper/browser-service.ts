// ---------------------------------------------------------------------------
//  BrowserService — manages a long-lived Chromium instance with stealth
//  defaults, proxy support, and clean lifecycle management.
// ---------------------------------------------------------------------------

import { chromium } from 'playwright'
import type { Browser, BrowserContext, LaunchOptions } from 'playwright'
import { createLogger } from './logger'

const log = createLogger('browser')

// ── Configuration ──────────────────────────────────────────────────────────

export interface BrowserConfig {
  headless?: boolean
  proxy?: {
    server: string
    username?: string
    password?: string
  }
  /** Extra Chromium launch args. */
  args?: string[]
  /** Slow-mo between Playwright actions (ms). */
  slowMo?: number
  /** Browser-level timeout for navigation etc. (ms). */
  defaultTimeout?: number
  /** Directory for screenshots on failure. */
  screenshotDir?: string
  /** Custom user-agent override. */
  userAgent?: string
  /** Viewport dimensions. */
  viewport?: { width: number; height: number }
  /** Accept-Language header. */
  locale?: string
  /** Timezone ID, e.g. "Europe/Istanbul". */
  timezoneId?: string
}

// ── Realistic defaults ─────────────────────────────────────────────────────

const DEFAULT_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

const DEFAULT_VIEWPORT = { width: 1440, height: 900 }

const STEALTH_ARGS = [
  '--disable-blink-features=AutomationControlled',
  '--disable-features=IsolateOrigins,site-per-process',
  '--disable-infobars',
  '--disable-dev-shm-usage',
  '--no-sandbox',
  '--window-size=1440,900',
]

// ── Singleton service ──────────────────────────────────────────────────────

export class BrowserService {
  private browser: Browser | null = null
  private config: BrowserConfig

  constructor(config: BrowserConfig = {}) {
    this.config = config
  }

  // ── Lifecycle ────────────────────────────────────────────────────────────

  async launch(): Promise<Browser> {
    if (this.browser?.isConnected()) return this.browser

    const launchOpts: LaunchOptions = {
      headless: this.config.headless ?? true,
      slowMo: this.config.slowMo,
      args: [...STEALTH_ARGS, ...(this.config.args ?? [])],
    }

    if (this.config.proxy) {
      launchOpts.proxy = {
        server: this.config.proxy.server,
        username: this.config.proxy.username,
        password: this.config.proxy.password,
      }
    }

    log.info('Launching Chromium', {
      headless: launchOpts.headless,
      proxy: this.config.proxy?.server ?? 'none',
    })
    this.browser = await chromium.launch(launchOpts)

    this.browser.on('disconnected', () => {
      log.warn('Browser disconnected')
      this.browser = null
    })

    return this.browser
  }

  /** Get the running browser, launching if necessary. */
  async getBrowser(): Promise<Browser> {
    return this.browser?.isConnected() ? this.browser : this.launch()
  }

  /** Create a fresh BrowserContext with stealth & realistic fingerprint. */
  async newContext(overrides: Partial<BrowserConfig> = {}): Promise<BrowserContext> {
    const browser = await this.getBrowser()
    const cfg = { ...this.config, ...overrides }

    const context = await browser.newContext({
      userAgent: cfg.userAgent ?? DEFAULT_UA,
      viewport: cfg.viewport ?? DEFAULT_VIEWPORT,
      locale: cfg.locale ?? 'en-US',
      timezoneId: cfg.timezoneId ?? 'Europe/Istanbul',
      bypassCSP: true,
      javaScriptEnabled: true,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        'Accept-Language': 'en-US,en;q=0.9,tr;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
      },
    })

    if (cfg.defaultTimeout) {
      context.setDefaultTimeout(cfg.defaultTimeout)
    }

    await this.applyStealthScripts(context)

    log.info('Context created', {
      ua: (cfg.userAgent ?? DEFAULT_UA).slice(0, 60) + '…',
      viewport: cfg.viewport ?? DEFAULT_VIEWPORT,
    })

    return context
  }

  /** Gracefully close browser and all contexts. */
  async close(): Promise<void> {
    if (this.browser) {
      log.info('Closing browser')
      await this.browser.close().catch(() => {})
      this.browser = null
    }
  }

  // ── Stealth patches ──────────────────────────────────────────────────────

  private async applyStealthScripts(context: BrowserContext): Promise<void> {
    await context.addInitScript(() => {
      // Hide webdriver flag
      Object.defineProperty(navigator, 'webdriver', { get: () => false })

      // Realistic plugins array
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      })

      // Realistic languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en', 'tr'],
      })

      // Chrome runtime stub
      ;(window as Record<string, unknown>).chrome = {
        runtime: {},
        loadTimes: () => ({}),
        csi: () => ({}),
      }

      // Permissions query patch
      const originalQuery = window.navigator.permissions.query.bind(
        window.navigator.permissions,
      )
      window.navigator.permissions.query = (params: PermissionDescriptor) => {
        if (params.name === 'notifications') {
          return Promise.resolve({ state: 'prompt' } as PermissionStatus)
        }
        return originalQuery(params)
      }

      // WebGL vendor/renderer
      const getParameter = WebGLRenderingContext.prototype.getParameter
      WebGLRenderingContext.prototype.getParameter = function (param: number) {
        if (param === 37445) return 'Intel Inc.'
        if (param === 37446) return 'Intel Iris OpenGL Engine'
        return getParameter.call(this, param)
      }
    })
  }
}
