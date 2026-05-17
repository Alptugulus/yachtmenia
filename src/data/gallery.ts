import type { GalleryItem } from '@/types'
import { PAGE_HERO_IMAGES } from '@/utils/heroMedia'

export const galleryItems: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Monte Carlo Marina',
    category: 'Destinations',
    image: PAGE_HERO_IMAGES.home,
    ratio: 'landscape',
  },
  {
    id: 'g2',
    title: 'Yacht Row',
    category: 'Yachts',
    image: PAGE_HERO_IMAGES.yachts,
    ratio: 'portrait',
  },
  {
    id: 'g3',
    title: 'Harbor Aerial',
    category: 'Destinations',
    image: PAGE_HERO_IMAGES.about,
    ratio: 'square',
  },
  {
    id: 'g4',
    title: 'Golden Marina',
    category: 'Lifestyle',
    image: PAGE_HERO_IMAGES.services,
    ratio: 'landscape',
  },
  {
    id: 'g5',
    title: 'Mediterranean Mooring',
    category: 'Destinations',
    image: PAGE_HERO_IMAGES.gallery,
    ratio: 'portrait',
  },
  {
    id: 'g6',
    title: 'Open Water',
    category: 'Yachts',
    image: '/media/page-blog-hero.jpg',
    ratio: 'landscape',
  },
]
