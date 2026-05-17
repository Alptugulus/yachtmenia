// ---------------------------------------------------------------------------
//  Yacht normalization pipeline — converts a RawYachtListing (scraped /
//  imported from any marketplace) into a NormalizedYacht with validation.
// ---------------------------------------------------------------------------

import {
  Currency,
  FuelType,
  HullMaterial,
  LengthUnit,
  ListingStatus,
  SpeedUnit,
  WeightUnit,
  YachtCategory,
  YachtCondition,
} from '@/types/yacht-normalized'
import type {
  BrokerContact,
  Dimension,
  EngineSpec,
  ListingSource,
  NormalizationResult,
  NormalizedYacht,
  Price,
  RawYachtListing,
  Speed,
  Weight,
} from '@/types/yacht-normalized'

// ── String cleanup ─────────────────────────────────────────────────────────

const HTML_TAG = /<[^>]*>/g
const MULTI_WS = /\s{2,}/g
const ENTITY = /&(?:#(\d+)|#x([0-9a-f]+)|(\w+));/gi

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'",
  nbsp: ' ', ndash: '–', mdash: '—', bull: '•',
  euro: '€', pound: '£', yen: '¥', copy: '©',
  reg: '®', trade: '™', laquo: '«', raquo: '»',
}

function decodeEntities(s: string): string {
  return s.replace(ENTITY, (_, dec, hex, name) => {
    if (dec) return String.fromCharCode(parseInt(dec, 10))
    if (hex) return String.fromCharCode(parseInt(hex, 16))
    if (name) return NAMED_ENTITIES[name.toLowerCase()] ?? ''
    return ''
  })
}

/** Strip HTML, decode entities, collapse whitespace, trim. */
export function cleanString(raw: string | null | undefined): string | undefined {
  if (raw == null) return undefined
  const s = decodeEntities(raw.replace(HTML_TAG, ' '))
    .replace(MULTI_WS, ' ')
    .trim()
  return s.length > 0 ? s : undefined
}

/** Same as cleanString but guarantees a string (empty fallback). */
function mustClean(raw: string | null | undefined): string {
  return cleanString(raw) ?? ''
}

// ── Numeric parsing ────────────────────────────────────────────────────────

const NUMERIC_CHARS = /[^\d.,]/g

/** Extract the first parseable float from a messy string. */
export function parseNumber(raw: string | null | undefined): number | undefined {
  if (raw == null) return undefined
  const cleaned = raw.replace(NUMERIC_CHARS, '').replace(',', '.')
  const n = parseFloat(cleaned)
  return Number.isFinite(n) ? n : undefined
}

/** Parse an integer; ignores decimals. */
export function parseInteger(raw: string | null | undefined): number | undefined {
  const n = parseNumber(raw)
  return n != null ? Math.round(n) : undefined
}

// ── Unit detection ─────────────────────────────────────────────────────────

