import { blogPosts, galleryItems, references, yachts } from '@/data'
import { galleryCategorySlug } from '@/utils/galleryNav'

export type NavSubItem = {
  key: string
  to: string
  /** Use `<a>` for tel/mailto/external URLs */
  external?: boolean
}

export const COMPANY = {
  name: 'Yachtmenia Yachting',
  founded: 2006,
  locationLine: 'Çamlık Mah. 5027 Sok. NO:2/8 F, Didim / Aydın',
  phoneDisplay: '+90 256 813 39 47',
  phoneE164: '902568133947',
  whatsappDisplay: '+90 533 022 10 40',
  whatsappE164: '905330221040',
  email: 'info@yachtmenia.com',
} as const

export const SOCIAL = {
  whatsapp: `https://wa.me/${COMPANY.whatsappE164}`,
} as const

export const SERVICE_NAV = [
  { key: 'brokerage', to: '/services/brokerage' },
  { key: 'refit', to: '/services/refit' },
  { key: 'management', to: '/services/management' },
  { key: 'maintenance', to: '/services/maintenance' },
  { key: 'consultancy', to: '/services/consultancy' },
  { key: 'machinery-renovation', to: '/services/machinery-renovation' },
] as const

const SERVICES_NAV_CHILDREN: NavSubItem[] = [
  { key: 'overview', to: '/services' },
  ...SERVICE_NAV.map((s) => ({ key: s.key, to: s.to })),
]

const HOME_NAV_CHILDREN: NavSubItem[] = [
  { key: 'overview', to: '/' },
  { key: 'services', to: '/#home-services' },
  { key: 'featured', to: '/#home-featured' },
  { key: 'references', to: '/#home-references' },
  { key: 'blog', to: '/#home-blog' },
]

const ABOUT_NAV_CHILDREN: NavSubItem[] = [
  { key: 'overview', to: '/about' },
  { key: 'pillars', to: '/about#about-pillars' },
]

const YACHTS_NAV_CHILDREN: NavSubItem[] = [
  { key: 'overview', to: '/yachts' },
  ...yachts.map((y) => ({ key: y.id, to: `/yachts/${y.slug}` })),
]

const REFERENCES_NAV_CHILDREN: NavSubItem[] = [
  { key: 'overview', to: '/references' },
  ...references.map((r) => ({ key: r.id, to: `/references#ref-${r.slug}` })),
]

const GALLERY_CATEGORY_ORDER = [...new Set(galleryItems.map((i) => i.category))]

const GALLERY_NAV_CHILDREN: NavSubItem[] = [
  { key: 'overview', to: '/gallery' },
  ...GALLERY_CATEGORY_ORDER.map((cat) => ({
    key: galleryCategorySlug(cat),
    to: `/gallery#gallery-${galleryCategorySlug(cat)}`,
  })),
]

const BLOG_NAV_CHILDREN: NavSubItem[] = [
  { key: 'overview', to: '/blog' },
  ...blogPosts.map((p) => ({ key: p.id, to: `/blog/${p.slug}` })),
]

const CONTACT_NAV_CHILDREN: NavSubItem[] = [
  { key: 'overview', to: '/contact' },
  { key: 'phone', to: `tel:+${COMPANY.phoneE164}`, external: true },
  { key: 'email', to: `mailto:${COMPANY.email}`, external: true },
  { key: 'whatsapp', to: SOCIAL.whatsapp, external: true },
]

/** Translation keys live under `nav.*`, `serviceNav.*`, `data.*`, etc. */
export const MAIN_NAV = [
  { key: 'home', to: '/', children: HOME_NAV_CHILDREN },
  { key: 'about', to: '/about', children: ABOUT_NAV_CHILDREN },
  { key: 'services', to: '/services', children: SERVICES_NAV_CHILDREN },
  { key: 'yachts', to: '/yachts', children: YACHTS_NAV_CHILDREN },
  { key: 'references', to: '/references', children: REFERENCES_NAV_CHILDREN },
  { key: 'gallery', to: '/gallery', children: GALLERY_NAV_CHILDREN },
  { key: 'blog', to: '/blog', children: BLOG_NAV_CHILDREN },
  { key: 'contact', to: '/contact', children: CONTACT_NAV_CHILDREN },
] as const
