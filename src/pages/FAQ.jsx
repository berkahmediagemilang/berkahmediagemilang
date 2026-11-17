import { Link } from 'react-router-dom'
import { PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/faq.js'
import en from '@/i18n/locale/en/faq.js'
import zh from '@/i18n/locale/zh/faq.js'

export default function FAQ() {
  const t = useStrings({ id, en, zh })

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
          <div className="grid gap-4">
            {t.items.map((item) => (
              <details key={item.q} className="card p-6">
                <summary className="cursor-pointer list-none text-[16px] font-bold text-ink-900">{item.q}</summary>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-6 md:mt-8">
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