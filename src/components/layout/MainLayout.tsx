import { Suspense } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { OrganizationJsonLd } from '@/components/common/OrganizationJsonLd'
import { PageLoader } from '@/components/common/PageLoader'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'

export function MainLayout() {
  const location = useLocation()
  const reduce = useReducedMotion()

  return (
    <div className="flex min-h-screen flex-col">
      <OrganizationJsonLd />
      <ScrollRestoration />
      <Navbar />
      <main className="relative z-0 flex-1">
        {/*
          No AnimatePresence exit: "wait" kept the old page mounted while exiting,
          which preserved scroll offset across transitions. Only a light enter fade.
        */}
        <motion.div
          key={location.pathname}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
