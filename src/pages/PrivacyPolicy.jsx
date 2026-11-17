import { Link } from 'react-router-dom'
import { ButtonLink, PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/privacy.js'
import en from '@/i18n/locale/en/privacy.js'
import zh from '@/i18n/locale/zh/privacy.js'

const contactEmail = 'hello@bmg.co.id'

export default function PrivacyPolicy() {
  const t = useStrings({ id, en, zh })

  return (
    <>
      <PageHero
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            {t.breadcrumb.privacy}
          </>
        }
        eyebrow={t.eyebrow}
        title={<>{t.title.replace(t.titleAccent, '')}<span className="text-accent-400">{t.titleAccent}</span></>}
        lead={t.lead}
      />

      <section className="section section--white">
        <Wrap className="max-w-3xl">
          {t.sections.map((section) => (
            <section className="mt-6 md:mt-8 first:mt-0" key={section.id} aria-labelledby={`privacy-${section.id}`}>
              <h2 className="h3" id={`privacy-${section.id}`}>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p className="mt-3 text-[15px] leading-relaxed text-muted" key={index}>
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="mt-3 list-disc space-y-1.5 pl-6 text-[15px] leading-relaxed text-muted">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <div className="mt-8 flex flex-wrap gap-4 border-t border-line pt-6 md:mt-10">
            <ButtonLink to="/contact" variant="primary">
              {t.contact}
              <span className="btn__icon" aria-hidden="true">→</span>
            </ButtonLink>
            <a className="btn btn--outline" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            <a
              className="btn btn--outline"
              href={`${import.meta.env.BASE_URL}privacy-policy.html`}
              title={t.staticVersionTitle}
            >
              {t.staticVersion}
            </a>
          </div>
        </Wrap>
      </section>
    </>
  )
}
