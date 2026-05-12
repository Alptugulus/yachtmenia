import type { BlogPost, GalleryItem, ReferenceProject, Service, Yacht } from '@/types'
import { blogPosts } from './blog'
import { galleryItems } from './gallery'
import { references } from './references'
import { services } from './services'
import { yachts } from './yachts'

export { blogPosts, galleryItems, references, services, yachts }

export function getAllYachts(): Yacht[] {
  return yachts
}

export function getFeaturedYachts(): Yacht[] {
  return yachts.filter((y) => y.featured)
}

export function getYachtBySlug(slug: string): Yacht | undefined {
  return yachts.find((y) => y.slug === slug)
}

export function getAllServices(): Service[] {
  return services
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getAllReferences(): ReferenceProject[] {
  return references
}

export function getReferenceBySlug(slug: string): ReferenceProject | undefined {
  return references.find((r) => r.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return blogPosts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getGallery(): GalleryItem[] {
  return galleryItems
}
