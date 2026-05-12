import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SOCIAL } from '@/utils/constants'

export function WhatsAppFab() {
  const { t } = useTranslation()
  const label = encodeURIComponent(t('whatsapp.fabMessage'))
  return (
    <a
      href={`${SOCIAL.whatsapp}?text=${label}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft ring-2 ring-white/35 transition-[transform,background-color,box-shadow] duration-200 ease-out motion-safe:hover:scale-105 motion-safe:hover:shadow-[0_12px_36px_-8px_rgb(37_211_102/0.55)] hover:bg-[#1ebe57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-8 sm:right-8"
      aria-label={t('whatsapp.ariaLabel')}
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2} />
    </a>
  )
}
