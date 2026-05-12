import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'whatsapp'

const variants: Record<Variant, string> = {
  primary:
    'bg-white text-brand shadow-[0_2px_10px_-4px_rgb(0_0_50/0.18),0_1px_0_rgb(255_255_255/0.85)_inset] ring-1 ring-brand/[0.12] hover:bg-gold-hover hover:shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:bg-[#1c2238] dark:text-white dark:ring-white/10 dark:hover:bg-[#252c45] dark:hover:text-white',
  secondary:
    'border border-brand/90 bg-white/60 text-brand shadow-[0_1px_0_rgb(255_255_255/0.9)_inset] backdrop-blur-sm hover:bg-brand/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-white/15 dark:bg-[#141824]/80 dark:text-[#e4e8f5] dark:hover:bg-white/[0.06]',
  ghost:
    'text-white hover:bg-white/10 border border-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  outline:
    'border border-stone/80 bg-pearl/90 text-charcoal shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] hover:border-stone hover:bg-brand/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-white/12 dark:bg-[#121528]/90 dark:text-[#e6e9f2] dark:hover:bg-white/[0.05]',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  asChild?: boolean
  to?: string
  children: ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  to,
  type = 'button',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-6 py-3 text-[15px] font-semibold tracking-wide transition-[color,background-color,border-color,box-shadow,transform,opacity] duration-200 ease-out motion-safe:active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40'

  if (to) {
    return (
      <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
