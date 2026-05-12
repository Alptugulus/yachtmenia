import type { LucideIcon } from 'lucide-react'
import {
  Anchor,
  ClipboardList,
  Cog,
  Compass,
  Settings,
  Ship,
  Wrench,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Ship,
  Wrench,
  ClipboardList,
  Cog,
  Compass,
  Settings,
}

export function getServiceIcon(name: string): LucideIcon {
  return iconMap[name] ?? Anchor
}
