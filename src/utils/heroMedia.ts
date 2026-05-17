/** Sayfa başlığı / ana hero arka planları — `public/media/page-*.jpg` */
export const PAGE_HERO_IMAGES = {
  home: '/media/page-home-hero.jpg',
  about: '/media/page-about-hero.jpg',
  yachts: '/media/page-yachts-hero.jpg',
  services: '/media/page-services-hero.jpg',
  contact: '/media/page-contact-hero.jpg',
  references: '/media/page-references-hero.jpg',
  gallery: '/media/page-gallery-hero.jpg',
  blog: '/media/page-blog-hero.jpg',
} as const

export type PageHeroKey = keyof typeof PAGE_HERO_IMAGES
