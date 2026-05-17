// ---------------------------------------------------------------------------
//  Provider detection — resolves a URL to a known yacht marketplace.
// ---------------------------------------------------------------------------

// ── Enum ───────────────────────────────────────────────────────────────────

export enum Provider {
  YachtWorld = 'YACHTWORLD',
  BoatsCom = 'BOATS_COM',
  Boat24 = 'BOAT24',
  RightBoat = 'RIGHTBOAT',
  BoatTrader = 'BOAT_TRADER',
  Yatco = 'YATCO',
  TheYachtMarket = 'THE_YACHT_MARKET',
  BoatShop24 = 'BOATSHOP24',
  INautia = 'INAUTIA',
}

// ── Domain → Provider map ──────────────────────────────────────────────────

interface ProviderEntry {
  provider: Provider
  label: string
  /** Base URL used when building canonical links. */
  origin: string
}

const DOMAIN_MAP: Record<string, ProviderEntry> = {
  'yachtworld.com':       { provider: Provider.YachtWorld,      label: 'YachtWorld',      origin: 'https://www.yachtworld.com' },
  'www.yachtworld.com':   { provider: Provider.YachtWorld,      label: 'YachtWorld',      origin: 'https://www.yachtworld.com' },

  'boats.com':            { provider: Provider.BoatsCom,        label: 'Boats.com',       origin: 'https://www.boats.com' },
  'www.boats.com':        { provider: Provider.BoatsCom,        label: 'Boats.com',       origin: 'https://www.boats.com' },

  'boat24.com':           { provider: Provider.Boat24,          label: 'Boat24',          origin: 'https://www.boat24.com' },
  'www.boat24.com':       { provider: Provider.Boat24,          label: 'Boat24',          origin: 'https://www.boat24.com' },

  'rightboat.com':        { provider: Provider.RightBoat,       label: 'RightBoat',       origin: 'https://www.rightboat.com' },
  'www.rightboat.com':    { provider: Provider.RightBoat,       label: 'RightBoat',       origin: 'https://www.rightboat.com' },

  'boattrader.com':       { provider: Provider.BoatTrader,      label: 'BoatTrader',      origin: 'https://www.boattrader.com' },
  'www.boattrader.com':   { provider: Provider.BoatTrader,      label: 'BoatTrader',      origin: 'https://www.boattrader.com' },

  'yatco.com':            { provider: Provider.Yatco,           label: 'YATCO',           origin: 'https://www.yatco.com' },
  'www.yatco.com':        { provider: Provider.Yatco,           label: 'YATCO',           origin: 'https://www.yatco.com' },

  'theyachtmarket.com':   { provider: Provider.TheYachtMarket,  label: 'TheYachtMarket',  origin: 'https://www.theyachtmarket.com' },
  'www.theyachtmarket.com': { provider: Provider.TheYachtMarket, label: 'TheYachtMarket', origin: 'https://www.theyachtmarket.com' },

  'boatshop24.com':       { provider: Provider.BoatShop24,      label: 'BoatShop24',      origin: 'https://www.boatshop24.com' },
  'www.boatshop24.com':   { provider: Provider.BoatShop24,      label: 'BoatShop24',      origin: 'https://www.boatshop24.com' },

  'inautia.com':          { provider: Provider.INautia,         label: 'iNautia',         origin: 'https://www.inautia.com' },
  'www.inautia.com':      { provider: Provider.INautia,         label: 'iNautia',         origin: 'https://www.inautia.com' },
}

// ── Errors ─────────────────────────────────────────────────────────────────

export class UnsupportedProviderError extends Error {
  public readonly url: string
  public readonly hostname: string

  constructor(url: string, hostname: string) {
    super(`Unsupported provider: ${hostname} (from ${url})`)
    this.name = 'UnsupportedProviderError'
    this.url = url
    this.hostname = hostname
  }
}

export class InvalidUrlError extends Error {
  public readonly raw: string

  constructor(raw: string) {
    super(`Invalid URL: "${raw}"`)
    this.name = 'InvalidUrlError'
    this.raw = raw
  }
}

// ── URL parsing ────────────────────────────────────────────────────────────

function parseHostname(raw: string): string {
  try {
    return new URL(raw).hostname.toLowerCase()
  } catch {
    throw new InvalidUrlError(raw)
  }
}

/** Strip common subdomains to match the root domain entry. */
function rootDomain(hostname: string): string {
  const parts = hostname.split('.')
  if (parts.length > 2) return parts.slice(-2).join('.')
  return hostname
}

// ── Detection ──────────────────────────────────────────────────────────────

export interface DetectionResult {
  provider: Provider
  label: string
  origin: string
  hostname: string
}

/**
 * Detect the marketplace provider from a listing URL.
 * Throws `InvalidUrlError` for malformed URLs and
 * `UnsupportedProviderError` for unknown domains.
 */
export function detectProvider(url: string): DetectionResult {
  const hostname = parseHostname(url)

  const exact = DOMAIN_MAP[hostname]
  if (exact) return { ...exact, hostname }

  const root = rootDomain(hostname)
  const rootMatch = DOMAIN_MAP[root]
  if (rootMatch) return { ...rootMatch, hostname }

  throw new UnsupportedProviderError(url, hostname)
}

// ── Validation helpers ─────────────────────────────────────────────────────

/** Returns true if the URL belongs to a supported marketplace. */
export function isSupportedUrl(url: string): boolean {
  try {
    detectProvider(url)
    return true
  } catch {
    return false
  }
}

/** Returns the Provider enum value or undefined for unsupported URLs. */
export function tryDetectProvider(url: string): Provider | undefined {
  try {
    return detectProvider(url).provider
  } catch {
    return undefined
  }
}

/** Type guard: checks if a value is a valid Provider enum member. */
export function isProvider(value: unknown): value is Provider {
  return typeof value === 'string' && PROVIDER_SET.has(value as Provider)
}

const PROVIDER_SET = new Set<Provider>(Object.values(Provider))

/** All supported providers as a readonly array. */
export const SUPPORTED_PROVIDERS: readonly Provider[] = Object.values(Provider)

/** Human-readable label for a provider. */
export function providerLabel(provider: Provider): string {
  for (const entry of Object.values(DOMAIN_MAP)) {
    if (entry.provider === provider) return entry.label
  }
  return provider
}

/** Canonical base URL for a provider. */
export function providerOrigin(provider: Provider): string {
  for (const entry of Object.values(DOMAIN_MAP)) {
    if (entry.provider === provider) return entry.origin
  }
  return ''
}
