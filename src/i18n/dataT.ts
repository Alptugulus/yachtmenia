import { useTranslation } from 'react-i18next'
import type { BlogPost, GalleryItem, ReferenceProject, Service, Yacht } from '@/types'

/**
 * Overlay user-facing copy on data records with the active language. EN values stored
 * in the data files act as fallbacks; DE/TR keys live under `data.*` in the locale files.
 *
 * Each helper preserves IDs, slugs, numeric specs and image URLs unchanged.
 */
export function useTranslatedServices(services: Service[]): Service[] {
  const { t } = useTranslation()
  return services.map((s) => ({
    ...s,
    title: t(`data.services.${s.id}.title`, { defaultValue: s.title }),
    shortTitle: t(`data.services.${s.id}.shortTitle`, { defaultValue: s.shortTitle }),
    tagline: t(`data.services.${s.id}.tagline`, { defaultValue: s.tagline }),
    excerpt: t(`data.services.${s.id}.excerpt`, { defaultValue: s.excerpt }),
    highlights: t(`data.services.${s.id}.highlights`, {
      returnObjects: true,
      defaultValue: s.highlights,
    }) as string[],
    body: t(`data.services.${s.id}.body`, {
      returnObjects: true,
      defaultValue: s.body,
    }) as string[],
  }))
}

export function useTranslatedService(service: Service | undefined): Service | undefined {
  const { t } = useTranslation()
  if (!service) return undefined
  return {
    ...service,
    title: t(`data.services.${service.id}.title`, { defaultValue: service.title }),
    shortTitle: t(`data.services.${service.id}.shortTitle`, { defaultValue: service.shortTitle }),
    tagline: t(`data.services.${service.id}.tagline`, { defaultValue: service.tagline }),
    excerpt: t(`data.services.${service.id}.excerpt`, { defaultValue: service.excerpt }),
    highlights: t(`data.services.${service.id}.highlights`, {
      returnObjects: true,
      defaultValue: service.highlights,
    }) as string[],
    body: t(`data.services.${service.id}.body`, {
      returnObjects: true,
      defaultValue: service.body,
    }) as string[],
  }
}

export function useTranslatedYachts(yachts: Yacht[]): Yacht[] {
  const { t } = useTranslation()
  return yachts.map((y) => ({
    ...y,
    name: t(`data.yachts.${y.id}.name`, { defaultValue: y.name }),
    location: t(`data.yachts.${y.id}.location`, { defaultValue: y.location }),
    summary: t(`data.yachts.${y.id}.summary`, { defaultValue: y.summary }),
    description: t(`data.yachts.${y.id}.description`, { defaultValue: y.description }),
    equipment: y.equipment
      ? (t(`data.yachts.${y.id}.equipment`, {
          returnObjects: true,
          defaultValue: y.equipment,
        }) as string[])
      : undefined,
  }))
}

export function useTranslatedYacht(yacht: Yacht | undefined): Yacht | undefined {
  const { t } = useTranslation()
  if (!yacht) return undefined
  return {
    ...yacht,
    name: t(`data.yachts.${yacht.id}.name`, { defaultValue: yacht.name }),
    location: t(`data.yachts.${yacht.id}.location`, { defaultValue: yacht.location }),
    summary: t(`data.yachts.${yacht.id}.summary`, { defaultValue: yacht.summary }),
    description: t(`data.yachts.${yacht.id}.description`, { defaultValue: yacht.description }),
    equipment: yacht.equipment
      ? (t(`data.yachts.${yacht.id}.equipment`, {
          returnObjects: true,
          defaultValue: yacht.equipment,
        }) as string[])
      : undefined,
  }
}

export function useTranslatedReferences(refs: ReferenceProject[]): ReferenceProject[] {
  const { t } = useTranslation()
  return refs.map((r) => ({
    ...r,
    title: t(`data.references.${r.id}.title`, { defaultValue: r.title }),
    category: t(`data.references.${r.id}.category`, { defaultValue: r.category }),
    location: t(`data.references.${r.id}.location`, { defaultValue: r.location }),
    excerpt: t(`data.references.${r.id}.excerpt`, { defaultValue: r.excerpt }),
  }))
}

export function useTranslatedPosts(posts: BlogPost[]): BlogPost[] {
  const { t } = useTranslation()
  return posts.map((p) => ({
    ...p,
    title: t(`data.blog.${p.id}.title`, { defaultValue: p.title }),
    excerpt: t(`data.blog.${p.id}.excerpt`, { defaultValue: p.excerpt }),
    category: t(`data.blog.${p.id}.category`, { defaultValue: p.category }),
    content: t(`data.blog.${p.id}.content`, {
      returnObjects: true,
      defaultValue: p.content,
    }) as string[],
  }))
}

export function useTranslatedPost(post: BlogPost | undefined): BlogPost | undefined {
  const { t } = useTranslation()
  if (!post) return undefined
  return {
    ...post,
    title: t(`data.blog.${post.id}.title`, { defaultValue: post.title }),
    excerpt: t(`data.blog.${post.id}.excerpt`, { defaultValue: post.excerpt }),
    category: t(`data.blog.${post.id}.category`, { defaultValue: post.category }),
    content: t(`data.blog.${post.id}.content`, {
      returnObjects: true,
      defaultValue: post.content,
    }) as string[],
  }
}

export function useTranslatedGallery(items: GalleryItem[]): GalleryItem[] {
  const { t } = useTranslation()
  return items.map((g) => ({
    ...g,
    title: t(`data.gallery.${g.id}.title`, { defaultValue: g.title }),
    category: t(`data.gallery.${g.id}.category`, { defaultValue: g.category }),
  }))
}
