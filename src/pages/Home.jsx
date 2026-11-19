import { useMemo, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Mic,
  PlayCircle,
  Search,
  Settings,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Volume2,
  Wrench,
} from 'lucide-react'
import AnimatedCounter from '@/components/AnimatedCounter.jsx'
import ProcessStepper from '@/components/ProcessStepper.jsx'
import { ButtonLink, Eyebrow, SectionHead, Wrap } from '@/components/ui.jsx'
import { services as serviceCatalog } from '@/data/services.js'
import { sortEventsByDateDesc, events } from '@/data/events.js'
import { localized } from '@/data/localized.js'
import { useLanguage } from '@/i18n/language.js'
import { useStrings } from '@/i18n/useStrings.js'
import * as MarqueeLib from 'react-fast-marquee'
import { Phone } from 'lucide-react'
import id from '@/i18n/locale/id/home.js'
import en from '@/i18n/locale/en/home.js'
import zh from '@/i18n/locale/zh/home.js'
const Marquee = MarqueeLib.default?.default || MarqueeLib.default || MarqueeLib

const images = {
  hero: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=2200&q=88',
  about: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1100&q=85',
  festival: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85',
  speaker: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=85',
  brand: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85',
  tenant: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=85',
  field1: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=85',
  field2: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=85',
  field3: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=85',
}

/* Maps a localized service title (ID/EN/ZH) to its /services/:slug detail route. */
const serviceSlugByTitle = new Map(
  serviceCatalog.flatMap((service) =>
    [service.title.id, service.title.en, service.title.zh].map((title) => [title, service.slug]),
  ),
)

const clients = [
  <span key="jansport" className="font-black tracking-[0.09em] text-[30px]">JanSport</span>,
  <span key="coway" className="font-bold text-[38px]">coway</span>,
  <span key="lumi" className="font-bold tracking-[0.32em] text-[27px]">LUMI</span>,
  <span key="serasa" className="flex flex-col items-center leading-[1]">
    <span className="font-serif italic text-[33px]">Serasa</span>
    <small className="mt-[3px] text-[10px] font-semibold tracking-[0.32em] text-white/70">BAKEHOUSE</small>
  </span>,
  <span key="telpopek" className="flex items-center gap-[10px] text-[27px] font-bold leading-none">
    <Phone size={30} aria-hidden="true" /> tel-popek
  </span>,
]

const clientsSmall = [
  <span key="jansport" className="font-black tracking-[0.09em] text-[20px]">JanSport</span>,
  <span key="coway" className="font-bold text-[26px]">coway</span>,
  <span key="lumi" className="font-bold tracking-[0.32em] text-[18px]">LUMI</span>,
  <span key="serasa" className="flex flex-col items-center leading-[1]">
    <span className="font-serif italic text-[22px]">Serasa</span>
    <small className="mt-[2px] text-[8px] font-semibold tracking-[0.32em] text-white/60">BAKEHOUSE</small>
  </span>,
  <span key="telpopek" className="flex items-center gap-[8px] text-[18px] font-bold leading-none">
    <Phone size={21} aria-hidden="true" /> tel-popek
  </span>,
]

const iconMap = {
  calendar: Calendar,
  tools: Wrench,
  sound: Volume2,
  phone: Smartphone,
  sparkles: Sparkles,
  mic: Mic,
  bulb: Lightbulb,
  play: PlayCircle,
  briefcase: Briefcase,
  people: Users,
  trend: TrendingUp,
}

const processIcons = [Search, Target, Lightbulb, Settings, PlayCircle, TrendingUp]

function Icon({ name, size = 24 }) {
  const Component = iconMap[name] || Calendar
  return <Component size={size} />
}

