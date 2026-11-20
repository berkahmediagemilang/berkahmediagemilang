import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, FileText, Link2, RefreshCw, ScrollText, ShieldAlert } from 'lucide-react'
import { ButtonLink, PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/terms.js'
import en from '@/i18n/locale/en/terms.js'
import zh from '@/i18n/locale/zh/terms.js'

// Positional icons: the locale bundle owns the copy, this map owns the icon for
// each section index.
const sectionIcons = [ScrollText, FileText, Link2, ShieldAlert, RefreshCw]

const shortTitle = (title) => title.replace(/^\d+\.\s*/, '')

export default function TermsCondition() {
  const t = useStrings({ id, en, zh })

  const sections = useMemo(
    () => t.sections.map((section, index) => ({ ...section, index, Icon: sectionIcons[index] ?? ScrollText })),
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
            {t.breadcrumb.terms}
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
              <ScrollText size={14} aria-hidden="true" />
              {t.scopeLabel}
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
                  <li key={section.title}>
                    <a className="doc-toc__link" href={`#terms-${section.index + 1}`}>
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
                const anchor = `terms-${section.index + 1}`
                return (
                  <section className="doc-section" id={anchor} key={section.title} aria-labelledby={`${anchor}-title`}>
                    <div className="doc-section__head">
                      <span className="icon-badge icon-badge--accent" aria-hidden="true">
                        <section.Icon size={22} strokeWidth={1.8} />
                      </span>
                      <h2 className="h3" id={`${anchor}-title`}>{section.title}</h2>
                    </div>
                    <p>{section.body}</p>
                  </section>
                )
              })}

              <div className="mt-12 flex flex-wrap gap-4 border-t border-line pt-8">
                <ButtonLink to="/contact" variant="primary">
                  {t.contact}
                  <span className="btn__icon" aria-hidden="true">→</span>
                </ButtonLink>
                <Link to="/privacy" className="btn btn--outline">
                  {t.privacy}
                </Link>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  )
}