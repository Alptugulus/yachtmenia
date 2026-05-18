import { Suspense } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { OrganizationJsonLd } from '@/components/common/OrganizationJsonLd'
import { PageLoader } from '@/components/common/PageLoader'
import { useMotionAllowed } from '@/hooks/useMotionAllowed'
import { Navbar } from '@/components/layout/Navbar'
import { RouteTransition } from '@/components/layout/RouteTransition'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFab } from '@/components/layout/WhatsAppFab'

export function MainLayout() {
  const location = useLocation()
  const motionAllowed = useMotionAllowed()

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip">
      <OrganizationJsonLd />
      <ScrollRestoration />
      <RouteTransition />
      <Navbar />
      <main className="relative z-0 flex-1 overflow-x-clip">
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
  )
}
