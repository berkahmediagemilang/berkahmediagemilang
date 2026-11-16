import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Check, MapPin, Tag } from 'lucide-react'
import { ButtonLink, Eyebrow, PageHero, SectionHead, Wrap } from '@/components/ui.jsx'
import NotFound from '@/pages/NotFound.jsx'
import { categoryLabels, formatEventDate, getEventBySlug, getRelatedEvents } from '@/data/events.js'
import { localized } from '@/data/localized.js'
import { useLanguage } from '@/i18n/language.js'

const ctaPhoto = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=88'

export default function EventDetail() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const isIndonesian = language === 'id'
  const isChinese = language === 'zh'
  const event = getEventBySlug(slug)

  if (!event) return <NotFound />

  const relatedEvents = getRelatedEvents(event.slug, 3)

  const t = (field) => localized(field, language)
  const title = t(event.title)
  const category = t(categoryLabels[event.category])
  const dateLabel = formatEventDate(event.date, language)
  const labels = {
    home: isIndonesian ? 'Beranda' : isChinese ? '首页' : 'Home',
    events: isIndonesian ? 'Event' : isChinese ? '活动' : 'Event',
    overview: isIndonesian ? 'Tentang event' : isChinese ? '活动概况' : 'About the event',
    scope: isIndonesian ? 'Cakupan pekerjaan' : isChinese ? '工作范围' : 'Scope of work',
    allEvents: isIndonesian ? 'Semua event' : isChinese ? '全部活动' : 'All events',
    dateLabel: isIndonesian ? 'Tanggal' : isChinese ? '日期' : 'Date',
    locationLabel: isIndonesian ? 'Lokasi' : isChinese ? '地点' : 'Location',
    categoryLabel: isIndonesian ? 'Kategori' : isChinese ? '类别' : 'Category',
    guestStarsEyebrow: 'Guest Star',
    guestStarsTitle: isIndonesian ? (
      <>Bintang yang <span className="text-accent-400">memeriahkan</span></>
    ) : isChinese ? (
      <>闪耀登场的<span className="text-accent-400">嘉宾</span></>
    ) : (
      <>The names who <span className="text-accent-400">lit up the stage</span></>
    ),
    guestStarsLead: isIndonesian
      ? 'Para penampil dan pengisi acara yang hadir pada event ini.'
      : isChinese
        ? '本场活动的演出嘉宾与明星阵容。'
        : 'The performers and speakers who appeared at this event.',
    supportEyebrow: 'Support by',
    supportTitle: isIndonesian ? (
      <>Dukungan perusahaan <span className="text-accent-400">& UMKM</span></>
    ) : isChinese ? (
      <>企业与<span className="text-accent-400">本地商家</span>的支持</>
    ) : (
      <>Backed by companies <span className="text-accent-400">& local SMEs</span></>
    ),
    supportLead: isIndonesian
      ? 'Perusahaan dan UMKM yang ikut meramaikan event ini di balik layar.'
      : isChinese
        ? '幕后支持本场活动的企业与本地商家。'
        : 'The companies and local SMEs that backed this event behind the scenes.',
    relatedEyebrow: isIndonesian ? 'Arsip Event' : isChinese ? '活动回顾' : 'Event Archive',
    relatedTitle: isIndonesian ? (
      <>Event lain yang sudah <span className="text-accent-400">diselenggarakan</span></>
    ) : isChinese ? (
      <>我们<span className="text-accent-400">承办过的</span>其他活动</>
    ) : (
      <>Other events <span className="text-accent-400">we have organized</span></>
    ),
    relatedLead: isIndonesian
      ? 'Jelajahi event lain yang pernah kami selenggarakan.'
      : isChinese
        ? '浏览我们承办过的其他活动。'
        : "Explore other events we've organized.",
  }

  return (
    <>
      <PageHero
        image={event.image}
        breadcrumb={
          <>
            <Link to="/">{labels.home}</Link>
            <span aria-hidden="true">›</span>
            <Link to="/event">{labels.events}</Link>
            <span aria-hidden="true">›</span>
            {title}
          </>
        }
        eyebrow={category}
        title={title}
        lead={t(event.text)}
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
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{labels.dateLabel}</span>
                    <span className="block text-[15px] font-semibold text-ink-900">{dateLabel}</span>
                  </span>
                </li>
                <li className="flex items-center gap-4 px-4 py-3">
                  <span className="icon-badge icon-badge--sm shrink-0">
                    <MapPin size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{labels.locationLabel}</span>
                    <span className="block text-[15px] font-semibold text-ink-900">{event.place}</span>
                  </span>
                </li>
                <li className="flex items-center gap-4 px-4 py-3">
                  <span className="icon-badge icon-badge--sm shrink-0">
                    <Tag size={16} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{labels.categoryLabel}</span>
                    <span className="block text-[15px] font-semibold text-ink-900">{category}</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <Eyebrow>{labels.overview}</Eyebrow>
              <h2 className="h2 mt-4">{title}</h2>
              <p className="lead mt-5">{t(event.overview)}</p>
              <h3 className="h3 mt-8">{labels.scope}</h3>
              <ul className="mt-4 space-y-3">
                {t(event.scope).map((item) => (
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
                {labels.allEvents}
              </ButtonLink>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Guest stars ------------------------------------------------------ */}
      <section className="section">
        <Wrap>
          <SectionHead eyebrow={labels.guestStarsEyebrow} title={labels.guestStarsTitle} lead={labels.guestStarsLead} />
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
                  <span className="mt-1 block text-[13px] leading-snug text-muted">{t(star.role)}</span>
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
            eyebrow={labels.supportEyebrow}
            title={labels.supportTitle}
            lead={labels.supportLead}
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
                  <span className="mt-1 block text-[12px] leading-snug text-white/55">{t(partner.category)}</span>
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
            <SectionHead eyebrow={labels.relatedEyebrow} title={labels.relatedTitle} lead={labels.relatedLead} className="mb-0" />
            <Link
              to="/event"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700"
            >
              {labels.allEvents}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedEvents.map((item) => {
              const itemTitle = localized(item.title, language)
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
                    {localized(categoryLabels[item.category], language)}
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
              {isIndonesian ? 'Ingin hasil yang sama?' : isChinese ? '想要同样的效果？' : 'Want the same result?'}
            </Eyebrow>
            <h2 className="h2 mt-5">
              {isIndonesian ? (
                <>
                  Punya ide event? <span className="text-accent-400">Kita wujudkan.</span>
                </>
              ) : isChinese ? (
                <>
                  有活动想法？<span className="text-accent-400">我们来实现。</span>
                </>
              ) : (
                <>
                  Have an event in mind? <span className="text-accent-400">Let's make it real.</span>
                </>
              )}
            </h2>
            <p className="lead lead--onDark mt-5 max-w-[560px]">
              {isIndonesian
                ? 'Yuk, wujudkan ide event Anda bersama tim profesional kami.'
                : isChinese
                  ? '让我们与专业团队一起把您的活动创意变成现实。'
                  : 'Let our professional team bring your event idea to life.'}
            </p>
            <div className="hero__actions">
              <ButtonLink to="/contact" variant="accent">
                {isIndonesian ? 'Hubungi Kami' : isChinese ? '联系我们' : 'Contact Us'}
                <span className="btn__icon" aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>
        </Wrap>
      </section>
    </>
  )
}
