import { Link } from 'react-router-dom'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { siInstagram, siWhatsapp } from 'simple-icons'
import { useLanguage } from '@/i18n/language.js'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/common.js'
import en from '@/i18n/locale/en/common.js'
import zh from '@/i18n/locale/zh/common.js'
import { localized, services } from '@/data/services.js'
import { Logo, Wrap } from '@/components/ui.jsx'

export default function Footer() {
  const { language } = useLanguage()
  const t = useStrings({ id, en, zh }).footer

  // Keep the footer in sync with the services catalogue (/services page).
  const serviceLinks = services.map((service) => ({
    label: localized(service.title, language),
    to: `/services/${service.slug}`,
  }))

  const pageLinks = [
    { label: t.home, to: '/' },
    { label: t.about, to: '/about-us' },
    { label: t.servicesNav, to: '/services' },
    { label: t.event, to: '/event' },
    { label: t.contactNav, to: '/contact' },
  ]

  const helpLinks = [
    { label: t.privacy, to: '/privacy' },
    { label: t.terms, to: '/terms' },
    { label: t.helpCenter, to: '/help' },
    { label: t.faq, to: '/faq' },
  ]

  return (
    <footer className="bg-ink-950 text-white">
      <Wrap className="footer-main">
        <div className="footer-brand">
          <Logo light />
          <p className="footer-tagline">{t.tagline}</p>
          <div className="footer-social">
            <a href="https://www.instagram.com/" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg role="img" viewBox="0 0 24 24" width="18" height="18" fill={`#${siInstagram.hex}`} aria-hidden="true" focusable="false">
                <path d={siInstagram.path} />
              </svg>
            </a>
            <a href="https://wa.me/6281234567890" aria-label="WhatsApp" target="_blank" rel="noreferrer">
              <svg role="img" viewBox="0 0 24 24" width="18" height="18" fill={`#${siWhatsapp.hex}`} aria-hidden="true" focusable="false">
                <path d={siWhatsapp.path} />
              </svg>
            </a>
            <a href="mailto:pt.berkahmediagemilang@gmail.com" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-navs">
          <nav aria-label={t.links}>
            <h2 className="footer-heading">{t.links}</h2>
            <ul className="footer-list">
              {pageLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.services}>
            <h2 className="footer-heading">{t.services}</h2>
            <ul className="footer-list">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.helpGroup}>
            <h2 className="footer-heading">{t.helpGroup}</h2>
            <ul className="footer-list">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Wrap>

      <Wrap className="footer-contact-band">
        <h2 className="footer-heading">{t.contact}</h2>
        <ul className="footer-contact footer-contact--row">
          <li>
            <MapPin size={16} />
            <span>{t.address}</span>
          </li>
          <li>
            <Phone size={16} />
            <a href="tel:+6281234567890">+62 812-3456-7890</a>
          </li>
          <li>
            <Mail size={16} />
            <a href="mailto:pt.berkahmediagemilang@gmail.com">pt.berkahmediagemilang@gmail.com</a>
          </li>
        </ul>
      </Wrap>

      <Wrap className="footer-bottom">
        <p>
          © 2026 Berkah Media Gemilang. {t.rights}{' '}
          <Link to="/bandingkan" className="footer-compare">
            {t.compare}
          </Link>
        </p>
        <button
          type="button"
          className="footer-top"
          aria-label={t.backToTop}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp size={18} />
        </button>
      </Wrap>
    </footer>
  )
}
