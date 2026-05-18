import { COMPANY } from '@/utils/constants'

const { lat, lng } = COMPANY.marina
const place = encodeURIComponent('D-Marin Didim Marina')
const office = encodeURIComponent(COMPANY.locationLine)

export const MAP_LINKS = {
  google: `https://www.google.com/maps/search/?api=1&query=${place}`,
  apple: `https://maps.apple.com/?ll=${lat},${lng}&q=${place}`,
  waze: `https://www.waze.com/ul?ll=${lat},${lng}&navigate=yes&q=${office}`,
} as const
