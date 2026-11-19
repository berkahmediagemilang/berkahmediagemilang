import { useMemo, useState, useRef, useEffect } from 'react'
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

  // Group archive events by year for timeline display
  const groupedArchive = useMemo(() => {
    const groups = {}
    for (const item of archiveEvents) {
      const year = item.date.year
      if (!groups[year]) groups[year] = []
      groups[year].push(item)
    }
    return Object.entries(groups)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, items]) => ({ year: Number(year), items }))
  }, [archiveEvents])

  const formatDate = (date) => formatEventDate(date, language)
  const timelineRef = useRef(null)
  const [visibleGroups, setVisibleGroups] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)
  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisibleGroups((prev) => Math.min(prev + 1, groupedArchive.length))
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    const items = el.querySelectorAll('[data-timeline-group]')
    items.forEach((item) => observer.observe(item))
    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const start = window.innerHeight * 0.85
      const total = rect.height - window.innerHeight * 0.3
      const scrolled = start - rect.top
      setLineProgress(Math.max(0, Math.min(1, scrolled / Math.max(total, 1))))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [groupedArchive.length])

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
          <div className="relative ml-4 sm:ml-0" ref={timelineRef}>
            {/* Timeline vertical line */}
            <div className="absolute left-[7px] top-2 bottom-0 w-px bg-white/5" aria-hidden="true">
              <div className="w-full bg-accent-500/30 transition-[height] duration-150 ease-out" style={{ height: `${lineProgress * 100}%` }} />
            </div>
            {groupedArchive.slice(0, 3).map((group, groupIndex) => {
              const visibleItems = group.items.slice(0, 3)
              const hiddenCount = group.items.length - 3
              const isCurrentYear = groupIndex === 0
              return (
                <div key={group.year} data-timeline-group className="mb-8 last:mb-0">
                  {/* Year marker */}
                  <div className={`relative z-10 flex items-center gap-4 mb-4 transition-all duration-500 ${visibleGroups > groupIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isCurrentYear ? 'bg-accent-500 ring-4 ring-accent-500/20' : 'bg-white/10'}`} aria-hidden="true" />
                    <span className="font-display text-2xl font-bold text-accent-400">{group.year}</span>
                  </div>
                  {/* Events in that year */}
                  <ul className="ml-8 space-y-3">
                    {visibleItems.map((item, index) => (
                      <li key={item.slug} className={`transition-all duration-500 ${visibleGroups > groupIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${index * 100 + 100}ms` }}>
                        <Link
                          to={`/event/${item.slug}`}
                          className="group flex items-center gap-4 rounded-[10px] border border-white/10 bg-white/[0.03] px-3 py-2.5 transition-colors hover:border-accent-500/50 hover:bg-white/[0.06]"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13px] font-bold leading-snug text-white group-hover:text-accent-400 transition-colors">
                              {localized(item.title, language)}
                            </span>
                            <span className="block text-[11px] text-white/45">
                              {item.place}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                    {hiddenCount > 0 && (
                      <li className={`flex justify-end pr-1 transition-all duration-500 ${visibleGroups > groupIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '400ms' }}>
                        <span className="text-[11px] font-bold text-accent-400">
                          +{hiddenCount} {t.archive.others || 'other events'}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              )
            })}
          </div>
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