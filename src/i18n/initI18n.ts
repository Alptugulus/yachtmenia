import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'

export const LANG_STORAGE_KEY = 'yachtmenia.lang' as const

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'tr', label: 'Türkçe', short: 'TR' },
] as const

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code']

const SUPPORTED_CODES = SUPPORTED_LANGUAGES.map((l) => l.code) as readonly LanguageCode[]

function isLanguageCode(v: string): v is LanguageCode {
  return (SUPPORTED_CODES as readonly string[]).includes(v)
}

function pickInitialLanguage(): LanguageCode {
  try {
    const raw = localStorage.getItem(LANG_STORAGE_KEY)
    if (raw && isLanguageCode(raw)) return raw
  } catch {
    /* private mode */
  }
  if (typeof navigator !== 'undefined') {
    const nav = navigator.language.slice(0, 2).toLowerCase()
    if (isLanguageCode(nav)) return nav
  }
  return 'en'
}

/** İlk yüklemede yalnızca İngilizce + seçilen dil; diğer diller dil değişiminde import() ile gelir. */
export async function initI18n(): Promise<void> {
  if (i18n.isInitialized) return

  const lng = pickInitialLanguage()
  const resources: Record<string, { translation: typeof en }> = { en: { translation: en } }

  if (lng !== 'en') {
    const mod = await import(`./locales/${lng}.json`)
    resources[lng] = { translation: mod.default }
  }

  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_CODES],
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    returnNull: false,
    returnEmptyString: false,
  })
}

/** Dil paketi yoksa chunk yükleyip ekler (TBT için tr/de ilk bundle dışında). */
export async function ensureLanguageLoaded(lng: LanguageCode): Promise<void> {
  if (lng === 'en') return
  if (i18n.hasResourceBundle(lng, 'translation')) return
  const mod = await import(`./locales/${lng}.json`)
  i18n.addResourceBundle(lng, 'translation', mod.default, true, true)
}

export { i18n }
export default i18n