function detectLengthUnit(raw: string): LengthUnit {
  const l = raw.toLowerCase()
  if (/\bft\b|feet|foot|'/.test(l)) return LengthUnit.Feet
  return LengthUnit.Meters
}

function detectWeightUnit(raw: string): WeightUnit {
  const l = raw.toLowerCase()
  if (/\blbs?\b|pounds?/.test(l)) return WeightUnit.Pounds
  if (/\btonnes?\b|tons?\b/.test(l)) return WeightUnit.Tonnes
  return WeightUnit.Kilograms
}

function detectSpeedUnit(raw: string): SpeedUnit {
  const l = raw.toLowerCase()
  if (/\bmph\b/.test(l)) return SpeedUnit.Mph
  if (/\bkm\s*\/?\s*h\b|kmh/.test(l)) return SpeedUnit.Kmh
  return SpeedUnit.Knots
}

// ── Dimension / unit parsers ───────────────────────────────────────────────

export function parseDimension(raw: string | null | undefined): Dimension | undefined {
  const v = parseNumber(raw)
  if (v == null || v <= 0) return undefined
  return { value: v, unit: detectLengthUnit(raw!) }
}

export function parseWeight(raw: string | null | undefined): Weight | undefined {
  const v = parseNumber(raw)
  if (v == null || v <= 0) return undefined
  return { value: v, unit: detectWeightUnit(raw!) }
}

export function parseSpeed(raw: string | null | undefined): Speed | undefined {
  const v = parseNumber(raw)
  if (v == null || v <= 0) return undefined
  return { value: v, unit: detectSpeedUnit(raw!) }
}

// ── Enum mappers ───────────────────────────────────────────────────────────

const ENUM_ALIAS = <T extends Record<string, string>>(
  map: Record<string, T[keyof T]>,
  raw: string | null | undefined,
  fallback: T[keyof T],
): T[keyof T] => {
  if (raw == null) return fallback
  const k = raw.toLowerCase().replace(/[\s_-]+/g, '')
  return (map[k] as T[keyof T]) ?? fallback
}

const CURRENCY_MAP: Record<string, Currency> = {
  eur: Currency.EUR, '€': Currency.EUR, euro: Currency.EUR,
  usd: Currency.USD, $: Currency.USD, dollar: Currency.USD,
  gbp: Currency.GBP, '£': Currency.GBP, pound: Currency.GBP,
  try: Currency.TRY, tl: Currency.TRY, '₺': Currency.TRY,
  aud: Currency.AUD, a$: Currency.AUD,
}

const CONDITION_MAP: Record<string, YachtCondition> = {
  new: YachtCondition.New,
  used: YachtCondition.Used,
  refurbished: YachtCondition.Refurbished,
  preowned: YachtCondition.Used,
  secondhand: YachtCondition.Used,
}

const CATEGORY_MAP: Record<string, YachtCategory> = {
  motor: YachtCategory.Motor, motoryacht: YachtCategory.Motor,
  sail: YachtCategory.Sail, sailing: YachtCategory.Sail, sailboat: YachtCategory.Sail,
  catamaran: YachtCategory.Catamaran, cat: YachtCategory.Catamaran,
  trimaran: YachtCategory.Trimaran,
  gulet: YachtCategory.Gulet, gullet: YachtCategory.Gulet,
  trawler: YachtCategory.Trawler,
  explorer: YachtCategory.Explorer,
  sportfish: YachtCategory.SportFish, sportfishing: YachtCategory.SportFish,
  superyacht: YachtCategory.Superyacht, super: YachtCategory.Superyacht,
  megayacht: YachtCategory.Megayacht, mega: YachtCategory.Megayacht,
}

const HULL_MAP: Record<string, HullMaterial> = {
  fiberglass: HullMaterial.Fiberglass, grp: HullMaterial.Fiberglass, frp: HullMaterial.Fiberglass,
  steel: HullMaterial.Steel,
  aluminum: HullMaterial.Aluminum, aluminium: HullMaterial.Aluminum,
  wood: HullMaterial.Wood, wooden: HullMaterial.Wood,
  composite: HullMaterial.Composite,
  carbon: HullMaterial.Carbon, carbonfiber: HullMaterial.Carbon,
}

const FUEL_MAP: Record<string, FuelType> = {
  diesel: FuelType.Diesel,
  petrol: FuelType.Petrol, gasoline: FuelType.Petrol, gas: FuelType.Petrol,
  electric: FuelType.Electric,
  hybrid: FuelType.Hybrid, dieselelectric: FuelType.Hybrid,
}

const STATUS_MAP: Record<string, ListingStatus> = {
  active: ListingStatus.Active, available: ListingStatus.Active,
  forsale: ListingStatus.Active, sale: ListingStatus.Active,
  underoffer: ListingStatus.UnderOffer, offer: ListingStatus.UnderOffer, pending: ListingStatus.UnderOffer,
  sold: ListingStatus.Sold,
  withdrawn: ListingStatus.Withdrawn, removed: ListingStatus.Withdrawn, expired: ListingStatus.Withdrawn,
  charter: ListingStatus.Charter, charteronly: ListingStatus.Charter,
}

// ── Price parser ───────────────────────────────────────────────────────────

export function parsePrice(
  rawPrice: string | null | undefined,
  rawCurrency: string | null | undefined,
): Price | undefined {
  const amount = parseNumber(rawPrice)
  if (amount == null || amount <= 0) return undefined

  const currency = ENUM_ALIAS<typeof Currency>(CURRENCY_MAP, rawCurrency, Currency.EUR)

  let vat: Price['vat'] = 'unknown'
  if (rawPrice) {
    const l = rawPrice.toLowerCase()
    if (/tax\s*paid|vat\s*incl|inc.*vat|kdv\s*dahil/i.test(l)) vat = 'included'
    else if (/ex.*vat|plus.*vat|vat\s*excl|kdv\s*hari[cç]/i.test(l)) vat = 'excluded'
  }

  return { amount, currency, vat, original: cleanString(rawPrice) }
}

// ── Array normalizer ───────────────────────────────────────────────────────

function toStringArray(raw: string | string[] | null | undefined): string[] {
  if (raw == null) return []
  if (Array.isArray(raw)) return raw.map(mustClean).filter(Boolean)
  return raw
    .split(/[,;\n]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

function toImageArray(raw: string | string[] | null | undefined): string[] {
  if (raw == null) return []
  if (Array.isArray(raw)) return raw.map((s) => s.trim()).filter(Boolean)
  try {
    const parsed = JSON.parse(raw) as unknown
    if (Array.isArray(parsed)) return parsed.filter((x): x is string => typeof x === 'string')
  } catch { /* not JSON, treat as delimited */ }
  return raw.split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean)
}

// ── Slug generator ─────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 120)
}

// ── Tax-paid parser ────────────────────────────────────────────────────────

function parseTaxPaid(raw: string | null | undefined): boolean | undefined {
  if (raw == null) return undefined
  const l = raw.toLowerCase().trim()
  if (/^(yes|true|1|paid|evet|dahil)$/.test(l)) return true
  if (/^(no|false|0|unpaid|hayır|hariç)$/.test(l)) return false
  return undefined
}

// ── Main normalizer ────────────────────────────────────────────────────────

export function normalizeYacht(raw: RawYachtListing): NormalizationResult {
  const warnings: string[] = []
  const warn = (msg: string) => warnings.push(msg)

  const title = mustClean(raw.title)
  if (!title) warn('Missing title')

  const slug = slugify(title || 'untitled')

  const source: ListingSource = {
    marketplace: mustClean(raw.sourceMarketplace) || 'unknown',
    url: raw.sourceUrl?.trim() || '',
    listingId: cleanString(raw.sourceListingId),
    scrapedAt: raw.scrapedAt?.trim() || new Date().toISOString(),
  }
  if (!source.url) warn('Missing source URL')

  const year = parseInteger(raw.year)
  if (raw.year && !year) warn(`Unparseable year: "${raw.year}"`)

  const price = parsePrice(raw.price, raw.currency)
  if (raw.price && !price) warn(`Unparseable price: "${raw.price}"`)

  const loa = parseDimension(raw.loa)
  if (raw.loa && !loa) warn(`Unparseable LOA: "${raw.loa}"`)

  const engines: EngineSpec | undefined = (raw.engines || raw.engineMake) ? {
    count: parseInteger(raw.engines) ?? 1,
    manufacturer: cleanString(raw.engineMake),
    model: cleanString(raw.engineModel),
    power: cleanString(raw.enginePower),
    fuelType: ENUM_ALIAS<typeof FuelType>(FUEL_MAP, raw.fuel, FuelType.Diesel),
    hours: parseInteger(raw.engineHours),
    year: parseInteger(raw.engineYear),
  } : undefined

  const broker: BrokerContact | undefined =
    (raw.brokerName || raw.brokerCompany || raw.brokerPhone || raw.brokerEmail)
      ? {
          name: cleanString(raw.brokerName),
          company: cleanString(raw.brokerCompany),
          phone: cleanString(raw.brokerPhone),
          email: cleanString(raw.brokerEmail),
          website: cleanString(raw.brokerWebsite),
        }
      : undefined

  const images = toImageArray(raw.images)
  if (images.length === 0) warn('No images')

  const data: NormalizedYacht = {
    title: title || 'Untitled Listing',
    slug,
    sourceRef: source,

    category: ENUM_ALIAS<typeof YachtCategory>(CATEGORY_MAP, raw.category, YachtCategory.Motor),
    condition: ENUM_ALIAS<typeof YachtCondition>(CONDITION_MAP, raw.condition, YachtCondition.Unknown),
    hullMaterial: raw.hullMaterial
      ? ENUM_ALIAS<typeof HullMaterial>(HULL_MAP, raw.hullMaterial, HullMaterial.Other)
      : undefined,
    status: ENUM_ALIAS<typeof ListingStatus>(STATUS_MAP, raw.status, ListingStatus.Active),

    builder: cleanString(raw.builder),
    model: cleanString(raw.model),
    year,
    refit: parseInteger(raw.refit),
    flag: cleanString(raw.flag),

    loa,
    beam: parseDimension(raw.beam),
    draft: parseDimension(raw.draft),
    displacement: parseWeight(raw.displacement),

    cabins: parseInteger(raw.cabins),
    heads: parseInteger(raw.heads),
    berths: parseInteger(raw.berths),
    guestCapacity: parseInteger(raw.guests),
    crewCapacity: parseInteger(raw.crew),

    engines,
    cruisingSpeed: parseSpeed(raw.cruisingSpeed),
    maxSpeed: parseSpeed(raw.maxSpeed),
    range: parseNumber(raw.range),
    fuelCapacity: parseNumber(raw.fuelCapacity),
    waterCapacity: parseNumber(raw.waterCapacity),

    price,
    taxPaid: parseTaxPaid(raw.taxPaid),
    location: cleanString(raw.location),
    lying: cleanString(raw.lying),

    description: cleanString(raw.description),
    highlights: [],
    equipment: toStringArray(raw.equipment),
    images,

    broker,
  }

  return { ok: warnings.length === 0, data, warnings }
}

// ── Unit conversion helpers ────────────────────────────────────────────────

const FT_TO_M = 0.3048
const LBS_TO_KG = 0.45359237
const KN_TO_KMH = 1.852

export function toMeters(d: Dimension): number {
  return d.unit === LengthUnit.Feet ? +(d.value * FT_TO_M).toFixed(2) : d.value
}

export function toFeet(d: Dimension): number {
  return d.unit === LengthUnit.Meters ? +(d.value / FT_TO_M).toFixed(1) : d.value
}

export function toKg(w: Weight): number {
  switch (w.unit) {
    case WeightUnit.Tonnes: return w.value * 1000
    case WeightUnit.Pounds: return +(w.value * LBS_TO_KG).toFixed(1)
    default: return w.value
  }
}

export function toKnots(s: Speed): number {
  switch (s.unit) {
    case SpeedUnit.Kmh: return +(s.value / KN_TO_KMH).toFixed(1)
    case SpeedUnit.Mph: return +(s.value * 0.868976).toFixed(1)
    default: return s.value
  }
}

// ── Display formatters ─────────────────────────────────────────────────────

export function formatDimension(d: Dimension | undefined, targetUnit?: LengthUnit): string {
  if (!d) return '—'
  if (targetUnit === LengthUnit.Feet) return `${toFeet(d)} ft`
  if (targetUnit === LengthUnit.Meters) return `${toMeters(d)} m`
  return `${d.value} ${d.unit}`
}

export function formatPrice(p: Price | undefined): string {
  if (!p) return 'POA'
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: p.currency,
    maximumFractionDigits: 0,
  }).format(p.amount)
  const suffix = p.vat === 'excluded' ? ' +VAT' : p.vat === 'included' ? ' inc. VAT' : ''
  return `${formatted}${suffix}`
}

export function formatSpeed(s: Speed | undefined): string {
  if (!s) return '—'
  return `${s.value} ${s.unit}`
}
