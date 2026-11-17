import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { ButtonLink, Eyebrow, PageHero, SectionHead, Wrap } from '@/components/ui.jsx'
import { categoryLabels, events, formatEventDate, sortEventsByDateDesc } from '@/data/events.js'
import { localized } from '@/data/localized.js'
import { useLanguage } from '@/i18n/language.js'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/event.js'
import en from '@/i18n/locale/en/event.js'
import zh from '@/i18n/locale/zh/event.js'

const heroPhoto = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=85'

const MotionLink = motion.create(Link)

const filters = ['All Events', 'Mice & Professional', 'Public & Community', 'Corporate', 'Gathering & Team Building', 'Sport Events']

function matchesFilter(item, filter) {
  if (filter === 'All Events') return true
  if (filter === 'Mice & Professional') return item.category === 'mice' || item.category === 'hybrid'
  if (filter === 'Public & Community') return item.category === 'public' || item.category === 'tenant'
  if (filter === 'Gathering & Team Building') return item.gathering
  if (filter === 'Sport Events') return item.category === 'sport'
  return item.category === 'corporate'
}

export default function Event() {
  const [filter, setFilter] = useState('All Events')
  const [page, setPage] = useState(1)
  const { language } = useLanguage()
  const t = useStrings({ id, en, zh })

  const visibleItems = useMemo(() => events.filter((item) => matchesFilter(item, filter)), [filter])
  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(visibleItems.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return visibleItems.slice(start, start + pageSize)
  }, [visibleItems, currentPage])

  const archiveEvents = useMemo(() => sortEventsByDateDesc(events), [])
  const archiveLead = t.archive.leadTemplate.replace('{count}', events.length)

  const formatDate = (date) => formatEventDate(date, language)

  return (
    <>
      <PageHero
        image={heroPhoto}
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            {t.breadcrumb.event}
          </>
        }
        eyebrow={t.eyebrow}
        title={<>{t.title.replace(t.titleAccent, '')}<span className="text-accent-400">{t.titleAccent}</span></>}
        lead={t.lead}
      />

      <section className="section">
        <Wrap>
          {/* Filters -------------------------------------------------- */}
          <div
            className="mb-4 md:mb-8 flex gap-2 overflow-x-auto border-b border-line pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label={t.filterLabel}
          >
            {filters.map((name) => (
              <button
                type="button"
                key={name}
                aria-pressed={filter === name}
                className={`relative flex-none cursor-pointer px-4 py-3 text-[13px] font-bold whitespace-nowrap transition-colors ${
                  filter === name ? 'text-ink-900' : 'text-muted hover:text-ink-900'
                }`}
                onClick={() => {
                  setFilter(name)
                  setPage(1)
                }}
              >
                {t.filters[name]}
                {filter === name ? <span className="absolute inset-x-3 bottom-[-1px] h-[2px] rounded-full bg-accent-500" aria-hidden="true" /> : null}
              </button>
            ))}
          </div>

          {/* Grid ----------------------------------------------------- */}
          <AnimatePresence mode="wait">
            <motion.div
              className="grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3"
              key={`${filter}-${currentPage}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              {pagedItems.map((item, index) => {
                const itemTitle = localized(item.title, language)
                return (
                  <MotionLink
                    className="group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-[20px] bg-ink-800 text-white"
                    key={item.slug}
                    to={`/event/${item.slug}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <img
                      className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={item.image}
                      alt={itemTitle}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink-950/95 via-ink-950/45 to-transparent" aria-hidden="true" />
                    <span className="chip absolute left-4 top-4 z-[3] bg-accent-500 text-white">
                      {localized(categoryLabels[item.category], language)}
                    </span>
                    <span className="absolute right-4 top-4 z-[3] inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white backdrop-blur-md transition-colors duration-300 group-hover:border-accent-500 group-hover:bg-accent-500">
                      {t.learnMore}
                      <ArrowRight size={13} aria-hidden="true" />
                    </span>
                    <div className="relative z-[2] p-6">
                      <p className="text-[13px] font-semibold text-white/90">
                        {item.place} · {formatDate(item.date)}
                      </p>
                      <h3 className="h3 mt-2 text-white">{itemTitle}</h3>
                    </div>
                  </MotionLink>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Pagination ------------------------------------------------ */}
          {totalPages > 1 ? (
            <nav className="mt-8 flex items-center justify-center gap-2 md:mt-10" aria-label={t.pagination.label}>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-[12px] bg-ink-900/5 text-ink-900 transition-colors hover:bg-ink-900/10 disabled:cursor-default disabled:opacity-40"
                disabled={currentPage === 1}
                aria-label={t.pagination.prev}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                <button
                  type="button"
                  key={pageNumber}
                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                  className={`grid h-11 min-w-11 place-items-center rounded-[12px] text-sm font-bold transition-colors ${
                    currentPage === pageNumber ? 'bg-ink-900 text-white' : 'bg-ink-900/5 text-ink-900 hover:bg-ink-900/10'
                  }`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-[12px] bg-ink-900/5 text-ink-900 transition-colors hover:bg-ink-900/10 disabled:cursor-default disabled:opacity-40"
                disabled={currentPage === totalPages}
                aria-label={t.pagination.next}
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              >
                <ChevronRight size={18} />
              </button>
            </nav>
          ) : null}
        </Wrap>
      </section>

      {/* Archive ---------------------------------------------------------- */}
      <section className="section section--dark">
        <Wrap>
          <SectionHead dark eyebrow={t.archive.eyebrow} title={<>{t.archive.title.replace(t.archive.titleAccent, '')}<span className="text-accent-400">{t.archive.titleAccent}</span></>} lead={archiveLead} className="mb-8" />
          <ul>
            {archiveEvents.map((item) => (
              <li key={item.slug}>
                <Link
                  to={`/event/${item.slug}`}
                  className="group grid gap-y-1 border-t border-white/10 px-2 py-5 transition-colors hover:bg-white/[0.04] sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-x-8 sm:px-4"
                >
                  <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-accent-400">
                    {formatEventDate(item.date, language)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[16px] font-bold leading-snug text-white">
                      {localized(item.title, language)}
                    </span>
                    <span className="mt-1 block text-[13px] text-white/55">
                      {item.place} · {localized(categoryLabels[item.category], language)}
                    </span>
                  </span>
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="hidden shrink-0 text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-400 sm:block"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10" aria-hidden="true" />
        </Wrap>
      </section>

      {/* CTA ---------------------------------------------------------- */}
      <section className="relative isolate text-white py-12 md:py-16" style={{ '--hero-image': `url(https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2200&q=88)` }}>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(7,14,28,.83),rgba(7,14,28,.72)),var(--hero-image)] bg-center bg-cover" />
        <Wrap className="relative z-[1]">
          <div className="max-w-3xl" data-enter>
            <Eyebrow dark accent>
              {t.cta.eyebrow}
            </Eyebrow>
            <h2 className="h2 mt-5">
              {t.cta.title.replace(t.cta.titleAccent, '')}<span className="text-accent-400">{t.cta.titleAccent}</span>
            </h2>
            <p className="lead lead--onDark mt-5 max-w-[560px]">
              {t.cta.lead}
            </p>
            <div className="hero__actions">
              <ButtonLink to="/contact" variant="accent">
                {t.cta.button}
                <span className="btn__icon" aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  )
}