export type YachtStatus = 'for-sale' | 'under-offer' | 'sold' | 'charter'

export interface Yacht {
  id: string
  slug: string
  name: string
  manufacturer: string
  model?: string
  year: number
  lengthM: number
  beamM?: number
  cabins?: number
  location: string
  status: YachtStatus
  priceEUR?: number
  featured?: boolean
  summary: string
  description: string
  heroImage: string
  gallery: string[]
  equipment?: string[]
}

export interface Service {
  id: string
  slug: string
  title: string
  shortTitle: string
  tagline: string
  excerpt: string
  icon: string
  highlights: string[]
  body: string[]
  heroImage: string
}

export interface ReferenceProject {
  id: string
  slug: string
  title: string
  category: string
  year: number
  location: string
  excerpt: string
  image: string
  outcomes?: string[]
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string[]
  category: string
  date: string
  readMinutes: number
  coverImage: string
  author?: string
}

export interface GalleryItem {
  id: string
  title: string
  category: string
  image: string
  ratio?: 'landscape' | 'portrait' | 'square'
}
