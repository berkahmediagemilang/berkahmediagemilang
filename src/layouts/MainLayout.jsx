import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import RouteFallback from '@/components/RouteFallback.jsx'
import { SiteHeader } from '@/components/SiteChrome.jsx'
import Footer from '@/components/Footer.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/common.js'
import en from '@/i18n/locale/en/common.js'
import zh from '@/i18n/locale/zh/common.js'

export default function MainLayout() {
  const location = useLocation()
  const t = useStrings({ id, en, zh })

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        {t.skipLink}
      </a>
      <SiteHeader />
      <main id="main" className="page-enter" key={location.pathname}>
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}