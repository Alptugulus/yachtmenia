import type { Service } from '@/types'
import { PAGE_HERO_IMAGES } from '@/utils/heroMedia'

export const services: Service[] = [
  {
    id: 'brokerage',
    slug: 'brokerage',
    title: 'Yacht Brokerage',
    shortTitle: 'Brokerage',
    tagline: 'Discerning acquisition and discreet sales across premium segments.',
    excerpt:
      'Market intelligence, technical vetting and negotiation support for buyers and sellers who expect precision.',
    icon: 'Ship',
    highlights: [
      'Qualified vessel sourcing',
      'Survey & sea trial coordination',
      'Title and documentation guidance',
      'Aegean & Mediterranean reach',
    ],
    heroImage: PAGE_HERO_IMAGES.yachts,
    body: [
      'Our brokerage desk combines seasoned market insight with engineering-aware diligence so decisions are grounded in reality — not brochures alone.',
      'From first conversations through closing, we align timelines with yard schedules, class requirements and your operational priorities.',
      'Whether you are upgrading, consolidating or entering ownership for the first time, we remain your single accountable partner.',
    ],
  },
  {
    id: 'refit',
    slug: 'refit',
    title: 'Yacht Refit',
    shortTitle: 'Refit',
    tagline: 'Transformation programs planned for longevity and resale value.',
    excerpt:
      'Interior, exterior and systems upgrades executed with disciplined project controls and transparent reporting.',
    icon: 'Wrench',
    highlights: [
      'Concept-to-delivery planning',
      'Interior architecture coordination',
      'Paint & composites',
      'Electrical & AV/IT integration',
    ],
    heroImage: PAGE_HERO_IMAGES.gallery,
    body: [
      'Refit is where ambition meets engineering. We scope deliberately, phase intelligently and communicate clearly — especially when surprises appear.',
      'Our Didim D-MARINE presence keeps logistics tight and decisions fast, protected by rigorous QA checkpoints.',
      'Showpiece interiors or silent reliability upgrades — your refit narrative should reflect your cruising intent. We help shape both.',
    ],
  },
  {
    id: 'management',
    slug: 'management',
    title: 'Yacht Management',
    shortTitle: 'Management',
    tagline: 'Operational excellence with discretion at the helm.',
    excerpt:
      'Crewing, compliance, budgets and maintenance orchestration for owners who want peace of mind ashore.',
    icon: 'ClipboardList',
    highlights: [
      'Annual operating plans',
      'Class & flag liaison',
      'Vendor governance',
      'Digital reporting packs',
    ],
    heroImage: PAGE_HERO_IMAGES.about,
    body: [
      'Management is continuity: predictable maintenance rhythms, transparent spend and a bridge team aligned with your cruising calendar.',
      'We coordinate surveys, yard periods and flag-state obligations without noise — concise summaries, decisive recommendations.',
      'From seasonal commissioning to emergency response protocols, the vessel stays mission-ready.',
    ],
  },
  {
    id: 'maintenance',
    slug: 'maintenance',
    title: 'Maintenance & Repair',
    shortTitle: 'Maintenance',
    tagline: 'Precision care — mechanical, electrical and hull integrity.',
    excerpt:
      'Scheduled service and responsive repairs with OEM-grade practices and traceable parts sourcing.',
    icon: 'Cog',
    highlights: [
      'Propulsion & gensets',
      'Hydraulics & steering',
      'Underwater services',
      'Paint & fairing touchpoints',
    ],
    heroImage: PAGE_HERO_IMAGES.services,
    body: [
      'Maintenance is risk reduction expressed in torque specs, oil analysis and seasonal checklists — documented and repeatable.',
      'We integrate OEM schedules with real-world usage patterns so nothing is treated generically.',
      'Emergency support protocols ensure rapid triage with clear owner communication.',
    ],
  },
  {
    id: 'consultancy',
    slug: 'consultancy',
    title: 'Consultancy',
    shortTitle: 'Consultancy',
    tagline: 'Strategic marine counsel for investments and refit investments.',
    excerpt:
      'Technical due diligence, specification reviews and owner representation during negotiations.',
    icon: 'Compass',
    highlights: [
      'Pre-purchase surveys orchestration',
      'Specification audits',
      'Refit CAPEX modeling',
      'New-build advisory',
    ],
    heroImage: PAGE_HERO_IMAGES.home,
    body: [
      'Our consultancy layer exists for moments where stakes are high and ambiguity is costly.',
      'We translate drawings and schedules into decisions owners can stand behind — technically and financially.',
      'Engagements range from focused reviews to multi-month owner representation across yards and brokers.',
    ],
  },
  {
    id: 'machinery-renovation',
    slug: 'machinery-renovation',
    title: 'Machinery Renovation',
    shortTitle: 'Machinery',
    tagline: 'Propulsion and hotel-load systems engineered for reliability.',
    excerpt:
      'Engine room modernization, repower programs and auxiliary upgrades executed with marine-class workmanship.',
    icon: 'Settings',
    highlights: [
      'Repower programs',
      'Fuel system retrofit',
      'Stabilization upgrades',
      'Noise & vibration mitigation',
    ],
    heroImage: PAGE_HERO_IMAGES.contact,
    body: [
      'Machinery renovation is where technical credibility is proven in tolerances, cooling paths and load profiles.',
      'We engineer upgrades that respect structural margins and class expectations — not shortcuts dressed as savings.',
      'Every project receives commissioning protocols that validate performance under realistic sea states.',
    ],
  },
]
