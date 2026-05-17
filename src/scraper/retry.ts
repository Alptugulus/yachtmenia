// ---------------------------------------------------------------------------
//  Retry & timeout utilities for resilient scraping.
// ---------------------------------------------------------------------------

import { createLogger } from './logger'

const log = createLogger('retry')

// ── Types ──────────────────────────────────────────────────────────────────

export interface RetryOptions {
  /** Maximum number of attempts (including the first). */
  maxAttempts?: number
  /** Base delay between retries in ms (doubles each attempt). */
  baseDelayMs?: number
  /** Maximum delay cap in ms. */
  maxDelayMs?: number
  /** Jitter factor 0–1 added to each delay. */
  jitter?: number
  /** If provided, only retry when this returns true for the error. */
  retryIf?: (error: unknown) => boolean
  /** Label for log messages. */
  label?: string
}

export interface TimeoutOptions {
  /** Timeout duration in ms. */
  ms: number
  /** Error message on timeout. */
  message?: string
}

// ── Retry ──────────────────────────────────────────────────────────────────

const DEFAULTS: Required<Omit<RetryOptions, 'retryIf' | 'label'>> = {
  maxAttempts: 3,
  baseDelayMs: 1000,
  maxDelayMs: 30_000,
  jitter: 0.25,
}

export async function withRetry<T>(
  fn: (attempt: number) => Promise<T>,
  opts: RetryOptions = {},
): Promise<T> {
  const { maxAttempts, baseDelayMs, maxDelayMs, jitter } = { ...DEFAULTS, ...opts }
  const label = opts.label ?? 'operation'

  let lastError: unknown

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn(attempt)
    } catch (err) {
      lastError = err

      if (opts.retryIf && !opts.retryIf(err)) {
        log.warn(`${label} failed (non-retryable)`, {
          attempt,
          error: String(err),
        })
        throw err
      }

      if (attempt === maxAttempts) break

      const exp = Math.min(baseDelayMs * 2 ** (attempt - 1), maxDelayMs)
      const jitterMs = Math.round(exp * jitter * Math.random())
      const delay = exp + jitterMs

      log.warn(`${label} attempt ${attempt}/${maxAttempts} failed — retrying in ${delay}ms`, {
        error: String(err),
      })
      await sleep(delay)
    }
  }

  log.error(`${label} failed after ${maxAttempts} attempts`)
  throw lastError
}

// ── Timeout ────────────────────────────────────────────────────────────────

export class TimeoutError extends Error {
  constructor(ms: number, message?: string) {
    super(message ?? `Operation timed out after ${ms}ms`)
    this.name = 'TimeoutError'
  }
}

export async function withTimeout<T>(
  fn: () => Promise<T>,
  opts: TimeoutOptions,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new TimeoutError(opts.ms, opts.message)),
      opts.ms,
    )

    fn().then(
      (val) => { clearTimeout(timer); resolve(val) },
      (err) => { clearTimeout(timer); reject(err) },
    )
  })
}

// ── Timing helpers ─────────────────────────────────────────────────────────

export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

/** Random delay in [minMs, maxMs] — humanizes action intervals. */
export function humanDelay(minMs = 300, maxMs = 1200): Promise<void> {
  const ms = Math.round(minMs + Math.random() * (maxMs - minMs))
  return sleep(ms)
}
