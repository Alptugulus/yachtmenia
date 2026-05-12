import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BrandLogo } from '@/components/common/BrandLogo'
import { COMPANY, MAIN_NAV, SERVICE_NAV } from '@/utils/constants'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="relative border-t border-white/10 bg-brand text-white before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent lg:before:inset-x-10">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-10">
        <div className="space-y-4">
          <div className="space-y-3">
            <BrandLogo variant="footer" />
            <p className="text-sm text-white/70">{t('footer.since', { year: COMPANY.founded })}</p>
          </div>
          <p className="max-w-sm text-white/80">{t('footer.intro')}</p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {t('footer.explore')}
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-subtle text-white/85 hover:text-white">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {t('footer.services')}
          </p>
          <ul className="space-y-2 text-sm text-white/85">
            {SERVICE_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-subtle text-white/85 hover:text-white">
                  {t(`serviceNav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
            {t('footer.contact')}
          </p>
          <div className="space-y-3 text-sm text-white/90">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
              <span>{COMPANY.locationLine}</span>
            </div>
            <a href={`tel:+${COMPANY.phoneE164}`} className="flex items-center gap-3 transition hover:text-white">
              <Phone className="h-4 w-4 text-white" />
              {COMPANY.phoneDisplay}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-3 transition hover:text-white"
            >
              <Mail className="h-4 w-4 text-white" />
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1440px] space-y-3 px-4 py-6 text-xs sm:px-6 lg:px-10">
          <div className="flex flex-col gap-3 text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>{t('footer.rights', { year: new Date().getFullYear(), name: COMPANY.name })}</p>
            <div className="flex gap-6">
              <Link to="/contact" className="link-subtle text-white/70 hover:text-white">
                {t('footer.privacy')}
              </Link>
              <Link to="/contact" className="link-subtle text-white/70 hover:text-white">
                {t('footer.compliance')}
              </Link>
            </div>
          </div>
          <p className="text-center text-[11px] leading-relaxed text-white/45 sm:text-left">
            {t('footer.credit')}
          </p>
        </div>
      </div>
    </footer>
  )
}
