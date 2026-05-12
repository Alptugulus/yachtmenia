import { Fragment, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BrandLogo } from '@/components/common/BrandLogo'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { yachts, references, blogPosts } from '@/data'
import type { NavSubItem } from '@/utils/constants'
import { COMPANY, MAIN_NAV } from '@/utils/constants'
import { useHtmlDarkClass } from '@/hooks/useHtmlDarkClass'
import { useUiStore } from '@/store/ui'

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

export function Navbar() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpenDropdownKey, setMobileOpenDropdownKey] = useState<string | null>(null)
  /** Desktop dropdown — state-based so it closes after a link click (hover-only stays open otherwise). */
  const [desktopOpenKey, setDesktopOpenKey] = useState<string | null>(null)
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen)
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen)
  // Every public page opens with a dark hero/PageHeader, so the navbar should sit
  // on a dark translucent bar at the top of any route. Once scrolled past the hero
  // (or the mobile menu is open) it switches to the light pearl bar for legibility.
  // The 404 view is the only route without a dark hero — fall back to the light bar.
  const isNotFoundLike = location.pathname === '/404'
  const isDark = useHtmlDarkClass()
  const onDarkHeader = !scrolled && !mobileMenuOpen && !isNotFoundLike
  /** Açık “pearl” üst çubuk + koyu mod: arka plan koyu → beyaz logo. */
  const headerLogoTone: 'on-dark' | 'on-light' =
    onDarkHeader || (isDark && (scrolled || mobileMenuOpen)) ? 'on-dark' : 'on-light'
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

  const dropdownPanel = navOnDarkSurface
    ? 'border border-white/15 bg-brand/95 shadow-lg ring-1 ring-white/10 backdrop-blur-md'
    : 'border border-stone/35 bg-white/95 shadow-lg ring-1 ring-black/[0.04] backdrop-blur-md dark:border-white/12 dark:bg-[#111322]/95 dark:ring-white/5'

  const dropdownLink = (isActive: boolean) => {
    if (navOnDarkSurface) {
      return `block px-4 py-2.5 text-sm tracking-wide transition ${
        isActive ? 'bg-white/15 font-semibold text-white' : 'text-white/88 hover:bg-white/10 hover:text-white'
      }`
    }
    return `block px-4 py-2.5 text-sm tracking-wide transition ${
      isActive
        ? 'bg-brand/[0.08] font-semibold text-primary dark:bg-white/[0.08] dark:text-white'
        : 'text-primary/70 hover:bg-brand/[0.05] hover:text-primary dark:text-[#c9d0eb] dark:hover:bg-white/[0.06] dark:hover:text-white'
    }`
  }

  const dropdownRule = navOnDarkSurface ? 'mx-3 my-1 h-px bg-white/12' : 'mx-3 my-1 h-px bg-stone/25 dark:bg-white/10'

  const renderSubLink = (parentKey: string, sub: NavSubItem, variant: 'desktop' | 'mobile') => {
    const label = submenuChildLabel(t, parentKey, sub)
    const desktopCls = ({ isActive }: { isActive: boolean }) => dropdownLink(isActive)
    const mobileCls = `block rounded-md py-2 text-sm hover:bg-white/5 hover:text-white ${
      sub.key === 'overview' ? 'font-medium text-white/95' : 'text-white/80'
    }`
    const afterActivate = () => {
      if (variant === 'desktop') closeDesktopDropdown()
      else closeMobile()
    }

    if (sub.external) {
      const isWa = sub.key === 'whatsapp'
      return (
        <a
          href={sub.to}
          target={isWa ? '_blank' : undefined}
          rel={isWa ? 'noreferrer' : undefined}
          className={variant === 'desktop' ? dropdownLink(false) : mobileCls}
          onClick={afterActivate}
        >
          {label}
        </a>
      )
    }

    if (variant === 'desktop') {
      return (
        <NavLink to={sub.to} className={desktopCls} onClick={afterActivate}>
          {label}
        </NavLink>
      )
    }

    return (
      <Link to={sub.to} onClick={afterActivate} className={mobileCls}>
        {label}
      </Link>
    )
  }

  const shell = onDarkHeader
    ? 'border-b border-white/15 bg-brand/50 backdrop-blur-md'
    : 'border-b border-stone/50 bg-white/90 shadow-card backdrop-blur-md dark:border-white/10 dark:bg-[#0b0d18]/92 dark:shadow-[0_8px_30px_-12px_rgb(0_0_0/0.65)]'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${shell}`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 lg:gap-6 lg:px-8 lg:py-4 xl:gap-8 xl:px-10 xl:py-5">
        <Link
          to="/"
          className="group inline-flex shrink-0 items-center self-center"
          aria-label={t('nav.homeAria')}
        >
          <BrandLogo variant="navbar" headerTone={headerLogoTone} />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-7 2xl:gap-8">
          {MAIN_NAV.map((item) => {
            const children = 'children' in item ? item.children : undefined
            if (children?.length) {
              const panelOpen = desktopOpenKey === item.key
              return (
                <div
                  key={item.key}
                  className="relative py-1"
                  onMouseEnter={() => setDesktopOpenKey(item.key)}
                  onMouseLeave={(e) => {
                    const next = e.relatedTarget as Node | null
                    if (next && e.currentTarget.contains(next)) return
                    closeDesktopDropdown()
                  }}
                  onFocusCapture={() => setDesktopOpenKey(item.key)}
                  onBlurCapture={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                      setDesktopOpenKey(null)
                    }
                  }}
                >
                  <div className="flex items-center gap-0.5">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => linkDesktop(isActive)}
                      onClick={closeDesktopDropdown}
                    >
                      {t(`nav.${item.key}`)}
                    </NavLink>
                    <ChevronDown
                      className={`pointer-events-none h-3.5 w-3.5 shrink-0 ${
                        navOnDarkSurface ? 'text-white/55' : 'text-primary/45 dark:text-[#9aa6cc]'
                      }`}
                      aria-hidden
                    />
                  </div>
                  <ul
                    className={`absolute left-1/2 top-full z-[110] -mt-1 min-w-[17rem] max-h-[min(70vh,28rem)] list-none -translate-x-1/2 flex-col overflow-y-auto overscroll-contain rounded-xl py-1 ${panelOpen ? 'flex' : 'hidden'} ${dropdownPanel}`}
                  >
                    {children.map((sub, i) => (
                      <Fragment key={`${item.key}-${sub.key}`}>
                        {i === 1 ? (
                          <li className="list-none px-0 py-0" aria-hidden>
                            <div className={dropdownRule} />
                          </li>
                        ) : null}
                        <li>{renderSubLink(item.key, sub, 'desktop')}</li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              )
            }
            return (
              <NavLink key={item.key} to={item.to} className={({ isActive }) => linkDesktop(isActive)}>
                {t(`nav.${item.key}`)}
              </NavLink>
            )
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          {navOnDarkSurface ? (
            <div className="flex items-stretch overflow-hidden rounded-lg border border-white/[0.09] bg-black/20 shadow-[inset_0_1px_0_rgb(255_255_255/0.04)]">
              <ThemeToggle tone={headerLogoTone} embedded />
              <LanguageSwitcher tone={headerLogoTone} embedded />
            </div>
          ) : (
            <>
              <ThemeToggle tone={headerLogoTone} />
              <LanguageSwitcher tone={headerLogoTone} />
            </>
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
            className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-brand shadow-card ring-1 ring-white/20 transition hover:bg-gold-hover xl:px-4 dark:bg-[#1a2138] dark:text-white dark:ring-white/12 dark:hover:bg-[#232a42]"
          >
            {t('nav.consultCta')}
          </Link>
        </div>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border lg:hidden ${
            navOnDarkSurface
              ? 'border-white/30 text-white'
              : 'border-stone/70 text-primary dark:border-white/20 dark:text-[#e8eaf2]'
          }`}
          aria-expanded={mobileMenuOpen}
          aria-label={t('nav.ariaToggleMenu')}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
                              <div key={`${item.key}-${sub.key}`}>{renderSubLink(item.key, sub, 'mobile')}</div>
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
                <ThemeToggle tone="on-dark" embedded />
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
