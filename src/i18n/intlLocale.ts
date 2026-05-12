/**
 * BCP 47 locale strings for Intl APIs (dates, numbers, currency).
 */
export function intlLocaleForLanguage(lang: string | undefined): string {
  const code = (lang ?? 'en').split('-')[0]
  if (code === 'de') return 'de-DE'
  if (code === 'tr') return 'tr-TR'
  return 'en-GB'
}

/** Open Graph locale tag (underscore form). */
export function ogLocaleForLanguage(lang: string | undefined): string {
  const code = (lang ?? 'en').split('-')[0]
  if (code === 'de') return 'de_DE'
  if (code === 'tr') return 'tr_TR'
  return 'en_US'
}
