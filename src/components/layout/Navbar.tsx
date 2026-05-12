import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Building2,
  ChevronDown,
  ChevronRight,
  Cog,
  Hammer,
  Images,
  LayoutGrid,
  Lightbulb,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Ship,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BrandLogo } from '@/components/common/BrandLogo'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { ResponsiveImage } from '@/components/common/ResponsiveImage'
import { blogPosts, references, yachts } from '@/data'
import type { NavSubItem } from '@/utils/constants'
import { COMPANY, MAIN_NAV, SERVICE_NAV } from '@/utils/constants'
import { useUiStore } from '@/store/ui'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  brokerage: Ship,
  refit: Hammer,
  management: Building2,
  maintenance: Wrench,
  consultancy: Lightbulb,
  'machinery-renovation': Cog,
}

const HOME_ANCHOR_ICONS: Record<string, LucideIcon> = {
  overview: LayoutGrid,
  services: Sparkles,
  featured: Ship,
  references: Images,
  blog: BookOpen,
}

function submenuChildLabel(
  t: (key: string, opts?: { defaultValue?: string }) => string,
  parentKey: string,
  child: NavSubItem,
): string {
  if (child.key === 'overview') {
    return parentKey === 'services' ? t('nav.servicesOverview') : t('nav.submenuSeeAll')
  }
  switch (parentKey) {
    case 'home':
      return t(`nav.homeSub.${child.key}`)
    case 'about':
      return t(`nav.aboutSub.${child.key}`)
    case 'services':
      return t(`serviceNav.${child.key}`)
    case 'yachts': {
      const y = yachts.find((x) => x.id === child.key)
      return t(`data.yachts.${child.key}.name`, { defaultValue: y?.name ?? child.key })
    }
    case 'references': {
      const r = references.find((x) => x.id === child.key)
      return t(`data.references.${child.key}.title`, { defaultValue: r?.title ?? child.key })
    }
    case 'gallery':
      return t(`nav.galleryCategories.${child.key}`)
    case 'blog': {
      const p = blogPosts.find((x) => x.id === child.key)
      return t(`data.blog.${child.key}.title`, { defaultValue: p?.title ?? child.key })
    }
    case 'contact':
      return t(`nav.contactSub.${child.key}`)
    default:
      return child.key
  }
}

