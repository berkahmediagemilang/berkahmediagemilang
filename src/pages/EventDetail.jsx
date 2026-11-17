import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Check, MapPin, Tag } from 'lucide-react'
import { ButtonLink, Eyebrow, PageHero, SectionHead, Wrap } from '@/components/ui.jsx'
import NotFound from '@/pages/NotFound.jsx'
import { categoryLabels, formatEventDate, getEventBySlug, getRelatedEvents } from '@/data/events.js'
import { localized } from '@/data/localized.js'
import { useLanguage } from '@/i18n/language.js'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/event-detail.js'
import en from '@/i18n/locale/en/event-detail.js'
import zh from '@/i18n/locale/zh/event-detail.js'

const ctaPhoto = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=88'

export default function EventDetail() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const t = useStrings({ id, en, zh })
  const event = getEventBySlug(slug)

  if (!event) return <NotFound />

  const relatedEvents = getRelatedEvents(event.slug, 3)

  const local = (field) => localized(field, language)
  const title = local(event.title)
  const category = local(categoryLabels[event.category])
  const dateLabel = formatEventDate(event.date, language)

  return (
    <>
      <PageHero
        image={event.image}
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            <Link to="/event">{t.breadcrumb.events}</Link>
            <span aria-hidden="true">›</span>
            {title}
          </>
        }
        eyebrow={category}
        title={title}
        lead={local(event.text)}
      />

      {/* Overview + scope ---------------------------------------------- */}
      <section className="section">
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[20px] shadow-lg">
                <img
                  className="aspect-[4/3] w-full object-cover"
                  src={event.image}
                  alt={title}
                />
              </div>
              <ul className="card mt-5 divide-y divide-line overflow-hidden">
                <li className="flex items-center gap-4 px-4 py-3">
                  <span className="icon-badge icon-badge--sm shrink-0">
                    <Calendar size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{t.dateLabel}</span>
                    <span className="block text-[15px] font-semibold text-ink-900">{dateLabel}</span>
                  </span>
                </li>
                <li className="flex items-center gap-4 px-4 py-3">
                  <span className="icon-badge icon-badge--sm shrink-0">
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{t.locationLabel}</span>
                    <span className="block text-[15px] font-semibold text-ink-900">{event.place}</span>
                  </span>
                </li>
                <li className="flex items-center gap-4 px-4 py-3">
                  <span className="icon-badge icon-badge--sm shrink-0">
                    <Tag size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{t.categoryLabel}</span>
                    <span className="block text-[15px] font-semibold text-ink-900">{category}</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <Eyebrow>{t.overview}</Eyebrow>
              <h2 className="h2 mt-4">{title}</h2>
              <p className="lead mt-5">{local(event.overview)}</p>
              <h3 className="h3 mt-8">{t.scope}</h3>
              <ul className="mt-4 space-y-3">
                {local(event.scope).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="icon-badge icon-badge--sm mt-0.5 shrink-0">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink-800">{item}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink to="/event" variant="outline" size="sm" className="mt-8">
                <ArrowLeft size={16} aria-hidden="true" />
                {t.allEvents}
              </ButtonLink>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Guest stars ------------------------------------------------------ */}
      <section className="section">
        <Wrap>
          <SectionHead eyebrow={t.guestStars.eyebrow} title={<>{t.guestStars.title.replace(t.guestStars.titleAccent, '')}<span className="text-accent-400">{t.guestStars.titleAccent}</span></>} lead={t.guestStars.lead} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {event.guestStars.map((star) => (
              <figure className="card flex items-center gap-5 p-4" key={star.name}>
                <img
                  className="h-24 w-24 shrink-0 rounded-[18px] object-cover"
                  src={star.photo}
                  alt={star.name}
                  loading="lazy"
                />
                <span className="min-w-0">
                  <span className="block text-[17px] font-bold leading-snug text-ink-900">{star.name}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-muted">{local(star.role)}</span>
                </span>
              </figure>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Support by -------------------------------------------------------- */}
      <section className="section section--dark">
        <Wrap>
          <SectionHead
            dark
            eyebrow={t.support.eyebrow}
            title={<>{t.support.title.replace(t.support.titleAccent, '')}<span className="text-accent-400">{t.support.titleAccent}</span></>}
            lead={t.support.lead}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {event.support.map((partner) => (
              <div className="flex items-center gap-4 rounded-[18px] border border-white/10 bg-white/5 p-4" key={partner.name}>
                <img
                  className="h-16 w-16 shrink-0 rounded-[14px] object-cover"
                  src={partner.photo}
                  alt={partner.name}
                  loading="lazy"
                />
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold leading-snug text-white">{partner.name}</span>
                  <span className="mt-1 block text-[12px] leading-snug text-white/55">{local(partner.category)}</span>
                </span>
              </div>
            ))}
          </div>
        </Wrap>
      </section>

      {/* Related events ---------------------------------------------------- */}
      <section className="section">
        <Wrap>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow={t.related.eyebrow} title={<>{t.related.title.replace(t.related.titleAccent, '')}<span className="text-accent-400">{t.related.titleAccent}</span></>} lead={t.related.lead} className="mb-0" />
            <Link
              to="/event"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700"
            >
              {t.allEvents}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedEvents.map((item) => {
              const itemTitle = local(item.title)
              return (
                <Link
                  key={item.slug}
                  to={`/event/${item.slug}`}
                  className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-[20px] bg-ink-800 text-white"
                >
                  <img
                    className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={item.image}
                    alt={itemTitle}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-ink-950/95 via-ink-950/45 to-transparent" aria-hidden="true" />
                  <span className="chip absolute left-4 top-4 z-[3] bg-accent-500 text-white">
                    {local(categoryLabels[item.category])}
                  </span>
                  <div className="relative z-[2] p-5">
                    <p className="text-[12px] font-medium text-white/70">
                      {item.place} · {formatEventDate(item.date, language)}
                    </p>
                    <h3 className="h3 mt-2 text-[20px] text-white">{itemTitle}</h3>
                  </div>
                </Link>
              )
            })}
          </div>
        </Wrap>
      </section>

      {/* CTA ----------------------------------------------------------- */}
      <section className="relative isolate py-[62px] text-white max-[680px]:py-[42px]" style={{ '--hero-image': `url(${ctaPhoto})` }}>
        <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(7,14,28,.88),rgba(7,14,28,.76)),var(--hero-image)] bg-cover bg-center" aria-hidden="true" />
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