import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { ButtonLink, Eyebrow, PageHero, Wrap } from '@/components/ui.jsx'
import NotFound from '@/pages/NotFound.jsx'
import { getServiceBySlug, localized } from '@/data/services.js'
import { useLanguage } from '@/i18n/language.js'
import { useStrings } from '@/i18n/useStrings.js'
import id from '@/i18n/locale/id/service-detail.js'
import en from '@/i18n/locale/en/service-detail.js'
import zh from '@/i18n/locale/zh/service-detail.js'

const ctaPhoto = 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=88'

export default function ServiceDetail() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const t = useStrings({ id, en, zh })
  const service = getServiceBySlug(slug)

  if (!service) return <NotFound />

  const local = (field) => localized(field, language)
  const title = local(service.title)
  const eyebrow = `${t.serviceWord} ${service.number}`

  return (
    <>
      <PageHero
        image={service.image}
        breadcrumb={
          <>
            <Link to="/">{t.breadcrumb.home}</Link>
            <span aria-hidden="true">›</span>
            <Link to="/services">{t.breadcrumb.services}</Link>
            <span aria-hidden="true">›</span>
            {title}
          </>
        }
        eyebrow={eyebrow}
        title={title}
        lead={local(service.text)}
      />

      {/* Overview + deliverables -------------------------------------- */}
      <section className="section">
        <Wrap>
          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-[20px] shadow-lg">
                <img
                  className="aspect-[4/5] w-full object-cover"
                  src={service.image}
                  alt={title}
                />
                <span className="chip absolute left-4 top-4 bg-white/92 text-ink-900">
                  {local(service.category)}
                </span>
              </div>
            </div>
            <div className="lg:col-span-7">
              <Eyebrow>{t.overview}</Eyebrow>
              <h2 className="h2 mt-4">{title}</h2>
              <p className="lead mt-5">{local(service.overview)}</p>
              <h3 className="h3 mt-4 md:mt-8">{t.included}</h3>
              <ul className="mt-4 space-y-3">
                {local(service.deliverables).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="icon-badge icon-badge--sm mt-0.5 shrink-0">
                      <Check size={14} strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink-800">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/services"
                className="mt-4 md:mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                {t.allServices}
              </Link>
            </div>
          </div>
        </Wrap>
      </section>

      {/* CTA ----------------------------------------------------------- */}
      <section className="relative isolate text-white py-12 md:py-16" style={{ '--hero-image': `url(${ctaPhoto})` }}>
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
