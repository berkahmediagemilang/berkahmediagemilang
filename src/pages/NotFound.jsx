import { Link } from 'react-router-dom'
import { ButtonLink, Eyebrow, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/not-found.js'
import en from '@/i18n/locale/en/not-found.js'
import zh from '@/i18n/locale/zh/not-found.js'

export default function NotFound() {
  const t = useStrings({ id, en, zh })

  const links = [
    { key: 'home', to: '/' },
    { key: 'services', to: '/services' },
    { key: 'event', to: '/event' },
    { key: 'contact', to: '/contact' },
  ]

  return (
    <section className="page-hero relative" aria-labelledby="notfound-title">
      <svg className="cta-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path d="M32 7l6.2 18.8L57 32l-18.8 6.2L32 57l-6.2-18.8L7 32l18.8-6.2L32 7z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <Wrap className="page-hero__inner">
        <Eyebrow dark>{t.eyebrow}</Eyebrow>

        <p className="notfound__code" aria-hidden="true">404</p>
        <h1 id="notfound-title" className="h2 mt-2 text-white">
          {t.headline.replace(t.headlineAccent, '')}<span className="text-accent-400">{t.headlineAccent}</span>
        </h1>
        <p className="lead lead--onDark mt-4 max-w-[560px]">{t.body}</p>

        <div className="hero__actions">
          <ButtonLink to="/" variant="accent">
            {t.primary}
            <span className="btn__icon" aria-hidden="true">→</span>
          </ButtonLink>
          <ButtonLink to="/services" variant="outlineLight">
            {t.secondary}
          </ButtonLink>
        </div>

        <nav className="mt-6 md:mt-8" aria-label={t.quickLinksNav}>
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">{t.quickLinks}</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.key}>
                <Link className="notfound__link" to={link.to}>{t.links[link.key]}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Wrap>
    </section>
  )
}
