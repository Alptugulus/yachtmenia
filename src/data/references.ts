import type { ReferenceProject } from '@/types'
import { PAGE_HERO_IMAGES } from '@/utils/heroMedia'

export const references: ReferenceProject[] = [
  {
    id: 'r1',
    slug: '56m-interior-refresh',
    title: '56m Interior Refresh & AV Upgrade',
    category: 'Refit',
    year: 2024,
    location: 'Didim D-MARINE',
    excerpt:
      'Full soft goods program, lighting redesign and cinema-grade AV — delivered across an eight-week critical path.',
    image: PAGE_HERO_IMAGES.home,
    outcomes: ['Noise-isolated cinema', 'Low-profile HVAC routing', 'Class-ready documentation'],
  },
  {
    id: 'r2',
    slug: '72m-repower-readiness',
    title: '72m Machinery Modernization',
    category: 'Machinery',
    year: 2023,
    location: 'Aegean',
    excerpt:
      'Staged repower planning with load bank validation and vibration baseline mapping prior to engine swap.',
    image: PAGE_HERO_IMAGES.yachts,
    outcomes: ['Predictive maintenance baseline', 'NVH reduction targets met'],
  },
  {
    id: 'r3',
    slug: 'management-fleet',
    title: 'Multi-vessel Management Stack',
    category: 'Management',
    year: 2022,
    location: 'Turkey · Greece',
    excerpt:
      'Unified maintenance calendars, digital reporting and vendor governance across three flagged vessels.',
    image: PAGE_HERO_IMAGES.about,
    outcomes: ['Budget variance under 4%', 'Zero off-hire surprises in yard windows'],
  },
  {
    id: 'r4',
    slug: 'composite-fairing',
    title: 'Hull Fairing & Paint Renaissance',
    category: 'Refit',
    year: 2021,
    location: 'Didim D-MARINE',
    excerpt:
      'Full topsides repaint with metallic stripe narrative — micro-finish QC before launch.',
    image: PAGE_HERO_IMAGES.references,
    outcomes: ['Gloss retention plan', 'Dockage-ready protective film'],
  },
]
