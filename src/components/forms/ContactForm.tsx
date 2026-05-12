import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type Status = 'idle' | 'loading' | 'success' | 'error' | 'not_configured'

const SUBJECTS = [
  'general',
  'brokerage',
  'refit',
  'management',
  'maintenance',
  'consultancy',
  'machinery-renovation',
] as const

const BUDGET_KEYS = ['unspecified', 'under250k', '250k-500k', '500k-1m', '1m-3m', '3mplus'] as const
const TIMELINE_KEYS = ['unspecified', 'within3mo', '3-12mo', '12mo-plus', 'research'] as const

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

export function ContactForm({ subjectPreset }: { subjectPreset?: string }) {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setStatus('not_configured')
      return
    }

    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const rawSubject = String(fd.get('subject') ?? 'general')
    const subjectKey = (SUBJECTS as readonly string[]).includes(rawSubject) ? rawSubject : 'general'
    const message = String(fd.get('message') ?? '').trim()
    const subjectLabel = t(`form.subjects.${subjectKey}`)

    const rawBudget = String(fd.get('budget') ?? 'unspecified')
    const budgetKey = (BUDGET_KEYS as readonly string[]).includes(rawBudget) ? rawBudget : 'unspecified'
    const budgetLabel = t(`form.budget.${budgetKey}`)

    const rawTimeline = String(fd.get('timeline') ?? 'unspecified')
    const timelineKey = (TIMELINE_KEYS as readonly string[]).includes(rawTimeline) ? rawTimeline : 'unspecified'
    const timelineLabel = t(`form.timeline.${timelineKey}`)

    setStatus('loading')
    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          replyto: email,
          subject: `[Yachtmenia] ${subjectLabel}`,
          message: [
            `Subject: ${subjectLabel}`,
            phone ? `Phone: ${phone}` : null,
            `Budget (indicative): ${budgetLabel}`,
            `Timeline: ${timelineLabel}`,
            '',
            message,
          ]
            .filter(Boolean)
            .join('\n'),
        }),
      })

      const data = (await res.json()) as { success?: boolean; message?: string }
      if (!res.ok || !data.success) {
        throw new Error(data.message ?? 'submit_failed')
      }
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-charcoal">
          {t('form.fullName')}
          <input
            required
            name="name"
            autoComplete="name"
            className="w-full rounded-xl border border-stone/80 bg-pearl px-4 py-3 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(0_0_50/0.04)] outline-none ring-primary/20 transition focus:border-primary focus:ring-2"
            placeholder={t('form.fullNamePlaceholder')}
          />
        </label>
        <label className="space-y-2 text-sm font-semibold text-charcoal">
          {t('form.email')}
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="w-full rounded-xl border border-stone/80 bg-pearl px-4 py-3 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(0_0_50/0.04)] outline-none ring-primary/20 transition focus:border-primary focus:ring-2"
            placeholder={t('form.emailPlaceholder')}
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-semibold text-charcoal">
        {t('form.phone')} <span className="font-normal text-slate">{t('form.phoneOptional')}</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className="w-full rounded-xl border border-stone/80 bg-pearl px-4 py-3 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(0_0_50/0.04)] outline-none ring-primary/20 transition focus:border-primary focus:ring-2"
          placeholder={t('form.phonePlaceholder')}
        />
      </label>

      <label className="space-y-2 text-sm font-semibold text-charcoal">
        {t('form.subject')}
        <select
          name="subject"
          defaultValue={subjectPreset ?? 'general'}
          className="w-full rounded-xl border border-stone/80 bg-pearl px-4 py-3 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(0_0_50/0.04)] outline-none ring-primary/20 transition focus:border-primary focus:ring-2"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {t(`form.subjects.${s}`)}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-charcoal">
          {t('form.budgetLabel')}
          <select
            name="budget"
            defaultValue="unspecified"
            className="w-full rounded-xl border border-stone/80 bg-pearl px-4 py-3 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(0_0_50/0.04)] outline-none ring-primary/20 transition focus:border-primary focus:ring-2"
          >
            {BUDGET_KEYS.map((k) => (
              <option key={k} value={k}>
                {t(`form.budget.${k}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm font-semibold text-charcoal">
          {t('form.timelineLabel')}
          <select
            name="timeline"
            defaultValue="unspecified"
            className="w-full rounded-xl border border-stone/80 bg-pearl px-4 py-3 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(0_0_50/0.04)] outline-none ring-primary/20 transition focus:border-primary focus:ring-2"
          >
            {TIMELINE_KEYS.map((k) => (
              <option key={k} value={k}>
                {t(`form.timeline.${k}`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm font-semibold text-charcoal">
        {t('form.message')}
        <textarea
          required
          name="message"
          rows={5}
          className="w-full rounded-xl border border-stone/80 bg-pearl px-4 py-3 text-base text-charcoal shadow-[inset_0_1px_2px_rgb(0_0_50/0.04)] outline-none ring-primary/20 transition focus:border-primary focus:ring-2"
          placeholder={t('form.messagePlaceholder')}
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-slate">
        <input type="checkbox" required className="mt-1 h-4 w-4 rounded border-stone text-primary focus:ring-primary" />
        <span>{t('form.consent')}</span>
      </label>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white shadow-[0_4px_14px_-4px_rgb(0_0_50/0.45)] transition hover:bg-brand/92 hover:shadow-[0_6px_20px_-6px_rgb(0_0_50/0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
      >
        {status === 'loading' ? (
          t('form.submitting')
        ) : (
          <>
            <Send className="h-4 w-4" />
            {t('form.submit')}
          </>
        )}
      </button>

      {status === 'success' ? (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-brand/20 bg-brand/[0.08] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.5)]"
          role="status"
          aria-live="polite"
        >
          <div className="flex gap-3">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-brand" strokeWidth={2} aria-hidden />
            <div>
              <p className="font-semibold text-brand">{t('form.successTitle')}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate">{t('form.successHint')}</p>
            </div>
          </div>
        </motion.div>
      ) : null}

      {status === 'error' ? (
        <p className="text-sm font-medium text-red-700" role="alert">
          {t('form.errorHint')}
        </p>
      ) : null}

      {status === 'not_configured' ? (
        <p className="text-sm font-medium text-amber-800" role="alert">
          {t('form.errorNotConfigured')}
        </p>
      ) : null}
    </form>
  )
}
