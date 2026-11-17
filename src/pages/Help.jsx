import { Link } from 'react-router-dom'
import { ButtonLink, PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/help.js'
import en from '@/i18n/locale/en/help.js'
import zh from '@/i18n/locale/zh/help.js'

export default function Help() {
  const t = useStrings({ id, en, zh })

  return (
    <>
      <PageHero
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            {t.breadcrumb.help}
          </>
        }
        eyebrow={t.eyebrow}
        title={<>{t.title.replace(t.titleAccent, '')}<span className="text-accent-400">{t.titleAccent}</span></>}
        lead={t.lead}
      />
      <section className="section section--white">
        <Wrap className="max-w-3xl">
          <ul className="grid gap-4">
            <li className="card p-6">
              <h2 className="h3">{t.contact.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.contact.desc}</p>
              <ButtonLink to="/contact" variant="primary" className="mt-4">
                {t.contact.cta}
                <span className="btn__icon" aria-hidden="true">→</span>
              </ButtonLink>
            </li>
            <li className="card p-6">
              <h2 className="h3">{t.privacy.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.privacy.desc}</p>
              <Link to="/privacy" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                {t.privacy.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
            <li className="card p-6">
              <h2 className="h3">{t.faq.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{t.faq.desc}</p>
              <Link to="/faq" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                {t.faq.cta}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </Wrap>
      </section>
    </>
  )
}