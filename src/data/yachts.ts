import type { Yacht } from '@/types'

export const yachts: Yacht[] = [
  {
    id: 'y1',
    slug: 'aegean-serenity',
    name: 'Aegean Serenity',
    manufacturer: 'Sunseeker',
    model: '86 Yacht',
    year: 2019,
    lengthM: 26.2,
    beamM: 6.3,
    cabins: 4,
    location: 'Didim · Aegean',
    status: 'for-sale',
    priceEUR: 4250000,
    featured: true,
    summary: 'Immaculate 86 Yacht with extended Mediterranean cruising history.',
    description:
      'A refined flybridge layout with generous entertaining zones, recently serviced propulsion and upgraded navigation electronics. Ideal for Aegean island hopping with crew quarters arranged for extended seasons.',
    heroImage:
      '/media/photo-1569263979104-865ab7cd8d13.jpg',
    gallery: [
      '/media/photo-1540946485063-a40da27545f8.jpg',
      '/media/marine-yacht-bow-water.jpg',
      '/media/photo-1519669011783-4eaa95fa4f04.jpg',
    ],
    equipment: ['Stabilizers', 'Hydraulic platform', 'Williams tender garage', 'AIS & satellite comms'],
  },
  {
    id: 'y2',
    slug: 'mistral-blue',
    name: 'Mistral Blue',
    manufacturer: 'Azimut',
    model: 'Grande 27M',
    year: 2017,
    lengthM: 27.0,
    beamM: 6.45,
    cabins: 5,
    location: 'Bodrum · Charter-ready',
    status: 'charter',
    featured: true,
    summary: 'High-volume interior — charter oriented configuration.',
    description:
      'Designed for charter excellence with crew workflow optimized from galley to sky lounge. Recent AV upgrade and soft goods refresh.',
    heroImage:
      '/media/marine-megayacht-charter-hero.jpg',
    gallery: [
      '/media/marine-yacht-stern-sea.jpg',
      '/media/photo-1589137148586-828d770bd49c.jpg',
    ],
    equipment: ['Jacuzzi flybridge', 'Zero-speed stabilizers', 'Watermaker high-capacity'],
  },
  {
    id: 'y3',
    slug: 'northwind-62',
    name: 'Northwind 62',
    manufacturer: 'Princess',
    model: 'Y62',
    year: 2021,
    lengthM: 18.9,
    beamM: 4.87,
    cabins: 3,
    location: 'Marmaris',
    status: 'under-offer',
    priceEUR: 2890000,
    featured: true,
    summary: 'Low-hours twin MAN — sharp handling and contemporary interior.',
    description:
      'Turn-key family cruiser with panoramic saloon, hydraulic swim platform and subtle interior palette suited to warm climates.',
    heroImage:
      '/media/photo-1605281317010-fe5ffe798166.jpg',
    gallery: [
      '/media/photo-1599583879944-4bd14e15f272.jpg',
    ],
    equipment: ['Seakeeper', 'Joystick docking', 'Summer galley on fly'],
  },
  {
    id: 'y4',
    slug: 'obsidian-run',
    name: 'Obsidian Run',
    manufacturer: 'Sanlorenzo',
    model: 'SL78',
    year: 2018,
    lengthM: 23.8,
    beamM: 5.75,
    cabins: 4,
    location: 'Athens · EU VAT paid',
    status: 'for-sale',
    priceEUR: 5100000,
    summary: 'Statement Italian lines with crew-forward operational layout.',
    description:
      'Walk-around king master, formal dining and beach club concept with hydraulic passerelle. Recent paint detailing.',
    heroImage:
      '/media/photo-1569256326873-7d3c885518d9.jpg',
    gallery: [
      '/media/marine-yacht-profile-elegant.jpg',
    ],
    equipment: ['Extended range tanks', 'Night vision camera suite'],
  },
]
