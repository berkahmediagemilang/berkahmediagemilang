import { Link } from 'react-router-dom'
import { ArrowRight, Headset, LifeBuoy, MessageCircleQuestion, ShieldCheck } from 'lucide-react'
import { PageHero, Wrap } from '@/components/ui.jsx'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/help.js'
import en from '@/i18n/locale/en/help.js'
import zh from '@/i18n/locale/zh/help.js'

// Icons stay in the component; the copy comes from the locale bundle so every
// tile label is translated without hard-coded ternaries.
const tileIcons = {
  contact: Headset,
  privacy: ShieldCheck,
  faq: MessageCircleQuestion,
}

export default function Help() {
  const t = useStrings({ id, en, zh })

  const tiles = [
    { key: 'contact', to: '/contact' },
    { key: 'privacy', to: '/privacy' },
    { key: 'faq', to: '/faq' },
  ]

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
        <Wrap className="max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[12px] font-semibold text-muted">
            <LifeBuoy size={14} aria-hidden="true" className="text-brand-600" />
            {t.hint}
          </p>
          <div className="help-tiles mt-5">
            {tiles.map(({ key, to }) => {
              const Icon = tileIcons[key]
              const tile = t[key]
              return (
                <Link key={to} to={to} className="help-tile">
                  <span className="help-tile__icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.8} />
                  </span>
                  <h2 className="help-tile__title">{tile.title}</h2>
                  <p className="help-tile__desc">{tile.desc}</p>
                  <span className="help-tile__cta">
                    {tile.cta}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              )
            })}
          </div>
        </Wrap>
      </section>
    </>
  )
}