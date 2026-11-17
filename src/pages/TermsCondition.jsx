import { Link } from 'react-router-dom'
import { ButtonLink, PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/terms.js'
import en from '@/i18n/locale/en/terms.js'
import zh from '@/i18n/locale/zh/terms.js'

export default function TermsCondition() {
  const t = useStrings({ id, en, zh })

  return (
    <>
      <PageHero
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            {t.breadcrumb.terms}
          </>
        }
        eyebrow={t.eyebrow}
        title={<>{t.title.replace(t.titleAccent, '')}<span className="text-accent-400">{t.titleAccent}</span></>}
        lead={t.lead}
      />
      <section className="section section--white">
        <Wrap className="max-w-3xl">
          {t.sections.map((section) => (
            <section className="mt-6 md:mt-8 first:mt-0" key={section.title}>
              <h2 className="h3">{section.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
          <div className="mt-8 flex flex-wrap gap-4 border-t border-line pt-6 md:mt-10">
            <ButtonLink to="/contact" variant="primary">
              {t.contact}
              <span className="btn__icon" aria-hidden="true">→</span>
            </ButtonLink>
            <Link to="/privacy" className="btn btn--outline">
              {t.privacy}
            </Link>
          </div>
        </Wrap>
      </section>
    </>
  )
}