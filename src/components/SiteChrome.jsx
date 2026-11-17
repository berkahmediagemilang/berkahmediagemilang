import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from '@/i18n/LanguageSwitcher.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/common.js'
import en from '@/i18n/locale/en/common.js'
import zh from '@/i18n/locale/zh/common.js'
import { ButtonLink, Logo } from '@/components/ui.jsx'

const routes = [
  { label: 'home', href: '/' },
  { label: 'about', href: '/about-us' },
  { label: 'services', href: '/services' },
  { label: 'event', href: '/event' },
]

export function SiteHeader() {
  const t = useStrings({ id, en, zh })
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navLabel = t.nav.mainNavigation
  const openLabel = t.nav.openMenu
  const closeLabel = t.nav.closeMenu

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap site-header__inner">
          <Logo light />

          <nav className="site-nav" aria-label={navLabel}>
            {routes.map((route) => (
              <NavLink
                key={route.label}
                to={route.href}
                end={route.href === '/'}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
              >
                {t.nav[route.label]}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <LanguageSwitcher />
            <ButtonLink to="/contact" variant="accent" size="sm" className="site-header__cta">
              {t.nav.contact}
            </ButtonLink>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? closeLabel : openLabel}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`}>
        <nav aria-label={navLabel}>
          {routes.map((route) => (
            <NavLink
              key={route.label}
              to={route.href}
              end={route.href === '/'}
              className={({ isActive }) => `mobile-menu__link${isActive ? ' is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {t.nav[route.label]}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <ButtonLink to="/contact" variant="accent" block onClick={() => setOpen(false)}>
            {t.nav.contact}
          </ButtonLink>
        </div>
      </div>
    </>
  )
}
