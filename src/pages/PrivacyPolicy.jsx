import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Cookie,
  Database,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  ScrollText,
  Share2,
  Users,
} from 'lucide-react'
import { ButtonLink, PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/privacy.js'
import en from '@/i18n/locale/en/privacy.js'
import zh from '@/i18n/locale/zh/privacy.js'

const contactEmail = 'hello@bmg.co.id'

// Section icons are positional: the locale bundle owns the copy, this map owns
// the icon for each section id so the two never drift apart.
const sectionIcons = {
  1: ScrollText,
  2: Database,
  3: Users,
  4: Cookie,
  5: Share2,
  6: Lock,
  7: KeyRound,
  8: RefreshCw,
  9: Mail,
}

const shortTitle = (title) => title.replace(/^\d+\.\s*/, '')

export default function PrivacyPolicy() {
  const t = useStrings({ id, en, zh })

  const sections = useMemo(
    () => t.sections.map((section, index) => ({ ...section, index, Icon: sectionIcons[section.id] ?? ScrollText })),
    [t.sections],
  )

  const sectionCount = t.sectionCount.replace('{count}', sections.length)

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
        <Wrap className="max-w-6xl">
          <div className="doc-meta">
            <span className="chip">
              <CalendarClock size={14} aria-hidden="true" />
              {t.effectiveDate}
            </span>
            <span className="chip">
              <BookOpen size={14} aria-hidden="true" />
              {sectionCount}
            </span>
          </div>

          <div className="doc-layout">
            <nav className="doc-toc doc-sidebar" aria-label={t.tocTitle}>
              <p className="doc-toc__title">
                <BookOpen size={14} aria-hidden="true" />
                {t.tocTitle}
              </p>
              <ul className="doc-toc__grid">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a className="doc-toc__link" href={`#privacy-${section.index + 1}`}>
                      <span className="doc-toc__num" aria-hidden="true">
                        {String(section.index + 1).padStart(2, '0')}
                      </span>
                      {shortTitle(section.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              {sections.map((section) => {
                const anchor = `privacy-${section.index + 1}`
                return (
                  <section className="doc-section" id={anchor} key={section.id} aria-labelledby={`${anchor}-title`}>
                    <div className="doc-section__head">
                      <span className="icon-badge icon-badge--accent" aria-hidden="true">
                        <section.Icon size={22} strokeWidth={1.8} />
                      </span>
                      <h2 className="h3" id={`${anchor}-title`}>{section.title}</h2>
                    </div>
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                    {section.list ? (
                      <ul className="doc-list">
                        {section.list.map((item) => (
                          <li key={item}>
                            <CheckCircle2 size={18} aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                )
              })}

              <div className="mt-12 flex flex-wrap gap-4 border-t border-line pt-8">
                <ButtonLink to="/contact" variant="primary">
                  {t.contact}
                  <span className="btn__icon" aria-hidden="true">→</span>
                </ButtonLink>
                <a className="btn btn--outline" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
                <a className="btn btn--outline" href={`${import.meta.env.BASE_URL}privacy-policy.html`} title={t.staticVersionTitle}>
                  {t.staticVersion}
                </a>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  )
}