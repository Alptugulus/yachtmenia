import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Award, MapPin, Phone, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/common/Button'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FadeIn } from '@/components/common/FadeIn'
import { YachtCard } from '@/components/cards/YachtCard'
import { ServiceCard } from '@/components/cards/ServiceCard'
import { ReferenceCard } from '@/components/cards/ReferenceCard'
import { BlogCard } from '@/components/cards/BlogCard'
import { getAllPosts, getAllServices, getFeaturedYachts, getAllReferences } from '@/data'
import {
  useTranslatedPosts,
  useTranslatedReferences,
  useTranslatedServices,
  useTranslatedYachts,
} from '@/i18n/dataT'
import { COMPANY, SOCIAL } from '@/utils/constants'

export function Home() {
  const { t } = useTranslation()
  const services = useTranslatedServices(getAllServices())
  const featured = useTranslatedYachts(getFeaturedYachts())
  const references = useTranslatedReferences(getAllReferences().slice(0, 2))
  const posts = useTranslatedPosts(getAllPosts().slice(0, 3))
  const reduce = useReducedMotion()

  const stats = [
    { label: t('home.stats.founded'), value: String(COMPANY.founded) },
    { label: t('home.stats.base'), value: 'D-MARINE' },
    { label: t('home.stats.disciplines'), value: '6' },
    { label: t('home.stats.response'), value: t('home.stats.responseValue') },
  ]

  return (
    <>
      <Seo title={COMPANY.name} path="/" />

      <section className="relative isolate min-h-[88vh] overflow-hidden pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src="/media/photo-1500375592092-40eb2168fd21.jpg"
            alt="Luxury motor yacht cruising the Aegean at golden hour"
            className="h-full w-full origin-center object-cover will-change-transform motion-safe:animate-hero-settle"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/80 to-brand/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/30 to-transparent" />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,transparent_0%,rgb(0_0_50/0.12)_100%)]"
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-10 px-4 pb-20 pt-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-24 lg:pt-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-6 text-white"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white">
              {t('home.hero.overline')}
            </p>
            <h1 className="font-display text-balance text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05]">
              {t('home.hero.title')}
            </h1>
            <p className="max-w-2xl text-lg text-white/90">
              {t('home.hero.lead', { name: COMPANY.name, location: COMPANY.locationLine })}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/yachts" variant="primary">
                {t('home.hero.ctaYachts')}
              </Button>
              <Button to="/contact" variant="ghost" className="border-white/30 bg-white/5">
                {t('home.hero.ctaContact')}
              </Button>
            </div>
            <div className="mt-1 flex flex-wrap gap-6 border-t border-white/15 pt-6 text-sm text-white/80">
              <span className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4 text-white" />
                {t('home.hero.trustDiligence')}
              </span>
              <span className="inline-flex items-center gap-2">
                <Award className="h-4 w-4 text-white" />
                {t('home.hero.trustSince', { year: COMPANY.founded })}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.15, duration: 0.55 }}
            className="w-full max-w-md rounded-3xl border border-white/25 bg-white/[0.14] p-7 text-white shadow-[0_24px_56px_-16px_rgb(0_0_0/0.45)] ring-1 ring-white/15 backdrop-blur-md transition-[box-shadow,border-color] duration-500 hover:border-white/35 hover:shadow-[0_32px_72px_-18px_rgb(0_0_0/0.5)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {t('home.hero.concierge.overline')}
            </p>
            <p className="mt-3 font-display text-2xl">{t('home.hero.concierge.title')}</p>
            <div className="mt-4 space-y-3 text-sm text-white/90">
              <a href={`tel:+${COMPANY.phoneE164}`} className="flex items-center gap-3 transition hover:text-white">
                <Phone className="h-4 w-4 text-white" />
                {COMPANY.phoneDisplay}
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                <span>{COMPANY.locationLine}</span>
              </div>
            </div>
            <a
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
            >
              {t('whatsapp.team')}
            </a>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-stone/40 bg-mist px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <motion.div
          className="mx-auto grid max-w-[1440px] grid-cols-2 divide-y divide-stone/25 overflow-hidden rounded-2xl border border-stone/35 bg-pearl shadow-card sm:grid-cols-4 sm:divide-x sm:divide-y-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduce ? 0 : 0.07 },
            },
          }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="space-y-2 px-5 py-8 sm:px-8 sm:py-10"
              variants={{
                hidden: reduce ? {} : { opacity: 0, y: 12 },
                visible: reduce
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
                    },
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">{s.label}</p>
              <p className="font-display text-3xl tabular-nums tracking-tight text-primary sm:text-[2.125rem]">
                {s.value}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section id="home-services" className="scroll-mt-28 border-b border-stone/30 bg-pearl py-20 sm:py-24">
        <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-6 lg:px-10">
        <FadeIn>
          <SectionHeading
            overline={t('home.services.overline')}
            title={t('home.services.title')}
            subtitle={t('home.services.subtitle')}
            action={
              <Button to="/services" variant="secondary">
                {t('home.services.cta')}
              </Button>
            }
          />
        </FadeIn>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
        </div>
      </section>

      <section id="home-featured" className="scroll-mt-28 bg-mist py-20 sm:py-24">
        <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-6 lg:px-10">
          <FadeIn>
            <SectionHeading
              overline={t('home.featured.overline')}
              title={t('home.featured.title')}
              subtitle={t('home.featured.subtitle')}
              action={
                <Button to="/yachts" variant="primary">
                  {t('home.featured.cta')}
                </Button>
              }
            />
          </FadeIn>
          <div className="grid gap-8 lg:grid-cols-3">
            {featured.map((y, i) => (
              <YachtCard key={y.id} yacht={y} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section id="home-references" className="scroll-mt-28 bg-brand py-20 text-white sm:py-24">
        <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-6 lg:px-10">
          <FadeIn>
            <SectionHeading
              light
              align="center"
              overline={t('home.references.overline')}
              title={t('home.references.title')}
              subtitle={t('home.references.subtitle')}
            />
          </FadeIn>
          <div className="grid gap-8 lg:grid-cols-2">
            {references.map((p, i) => (
              <ReferenceCard key={p.id} project={p} index={i} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button to="/references" variant="ghost">
              {t('home.references.cta')}
            </Button>
          </div>
        </div>
      </section>

      <section id="home-blog" className="scroll-mt-28 border-t border-stone/35 bg-pearl py-20 sm:py-24">
        <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-6 lg:px-10">
        <FadeIn>
          <SectionHeading
            overline={t('home.blog.overline')}
            title={t('home.blog.title')}
            subtitle={t('home.blog.subtitle')}
            action={
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-lg px-1 py-0.5 text-sm font-semibold text-primary transition hover:bg-primary/[0.06] hover:text-primary/90"
              >
                {t('home.blog.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </FadeIn>
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((p, i) => (
            <BlogCard key={p.id} post={p} index={i} />
          ))}
        </div>
        </div>
      </section>

      <section className="border-t border-stone/35 bg-gradient-to-b from-mist via-pearl to-mist py-20 sm:py-24">
        <FadeIn className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-10">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/75">
              {t('home.cta.overline')}
            </p>
            <h2 className="font-display text-balance text-4xl text-primary">{t('home.cta.title')}</h2>
            <p className="text-lg text-slate">{t('home.cta.subtitle')}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/contact" variant="primary">
              {t('home.cta.primary')}
            </Button>
            <Button to="/services" variant="outline">
              {t('home.cta.secondary')}
            </Button>
          </div>
        </FadeIn>
      </section>
    </>
  )
}
