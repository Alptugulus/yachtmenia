import i18n from '@/i18n'
import { COMPANY } from './constants'

const SITE_NAME = COMPANY.name

export function pageTitle(title: string): string {
  const suffix = i18n.t('seo.siteSuffix', { defaultValue: 'Luxury Yacht Services Turkey' })
  if (!title || title === SITE_NAME) return `${SITE_NAME} | ${suffix}`
  return `${title} | ${SITE_NAME}`
}

export function defaultDescription(): string {
  return i18n.t('seo.defaultDescription', {
    name: COMPANY.name,
    year: COMPANY.founded,
    defaultValue: `${COMPANY.name} — brokerage, refit, yacht management and marine consultancy at Didim D-MARINE since ${COMPANY.founded}.`,
  })
}
