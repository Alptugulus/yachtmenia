import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ThemeSync } from '@/components/common/ThemeSync'
import { router } from '@/router'

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const apply = (lng: string) => {
      document.documentElement.lang = lng.split('-')[0] || 'en'
    }
    apply(i18n.resolvedLanguage ?? i18n.language ?? 'en')
    i18n.on('languageChanged', apply)
    return () => {
      i18n.off('languageChanged', apply)
    }
  }, [i18n])

  return (
    <>
      <ThemeSync />
      <RouterProvider router={router} />
    </>
  )
}
