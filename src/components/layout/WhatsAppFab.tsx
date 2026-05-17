import { useTranslation } from 'react-i18next'
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon'
import { SOCIAL } from '@/utils/constants'

export function WhatsAppFab() {
  const { t } = useTranslation()
  const label = encodeURIComponent(t('whatsapp.fabMessage'))

  return (
    <a
      href={`${SOCIAL.whatsapp}?text=${label}`}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-6 right-4 z-40 flex items-center gap-0 overflow-hidden rounded-full bg-brand py-1.5 pl-1.5 pr-4 shadow-[0_20px_50px_-12px_rgb(0_0_50/0.55),0_1px_0_rgb(255_255_255/0.12)_inset] ring-1 ring-white/20 transition-[transform,box-shadow,ring-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_28px_60px_-14px_rgb(0_0_50/0.5),0_1px_0_rgb(255_255_255/0.18)_inset] hover:ring-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-8 sm:right-8 sm:pr-5"
      aria-label={t('whatsapp.ariaLabel')}
    >
      <span
        className="pointer-events-none absolute -inset-1 rounded-full bg-[#25D366]/15 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
        aria-hidden
      />

      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3ee878] via-[#25D366] to-[#128C7E] shadow-[inset_0_1px_0_rgb(255_255_255/0.4),0_4px_14px_-4px_rgb(37_211_102/0.65)] ring-1 ring-white/30">
        <span
          className="absolute inset-0 rounded-full bg-[#25D366]/40 motion-safe:animate-ping motion-reduce:hidden"
          style={{ animationDuration: '2.8s' }}
          aria-hidden
        />
        <WhatsAppIcon className="relative h-[1.35rem] w-[1.35rem] text-white" />
      </span>

      <span className="relative hidden max-w-[9.5rem] truncate pl-3 text-sm font-semibold tracking-wide text-white sm:inline">
        {t('whatsapp.fabLabel')}
      </span>
    </a>
  )
}
