import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { OrganizationJsonLd } from '@/components/common/OrganizationJsonLd'
import { PageLoader } from '@/components/common/PageLoader'
import { LenisProvider } from '@/contexts/LenisContext'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'
import { Navbar } from '@/components/layout/Navbar'
import { RouteTransition } from '@/components/layout/RouteTransition'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'

export function MainLayout() {
  const location = useLocation()
  const motionAllowed = useMotionAllowed()

  return (
    <LenisProvider>
      <div className="flex min-h-screen flex-col">
        <OrganizationJsonLd />
        <ScrollProgress />
        <RouteTransition />
        <Navbar />
        <main className="relative z-0 flex-1">
          {/*
            ScrollRestoration removed — LenisProvider scrolls to top on route change.
            No AnimatePresence exit: avoids preserving scroll offset across transitions.
          */}
          <motion.div
            key={location.pathname}
            initial={motionAllowed ? { opacity: 0, y: 12 } : false}
            animate={motionAllowed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: motionAllowed ? 0.38 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </LenisProvider>
  )
}
