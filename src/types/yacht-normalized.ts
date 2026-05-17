// ---------------------------------------------------------------------------
//  Normalized Yacht Schema — aggregates heterogeneous marketplace listings
//  into a single canonical structure with safe parsing & cleanup utilities.
// ---------------------------------------------------------------------------

// ── Enums ──────────────────────────────────────────────────────────────────

export enum YachtCondition {
  New = 'new',
  Used = 'used',
  Refurbished = 'refurbished',
  Unknown = 'unknown',
}

export enum YachtCategory {
  Motor = 'motor',
  Sail = 'sail',
  Catamaran = 'catamaran',
  Trimaran = 'trimaran',
  Gulet = 'gulet',
  Trawler = 'trawler',
  Explorer = 'explorer',
  SportFish = 'sport-fish',
  Superyacht = 'superyacht',
  Megayacht = 'megayacht',
  Other = 'other',
}

export enum HullMaterial {
  Fiberglass = 'fiberglass',
  Steel = 'steel',
  Aluminum = 'aluminum',
  Wood = 'wood',
  Composite = 'composite',
  Carbon = 'carbon',
  Other = 'other',
}

export enum FuelType {
  Diesel = 'diesel',
  Petrol = 'petrol',
  Electric = 'electric',
  Hybrid = 'hybrid',
  Other = 'other',
}

export enum ListingStatus {
  Active = 'active',
  UnderOffer = 'under-offer',
  Sold = 'sold',
  Withdrawn = 'withdrawn',
  Charter = 'charter',
}

export enum LengthUnit {
  Meters = 'm',
  Feet = 'ft',
}

export enum WeightUnit {
  Kilograms = 'kg',
  Tonnes = 't',
  Pounds = 'lbs',
}

export enum SpeedUnit {
  Knots = 'kn',
  Mph = 'mph',
  Kmh = 'km/h',
}

export enum Currency {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  TRY = 'TRY',
  AUD = 'AUD',
}

// ── Composite types ────────────────────────────────────────────────────────

export interface Dimension {
  value: number
  unit: LengthUnit
}

export interface Weight {
  value: number
  unit: WeightUnit
}

export interface Speed {
  value: number
  unit: SpeedUnit
}

export interface Price {
  amount: number
  currency: Currency
  vat: 'included' | 'excluded' | 'unknown'
  original?: string
}

export interface EngineSpec {
  count: number
  manufacturer?: string
  model?: string
  power?: string
  fuelType?: FuelType
  hours?: number
  year?: number
}

export interface BrokerContact {
  name?: string
  company?: string
  phone?: string
  email?: string
  website?: string
}

export interface ListingSource {
  marketplace: string
  url: string
  listingId?: string
  scrapedAt: string
}

// ── Main normalized interface ──────────────────────────────────────────────

export interface NormalizedYacht {
  // Identity
  title: string
  slug: string
  sourceRef: ListingSource

  // Classification
  category?: YachtCategory
  condition?: YachtCondition
  hullMaterial?: HullMaterial
  status: ListingStatus

  // Build
  builder?: string
  model?: string
  year?: number
  refit?: number
  flag?: string

  // Dimensions
  loa?: Dimension
  beam?: Dimension
  draft?: Dimension
  displacement?: Weight

  // Capacity
  cabins?: number
  heads?: number
  berths?: number
  guestCapacity?: number
  crewCapacity?: number

  // Propulsion
  engines?: EngineSpec
  cruisingSpeed?: Speed
  maxSpeed?: Speed
  range?: number
  fuelCapacity?: number
  waterCapacity?: number

  // Commercial
  price?: Price
  taxPaid?: boolean
  location?: string
  lying?: string

  // Content
  description?: string
  highlights?: string[]
  equipment?: string[]
  images: string[]

  // Broker
  broker?: BrokerContact
}

// ── Raw ingest type (everything is optional + string) ──────────────────────

/** Wire format: every field nullable string — straight from scraper output. */
export interface RawYachtListing {
  title?: string | null
  builder?: string | null
  model?: string | null
  year?: string | null
  refit?: string | null
  price?: string | null
  currency?: string | null
  condition?: string | null
  category?: string | null
  hullMaterial?: string | null
  status?: string | null
  flag?: string | null
  location?: string | null
  lying?: string | null
  loa?: string | null
  beam?: string | null
  draft?: string | null
  displacement?: string | null
  fuel?: string | null
  engines?: string | null
  engineHours?: string | null
  enginePower?: string | null
  engineMake?: string | null
  engineModel?: string | null
  engineYear?: string | null
  cabins?: string | null
  heads?: string | null
  berths?: string | null
  guests?: string | null
  crew?: string | null
  cruisingSpeed?: string | null
  maxSpeed?: string | null
  range?: string | null
  fuelCapacity?: string | null
  waterCapacity?: string | null
  taxPaid?: string | null
  description?: string | null
  equipment?: string | string[] | null
  images?: string | string[] | null
  brokerName?: string | null
  brokerCompany?: string | null
  brokerPhone?: string | null
  brokerEmail?: string | null
  brokerWebsite?: string | null
  sourceUrl?: string | null
  sourceMarketplace?: string | null
  sourceListingId?: string | null
  scrapedAt?: string | null
}

// ── Validation result ──────────────────────────────────────────────────────

export interface NormalizationResult {
  ok: boolean
  data: NormalizedYacht
  warnings: string[]
}