function MegaMenuBody({
  openKey,
  t,
  onNavigate,
}: {
  openKey: string
  t: (key: string, opts?: { defaultValue?: string }) => string
  onNavigate: () => void
}) {
  const item = MAIN_NAV.find((i) => i.key === openKey)
  const children = item && 'children' in item ? item.children : undefined
  if (!children?.length) return null

  /** Panel her zaman beyaz — site temasından bağımsız mürekkep paleti */
  const textMuted = 'text-[rgb(0_0_50/0.48)]'
  const textBody = 'text-[rgb(0_0_50/0.72)]'
  const textHeading = 'text-[#000032]'
  const kicker = 'text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[rgb(0_0_50/0.4)]'

  const cardBase =
    'rounded-xl border border-stone/30 bg-white shadow-[0_10px_30px_-12px_rgb(0_0_50/0.12)] transition hover:border-primary/25 hover:shadow-[0_14px_40px_-14px_rgb(0_0_50/0.16)]'

  const linkRow = (isActive: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
      isActive
        ? 'bg-brand/[0.09] text-[#000032]'
        : 'text-[rgb(0_0_50/0.76)] hover:bg-brand/[0.06] hover:text-[#000032]'
    }`

  const iconTile = 'flex shrink-0 items-center justify-center bg-brand/[0.08] text-[#000032]'

  const renderMegaRow = (parentKey: string, sub: NavSubItem) => {
    const label = submenuChildLabel(t, parentKey, sub)
    if (sub.external) {
      const isWa = sub.key === 'whatsapp'
      return (
        <a
          key={`${parentKey}-${sub.key}`}
          href={sub.to}
          target={isWa ? '_blank' : undefined}
          rel={isWa ? 'noreferrer' : undefined}
          className={linkRow(false)}
          onClick={onNavigate}
        >
          {label}
        </a>
      )
    }
    return (
      <NavLink key={`${parentKey}-${sub.to}`} to={sub.to} className={({ isActive }) => linkRow(isActive)} onClick={onNavigate}>
        {label}
      </NavLink>
    )
  }

  const intro = (key: string) => <p className={`mt-2 max-w-md text-sm leading-relaxed ${textBody}`}>{t(key)}</p>

  const overviewChild = children.find((c) => c.key === 'overview')
  const restChildren = children.filter((c) => c.key !== 'overview')

  /** Spotlight column + optional right column */
  const twoCol = (left: ReactNode, right: ReactNode) => (
    <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="min-w-0 lg:col-span-5">{left}</div>
      <div className="min-w-0 lg:col-span-7">{right}</div>
    </div>
  )

  const spotlightCard = (href: string, title: string, body: string, cta: string) => (
    <NavLink
      to={href}
      onClick={onNavigate}
      className={`group relative block overflow-hidden rounded-2xl p-6 sm:p-8 ${cardBase} ring-1 ring-inset ring-primary/[0.06]`}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />
      <p className={kicker}>{t(`nav.${openKey}`)}</p>
      <h3 className={`mt-3 font-display text-2xl tracking-tight sm:text-3xl ${textHeading}`}>{title}</h3>
      <p className={`mt-2 text-sm leading-relaxed ${textMuted}`}>{body}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand transition group-hover:text-brand/80">
        {cta}
        <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
      </span>
    </NavLink>
  )

  switch (openKey) {
    case 'home': {
      const anchors = restChildren
      return twoCol(
        overviewChild ? spotlightCard(overviewChild.to, t(`nav.${openKey}`), t('nav.mega.homeIntro'), t('nav.mega.viewFullPage')) : null,
        <div>
          <p className={kicker}>{t('nav.mega.sectionLinks')}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {anchors.map((sub) => {
              const Icon = HOME_ANCHOR_ICONS[sub.key] ?? Sparkles
              return (
                <NavLink
                  key={sub.to}
                  to={sub.to}
                  onClick={onNavigate}
                  className={`flex items-start gap-3 p-4 ${cardBase}`}
                >
                  <span className={`${iconTile} h-10 w-10 rounded-lg`}>
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span>
                    <span className={`block text-sm font-semibold ${textHeading}`}>{submenuChildLabel(t, openKey, sub)}</span>
                    <span className={`mt-0.5 block text-xs ${textMuted}`}>{t('nav.mega.viewFullPage')}</span>
                  </span>
                </NavLink>
              )
            })}
          </div>
        </div>,
      )
    }
    case 'about':
      return twoCol(
        overviewChild ? spotlightCard(overviewChild.to, t('nav.about'), t('nav.mega.aboutIntro'), t('nav.mega.viewFullPage')) : null,
        <div>
          <p className={kicker}>{t('nav.mega.sectionLinks')}</p>
          <div className="mt-4 space-y-1">{restChildren.map((sub) => renderMegaRow(openKey, sub))}</div>
        </div>,
      )
    case 'services':
      return (
        <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-4">
            {overviewChild
              ? spotlightCard(
                  overviewChild.to,
                  t('nav.servicesOverview'),
                  t('nav.mega.servicesIntro'),
                  t('nav.mega.viewFullPage'),
                )
              : null}
          </div>
          <div className="min-w-0 lg:col-span-8">
            <p className={kicker}>{t('footer.services')}</p>
            <div className="mt-4 grid min-w-0 gap-3 sm:grid-cols-2">
              {SERVICE_NAV.map((svc) => {
                const Icon = SERVICE_ICONS[svc.key] ?? Ship
                return (
                  <NavLink
                    key={svc.to}
                    to={svc.to}
                    onClick={onNavigate}
                    className={`flex items-center gap-4 p-4 ${cardBase}`}
                  >
                    <span className={`${iconTile} h-12 w-12 rounded-xl`}>
                      <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className={`min-w-0 text-sm font-semibold leading-snug ${textHeading}`}>{t(`serviceNav.${svc.key}`)}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>
        </div>
      )
    case 'yachts': {
      const featured = yachts.filter((y) => y.featured).slice(0, 3)
      const featuredIds = new Set(featured.map((y) => y.id))
      const otherSubs = restChildren.filter((s) => !featuredIds.has(s.key))
      return (
        <div className="min-w-0 space-y-8">
          <div>
            <p className={kicker}>{t('nav.mega.featuredYachts')}</p>
            <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-3">
              {featured.map((y) => (
                <NavLink
                  key={y.id}
                  to={`/yachts/${y.slug}`}
                  onClick={onNavigate}
                  className={`group overflow-hidden rounded-2xl ${cardBase} p-0`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ResponsiveImage
                      src={y.heroImage}
                      alt=""
                      pictureClassName="block h-full w-full"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1280px) 33vw, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className={`font-display text-lg text-white drop-shadow-sm`}>{y.name}</p>
                      <p className="text-xs text-white/80">
                        {y.manufacturer} · {y.lengthM}m
                      </p>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="grid min-w-0 gap-8 border-t border-stone/20 pt-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-4">
              {overviewChild ? (
                <div>
                  <p className={kicker}>{t('nav.yachts')}</p>
                  {intro('nav.mega.yachtsIntro')}
                  <NavLink
                    to={overviewChild.to}
                    onClick={onNavigate}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand/80"
                  >
                    {t('nav.mega.viewFullPage')}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </NavLink>
                </div>
              ) : null}
            </div>
            <div className="min-w-0 lg:col-span-8">
              <p className={kicker}>{t('nav.mega.moreYachts')}</p>
              <div className="mt-3 columns-1 gap-x-10 sm:columns-2">{otherSubs.map((sub) => renderMegaRow(openKey, sub))}</div>
            </div>
          </div>
        </div>
      )
    }
    case 'references': {
      const refCards = references.slice(0, 3)
      const refIds = new Set(refCards.map((r) => r.id))
      const more = restChildren.filter((s) => !refIds.has(s.key))
      return (
        <div className="min-w-0 space-y-8">
          <div>
            <p className={kicker}>{t('nav.mega.selectedWork')}</p>
            <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-3">
              {refCards.map((r) => (
                <NavLink
                  key={r.id}
                  to={`/references#ref-${r.slug}`}
                  onClick={onNavigate}
                  className={`group overflow-hidden rounded-2xl ${cardBase} p-0`}
                >
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <ResponsiveImage
                      src={r.image}
                      alt=""
                      pictureClassName="block h-full w-full"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1280px) 33vw, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[0.65rem] font-bold uppercase tracking-widest text-gold/95">{r.category}</p>
                      <p className="mt-1 font-display text-base leading-snug text-white">{r.title}</p>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="grid min-w-0 gap-6 border-t border-stone/20 pt-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-4">
              {overviewChild ? (
                <div>
                  <p className={kicker}>{t('nav.references')}</p>
                  {intro('nav.mega.referencesIntro')}
                  <NavLink
                    to={overviewChild.to}
                    onClick={onNavigate}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand/80"
                  >
                    {t('nav.mega.viewFullPage')}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </NavLink>
                </div>
              ) : null}
            </div>
            <div className="min-w-0 lg:col-span-8">
              <p className={kicker}>{t('nav.mega.moreProjects')}</p>
              <div className="mt-3 columns-1 gap-x-10 sm:columns-2">{more.map((sub) => renderMegaRow(openKey, sub))}</div>
            </div>
          </div>
        </div>
      )
    }
    case 'gallery':
      return twoCol(
        overviewChild ? spotlightCard(overviewChild.to, t('nav.gallery'), t('nav.mega.galleryIntro'), t('nav.mega.viewFullPage')) : null,
        <div>
          <p className={kicker}>{t('nav.mega.categories')}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {restChildren.map((sub) => (
              <NavLink
                key={sub.to}
                to={sub.to}
                onClick={onNavigate}
                className={`flex items-center justify-between gap-2 px-4 py-3 text-sm font-medium ${cardBase} ${textHeading}`}
              >
                {submenuChildLabel(t, openKey, sub)}
                <ChevronRight className={`h-4 w-4 shrink-0 opacity-50`} aria-hidden />
              </NavLink>
            ))}
          </div>
        </div>,
      )
    case 'blog': {
      const posts = blogPosts.slice(0, 3)
      const postIds = new Set(posts.map((p) => p.id))
      const more = restChildren.filter((s) => !postIds.has(s.key))
      return (
        <div className="min-w-0 space-y-8">
          <div>
            <p className={kicker}>{t('nav.mega.latestArticles')}</p>
            <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-3">
              {posts.map((p) => (
                <NavLink
                  key={p.id}
                  to={`/blog/${p.slug}`}
                  onClick={onNavigate}
                  className={`group flex flex-col overflow-hidden rounded-2xl ${cardBase} p-0`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <ResponsiveImage
                      src={p.coverImage}
                      alt=""
                      pictureClassName="block h-full w-full"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1280px) 33vw, 320px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className={`text-[0.65rem] font-bold uppercase tracking-widest ${textMuted}`}>{p.category}</p>
                    <p className={`mt-2 font-display text-base leading-snug ${textHeading}`}>{p.title}</p>
                    <p className={`mt-2 line-clamp-2 text-xs leading-relaxed ${textMuted}`}>{p.excerpt}</p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
          <div className="grid min-w-0 gap-6 border-t border-stone/20 pt-8 lg:grid-cols-12">
            <div className="min-w-0 lg:col-span-4">
              {overviewChild ? (
                <div>
                  <p className={kicker}>{t('nav.blog')}</p>
                  {intro('nav.mega.blogIntro')}
                  <NavLink
                    to={overviewChild.to}
                    onClick={onNavigate}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand/80"
                  >
                    {t('nav.mega.viewFullPage')}
                    <ChevronRight className="h-4 w-4" aria-hidden />
                  </NavLink>
                </div>
              ) : null}
            </div>
            <div className="min-w-0 lg:col-span-8">
              <p className={kicker}>{t('nav.mega.moreArticles')}</p>
              <div className="mt-3 space-y-1">{more.map((sub) => renderMegaRow(openKey, sub))}</div>
            </div>
          </div>
        </div>
      )
    }
    case 'contact':
      return twoCol(
        overviewChild ? spotlightCard(overviewChild.to, t('nav.contact'), t('nav.mega.contactIntro'), t('nav.mega.viewFullPage')) : null,
        <div className="grid gap-3 sm:grid-cols-3">
          {restChildren.map((sub) => {
            const label = submenuChildLabel(t, openKey, sub)
            const icon =
              sub.key === 'phone' ? (
                <Phone className="h-5 w-5" aria-hidden />
              ) : sub.key === 'email' ? (
                <Mail className="h-5 w-5" aria-hidden />
              ) : (
                <MessageCircle className="h-5 w-5" aria-hidden />
              )
            const inner = (
              <>
                <span className={`${iconTile} h-11 w-11 rounded-xl`}>
                  {icon}
                </span>
                <span className={`mt-3 block text-sm font-semibold ${textHeading}`}>{label}</span>
                {sub.key === 'phone' ? (
                  <span className={`mt-1 block text-xs ${textMuted}`}>{COMPANY.phoneDisplay}</span>
                ) : sub.key === 'email' ? (
                  <span className={`mt-1 block truncate text-xs ${textMuted}`}>{COMPANY.email}</span>
                ) : (
                  <span className={`mt-1 block text-xs ${textMuted}`}>{t('nav.contactSub.whatsapp')}</span>
                )}
              </>
            )
            if (sub.external) {
              const isWa = sub.key === 'whatsapp'
              return (
                <a
                  key={sub.key}
                  href={sub.to}
                  target={isWa ? '_blank' : undefined}
                  rel={isWa ? 'noreferrer' : undefined}
                  onClick={onNavigate}
                  className={`flex flex-col p-5 ${cardBase}`}
                >
                  {inner}
                </a>
              )
            }
            return (
              <NavLink key={sub.to} to={sub.to} onClick={onNavigate} className={`flex flex-col p-5 ${cardBase}`}>
                {inner}
              </NavLink>
            )
          })}
        </div>,
      )
    default:
      return (
        <div className="columns-2 gap-8 sm:columns-3">
          {children.map((sub) => (
            <div key={`${openKey}-${sub.key}`} className="mb-2 break-inside-avoid">
              {renderMegaRow(openKey, sub)}
            </div>
          ))}
        </div>
      )
  }
}

export function Navbar() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpenDropdownKey, setMobileOpenDropdownKey] = useState<string | null>(null)
  const [desktopOpenKey, setDesktopOpenKey] = useState<string | null>(null)
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen)
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen)
  const isNotFoundLike = location.pathname === '/404'
  const onDarkHeader = !scrolled && !mobileMenuOpen && !isNotFoundLike
  const headerLogoTone: 'on-dark' | 'on-light' = onDarkHeader ? 'on-dark' : 'on-light'
  const navOnDarkSurface = headerLogoTone === 'on-dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) setMobileOpenDropdownKey(null)
  }, [mobileMenuOpen])

  useEffect(() => {
    setDesktopOpenKey(null)
  }, [location.pathname, location.hash, location.search])

  useEffect(() => {
    if (!desktopOpenKey) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDesktopOpenKey(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [desktopOpenKey])

  const closeMobile = () => {
    setMobileMenuOpen(false)
    setMobileOpenDropdownKey(null)
    setDesktopOpenKey(null)
  }

  const closeDesktopDropdown = () => setDesktopOpenKey(null)

  const linkDesktop = (isActive: boolean) => {
    const base = 'text-sm font-medium tracking-wide transition'
    if (navOnDarkSurface) {
      return `${base} ${isActive ? 'text-white' : 'text-white/85 hover:text-white'}`
    }
    return `${base} ${isActive ? 'font-semibold text-primary' : 'text-primary/65 hover:text-primary'}`
  }

  const renderSubLink = (parentKey: string, sub: NavSubItem) => {
    const label = submenuChildLabel(t, parentKey, sub)
    const mobileCls = `block rounded-md py-2 text-sm hover:bg-white/5 hover:text-white ${
      sub.key === 'overview' ? 'font-medium text-white/95' : 'text-white/80'
    }`

    if (sub.external) {
      const isWa = sub.key === 'whatsapp'
      return (
        <a
          href={sub.to}
          target={isWa ? '_blank' : undefined}
          rel={isWa ? 'noreferrer' : undefined}
          className={mobileCls}
          onClick={closeMobile}
        >
          {label}
        </a>
      )
    }

    return (
      <Link to={sub.to} onClick={closeMobile} className={mobileCls}>
        {label}
      </Link>
    )
  }

  const megaShell =
    'border border-stone/35 bg-white shadow-[0_32px_90px_-32px_rgb(15_23_42/0.22)] ring-1 ring-black/[0.05] backdrop-blur-xl'

  const shell = onDarkHeader
    ? 'border-b border-white/15 bg-brand/50 backdrop-blur-md'
    : 'border-b border-stone/50 bg-white/90 shadow-card backdrop-blur-md'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] overflow-x-clip transition-colors duration-300 ${shell}`}
      onMouseLeave={(e) => {
        const next = e.relatedTarget
        if (next instanceof Node && e.currentTarget.contains(next)) return
        closeDesktopDropdown()
      }}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:gap-6 lg:px-8 lg:py-4 xl:gap-8 xl:px-10 xl:py-5">
        <Link
          to="/"
          className="group inline-flex shrink-0 items-center self-center"
          aria-label={t('nav.homeAria')}
        >
          <BrandLogo variant="navbar" headerTone={headerLogoTone} />
        </Link>

        <div className="relative hidden min-w-0 flex-1 lg:flex lg:justify-center">
          <div className="mx-auto min-w-0 max-w-full overflow-x-auto overflow-y-visible overscroll-x-contain py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <nav
              className="inline-flex max-w-none shrink-0 flex-nowrap items-center justify-center gap-x-2 px-0.5 sm:gap-x-3 xl:gap-x-5 2xl:gap-x-6"
              aria-label={t('footer.explore')}
            >
              {MAIN_NAV.map((item) => {
                const children = 'children' in item ? item.children : undefined
                if (children?.length) {
                  const panelOpen = desktopOpenKey === item.key
                  return (
                    <div
                      key={item.key}
                      className="relative shrink-0 py-1"
                      onMouseEnter={() => setDesktopOpenKey(item.key)}
                      onFocusCapture={() => setDesktopOpenKey(item.key)}
                      aria-expanded={panelOpen}
                      aria-haspopup="true"
                    >
                      <div className="flex items-center gap-0.5 whitespace-nowrap">
                        <NavLink
                          to={item.to}
                          className={({ isActive }) => linkDesktop(isActive)}
                          onClick={closeDesktopDropdown}
                        >
                          {t(`nav.${item.key}`)}
                        </NavLink>
                        <ChevronDown
                          className={`pointer-events-none h-3.5 w-3.5 shrink-0 ${
                            navOnDarkSurface ? 'text-white/55' : 'text-primary/45'
                          }`}
                          aria-hidden
                        />
                      </div>
                    </div>
                  )
                }
                return (
                  <NavLink
                    key={item.key}
                    to={item.to}
                    className={({ isActive }) => `${linkDesktop(isActive)} shrink-0 whitespace-nowrap`}
                  >
                    {t(`nav.${item.key}`)}
                  </NavLink>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          {navOnDarkSurface ? (
            <div className="flex items-stretch overflow-hidden rounded-lg border border-white/[0.09] bg-black/20 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]">
              <LanguageSwitcher tone={headerLogoTone} embedded className="min-w-0" />
            </div>
          ) : (
            <LanguageSwitcher tone={headerLogoTone} />
          )}
          <a
            href={`tel:+${COMPANY.phoneE164}`}
            title={COMPANY.phoneDisplay}
            aria-label={COMPANY.phoneDisplay}
            className={`inline-flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm font-semibold transition xl:px-0 ${
              navOnDarkSurface ? 'text-white hover:text-white/90' : 'text-primary hover:text-primary/80'
            }`}
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span className="hidden xl:inline">{COMPANY.phoneDisplay}</span>
          </a>
          <Link
            to="/contact"
            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-brand shadow-card ring-1 ring-white/20 transition hover:bg-gold-hover xl:px-4"
          >
            {t('nav.consultCta')}
          </Link>
        </div>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border lg:hidden ${
            navOnDarkSurface
              ? 'border-white/30 text-white'
              : 'border-stone/70 text-primary'
          }`}
          aria-expanded={mobileMenuOpen}
          aria-label={t('nav.ariaToggleMenu')}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 top-full z-[110] hidden px-4 pt-1 sm:px-6 lg:block lg:px-8 ${
          desktopOpenKey ? 'pb-10' : 'pb-0'
        }`}
      >
        <AnimatePresence>
          {desktopOpenKey ? (
            <motion.div
              key={desktopOpenKey}
              role="region"
              aria-label={t(`nav.${desktopOpenKey}`)}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={`pointer-events-auto mx-auto max-h-[min(78vh,40rem)] w-full min-w-0 max-w-[1440px] overflow-y-auto overscroll-contain rounded-2xl p-5 sm:p-7 lg:p-8 ${megaShell}`}
            >
              <MegaMenuBody openKey={desktopOpenKey} t={t} onNavigate={closeDesktopDropdown} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-stone/60 bg-brand lg:hidden"
          >
            <div className="space-y-6 px-4 py-6 sm:px-6">
              <div className="space-y-3">
                {MAIN_NAV.map((item) => {
                  const children = 'children' in item ? item.children : undefined
                  if (children?.length) {
                    return (
                      <div key={item.key} className="space-y-2">
                        <div className="flex gap-2">
                          <NavLink
                            to={item.to}
                            onClick={closeMobile}
                            className={({ isActive }) =>
                              `min-w-0 flex-1 rounded-lg px-3 py-3 text-lg font-medium ${
                                isActive ? 'bg-white/15 text-white' : 'text-white/90'
                              }`
                            }
                          >
                            {t(`nav.${item.key}`)}
                          </NavLink>
                          <button
                            type="button"
                            className="flex w-12 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-white transition hover:bg-white/10"
                            aria-expanded={mobileOpenDropdownKey === item.key}
                            aria-controls={`mobile-nav-sub-${item.key}`}
                            aria-label={t('nav.ariaToggleNavSubmenu')}
                            onClick={() =>
                              setMobileOpenDropdownKey((k) => (k === item.key ? null : item.key))
                            }
                          >
                            <ChevronDown
                              className={`h-5 w-5 transition-transform ${
                                mobileOpenDropdownKey === item.key ? 'rotate-180' : ''
                              }`}
                              aria-hidden
                            />
                          </button>
                        </div>
                        {mobileOpenDropdownKey === item.key ? (
                          <div
                            id={`mobile-nav-sub-${item.key}`}
                            className="ml-1 space-y-1 border-l border-white/15 py-1 pl-4"
                          >
                            {children.map((sub) => (
                              <div key={`${item.key}-${sub.key}`}>{renderSubLink(item.key, sub)}</div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    )
                  }
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeMobile}
                      className={({ isActive }) =>
                        `block rounded-lg px-3 py-3 text-lg font-medium ${
                          isActive ? 'bg-white/15 text-white' : 'text-white/90'
                        }`
                      }
                    >
                      {t(`nav.${item.key}`)}
                    </NavLink>
                  )
                })}
              </div>
              <div className="flex min-w-0 items-stretch overflow-hidden rounded-lg border border-white/[0.09] bg-black/20 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]">
                <LanguageSwitcher tone="on-dark" embedded className="min-w-0 flex-1" />
              </div>
              <Link
                to="/contact"
                onClick={closeMobile}
                className="block rounded-lg bg-white py-3 text-center text-base font-semibold text-brand ring-1 ring-white/25"
              >
                {t('nav.mobileStartConversation')}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
