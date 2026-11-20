import { useState } from 'react'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/compare.js'
import en from '@/i18n/locale/en/compare.js'
import zh from '@/i18n/locale/zh/compare.js'

const pages = [
  { key: 'home' },
  { key: 'about-us' },
  { key: 'services' },
  { key: 'event' },
  { key: 'contact' },
]

function toNewPath(key) {
  return key === 'home' ? '/' : `/${key}`
}

// The archived classic build keeps its original route names; only 'event' differs.
function toClassicPath(key) {
  const classicKey = key === 'event' ? 'portfolio' : key
  return `/classic/#${classicKey === 'home' ? '/' : `/${classicKey}`}`
}

export default function Compare() {
  const t = useStrings({ id, en, zh })
  const [page, setPage] = useState('home')
  const [device, setDevice] = useState('desktop')

  const label = (p) => t.pages[p.key]

  const frameClass = device === 'mobile' ? 'mx-auto w-full max-w-[390px]' : 'w-full'

  return (
    <section className="section">
      <div className="wrap">
        <h1 className="h2">{t.heading}</h1>
        <p className="lead mt-3 max-w-[560px]">{t.subheading}</p>

        {/* Controls */}
        <div className="mt-6 md:mt-8 flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t.choosePage}>
            {pages.map((p) => (
              <button
                key={p.key}
                type="button"
                aria-pressed={page === p.key}
                onClick={() => setPage(p.key)}
                className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
                  page === p.key
                    ? 'border-ink-900 bg-ink-900 text-white'
                    : 'border-line bg-white text-muted hover:border-ink-900 hover:text-ink-900'
                }`}
              >
                {label(p)}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2" role="group" aria-label={t.deviceLabel}>
            <button
              type="button"
              aria-pressed={device === 'desktop'}
              onClick={() => setDevice('desktop')}
              className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
                device === 'desktop' ? 'border-ink-900 bg-ink-900 text-white' : 'border-line bg-white text-muted hover:border-ink-900 hover:text-ink-900'
              }`}
            >
              {t.desktopLabel}
            </button>
            <button
              type="button"
              aria-pressed={device === 'mobile'}
              onClick={() => setDevice('mobile')}
              className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] font-bold transition-colors ${
                device === 'mobile' ? 'border-ink-900 bg-ink-900 text-white' : 'border-line bg-white text-muted hover:border-ink-900 hover:text-ink-900'
              }`}
            >
              {t.mobileLabel}
            </button>
          </div>
        </div>

        {/* Side-by-side frames */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <figure className="min-w-0">
            <figcaption className="mb-3 flex items-center justify-between gap-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted">{t.beforeLabel}</span>
              <a href={toClassicPath(page)} target="_blank" rel="noreferrer" className="link-more">
                {t.openFull}
                <span className="link-more__icon" aria-hidden="true">→</span>
              </a>
            </figcaption>
            <div className={`overflow-hidden rounded-[20px] border border-line bg-white shadow-sm ${frameClass}`}>
              <iframe
                title={`${t.beforeLabel}: ${label(pages.find((p) => p.key === page))}`}
                src={toClassicPath(page)}
                className="block h-[78vh] min-h-[520px] w-full border-0"
              />
            </div>
          </figure>

          <figure className="min-w-0">
            <figcaption className="mb-3 flex items-center justify-between gap-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-brand-600">{t.afterLabel}</span>
              <a href={toNewPath(page)} target="_blank" rel="noreferrer" className="link-more">
                {t.openFull}
                <span className="link-more__icon" aria-hidden="true">→</span>
              </a>
            </figcaption>
            <div className={`overflow-hidden rounded-[20px] border border-line bg-white shadow-sm ${frameClass}`}>
              <iframe
                title={`${t.afterLabel}: ${label(pages.find((p) => p.key === page))}`}
                src={toNewPath(page)}
                className="block h-[78vh] min-h-[520px] w-full border-0"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}