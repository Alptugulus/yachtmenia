import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { MarinaMap } from '@/components/contact/MarinaMap'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageHeader } from '@/components/layout/PageHeader'
import { SectionWave } from '@/components/common/SectionWave'
import { COMPANY, SOCIAL } from '@/utils/constants'
import { PAGE_HERO_IMAGES } from '@/utils/heroMedia'

export function Contact() {
  const { t } = useTranslation()

  return (
    <>
      <Seo
        title={t('seo.titles.contact')}
        description={t('seo.descriptions.contact', {
          name: COMPANY.name,
          location: COMPANY.locationLine,
          phone: COMPANY.phoneDisplay,
          email: COMPANY.email,
        })}
        path="/contact"
      />

      <PageHeader
        title={t('contact.header.title')}
        subtitle={t('contact.header.subtitle')}
        crumbs={[{ label: t('breadcrumb.home'), to: '/' }, { label: t('seo.titles.contact') }]}
        backgroundImage={PAGE_HERO_IMAGES.contact}
      />

      <section className="mx-auto grid max-w-[1200px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="space-y-8">
          <div className="rounded-2xl border border-stone/50 bg-pearl p-8 shadow-card ring-1 ring-primary/[0.04]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/75">
              {t('contact.visit.overline')}
            </p>
            <div className="mt-4 flex gap-3 text-charcoal">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-display text-2xl text-primary">{COMPANY.locationLine}</p>
                <p className="mt-2 text-sm text-slate">{t('contact.visit.body')}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-stone/45 bg-mist/80 p-8 shadow-[inset_0_1px_0_rgb(255_255_255/0.65)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/75">
              {t('contact.direct.overline')}
            </p>
            <div className="mt-4 space-y-4 text-charcoal">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
                  {t('contact.direct.landline')}
                </p>
                <a
                  href={`tel:+${COMPANY.phoneE164}`}
                  className="mt-1 flex items-center gap-3 text-lg font-semibold hover:text-primary/80"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  {COMPANY.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
                  {t('contact.direct.whatsapp')}
                </p>
                <a
                  href={SOCIAL.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 flex items-center gap-3 text-lg font-semibold hover:text-primary/80"
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  {COMPANY.whatsappDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate">
                  {t('contact.direct.email')}
                </p>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="mt-1 flex items-center gap-3 text-lg font-semibold hover:text-primary/80"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-stone/50 bg-pearl p-8 shadow-card ring-1 ring-primary/[0.04]">
          <h2 className="font-display text-3xl text-primary">{t('contact.form.title')}</h2>
          <p className="mt-2 text-slate">{t('contact.form.subtitle')}</p>
          <p className="mt-3 border-l-2 border-primary/25 pl-4 text-sm leading-relaxed text-slate">
            {t('contact.form.responseExpectation')}
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <SectionWave topTone="pearl" bottomTone="mist" />
      <section className="bg-mist pb-16 pt-4 sm:pb-20">
        <MarinaMap />
      </section>
    </>
  )
}
