import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'
import { ArrowRight, Award, MapPin, MessageCircle, Phone, Shield } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/common/Seo'
import { HeroBackdrop } from '@/components/common/HeroBackdrop'
import { HeroWave } from '@/components/common/HeroWave'
import { SectionWave } from '@/components/common/SectionWave'
import { PAGE_HERO_IMAGES } from '@/utils/heroMedia'
import { Button } from '@/components/common/Button'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CountUp } from '@/components/common/CountUp'
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
  const motionAllowed = useMotionAllowed()

  const stats: Array<
    | { label: string; type: 'count'; value: number }
    | { label: string; type: 'text'; value: string }
  > = [
    { label: t('home.stats.founded'), type: 'count', value: COMPANY.founded },
    { label: t('home.stats.base'), type: 'text', value: 'D-MARINE' },
    { label: t('home.stats.disciplines'), type: 'count', value: 6 },
    { label: t('home.stats.response'), type: 'text', value: t('home.stats.responseValue') },
  ]

  return (
    <>
      <Seo title={COMPANY.name} path="/" />

      <section className="relative isolate min-h-[88vh] overflow-hidden pt-24 sm:pt-28">
        <HeroBackdrop
          src={PAGE_HERO_IMAGES.home}
          alt="Luxury yachts moored at a sunlit Mediterranean marina"
          variant="home"
          priority
          parallax
        />

        <motion.div className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-10 px-4 pb-20 pt-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:pb-24 lg:pt-16">
          <motion.div
            initial={motionAllowed ? { opacity: 0, y: 48, filter: 'blur(12px)' } : false}
            animate={motionAllowed ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl space-y-7 text-white"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/95 sm:text-base">
              {t('home.hero.overline')}
            </p>
            <h1 className="font-display text-balance text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[1.02] tracking-tight drop-shadow-[0_4px_32px_rgb(0_0_0/0.45)]">
              {t('home.hero.title')}
            </h1>
            <p className="max-w-2xl text-xl font-medium leading-relaxed text-white sm:text-2xl sm:leading-snug drop-shadow-[0_2px_20px_rgb(0_0_0/0.4)]">
              {t('home.hero.lead')}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/yachts" variant="primary" className="px-6 py-3 text-base sm:text-lg">
                {t('home.hero.ctaYachts')}
              </Button>
              <Button to="/contact" variant="ghost" className="border-white/35 bg-white/10 px-6 py-3 text-base text-white sm:text-lg">
                {t('home.hero.ctaContact')}
              </Button>
            </div>
            <div className="mt-1 flex flex-wrap gap-6 border-t border-white/20 pt-6 text-base text-white/90 sm:text-lg">
              <span className="inline-flex items-center gap-2.5">
                <Shield className="h-5 w-5 text-white" />
                {t('home.hero.trustDiligence')}
              </span>
              <span className="inline-flex items-center gap-2.5">
                <Award className="h-5 w-5 text-white" />
                {t('home.hero.trustSince', { year: COMPANY.founded })}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={motionAllowed ? { opacity: 0, y: 40, scale: 0.94 } : false}
            animate={motionAllowed ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{ delay: motionAllowed ? 0.2 : 0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-3xl border border-white/30 bg-white/[0.18] p-8 text-white shadow-[0_24px_56px_-16px_rgb(0_0_0/0.45)] ring-1 ring-white/20 backdrop-blur-md transition-[box-shadow,border-color] duration-500 hover:border-white/35 hover:shadow-[0_32px_72px_-18px_rgb(0_0_0/0.5)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              {t('home.hero.concierge.overline')}
            </p>
            <p className="mt-3 font-display text-2xl leading-tight sm:text-3xl">{t('home.hero.concierge.title')}</p>
            <div className="mt-5 space-y-3.5 text-base text-white sm:text-lg">
              <a href={`tel:+${COMPANY.phoneE164}`} className="flex items-center gap-3 transition hover:text-white">
                <Phone className="h-5 w-5 text-white" />
                {COMPANY.phoneDisplay}
              </a>
              <a
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <MessageCircle className="h-5 w-5 text-[#6ee7a0]" />
                {COMPANY.whatsappDisplay}
              </a>
              <Link to="/contact" className="flex items-start gap-3 transition hover:text-white">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-white" />
                <span>{COMPANY.locationShort}</span>
              </Link>
            </div>
            <a
              href={SOCIAL.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-brand px-4 py-3 text-base font-semibold text-white shadow-[0_10px_28px_-10px_rgb(0_0_0/0.4),inset_0_1px_0_rgb(255_255_255/0.12)] ring-1 ring-white/20 transition hover:bg-brand-muted hover:ring-white/30"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#3ee878] to-[#128C7E] ring-1 ring-white/25">
                <WhatsAppIcon className="h-4 w-4 text-white" />
              </span>
              {t('whatsapp.team')}
            </a>
          </motion.div>
        </motion.div>

        <HeroWave tone="mist" />
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
              transition: { staggerChildren: motionAllowed ? 0.14 : 0 },
            },
          }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="space-y-2 px-5 py-8 sm:px-8 sm:py-10"
              variants={{
                hidden: motionAllowed ? { opacity: 0, y: 28, scale: 0.95 } : {},
                visible: motionAllowed
                  ? {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
                    }
                  : {},
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">{s.label}</p>
              <p className="font-display text-3xl tabular-nums tracking-tight text-primary sm:text-[2.125rem]">
                {s.type === 'count' ? (
                  <CountUp value={s.value} duration={1.4} />
                ) : (
                  s.value
                )}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <SectionWave topTone="mist" bottomTone="pearl" />

      <section id="home-services" className="scroll-mt-28 border-b border-stone/30 bg-pearl py-20 sm:py-24">
        <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-6 lg:px-10">
        <FadeIn variant="blur-up">
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

      <SectionWave topTone="pearl" bottomTone="mist" />

      <section id="home-featured" className="scroll-mt-28 bg-mist py-20 sm:py-24">
        <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-6 lg:px-10">
          <FadeIn variant="blur-up">
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

      <SectionWave topTone="mist" bottomTone="brand" />

      <section id="home-references" className="scroll-mt-28 bg-brand py-20 text-white sm:py-24">
        <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-6 lg:px-10">
          <FadeIn variant="blur-up">
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

      <SectionWave topTone="brand" bottomTone="pearl" />

      <section id="home-blog" className="scroll-mt-28 border-t border-stone/35 bg-pearl py-20 sm:py-24">
        <div className="mx-auto max-w-[1440px] space-y-12 px-4 sm:px-6 lg:px-10">
        <FadeIn variant="blur-up">
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
        <FadeIn variant="blur-up" className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-10">
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
