import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircleQuestion, Plus, Search } from 'lucide-react'
import { PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/faq.js'
import en from '@/i18n/locale/en/faq.js'
import zh from '@/i18n/locale/zh/faq.js'

export default function FAQ() {
  const t = useStrings({ id, en, zh })
  const [query, setQuery] = useState('')

  const normalized = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    const numbered = t.items.map((item, index) => ({ ...item, num: String(index + 1).padStart(2, '0') }))
    if (!normalized) return numbered
    return numbered.filter((item) => `${item.q} ${item.a}`.toLowerCase().includes(normalized))
  }, [t.items, normalized])

  const total = t.items.length
  const countLabel = t.countLabel.replace('{shown}', filtered.length).replace('{total}', total)

  return (
    <>
      <PageHero
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            {t.breadcrumb.faq}
          </>
        }
        eyebrow={t.eyebrow}
        title={<>{t.title.replace(t.titleAccent, '')}<span className="text-accent-400">{t.titleAccent}</span></>}
        lead={t.lead}
      />
      <section className="section section--white">
        <Wrap className="max-w-3xl">
          <div className="faq-tools">
            <label className="faq-search">
              <Search size={18} aria-hidden="true" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.searchPlaceholder}
                aria-label={t.searchLabel}
              />
            </label>
            <p className="faq-count" aria-live="polite">{countLabel}</p>
          </div>

          {filtered.length > 0 ? (
            <div className="faq-list">
              {filtered.map((item, index) => (
                <details key={item.q} className="faq-item" open={index === 0 && !normalized}>
                  <summary className="faq-summary">
                    <span className="faq-summary__num" aria-hidden="true">{item.num}</span>
                    {item.q}
                    <Plus size={18} className="faq-summary__plus" aria-hidden="true" />
                  </summary>
                  <p className="faq-answer">{item.a}</p>
                </details>
              ))}
            </div>
          ) : (
            <div className="faq-empty">
              <MessageCircleQuestion size={32} aria-hidden="true" className="mx-auto text-brand-400" />
              <p>{t.emptyText}</p>
              <Link to="/contact" className="btn btn--primary">
                {t.emptyCta}
              </Link>
            </div>
          )}

          <div className="mt-6 md:mt-10">
            <Link to="/contact" className="btn btn--primary">
              {t.stillQuestions}
              <span className="btn__icon" aria-hidden="true">→</span>
            </Link>
          </div>
        </Wrap>
      </section>
    </>
  )
}