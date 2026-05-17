import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BrandLogo } from '@/components/common/BrandLogo'
import { COMPANY, MAIN_NAV, SERVICE_NAV, SOCIAL } from '@/utils/constants'

const colHeading =
  'mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/90'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="relative border-t border-white/10 bg-brand text-white before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent lg:before:inset-x-10">
      <div className="mx-auto grid max-w-[1440px] gap-7 px-4 py-8 sm:px-6 sm:py-9 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:gap-9 lg:px-10">
        <div className="space-y-2">
          <BrandLogo variant="footer" />
          <p className="text-xs text-white/65">{t('footer.since', { year: COMPANY.founded })}</p>
          <p className="max-w-xs text-sm leading-snug text-white/75">{t('footer.intro')}</p>
        </div>

        <div>
          <p className={colHeading}>{t('footer.explore')}</p>
          <ul className="space-y-1 text-sm text-white/80">
            {MAIN_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-subtle hover:text-white">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={colHeading}>{t('footer.services')}</p>
          <ul className="space-y-1 text-sm text-white/80">
            {SERVICE_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="link-subtle hover:text-white">
                  {t(`serviceNav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={colHeading}>{t('footer.contact')}</p>
          <div className="space-y-1.5 text-sm text-white/85">
            <div className="flex gap-2.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/90" />
              <span>{COMPANY.locationLine}</span>
            </div>
            <a
              href={`tel:+${COMPANY.phoneE164}`}
              className="flex items-center gap-2.5 transition hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-white/90" />
              {COMPANY.phoneDisplay}
            </a>
            <a
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 transition hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
              {COMPANY.whatsappDisplay}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-2.5 transition hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-white/90" />
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-4 py-3.5 text-[11px] text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>{t('footer.rights', { year: new Date().getFullYear(), name: COMPANY.name })}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link to="/contact" className="link-subtle hover:text-white/80">
              {t('footer.privacy')}
            </Link>
            <Link to="/contact" className="link-subtle hover:text-white/80">
              {t('footer.compliance')}
            </Link>
            <span className="hidden text-white/35 sm:inline" aria-hidden>
              ·
            </span>
            <span className="text-white/40">{t('footer.credit')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