export default function HomePage() {
  const t = useStrings({ id, en, zh })
  const { language } = useLanguage()
  const recentEvents = useMemo(() => sortEventsByDateDesc(events), [])
  const groupedRecentEvents = useMemo(() => {
    const groups = {}
    for (const item of recentEvents) {
      const year = item.date.year
      if (!groups[year]) groups[year] = []
      groups[year].push(item)
    }
    return Object.entries(groups)
      .sort(([a], [b]) => Number(b) - Number(a))
      .map(([year, items]) => ({ year: Number(year), items }))
  }, [recentEvents])
  const workCarouselRef = useRef(null)
  const fieldCarouselRef = useRef(null)
  const timelineRef = useRef(null)
  const [visibleGroups, setVisibleGroups] = useState(0)
  const [lineProgress, setLineProgress] = useState(0)
  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisibleGroups((prev) => Math.min(prev + 1, groupedRecentEvents.length))
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
  }, [groupedRecentEvents.length])
  const scrollWork = (direction) => {
    const el = workCarouselRef.current
    if (!el) return
    el.scrollBy({ left: direction * Math.max(280, el.clientWidth * 0.72), behavior: 'smooth' })
  }
  const scrollField = (direction) => {
    const el = fieldCarouselRef.current
    if (!el) return
    el.scrollBy({ left: direction * Math.max(280, el.clientWidth * 0.72), behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero --------------------------------------------------------- */}
      <section className="hero">
        <img className="hero__media" src={images.hero} alt={t.hero.imageAlt} />
        <div className="hero__scrim" aria-hidden="true" />
        <Wrap className="hero__inner">
          <div className="hero__content" data-enter>
            <Eyebrow dark accent>
              {t.hero.eyebrow}
            </Eyebrow>
            <h1 className="display-1 mt-5">
              {t.hero.title.replace(t.hero.titleAccent, '')}<span className="text-accent-400">{t.hero.titleAccent}</span>
            </h1>
            <p className="lead lead--onDark mt-5 max-w-[560px]">
              {t.hero.lead}
            </p>
            <div className="hero__actions">
              <ButtonLink to="/event" variant="accent">
                {t.hero.exploreEvents}
                <span className="btn__icon" aria-hidden="true">→</span>
              </ButtonLink>
              <ButtonLink to="/contact" variant="outlineLight">
                {t.hero.contactUs}
              </ButtonLink>
            </div>
            <ul className="hero__facts">
              {t.stats.slice(0, 3).map((stat) => (
                <li className="hero__fact" key={stat.label}>
                  <strong>
                    {stat.end}
                    {stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Wrap>
      </section>

      {/* About -------------------------------------------------------- */}
      <section className="section">
        <Wrap className="grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <SectionHead
              eyebrow={t.about.eyebrow}
              title={<>{t.about.title.replace(t.about.titleAccent, '')}<span className="text-accent-600">{t.about.titleAccent}</span></>}
              lead={t.about.lead}
            />
            <div className="grid max-w-[520px] grid-cols-2 gap-x-6 gap-y-8">
              {t.stats.map((stat) => (
                <div key={stat.label}>
                  <strong className="stat__value">
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  </strong>
                  <span className="stat__label mt-2 block">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full max-w-[300px] justify-self-center sm:max-w-[340px] md:max-w-[380px] lg:max-w-[420px] lg:justify-self-end xl:max-w-[460px]">
            <img
              className="aspect-[16/9] w-full rounded-[20px] object-cover shadow-lg"
              src={images.about}
              alt={t.about.imageAlt}
              loading="lazy"
            />
          </div>
        </Wrap>
      </section>

      {/* Services ----------------------------------------------------- */}
      <section className="section section--dark">
        <Wrap>
          <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
            <SectionHead
              dark
              eyebrow={t.services.eyebrow}
              title={<>{t.services.title.replace(t.services.titleAccent, '')}<span className="text-accent-400">{t.services.titleAccent}</span></>}
              lead={t.services.lead}
              className="mb-0 max-w-2xl"
            />
            <ButtonLink to="/services" variant="outlineLight">
              {t.services.viewAll}
              <span className="btn__icon" aria-hidden="true">→</span>
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-10">
            {t.services.items.map((service, index) => {
              const slug = serviceSlugByTitle.get(service.title)
              if (!slug) return null
              return (
                <Link
                  to={`/services/${slug}`}
                  className="card card--dark card--hover group block p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  key={service.title}
                >
                  <div className="flex items-start justify-between">
                    <div className="icon-badge icon-badge--dark icon-badge--sm">
                      <Icon name={service.icon} size={20} />
                    </div>
                    <span className="font-display text-xs font-bold text-white/55">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-4 text-[16px] leading-snug font-bold text-white">{service.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/62">{service.text}</p>
                </Link>
              )
            })}
          </div>
        </Wrap>
      </section>

      {/* Work --------------------------------------------------------- */}
      <section className="section section--white">
        <Wrap>
          <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
            <SectionHead
              eyebrow={t.work.eyebrow}
              title={<>{t.work.title.replace(t.work.titleAccent, '')}<span className="text-accent-600">{t.work.titleAccent}</span></>}
              className="mb-0"
            />
            <ButtonLink to="/event" variant="outline">
              {t.work.viewAll}
              <span className="btn__icon" aria-hidden="true">→</span>
            </ButtonLink>
          </div>

          <div className="relative mt-6 md:mt-8">
            <div
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              ref={workCarouselRef}
            >
              {t.work.projects.map((project, index) => (
                <Link
                  to="/event"
                  className="group relative block aspect-[4/3] shrink-0 basis-[90%] snap-start overflow-hidden rounded-[14px] bg-ink-800 sm:basis-[46%] lg:basis-[34%]"
                  key={project.title}
                >
                  <img
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={[images.festival, images.speaker, images.brand, images.tenant][index]}
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/95 via-ink-950/45 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-accent-300">{project.subtitle}</p>
                    <h3 className="mt-2 text-[17px] leading-snug font-bold text-white">{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                type="button"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink-900 transition-colors hover:border-ink-900 hover:text-accent-600"
                aria-label={t.work.prevProject}
                onClick={() => scrollWork(-1)}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-ink-900 transition-colors hover:border-ink-900 hover:text-accent-600"
                aria-label={t.work.nextProject}
                onClick={() => scrollWork(1)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Clients ------------------------------------------------------ */}
      <section className="section--tight section--dark">
        <Wrap className="-mt-4 flex flex-col items-center text-center">
          <h2 className="h2 max-w-2xl text-white">
            {t.clients.title.replace(t.clients.titleAccent, '')}<span className="text-accent-400">{t.clients.titleAccent}</span>
          </h2>
        </Wrap>
        <div
          className="relative mx-auto mt-6 md:mt-8 w-[90%] overflow-hidden py-8 md:py-10 md:w-[80%]"
          role="region"
          aria-label={t.clients.label}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--color-ink-900)] to-transparent md:w-24" aria-hidden="true" />
          <div className="flex flex-col gap-8 md:gap-10">
            <Marquee speed={42} gradient={false} pauseOnHover>
              {[...clients, ...clients].map((client, index) => (
                <span
                  className="mx-7 flex shrink-0 items-center text-white/55 transition-colors hover:text-white"
                  key={`row-top-${index}`}
                >
                  {client}
                </span>
              ))}
            </Marquee>
            <div aria-hidden="true">
              <Marquee speed={36} gradient={false} pauseOnHover direction="right">
                {[...clientsSmall, ...clientsSmall].map((client, index) => (
                  <span
                    className="mx-7 flex shrink-0 items-center text-white/35 transition-colors hover:text-white"
                    key={`row-bottom-${index}`}
                  >
                    {client}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--color-ink-900)] to-transparent md:w-24" aria-hidden="true" />
        </div>
      </section>

      {/* Why BMG ------------------------------------------------------ */}
      <section className="section">
        <Wrap>
          <SectionHead
            eyebrow={t.whyBmg.eyebrow}
            title={<>{t.whyBmg.title.replace(t.whyBmg.titleAccent, '')}<span className="text-accent-600">{t.whyBmg.titleAccent}</span></>}
          />
          <div className="flex flex-wrap justify-center gap-6">
            {t.whyBmg.reasons.map((reason) => (
              <div
                className="card flex w-full flex-col items-start gap-4 p-8 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                key={reason.title}
              >
                <div className="icon-badge">
                  <Icon name={reason.icon} size={24} />
                </div>
                <div>
                  <h3 className="h3 text-[19px]">{reason.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{reason.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Process ------------------------------------------------------ */}
      <section className="section section--dark">
        <Wrap>
          <SectionHead
            dark
            eyebrow={t.process.eyebrow}
            title={<>{t.process.title.replace(t.process.titleAccent, '')}<span className="text-accent-400">{t.process.titleAccent}</span></>}
            lead={t.process.lead}
          />

          <ProcessStepper items={t.process.steps.map((step, index) => [processIcons[index], step.number, step.title, step.description])} />
        </Wrap>
      </section>

      {/* Field stories ------------------------------------------------ */}
      <section className="section section--white">
        <Wrap className="grid items-center gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHead
              eyebrow={t.fieldStories.eyebrow}
              title={<>{t.fieldStories.title.replace(t.fieldStories.titleAccent, '')}<span className="text-accent-600">{t.fieldStories.titleAccent}</span></>}
              lead={t.fieldStories.lead}
              className="mb-4"
            />
            <ButtonLink to="/event" variant="outline" className="mt-4">
              {t.fieldStories.viewAll}
              <span className="btn__icon" aria-hidden="true">→</span>
            </ButtonLink>
          </div>
          <div className="relative">
            <div
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              ref={fieldCarouselRef}
            >
              {t.fieldStories.photos.map((photo, index) => (
                <div
                  className="media-frame aspect-[4/3.2] w-full shrink-0 snap-start sm:aspect-[16/10] lg:aspect-[4/3]"
                  key={photo.alt}
                >
                  <img src={[images.field1, images.field2, images.field3][index]} alt={photo.alt} loading="lazy" />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="absolute left-2 top-1/2 z-[5] grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-[rgba(11,20,44,0.6)] text-white transition-colors hover:bg-[rgba(11,20,44,0.85)]"
              aria-label={t.fieldStories.prevPhoto}
              onClick={() => scrollField(-1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 z-[5] grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-[rgba(11,20,44,0.6)] text-white transition-colors hover:bg-[rgba(11,20,44,0.85)]"
              aria-label={t.fieldStories.nextPhoto}
              onClick={() => scrollField(1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Wrap>
      </section>

      {/* Event Archive ------------------------------------------------ */}
      <section className="section section--dark">
        <Wrap>
          <SectionHead
            dark
            eyebrow={t.eventArchive.eyebrow}
            title={<>{t.eventArchive.title.replace(t.eventArchive.titleAccent, '')}<span className="text-accent-400">{t.eventArchive.titleAccent}</span></>}
            lead={t.eventArchive.leadTemplate.replace('{count}', events.length)}
            className="mb-8"
          />
          <div className="relative" ref={timelineRef}>
            <div className="absolute left-1/2 top-2 bottom-0 w-px -translate-x-px bg-white/5" aria-hidden="true">
              <div className="w-full bg-accent-500/60 transition-[height] duration-150 ease-out" style={{ height: `${lineProgress * 100}%` }} />
            </div>
            {groupedRecentEvents.map((group, groupIndex) => {
              const visibleItems = group.items.slice(0, 2)
              const hiddenCount = group.items.length - 2
              return (
                <div key={group.year} data-timeline-group className="mb-8 last:mb-0">
                  <div className={`relative z-10 flex items-center justify-center mb-4 transition-all duration-500 ${visibleGroups > groupIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent-500 ring-4 ring-accent-500/20" aria-hidden="true" />
                    <span className="ml-3 font-display text-2xl font-bold text-accent-400">{group.year}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {visibleItems.map((item, index) => (
                      <li key={item.slug} className={`flex transition-all duration-500 ${(groupIndex * 2 + index) % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'} ${visibleGroups > groupIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${index * 100 + 100}ms` }}>
                        <div className={`group flex items-center rounded-[10px] border border-white/10 bg-white/[0.03] px-4 py-2.5 transition-colors hover:border-accent-500/50 hover:bg-white/[0.06] sm:w-[calc(50%-16px)]`}>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-bold leading-snug text-white group-hover:text-accent-400 transition-colors">
                              {localized(item.title, language)}
                            </span>
                            <span className="block text-[12px] text-white/45">
                              {item.place}
                            </span>
                          </span>
                        </div>
                      </li>
                    ))}
                    {hiddenCount > 0 && (
                      <li className={`flex justify-end pr-1 transition-all duration-500 ${visibleGroups > groupIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
                        <span className="text-[11px] font-bold text-accent-400">
                          +{hiddenCount} {t.eventArchive.others}
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
      <section className="relative isolate text-white py-12 md:py-16" style={{ '--hero-image': `url(${images.hero})` }}>
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
              <ButtonLink to="/about-us" variant="accent">
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